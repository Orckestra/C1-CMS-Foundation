using System;
using System.Xml.Linq;
using System.Linq;
using System.Collections.Generic;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Date;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Integer;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Decimal;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Bool;
using System.Reflection;
using Composite.Xml;
using Composite.Data;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataType;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Guid;
using Composite.Types;
using Composite.Data.Types;


namespace Composite.Functions
{
    public static class StandardWidgetFunctions
    {
        public static string GetDefaultWidgetFunctionNameByType(Type type)
        {
            WidgetFunctionProvider provider = GetDefaultWidgetFunctionProviderByType(type);

            if (provider != null)
            {
                return provider.WidgetFunctionCompositeName;
            }
            else
            {
                return null;
            }
        }

        
        public static WidgetFunctionProvider GetDefaultWidgetFunctionProviderByType(Type type)
        {
            if (type == typeof(string)) return StandardWidgetFunctions.TextBoxWidget;
            if (type == typeof(int) || type == typeof(int?)) return StandardWidgetFunctions.IntegerTextBoxWidget;
            if (type == typeof(Decimal) || type == typeof(Decimal?)) return StandardWidgetFunctions.DecimalTextBoxWidget;
            if (type == typeof(DateTime) || type == typeof(DateTime?)) return StandardWidgetFunctions.DateSelectorWidget;
            if (type == typeof(Guid) || type == typeof(Guid?)) return StandardWidgetFunctions.GuidTextBoxWidget;
            if (type == typeof(bool) || type == typeof(bool?)) return StandardWidgetFunctions.CheckBoxWidget;

            if (type == typeof(DataReference<IImageFile>)) return StandardWidgetFunctions.GetImageSelectorWidget(true);
            if (type == typeof(NullableDataReference<IImageFile>)) return StandardWidgetFunctions.GetImageSelectorWidget(false);
            if (type == typeof(DataReference<IMediaFile>)) return StandardWidgetFunctions.GetMediaFileSelectorWidget(true);
            if (type == typeof(NullableDataReference<IMediaFile>)) return StandardWidgetFunctions.GetMediaFileSelectorWidget(false);

            IEnumerable<string> functionNames = FunctionFacade.GetWidgetFunctionNamesByType(type);
            foreach (string functionName in functionNames)
            {
                IWidgetFunction widgetFunction = FunctionFacade.GetWidgetFunction(functionName);
                bool sameType = widgetFunction.ReturnType.Equals(type);
                if (sameType && widgetFunction.ParameterProfiles.Where(p => p.IsRequired == true).Any() == false)
                {
                    return new WidgetFunctionProvider(widgetFunction);
                }
            }

            return null;
        }


        public static WidgetFunctionProvider DateSelectorWidget
        {
            get
            {
                return new WidgetFunctionProvider(DateSelectorWidgetFunction.CompositeName);
            }
        }


        public static WidgetFunctionProvider DateTimeSelectorWidget
        {
            get
            {
                return new WidgetFunctionProvider(DateTimeSelectorWidgetFunction.CompositeName);
            }
        }


        public static WidgetFunctionProvider TextBoxWidget
        {
            get
            {
                return new WidgetFunctionProvider(TextBoxWidgetFuntion.CompositeName);
            }
        }


        public static WidgetFunctionProvider GuidTextBoxWidget
        {
            get
            {
                return new WidgetFunctionProvider(GuidTextBoxWidgetFuntion.CompositeName);
            }
        }


        public static WidgetFunctionProvider DataTypeSelectorWidget
        {
            get
            {
                return new WidgetFunctionProvider(DataTypeSelectorWidgetFunction.CompositeName);
            }
        }


        public static WidgetFunctionProvider TextAreaWidget
        {
            get
            {
                return new WidgetFunctionProvider(TextAreaWidgetFuntion.CompositeName);
            }
        }


        public static WidgetFunctionProvider VisualXhtmlDocumentEditorWidget
        {
            get
            {
                return new WidgetFunctionProvider(VisualXhtmlEditorFuntion.CompositeName);
            }
        }


        public static WidgetFunctionProvider IntegerTextBoxWidget
        {
            get
            {
                return new WidgetFunctionProvider(IntegerTextBoxWidgetFuntion.CompositeName);
            }
        }


        public static WidgetFunctionProvider DecimalTextBoxWidget
        {
            get
            {
                return new WidgetFunctionProvider(DecimalTextBoxWidgetFuntion.CompositeName);
            }
        }


        public static WidgetFunctionProvider CheckBoxWidget
        {
            get
            {
                return new WidgetFunctionProvider(CheckBoxWidgetFuntion.CompositeName);
            }
        }



