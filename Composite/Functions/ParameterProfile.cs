using System;
using System.Collections.Generic;
using Composite.Data;
using Composite.Core.ResourceSystem;


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

        public ParameterProfile(string name, Type type, bool isRequired, BaseValueProvider fallbackValueProvider, WidgetFunctionProvider widgetFunctionProvider, string label, HelpDefinition helpDefinition)
        {
            if (string.IsNullOrEmpty(name) == true) throw new ArgumentNullException("name");
            if (type == null) throw new ArgumentNullException("type");
            if (fallbackValueProvider == null) throw new ArgumentNullException("fallbackValueProvider");
            if (string.IsNullOrEmpty(label) == true) throw new ArgumentException("label may not be null or an empty string");
            if (helpDefinition == null) throw new ArgumentNullException("helpDefinition");

            this.Name = name;
            this.Type = type;
            this.IsRequired = isRequired && (!type.IsGenericType || type.GetGenericTypeDefinition() != typeof(NullableDataReference<>));
            this.FallbackValueProvider = fallbackValueProvider;
            _widgetFuntionProvider = widgetFunctionProvider;
            this.Label = label;
            this.HelpDefinition = helpDefinition;
        }


        public ParameterProfile(
            string name, Type type, bool isRequired, BaseValueProvider fallbackValueProvider, WidgetFunctionProvider widgetFunctionProvider, 
            Dictionary<string,object> widgetFunctionRuntimeParameters, string label, HelpDefinition helpDefinition)
            : this( name, type, isRequired, fallbackValueProvider, widgetFunctionProvider, label, helpDefinition )
        {
            _widgetFunctionRuntimeParameters = widgetFunctionRuntimeParameters;
        }

        public string Name { get; private set; }
        public Type Type { get; private set; }

        public bool IsRequired { get; private set; }
        public BaseValueProvider FallbackValueProvider { get; private set; }

        public IWidgetFunction WidgetFunction 
        {
            get
            {
                if (_widgetFuntionProvider == null) return null;
                return _widgetFuntionProvider.WidgetFunction;
            }
        }


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

        public string Label{ get; private set; }
        public HelpDefinition HelpDefinition { get; private set; }


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
