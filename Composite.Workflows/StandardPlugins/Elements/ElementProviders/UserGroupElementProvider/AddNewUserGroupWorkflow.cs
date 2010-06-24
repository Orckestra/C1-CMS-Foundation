using System;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Collections;
using System.Drawing;
using System.Linq;
using System.Workflow.ComponentModel.Compiler;
using System.Workflow.ComponentModel.Serialization;
using System.Workflow.ComponentModel;
using System.Workflow.ComponentModel.Design;
using System.Workflow.Runtime;
using System.Workflow.Activities;
using System.Workflow.Activities.Rules;
using Composite.Workflow;
using Composite.Data.Types;
using Composite.Data;
using Composite.ResourceSystem;
using Composite.Actions;
using Composite.Validation;
using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.StandardPlugins.Elements.ElementProviders.UserGroupElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewUserGroupWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public AddNewUserGroupWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            IUserGroup userGroup = DataFacade.BuildNew<IUserGroup>();
            userGroup.Id = Guid.NewGuid();

            this.Bindings.Add("NewUserGroup", userGroup);
        }



        private void ValidateGroupName(object sender, ConditionalEventArgs e)
        {
            IUserGroup userGroup = this.GetBinding<IUserGroup>("NewUserGroup");

            bool exists =
                (from ug in DataFacade.GetData<IUserGroup>()
                 where ug.Name == userGroup.Name
                 select ug).Any();

            e.Result = exists == false;
        }



        private void ShowGroupValidationError(object sender, EventArgs e)
        {
            this.ShowFieldMessage(
                "NewUserGroup.Name",
                StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "AddNewUserGroup.AddNewUserGroupStep1.UserGroupNameAlreadyExists"));
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IUserGroup userGroup = this.GetBinding<IUserGroup>("NewUserGroup");

            userGroup = DataFacade.AddNew<IUserGroup>(userGroup);

            this.CloseCurrentView();

            addNewTreeRefresher.PostRefreshMesseges(userGroup.GetDataEntityToken());

            this.ExecuteWorklow(userGroup.GetDataEntityToken(), typeof(EditUserGroupWorkflow));

        }



        private void ValidateData(object sender, ConditionalEventArgs e)
        {
            IUserGroup userGroup = this.GetBinding<IUserGroup>("NewUserGroup");

            ValidationResults validationResults = ValidationFacade.Validate<IUserGroup>(userGroup);
            e.Result = validationResults.IsValid;
        }



        private void ShowDataValidateErrorCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            IUserGroup userGroup = this.GetBinding<IUserGroup>("NewUserGroup");

            ValidationResults validationResults = ValidationFacade.Validate<IUserGroup>(userGroup);
            
            this.ShowFieldMessage(
                "NewUserGroup.Name",
                validationResults.First().Message);
        }
    }
}
