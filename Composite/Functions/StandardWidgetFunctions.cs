using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.Types;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Bool;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataType;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Date;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Decimal;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.GuidWidgetFunctions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Integer;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class StandardWidgetFunctions
    {
        /// <exclude />
        public static string GetDefaultWidgetFunctionNameByType(Type type)
        {
            WidgetFunctionProvider provider = GetDefaultWidgetFunctionProviderByType(type);

            if (provider == null) return null;

            return provider.WidgetFunctionCompositeName;
        }

        /// <exclude />
        public static WidgetFunctionProvider GetDefaultWidgetFunctionProviderByType(Type type)
        {
            return GetDefaultWidgetFunctionProviderByType(type, true);
        }

        /// <exclude />
        public static WidgetFunctionProvider GetDefaultWidgetFunctionProviderByType(Type type, bool required)
        {
            if (type == typeof(string)) return StandardWidgetFunctions.TextBoxWidget;
            if (type == typeof(int) || type == typeof(int?)) return StandardWidgetFunctions.IntegerTextBoxWidget;
            if (type == typeof(Decimal) || type == typeof(Decimal?)) return StandardWidgetFunctions.DecimalTextBoxWidget;
            if (type == typeof(DateTime) || type == typeof(DateTime?)) return StandardWidgetFunctions.DateSelectorWidget;
            if (type == typeof(Guid) || type == typeof(Guid?)) return StandardWidgetFunctions.GuidTextBoxWidget;
            if (type == typeof(bool) || type == typeof(bool?)) return StandardWidgetFunctions.CheckBoxWidget;

            if (type == typeof(DataReference<IImageFile>)) return StandardWidgetFunctions.GetImageSelectorWidget(required);
            if (type == typeof(NullableDataReference<IImageFile>)) return StandardWidgetFunctions.GetImageSelectorWidget(false);
            if (type == typeof(DataReference<IMediaFile>)) return StandardWidgetFunctions.GetMediaFileSelectorWidget(required);
            if (type == typeof(NullableDataReference<IMediaFile>)) return StandardWidgetFunctions.GetMediaFileSelectorWidget(false);

            if (type == typeof(XhtmlDocument)) return StandardWidgetFunctions.VisualXhtmlDocumentEditorWidget;

            IEnumerable<string> functionNames = FunctionFacade.GetWidgetFunctionNamesByType(type);
            foreach (string functionName in functionNames)
            {
                IWidgetFunction widgetFunction = FunctionFacade.GetWidgetFunction(functionName);
                bool sameType = widgetFunction.ReturnType == type;

                if (!sameType 
                    && !required 
                    && type.IsGenericType && type.GetGenericTypeDefinition() == typeof(DataReference<>)
                    && type.IsAssignableFrom(widgetFunction.ReturnType)
                    && widgetFunction.ReturnType == typeof(NullableDataReference<>).MakeGenericType(type.GetGenericArguments()))
                {
                    sameType = true;
                }

                if (sameType && !widgetFunction.ParameterProfiles.Any(p => p.IsRequired))
                {
                    return new WidgetFunctionProvider(widgetFunction);
                }
            }

            if (type.IsLazyGenericType())
            {
                var lazyType = type.GetGenericArguments().First();

                var provider = GetDefaultWidgetFunctionProviderByType(lazyType, required);

                if (provider!=null)
                {
                    return provider;
                }
            }


            return null;
        }


        /// <exclude />
        public static WidgetFunctionProvider DateSelectorWidget
        {
            get
            {
                return new WidgetFunctionProvider(DateSelectorWidgetFunction.CompositeName);
            }
        }


        /// <exclude />
        public static WidgetFunctionProvider DateTimeSelectorWidget
        {
            get
            {
                return new WidgetFunctionProvider(DateTimeSelectorWidgetFunction.CompositeName);
            }
        }


        /// <exclude />
        public static WidgetFunctionProvider TextBoxWidget
        {
            get
            {
                return new WidgetFunctionProvider(TextBoxWidgetFuntion.CompositeName);
            }
        }


        /// <exclude />
        public static WidgetFunctionProvider GuidTextBoxWidget
        {
            get
            {
                return new WidgetFunctionProvider(GuidTextBoxWidgetFuntion.CompositeName);
            }
        }


        /// <exclude />
        public static WidgetFunctionProvider DataTypeSelectorWidget
        {
            get
            {
                return new WidgetFunctionProvider(DataTypeSelectorWidgetFunction.CompositeName);
            }
        }


        /// <exclude />
        public static WidgetFunctionProvider TextAreaWidget
        {
            get
            {
                return new WidgetFunctionProvider(TextAreaWidgetFuntion.CompositeName);
            }
        }


        /// <exclude />
        public static WidgetFunctionProvider UrlComboBoxWidget
        {
            get
            {
                return new WidgetFunctionProvider(UrlComboBoxWidgetFunction.CompositeName);
            }
        }


        /// <exclude />
        public static WidgetFunctionProvider VisualXhtmlDocumentEditorWidget
        {
            get
            {
                return new WidgetFunctionProvider(Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.XhtmlDocument.VisualXhtmlEditorFuntion.CompositeName);
            }
        }


        /// <exclude />
        public static WidgetFunctionProvider IntegerTextBoxWidget
        {
            get
            {
                return new WidgetFunctionProvider(IntegerTextBoxWidgetFuntion.CompositeName);
            }
        }


        /// <exclude />
        public static WidgetFunctionProvider DecimalTextBoxWidget
        {
            get
            {
                return new WidgetFunctionProvider(DecimalTextBoxWidgetFuntion.CompositeName);
            }
        }


        /// <exclude />
        public static WidgetFunctionProvider CheckBoxWidget
        {
            get
            {
                return new WidgetFunctionProvider(CheckBoxWidgetFuntion.CompositeName);
            }
        }


        /// <exclude />
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


        /// <exclude />
        public static WidgetFunctionProvider GetDataReferenceWidget<T>()
            where T : class, IData
        {
            if (typeof(T) == typeof(IPage))
            {
                return new WidgetFunctionProvider(PageReferenceSelectorWidgetFunction.CompositeName);
            }
            if (typeof(T) == typeof(IMediaFile))
            {
                return GetMediaFileSelectorWidget(true);
            }
            if (typeof(T) == typeof(IImageFile))
            {
                return GetImageSelectorWidget(true);
            }

            return new WidgetFunctionProvider(DataReferenceSelectorWidgetFunction<T>.CompositeName);
        }


        /// <exclude />
        public static WidgetFunctionProvider GetNullableDataReferenceWidget<T>()
            where T : class, IData
        {
            if (typeof(T) == typeof(IPage))
            {
                return new WidgetFunctionProvider(NullablePageReferenceSelectorWidgetFunction.CompositeName);
            }
            if (typeof(T) == typeof(IMediaFile))
            {
                return GetMediaFileSelectorWidget(false);
            }
            if (typeof(T) == typeof(IImageFile))
            {
                return GetImageSelectorWidget(false);
            }

            return new WidgetFunctionProvider(NullableDataReferenceSelectorWidgetFunction<T>.CompositeName);
        }



        /// <exclude />
        public static WidgetFunctionProvider GetImageSelectorWidget(bool selectionRequired)
        {
            List<BaseParameterRuntimeTreeNode> widgetParams = new List<BaseParameterRuntimeTreeNode>();
            widgetParams.Add( new ConstantObjectParameterRuntimeTreeNode(ImageSelectorWidgetFunction.RequiredParameterName, selectionRequired));

            return new WidgetFunctionProvider(ImageSelectorWidgetFunction.CompositeName, widgetParams); 
        }


        /// <exclude />
        public static WidgetFunctionProvider GetMediaFileSelectorWidget(bool selectionRequired)
        {
            List<BaseParameterRuntimeTreeNode> widgetParams = new List<BaseParameterRuntimeTreeNode>();
            widgetParams.Add(new ConstantObjectParameterRuntimeTreeNode(MediaFileSelectorWidgetFunction.RequiredParameterName, selectionRequired));

            return new WidgetFunctionProvider(MediaFileSelectorWidgetFunction.CompositeName, widgetParams);
        }


        /// <exclude />
        public static WidgetFunctionProvider GetBoolSelectorWidget(string trueLabel, string falseLabel)
        {
            return new WidgetFunctionProvider(new BoolSelectorWidgetFuntion(null, trueLabel, falseLabel));
        }


        /// <exclude />
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


        /// <exclude />
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
                ( multiSelect ? new XAttribute("CompactMode", compactMode) : null),
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
        /// <param name="multiSelector"></param>
        /// <param name="required"></param>
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
        /// <param name="multiSelector"></param>
        /// <returns></returns>
        public static WidgetFunctionProvider DropDownList(Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, string optionsObjectKeyPropertyName, string optionsObjectLabelPropertyName, bool multiSelector)
        {
            return DropDownList(optionsGeneratingStaticType, optionsGeneratingStaticMethodName, optionsObjectKeyPropertyName, optionsObjectLabelPropertyName, multiSelector, true);
        }



        /// <exclude />
        public static WidgetFunctionProvider DropDownList(Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, bool multiSelector, bool required)
        {
            return new WidgetFunctionProvider(
                new AdHocDropDownListWidgetFunction(optionsGeneratingStaticType, optionsGeneratingStaticMethodName, ".", ".", multiSelector, true, required));
        }



        /// <exclude />
        public static WidgetFunctionProvider DropDownList(Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, object optionsGeneratingStaticMethodParameterValue, string optionsObjectKeyPropertyName, string optionsObjectLabelPropertyName, bool multiSelector, bool required)
        {
            return new WidgetFunctionProvider(
                new AdHocDropDownListWidgetFunction(optionsGeneratingStaticType, optionsGeneratingStaticMethodName, optionsGeneratingStaticMethodParameterValue, optionsObjectKeyPropertyName, optionsObjectLabelPropertyName, multiSelector, true, required));
        }



        /// <exclude />
        public static WidgetFunctionProvider DropDownList(Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, object optionsGeneratingStaticMethodParameterValue, bool multiSelector, bool compact, bool required)
        {
            return new WidgetFunctionProvider(
                new AdHocDropDownListWidgetFunction(optionsGeneratingStaticType, optionsGeneratingStaticMethodName, optionsGeneratingStaticMethodParameterValue, ".", ".", multiSelector, compact, required));
        }



        private class AdHocDropDownListWidgetFunction : IWidgetFunction
        {
            private readonly Type _type;
            private readonly string _methodName;
            private readonly string _keyPropertyName;
            private readonly string _labelPropertyName;
            private readonly object _parameterValue;
            private readonly bool _multiSelector;
            private readonly bool _compact;
            private readonly bool _required;

            public AdHocDropDownListWidgetFunction(Type optionsGeneratingStaticType, string optionsGeneratingStaticMethodName, string optionsObjectKeyPropertyName, string optionsObjectLabelPropertyName, bool multiSelector, bool compact, bool required)
            {
                _type = optionsGeneratingStaticType;
                _methodName = optionsGeneratingStaticMethodName;
                _keyPropertyName = optionsObjectKeyPropertyName;
                _labelPropertyName = optionsObjectLabelPropertyName;
                _multiSelector = multiSelector;
                _compact = compact;
                _required = required;
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
                    _required,
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
                get { return typeof(object); }
            }

            public IEnumerable<ParameterProfile> ParameterProfiles
            {
                get { yield break; }
            }

            public Composite.C1Console.Security.EntityToken EntityToken
            {
                get { throw new NotImplementedException(); }
            }
        }
    }
}
