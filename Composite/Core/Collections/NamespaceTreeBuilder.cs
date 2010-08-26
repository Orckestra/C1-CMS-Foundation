using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Extensions;


namespace Composite.Core.Collections
{
    internal sealed class NamespaceTreeBuilder
    {
        private NamespaceTreeBuilderFolder _rootFolder;
        private char _namespaceSeparator;


        public NamespaceTreeBuilder(IEnumerable<INamespaceTreeBuilderLeafInfo> namespaceTreeBuilderInfos)
            : this(namespaceTreeBuilderInfos, '.')
        {
        }



        public NamespaceTreeBuilder(IEnumerable<INamespaceTreeBuilderLeafInfo> namespaceTreeBuilderInfos, char namespaceSeparator)
        {
            if (namespaceTreeBuilderInfos == null) throw new ArgumentNullException("namespaceTreeBuilderInfos");
            _namespaceSeparator = namespaceSeparator;

            _rootFolder = new NamespaceTreeBuilderFolder("", "");

            foreach (INamespaceTreeBuilderLeafInfo namespaceTreeBuilderInfo in namespaceTreeBuilderInfos)
            {
                NamespaceTreeBuilderFolder folderNode = GetOrCreateFolder(namespaceTreeBuilderInfo.Namespace);

                folderNode.Leafs.Add(namespaceTreeBuilderInfo);
            }
        }



        public NamespaceTreeBuilderFolder RootFolder
        {
            get { return _rootFolder; }
        }



        public NamespaceTreeBuilderFolder GetFolder(string namespaceName)
        {
            if (namespaceName == null) throw new ArgumentNullException("namespaceName");
            if (namespaceName.IsCorrectNamespace(_namespaceSeparator) == false) throw new ArgumentException(string.Format("The namespace '{0}' is not correctly formattet", namespaceName));

            NamespaceTreeBuilderFolder currentNode = _rootFolder;
            string[] namespaceComponents = namespaceName.Split(_namespaceSeparator);
            foreach (string namespaceComponent in namespaceComponents.Where(s => s != ""))
            {
                currentNode = currentNode.SubFolders.Where(n => n.Name == namespaceComponent).FirstOrDefault();

                if (currentNode == null)
                {
                    return null;
                }
            }

            return currentNode;
        }



        public NamespaceTreeBuilderFolder FindFolder(Func<NamespaceTreeBuilderFolder, bool> predicate)
        {
            return FindFolder(_rootFolder, predicate);
        }



        private NamespaceTreeBuilderFolder FindFolder(NamespaceTreeBuilderFolder currentFolder, Func<NamespaceTreeBuilderFolder, bool> predicate)
        {
            if (predicate(currentFolder) == true) return currentFolder;

            foreach (NamespaceTreeBuilderFolder subFolder in currentFolder.SubFolders)
            {
                NamespaceTreeBuilderFolder foundFolder = FindFolder(subFolder, predicate);

                if (foundFolder != null)
                {
                    return foundFolder;
                }
            }

            return null;
        }



        private NamespaceTreeBuilderFolder GetOrCreateFolder(string namespaceName)
        {
            if (namespaceName.IsCorrectNamespace(_namespaceSeparator) == false) throw new ArgumentException(string.Format("The namespace '{0}' is not correctly formattet", namespaceName != null ? namespaceName : "(null)"));

            string[] namespaceComponents = namespaceName.Split(_namespaceSeparator);

            if ((namespaceComponents.Length == 1) && (namespaceComponents[0] == ""))
            {
                return _rootFolder;
            }

            NamespaceTreeBuilderFolder currentNode = _rootFolder;
            string currentNamespace = "";

            foreach (string namespaceComponent in namespaceComponents)
            {
                NamespaceTreeBuilderFolder node = currentNode.SubFolders.Where(n => n.Name == namespaceComponent).FirstOrDefault();

                if (node == null)
                {
                    node = new NamespaceTreeBuilderFolder(namespaceComponent, currentNamespace);
                    currentNode.SubFolders.Add(node);
                }

                if (currentNamespace == "")
                {
                    currentNamespace = namespaceComponent;
                }
                else
                {
                    currentNamespace = string.Format("{0}{1}{2}", currentNamespace, _namespaceSeparator, namespaceComponent);
                }

                currentNode = node;
            }

            return currentNode;
        }
    }
}
