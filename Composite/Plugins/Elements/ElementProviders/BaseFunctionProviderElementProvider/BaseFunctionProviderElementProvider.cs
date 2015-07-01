using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Collections;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.Functions;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.C1Console.Security;
using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public abstract class BaseFunctionProviderElementProvider : IHooklessElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _context;

        /// <exclude />
        public static ResourceHandle Function { get { return GetIconHandle("base-function-function"); } }

        /// <exclude />
        public static ResourceHandle FunctionError { get { return GetIconHandle("error"); } }

        /// <exclude />
        protected virtual void OnContextSetted() { }

        /// <exclude />
        protected abstract IEnumerable<IFunctionTreeBuilderLeafInfo> OnGetFunctionInfos(SearchToken searchToken);

        /// <exclude />
        protected abstract IEnumerable<Type> OnGetEntityTokenTypes();

        /// <exclude />
        protected abstract IFunctionTreeBuilderLeafInfo OnIsEntityOwner(EntityToken entityToken);

        /// <exclude />
        protected abstract string RootFolderLabel { get; }

        /// <exclude />
        protected abstract string RootFolderToolTip { get; }

        /// <exclude />
        protected virtual ResourceHandle FolderIcon { get { return CommonElementIcons.Folder; } }

        /// <exclude />
        protected virtual ResourceHandle OpenFolderIcon { get { return CommonElementIcons.FolderOpen; } }

        /// <exclude />
        protected virtual ResourceHandle EmptyFolderIcon { get { return CommonElementIcons.Folder; } }

        /// <exclude />
        protected virtual ResourceHandle FunctionIcon { get { return CommonElementIcons.Data; } }

        /// <exclude />
        protected virtual IEnumerable<ElementAction> OnGetFolderActions() { return null; }

        /// <exclude />
        protected virtual IEnumerable<ElementAction> OnGetFunctionActions(IFunctionTreeBuilderLeafInfo function) { return null; }

        /// <exclude />
        protected virtual TreeLockBehavior OnGetTreeLockBehavior() { return TreeLockBehavior.Normal; }


        /// <exclude />
        public BaseFunctionProviderElementProvider()
        {
            foreach (Type entityTokenType in OnGetEntityTokenTypes())
            {
                AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider(entityTokenType, this);
            }
        }



        /// <exclude />
        public ElementProviderContext Context
        {
            set
            {
                _context = value;

                OnContextSetted();
            }
        }


        /// <exclude />
        protected ElementProviderContext GetContext()
        {
            return _context;
        }



        /// <summary>
        /// Gets the name of the function provider.
        /// </summary>
        /// <value>
        /// The name of the function provider.
        /// </value>
        /// <exclude />
        /// <exception cref="System.NotImplementedException"></exception>
        public virtual string FunctionProviderName
        {
            get { throw new NotImplementedException(); }
        }


        #region Element methods
        /// <exclude />
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
                            Icon = hasChildren ? this.FolderIcon : this.EmptyFolderIcon,
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



        /// <exclude />
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
            if (string.IsNullOrEmpty(searchToken.Keyword))
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

            var element = new Element(_context.CreateElementHandle(new BaseFunctionFolderElementEntityToken(CreateId(node, _context.ProviderName))))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = node.Name,
                    ToolTip = node.Name,
                    HasChildren = (node.SubFolders.Count != 0) || (node.Leafs.Count != 0),
                    Icon = hasChildren ? this.FolderIcon : this.EmptyFolderIcon,
                    OpenedIcon = this.OpenFolderIcon
                },
                TreeLockBehavior = OnGetTreeLockBehavior()
            };

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

            var intitializationInfo = functionDetails as IFunctionInitializationInfo;
            bool functionWerentLoadedCorrectly = intitializationInfo != null && !intitializationInfo.FunctionInitializedCorrectly;

            Element element = new Element(_context.CreateElementHandle(function.EntityToken))
            {
                VisualData = new ElementVisualizedData()
                {
                    Label = function.Name,
                    ToolTip = functionTooltip,
                    HasChildren = false,
                    Icon = functionWerentLoadedCorrectly ? BaseFunctionProviderElementProvider.FunctionError : BaseFunctionProviderElementProvider.Function
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



        /// <exclude />
        public static string CreateId(NamespaceTreeBuilderFolder folderNode, string providerName)
        {
            if (folderNode.Namespace == "")
            {
                return CreateId(folderNode.Name, providerName);
            }
            
            return CreateId(string.Format("{0}.{1}", folderNode.Namespace, folderNode.Name), providerName);
        }



        /// <exclude />
        public static string CreateId(string namespaceName, string providerName)
        {
            if (namespaceName == "")
            {
                return string.Format("ROOT:{0}", providerName);
            }
            
            return string.Format("ROOT:{0}.{1}", providerName, namespaceName);
        }
        #endregion



        /// <exclude />
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

        /// <exclude />
        protected static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}
