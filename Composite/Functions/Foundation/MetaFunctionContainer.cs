using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Extensions;
using System.Collections;
using Composite.Core;


namespace Composite.Functions.Foundation
{
    internal abstract class MetaFunctionContainer
    {
        private static readonly string LogTitle = typeof (MetaFunctionContainer).Name;
        private readonly List<string> _excludedFunctionNames;

        private readonly Dictionary<string, IMetaFunction> _functionByNameDictionary = new Dictionary<string, IMetaFunction>();
        private readonly Dictionary<Type, List<string>> _functionNamesByTypeDictionary = new Dictionary<Type, List<string>>();
        private readonly Dictionary<Type, List<string>> _downcastableFunctionNamesByTypeDictionary = new Dictionary<Type, List<string>>();

        private readonly Dictionary<string, List<string>> _functionNamesByProviderName = new Dictionary<string, List<string>>();


        protected abstract IEnumerable<string> OnGetProviderNames();
        protected abstract IEnumerable<IMetaFunction> OnGetFunctionsFromProvider(string providerName, FunctionTypesToReturn functionTypesToReturn);
        protected abstract void OnFunctionsAdded(List<string> functionNames, bool fireEvents);
        protected abstract void OnFunctionsRemoved(List<string> functionNames);
        protected abstract string FunctionType { get; }



        protected MetaFunctionContainer(List<string> excludedFunctionNames)
        {
            _excludedFunctionNames = excludedFunctionNames;
        }



        public void Initialize(bool dynamicTypes)
        {
            if (dynamicTypes)
            {
                InitializeAllFunctions(FunctionTypesToReturn.DynamicDependentOnlyFunctions, false);
            }
            else
            {
                InitializeAllFunctions(FunctionTypesToReturn.StaticDependentFunctions, false);
            }
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
                functionNames = new List<string>();
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

                if (useableType)
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
                throw new ArgumentException(string.Format("The {0} named '{1}' is not known. Ensure it exists with the exact spelling and casing you provided.", this.FunctionType, functionName));
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
                    Log.LogWarning(LogTitle, string.Format("{0} named '{1}' has an invalid namespace '{2}'", this.FunctionType, function.Name, function.Namespace));
                    continue;
                }

                string combinedName = StringExtensionMethods.CreateNamespace(function.Namespace, function.Name, '.');
                if (_excludedFunctionNames.Contains(combinedName))
                {
                    continue;
                }


                if (FunctionExists(combinedName))
                {
                    RemoveFunction(combinedName);
                    _excludedFunctionNames.Add(combinedName);

                    Log.LogWarning(LogTitle, "Function name clash: '{0}'", combinedName);
                    continue;
                }

                try
                {
                    AddFunction(providerName, function);
                    loadedFunctionNames.Add(function.CompositeName());
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, "Error adding  function '{0}'. Function type {0}", combinedName, this.FunctionType);
                    Log.LogError(LogTitle, ex);
                }
            }

            if (_functionNamesByProviderName.ContainsKey(providerName))
            {
                //foreach (string functionName in _functionNamesByProviderName[providerName])
                //{
                //    if (loadedFunctionNames.Contains(functionName))
                //    {
                //        Log.LogVerbose("FunctionProviderRegistry", string.Format("{0} loaded: '{1}' from provider '{2}'", this.FunctionType, functionName, providerName));
                //    }
                //}

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

            if (function is IDowncastableFunction && ((IDowncastableFunction)function).ReturnValueIsDowncastable)
            {
                List<string> downcastableFunctionNamesByType;
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

                Log.LogVerbose(LogTitle, "{0} unloaded: '{1}'", this.FunctionType, functionName);
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
