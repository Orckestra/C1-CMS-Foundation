using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Elements;
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
        private static Dictionary<string, CustomTreePerspectiveInfo> _sharedRootFolders = null;
        private static string _elementAttachingProviderName;
        private static readonly object _lock = new object();

        public static Dictionary<string, CustomTreePerspectiveInfo> SharedRootFolders
        {
            get
            {
                Initialize();
                return _sharedRootFolders;
            }
        }

        public static void Initialize(string elementAttachingProviderName = null)
        {
            if (_sharedRootFolders == null)
            {
                lock (_lock)
                {
                    if (_sharedRootFolders == null)
                    {
                        if (elementAttachingProviderName != null)
                        {
                            _elementAttachingProviderName = elementAttachingProviderName;
                        }
                        else
                        {
                            if (_elementAttachingProviderName == null) throw new InvalidOperationException();
                            elementAttachingProviderName = _elementAttachingProviderName;
                        }

                        DoInitialize(elementAttachingProviderName);
                    }
                }
            }
        }


        public static void Clear()
        {
            _sharedRootFolders = null;
        }



        private static void DoInitialize(string elementAttachingProviderName)
        {
            _sharedRootFolders = new Dictionary<string, CustomTreePerspectiveInfo>();

            TreeNodeDynamicContext treeNodeDynamicContext = new TreeNodeDynamicContext(TreeNodeDynamicContextDirection.Down);
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
                if (!_sharedRootFolders.ContainsKey(childTreeNode.Id))
                {
                    perspectiveEntityToken = new TreePerspectiveEntityToken(childTreeNode.Id);

                    DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext = new DynamicValuesHelperReplaceContext
                    {
                        CurrentDataItem = null,
                        PiggybagDataFinder = new PiggybagDataFinder(new Dictionary<string, string>(), namedAttachmentPoint.AttachingPoint.EntityToken)
                    };


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

                    _sharedRootFolders.Add(childTreeNode.Id, new CustomTreePerspectiveInfo
                    {
                        AttachmentPoint = new NamedAttachmentPoint { AttachingPoint = new AttachingPoint(namedAttachmentPoint.AttachingPoint) },
                        Element = element,
                        Trees = new List<Tree> { tree }
                    });
                }
                else
                {
                    perspectiveEntityToken = _sharedRootFolders[childTreeNode.Id].Element.ElementHandle.EntityToken;
                    _sharedRootFolders[childTreeNode.Id].Trees.Add(tree);
                }

                namedAttachmentPoint.AttachingPoint = new AttachingPoint(perspectiveEntityToken);
                tree.RootTreeNode = childTreeNode;
            }
        }
    }
}
