using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Security;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;


namespace Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider
{
    internal sealed class EditableMethodBasedFunction : IFunction
    {
        private ICSharpFunction _editableMethodBasedFunctionInfo;
        private MethodInfo _methodInfo;
        private IList<ParameterProfile> _parameterProfile;


        private EditableMethodBasedFunction(ICSharpFunction info, MethodInfo methodInfo)
        {
            _editableMethodBasedFunctionInfo = info;
            _methodInfo = methodInfo;
        }



        public static EditableMethodBasedFunction Create(ICSharpFunction info)
        {
            MethodInfo methodInfo = CSharpFunctionHelper.Create(info);   

            /*Type type = TypeManager.TryGetType(info.Type);

            if (type == null)
            {
                LoggingService.LogError("MethodBasedFunctionProvider", string.Format("Could not find the type '{0}'", info.Type));
                return null;
            }

            MethodInfo methodInfo =
                (from mi in type.GetMethods()
                 where mi.Name == info.MethodName
                 select mi).FirstOrDefault();

            if (methodInfo == null)
            {
                LoggingService.LogError("MethodBasedFunctionProvider", string.Format("Could not find the method '{0}' on the the type '{1}'", info.MethodName, info.Type));
                return null;
            }*/

            return new EditableMethodBasedFunction(info, methodInfo);
        }



        public object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            IList<object> arguments = new List<object>();
            foreach (ParameterProfile paramProfile in ParameterProfiles)
            {
                arguments.Add(parameters.GetParameter(paramProfile.Name, paramProfile.Type));
            }

            return this.MethodInfo.Invoke(null, arguments.ToArray());
        }



        public string Name
        {
            get { return _editableMethodBasedFunctionInfo.Name; }
        }



        public string Namespace
        {
            get { return _editableMethodBasedFunctionInfo.Namespace; }
        }



        public string Description 
        { 
            get 
            {
                return "ljklkj";
                //return string.Format("This is a static method call to the function '{0}' on '{1}'.", _methodBasedFunctionInfo.MethodName, _methodBasedFunctionInfo.Type); 
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
                yield break;

                /*if (_parameterProfile == null)
                {
                    ParameterInfo[] parameterInfos = this.MethodInfo.GetParameters();

                    Dictionary<string, object> defaultValues = new Dictionary<string, object>();
                    Dictionary<string, string> labels = new Dictionary<string, string>();
                    Dictionary<string, string> helpTexts = new Dictionary<string, string>();
                    foreach (object obj in this.MethodInfo.GetCustomAttributes(typeof(MethodBasedDefaultValueAttribute), true))
                    {
                        MethodBasedDefaultValueAttribute attribute = (MethodBasedDefaultValueAttribute)obj;
                        defaultValues.Add(attribute.ParameterName, attribute.DefaultValue);
                    }

                    foreach (object obj in this.MethodInfo.GetCustomAttributes(typeof(FunctionParameterDescriptionAttribute), true))
                    {
                        FunctionParameterDescriptionAttribute attribute = (FunctionParameterDescriptionAttribute)obj;
                        if (attribute.HasDefaultValue)
                        {
                            if (defaultValues.ContainsKey(attribute.ParameterName) == false)
                                defaultValues.Add(attribute.ParameterName, attribute.DefaultValue);
                        }

                        labels.Add(attribute.ParameterName, attribute.ParameterLabel);
                        helpTexts.Add(attribute.ParameterName, attribute.ParameterHelpText);
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
                            StandardWidgetFunctions.GetDefaultWidgetFunctionProviderByType(parameterInfo.ParameterType);

                        _parameterProfile.Add
                        (
                            new ParameterProfile(parameterInfo.Name, parameterInfo.ParameterType, isRequired,
                                valueProvider, widgetFunctionProvider, parameterLabel, new HelpDefinition(parameterHelpText))
                        );
                    }
                }
                return _parameterProfile;*/
            }
        }




        private MethodInfo MethodInfo
        {
            get
            {
                return _methodInfo;
            }
        }



        public EntityToken EntityToken
        {
            get
            {
                return _editableMethodBasedFunctionInfo.GetDataEntityToken();
            }
        }
    }   
}
