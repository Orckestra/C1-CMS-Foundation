using System;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Collections;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Workflow.ComponentModel.Compiler;
using System.Workflow.ComponentModel.Serialization;
using System.Workflow.ComponentModel;
using System.Workflow.ComponentModel.Design;
using System.Workflow.Runtime;
using System.Workflow.Activities;
using System.Workflow.Activities.Rules;
using Composite.C1Console.Workflow;
using Composite.Data.Types;
using Composite.Data;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Actions;
using Composite.Data.Validation;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Composite.Core.Logging;
using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.UserGroupElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewUserGroupWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
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
                StringResourceSystemFacade.GetString("Composite.Plugins.UserGroupElementProvider", "AddNewUserGroup.AddNewUserGroupStep1.UserGroupNameAlreadyExists"));
        }



        private void finalizeCodeActivity_Finalize_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IUserGroup userGroup = this.GetBinding<IUserGroup>("NewUserGroup");

            userGroup = DataFacade.AddNew<IUserGroup>(userGroup);

            this.CloseCurrentView();

            LoggingService.LogEntry("UserManagement",
                $"New C1 Console user group '{userGroup.Name}' created by '{UserValidationFacade.GetUsername()}'.", 
                LoggingService.Category.Audit,
                TraceEventType.Information);

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
