using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.C1Console.Actions.Data;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Core.Xml;
using Composite.Data;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class GenericDuplicateDataActionNode : ActionNode
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
            actionAdder(new ElementAction(new ActionHandle(new ProxyDataActionToken(ActionIdentifier.Duplicate,this.PermissionTypes)))
            {
                VisualData = CreateActionVisualizedData(dynamicValuesHelperReplaceContext)
            });
        }



        /// <exclude />
        protected override void OnInitialize()
        {
            Icon = new ResourceHandle(BuildInIconProviderName.ProviderName, "copy");

            if ((this.InterfaceType != null) && (typeof(IData).IsAssignableFrom(this.InterfaceType) == false))
            {
                AddValidationError("TreeValidationError.Common.NotImplementingIData", this.InterfaceType, typeof(IData));
            }

            this.ParentIdEntries = new List<ParentIdEntry>();

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

                    IEnumerable<ForeignPropertyInfo> foreignPropertyInfos = DataReferenceFacade.GetForeignKeyProperties(this.InterfaceType, interfaceType);

                    foreach (ForeignPropertyInfo foreignPropertyInfo in foreignPropertyInfos)
                    {
                        ParentIdEntry parentIdEntry = new ParentIdEntry
                        {
                            TargetInterface = interfaceType,
                            TargetPropertyInfo = foreignPropertyInfo.TargetKeyPropertyInfo,
                            SourcePropertyName = foreignPropertyInfo.SourcePropertyName
                        };

                        if (this.ParentIdEntries.Contains(parentIdEntry) == false)
                        {
                            this.ParentIdEntries.Add(parentIdEntry);
                        }
                    }
                }
            }

            if (string.IsNullOrEmpty(this.CustomFormMarkupPath) == false)
            {
                try
                {
                    string path = PathUtil.Resolve(this.CustomFormMarkupPath);
                    if (C1File.Exists(path) == false)
                    {
                        AddValidationError("TreeValidationError.GenericDuplicateDataAction.MissingMarkupFile", path);
                    }

                    XDocument document = XDocumentUtils.Load(path);

                    this.CustomFormMarkupPath = path;
                }
                catch
                {
                    AddValidationError("TreeValidationError.GenericDuplicateDataAction.BadMarkupPath", this.CustomFormMarkupPath);
                }
            }
        }



        /// <exclude />
        public override string ToString()
        {
            return string.Format("GenericDuplicateDataActionNode, InterfaceType = {0}, Label = {1}", this.InterfaceType, this.Label);
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
