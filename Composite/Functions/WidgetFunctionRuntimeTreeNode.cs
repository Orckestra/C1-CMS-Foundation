using System;
using System.Linq;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Functions.Foundation;


namespace Composite.Functions
{
    public sealed class WidgetFunctionRuntimeTreeNode : BaseFunctionRuntimeTreeNode
    {
        private IWidgetFunction _widgetFunction;


        private bool _cachedValueCalculated = false;
        private object _cachedValue;

        public WidgetFunctionRuntimeTreeNode(IWidgetFunction widgetFunction)
            : this(widgetFunction, "", new HelpDefinition(""), "", new List<BaseParameterRuntimeTreeNode>())
        {
        }



        public WidgetFunctionRuntimeTreeNode(IWidgetFunction widgetFunction, List<BaseParameterRuntimeTreeNode> parameters)
            : this(widgetFunction, "", new HelpDefinition(""), "", parameters)
        {
        }



        public WidgetFunctionRuntimeTreeNode(IWidgetFunction widgetFunction, string label, HelpDefinition helpDefinition, string bindingSourceName)
            : this(widgetFunction, label, helpDefinition, bindingSourceName, new List<BaseParameterRuntimeTreeNode>())
        {
        }



        public string Label { get; set; }
        public HelpDefinition HelpDefinition { get; set; }
        public string BindingSourceName { get; set; }


        internal WidgetFunctionRuntimeTreeNode(IWidgetFunction widgetFunction, string label, HelpDefinition helpDefinition, string bindingSourceName, List<BaseParameterRuntimeTreeNode> parameters)
        {
            _widgetFunction = widgetFunction;
            this.Label = label;
            this.HelpDefinition = helpDefinition;
            this.BindingSourceName = bindingSourceName;
            this.Parameters = parameters;
        }



        protected override IMetaFunction HostedFunction
        {
            get { return _widgetFunction; }
        }



        public IWidgetFunction GetWidgetFunction()
        {
            return _widgetFunction;
        }



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


            _cachedValue = _widgetFunction.GetWidgetMarkup(parameters, this.Label, this.HelpDefinition, this.BindingSourceName);
            _cachedValueCalculated = true;

            return _cachedValue;
        }



        public override object GetCachedValue(FunctionContextContainer contextContainer)
        {
            if ((_cachedValueCalculated == false))
            {
                return GetValue(contextContainer);
            }
            else
            {
                return _cachedValue;
            }
        }



        public override IEnumerable<string> GetAllSubFunctionNames()
        {
            List<string> names = new List<string>();

            foreach (BaseParameterRuntimeTreeNode parameter in this.Parameters)
            {
                names.AddRange(parameter.GetAllSubFunctionNames());
            }

            return names.Distinct();
        }



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




        public override XElement Serialize()
        {
            XElement element = XElement.Parse(string.Format(@"<f:{0} xmlns:f=""{1}"" />", FunctionTreeConfigurationNames.WidgetFunctionTagName, FunctionTreeConfigurationNames.NamespaceName));

            element.Add(new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, _widgetFunction.CompositeName()));
            element.Add(new XAttribute(FunctionTreeConfigurationNames.LabelAttributeName, this.Label));
            element.Add(new XAttribute(FunctionTreeConfigurationNames.BindingSourceNameAttributeName, this.BindingSourceName));
            element.Add(this.HelpDefinition.Serialize());

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
