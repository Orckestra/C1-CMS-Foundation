using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Elements;
using Composite.Core.Logging;
using Composite.C1Console.Security;


namespace Composite.C1Console.Trees
{
    internal static class TreeNodeExtensions
    {
        public static IEnumerable<T> OfType<T>(this IEnumerable<FilterNode> filterNodes)
            where T : FilterNode
        {
            return filterNodes.Where(f => f.GetType() == typeof(T)).Cast<T>();
        }



        public static IEnumerable<Element> GetElements(this IEnumerable<TreeNode> treeNodes, EntityToken parentEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            IEnumerable<Element> elements = null;
            foreach (TreeNode treeNode in treeNodes)
            {
                if (elements == null)
                {
                    elements = treeNode.GetElements(parentEntityToken, dynamicContext);
                }
                else
                {
                    elements = elements.Concat(treeNode.GetElements(parentEntityToken, dynamicContext));
                }
            }

            if (elements == null)
            {
                elements = new List<Element>();
            }

            return elements;
        }



        public static bool SelfAndParentsHasInterface(this TreeNode treeNode, Type interfaceType)
        {
            DataFilteringTreeNode dataFilteringTreeNode = null;
            while (treeNode != null)
            {
                dataFilteringTreeNode = treeNode as DataFilteringTreeNode;
                if (dataFilteringTreeNode != null) break;

                treeNode = treeNode.ParentNode;
            }

            if (dataFilteringTreeNode == null) return false;

            if (dataFilteringTreeNode.CurrentDataInterfaceType == interfaceType) return true;

            return treeNode.ParentNode.SelfAndParentsHasInterface(interfaceType);
        }



        public static IEnumerable<TreeNode> AncestorsAndSelf(this TreeNode treeNode)
        {
            return Ancestors(treeNode, true);
        }



        public static IEnumerable<TreeNode> Ancestors(this TreeNode treeNode, bool includeSelf = false)
        {
            if (includeSelf == true)
            {
                yield return treeNode;
            }

            TreeNode parentTreeNode = treeNode.ParentNode;

            while (parentTreeNode != null)
            {
                yield return parentTreeNode;

                parentTreeNode = parentTreeNode.ParentNode;
            }
        }



        public static IEnumerable<TreeNode> Descendants(this TreeNode treeNode, bool includeSelf = false)
        {
            if (includeSelf == true) yield return treeNode;

            foreach (TreeNode childTreeNode in treeNode.ChildNodes)
            {
                foreach (TreeNode node in childTreeNode.DescendantsImpl())
                {
                    yield return node;
                }
            }
        }


        private static IEnumerable<TreeNode> DescendantsImpl(this TreeNode treeNode)
        {
            yield return treeNode;

            foreach (TreeNode childTreeNode in treeNode.ChildNodes)
            {                
                foreach (TreeNode node in childTreeNode.DescendantsImpl())
                {
                    yield return node;
                }
            }
        }


        public static IEnumerable<TreeNode> DescendantsBreadthFirst(this TreeNode treeNode, bool includeSelf = false)
        {
            Queue<TreeNode> notVisistedTreeNodes = new Queue<TreeNode>();

            if (includeSelf == true)
            {
                notVisistedTreeNodes.Enqueue(treeNode);
            }
            else
            {
                foreach (TreeNode childTreeNode in treeNode.ChildNodes)
                {
                    notVisistedTreeNodes.Enqueue(childTreeNode);
                }
            }

            while (notVisistedTreeNodes.Count > 0)
            {
                TreeNode tn = notVisistedTreeNodes.Dequeue();

                foreach (TreeNode ctn in tn.ChildNodes)
                {
                    notVisistedTreeNodes.Enqueue(ctn);
                }

                yield return tn;
            }
        }



        public static void LogTree(this TreeNode treeNodes, int level = 0)
        {
            LogTree(new TreeNode[] { treeNodes }, level);
        }



        public static void LogTree(this IEnumerable<TreeNode> treeNodes)
        {
            LogTree(treeNodes, 0);
        }



        public static void LogTree(this IEnumerable<TreeNode> treeNodes, int level)
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < level; i++)
            {
                sb.Append("  ");
            }

            //sb.Append(
            foreach (TreeNode treeNode in treeNodes)
            {

                LoggingService.LogVerbose("TreeFacade", string.Format("{0}{1}", sb, treeNode.ToString()));
                sb.Append(" ");
                LogFilter(treeNode.FilterNodes, sb.ToString());
                LogOrderBy(treeNode.OrderByNodes, sb.ToString());
                LogActions(treeNode.ActionNodes, sb.ToString());
                LogTree(treeNode.ChildNodes, level + 1);
            }
        }



        private static void LogFilter(IEnumerable<FilterNode> filterNodes, string spacer)
        {
            foreach (FilterNode filterNode in filterNodes)
            {
                LoggingService.LogVerbose("TreeFacade", string.Format("{0}* {1}", spacer, filterNode.ToString()));
            }
        }
        
        
        
        private static void LogOrderBy(IEnumerable<OrderByNode> orderByNodes, string spacer)
        {
            foreach (OrderByNode orderByNode in orderByNodes)
            {
                LoggingService.LogVerbose("TreeFacade", string.Format("{0}¤ {1}", spacer, orderByNode.ToString()));
            }
        }



        private static void LogActions(IEnumerable<ActionNode> actionNodes, string spacer)
        {
            foreach (ActionNode actionNode in actionNodes)
            {
                LoggingService.LogVerbose("TreeFacade", string.Format("{0}# {1}", spacer, actionNode.ToString()));
            }
        }



        internal static void InitializeActions(this TreeNode treeNode)
        {
            foreach (ActionNode actionNode in treeNode.ActionNodes)
            {
                actionNode.Initialize();
            }
        }



        internal static void InitializeOrderByes(this TreeNode treeNode)
        {
            foreach (OrderByNode orderByNode in treeNode.OrderByNodes)
            {
                orderByNode.Initialize();
            }
        }



        internal static void InitializeFilters(this TreeNode treeNode)
        {
            foreach (FilterNode filterNode in treeNode.FilterNodes)
            {
                filterNode.Initialize();
            }
        }
    }
}
