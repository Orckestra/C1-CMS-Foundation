using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Elements;
using Composite.ResourceSystem;
using Composite.Security;


namespace Composite.Trees
{    
    public class SimpleElementTreeNode : TreeNode
    {
        public string Label { get; internal set; }              // Requried
        public string ToolTip { get; internal set; }            // Defaults to Label
        public ResourceHandle Icon { get; internal set; }       // Defaults to 'folder'
        public ResourceHandle OpenIcon { get; internal set; }   // Defaults to 'open-folder' or if Icon is set, then, Icon

        // Cached values
        private DynamicValuesHelper LabelDynamicValuesHelper { get; set; }
        private DynamicValuesHelper ToolTipDynamicValuesHelper { get; set; }


        public override IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            TreeSimpleElementEntityToken treeSimpleElementEntityToken = childEntityToken as TreeSimpleElementEntityToken;
            if (treeSimpleElementEntityToken != null)
            {
                childEntityToken = treeSimpleElementEntityToken.ParentEntityToken;
            }

            foreach (EntityToken entityToken in this.ParentNode.GetEntityTokens(childEntityToken, dynamicContext))
            {
                if ((this.ParentNode is SimpleElementTreeNode) == false)
                {
                    yield return new TreeSimpleElementEntityToken(this.Id, this.Tree.TreeId, EntityTokenSerializer.Serialize(entityToken));
                }
                else
                {
                    TreeSimpleElementEntityToken castedEntityToken = entityToken as TreeSimpleElementEntityToken;
                    yield return new TreeSimpleElementEntityToken(this.Id, this.Tree.TreeId, castedEntityToken.SerializedParentEntityToken);
                }
            }
        }


         internal override IEnumerable<EntityToken> FilterParentGeneretedEntityTokens(EntityToken selfEntityToken, IEnumerable<EntityToken> parentGeneretedEntityTokens, TreeNodeDynamicContext dynamicContext)
        {
            TreeSimpleElementEntityToken treeSimpleElementEntityToken = (TreeSimpleElementEntityToken)selfEntityToken;
            EntityToken parentEntityToken = treeSimpleElementEntityToken.ParentEntityToken;
            foreach (EntityToken entityToken in parentGeneretedEntityTokens)
            {
                if (parentEntityToken.Equals(entityToken) == true)
                {
                    yield return entityToken;
                }
                else
                {
                    TreeSimpleElementEntityToken castedEntityToken = entityToken as TreeSimpleElementEntityToken;
                    if ((castedEntityToken != null) && (parentEntityToken.Equals(castedEntityToken.ParentEntityToken) == true))
                    {
                        yield return entityToken;
                    }
                }
            }            
        }


        public override AncestorResult GetParentEntityToken(EntityToken ownEntityToken, Type parentInterfaceOfInterest, TreeNodeDynamicContext dynamicContext)
        {            
            return new AncestorResult(this.ParentNode, ((TreeSimpleElementEntityToken)ownEntityToken).ParentEntityToken);
        }



        protected override IEnumerable<Element> OnGetElements(EntityToken parentEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            TreeSimpleElementEntityToken entityToken;
            if ((this.ParentNode is SimpleElementTreeNode) == false)
            {
                entityToken = new TreeSimpleElementEntityToken(this.Id.ToString(), this.Tree.TreeId, EntityTokenSerializer.Serialize(parentEntityToken));                
            }
            else
            {
                TreeSimpleElementEntityToken treeSimpleElementEntityToken = (TreeSimpleElementEntityToken)parentEntityToken;
                entityToken = new TreeSimpleElementEntityToken(this.Id.ToString(), this.Tree.TreeId, treeSimpleElementEntityToken.SerializedParentEntityToken);
            }

            Element element = new Element(new ElementHandle(
                dynamicContext.ElementProviderName,
                entityToken,
                dynamicContext.Piggybag.PreparePiggybag(this.ParentNode, parentEntityToken)
                ));

            DynamicValuesHelperReplaceContext replaceContext = new DynamicValuesHelperReplaceContext
            {
                PiggybagDataFinder = new PiggybagDataFinder(dynamicContext.Piggybag, parentEntityToken)
            };

            element.VisualData = new ElementVisualizedData
            {
                Label = this.LabelDynamicValuesHelper.ReplaceValues(replaceContext),
                ToolTip = this.ToolTipDynamicValuesHelper.ReplaceValues(replaceContext),
                HasChildren = ChildNodes.Count() > 0,
                Icon = this.Icon,
                OpenedIcon = this.OpenIcon
            };

            yield return element;
        }


        protected override void OnInitialize()
        {
            this.LabelDynamicValuesHelper = new DynamicValuesHelper(this.Label);
            this.LabelDynamicValuesHelper.Initialize(this);

            this.ToolTipDynamicValuesHelper = new DynamicValuesHelper(this.ToolTip);
            this.ToolTipDynamicValuesHelper.Initialize(this);
        }


        public override string ToString()
        {

            return string.Format("SimpleElementTreeNode, Id = {0}, Label = {1}", this.Id, this.Label);
        }
    }
}
