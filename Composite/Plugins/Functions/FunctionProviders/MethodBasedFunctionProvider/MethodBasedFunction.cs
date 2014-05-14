using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Hosting;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;


namespace Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider
{
    internal class MethodBasedFunction : IFunction
    {
        private static readonly string LogTitle = typeof(MethodBasedFunction).Name;

        private readonly IMethodBasedFunctionInfo _methodBasedFunctionInfo;
        private readonly Type _type;
        private readonly MethodInfo _methodInfo;
        private volatile IList<ParameterProfile> _parameterProfile;
        private string _functionDescription;
        private object _object;


        protected MethodBasedFunction(IMethodBasedFunctionInfo info, Type type, MethodInfo methodInfo)
        {
            _methodBasedFunctionInfo = info;
            _type = type;
            _methodInfo = methodInfo;
        }



        public static MethodBasedFunction Create(IMethodBasedFunctionInfo info)
        {
            Type type = TypeManager.TryGetType(info.Type);

            if (type == null)
            {
                string errorMessage = "Could not find the type '{0}'".FormatWith(info.Type);

                // Skipping error log while package installation, the type/method may be available after restart
                if (!HostingEnvironment.ApplicationHost.ShutdownInitiated())
                {
                    Log.LogError(LogTitle, GetErrorMessage(info) + errorMessage);
                }

                return new NotLoadedMethodBasedFunction(info, errorMessage);
            }

            MethodInfo methodInfo = type.GetMethods().FirstOrDefault(mi => mi.Name == info.MethodName);

            if (methodInfo == null)
            {
                string errorMessage = "Could not find the method '{0}' on the the type '{1}'".FormatWith(info.MethodName, info.Type);

                // Skipping error log while package installation, the type/method may be available after restart
                if (!HostingEnvironment.ApplicationHost.ShutdownInitiated())
                {
                    Log.LogError(LogTitle, GetErrorMessage(info) + errorMessage);
                }

                return new NotLoadedMethodBasedFunction(info, errorMessage);
            }

            return new MethodBasedFunction(info, type, methodInfo);
        }


        private static string GetErrorMessage(IMethodBasedFunctionInfo info)
        {
            return "Failed to initialize function '{0}.{1}'. ".FormatWith(info.Namespace, info.UserMethodName);
        }

        public object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            IList<object> arguments = new List<object>();
            foreach (ParameterProfile paramProfile in ParameterProfiles)
            {
                arguments.Add(parameters.GetParameter(paramProfile.Name, paramProfile.Type));
            }

            object @object = this.MethodInfo.IsStatic ? null : this.Object;
            return this.MethodInfo.Invoke(@object, arguments.ToArray());
        }



        public string Name
        {
            get { return _methodBasedFunctionInfo.UserMethodName; }
        }



        public string Namespace
        {
            get { return _methodBasedFunctionInfo.Namespace; }
        }



        public virtual string Description 
        { 
            get
            {
                if (string.IsNullOrEmpty(_functionDescription))
                {
                    _functionDescription = this.MethodInfo.GetCustomAttributes(typeof(FunctionAttribute), true).Select(f => ((FunctionAttribute)f).Description).FirstOrDefault();
                    if (string.IsNullOrEmpty(_functionDescription))
                    {
                        return string.Format("This is a static method call to the function '{0}' on '{1}'.", _methodBasedFunctionInfo.MethodName, _methodBasedFunctionInfo.Type);
                    }
                }
                return _functionDescription;
            }
        }


