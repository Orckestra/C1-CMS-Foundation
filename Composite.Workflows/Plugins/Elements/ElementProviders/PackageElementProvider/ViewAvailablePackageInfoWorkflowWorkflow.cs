using System;
using System.Linq;
using System.Workflow.Activities;
using Composite.C1Console.Events;
using Composite.C1Console.Forms.DataServices;
using Composite.Core.Configuration;
using Composite.Core.PackageSystem;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ViewAvailablePackageInfoWorkflowWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
                    string name = packageDescription.Name;
                    string documentTitle = (name.Contains('.') && !name.EndsWith(".") ?
                        string.Format("{0} ({1})", name.Substring(name.LastIndexOf('.') + 1), name.Substring(0, name.LastIndexOf('.'))) :
                        name);

                    this.Bindings.Add("DocumentTitle", documentTitle);
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
                    "${Composite.Plugins.PackageElementProvider, ViewAvailableInformation.ShowError.MessageTitle}",
                    "${Composite.Plugins.PackageElementProvider, ViewAvailableInformation.ShowError.MessageMessage}");
            }
        }


        private void viewCodeActivity_ShowMessage_ExecuteCode(object sender, EventArgs e)
        {
            this.ShowMessage(
                DialogType.Error,
                "${Composite.Plugins.PackageElementProvider, ViewAvailableInformation.ShowServerError.MessageTitle}",
                "${Composite.Plugins.PackageElementProvider, ViewAvailableInformation.ShowServerError.MessageMessage}");
        }
    }
}
