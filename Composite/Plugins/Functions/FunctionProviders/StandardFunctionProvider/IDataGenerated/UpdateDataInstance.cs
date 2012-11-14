using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Linq;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated
{
    internal sealed class UpdateDataInstance<T> : StandardFunctionBase
        where T : class, IData
    {
        private List<StandardFunctionParameterProfile> _parameterProfiles = null;



        public UpdateDataInstance(EntityTokenFactory entityTokenFactory)
            : base("UpdateDataInstance", typeof(T).FullName, typeof(void), entityTokenFactory)
        {
            this.ResourceHandleNameStem = "Composite.IDataGenerated.UpdateDataInstance";
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                if (_parameterProfiles == null)
                {
                    _parameterProfiles = new List<StandardFunctionParameterProfile>();
                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeof(T));

                    foreach (DataFieldDescriptor dataFieldDescriptor in dataTypeDescriptor.Fields)
                    {
                        if (dataTypeDescriptor.KeyPropertyNames.Contains(dataFieldDescriptor.Name)) continue;

                        string helpText = dataFieldDescriptor.Name;
                        if (dataFieldDescriptor.FormRenderingProfile != null && !string.IsNullOrWhiteSpace(dataFieldDescriptor.FormRenderingProfile.HelpText))
                        {
                            helpText = dataFieldDescriptor.FormRenderingProfile.HelpText;
                        }
                        

                        _parameterProfiles.Add(new StandardFunctionParameterProfile(
                            dataFieldDescriptor.Name,
                            dataFieldDescriptor.InstanceType,
                            false,
                            DataInstanceHelper.GetFallbackValueProvider(dataFieldDescriptor, false),
                            DataInstanceHelper.GetWidgetFunctionProvider(dataFieldDescriptor)
                        )
                        {
                            CustomLabel = dataFieldDescriptor.Name,
                            CustomHelpText = helpText
                        });
                    }

                    Expression<Func<T, bool>> defaultFilter = DataFacade.GetEmptyPredicate<T>();

                    _parameterProfiles.Add(new StandardFunctionParameterProfile(
                        "Filter",
                        typeof(Expression<Func<T, bool>>),
                        false,
                        new ConstantValueProvider(defaultFilter),
                        null
                    ));
                }

                return _parameterProfiles;
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            Expression<Func<T, bool>> filter = parameters.GetParameter<Expression<Func<T, bool>>>("Filter");

            List<PropertyInfo> typePropertites = typeof(T).GetPropertiesRecursively();

            List<Tuple<PropertyInfo, object>> newValues = new List<Tuple<PropertyInfo, object>>();
            foreach (string parameterName in parameters.AllParameterNames.Where(f => f != "Filter"))
            {
                if (parameters.IsDefaultValue(parameterName)) continue;

                PropertyInfo propertyInfo = typePropertites.Where(f => f.Name == parameterName).Single();

                object value = parameters.GetParameter(parameterName, propertyInfo.PropertyType);

                newValues.Add(new Tuple<PropertyInfo, object>(propertyInfo, value));
            }


            IEnumerable<T> datas = DataFacade.GetData<T>(filter).Evaluate();
            foreach (T data in datas)
            {
                foreach (Tuple<PropertyInfo, object> newValue in newValues)
                {
                    newValue.Item1.SetValue(data, newValue.Item2, null);
                }
            }

            DataFacade.Update(datas);

            return null;
        }
    }
}
