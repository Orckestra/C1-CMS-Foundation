using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Linq;
using Composite.Elements;
using Composite.Functions;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.Serialization;
using Composite.Workflow;


namespace Composite.Trees
{    
	public sealed class ReportFunctionActionNode : ActionNode
	{        
        public XElement FunctionMarkup { get; set; }                            // Required
        public string DocumentLabel { get; set; }                               // Optional, defaults to Label
        public ResourceHandle DocumentIcon { get; set; }                        // Optional, defaults to Icon

        
        public AttributeDynamicValuesHelper FunctionMarkupDynamicValuesHelper { get; private set; }
        public DynamicValuesHelper DocumentLabelDynamicValueHelper { get; private set; }


        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            StringBuilder payload = new StringBuilder();
            StringConversionServices.SerializeKeyValuePair(payload, "TreeId", this.OwnerNode.Tree.TreeId);
            StringConversionServices.SerializeKeyValuePair(payload, "ActionId", this.Id);

            WorkflowActionToken actionToken = new WorkflowActionToken(
                WorkflowFacade.GetWorkflowType("Composite.Workflows.Trees.Workflows.ReportFunctionActionWorkflow"), 
                this.PermissionTypes)                
            {
                Payload = this.Serialize(),
                ExtraPayload = PiggybagSerializer.Serialize(dynamicContext.Piggybag.PreparePiggybag(dynamicContext.CurrentTreeNode, dynamicContext.CurrentEntityToken)),
                DoIgnoreEntityTokenLocking = true
            };
            

            actionAdder(new ElementAction(new ActionHandle(actionToken))
            {
                VisualData = CreateActionVisualizedData(dynamicValuesHelperReplaceContext)
            });
        }



        protected override void OnInitialize()
        {
            BaseRuntimeTreeNode baseRuntimeTreeNode = null;

            try
            {
                baseRuntimeTreeNode = FunctionTreeBuilder.Build(this.FunctionMarkup);
            }
            catch
            {
                AddValidationError("TreeValidationError.Common.WrongFunctionMarkup");
                return;
            }

            XDocument document = baseRuntimeTreeNode.GetValue() as XDocument;
            if (document == null)
            {
                AddValidationError("TreeValidationError.ReportFunctionAction.WrongReturnValue", "XDocument");
                return;
            }

            this.FunctionMarkupDynamicValuesHelper = new AttributeDynamicValuesHelper(this.FunctionMarkup);
            this.FunctionMarkupDynamicValuesHelper.Initialize(this.OwnerNode);

            this.DocumentLabelDynamicValueHelper = new DynamicValuesHelper(this.DocumentLabel);
            this.DocumentLabelDynamicValueHelper.Initialize(this.OwnerNode);
        }



        public override string ToString()
        {
            return string.Format("ReportFunctionActionNode, Label = {0}", this.Label);
        }
    }
}
