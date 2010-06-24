using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Extensions;
using Composite.Logging;
using Composite.Types;
using Composite.Functions.Plugins.FunctionProvider;
using System.Collections;


namespace Composite.Functions.Foundation
{
    internal abstract class MetaFunctionContainer
    {
        private List<string> _excludedFunctionNames;

        private Dictionary<string, IMetaFunction> _functionByNameDictionary = new Dictionary<string, IMetaFunction>();
        private Dictionary<Type, List<string>> _functionNamesByTypeDictionary = new Dictionary<Type, List<string>>();
        private Dictionary<Type, List<string>> _downcastableFunctionNamesByTypeDictionary = new Dictionary<Type, List<string>>();

        private Dictionary<string, List<string>> _functionNamesByProviderName = new Dictionary<string, List<string>>();


        protected abstract IEnumerable<string> OnGetProviderNames();
        protected abstract IEnumerable<IMetaFunction> OnGetFunctionsFromProvider(string providerName, FunctionTypesToReturn functionTypesToReturn);
        protected abstract void OnFunctionsAdded(List<string> functionNames, bool fireEvents);
        protected abstract void OnFunctionsRemoved(List<string> functionNames);
        protected abstract string FunctionType { get; }



        protected MetaFunctionContainer(List<string> excludedFunctionNames)
        {
            _excludedFunctionNames = excludedFunctionNames;
        }



        public void Initialize_StaticTypeDependentFunctions()
        {
            InitializeAllFunctions(FunctionTypesToReturn.StaticDependentFunctions, false);
        }



        public void Initialize_DynamicTypeDependentFunctions()
        {
            InitializeAllFunctions(FunctionTypesToReturn.DynamicDependentOnlyFunctions, false);
        }



        public IEnumerable<string> FunctionNames
        {
            get
            {
                return _functionByNameDictionary.Keys;
            }
        }



        public IEnumerable<string> FunctionNamesByProviderName(string providerName)
        {
            List<string> functionNames;

            if (_functionNamesByProviderName.TryGetValue(providerName, out functionNames) == false)
            {
                throw new ArgumentException(string.Format("Non existing provider named '{0}'", providerName));
            }

            return functionNames;
        }



        public IEnumerable<string> GetFunctionNamesByType(Type supportedType)
        {
            List<string> functionNames = new List<string>();

            foreach (var typeMappedFunctions in _functionNamesByTypeDictionary)
            {
                bool useableType = supportedType.IsAssignableFrom(typeMappedFunctions.Key);

                if (useableType == true)
                {
                    // Negate that string is an IEnumerable - thats just plain stupid.
                    if ((supportedType is IEnumerable && typeMappedFunctions.Key == typeof(string)) == false)
                    {
                        functionNames.AddRange(typeMappedFunctions.Value);
                    }
                }
            }

            foreach (var typeMappedFunctions in _downcastableFunctionNamesByTypeDictionary)
            {
                bool useableType = typeMappedFunctions.Key.IsAssignableFrom(supportedType);

                if (useableType == true)
                {
                    functionNames.AddRange(typeMappedFunctions.Value.Where(f => functionNames.Contains(f)==false));
                }
            }

            return functionNames;
        }



        public IEnumerable<Type> FunctionSupportedTypes
        {
            get
            {
                return _functionNamesByTypeDictionary.Keys;
            }
        }



        public IMetaFunction GetFunction(string functionName)
        {
            IMetaFunction function;

            if (_functionByNameDictionary.TryGetValue(functionName, out function) == false)
            {
                throw new ArgumentException(string.Format("The {0} named '{1}' is not known.", this.FunctionType, functionName));
            }

            return function;
        }



        public void ReInitializeFunctionsFromProvider(string providerName)
        {
            RemoveFunctionsByProvider(providerName);

            InitializeFunctionsFromProvider(providerName, FunctionTypesToReturn.AllFunctions, true);
        }



        private void InitializeAllFunctions(FunctionTypesToReturn functionTypesToReturn, bool fireUpdateEvents)
        {
            foreach (string providerName in OnGetProviderNames())
            {
                InitializeFunctionsFromProvider(providerName, functionTypesToReturn, fireUpdateEvents);
            }
        }



