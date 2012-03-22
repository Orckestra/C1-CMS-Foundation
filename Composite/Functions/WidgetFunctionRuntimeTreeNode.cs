using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading;
using System.Xml.Linq;
using Composite.Functions.Foundation;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class WidgetFunctionRuntimeTreeNode : BaseFunctionRuntimeTreeNode
    {
        private IWidgetFunction _widgetFunction;


        private bool _cachedValueCalculated = false;
        private object _cachedValue;


        /// <exclude />
        public WidgetFunctionRuntimeTreeNode(IWidgetFunction widgetFunction)
            : this(widgetFunction, "", new HelpDefinition(""), "", new List<BaseParameterRuntimeTreeNode>())
        {
        }


        /// <exclude />
        public WidgetFunctionRuntimeTreeNode(IWidgetFunction widgetFunction, List<BaseParameterRuntimeTreeNode> parameters)
            : this(widgetFunction, "", new HelpDefinition(""), "", parameters)
        {
        }


        /// <exclude />
        public WidgetFunctionRuntimeTreeNode(IWidgetFunction widgetFunction, string label, HelpDefinition helpDefinition, string bindingSourceName)
            : this(widgetFunction, label, helpDefinition, bindingSourceName, new List<BaseParameterRuntimeTreeNode>())
        {
        }


        /// <exclude />
        public string Label { get; set; }

        /// <exclude />
        public HelpDefinition HelpDefinition { get; set; }

        /// <exclude />
        public string BindingSourceName { get; set; }


        internal WidgetFunctionRuntimeTreeNode(IWidgetFunction widgetFunction, string label, HelpDefinition helpDefinition, string bindingSourceName, List<BaseParameterRuntimeTreeNode> parameters)
        {
            _widgetFunction = widgetFunction;
            this.Label = label;
            this.HelpDefinition = helpDefinition;
            this.BindingSourceName = bindingSourceName;
            this.Parameters = parameters;
        }


        /// <exclude />
        protected override IMetaFunction HostedFunction
        {
            get { return _widgetFunction; }
        }


        /// <exclude />
        public IWidgetFunction GetWidgetFunction()
        {
            return _widgetFunction;
        }


        /// <exclude />
        public override object GetValue(FunctionContextContainer contextContainer)
        {
            if (contextContainer == null) throw new ArgumentNullException("contextContainer");

            ValidateNotSelfCalling();

            ParameterList parameters = new ParameterList(contextContainer);

            foreach (ParameterProfile parameterProfile in _widgetFunction.ParameterProfiles)
            {
                BaseParameterRuntimeTreeNode parameterTreeNode = this.Parameters.Where(ptn => ptn.Name == parameterProfile.Name).SingleOrDefault();

                if (parameterTreeNode == null)
                {
                    BaseValueProvider valueProvider = parameterProfile.FallbackValueProvider;

                    object value = valueProvider.GetValue(contextContainer);

                    parameters.AddConstantParameter(parameterProfile.Name, value, parameterProfile.Type);
                }
                else
                {
                    parameters.AddLazyParameter(parameterProfile.Name, parameterTreeNode, parameterProfile.Type);
                }
            }


            object result = _widgetFunction.GetWidgetMarkup(parameters, this.Label, this.HelpDefinition, this.BindingSourceName);

            _cachedValue = result;
            Thread.MemoryBarrier();
            _cachedValueCalculated = true;

            return result;
        }


        /// <exclude />
        [Obsolete("This method is not used")]
        public override object GetCachedValue(FunctionContextContainer contextContainer)
        {
            Verify.ArgumentNotNull(contextContainer, "contextContainer");

            return _cachedValueCalculated ? _cachedValue : GetValue(contextContainer);
        }


        /// <exclude />
        public override IEnumerable<string> GetAllSubFunctionNames()
        {
            List<string> names = new List<string>();

            foreach (BaseParameterRuntimeTreeNode parameter in this.Parameters)
            {
                names.AddRange(parameter.GetAllSubFunctionNames());
            }

            return names.Distinct();
        }


        /// <exclude />
        public override bool ContainsNestedFunctions
        {
            get
            {
                foreach (var parameter in this.Parameters)
                {
                    if (parameter.ContainsNestedFunctions == true)
                    {
                        return true;
                    }
                }

                return false;
            }
        }


        /// <exclude />
        public override XElement Serialize()
        {
            XElement element = XElement.Parse(string.Format(@"<f:{0} xmlns:f=""{1}"" />", FunctionTreeConfigurationNames.WidgetFunctionTagName, FunctionTreeConfigurationNames.NamespaceName));

            element.Add(new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, _widgetFunction.CompositeName()));

            if (!string.IsNullOrEmpty(this.Label))
                element.Add(new XAttribute(FunctionTreeConfigurationNames.LabelAttributeName, this.Label));

            if (!string.IsNullOrEmpty(this.BindingSourceName))
                element.Add(new XAttribute(FunctionTreeConfigurationNames.BindingSourceNameAttributeName, this.BindingSourceName));

            if (this.HelpDefinition != null && !string.IsNullOrEmpty(this.HelpDefinition.HelpText))
            {
                element.Add(this.HelpDefinition.Serialize());
            }

            foreach (ParameterProfile parameterProfile in _widgetFunction.ParameterProfiles)
            {
                BaseParameterRuntimeTreeNode parameterRuntimeTreeNode = this.Parameters.Where(ptn => ptn.Name == parameterProfile.Name).FirstOrDefault();

                if (parameterRuntimeTreeNode != null)
                {
                    element.Add(parameterRuntimeTreeNode.Serialize());
                }
            }

            return element;
        }
    }
}
