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
using System.Xml.Linq;


namespace Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider
{
    internal class MethodBasedFunction : IFunction
    {
        private static readonly string LogTitle = typeof(MethodBasedFunction).Name;

        private readonly IMethodBasedFunctionInfo _methodBasedFunctionInfo;
        private readonly Type _type;
        private readonly MethodInfo _methodInfo;
        private IList<ParameterProfile> _parameterProfile;
        private string _functionDescription = null;
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
                    Log.LogError(LogTitle, errorMessage);
                }

                return new NotLoadedMethodBasedFunction(info, errorMessage);
            }

            MethodInfo methodInfo =
                (from mi in type.GetMethods()
                 where mi.Name == info.MethodName
                 select mi).FirstOrDefault();

            if (methodInfo == null)
            {
                string errorMessage = "Could not find the method '{0}' on the the type '{1}'".FormatWith(info.MethodName, info.Type);

                // Skipping error log while package installation, the type/method may be available after restart
                if (!HostingEnvironment.ApplicationHost.ShutdownInitiated())
                {
                    Log.LogError(LogTitle, errorMessage);
                }

                return new NotLoadedMethodBasedFunction(info, errorMessage);
            }

            return new MethodBasedFunction(info, type, methodInfo);
        }


        public object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            IList<object> arguments = new List<object>();
            foreach (ParameterProfile paramProfile in ParameterProfiles)
            {

                arguments.Add(parameters.GetParameter(paramProfile.Name, paramProfile.Type));
            }

            return this.MethodInfo.Invoke(this.Object, arguments.ToArray());
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
                    ParameterInfo[] parameterInfos = this.MethodInfo.GetParameters();

                    Dictionary<string, object> defaultValues = new Dictionary<string, object>();
                    Dictionary<string, string> labels = new Dictionary<string, string>();
                    Dictionary<string, string> helpTexts = new Dictionary<string, string>();
                    Dictionary<string, WidgetFunctionProvider> widgetProviders = new Dictionary<string, WidgetFunctionProvider>();
                    foreach (object obj in this.MethodInfo.GetCustomAttributes(typeof(MethodBasedDefaultValueAttribute), true))
                    {
                        MethodBasedDefaultValueAttribute attribute = (MethodBasedDefaultValueAttribute)obj;
                        defaultValues.Add(attribute.ParameterName, attribute.DefaultValue);
                    }

                    // Run through obsolete FunctionParameterDescriptionAttribute
#pragma warning disable 612,618
                    foreach (object obj in this.MethodInfo.GetCustomAttributes(typeof(FunctionParameterDescriptionAttribute), true))
                    {
                        FunctionParameterDescriptionAttribute attribute = (FunctionParameterDescriptionAttribute)obj;
                        if (attribute.HasDefaultValue && !defaultValues.ContainsKey(attribute.ParameterName))
                            defaultValues.Add(attribute.ParameterName, attribute.DefaultValue);

                        labels.Add(attribute.ParameterName, attribute.ParameterLabel);
                        helpTexts.Add(attribute.ParameterName, attribute.ParameterHelpText);
                    }
#pragma warning restore 612,618

                    // Run trhough new and improved FunctionParameterAttribute. Many may exist for one parameter.
                    foreach (object obj in this.MethodInfo.GetCustomAttributes(typeof(FunctionParameterAttribute), true))
                    {
                        FunctionParameterAttribute attribute = (FunctionParameterAttribute)obj;

                        Verify.That(attribute.HasName, "All [FunctionParameter(...)] definitions on the method '{0}' must have 'Name' specified.", this.MethodInfo.Name);

                        if (attribute.HasDefaultValue && !defaultValues.ContainsKey(attribute.Name))
                            defaultValues.Add(attribute.Name, attribute.DefaultValue);

                        if (attribute.HasLabel && !labels.ContainsKey(attribute.Name))
                            labels.Add(attribute.Name, attribute.Label);

                        if (attribute.HasHelp && !helpTexts.ContainsKey(attribute.Name))
                            helpTexts.Add(attribute.Name, attribute.Help);

                        if (attribute.HasWidgetMarkup && !widgetProviders.ContainsKey(attribute.Name))
                        {
                            try
                            {
                                var widgetFunctionProvider = attribute.GetWidgetFunctionProvider(null, null);
                                widgetProviders.Add(attribute.Name, widgetFunctionProvider);
                            }
                            catch (Exception ex)
                            {
                                string errText = "Failed to set Widget Markup for parameter '{0}' on method '{1}'. {2}"
                                                 .FormatWith(attribute.Name, this.MethodInfo.Name, ex.Message);
                                throw new InvalidOperationException(errText);
                            }
                        }
                    }

                    _parameterProfile = new List<ParameterProfile>();

                    foreach (ParameterInfo parameterInfo in parameterInfos)
                    {
                        BaseValueProvider valueProvider;
                        object defaultValue = null;
                        if (defaultValues.TryGetValue(parameterInfo.Name, out defaultValue))
                        {
                            valueProvider = new ConstantValueProvider(defaultValue);
                        }
                        else
                        {
                            valueProvider = new NoValueValueProvider();
                        }

                        bool isRequired = true;
                        if (defaultValues.ContainsKey(parameterInfo.Name))
                        {
                            isRequired = false;
                        }

                        string parameterLabel = parameterInfo.Name;
                        if (labels.ContainsKey(parameterInfo.Name)) parameterLabel = labels[parameterInfo.Name];

                        string parameterHelpText = "";
                        if (helpTexts.ContainsKey(parameterInfo.Name)) parameterHelpText = helpTexts[parameterInfo.Name];

                        WidgetFunctionProvider widgetFunctionProvider = 
                            (widgetProviders.ContainsKey(parameterInfo.Name) ?
                                widgetProviders[parameterInfo.Name] :
                                StandardWidgetFunctions.GetDefaultWidgetFunctionProviderByType(parameterInfo.ParameterType) );

                        _parameterProfile.Add
                        (
                            new ParameterProfile(parameterInfo.Name, parameterInfo.ParameterType, isRequired,
                                valueProvider, widgetFunctionProvider, parameterLabel, new HelpDefinition(parameterHelpText))
                        );
                    }
                }
                return _parameterProfile;
            }
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
