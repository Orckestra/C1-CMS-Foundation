using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.Functions.Foundation;
using Composite.Instrumentation;
using Composite.StringExtensions;


namespace Composite.Functions
{
    public sealed class FunctionRuntimeTreeNode : BaseFunctionRuntimeTreeNode
    {
        private IFunction _function;

        private bool _cachedValueCalculated = false;
        private object _cachedValue;


        protected override IMetaFunction HostedFunction
        {
            get { return _function; }
        }


        public FunctionRuntimeTreeNode(IFunction function)
        {
            _function = function;
            this.Parameters = new List<BaseParameterRuntimeTreeNode>();
        }



        internal FunctionRuntimeTreeNode(IFunction function, List<BaseParameterRuntimeTreeNode> parameters)
        {
            _function = function;
            this.Parameters = parameters;
        }




        public override object GetValue(FunctionContextContainer contextContainer)
        {
            using (TimerProfilerFacade.CreateTimerProfiler(this.GetNamespace() + "." + this.GetName()))
            {
                if (contextContainer == null) throw new ArgumentNullException("contextContainer");

                ValidateNotSelfCalling();

                try
                {                    
                    ParameterList parameters = new ParameterList(contextContainer);

                    foreach (ParameterProfile parameterProfile in _function.ParameterProfiles)
                    {
                        List<BaseParameterRuntimeTreeNode> parameterTreeNodes = this.Parameters.Where(ptn => ptn.Name == parameterProfile.Name).ToList();

                        if (parameterTreeNodes.Count > 0)
                        {
                            parameters.AddLazyParameter(parameterProfile.Name, parameterTreeNodes[0], parameterProfile.Type);
                            continue;
                        }

                        if (parameterProfile.Type.IsGenericType
                            && parameterProfile.Type.GetGenericTypeDefinition() == typeof(NullableDataReference<>))
                        {
                            parameters.AddConstantParameter(parameterProfile.Name, null, parameterProfile.Type);
                            continue;
                        }

                        if (parameterProfile.IsRequired)
                        {
                            throw new ArgumentException("Missing parameter '" + parameterProfile.Name + "' (type of " + parameterProfile.Type.FullName + ")");
                        }

                        BaseValueProvider valueProvider = parameterProfile.FallbackValueProvider;

                        object value;
                        try
                        {
                            value = valueProvider.GetValue(contextContainer);
                        }
                        catch (Exception ex)
                        {
                            throw new InvalidOperationException(string.Format("Failed to get value for parameter '{0}' in function '{1}'.", parameterProfile.Name, _function.CompositeName()), ex);
                        }
                        parameters.AddConstantParameter(parameterProfile.Name, value, parameterProfile.Type);
                    }

                    _cachedValue = _function.Execute(parameters, contextContainer);
                    _cachedValueCalculated = true;

                    return _cachedValue;
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException("Failed to get value for function '{0}'".FormatWith(_function.CompositeName()), ex);
                }
            }
        }



        public override object GetCachedValue(FunctionContextContainer contextContainer)
        {
            if (contextContainer == null) throw new ArgumentNullException("contextContainer");

            if (_cachedValueCalculated == false)
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

            names.Add(_function.CompositeName());

            foreach (BaseParameterRuntimeTreeNode parameter in this.Parameters)
            {
                names.AddRange(parameter.GetAllSubFunctionNames());
            }

            return names.Distinct();
        }



        public override XElement Serialize()
        {
            // ensure "f:function" naming:
            XElement element = XElement.Parse(string.Format(@"<f:{0} xmlns:f=""{1}"" />", FunctionTreeConfigurationNames.FunctionTagName, FunctionTreeConfigurationNames.NamespaceName));

            element.Add(new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, _function.CompositeName()));

            foreach (ParameterProfile parameterProfile in _function.ParameterProfiles)
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
