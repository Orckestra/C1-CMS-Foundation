using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Xml.Linq;
using Composite.Core.Application;
using Composite.Data;
using Composite.Functions.Foundation;
using Composite.Core.Instrumentation;
using Composite.Core.Extensions;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [DebuggerDisplay("FunctionRuntimeTreeNode: {_function.Namespace + '.' + _function.Name}")]
    public sealed class FunctionRuntimeTreeNode : BaseFunctionRuntimeTreeNode
    {
        private readonly IFunction _function;

        /// <exclude />
        protected override IMetaFunction HostedFunction
        {
            get { return _function; }
        }


        /// <exclude />
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



        /// <exclude />
        public override object GetValue(FunctionContextContainer contextContainer)
        {
            using (TimerProfilerFacade.CreateTimerProfiler(this.GetNamespace() + "." + this.GetName()))
            {
                if (contextContainer == null) throw new ArgumentNullException("contextContainer");

                ValidateNotSelfCalling();

                try
                {                    
                    var parameters = new ParameterList(contextContainer);

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
                            var injectedValue = TryGetInjectedValue(parameterProfile.Type);

                            if (injectedValue == null)
                            {
                                throw new ArgumentException("Missing parameter '{0}' (type of {1})".FormatWith(parameterProfile.Name, parameterProfile.Type.FullName));
                            }

                            parameters.AddConstantParameter(parameterProfile.Name, injectedValue, parameterProfile.Type);
                            continue;
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
                        parameters.AddConstantParameter(parameterProfile.Name, value, parameterProfile.Type, true);
                    }

                    object result;

                    IDisposable measurement = null;
                    try
                    {
                        string functionName = _function.CompositeName();
                        if (functionName != "Composite.Utils.GetInputParameter")
                        {
                            measurement = Profiler.Measure(functionName ?? "<unknown function>", () => _function.EntityToken);
                        }

                        result = _function.Execute(parameters, contextContainer);
                    }
                    finally
                    {
                        if (measurement != null)
                        {
                            measurement.Dispose();
                        }
                    }

                    return result;
                }
                catch(ThreadAbortException)
                {
                    return null; // Nothing will be returned as ThreadAbort will propagate
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException("Failed to get value for function '{0}'".FormatWith(_function.CompositeName()), ex);
                }
            }
        }

        private static object TryGetInjectedValue(Type type)
        {
            var services = ServiceLocator.RequestServices ?? ServiceLocator.ApplicationServices;
            if (services != null)
            {
                return services.GetService(type);
            }

            return null;
        }

        /// <exclude />
        public override IEnumerable<string> GetAllSubFunctionNames()
        {
            var names = new List<string> { _function.CompositeName() };

            foreach (BaseParameterRuntimeTreeNode parameter in this.Parameters)
            {
                names.AddRange(parameter.GetAllSubFunctionNames());
            }

            return names.Distinct();
        }



        /// <exclude />
        public override XElement Serialize()
        {
            // ensure "f:function" naming:
            XElement element = XElement.Parse(string.Format(@"<f:{0} xmlns:f=""{1}"" />", FunctionTreeConfigurationNames.FunctionTagName, FunctionTreeConfigurationNames.NamespaceName));

            element.Add(new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, _function.CompositeName()));

            foreach (ParameterProfile parameterProfile in _function.ParameterProfiles)
            {
                BaseParameterRuntimeTreeNode parameterRuntimeTreeNode = this.Parameters.FirstOrDefault(ptn => ptn.Name == parameterProfile.Name);

                if (parameterRuntimeTreeNode != null)
                {
                    element.Add(parameterRuntimeTreeNode.Serialize());
                }
            }

            return element;
        }
    }
}
