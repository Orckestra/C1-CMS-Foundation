using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Elements;
using Composite.Functions;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.Workflow;


namespace Composite.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ConfirmActionNode : ActionNode
    {
        public string ConfirmTitle { get; internal set; }                           // Requried
        public string ConfirmMessage { get; internal set; }                         // Requried
        public XElement FunctionMarkup { get; internal set; }                       // Requried
        public bool RefreshTree { get; internal set; }                              // Optional

        // Cached values
        public DynamicValuesHelper ConfirmTitleDynamicValuesHelper { get; set; }
        public DynamicValuesHelper ConfirmMessageDynamicValuesHelper { get; set; }

        public AttributeDynamicValuesHelper FunctionMarkupDynamicValuesHelper { get; private set; }


        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            

            WorkflowActionToken actionToken = new WorkflowActionToken(
                WorkflowFacade.GetWorkflowType("Composite.Workflows.Trees.Workflows.ConfirmActionWorkflow"),
                this.PermissionTypes)
            {
                Payload = this.Serialize(),
                ExtraPayload = PiggybagSerializer.Serialize(dynamicContext.Piggybag.PreparePiggybag(this.OwnerNode, dynamicContext.CurrentEntityToken)),
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


            this.FunctionMarkupDynamicValuesHelper = new AttributeDynamicValuesHelper(this.FunctionMarkup);
            this.FunctionMarkupDynamicValuesHelper.Initialize(this.OwnerNode);

            this.ConfirmTitleDynamicValuesHelper = new DynamicValuesHelper(this.ConfirmTitle);
            this.ConfirmTitleDynamicValuesHelper.Initialize(this.OwnerNode);

            this.ConfirmMessageDynamicValuesHelper = new DynamicValuesHelper(this.ConfirmMessage);
            this.ConfirmMessageDynamicValuesHelper.Initialize(this.OwnerNode);
        }
    }
}
