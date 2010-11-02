using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Xml.Linq;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Core.Serialization;
using Composite.Core.Xml;
using Composite.Data;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class GenericAddDataActionNode : ActionNode
	{
        public static string InterfaceTypeWorkflowPayloadKeyName = "_InterfaceType_";
        public static string CustomFormMarkupPathWorkflowPayloadKeyName = "_CustomFormMarkupPath_";

        public Type InterfaceType { get; internal set; }            // Requried
        public string CustomFormMarkupPath { get; internal set; }   // Optional


        // Cached
        private List<ParentIdEntry> ParentIdEntrys { get; set; }


        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            StringBuilder payload = new StringBuilder();
            this.Serialize(payload);

            if (this.ParentIdEntrys.Count > 0)
            {
                List<EntityToken> entityTokens = dynamicContext.Piggybag.GetParentEntityTokens().ToList();
                entityTokens.Add(dynamicContext.CurrentEntityToken);
                entityTokens.Add(entityToken);

                foreach (ParentIdEntry parentIdEntry in this.ParentIdEntrys)
                {
                    DataEntityToken dataEntityToken = entityTokens.FindDataEntityToken(parentIdEntry.TargetInterface);
                    if (dataEntityToken == null) continue;

                    IData data = dataEntityToken.Data;

                    object keyValue = parentIdEntry.TargetPropertyInfo.GetValue(data, null);

                    StringConversionServices.SerializeKeyValuePair(payload, parentIdEntry.SourcePropertyName, keyValue);
                }
            }
            

            actionAdder(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Trees.Workflows.GenericAddDataWorkflow"), this.PermissionTypes) { 
                Payload = payload.ToString(),
                ExtraPayload = PiggybagSerializer.Serialize(dynamicContext.Piggybag.PreparePiggybag(dynamicContext.CurrentTreeNode, dynamicContext.CurrentEntityToken))
            }))
            {
                VisualData = CreateActionVisualizedData(dynamicValuesHelperReplaceContext)
            });
        }



        protected override void OnInitialize()
        {
            if ((this.InterfaceType != null) && (typeof(IData).IsAssignableFrom(this.InterfaceType) == false))
            {
                AddValidationError("TreeValidationError.Common.NotImplementingIData", this.InterfaceType, typeof(IData));
            }

            this.ParentIdEntrys = new List<ParentIdEntry>();
            
            IEnumerable<TreeNode> treeNodes = this.OwnerNode.Descendants(true).ToList();
            foreach (TreeNode treeNode in treeNodes)
            {
                DataFilteringTreeNode dataFilteringTreeNode = treeNode as DataFilteringTreeNode;

                if (dataFilteringTreeNode == null) continue;

                IEnumerable<ParentIdFilterNode> parentIdFilterNodes = dataFilteringTreeNode.FilterNodes.OfType<ParentIdFilterNode>();
                if (parentIdFilterNodes.Count() == 0) continue;

                foreach (ParentIdFilterNode parentIdFilterNode in parentIdFilterNodes)
                {
                    Type interfaceType = parentIdFilterNode.ParentFilterType;

                    IEnumerable<ForeignPropertyInfo> foreignPropertyInfos = DataReferenceFacade.GetForeignKeyPropertyInfos(this.InterfaceType, interfaceType);

                    foreach (ForeignPropertyInfo foreignPropertyInfo in foreignPropertyInfos)
                    {
                        ParentIdEntry parentIdEntry = new ParentIdEntry
                        {
                            TargetInterface = interfaceType,
                            TargetPropertyInfo = foreignPropertyInfo.TargetKeyPropertyInfo,
                            SourcePropertyName = foreignPropertyInfo.SourcePropertyName
                        };

                        if (this.ParentIdEntrys.Contains(parentIdEntry) == false)
                        {
                            this.ParentIdEntrys.Add(parentIdEntry);
                        }
                    }
                }
            }

            if (string.IsNullOrEmpty(this.CustomFormMarkupPath) == false)
            {
                try
                {
                    string path = PathUtil.Resolve(this.CustomFormMarkupPath);
                    if (File.Exists(path) == false)
                    {
                        AddValidationError("TreeValidationError.GenericAddDataAction.MissingMarkupFile", path);
                    }

                    XDocument document = XDocumentUtils.Load(path);

                    this.CustomFormMarkupPath = path;
                }
                catch
                {
                    AddValidationError("TreeValidationError.GenericAddDataAction.BadMarkupPath", this.CustomFormMarkupPath);
                }
            }
        }



        public override string ToString()
        {
            return string.Format("GenericAddDataActionNode, InterfaceType = {0}, Label = {1}", this.InterfaceType, this.Label);
        }



        [DebuggerDisplay("{SourcePropertyName} -> {TargetInterface}")]
        private sealed class ParentIdEntry
        {
            public Type TargetInterface { get; set; }
            public PropertyInfo TargetPropertyInfo { get; set; }
            public string SourcePropertyName { get; set; }

            public override bool Equals(object obj)
            {
                return Equals(obj as ParentIdEntry);
            }

            public bool Equals(ParentIdEntry parentIdEntry)
            {
                if (parentIdEntry == null) return false;

                return
                    parentIdEntry.TargetInterface == this.TargetInterface &&
                    parentIdEntry.TargetPropertyInfo == this.TargetPropertyInfo &&
                    parentIdEntry.SourcePropertyName == this.SourcePropertyName;
            }

            public override int GetHashCode()
            {
                return this.TargetInterface.GetHashCode() ^ this.TargetPropertyInfo.GetHashCode() ^ this.SourcePropertyName.GetHashCode();
            }
        }
	}
}
