using System;
using System.Linq;
using Composite.C1Console.Workflow;
using Composite.Core.PackageSystem;
using Composite.Data.Types;
using Composite.Data;
using Composite.C1Console.Actions;


namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddPackageSourceWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private bool _urlIsValid = false;


        public AddPackageSourceWorkflow()
        {
            InitializeComponent();
        }



        private void IsUrlValid(object sender, System.Workflow.Activities.ConditionalEventArgs e)
        {
            e.Result = _urlIsValid;
        }



        private void initializeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings.Add("Url", "");
            this.Bindings.Add("HttpOnly", true);
        }



        private void step1CodeActivity_ValidateServerUrl_ExecuteCode(object sender, EventArgs e)
        {
            string url = this.GetBinding<string>("Url");

            try
            {
                UriBuilder uriBuilder = new UriBuilder(url);

                string cleanedUrl = uriBuilder.Uri.ToString().Remove(0, uriBuilder.Scheme.Length + 3);
                if (cleanedUrl.EndsWith("/"))
                {
                    cleanedUrl = cleanedUrl.Remove(cleanedUrl.Length - 1);
                }

                ServerUrlValidationResult serverUrlValidationResult = PackageServerFacade.ValidateServerUrl(cleanedUrl);

                _urlIsValid = true;
                if (serverUrlValidationResult == ServerUrlValidationResult.Invalid)
                {
                    this.ShowFieldMessage("Url", "${Composite.Plugins.PackageElementProvider, AddPackageSource.Step1.UrlNonPackageServer}");
                    _urlIsValid = false;
                }
                else if (serverUrlValidationResult == ServerUrlValidationResult.Https)
                {
                    cleanedUrl = string.Format("https://{0}", cleanedUrl);
                    this.UpdateBinding("HttpOnly", false);
                }
                else if (serverUrlValidationResult == ServerUrlValidationResult.Http)
                {
                    cleanedUrl = string.Format("http://{0}", cleanedUrl);
                }

                this.UpdateBinding("CleanedUrl", cleanedUrl);
            }
            catch (Exception)
            {
                this.ShowFieldMessage("Url", "${Composite.Plugins.PackageElementProvider, AddPackageSource.Step1.UrlNotValid}");
            }
        }



        private void step2CodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            IPackageServerSource packageServerSource = DataFacade.BuildNew<IPackageServerSource>();
            packageServerSource.Id = Guid.NewGuid();
            packageServerSource.Url = this.GetBinding<string>("CleanedUrl");

            DataFacade.AddNew<IPackageServerSource>(packageServerSource);

            SpecificTreeRefresher specificTreeRefresher = this.CreateSpecificTreeRefresher();
            specificTreeRefresher.PostRefreshMesseges(new PackageElementProviderRootEntityToken());
        }
    }
}
