using System;
using Composite.Core.NewIO;
using System.Xml.Linq;
using Composite.C1Console.Elements;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.Xml;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class GenericEditDataActionNode : ActionNode
	{
        public string CustomFormMarkupPath { get; internal set; }   // Optional


        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            string payload = this.Serialize();            

            actionAdder(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Trees.Workflows.GenericEditDataWorkflow"), this.PermissionTypes) { Payload = payload }))
            {
                VisualData = CreateActionVisualizedData(dynamicValuesHelperReplaceContext)
            });
        }



        protected override void OnInitialize()
        {
            if ((this.OwnerNode is DataElementsTreeNode) == false)
            {
                AddValidationError("TreeValidationError.GenericEditDataAction.OwnerIsNotDataNode");
            }

            if (string.IsNullOrEmpty(this.CustomFormMarkupPath) == false)
            {
                try
                {
                    string path = PathUtil.Resolve(this.CustomFormMarkupPath);
                    if (File.Exists(path) == false)
                    {
                        AddValidationError("TreeValidationError.GenericEditDataAction.MissingMarkupFile", path);
                    }

                    XDocument document = XDocumentUtils.Load(path);

                    this.CustomFormMarkupPath = path;
                }
                catch
                {
                    AddValidationError("TreeValidationError.GenericEditDataAction.BadMarkupPath", this.CustomFormMarkupPath);
                }
            }
        }




        public override string ToString()
        {
            return string.Format("GenericEditDataActionNode, Label = {0}", this.Label);
        }
	}
}
