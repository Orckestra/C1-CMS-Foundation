using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.Linq;
using Composite.Core.Serialization;
using Composite.Data;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class GenericAddDataActionNode : ActionNode
    {
        /// <exclude />
        public Type InterfaceType { get; internal set; }            // Requried

        /// <exclude />
        public string CustomFormMarkupPath { get; internal set; }   // Optional


        // Cached
        private List<ParentIdEntry> ParentIdEntries { get; set; }


        /// <exclude />
        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            var payload = new StringBuilder();
            this.Serialize(payload);

            if (this.ParentIdEntries.Count > 0)
            {
                List<EntityToken> entityTokens = dynamicContext.Piggybag.GetParentEntityTokens().ToList();
                entityTokens.Reverse(); 

                entityTokens.Add(dynamicContext.CurrentEntityToken);
                entityTokens.Add(entityToken);

                entityTokens.Reverse();

                foreach (ParentIdEntry parentIdEntry in this.ParentIdEntries)
                {
                    DataEntityToken dataEntityToken = entityTokens.FindDataEntityToken(parentIdEntry.TargetInterface);
                    if (dataEntityToken == null) continue;

                    IData data = dataEntityToken.Data;

                    object keyValue = parentIdEntry.TargetPropertyInfo.GetValue(data, null);

                    StringConversionServices.SerializeKeyValuePair(payload, parentIdEntry.SourcePropertyName, keyValue);
                }
            }

            StringConversionServices.SerializeKeyValuePair(payload, "_InterfaceType_", InterfaceType);
            StringConversionServices.SerializeKeyValuePair(payload, "_IconResourceName_", Icon.ResourceName);

            if (!String.IsNullOrEmpty(CustomFormMarkupPath))
            {
                StringConversionServices.SerializeKeyValuePair(payload, "_CustomFormMarkupPath_", CustomFormMarkupPath);
            }

            actionAdder(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Trees.Workflows.GenericAddDataWorkflow"), this.PermissionTypes)
            {
                Payload = payload.ToString(),
                DoIgnoreEntityTokenLocking = true,
                ExtraPayload = PiggybagSerializer.Serialize(dynamicContext.Piggybag.PreparePiggybag(dynamicContext.CurrentTreeNode, dynamicContext.CurrentEntityToken))
            }))
            {
                VisualData = CreateActionVisualizedData(dynamicValuesHelperReplaceContext)
            });
        }



        /// <exclude />
        protected override void OnInitialize()
        {
            if (this.InterfaceType != null && !typeof(IData).IsAssignableFrom(this.InterfaceType))
            {
                AddValidationError("TreeValidationError.Common.NotImplementingIData", this.InterfaceType, typeof(IData));
            }

            this.ParentIdEntries = new List<ParentIdEntry>();

            IEnumerable<TreeNode> treeNodes = this.OwnerNode.Descendants(true).ToList();
            foreach (TreeNode treeNode in treeNodes)
            {
                DataFilteringTreeNode dataFilteringTreeNode = treeNode as DataFilteringTreeNode;

                if (dataFilteringTreeNode == null) continue;

                IEnumerable<ParentIdFilterNode> parentIdFilterNodes = dataFilteringTreeNode.FilterNodes.OfType<ParentIdFilterNode>().Evaluate();
                if (!parentIdFilterNodes.Any()) continue;

                foreach (ParentIdFilterNode parentIdFilterNode in parentIdFilterNodes)
                {
                    Type interfaceType = parentIdFilterNode.ParentFilterType;

                    IEnumerable<ForeignPropertyInfo> foreignPropertyInfos = DataReferenceFacade.GetForeignKeyProperties(this.InterfaceType, interfaceType);

                    foreach (ForeignPropertyInfo foreignPropertyInfo in foreignPropertyInfos)
                    {
                        var parentIdEntry = new ParentIdEntry(
                            interfaceType,
                            foreignPropertyInfo.TargetKeyPropertyInfo,
                            foreignPropertyInfo.SourcePropertyName
                        );

                        if (!this.ParentIdEntries.Contains(parentIdEntry))
                        {
                            this.ParentIdEntries.Add(parentIdEntry);
                        }
                    }
                }
            }

            if (!string.IsNullOrEmpty(this.CustomFormMarkupPath))
            {
                this.CustomFormMarkupPath = LoadAndValidateCustomFormMarkupPath(CustomFormMarkupPath);
            }
        }


        /// <exclude />
        public override string ToString()
        {
            return $"GenericAddDataActionNode, InterfaceType = {this.InterfaceType}, Label = {this.Label}";
        }



        [DebuggerDisplay("{SourcePropertyName} -> {TargetInterface}")]
        private sealed class ParentIdEntry
        {
            public ParentIdEntry(Type targetInterface, PropertyInfo targetPropertyInfo, string sourcePropertyName)
            {
                TargetInterface = targetInterface;
                TargetPropertyInfo = targetPropertyInfo;
                SourcePropertyName = sourcePropertyName;
            } 

            public Type TargetInterface { get; }
            public PropertyInfo TargetPropertyInfo { get; }
            public string SourcePropertyName { get; }

            public override bool Equals(object obj)
            {
                return Equals(obj as ParentIdEntry);
            }

            private bool Equals(ParentIdEntry parentIdEntry)
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