        public Type ReturnType
        {
            get { return MethodInfo.ReturnType; }
        }



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
                            _parameterProfile = InitializeParamteres();
                        }
                    }
                }
                return _parameterProfile;
            }
        }

        private IList<ParameterProfile> InitializeParamteres()
        {
            ParameterInfo[] parameterInfos = this.MethodInfo.GetParameters();

            var defaultValues = new Dictionary<string, object>();
            var labels = new Dictionary<string, string>();
            var helpTexts = new Dictionary<string, string>();
            var widgetProviders = new Dictionary<string, WidgetFunctionProvider>();
            var parametersToHideInSimpleView = new HashSet<string>();

            foreach (object obj in this.MethodInfo.GetCustomAttributes(typeof (MethodBasedDefaultValueAttribute), true))
            {
                MethodBasedDefaultValueAttribute attribute = (MethodBasedDefaultValueAttribute) obj;
                defaultValues.Add(attribute.ParameterName, attribute.DefaultValue);
            }

            // Run through obsolete FunctionParameterDescriptionAttribute
#pragma warning disable 612,618
            foreach (
                object obj in this.MethodInfo.GetCustomAttributes(typeof (FunctionParameterDescriptionAttribute), true))
            {
                FunctionParameterDescriptionAttribute attribute = (FunctionParameterDescriptionAttribute) obj;
                if (attribute.HasDefaultValue && !defaultValues.ContainsKey(attribute.ParameterName))
                    defaultValues.Add(attribute.ParameterName, attribute.DefaultValue);

                labels.Add(attribute.ParameterName, attribute.ParameterLabel);
                helpTexts.Add(attribute.ParameterName, attribute.ParameterHelpText);
            }
#pragma warning restore 612,618

            // Run trhough new and improved FunctionParameterAttribute. Many may exist for one parameter.
            foreach (object obj in this.MethodInfo.GetCustomAttributes(typeof (FunctionParameterAttribute), true))
            {
                var attribute = (FunctionParameterAttribute) obj;

                Verify.That(attribute.HasName,
                            "All [FunctionParameter(...)] definitions on the method '{0}' must have 'Name' specified.",
                            this.MethodInfo.Name);

                string parameterName = attribute.Name;

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
                        string errText = "Failed to set Widget Markup for parameter '{0}' on method '{1}'. {2}"
                            .FormatWith(parameterName, this.MethodInfo.Name, ex.Message);
                        throw new InvalidOperationException(errText);
                    }
                }

                if (attribute.HideInSimpleView)
                {
                    parametersToHideInSimpleView.Add(parameterName);
                }
            }

            var result = new List<ParameterProfile>();

            foreach (ParameterInfo parameterInfo in parameterInfos)
            {
                string parameterName = parameterInfo.Name;

                BaseValueProvider valueProvider;
                object defaultValue = null;
                if (defaultValues.TryGetValue(parameterName, out defaultValue))
                {
                    valueProvider = new ConstantValueProvider(defaultValue);
                }
                else
                {
                    valueProvider = new NoValueValueProvider();
                }

                bool isRequired = !defaultValues.ContainsKey(parameterName);

                string parameterLabel = parameterInfo.Name;
                if (labels.ContainsKey(parameterName)) parameterLabel = labels[parameterName];

                string parameterHelpText = "";
                if (helpTexts.ContainsKey(parameterName)) parameterHelpText = helpTexts[parameterName];

                WidgetFunctionProvider widgetFunctionProvider =
                    (widgetProviders.ContainsKey(parameterName)
                         ? widgetProviders[parameterName]
                         : StandardWidgetFunctions.GetDefaultWidgetFunctionProviderByType(parameterInfo.ParameterType));

                bool hideInSimpleView = parametersToHideInSimpleView.Contains(parameterName);

                result.Add(new ParameterProfile(parameterName, parameterInfo.ParameterType, isRequired,
                                             valueProvider, widgetFunctionProvider, parameterLabel,
                                             new HelpDefinition(parameterHelpText),
                                             hideInSimpleView));
            }

            return result;
        }



        private MethodInfo MethodInfo
        {
            get
            {
                return _methodInfo;
            }
        }



        private object Object
        {
            get
            {
                if (_object == null)
                {
                    _object = Activator.CreateInstance(_type);
                }

                return _object;
            }
        }



        public EntityToken EntityToken
        {
            get
            {
                return _methodBasedFunctionInfo.GetDataEntityToken();
            }
        }
    }
}
