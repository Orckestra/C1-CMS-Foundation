using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Collections;
using Composite.Elements;
using Composite.Elements.Plugins.ElementProvider;
using Composite.Functions;
using Composite.ResourceSystem;
using Composite.ResourceSystem.Icons;
using Composite.Security;


namespace Composite.StandardPlugins.Elements.ElementProviders.BaseFunctionProviderElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class BaseFunctionProviderElementProvider : IHooklessElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _context;

        public static ResourceHandle Function { get { return GetIconHandle("base-function-function"); } }

        protected abstract IEnumerable<IFunctionTreeBuilderLeafInfo> OnGetFunctionInfos(SearchToken searchToken);
        protected abstract IEnumerable<Type> OnGetEntityTokenTypes();
        protected abstract IFunctionTreeBuilderLeafInfo OnIsEntityOwner(EntityToken entityToken);

        protected virtual string RootFolderLabel { get { return StringResourceSystemFacade.GetString("Composite.Management", "BaseFunctionProviderElementProvider.RootFunctionInfos"); } }
        protected virtual string RootFolderToolTip { get { return StringResourceSystemFacade.GetString("Composite.Management", "BaseFunctionProviderElementProvider.RootFunctionInfosToolTip"); } }
        protected virtual ResourceHandle FolderIcon { get { return CommonElementIcons.Folder; } }
        protected virtual ResourceHandle OpenFolderIcon { get { return CommonElementIcons.FolderOpen; } }
        protected virtual ResourceHandle EmptyFolderIcon { get { return CommonElementIcons.Folder; } }
        protected virtual ResourceHandle FunctionIcon { get { return CommonElementIcons.Data; } }
        protected virtual IEnumerable<ElementAction> OnGetFolderActions() { return null; }
        protected virtual IEnumerable<ElementAction> OnGetFunctionActions(IFunctionTreeBuilderLeafInfo function) { return null; }
        protected virtual TreeLockBehavior OnGetTreeLockBehavior() { return TreeLockBehavior.Normal; }



        public BaseFunctionProviderElementProvider()
        {            
            foreach (Type entityTokenType in OnGetEntityTokenTypes())
            {
                AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider(entityTokenType, this);
            }
        }



        public ElementProviderContext Context
        {
            set { _context = value; }
        }



        protected ElementProviderContext GetContext()
        {
            return _context;
        }


        #region Element methods
        public IEnumerable<Element> GetRoots(SearchToken searchToken)
        {
            NamespaceTreeBuilder builder = new NamespaceTreeBuilder(OnGetFunctionInfos(searchToken).Cast<INamespaceTreeBuilderLeafInfo>());

            bool hasChildren = (builder.RootFolder.SubFolders.Count != 0) || (builder.RootFolder.Leafs.Count != 0);

            Element element = new Element(_context.CreateElementHandle(new BaseFunctionFolderElementEntityToken(CreateId("", _context.ProviderName))))
                {
                    VisualData = new ElementVisualizedData()
                        {
                            Label = RootFolderLabel,
                            ToolTip = RootFolderToolTip,
                            HasChildren = hasChildren,
                            Icon = hasChildren == true ? this.FolderIcon : this.EmptyFolderIcon,
                            OpenedIcon = OpenFolderIcon
                        }
                };
            element.TreeLockBehavior = OnGetTreeLockBehavior();

            IEnumerable<ElementAction> actions = OnGetFolderActions();
            if (actions != null)
            {
                foreach (ElementAction action in actions)
                {
                    element.AddAction(action);
                }
            }

            return new List<Element> { element };
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken searchToken)
        {
            BaseFunctionFolderElementEntityToken castedEntityToken = (BaseFunctionFolderElementEntityToken)entityToken;

            string id = castedEntityToken.Id;

            int index = castedEntityToken.Id.IndexOf('.');
            if (index != -1)
            {
                id = id.Remove(0, index + 1);
            }

            NamespaceTreeBuilder builder = new NamespaceTreeBuilder(OnGetFunctionInfos(searchToken).Cast<INamespaceTreeBuilderLeafInfo>());

            NamespaceTreeBuilderFolder folderNode;

            if (castedEntityToken.Id == CreateId("", _context.ProviderName))
            {
                folderNode = builder.RootFolder;
            }
            else
            {
                folderNode = builder.GetFolder(id);
            }

            List<Element> result = new List<Element>();
            if (searchToken == null)
            {
                if (folderNode != null)
                {
                    foreach (NamespaceTreeBuilderFolder node in folderNode.SubFolders.OrderBy(f => f.Name))
                    {
                        Element element = CreateFolderElement(node);
                        result.Add(element);
                    }

                    foreach (IFunctionTreeBuilderLeafInfo function in folderNode.Leafs)
                    {
                        Element element = CreateFunctionElement(function);

                        element.PropertyBag.Add("ElementType", "application/x-composite-function");
                        element.PropertyBag.Add("ElementId", IMetaFunctionExtensionMethods.CompositeName(function.Namespace, function.Name));

                        result.Add(element);
                    }
                }
            }
            else
            {
                if (folderNode != null)
                {
                    foreach (NamespaceTreeBuilderFolder node in folderNode.SubFolders.OrderBy(f => f.Name))
                    {
                        if (SubTreeContainsToken(node, searchToken))
                        {
                            Element element = CreateFolderElement(node);
                            result.Add(element);
                        }
                    }

                    foreach (IFunctionTreeBuilderLeafInfo function in folderNode.Leafs)
                    {
                        if (searchToken.Keyword == null || function.Name.Contains(searchToken.Keyword))
                        {
                            Element element = CreateFunctionElement(function);

                            element.PropertyBag.Add("ElementType", "application/x-composite-function");
                            element.PropertyBag.Add("ElementId", IMetaFunctionExtensionMethods.CompositeName(function.Namespace, function.Name));

                            result.Add(element);
                        }
                    }
                }
            }

            return result;
        }



        private bool SubTreeContainsToken(NamespaceTreeBuilderFolder folder, SearchToken searchToken)
        {
            if (string.IsNullOrEmpty(searchToken.Keyword) == true)
            {
                return true;

            }

            if (folder.Name.Contains(searchToken.Keyword))
            {
                return true;
            }

            foreach (INamespaceTreeBuilderLeafInfo leaf in folder.Leafs)
            {
                if (leaf.Name.Contains(searchToken.Keyword))
                {
                    return true;
                }
            }
            foreach (NamespaceTreeBuilderFolder subFolder in folder.SubFolders)
            {
                if (SubTreeContainsToken(subFolder, searchToken))
                {
                    return true;
                }
            }

            return false;
        }



        private Element CreateFolderElement(NamespaceTreeBuilderFolder node)
        {
            bool hasChildren = (node.SubFolders.Count != 0) || (node.Leafs.Count != 0);

            Element element = new Element(_context.CreateElementHandle(new BaseFunctionFolderElementEntityToken(CreateId(node, _context.ProviderName))))
            {
                VisualData = new ElementVisualizedData()
                {
                    Label = node.Name,
                    ToolTip = node.Name,
                    HasChildren = (node.SubFolders.Count != 0) || (node.Leafs.Count != 0),
                    Icon = hasChildren == true ? this.FolderIcon : this.EmptyFolderIcon,
                    OpenedIcon = this.FolderIcon
                }
            };
            element.TreeLockBehavior = OnGetTreeLockBehavior();

            IEnumerable<ElementAction> actions = OnGetFolderActions();
            if (actions != null)
            {
                foreach (ElementAction action in actions)
                {
                    element.AddAction(action);
                }
            }

            return element;
        }



        private Element CreateFunctionElement(IFunctionTreeBuilderLeafInfo function)
        {
            IMetaFunction functionDetails;

            if (FunctionFacade.TryGetFunction(out functionDetails, string.Format("{0}.{1}", function.Namespace, function.Name), typeof(IFunction)) == false)
            {
                FunctionFacade.TryGetFunction(out functionDetails, string.Format("{0}.{1}", function.Namespace, function.Name), typeof(IWidgetFunction));
            }

            string functionTooltip = (functionDetails == null || string.IsNullOrEmpty(functionDetails.Description) ? function.Name : StringResourceSystemFacade.ParseString(functionDetails.Description));

            Element element = new Element(_context.CreateElementHandle(function.EntityToken))
            {
                VisualData = new ElementVisualizedData()
                {
                    Label = function.Name,
                    ToolTip = functionTooltip,
                    HasChildren = false,
                    Icon = BaseFunctionProviderElementProvider.Function
                }
            };

            element.TreeLockBehavior = OnGetTreeLockBehavior();

            IEnumerable<ElementAction> actions = OnGetFunctionActions(function);
            if (actions != null)
            {
                foreach (ElementAction action in actions)
                {
                    element.AddAction(action);
                }
            }

            return element;
        }



        public static string CreateId(NamespaceTreeBuilderFolder folderNode, string providerName)
        {
            if (folderNode.Namespace == "")
            {
                return CreateId(folderNode.Name, providerName);
            }
            else
            {
                return CreateId(string.Format("{0}.{1}", folderNode.Namespace, folderNode.Name), providerName);
            }
        }



        public static string CreateId(string namespaceName, string providerName)
        {
            if (namespaceName == "")
            {
                return string.Format("ROOT:{0}", providerName);
            }
            else
            {
                return string.Format("ROOT:{0}.{1}", providerName, namespaceName);
            }
        }
        #endregion



        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            Dictionary<EntityToken, IEnumerable<EntityToken>> result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                IFunctionTreeBuilderLeafInfo functionTreeBuilderLeafInfo = OnIsEntityOwner(entityToken);
                if (functionTreeBuilderLeafInfo == null) continue;

                BaseFunctionFolderElementEntityToken parentEntityToken = new BaseFunctionFolderElementEntityToken(CreateId(functionTreeBuilderLeafInfo.Namespace, _context.ProviderName));

                result.Add(entityToken, new EntityToken[] { parentEntityToken });
            }

            return result;
        }



        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}
