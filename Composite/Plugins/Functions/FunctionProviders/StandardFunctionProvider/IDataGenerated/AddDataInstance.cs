using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated
{
    internal sealed class AddDataInstance<T> : StandardFunctionBase
        where T : class, IData
    {
        private List<StandardFunctionParameterProfile> _parameterProfiles = null;


        public AddDataInstance(EntityTokenFactory entityTokenFactory)
            : base("AddDataInstance", typeof(T).FullName, typeof(void), entityTokenFactory)
        {
            this.ResourceHandleNameStem = "Composite.IDataGenerated.AddDataInstance";
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
                        string helpText = dataFieldDescriptor.Name;
                        if (dataFieldDescriptor.FormRenderingProfile != null && !string.IsNullOrWhiteSpace(dataFieldDescriptor.FormRenderingProfile.HelpText))
                        {
                            helpText = dataFieldDescriptor.FormRenderingProfile.HelpText;
                        }

                        bool isGuidKeyField = dataTypeDescriptor.KeyPropertyNames.Contains(dataFieldDescriptor.Name) && (dataFieldDescriptor.InstanceType == typeof(Guid));

                        bool isRequried = dataFieldDescriptor.DefaultValue == null;
                        if (isGuidKeyField)
                        {
                            isRequried = false;
                        }

                        _parameterProfiles.Add(new StandardFunctionParameterProfile(
                            dataFieldDescriptor.Name,
                            dataFieldDescriptor.InstanceType,
                            isRequried,
                            DataInstanceHelper.GetFallbackValueProvider(dataFieldDescriptor, isGuidKeyField),
                            DataInstanceHelper.GetWidgetFunctionProvider(dataFieldDescriptor)
                        )
                        {
                            CustomLabel = dataFieldDescriptor.Name,
                            CustomHelpText = helpText
                        });
                    }                    
                }

                return _parameterProfiles;
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            T data = DataFacade.BuildNew<T>();

            List<PropertyInfo> typePropertites = typeof(T).GetPropertiesRecursively();

            foreach (string parameterName in parameters.AllParameterNames)
            {
                PropertyInfo propertyInfo = typePropertites.Where(f => f.Name == parameterName).Single();

                propertyInfo.SetValue(data, parameters.GetParameter(parameterName, propertyInfo.PropertyType), null);
            }
            
            AssignMissingGuidKeyValues(parameters, data);

            DataFacade.AddNew<T>(data);

            return null;
        }



        private static void AssignMissingGuidKeyValues(ParameterList parameters, T data)
        {
            foreach (PropertyInfo keyPropertyInfo in typeof(T).GetKeyPropertyInfoes())
            {
                if (keyPropertyInfo.PropertyType != typeof(Guid)) continue;

                if (parameters.AllParameterNames.Contains(keyPropertyInfo.Name) == true) continue;

                keyPropertyInfo.SetValue(data, Guid.NewGuid(), null);
            }
        }        
    }
}
