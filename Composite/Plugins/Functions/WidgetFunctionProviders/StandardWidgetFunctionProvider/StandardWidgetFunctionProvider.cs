using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Functions;
using Composite.Functions.Plugins.WidgetFunctionProvider;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Bool;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataType;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Date;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Decimal;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.GuidWidgetFunctions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Integer;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.String;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Utils;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider
{
    [ConfigurationElementType(typeof(StandardWidgetFunctionProviderData))]
    internal sealed class StandardWidgetFunctionProvider : IDynamicTypeWidgetFunctionProvider
	{
        private EntityTokenFactory _entityTokenFactory;
        private WidgetFunctionNotifier _widgetFunctionNotifier;
        private List<IWidgetFunction> _widgetStaticTypeFunctions = null;
        private List<IWidgetFunction> _widgetDynamicTypeFunctions = null;
        


        public StandardWidgetFunctionProvider(string providerName)
        {
            _entityTokenFactory = new EntityTokenFactory(providerName);
        }



        public WidgetFunctionNotifier WidgetFunctionNotifier
        {
            set { _widgetFunctionNotifier = value; }
        }



        public IEnumerable<IWidgetFunction> Functions
        {
            get 
            {
                if (_widgetStaticTypeFunctions == null)
                {
                    InitializeStaticTypeFunctions();
                }

                foreach (IWidgetFunction widgetFunction in _widgetStaticTypeFunctions)
                {
                    yield return widgetFunction;
                }
            }
        }



        public IEnumerable<IWidgetFunction> DynamicTypeDependentFunctions
        {
            get
            {
                if (_widgetDynamicTypeFunctions == null)
                {
                    InitializeDynamicTypeFunctions();
                }

                foreach (IWidgetFunction widgetFunction in _widgetDynamicTypeFunctions)
                {
                    yield return widgetFunction;
                }
            }
        }



        private void InitializeStaticTypeFunctions()
        {
            _widgetStaticTypeFunctions = new List<IWidgetFunction>();

            _widgetStaticTypeFunctions.Add(new FormMarkupWidgetFuntion(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new TextBoxWidgetFuntion(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new TextAreaWidgetFuntion(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new String.SelectorWidgetFunction(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new DataIdMultiSelectorWidgetFunction(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new String.VisualXhtmlEditorFuntion(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new String.UrlComboBoxWidgetFunction(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new XhtmlDocument.VisualXhtmlEditorFuntion(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new DateSelectorWidgetFunction(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new DateTimeSelectorWidgetFunction(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new MediaFileFolderSelectorWidget(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new MediaFileSelectorWidgetFunction(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new SelectorWidgetFunction(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new ImageSelectorWidgetFunction(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new IntegerTextBoxWidgetFuntion(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new DecimalTextBoxWidgetFuntion(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new GuidTextBoxWidgetFuntion(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new CheckBoxWidgetFuntion(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new BoolSelectorWidgetFuntion(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new DataTypeSelectorWidgetFunction(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new PageReferenceSelectorWidgetFunction(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new NullablePageReferenceSelectorWidgetFunction(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new FontIconSelectorWidgetFuntion(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new SvgIconSelectorWidgetFuntion(_entityTokenFactory));
            _widgetStaticTypeFunctions.Add(new ConsoleIconSelectorWidgetFuntion(_entityTokenFactory));
        }



        private void InitializeDynamicTypeFunctions()
        {
            _widgetDynamicTypeFunctions = new List<IWidgetFunction>();

            List<Type> dataInterfaces = DataFacade.GetAllKnownInterfaces(UserType.Developer);
            // Is there a better way to add these interfaces? They should be added if the properties (keys) is 
            // visible to the user when making a custom form.
            dataInterfaces.Add(typeof(Composite.Data.Types.IPageFolderDefinition));
            dataInterfaces.Add(typeof(Composite.Data.Types.IPageMetaDataDefinition));

            object[] args = new object[] { _entityTokenFactory };

            _widgetDynamicTypeFunctions.AddRange(
                from t in dataInterfaces
                select (IWidgetFunction)Activator.CreateInstance(typeof(DataReferenceSelectorWidgetFunction<>).MakeGenericType(t), args));

            _widgetDynamicTypeFunctions.AddRange(
                from t in dataInterfaces
                select (IWidgetFunction)Activator.CreateInstance(typeof(NullableDataReferenceSelectorWidgetFunction<>).MakeGenericType(t), args));

        }        
    }




    [Assembler(typeof(StandardWidgetFunctionProviderrAssembler))]
    internal sealed class StandardWidgetFunctionProviderData : WidgetFunctionProviderData
    {
    }




    internal sealed class StandardWidgetFunctionProviderrAssembler : IAssembler<IWidgetFunctionProvider, WidgetFunctionProviderData>
    {
        public IWidgetFunctionProvider Assemble(IBuilderContext context, WidgetFunctionProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new StandardWidgetFunctionProvider(objectConfiguration.Name);
        }
    }
}
