using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using Composite.Data;
using Composite.Data.Types;
using Composite.Data.Validation.ClientValidationRules;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class ManageHostNameBindingsWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public ManageHostNameBindingsWorkflow()
        {
            InitializeComponent();
        }



        private void PageHasHostnameBindings(object sender, ConditionalEventArgs e)
        {
            e.Result = DataFacade.GetData<IPageHostNameBinding>(f => f.PageId == this.PageId).Any();
        }



        private void HostNameValueIsUsed(object sender, ConditionalEventArgs e)
        {
            string hostName = this.GetBinding<string>("HostName").ToLower();

            e.Result = DataFacade.GetData<IPageHostNameBinding>(f => f.HostName == hostName).Any();
        }



        private void HostNameSyntaxValid(object sender, ConditionalEventArgs e)
        {
            string hostName = this.GetBinding<string>("HostName").ToLower();

            bool nameIsLame = hostName.Contains(" ") || hostName.Contains(",") || hostName.StartsWith(".") || hostName.EndsWith(".") || hostName.Contains("/") || hostName.Contains(":");

            e.Result = (nameIsLame==false);
        }



        private void ensureAddDialogBindings_ExecuteCode(object sender, EventArgs e)
        {
            if (this.BindingExist("HostName") == false)
            {
                this.Bindings.Add("HostName", "");
                this.BindingsValidationRules.Add("HostName", new List<ClientValidationRule> { new NotNullClientValidationRule() });
            }
        }



        private void saveHostNameBinding_ExecuteCode(object sender, EventArgs e)
        {
            string hostName = this.GetBinding<string>("HostName").ToLower();

            IPageHostNameBinding hostNameBinding = DataFacade.BuildNew<IPageHostNameBinding>();
            hostNameBinding.PageId = this.PageId;
            hostNameBinding.HostName = hostName;

            DataFacade.AddNew<IPageHostNameBinding>(hostNameBinding);
        }



        private void ensureRemoveDialogBindings_ExecuteCode(object sender, EventArgs e)
        {
            List<string> existingHostNames = DataFacade.GetData<IPageHostNameBinding>(f => f.PageId == this.PageId).Select(f => f.HostName).ToList();

            if (this.BindingExist("ExistingHostNames") == false)
            {
                this.Bindings.Add("ExistingHostNames", existingHostNames);
            }

            if (this.BindingExist("HostNamesToRemove") == false)
            {
                this.Bindings.Add("HostNamesToRemove", new List<string>(existingHostNames));
            }
        }



        private void removeSelectedHostHeaderBindongs_ExecuteCode(object sender, EventArgs e)
        {
            List<string> hostNamesToRemove = this.GetBinding<List<string>>("HostNamesToRemove");

            DataFacade.Delete<IPageHostNameBinding>(f => f.PageId == this.PageId && hostNamesToRemove.Contains(f.HostName));
        }



        private void storeSelectedPageId_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
            IPage selectedPage = (IPage)dataEntityToken.Data;

            this.PageId = selectedPage.Id;
        }



        private Guid PageId
        {
            get
            {
                return this.GetBinding<Guid>("PageId");
            }

            set
            {
                if (this.BindingExist("PageId") == false)
                {
                    this.Bindings.Add("PageId", value);
                }
                else
                {
                    throw new InvalidOperationException("PageId already set");
                }
            }
        }

    }
}
