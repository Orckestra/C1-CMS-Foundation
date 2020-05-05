using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Hosting;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider;

namespace Composite.Plugins.Functions.FunctionProviders.ServiceFunctionProvider
{
    internal class ServiceMethodFunction : IFunction
    {
        private static readonly string LogTitle = typeof(ServiceMethodFunction).Name;

        private Type Type { get; }
        private volatile IList<ParameterProfile> _parameterProfile;
        private string _functionDescription;


        protected ServiceMethodFunction(string @namespace, string name, Type type, MethodInfo methodInfo)
        {
            Name = name;
            Namespace = @namespace;
            Type = type;
            MethodInfo = methodInfo;
        }



        public static ServiceMethodFunction Create(Type type, string methodName, string @namespace, string name, string description)
        {
            var methodInfo = type.GetMethods().FirstOrDefault(mi => mi.Name == methodName);

            if (methodInfo == null)
            {
                var errorMessage = "Could not find the method '{0}' on the the type '{1}'".FormatWith(methodName, type.Name);

                // Skipping error log while package installation, the type/method may be available after restart
                if (!HostingEnvironment.ApplicationHost.ShutdownInitiated())
                {
                    Log.LogError(LogTitle, GetErrorMessage(@namespace, name) + errorMessage);
                }
                return null;
            }

            return new ServiceMethodFunction(@namespace, name, type, methodInfo);
        }



        private static string GetErrorMessage(string @namespace, string userMethodName)
        {
            return "Failed to initialize function '{0}.{1}'. ".FormatWith(@namespace, userMethodName);
        }



        public object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            IList<object> arguments = new List<object>();
            foreach (var paramProfile in ParameterProfiles)
            {
                arguments.Add(parameters.GetParameter(paramProfile.Name, paramProfile.Type));
            }

            var @object = MethodInfo.IsStatic ? null : Object;
            return MethodInfo.Invoke(@object, arguments.ToArray());
        }



        public string Name { get; }


        public string Namespace { get; }


        public virtual string Description
        {
            get
            {
                if (string.IsNullOrEmpty(_functionDescription))
                {
                    _functionDescription = MethodInfo.GetCustomAttributes(typeof(FunctionAttribute), true).Select(f => ((FunctionAttribute)f).Description).FirstOrDefault();
                    if (string.IsNullOrEmpty(_functionDescription))
                    {
                        return $"This is a static method call to the function '{MethodInfo.Name}' on '{Type.Name}'.";
                    }
                }
                return _functionDescription;
            }
        }


        public Type ReturnType => MethodInfo.ReturnType;


        public IEnumerable<ParameterProfile> ParameterProfiles
        {
            get
            {
                if (_parameterProfile == null)
                {
                    lock (this)
                    {
                        if (_parameterProfile == null)
                        {
                            _parameterProfile = InitializeParameters();
                        }
                    }
                }
                return _parameterProfile;
            }
        }

        private IList<ParameterProfile> InitializeParameters()
        {
            var parameterInfos = MethodInfo.GetParameters();

            var defaultValues = new Dictionary<string, object>();
            var labels = new Dictionary<string, string>();
            var helpTexts = new Dictionary<string, string>();
            var widgetProviders = new Dictionary<string, WidgetFunctionProvider>();
            var parametersToHideInSimpleView = new HashSet<string>();

            foreach (var obj in MethodInfo.GetCustomAttributes(typeof(MethodBasedDefaultValueAttribute), true))
            {
                var attribute = (MethodBasedDefaultValueAttribute)obj;
                defaultValues.Add(attribute.ParameterName, attribute.DefaultValue);
            }

            // Run through new and improved FunctionParameterAttribute. Many may exist for one parameter.
            foreach (var obj in MethodInfo.GetCustomAttributes(typeof(FunctionParameterAttribute), true))
            {
                var attribute = (FunctionParameterAttribute)obj;

                Verify.That(attribute.HasName,
                            "All [FunctionParameter(...)] definitions on the method '{0}' must have 'Name' specified.",
                            MethodInfo.Name);

                var parameterName = attribute.Name;

                if (attribute.HasDefaultValue && !defaultValues.ContainsKey(parameterName))
                    defaultValues.Add(parameterName, attribute.DefaultValue);

                if (attribute.HasLabel && !labels.ContainsKey(parameterName))
                    labels.Add(parameterName, attribute.Label);

                if (attribute.HasHelp && !helpTexts.ContainsKey(parameterName))
                    helpTexts.Add(parameterName, attribute.Help);

                if (attribute.HasWidgetMarkup && !widgetProviders.ContainsKey(parameterName))
                {
                    try
                    {
                        var widgetFunctionProvider = attribute.GetWidgetFunctionProvider(null, null);
                        widgetProviders.Add(parameterName, widgetFunctionProvider);
                    }
                    catch (Exception ex)
                    {
                        var errText = "Failed to set Widget Markup for parameter '{0}' on method '{1}'. {2}"
                            .FormatWith(parameterName, MethodInfo.Name, ex.Message);
                        throw new InvalidOperationException(errText);
                    }
                }

                if (attribute.HideInSimpleView)
                {
                    parametersToHideInSimpleView.Add(parameterName);
                }
            }

            var result = new List<ParameterProfile>();

            foreach (var parameterInfo in parameterInfos)
            {
                var parameterName = parameterInfo.Name;

                BaseValueProvider valueProvider;
                if (defaultValues.TryGetValue(parameterName, out var defaultValue))
                {
                    valueProvider = new ConstantValueProvider(defaultValue);
                }
                else
                {
                    valueProvider = new NoValueValueProvider();
                }

                var isRequired = !defaultValues.ContainsKey(parameterName);

                var parameterLabel = parameterInfo.Name;
                if (labels.ContainsKey(parameterName)) parameterLabel = labels[parameterName];

                var parameterHelpText = "";
                if (helpTexts.ContainsKey(parameterName)) parameterHelpText = helpTexts[parameterName];

                var widgetFunctionProvider =
                    (widgetProviders.ContainsKey(parameterName)
                         ? widgetProviders[parameterName]
                         : StandardWidgetFunctions.GetDefaultWidgetFunctionProviderByType(parameterInfo.ParameterType));

                var hideInSimpleView = parametersToHideInSimpleView.Contains(parameterName);

                result.Add(new ParameterProfile(parameterName, parameterInfo.ParameterType, isRequired,
                                             valueProvider, widgetFunctionProvider, parameterLabel,
                                             new HelpDefinition(parameterHelpText),
                                             hideInSimpleView));
            }

            return result;
        }



        private MethodInfo MethodInfo { get; }


        private object Object => ServiceLocator.GetService(Type);


        public EntityToken EntityToken => new ServiceFunctionEntityToken(this);
    }
}
