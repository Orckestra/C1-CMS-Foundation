using System;
using System.Linq;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Extensions;
using Composite.ResourceSystem;
using Composite.Types;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class DeleteInterfaceTypeWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public DeleteInterfaceTypeWorkflow()
        {
            InitializeComponent();
        }



        private DataTypeDescriptor GetDataTypeDescriptor()
        {
            GeneratedDataTypesElementProviderTypeEntityToken entityToken = (GeneratedDataTypesElementProviderTypeEntityToken)this.EntityToken;
            Type type = TypeManager.GetType(entityToken.SerializedTypeName);

            Guid guid = type.GetImmutableTypeId();

            return DataMetaDataFacade.GetDataTypeDescriptor(guid);
        }



        private void DoesTypeExists(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            e.Result = GetDataTypeDescriptor() != null;
        }


        private void TypeIsReferenced(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            var descriptor = GetDataTypeDescriptor();
            Type interfaceType = descriptor.GetInterfaceType();

            // NOTE: Type could reference to itself
            e.Result = interfaceType.GetRefereeTypes().Where(type => type != interfaceType).Any();
        }


        private void initialStateCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();

            string interfaceName = StringExtensionMethods.CreateNamespace(dataTypeDescriptor.Namespace, dataTypeDescriptor.Name, '.');

            interfaceName = string.Format("{0} {1}?", StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DeleteGeneratedInterfaceStep1.Text"), interfaceName);

            this.Bindings.Add("InterfaceType", interfaceName);
        }

        private void codeActivity_ShowTypeIsReferencedWarning(object sender, EventArgs e)
        {
            Type interfaceType = GetDataTypeDescriptor().GetInterfaceType();

            this.ShowMessage(DialogType.Warning,
                             GetLocalizedText("DeleteCompositionTypeWorkflow.ErrorTitle"),
                             GetLocalizedText("DeleteCompositionTypeWorkflow.TypeIsReferenced").FormatWith(interfaceType.FullName));
            return;
        }



        private void codeActivity_finalize_ExecuteCode(object sender, EventArgs e)
        {

            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();

            string errorMessage;
            if (!GeneratedTypesFacade.CanDeleteType(dataTypeDescriptor, out errorMessage))
            {
                this.ShowMessage(DialogType.Warning,
                                "${Composite.StandardPlugins.GeneratedDataTypesElementProvider, DeleteCompositionTypeWorkflow.ErrorTitle}",
                                errorMessage);
                return;
            }

            GeneratedTypesFacade.DeleteType(dataTypeDescriptor);

            GeneratedDataTypesElementProviderRootEntityToken entityToken = new GeneratedDataTypesElementProviderRootEntityToken(this.EntityToken.Source, GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId);

            ParentTreeRefresher parentTreeRefresher = this.CreateParentTreeRefresher();
            parentTreeRefresher.PostRefreshMesseges(entityToken, 2);
        }

        private static string GetLocalizedText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", key);
        }
    }
}
