using Composite.Serialization;


namespace Composite.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class StandardUiContainerTypes
    {
        public static IFlowUiContainerType Document { get { return _document; } }
        public static IFlowUiContainerType EmptyDocument { get { return _emptyDocument; } }
        public static IFlowUiContainerType Wizard { get { return _wizard; } }
        public static IFlowUiContainerType DataDialog { get { return _dataDialog; } }
        public static IFlowUiContainerType ConfirmDialog { get { return _confirmDialog; } }
        public static IFlowUiContainerType WarningDialog { get { return _warningDialog; } }
        public static IFlowUiContainerType Null { get { return _null; } }


        private static DocumentUiContainer _document = new DocumentUiContainer();
        private static EmptyDocumentUiContainer _emptyDocument = new EmptyDocumentUiContainer();
        private static WizardUiContainer _wizard = new WizardUiContainer();
        private static DataDialogUiContainer _dataDialog = new DataDialogUiContainer();
        private static ConfirmDialogUiContainer _confirmDialog = new ConfirmDialogUiContainer();
        private static WarningDialogUiContainer _warningDialog = new WarningDialogUiContainer();
        private static NullUiContainer _null = new NullUiContainer();


        [SerializerHandler(typeof(StandardUiContainerTypesSerializerHandler))]
        private class DocumentUiContainer : IFlowUiContainerType
        {
            internal DocumentUiContainer() { }
            string IFlowUiContainerType.ContainerName { get { return "Document"; } }
            ActionResultResponseType IFlowUiContainerType.ActionResultResponseType { get { return ActionResultResponseType.OpenDocument; } }
        }


        [SerializerHandler(typeof(StandardUiContainerTypesSerializerHandler))]
        private class EmptyDocumentUiContainer : IFlowUiContainerType
        {
            internal EmptyDocumentUiContainer() { }
            string IFlowUiContainerType.ContainerName { get { return "EmptyDocument"; } }
            ActionResultResponseType IFlowUiContainerType.ActionResultResponseType { get { return ActionResultResponseType.OpenDocument; } }
        }


        [SerializerHandler(typeof(StandardUiContainerTypesSerializerHandler))]
        private class WizardUiContainer : IFlowUiContainerType
        {
            internal WizardUiContainer() { }
            string IFlowUiContainerType.ContainerName { get { return "Wizard"; } }
            ActionResultResponseType IFlowUiContainerType.ActionResultResponseType { get { return ActionResultResponseType.OpenModalDialog; } }
        }


        [SerializerHandler(typeof(StandardUiContainerTypesSerializerHandler))]
        private class DataDialogUiContainer : IFlowUiContainerType
        {
            internal DataDialogUiContainer() { }
            string IFlowUiContainerType.ContainerName { get { return "DataDialog"; } }
            ActionResultResponseType IFlowUiContainerType.ActionResultResponseType { get { return ActionResultResponseType.OpenModalDialog; } }
        }


        [SerializerHandler(typeof(StandardUiContainerTypesSerializerHandler))]
        private class ConfirmDialogUiContainer : IFlowUiContainerType
        {
            internal ConfirmDialogUiContainer() { }
            string IFlowUiContainerType.ContainerName { get { return "ConfirmDialog"; } }
            ActionResultResponseType IFlowUiContainerType.ActionResultResponseType { get { return ActionResultResponseType.OpenModalDialog; } }
        }


        [SerializerHandler(typeof(StandardUiContainerTypesSerializerHandler))]
        private class WarningDialogUiContainer : IFlowUiContainerType
        {
            internal WarningDialogUiContainer() { }
            string IFlowUiContainerType.ContainerName { get { return "WarningDialog"; } }
            ActionResultResponseType IFlowUiContainerType.ActionResultResponseType { get { return ActionResultResponseType.OpenModalDialog; } }
        }


        [SerializerHandler(typeof(StandardUiContainerTypesSerializerHandler))]
        private class NullUiContainer : IFlowUiContainerType
        {
            internal NullUiContainer() { }
            string IFlowUiContainerType.ContainerName { get { return "Null"; } }
            ActionResultResponseType IFlowUiContainerType.ActionResultResponseType { get { return ActionResultResponseType.None; } }
        }
    }
}
