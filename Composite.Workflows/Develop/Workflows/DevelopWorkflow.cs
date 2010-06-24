using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Workflow.Runtime;
using Composite.Actions;
using Composite.Application;
using Composite.ConsoleEventSystem;
using Composite.Forms.Flows;
using Composite.Logging;
using Composite.Security;
using Composite.Validation.ClientValidationRules;
using Composite.Workflow;
using Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider;
using Composite.Types;
using Composite.Data.Types;


namespace Composite.Develop.Workflows
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Never)]
    public sealed partial class DevelopWorkflow : Composite.Workflow.Activities.FormsWorkflow
    {
        public DevelopWorkflow()
        {
            InitializeComponent();
        }



        private void initializeStateCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            Dictionary<string, string> types = new Dictionary<string, string>();
            types.Add("root", "Da big dady ROOT");
            types.Add("area", "Mr Area/Perspective");
            types.Add("child", "Low life child");
            types.Add("offline", "Turn application offline HARD (10 secs)");
            types.Add("softoffline", "Turn application offline SOFT (10 secs)");
            types.Add("locksystem", "Lock the system message");
            types.Add("pagedatatypedescriptor", "Show IPage DataTypeDescriptor");

            this.Bindings.Add("Types", types);
            this.Bindings.Add("SelectedType", "root");
        }



        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            string formMarkup = @"<?xml version=""1.0"" encoding=""utf-8""?>
<cms:formdefinition xmlns=""http://www.composite.net/ns/management/bindingforms/std.ui.controls.lib/1.0"" xmlns:f=""http://www.composite.net/ns/management/bindingforms/std.function.lib/1.0"" xmlns:cms=""http://www.composite.net/ns/management/bindingforms/1.0"">
  <cms:bindings>
    <cms:binding name=""Types"" type=""System.Object""  />
    <cms:binding name=""SelectedType"" type=""System.String"" />
  </cms:bindings>
  <cms:layout>
      <FieldGroup Label=""Develop Test Workflow"">
        <KeySelector Label=""Type"" OptionsKeyField=""Key"" OptionsLabelField=""Value"">
          <KeySelector.Options>
            <cms:read source=""Types"" />
          </KeySelector.Options>
          <KeySelector.Selected>
            <cms:bind source=""SelectedType"" />
          </KeySelector.Selected>
        </KeySelector>
      </FieldGroup>
  </cms:layout>
</cms:formdefinition>";

            this.DeliverFormData(
                "Develop workflow",
                StandardUiContainerTypes.Wizard,
                new StringBasedFormMarkupProvider(formMarkup),
                this.Bindings,
                new Dictionary<string, List<ClientValidationRule>>()
                );
        }



        private void finalizeStateCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string selectedType = this.GetBinding<string>("SelectedType");

            if (selectedType == "offline")
            {
                ApplicationOnlineHandlerFacade.TurnApplicationOffline(false);
                Thread.Sleep(45000);
                ApplicationOnlineHandlerFacade.TurnApplicationOnline();
            }
            if (selectedType == "softoffline")
            {
                ApplicationOnlineHandlerFacade.TurnApplicationOffline(true);
                Thread.Sleep(45000);
                ApplicationOnlineHandlerFacade.TurnApplicationOnline();
            }
            else if (selectedType == "locksystem")
            {
                this.LockTheSystem();
                ApplicationOnlineHandlerFacade.TurnApplicationOffline(true);
                Thread.Sleep(45000);
                ApplicationOnlineHandlerFacade.TurnApplicationOnline();
            }
            else if (selectedType == "pagedatatypedescriptor")
            {
                GeneratedDataTypesElementProviderTypeEntityToken newToken = new GeneratedDataTypesElementProviderTypeEntityToken(
                    TypeManager.SerializeType(typeof(IPage)),
                    "Flemming",
                    "MyId");

                this.ExecuteAction(newToken, new DataTypeDescriptorToXmlActionToken());
            }
            else
            {
                RelationshipGraph relationshipGraph = new RelationshipGraph(this.EntityToken, RelationshipGraphSearchOption.Both);

                RelationshipGraphLevel relationshipGraphLevel = null;
                if (selectedType == "root")
                {
                    relationshipGraphLevel = relationshipGraph.Levels.Last();
                }
                else if (selectedType == "area")
                {
                    relationshipGraphLevel = relationshipGraph.Levels.ElementAt(relationshipGraph.Levels.Count() - 2);
                }
                else if (selectedType == "child")
                {
                    relationshipGraphLevel = relationshipGraph.Levels.First();
                }

                FlowControllerServicesContainer flowControllerServicesContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                IManagementConsoleMessageService managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

                foreach (EntityToken entityToken in relationshipGraphLevel.AllEntities)
                {
                    managementConsoleMessageService.RefreshTreeSection(entityToken);
                    LoggingService.LogVerbose("DevelopWorkflow", string.Format("Refreshing EntityToken: Type = {0}, Source = {1}, Id = {2}, EntityTokenType = {3}", entityToken.Type, entityToken.Source, entityToken.Id, entityToken.GetType()));
                }
            }
        }        
    }
}
