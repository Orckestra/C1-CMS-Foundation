using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Linq;
using Composite.Core;
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
    public sealed class FunctionRuntimeTreeNode : BaseFunctionRuntimeTreeNode, IAsyncRuntimeTreeNode
    {
        private readonly IFunction _function;

        /// <exclude />
        protected override IMetaFunction HostedFunction => _function;


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


        private ParameterList BuildParameterList(FunctionContextContainer contextContainer, string functionName)
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
                    throw new InvalidOperationException($"Failed to get value for parameter '{parameterProfile.Name}' in function '{functionName}'.", ex);
                }
                parameters.AddConstantParameter(parameterProfile.Name, value, parameterProfile.Type, true);
            }

            return parameters;
        }


        /// <exclude />
        public override object GetValue(FunctionContextContainer contextContainer)
        {
            if (contextContainer == null) throw new ArgumentNullException(nameof(contextContainer));

            string functionName = _function.CompositeName() ?? "<unknown function>";

            using (TimerProfilerFacade.CreateTimerProfiler(functionName))
            {
                ValidateNotSelfCalling();

                try
                {
                    var parameters = BuildParameterList(contextContainer, functionName);

                    object result;

                    IDisposable measurement = null;
                    try
                    {
                        if (functionName != "Composite.Utils.GetInputParameter")
                        {
                            var nodeToLog = functionName;

                            if (_function is IDynamicFunction df && df.PreventFunctionOutputCaching)
                            {
                                nodeToLog += " (PreventCaching)";
                            }

                            measurement = Profiler.Measure(nodeToLog, () => _function.EntityToken);
                        }

                        result = _function.Execute(parameters, contextContainer);
                    }
                    finally
                    {
                        measurement?.Dispose();
                    }

                    return result;
                }
                catch(ThreadAbortException)
                {
                    return null; // Nothing will be returned as ThreadAbort will propagate
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException($"Failed to get value for function '{functionName}'", ex);
                }
            }
        }

        /// <inheritdoc />
        public async Task<object> GetValueAsync(FunctionContextContainer contextContainer)
        {
            if (contextContainer == null) throw new ArgumentNullException(nameof(contextContainer));

            string functionName = _function.CompositeName() ?? "<unknown function>";

            using (TimerProfilerFacade.CreateTimerProfiler(functionName))
            {
                ValidateNotSelfCalling();

                try
                {
                    var parameters = BuildParameterList(contextContainer, functionName);

                    object result;

                    IDisposable measurement = null;
                    try
                    {
                        if (functionName != "Composite.Utils.GetInputParameter")
                        {
                            var nodeToLog = functionName;

                            if (_function is IDynamicFunction df && df.PreventFunctionOutputCaching)
                            {
                                nodeToLog += " (PreventCaching)";
                            }

                            if (_function is IAsyncFunction)
                            {
                                nodeToLog += " (Async)";
                            }

                            measurement = Profiler.Measure(nodeToLog, () => _function.EntityToken);
                        }

                        if (_function is IAsyncFunction asyncFunction)
                        {
                            result = await asyncFunction.ExecuteAsync(parameters, contextContainer);
                        }
                        else
                        {
                            result = _function.Execute(parameters, contextContainer);
                        }
                    }
                    finally
                    {
                        measurement?.Dispose();
                    }

                    return result;
                }
                catch (ThreadAbortException)
                {
                    return null; // Nothing will be returned as ThreadAbort will propagate
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException($"Failed to get value for function '{functionName}'", ex);
                }
            }
        }


        private static object TryGetInjectedValue(Type type)
        {
            return ServiceLocator.GetService(type);
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
            var element = XElement.Parse($@"<f:{FunctionTreeConfigurationNames.FunctionTagName} xmlns:f=""{FunctionTreeConfigurationNames.NamespaceName}"" />");

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
