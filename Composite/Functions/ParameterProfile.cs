using System;
using System.Collections.Generic;
using Composite.Core;
using Composite.Core.Application;
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
        private readonly WidgetFunctionProvider _widgetFunctionProvider;
        private Dictionary<string, object> _widgetFunctionRuntimeParameters;

        private bool? _isInjectedValue;

        /// <exclude />
        public ParameterProfile(string name, Type type, bool isRequired, BaseValueProvider fallbackValueProvider, WidgetFunctionProvider widgetFunctionProvider, string label, HelpDefinition helpDefinition)
            : this(name, type, isRequired, fallbackValueProvider, widgetFunctionProvider, label, helpDefinition, false)
        {
        }

        /// <exclude />
        public ParameterProfile(
            string name, 
            Type type, 
            bool isRequired, 
            BaseValueProvider fallbackValueProvider, 
            WidgetFunctionProvider widgetFunctionProvider, 
            string label, 
            HelpDefinition helpDefinition, 
            bool hideInSimpleView)
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
            _widgetFunctionProvider = widgetFunctionProvider;
            this.Label = label;
            this.HelpDefinition = helpDefinition;
            this.HideInSimpleView = hideInSimpleView;
        }

        /// <exclude />
        public ParameterProfile(
            string name, Type type, bool isRequired, BaseValueProvider fallbackValueProvider, WidgetFunctionProvider widgetFunctionProvider, 
            Dictionary<string,object> widgetFunctionRuntimeParameters, string label, HelpDefinition helpDefinition)
            : this( name, type, isRequired, fallbackValueProvider, widgetFunctionProvider, label, helpDefinition )
        {
            _widgetFunctionRuntimeParameters = widgetFunctionRuntimeParameters;
        }


        /// <summary>
        /// Shows whether the value for the parameter can be dynamically provided.
        /// </summary>
        public bool IsInjectedValue
        {
            get
            {
                if (_isInjectedValue == null)
                {
                    var type = Type;
                    _isInjectedValue = !type.IsPrimitive && ServiceLocator.HasService(type);
                }

                return _isInjectedValue.Value;
            }
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
        public bool HideInSimpleView { get; internal set; }

        /// <exclude />
        public IWidgetFunction WidgetFunction 
        {
            get
            {
                return _widgetFunctionProvider != null ? _widgetFunctionProvider.WidgetFunction : null;
            }
        }


        /// <exclude />
        public IEnumerable<BaseParameterRuntimeTreeNode> WidgetFunctionParameters
        {
            get
            {
                return _widgetFunctionProvider.WidgetFunctionParameters;
            }
        }

//#warning Kill this?
//        public Dictionary<string,object> WidgetFunctionRuntimeParameters 
//        {
//            get
//            {
//                if (_widgetFunctionRuntimeParameters == null) return null;

//                Dictionary<string, object> parameters = new Dictionary<string, object>(_widgetFunctionRuntimeParameters);
//                foreach (BaseParameterRuntimeTreeNode param in _widgetFunctionProvider.WidgetFunctionParameters)
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
                return this.Label.StartsWith("${") ? StringResourceSystemFacade.ParseString(this.Label) : this.Label;
            }
        }
	}
}
