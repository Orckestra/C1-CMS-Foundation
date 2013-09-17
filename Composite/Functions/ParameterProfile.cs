using System;
using System.Collections.Generic;
using Composite.Core;
using Composite.Core.Types;
using Composite.Data;
using Composite.Core.ResourceSystem;
using Composite.Core.Extensions;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class ParameterProfile
	{
        private WidgetFunctionProvider _widgetFuntionProvider;
        private Dictionary<string, object> _widgetFunctionRuntimeParameters = new Dictionary<string,object>();

        /// <exclude />
        public ParameterProfile(string name, Type type, bool isRequired, BaseValueProvider fallbackValueProvider, WidgetFunctionProvider widgetFunctionProvider, string label, HelpDefinition helpDefinition)
        {
            Verify.ArgumentNotNull(name, "name");
            Verify.ArgumentNotNull(type, "type");
            Verify.ArgumentNotNull(fallbackValueProvider, "fallbackValueProvider");
            Verify.ArgumentCondition(!label.IsNullOrEmpty(), "label", "label may not be null or an empty string");
            Verify.ArgumentNotNull(helpDefinition, "helpDefinition");

            this.Name = name;
            this.Type = type;
            this.IsRequired = isRequired && (!type.IsGenericType || type.GetGenericTypeDefinition() != typeof(NullableDataReference<>));
            this.FallbackValueProvider = fallbackValueProvider;
            _widgetFuntionProvider = widgetFunctionProvider;
            this.Label = label;
            this.HelpDefinition = helpDefinition;
        }


        /// <exclude />
        public ParameterProfile(
            string name, Type type, bool isRequired, BaseValueProvider fallbackValueProvider, WidgetFunctionProvider widgetFunctionProvider, 
            Dictionary<string,object> widgetFunctionRuntimeParameters, string label, HelpDefinition helpDefinition)
            : this( name, type, isRequired, fallbackValueProvider, widgetFunctionProvider, label, helpDefinition )
        {
            _widgetFunctionRuntimeParameters = widgetFunctionRuntimeParameters;
        }


        /// <exclude />
        public string Name { get; private set; }

        /// <exclude />
        public Type Type { get; private set; }


        /// <exclude />
        public bool IsRequired { get; private set; }

        /// <exclude />
        public BaseValueProvider FallbackValueProvider { get; private set; }


        /// <exclude />
        public IWidgetFunction WidgetFunction 
        {
            get
            {
                if (_widgetFuntionProvider == null) return null;
                return _widgetFuntionProvider.WidgetFunction;
            }
        }


        /// <exclude />
        public IEnumerable<BaseParameterRuntimeTreeNode> WidgetFunctionParameters
        {
            get
            {
                return _widgetFuntionProvider.WidgetFunctionParameters;
            }
        }

//#warning Kill this?
//        public Dictionary<string,object> WidgetFunctionRuntimeParameters 
//        {
//            get
//            {
//                if (_widgetFunctionRuntimeParameters == null) return null;

//                Dictionary<string, object> parameters = new Dictionary<string, object>(_widgetFunctionRuntimeParameters);
//                foreach (BaseParameterRuntimeTreeNode param in _widgetFuntionProvider.WidgetFunctionParameters)
//                {
//                    if (parameters.ContainsKey(param.Name) == false)
//                    {
//                        parameters.Add(param.Name, param.GetValue());
//                    }
//                }

//                return parameters;
//            }
//        }

        /// <exclude />
        public string Label{ get; private set; }

        /// <exclude />
        public HelpDefinition HelpDefinition { get; private set; }


        /// <exclude />
        public object GetDefaultValue()
        {
            // Initializing the binding
            object value = null;

            try
            {
                var fallbackValueProvider = FallbackValueProvider;

                if (!(fallbackValueProvider is NoValueValueProvider))
                {
                    object defaultValue = fallbackValueProvider.GetValue();

                    if (defaultValue != null)
                    {
                        value = ValueTypeConverter.Convert(defaultValue, this.Type);
                    }
                }
            }
            catch (Exception ex)
            {
                Log.LogWarning(typeof(ParameterProfile).Name, ex);
            }

            if (value == null)
            {
                if (this.Type == typeof(bool))
                {
                    value = false;
                }
            }
            return value;
        }

        /// <exclude />
        public string LabelLocalized
        {
            get
            {
                if (this.Label.StartsWith("${"))
                {
                    return StringResourceSystemFacade.ParseString(this.Label);
                }
                else
                {
                    return this.Label;
                }
            }
        }
	}
}
