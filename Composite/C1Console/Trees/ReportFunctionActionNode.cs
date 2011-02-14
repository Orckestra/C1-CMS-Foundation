using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Linq;
using Composite.C1Console.Elements;
using Composite.Functions;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.Core.Serialization;
using Composite.C1Console.Workflow;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class ReportFunctionActionNode : ActionNode
	{
        /// <exclude />
        public XElement FunctionMarkup { get; set; }                            // Required
        
        /// <exclude />
        public string DocumentLabel { get; set; }                               // Optional, defaults to Label

        /// <exclude />
        public ResourceHandle DocumentIcon { get; set; }                        // Optional, defaults to Icon


        /// <exclude />
        public AttributeDynamicValuesHelper FunctionMarkupDynamicValuesHelper { get; private set; }

        /// <exclude />
        public DynamicValuesHelper DocumentLabelDynamicValueHelper { get; private set; }


        /// <exclude />
        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            StringBuilder payload = new StringBuilder();
            StringConversionServices.SerializeKeyValuePair(payload, "TreeId", this.OwnerNode.Tree.TreeId);
            StringConversionServices.SerializeKeyValuePair(payload, "ActionId", this.Id);

            WorkflowActionToken actionToken = new WorkflowActionToken(
                WorkflowFacade.GetWorkflowType("Composite.C1Console.Trees.Workflows.ReportFunctionActionWorkflow"), 
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



        /// <exclude />
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



        /// <exclude />
        public override string ToString()
        {
            return string.Format("ReportFunctionActionNode, Label = {0}", this.Label);
        }
    }
}
