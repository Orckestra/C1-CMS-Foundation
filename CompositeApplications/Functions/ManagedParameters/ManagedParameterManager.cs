using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Extensions;
using Composite.Transactions;
using Composite.Types;


namespace Composite.Functions.ManagedParameters
{
    public static class ManagedParameterManager
    {
        public static IEnumerable<ManagedParameterDefinition> Load(Guid ownerId)
        {
            return (from parameter in DataFacade.GetData<IParameter>().AsEnumerable()
                    where parameter.OwnerId == ownerId
                    orderby parameter.Position
                    select BuildParameterDefinition(parameter)).ToList();
        }


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



        public static IEnumerable<ParameterProfile> GetParameterProfiles(Guid ownerId)
        {
            return new ManagedParameterProfiles(ownerId);
        }



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
            private Guid _ownerId;
            private List<ParameterProfile> _parameterProfiles = null;


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
                    _parameterProfiles = new List<ParameterProfile>();

                    // NOTE: It would be nice to cache parameters collection instance in order to improve start-up time
                    var parameters =
                        (from parameter in DataFacade.GetData<IParameter>().AsEnumerable()
                         where parameter.OwnerId == _ownerId
                         orderby parameter.Position
                         select parameter).ToList();

                    foreach (var parameter in parameters)
                    {
                        _parameterProfiles.Add(BuildParameterProfile(parameter));
                    }
                }
            }



            private ParameterProfile BuildParameterProfile(IParameter parameter)
            {
                Type parameterType = TypeManager.GetType(parameter.TypeManagerName);
                bool isRequired = false;
                BaseValueProvider defaultValueProvider;

                if (string.IsNullOrEmpty(parameter.DefaultValueFunctionMarkup) == true)
                {
                    defaultValueProvider = new NoValueValueProvider();
                    isRequired = true;
                }
                else
                {
                    defaultValueProvider = new FunctionValueProvider(XElement.Parse(parameter.DefaultValueFunctionMarkup));
                }

                WidgetFunctionProvider widgetFunctionProvider = null;
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
