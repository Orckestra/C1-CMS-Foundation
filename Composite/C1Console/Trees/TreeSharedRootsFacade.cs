using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Foundation;
using Composite.C1Console.Elements.Foundation.PluginFacades;
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
        private static volatile IReadOnlyDictionary<string, CustomTreePerspectiveInfo> _sharedRootFolders;
        private static string _elementAttachingProviderName;
        private static readonly object _lock = new object();

        public static IReadOnlyDictionary<string, CustomTreePerspectiveInfo> SharedRootFolders => GetSharedRootsInt(null);
        

        public static void Initialize(string elementAttachingProviderName = null)
        {
            GetSharedRootsInt(elementAttachingProviderName);
        }

        private static IReadOnlyDictionary<string, CustomTreePerspectiveInfo> GetSharedRootsInt(string elementAttachingProviderName)
        {
            var result = _sharedRootFolders;
            if (result != null) return result;

            lock (_lock)
            {
                result = _sharedRootFolders;
                if (result != null) return result;

                if (_elementAttachingProviderName == null)
                {
                    _elementAttachingProviderName = elementAttachingProviderName ?? GetElementAttachingProviderName();
                }

                result = GetSharedRoots(_elementAttachingProviderName);
                _sharedRootFolders = result;

                return result;
            }
        }


        private static string GetElementAttachingProviderName()
        {
            foreach (string providerName in ElementAttachingProviderRegistry.ElementAttachingProviderNames)
            {
                var provider = ElementAttachingProviderPluginFacade.GetElementAttachingProvider(providerName);
                if (provider is TreeElementAttachingProvider)
                {
                    return  providerName;
                }
            }
            return null;
        }


        public static void Clear()
        {
            _sharedRootFolders = null;
        }



        private static IReadOnlyDictionary<string, CustomTreePerspectiveInfo> GetSharedRoots(string elementAttachingProviderName)
        {
            var sharedRootFolders = new Dictionary<string, CustomTreePerspectiveInfo>();

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
            
            return sharedRootFolders;
        }
    }
}