        private void InitializeFunctionsFromProvider(string providerName, FunctionTypesToReturn functionTypesToReturn,bool fireEvents)
        {
            List<string> loadedFunctionNames = new List<string>();

            foreach (IMetaFunction function in OnGetFunctionsFromProvider(providerName, functionTypesToReturn).OrderBy(f => f.CompositeName()))
            {
                if (function.IsNamespaceCorrectFormat() == false)
                {
                    LoggingService.LogWarning("FunctionProviderRegistry", string.Format("{0} named '{1}' has an invalid namespace '{2}'", this.FunctionType, function.Name, function.Namespace));
                    continue;
                }

                string combinedName = StringExtensionMethods.CreateNamespace(function.Namespace, function.Name, '.');
                if (_excludedFunctionNames.Contains(combinedName) == true)
                {
                    continue;
                }


                if (FunctionExists(combinedName) == true)
                {
                    RemoveFunction(combinedName);
                    _excludedFunctionNames.Add(combinedName);

                    LoggingService.LogWarning("FunctionProviderRegistry", string.Format("Function name clash: '{0}'", combinedName));
                    continue;
                }

                try
                {
                    if (function.ValidateParameterProfiles() == false)
                    {
                        LoggingService.LogWarning("FunctionProviderRegistry", string.Format("The parameter profiles for the {0} named '{1}' did not validate", this.FunctionType, combinedName));
                    }
                    else
                    {
                        AddFunction(providerName, function);
                        loadedFunctionNames.Add(function.CompositeName());
                    }
                }
                catch (Exception ex)
                {
                    LoggingService.LogError("metaFunctionContainer", string.Format("The parameter profiles for the {0} named '{1}' could not be retrieved.\nException details:\n{2}", this.FunctionType, combinedName, ex));

                }
            }

            if (_functionNamesByProviderName.ContainsKey(providerName) == true)
            {
                foreach (string functionName in _functionNamesByProviderName[providerName])
                {
                    if (loadedFunctionNames.Contains(functionName) == true)
                    {
                        LoggingService.LogVerbose("FunctionProviderRegistry", string.Format("{0} loaded: '{1}' from provider '{2}'", this.FunctionType, functionName, providerName));
                    }
                }

                OnFunctionsAdded(_functionNamesByProviderName[providerName].ToList(), fireEvents);
            }
        }



        private void AddFunction(string providerName, IMetaFunction function)
        {
            string compositeName = function.CompositeName();

            _functionByNameDictionary.Add(compositeName, function);


            List<string> functionNamesByProviderNameList;
            if (_functionNamesByProviderName.TryGetValue(providerName, out functionNamesByProviderNameList) == false)
            {
                functionNamesByProviderNameList = new List<string>();
                _functionNamesByProviderName.Add(providerName, functionNamesByProviderNameList);
            }

            functionNamesByProviderNameList.Add(compositeName);


            List<string> functionNamesByType;
            if (_functionNamesByTypeDictionary.TryGetValue(function.ReturnType, out functionNamesByType) == false)
            {
                functionNamesByType = new List<string>();
                _functionNamesByTypeDictionary.Add(function.ReturnType, functionNamesByType);
            }

            functionNamesByType.Add(compositeName);

            if (function is IDowncastableFunction && ((IDowncastableFunction)function).ReturnValueIsDowncastable==true)
            {
                var downcastableFunctionNamesByType = new List<string>();
                if (_downcastableFunctionNamesByTypeDictionary.TryGetValue(function.ReturnType, out downcastableFunctionNamesByType) == false)
                {
                    downcastableFunctionNamesByType = new List<string>();
                    _downcastableFunctionNamesByTypeDictionary.Add(function.ReturnType, downcastableFunctionNamesByType);
                }
                downcastableFunctionNamesByType.Add(compositeName);
            }
        }



        private void RemoveFunctionsByProvider(string providerName)
        {
            if (_functionNamesByProviderName.ContainsKey(providerName) == false) return;

            List<string> functionNames = _functionNamesByProviderName[providerName];

            foreach (string functionName in functionNames)
            {
                _functionByNameDictionary.Remove(functionName);

                foreach (List<string> functionNamesByType in _functionNamesByTypeDictionary.Values)
                {
                    functionNamesByType.Remove(functionName);
                }

                foreach (List<string> functionNamesByType in _downcastableFunctionNamesByTypeDictionary.Values)
                {
                    functionNamesByType.Remove(functionName);
                }

                LoggingService.LogVerbose("FunctionProviderRegistry", string.Format("{0} unloaded: '{1}'", this.FunctionType, functionName));
            }

            _functionNamesByProviderName.Remove(providerName);

            OnFunctionsRemoved(functionNames);
        }



        private void RemoveFunction(string functionName)
        {
            _functionByNameDictionary.Remove(functionName);

            foreach (List<string> functionNamesByProvder in _functionNamesByProviderName.Values)
            {
                functionNamesByProvder.Remove(functionName);
            }

            foreach (List<string> functionNamesByType in _functionNamesByTypeDictionary.Values)
            {
                functionNamesByType.Remove(functionName);
            }

            foreach (List<string> functionNamesByType in _downcastableFunctionNamesByTypeDictionary.Values)
            {
                functionNamesByType.Remove(functionName);
            }
        }



        private bool FunctionExists(string functionName)
        {
            return _functionByNameDictionary.ContainsKey(functionName);
        }



        protected enum FunctionTypesToReturn
        {
            /// <summary>
            /// Only functions that DOES NOT relay on dynamic types may be returned
            /// IFunctionProvider.Functions
            /// </summary>
            StaticDependentFunctions,

            /// <summary>
            /// Only functions that DOES relay on dynamic types may be return
            /// IDynamicTypeFunctionProvider.DynamicTypeDependentFunctions
            /// </summary>
            DynamicDependentOnlyFunctions,

            /// <summary>
            /// All functions may be returned
            /// IFunctionProvider.Functions 
            /// AND
            /// IDynamicTypeFunctionProvider.DynamicTypeDependentFunctions
            /// </summary>
            AllFunctions
        }
    }
}
