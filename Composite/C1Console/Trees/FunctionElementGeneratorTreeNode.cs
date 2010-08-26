using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Security;
using Composite.C1Console.Elements;
using Composite.Core.ResourceSystem;
using System.Xml.Linq;
using Composite.Functions;



namespace Composite.C1Console.Trees
{    
    internal sealed class FunctionElementGeneratorTreeNode : TreeNode
    {
        public XElement FunctionMarkup { get; internal set; }   // Requried
        public string Label { get; internal set; }              // Requried
        public string ToolTip { get; internal set; }            // Defaults to Label
        public ResourceHandle Icon { get; internal set; }       // Defaults to 'folder'
        

        // Cached
        private BaseRuntimeTreeNode _functionNode;


        private IEnumerable<KeyValuePair<string, string>> GetFunctionResult()
        {
            return _functionNode.GetValue<IEnumerable<KeyValuePair<string, string>>>(); 
        }




        public override IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            IEntityTokenContainingParentEntityToken containingParentEnitytToken = childEntityToken as IEntityTokenContainingParentEntityToken;
            if (containingParentEnitytToken != null)
            {
                childEntityToken = containingParentEnitytToken.GetParentEntityToken();
            }


            foreach (EntityToken entityToken in this.ParentNode.GetEntityTokens(childEntityToken, dynamicContext))
            {                
                foreach (var kvp in GetFunctionResult())
                {
                    yield return new TreeFunctionElementGeneratorEntityToken(this.Id, this.Tree.TreeId, EntityTokenSerializer.Serialize(entityToken), kvp.Key);
                }
            }
        }



        public override AncestorResult GetParentEntityToken(EntityToken ownEntityToken, Type parentInterfaceOfInterest, TreeNodeDynamicContext dynamicContext)
        {
            return new AncestorResult(this.ParentNode, ((TreeFunctionElementGeneratorEntityToken)ownEntityToken).ParentEntityToken);
        }



        protected override IEnumerable<Element> OnGetElements(EntityToken parentEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            foreach (var kvp in GetFunctionResult())
            {
                Element element = new Element(new ElementHandle(
                    dynamicContext.ElementProviderName,
                    new TreeFunctionElementGeneratorEntityToken(this.Id.ToString(), this.Tree.TreeId, EntityTokenSerializer.Serialize(parentEntityToken), kvp.Key),
                    dynamicContext.Piggybag.PreparePiggybag(this.ParentNode, parentEntityToken)
                ));

                element.VisualData = new ElementVisualizedData
                {
                    Label = kvp.Value,
                    ToolTip = kvp.Value,
                    HasChildren = ChildNodes.Count() > 0,
                    Icon = Core.ResourceSystem.ResourceHandle.BuildIconFromDefaultProvider("folder"),
                    OpenedIcon = Core.ResourceSystem.ResourceHandle.BuildIconFromDefaultProvider("folder")
                };

                yield return element;
            }
        }



        protected override void OnInitialize()
        {
            //MRJ: DSLTree: FunctionElementGeneratorTreeNode: More validaion here
            //MRJ: DSLTree: FunctionElementGeneratorTreeNode: What kind of return type should the function have?
            _functionNode = FunctionTreeBuilder.Build(this.FunctionMarkup);
        }


        public override string ToString()
        {

            return string.Format("FunctionElementGeneratorTreeNode, Id = {0}, Label = {1}", this.Id, this.Label);
        }
    }
}
