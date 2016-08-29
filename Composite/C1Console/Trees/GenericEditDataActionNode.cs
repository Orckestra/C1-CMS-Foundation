using System;
using System.Text;
using System.Xml.Linq;
using Composite.C1Console.Actions.Data;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Core.Serialization;
using Composite.Core.Xml;


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
            StringBuilder payload = new StringBuilder();
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
            if ((this.OwnerNode is DataElementsTreeNode) == false)
            {
                AddValidationError("TreeValidationError.GenericEditDataAction.OwnerIsNotDataNode");
            }

            if (string.IsNullOrEmpty(this.CustomFormMarkupPath) == false)
            {
                try
                {
                    string path = PathUtil.Resolve(this.CustomFormMarkupPath);
                    if (C1File.Exists(path) == false)
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



        /// <exclude />
        public override string ToString()
        {
            return string.Format("GenericEditDataActionNode, Label = {0}", this.Label);
        }
    }
}
