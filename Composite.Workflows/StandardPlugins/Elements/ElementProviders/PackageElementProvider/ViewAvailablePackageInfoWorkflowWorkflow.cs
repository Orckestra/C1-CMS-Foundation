using System;
using System.Linq;
using System.Workflow.Activities;
using Composite.ConsoleEventSystem;
using Composite.Forms.DataServices;
using Composite.GlobalSettings;
using Composite.PackageSystem;
using Composite.Users;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ViewAvailablePackageInfoWorkflowWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public ViewAvailablePackageInfoWorkflowWorkflow()
        {
            InitializeComponent();
        }



        private void AddOnDescriptionExists(object sender, ConditionalEventArgs e)
        {
            PackageDescription packageDescription;
            this.TryGetBinding<PackageDescription>("PackageDescription", out packageDescription);
            e.Result = packageDescription != null;
        }



        private void viewStateCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            if (this.BindingExist("PackageDescription") == false)
            {
                PackageElementProviderAvailablePackagesItemEntityToken castedToken = (PackageElementProviderAvailablePackagesItemEntityToken)this.EntityToken;

                PackageDescription packageDescription =
                    (from description in PackageSystemServices.GetFilteredAllAvailablePackages()
                     where description.Id.ToString() == castedToken.Id
                     select description).SingleOrDefault();

                this.Bindings.Add("PackageDescription", packageDescription);

                if (packageDescription != null)
                {
                    this.Bindings.Add("AddOnServerSource", PackageSystemServices.GetPackageSourceNameByPackageId(packageDescription.Id, InstallationInformationFacade.InstallationId, UserSettings.CultureInfo));
                }
            }

            this.SetCustomToolbarDefinition(new FormDefinitionFileMarkupProvider(@"\Administrative\PackageElementProviderViewAvailablePackageInformationToolbar.xml"));
        }



        private void installAddOnCodeActivity_Execute_ExecuteCode(object sender, EventArgs e)
        {
            PackageElementProviderAvailablePackagesItemEntityToken castedToken = (PackageElementProviderAvailablePackagesItemEntityToken)this.EntityToken;

            PackageDescription packageDescription =
                (from description in PackageSystemServices.GetFilteredAllAvailablePackages()
                 where description.Id.ToString() == castedToken.Id
                 select description).FirstOrDefault();

            if (packageDescription != null)
            {
                this.ExecuteWorklow(this.EntityToken, typeof(InstallRemotePackageWorkflow));
            }
            else
            {
                this.ShowMessage(
                    DialogType.Message,
                    "${Composite.StandardPlugins.PackageElementProvider, ViewAvailableInformation.ShowError.MessageTitle}",
                    "${Composite.StandardPlugins.PackageElementProvider, ViewAvailableInformation.ShowError.MessageMessage}");
            }
        }


        private void viewCodeActivity_ShowMessage_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(
                DialogType.Error,
                "${Composite.StandardPlugins.PackageElementProvider, ViewAvailableInformation.ShowServerError.MessageTitle}",
                "${Composite.StandardPlugins.PackageElementProvider, ViewAvailableInformation.ShowServerError.MessageMessage}");
        }
    }
}
