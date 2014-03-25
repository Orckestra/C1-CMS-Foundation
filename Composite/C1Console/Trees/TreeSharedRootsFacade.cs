using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Foundation;
using Composite.C1Console.Elements.Foundation.PluginFacades;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.C1Console.Security;
using Composite.C1Console.Trees.Foundation;
using Composite.C1Console.Trees.Foundation.AttachmentPoints;


namespace Composite.C1Console.Trees
{
    internal class CustomTreePerspectiveInfo
    {
        public NamedAttachmentPoint AttachmentPoint { get; set; }
        public Element Element { get; set; }
        public List<Tree> Trees { get; set; }
    }




    internal static class TreeSharedRootsFacade
    {
        private volatile static Dictionary<string, CustomTreePerspectiveInfo> _sharedRootFolders;
        private static string _elementAttachingProviderName;
        private static readonly object _lock = new object();

        public static Dictionary<string, CustomTreePerspectiveInfo> SharedRootFolders
        {
            get
            {
                var result = _sharedRootFolders;

                if (result != null)
                {
                    return result;
                }

                lock (_lock)
                {
                    Initialize();

                    return _sharedRootFolders;
                }
            }
        }


        public static void Initialize(string elementAttachingProviderName = null)
        {
            if (_sharedRootFolders != null) return;

            lock (_lock)
            {
                if (_sharedRootFolders != null) return;

                if (_elementAttachingProviderName == null)
                {
                    if (elementAttachingProviderName == null)
                    {
                        foreach (string providerName in ElementActionProviderRegistry.ElementActionProviderNames)
                        {
                            IElementAttachingProvider elementAttachingProvider = ElementAttachingProviderPluginFacade.GetElementAttachingProvider(providerName);
                            if (elementAttachingProvider is TreeElementAttachingProvider)
                            {
                                _elementAttachingProviderName = providerName;
                                break;
                            }
                        }
                    }
                    else
                    {
                        _elementAttachingProviderName = elementAttachingProviderName;
                    }
                }

                DoInitialize(_elementAttachingProviderName);
            }
        }


        public static void Clear()
        {
            lock (_lock)
            {
                _sharedRootFolders = null;
            }
        }



        private static void DoInitialize(string elementAttachingProviderName)
        {
            var sharedRootFolders = new Dictionary<string, CustomTreePerspectiveInfo>();

            var treeNodeDynamicContext = new TreeNodeDynamicContext(TreeNodeDynamicContextDirection.Down);
            treeNodeDynamicContext.Piggybag = new Dictionary<string, string>();

            foreach (var tree in TreeFacade.AllTrees)
            {
                if (!tree.ShareRootElementById) continue;

                IEnumerable<NamedAttachmentPoint> namedAttachmentPoints =
                    tree.AttachmentPoints.
                    OfType<NamedAttachmentPoint>();

                if (namedAttachmentPoints.Count() != 1) continue;

                if (tree.RootTreeNode.ChildNodes.Count() != 1) continue;

                SimpleElementTreeNode childTreeNode = tree.RootTreeNode.ChildNodes.Single() as SimpleElementTreeNode;

                if (childTreeNode == null) continue;

                NamedAttachmentPoint namedAttachmentPoint = namedAttachmentPoints.Single();


                EntityToken perspectiveEntityToken;
                if (!sharedRootFolders.ContainsKey(childTreeNode.Id))
                {
                    perspectiveEntityToken = new TreePerspectiveEntityToken(childTreeNode.Id);

                    var dynamicValuesHelperReplaceContext = new DynamicValuesHelperReplaceContext(
                        namedAttachmentPoint.AttachingPoint.EntityToken, 
                        null);

                    // MRJ: Collection actions
                    Element element = new Element(new ElementHandle(elementAttachingProviderName, perspectiveEntityToken))
                    {
                        VisualData = new ElementVisualizedData
                        {
                            Label = childTreeNode.LabelDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext),
                            ToolTip = childTreeNode.ToolTipDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext),
                            HasChildren = true,
                            Icon = childTreeNode.Icon,
                            OpenedIcon = childTreeNode.OpenIcon
                        }
                    };

                    sharedRootFolders.Add(childTreeNode.Id, new CustomTreePerspectiveInfo
                    {
                        AttachmentPoint = new NamedAttachmentPoint
                        {
                            AttachingPoint = new AttachingPoint(namedAttachmentPoint.AttachingPoint),
                            Position = namedAttachmentPoint.Position
                        },
                        Element = element,
                        Trees = new List<Tree> { tree }
                    });
                }
                else
                {
                    perspectiveEntityToken = sharedRootFolders[childTreeNode.Id].Element.ElementHandle.EntityToken;
                    sharedRootFolders[childTreeNode.Id].Trees.Add(tree);
                }

                namedAttachmentPoint.AttachingPoint = new AttachingPoint(perspectiveEntityToken);
                tree.RootTreeNode = childTreeNode;
            }
            
            _sharedRootFolders = sharedRootFolders;
        }
    }
}
