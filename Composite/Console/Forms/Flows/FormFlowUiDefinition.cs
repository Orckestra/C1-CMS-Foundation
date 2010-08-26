using System.Collections.Generic;
using System.Xml;
using Composite.C1Console.Actions;
using Composite.Data.Validation.ClientValidationRules;


namespace Composite.C1Console.Forms.Flows
{
    internal delegate Dictionary<string, object> DelegatedBindingsProvider();

    internal delegate XmlReader DelegatedMarkupProvider();


    internal class FormFlowUiDefinition : VisualFlowUiDefinitionBase
    {
        private Dictionary<IFormEventIdentifier, FormFlowEventHandler> _eventHandlers = new Dictionary<IFormEventIdentifier, FormFlowEventHandler>();


        public FormFlowUiDefinition(IFormMarkupProvider markupProvider, IFlowUiContainerType containerType, string containerLabel, IBindingsProvider bindingsProvider, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
        {
            this.MarkupProvider = markupProvider;
            this.UiContainerType = containerType;
            this.ContainerLabel = containerLabel;
            this.BindingsProvider = bindingsProvider;
            this.BindingsValidationRules = bindingsValidationRules;
        }


        public FormFlowUiDefinition(IFormMarkupProvider markupProvider, IFlowUiContainerType containerType, string containerLabel, Dictionary<string, object> bindings)
            : this(markupProvider, containerType, containerLabel, new PreLoadedBindingsProvider(bindings), null)
        { }


        public FormFlowUiDefinition(IFormMarkupProvider markupProvider, IFlowUiContainerType containerType, string containerLabel, Dictionary<string, object> bindings, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
            : this(markupProvider, containerType, containerLabel, new PreLoadedBindingsProvider(bindings), bindingsValidationRules)
        { }        

        public FormFlowUiDefinition(XmlReader markupReader, IFlowUiContainerType containerType, string containerLabel, Dictionary<string, object> bindings)
            : this(new PreLoadedMarkupProvider(markupReader), containerType, containerLabel, new PreLoadedBindingsProvider(bindings), null)
        { }

        public FormFlowUiDefinition(XmlReader markupReader, IFlowUiContainerType containerType, string containerLabel, Dictionary<string, object> bindings, Dictionary<string, List<ClientValidationRule>> bindingsValidationRules)
            : this(new PreLoadedMarkupProvider(markupReader), containerType, containerLabel, new PreLoadedBindingsProvider(bindings), bindingsValidationRules)
        { }

        public FormFlowUiDefinition(IFormMarkupProvider markupProvider, IFlowUiContainerType containerType, string containerLabel, DelegatedBindingsProvider delegatedBindingsProvider)
            : this(markupProvider, containerType, containerLabel, new DelegateBasedBindingsProvider(delegatedBindingsProvider), null)
        { }


        public FormFlowUiDefinition(DelegatedMarkupProvider delegatedMarkupProvider, IFlowUiContainerType containerType, string containerLabel, DelegatedBindingsProvider delegatedBindingsProvider)
            : this(new DelegateBasedMarkupProvider(delegatedMarkupProvider), containerType, containerLabel, new DelegateBasedBindingsProvider(delegatedBindingsProvider), null)
        { }


        public IFormMarkupProvider MarkupProvider { get; private set; }

        public IFormMarkupProvider CustomToolbarItemsMarkupProvider { get; private set; }

        public void SetCustomToolbarMarkupProvider(XmlReader markupReader)
        {
            this.CustomToolbarItemsMarkupProvider = new PreLoadedMarkupProvider(markupReader);
        }

        public void SetCustomToolbarMarkupProvider(IFormMarkupProvider markupProvider)
        {
            this.CustomToolbarItemsMarkupProvider = markupProvider;
        }

        public override IFlowUiContainerType UiContainerType { get; protected set; }

        public IBindingsProvider BindingsProvider { get; private set; }

        public Dictionary<IFormEventIdentifier, FormFlowEventHandler> EventHandlers
        {
            get { return _eventHandlers; }
        }

        public Dictionary<string, List<ClientValidationRule>> BindingsValidationRules
        {
            get;
            private set;
        }


        private class PreLoadedMarkupProvider : IFormMarkupProvider
        {
            private XmlReader _xmlReader;

            public PreLoadedMarkupProvider(XmlReader xmlReader)
            {
                _xmlReader = xmlReader;
            }

            public XmlReader GetReader()
            {
                return _xmlReader;
            }
        }



        private class PreLoadedBindingsProvider : IBindingsProvider
        {
            private Dictionary<string, object> _bindings;

            public PreLoadedBindingsProvider(Dictionary<string, object> bindings)
            {
                _bindings = bindings;
            }

            public Dictionary<string, object> GetBindings()
            {
                return _bindings;
            }
        }



        private class DelegateBasedBindingsProvider : IBindingsProvider
        {
            private DelegatedBindingsProvider _delegatedBindingsProvider;

            internal DelegateBasedBindingsProvider(DelegatedBindingsProvider delegatedBindingsProvider)
            {
                _delegatedBindingsProvider = delegatedBindingsProvider;
            }

            public Dictionary<string, object> GetBindings()
            {
                return _delegatedBindingsProvider.Invoke();
            }
        }



        private class DelegateBasedMarkupProvider : IFormMarkupProvider
        {
            private DelegatedMarkupProvider _delegatedMarkupProvider;

            internal DelegateBasedMarkupProvider(DelegatedMarkupProvider delegatedMarkupProvider)
            {
                _delegatedMarkupProvider = delegatedMarkupProvider;
            }

            public XmlReader GetReader()
            {
                return _delegatedMarkupProvider.Invoke();
            }
        }
    }
}
