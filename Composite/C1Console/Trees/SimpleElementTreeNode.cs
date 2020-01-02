using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Trees.Foundation;
using Composite.Core.ResourceSystem;


namespace Composite.C1Console.Trees
{    
    internal class SimpleElementTreeNode : TreeNode
    {
        public string Label { get; internal set; }              // Requried
        public string ToolTip { get; internal set; }            // Defaults to Label
        public ResourceHandle Icon { get; internal set; }       // Defaults to 'folder'
        public ResourceHandle OpenIcon { get; internal set; }   // Defaults to 'open-folder' or if Icon is set, then, Icon
        public string BrowserUrl { get; internal set; }         // Defaults to no URL, what will be shows in console browser on focus
        public string BrowserImage { get; internal set; }         // Defaults to no (image) URL, what will be shows in console browser on focus / lists

        // Cached values
        internal DynamicValuesHelper LabelDynamicValuesHelper { get; set; }
        internal DynamicValuesHelper ToolTipDynamicValuesHelper { get; set; }


        public override IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            var possibleCurrentEntityToken = childEntityToken is TreeSimpleElementEntityToken seEntityToken
                ? seEntityToken.ParentEntityToken 
                : childEntityToken;

            foreach (EntityToken entityToken in this.ParentNode.GetEntityTokens(possibleCurrentEntityToken, dynamicContext))
            {
                yield return new TreeSimpleElementEntityToken(this.Id, this.Tree.TreeId, EntityTokenSerializer.Serialize(entityToken));
            }
        }


        internal override IEnumerable<EntityToken> FilterParentGeneretedEntityTokens(EntityToken selfEntityToken, IEnumerable<EntityToken> parentGeneretedEntityTokens, TreeNodeDynamicContext dynamicContext)
        {
            // Check below ensures that the parent EntityToken actually present in a tree and not been filtered out

            var treeSimpleElementEntityToken = (TreeSimpleElementEntityToken) selfEntityToken;
            var parentEntityToken = treeSimpleElementEntityToken.ParentEntityToken;
            foreach (EntityToken entityToken in parentGeneretedEntityTokens)
            {
                if (parentEntityToken.Equals(entityToken))
                {
                    return new[] { parentEntityToken };
                }

                var castedEntityToken = entityToken as TreeSimpleElementEntityToken;
                if (castedEntityToken != null &&
                    parentEntityToken.Equals(castedEntityToken.ParentEntityToken))
                {
                    return new [] { parentEntityToken };
                }
            }

            return Array.Empty<EntityToken>();
        }


        public override AncestorResult GetParentEntityToken(EntityToken ownEntityToken, Type parentInterfaceOfInterest, TreeNodeDynamicContext dynamicContext)
        {            
            return new AncestorResult(this.ParentNode, ((TreeSimpleElementEntityToken)ownEntityToken).ParentEntityToken);
        }



        protected override IEnumerable<Element> OnGetElements(EntityToken parentEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            var entityToken = new TreeSimpleElementEntityToken(
                this.Id, 
                this.Tree.TreeId, 
                EntityTokenSerializer.Serialize(parentEntityToken));

            var element = new Element(new ElementHandle(
                dynamicContext.ElementProviderName,
                entityToken,
                dynamicContext.Piggybag.PreparePiggybag(this.ParentNode, parentEntityToken)
                ));


            if (this.BrowserUrl != null)
            {
                var url = this.BrowserUrl;

                if (!url.Contains("//"))
                {
                    url = Core.WebClient.UrlUtils.ResolvePublicUrl(url);
                }

                element.PropertyBag.Add("BrowserUrl", url);
                element.PropertyBag.Add("BrowserToolingOn", "false");
            }


            if (this.BrowserImage != null)
            {
                var url = this.BrowserImage;

                if (!url.Contains("//"))
                {
                    url = Core.WebClient.UrlUtils.ResolvePublicUrl(url);
                }

                element.PropertyBag.Add("ListViewImage", url);

                if (this.BrowserUrl == null)
                {
                    element.PropertyBag.Add("DetailViewImage", url);
                }
            }


            if (parentEntityToken is TreePerspectiveEntityToken)
            {
                element.ElementHandle.Piggyback[StringConstants.PiggybagTreeId] = Tree.TreeId;
            }

            var replaceContext = new DynamicValuesHelperReplaceContext(parentEntityToken, dynamicContext.Piggybag);

            element.VisualData = new ElementVisualizedData
            {
                Label = this.LabelDynamicValuesHelper.ReplaceValues(replaceContext),
                ToolTip = this.ToolTipDynamicValuesHelper.ReplaceValues(replaceContext),
                HasChildren = ChildNodes.Any(),
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


        public override string ToString() => $"SimpleElementTreeNode, Id = {Id}, Label = {Label}";
    }
}
