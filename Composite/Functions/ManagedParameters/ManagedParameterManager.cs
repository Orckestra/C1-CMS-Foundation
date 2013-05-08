using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Extensions;
using Composite.Data.Transactions;
using Composite.Core.Types;


namespace Composite.Functions.ManagedParameters
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ManagedParameterManager
    {
        /// <exclude />
        public static IEnumerable<ManagedParameterDefinition> Load(Guid ownerId)
        {
            return (from parameter in DataFacade.GetData<IParameter>().AsEnumerable()
                    where parameter.OwnerId == ownerId
                    orderby parameter.Position
                    select BuildParameterDefinition(parameter)).ToList();
        }



        /// <exclude />
        public static void Save(Guid ownerId, IEnumerable<ManagedParameterDefinition> parameterDefinitions)
        {
            var dataParams = new List<IParameter>();

            foreach (ManagedParameterDefinition paramDef in parameterDefinitions)
            {
                ValidateParameter(paramDef);

                dataParams.Add(BuildIParameter(ownerId, paramDef));


            }

            using (TransactionScope transationScope = TransactionsFacade.CreateNewScope())
            {
                DataFacade.Delete<IParameter>(f => f.OwnerId == ownerId);                

                foreach (IParameter param in dataParams)
                {
                    DataFacade.AddNew<IParameter>(param);
                }
                transationScope.Complete();
            }
        }



        /// <exclude />
        public static IEnumerable<ParameterProfile> GetParameterProfiles(Guid ownerId)
        {
            return new ManagedParameterProfiles(ownerId);
        }



        /// <exclude />
        public static IEnumerable<ParameterProfile> GetParameterProfiles(IEnumerable<ManagedParameterDefinition> parameterDefinitions)
        {
            var dataParams = new List<IParameter>();

            foreach (ManagedParameterDefinition paramDef in parameterDefinitions)
            {
                ValidateParameter(paramDef);

                dataParams.Add(BuildIParameter(Guid.Empty, paramDef));
            }

            return new ManagedParameterProfiles(dataParams);
        }



        /// <exclude />
        public static ParameterList GetParametersListForTest(IEnumerable<ManagedParameterDefinition> parameterDefinitions)
        {
            ParameterList parameterList = new ParameterList(null);

            foreach (var parameterDefinition in parameterDefinitions)
            {
                if (!parameterDefinition.TestValueFunctionMarkup.IsNullOrEmpty())
                {
                    FunctionRuntimeTreeNode functionNode = (FunctionRuntimeTreeNode)FunctionTreeBuilder.Build(XElement.Parse(parameterDefinition.TestValueFunctionMarkup));
                    FunctionValueProvider valueProvider = new FunctionValueProvider(functionNode);

                    object value = valueProvider.GetValue();
                    parameterList.AddConstantParameter(parameterDefinition.Name, value, parameterDefinition.Type);
                }
                else if (!parameterDefinition.DefaultValueFunctionMarkup.IsNullOrEmpty())
                {
                    FunctionRuntimeTreeNode functionNode = (FunctionRuntimeTreeNode)FunctionTreeBuilder.Build(XElement.Parse(parameterDefinition.DefaultValueFunctionMarkup));
                    FunctionValueProvider valueProvider = new FunctionValueProvider(functionNode);

                    object value = valueProvider.GetValue();
                    parameterList.AddConstantParameter(parameterDefinition.Name, value, parameterDefinition.Type);
                }
                else throw new InvalidOperationException("Parameter '{0}' have neigther 'test value' nor 'default value' specified.".FormatWith(parameterDefinition.Name));
            }


            return parameterList;
        }



        private static void ValidateParameter(ManagedParameterDefinition parameterDefinition)
        {
            if (string.IsNullOrEmpty(parameterDefinition.Name) == true) throw new InvalidOperationException("Name property can not be null or an empty string");
            if (parameterDefinition.Type == null) throw new InvalidOperationException("Type property can not be null");
            if (string.IsNullOrEmpty(parameterDefinition.Label) == true) throw new InvalidOperationException("Parameter '{0}' has an empty 'Label' field".FormatWith(parameterDefinition.Name));
        }



        private static IParameter BuildIParameter(Guid ownerId, ManagedParameterDefinition parameterDefinition)
        {
            IParameter newParam = DataFacade.BuildNew<IParameter>();

            newParam.OwnerId = ownerId;
            newParam.ParameterId = parameterDefinition.Id;
            newParam.Name = parameterDefinition.Name;
            newParam.TypeManagerName = TypeManager.SerializeType( parameterDefinition.Type);
            newParam.Label = parameterDefinition.Label;
            newParam.HelpText = parameterDefinition.HelpText;
            newParam.Position = parameterDefinition.Position;
            newParam.WidgetFunctionMarkup = parameterDefinition.WidgetFunctionMarkup;
            newParam.DefaultValueFunctionMarkup = parameterDefinition.DefaultValueFunctionMarkup;
            newParam.TestValueFunctionMarkup = parameterDefinition.TestValueFunctionMarkup;

            return newParam;
        }



        private static ManagedParameterDefinition BuildParameterDefinition(IParameter parameterData)
        {
            ManagedParameterDefinition paramDef = new ManagedParameterDefinition();

            paramDef.Id = parameterData.ParameterId;
            paramDef.Name = parameterData.Name;
            paramDef.Type = TypeManager.GetType(parameterData.TypeManagerName);
            paramDef.Label = parameterData.Label;
            paramDef.HelpText = parameterData.HelpText;
            paramDef.Position = parameterData.Position;
            paramDef.WidgetFunctionMarkup = parameterData.WidgetFunctionMarkup;
            paramDef.DefaultValueFunctionMarkup = parameterData.DefaultValueFunctionMarkup;
            paramDef.TestValueFunctionMarkup = parameterData.TestValueFunctionMarkup;

            return paramDef;
        }



        private class ManagedParameterProfiles : IEnumerable<ParameterProfile>
        {
            private readonly Guid _ownerId;
            private List<ParameterProfile> _parameterProfiles;

            private static readonly object _syncRoot = new object();
            private static List<IParameter> _parameterCache;

            static ManagedParameterProfiles()
            {
                DataEventSystemFacade.SubscribeToStoreChanged<IParameter>((a, b) => ClearParametersCache(), true);
            }

            public ManagedParameterProfiles(Guid ownerId)
            {
                _ownerId = ownerId;
            }

            public ManagedParameterProfiles(IEnumerable<IParameter> parameters)
            {
                _parameterProfiles = new List<ParameterProfile>();

                foreach (var parameter in parameters)
                {
                    ParameterProfile pp = BuildParameterProfile(parameter);

                    _parameterProfiles.Add(pp);
                }
            }


            public IEnumerator<ParameterProfile> GetEnumerator()
            {
                Initialize();
                return _parameterProfiles.GetEnumerator();
            }


            IEnumerator IEnumerable.GetEnumerator()
            {
                Initialize();
                return _parameterProfiles.GetEnumerator();
            }



            private void Initialize()
            {
                if (_parameterProfiles == null)
                {
                    lock (this)
                    {
                        if (_parameterProfiles == null)
                        {
                            _parameterProfiles = GetParameters();
                        }
                    }
                }
            }

            private List<ParameterProfile> GetParameters()
            {
                var result =  new List<ParameterProfile>();

                var parameters =
                    from parameter in GetParametersCached()
                    where parameter.OwnerId == _ownerId
                    orderby parameter.Position
                    select parameter;

                foreach (var parameter in parameters)
                {
                    result.Add(BuildParameterProfile(parameter));
                }

                return result;
            }

            private static void ClearParametersCache()
            {
                lock(_syncRoot)
                {
                    _parameterCache = null;
                }
            }

            private static IEnumerable<IParameter> GetParametersCached()
            {
                var parameters = _parameterCache;

                if (parameters != null) return parameters;

                lock(_syncRoot)
                {
                    if (_parameterCache == null)
                    {
                        _parameterCache = DataFacade.GetData<IParameter>().ToList();
                    }

                    parameters = _parameterCache;
                }

                return parameters;
            }


            private ParameterProfile BuildParameterProfile(IParameter parameter)
            {
                Type parameterType = TypeManager.GetType(parameter.TypeManagerName);
                bool isRequired = false;
                BaseValueProvider defaultValueProvider;

                if (string.IsNullOrEmpty(parameter.DefaultValueFunctionMarkup))
                {
                    defaultValueProvider = new NoValueValueProvider();
                    isRequired = true;
                }
                else
                {
                    defaultValueProvider = new FunctionValueProvider(XElement.Parse(parameter.DefaultValueFunctionMarkup));
                }

                WidgetFunctionProvider widgetFunctionProvider;
                if (string.IsNullOrEmpty(parameter.WidgetFunctionMarkup) == false)
                {
                    widgetFunctionProvider = new WidgetFunctionProvider(XElement.Parse(parameter.WidgetFunctionMarkup));
                }
                else
                {
                    widgetFunctionProvider = WidgetFunctionProvider.BuildNoWidgetProvider();
                }

                return new ParameterProfile(parameter.Name, parameterType, isRequired, defaultValueProvider, widgetFunctionProvider, parameter.Label, new HelpDefinition(parameter.HelpText));
            }
        }
    }
}
