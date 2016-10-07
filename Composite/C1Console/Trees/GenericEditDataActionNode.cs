using System;
using System.Text;
using Composite.C1Console.Actions.Data;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.Serialization;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class GenericEditDataActionNode : ActionNode
    {
        /// <exclude />
        public string CustomFormMarkupPath { get; internal set; }   // Optional


        /// <exclude />
        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            var payload = new StringBuilder();
            this.Serialize(payload);

            StringConversionServices.SerializeKeyValuePair(payload, "_IconResourceName_", Icon.ResourceName);

            if (!String.IsNullOrEmpty(CustomFormMarkupPath))
            {
                StringConversionServices.SerializeKeyValuePair(payload, "_CustomFormMarkupPath_", CustomFormMarkupPath);

                actionAdder(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Trees.Workflows.GenericEditDataWorkflow"), this.PermissionTypes)
                            {
                                Payload = payload.ToString()
                            }))
                    {
                        VisualData = CreateActionVisualizedData(dynamicValuesHelperReplaceContext)
                    });
            }
            else
            {
                actionAdder(new ElementAction(new ActionHandle(new ProxyDataActionToken(ActionIdentifier.Edit, this.PermissionTypes)))
                {
                    VisualData = CreateActionVisualizedData(dynamicValuesHelperReplaceContext)
                });
            }
        }


        /// <exclude />
        protected override void OnInitialize()
        {
            if (!(this.OwnerNode is DataElementsTreeNode))
            {
                AddValidationError("TreeValidationError.GenericEditDataAction.OwnerIsNotDataNode");
            }

            if (!string.IsNullOrEmpty(this.CustomFormMarkupPath))
            {
                this.CustomFormMarkupPath = LoadAndValidateCustomFormMarkupPath(CustomFormMarkupPath);
            }
        }



        /// <exclude />
        public override string ToString()
        {
            return $"GenericEditDataActionNode, Label = {this.Label}";
        }
    }
}