        public static WidgetFunctionProvider GetDataReferenceWidget(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (typeof(IData).IsAssignableFrom(interfaceType) == false) throw new ArgumentException(string.Format("The interface type '{0}' does not inherit the interface '{1}", interfaceType, typeof(IData)));

            MethodInfo methodInfo =
                (from mi in typeof(StandardWidgetFunctions).GetMethods(BindingFlags.Public | BindingFlags.Static)
                 where mi.Name == "GetDataReferenceWidget" &&
                       mi.GetParameters().Length == 0
                 select mi).Single();

            methodInfo = methodInfo.MakeGenericMethod(new Type[] { interfaceType });

            return (WidgetFunctionProvider)methodInfo.Invoke(null, null);
        }



        public static WidgetFunctionProvider GetDataReferenceWidget<T>()
            where T : class, IData
        {
            return new WidgetFunctionProvider(DataReferenceSelectorWidgetFunction<T>.CompositeName);
        }



        public static WidgetFunctionProvider GetNullableDataReferenceWidget<T>()
            where T : class, IData
        {
            return new WidgetFunctionProvider(NullableDataReferenceSelectorWidgetFunction<T>.CompositeName);
        }



        public static WidgetFunctionProvider GetImageSelectorWidget(bool selectionRequired)
        {
            List<BaseParameterRuntimeTreeNode> widgetParams = new List<BaseParameterRuntimeTreeNode>();
            widgetParams.Add( new ConstantObjectParameterRuntimeTreeNode(ImageSelectorWidgetFunction.RequiredParameterName, selectionRequired));

            return new WidgetFunctionProvider(ImageSelectorWidgetFunction.CompositeName, widgetParams); 
        }



        public static WidgetFunctionProvider GetMediaFileSelectorWidget(bool selectionRequired)
        {
            List<BaseParameterRuntimeTreeNode> widgetParams = new List<BaseParameterRuntimeTreeNode>();
            widgetParams.Add(new ConstantObjectParameterRuntimeTreeNode(MediaFileSelectorWidgetFunction.RequiredParameterName, selectionRequired));

            return new WidgetFunctionProvider(MediaFileSelectorWidgetFunction.CompositeName, widgetParams);
        }



        public static WidgetFunctionProvider GetBoolSelectorWidget(string trueLabel, string falseLabel)
        {
            return new WidgetFunctionProvider(new BoolSelectorWidgetFuntion(null, trueLabel, falseLabel));
        }


        public static XElement BuildBasicFormsMarkup(XNamespace uiControlNamespace, string uiControlName, string bindingPropertyName, string label, HelpDefinition help, string bindingSourceName)
        {
            XNamespace forms10Space = Namespaces.BindingForms10;

            XElement widgetMarkup =
                new XElement(uiControlNamespace + uiControlName,
                    new XAttribute("Label", label),
                    new XAttribute("Help", help.HelpText),
                    new XElement(uiControlNamespace + string.Format("{0}.{1}", uiControlName, bindingPropertyName),
                        new XElement(forms10Space + "bind",
                            new XAttribute("source", bindingSourceName))));

            return widgetMarkup;
        }



        public static XElement BuildStaticCallPopulatedSelectorFormsMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName, Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, object optionsGeneratingStaticMethodParameterValue, string optionsObjectKeyPropertyName, string optionsObjectLabelPropertyName, bool multiSelect, bool compactMode, bool required, bool bindToString)
        {
            string tagName = (multiSelect==true? "MultiKeySelector": "KeySelector");
            string bindingPropertyName = (multiSelect && bindToString ? "SelectedAsString" : "Selected");

            XElement selector = StandardWidgetFunctions.BuildBasicFormsMarkup(Namespaces.BindingFormsStdUiControls10, tagName, bindingPropertyName, label, helpDefinition, bindingSourceName);
            XNamespace f = Namespaces.BindingFormsStdFuncLib10;

            selector.Add(
                new XAttribute("OptionsKeyField", optionsObjectKeyPropertyName),
                new XAttribute("OptionsLabelField", optionsObjectLabelPropertyName),
                new XAttribute("Required", required),
                ( multiSelect == true ? new XAttribute("CompactMode", compactMode) : null),
                new XElement(selector.Name.Namespace + (tagName + ".Options"),
                    new XElement(f + "StaticMethodCall",
                       new XAttribute("Type", TypeManager.SerializeType(optionsGeneratingStaticType)),
                       new XAttribute("Method", optionsGeneratingStaticMethodName))));

            if (optionsGeneratingStaticMethodParameterValue != null) selector.Descendants(f + "StaticMethodCall").First().Add(
                  new XAttribute("Parameters", optionsGeneratingStaticMethodParameterValue));

            return selector;
        }


        /// <summary>
        /// Creates a WidgetFunctionProvider that yields a drop down list populated with options from a static method call. You can return anonymous types.
        /// </summary>
        /// <param name="optionsGeneratingStaticType">The type containing the static method to call</param>
        /// <param name="optionsGeneratingStaticMethodName">The name of the static method to call. The method should take no parameters and return an IEnumerable.</param>
        /// <param name="optionsObjectKeyPropertyName">The name of the property on the return item type to use as key in the drop down</param>
        /// <param name="optionsObjectLabelPropertyName">The name of the property on the return item type to use as label in the drop down</param>
        /// <returns></returns>
        public static WidgetFunctionProvider DropDownList(Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, string optionsObjectKeyPropertyName, string optionsObjectLabelPropertyName, bool multiSelector, bool required)
        {
            return new WidgetFunctionProvider(
                new AdHocDropDownListWidgetFunction(optionsGeneratingStaticType, optionsGeneratingStaticMethodName, optionsObjectKeyPropertyName, optionsObjectLabelPropertyName, multiSelector, true, required));
        }


