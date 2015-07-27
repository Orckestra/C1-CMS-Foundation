using System;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.PackageSystem;
using Composite.Data.Types;
using Composite.Data;
using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_PackageElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.PackageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddPackageSourceWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string LogTitle = typeof (AddPackageSourceWorkflow).Name;

        private bool _urlIsValid;

        private static class BindingNames
        {
            public const string Url = "Url";
            public const string HttpOnly = "HttpOnly";
            public const string CleanedUrl = "CleanedUrl";
        }

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
            this.Bindings[BindingNames.Url] = "";
            this.Bindings[BindingNames.HttpOnly] = true;
        }



        private void step1CodeActivity_ValidateServerUrl_ExecuteCode(object sender, EventArgs e)
        {
            string url = this.GetBinding<string>("Url");

            try
            {
                var uriBuilder = new UriBuilder(url);

                string cleanedUrl = uriBuilder.Uri.ToString().Remove(0, uriBuilder.Scheme.Length + 3);
                if (cleanedUrl.EndsWith("/"))
                {
                    cleanedUrl = cleanedUrl.Remove(cleanedUrl.Length - 1);
                }

                ServerUrlValidationResult serverUrlValidationResult = PackageServerFacade.ValidateServerUrl(cleanedUrl);

                _urlIsValid = true;
                if (serverUrlValidationResult == ServerUrlValidationResult.Invalid)
                {
                    this.ShowFieldMessage(BindingNames.Url, Texts.AddPackageSource_Step1_UrlNonPackageServer);
                    _urlIsValid = false;
                }
                else if (serverUrlValidationResult == ServerUrlValidationResult.Https)
                {
                    cleanedUrl = string.Format("https://{0}", cleanedUrl);
                    this.UpdateBinding(BindingNames.HttpOnly, false);
                }
                else if (serverUrlValidationResult == ServerUrlValidationResult.Http)
                {
                    cleanedUrl = string.Format("http://{0}", cleanedUrl);
                }

                this.UpdateBinding(BindingNames.CleanedUrl, cleanedUrl);
            }
            catch (Exception ex)
            {
                Log.LogWarning(LogTitle, "Failed to validate package source '{0}'", url);
                Log.LogWarning(LogTitle, ex);

                this.ShowFieldMessage(BindingNames.Url, Texts.AddPackageSource_Step1_UrlNotValid);
            }
        }



        private void step2CodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            var packageServerSource = DataFacade.BuildNew<IPackageServerSource>();
            packageServerSource.Id = Guid.NewGuid();
            packageServerSource.Url = this.GetBinding<string>(BindingNames.CleanedUrl);

            DataFacade.AddNew(packageServerSource);

            this.CreateSpecificTreeRefresher().PostRefreshMesseges(new PackageElementProviderRootEntityToken());
        }
    }
}