        /// <summary>
        /// Creates a WidgetFunctionProvider that yields a drop down list populated with options from a static method call. You can return anonymous types.
        /// </summary>
        /// <param name="optionsGeneratingStaticType">The type containing the static method to call</param>
        /// <param name="optionsGeneratingStaticMethodName">The name of the static method to call. The method should take no parameters and return an IEnumerable.</param>
        /// <param name="optionsObjectKeyPropertyName">The name of the property on the return item type to use as key in the drop down</param>
        /// <param name="optionsObjectLabelPropertyName">The name of the property on the return item type to use as label in the drop down</param>
        /// <returns></returns>
        public static WidgetFunctionProvider DropDownList(Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, string optionsObjectKeyPropertyName, string optionsObjectLabelPropertyName, bool multiSelector)
        {
            return DropDownList(optionsGeneratingStaticType, optionsGeneratingStaticMethodName, optionsObjectKeyPropertyName, optionsObjectLabelPropertyName, multiSelector, true);
        }



        public static WidgetFunctionProvider DropDownList(Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, bool multiSelector, bool required)
        {
            return new WidgetFunctionProvider(
                new AdHocDropDownListWidgetFunction(optionsGeneratingStaticType, optionsGeneratingStaticMethodName, ".", ".", multiSelector, true, required));
        }



        public static WidgetFunctionProvider DropDownList(Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, object optionsGeneratingStaticMethodParameterValue, string optionsObjectKeyPropertyName, string optionsObjectLabelPropertyName, bool multiSelector, bool required)
        {
            return new WidgetFunctionProvider(
                new AdHocDropDownListWidgetFunction(optionsGeneratingStaticType, optionsGeneratingStaticMethodName, optionsGeneratingStaticMethodParameterValue, optionsObjectKeyPropertyName, optionsObjectLabelPropertyName, multiSelector, true, required));
        }



        public static WidgetFunctionProvider DropDownList(Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, object optionsGeneratingStaticMethodParameterValue, bool multiSelector, bool compact, bool required)
        {
            return new WidgetFunctionProvider(
                new AdHocDropDownListWidgetFunction(optionsGeneratingStaticType, optionsGeneratingStaticMethodName, optionsGeneratingStaticMethodParameterValue, ".", ".", multiSelector, compact, required));
        }



        private class AdHocDropDownListWidgetFunction : IWidgetFunction
        {
            private Type _type;
            private string _methodName;
            private string _keyPropertyName;
            private string _labelPropertyName;
            private object _parameterValue;
            private bool _multiSelector;
            private bool _compact;

            public AdHocDropDownListWidgetFunction(Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, string optionsObjectKeyPropertyName, string optionsObjectLabelPropertyName, bool multiSelector, bool compact, bool required)
            {
                _type = optionsGeneratingStaticType;
                _methodName = optionsGeneratingStaticMethodName;
                _keyPropertyName = optionsObjectKeyPropertyName;
                _labelPropertyName = optionsObjectLabelPropertyName;
                _multiSelector = multiSelector;
                _compact = compact;
            }



            public AdHocDropDownListWidgetFunction(Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, object parameterValue, string optionsObjectKeyPropertyName, string optionsObjectLabelPropertyName, bool multiSelector, bool compact, bool required)
                : this(optionsGeneratingStaticType, optionsGeneratingStaticMethodName, optionsObjectKeyPropertyName, optionsObjectLabelPropertyName, multiSelector, compact, required)
            {
                if (parameterValue == null) throw new ArgumentNullException("parameterValue");
                _parameterValue = parameterValue;
            }



            public XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
            {
                return StandardWidgetFunctions.BuildStaticCallPopulatedSelectorFormsMarkup(
                    parameters,
                    label,
                    helpDefinition,
                    bindingSourceName,
                    _type,
                    _methodName,
                    _parameterValue,
                    _keyPropertyName,
                    _labelPropertyName,
                    _multiSelector,
                    _compact,
                    false,
                    false);
            }


            public string Name
            {
                get { return "AdHocDropDownListWidget"; }
            }

            public string Namespace
            {
                get { return "Composite.AdHoc"; }
            }

            public virtual string Description { get { return ""; } }

            public Type ReturnType
            {
                get { throw new NotImplementedException(); }
            }

            public IEnumerable<ParameterProfile> ParameterProfiles
            {
                get { yield break; }
            }

            public Composite.Security.EntityToken EntityToken
            {
                get { throw new NotImplementedException(); }
            }
        }
    }
}
