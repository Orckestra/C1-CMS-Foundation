using System.Collections.Generic;
using System.Linq;

namespace Composite.C1Console.Security
{
    internal static class RefreshBeforeAfterEntityTokenFinder
    {
        public static IEnumerable<EntityToken> FindEntityTokens(RelationshipGraph beforeGraph, RelationshipGraph afterGraph)
        {
            Verify.ArgumentNotNull(beforeGraph, "beforeGraph");
            Verify.ArgumentNotNull(afterGraph, "afterGraph");

            var nodes = new List<RelationshipGraphNode>();

            FindNodes(beforeGraph, afterGraph, nodes);
            FindNodes(afterGraph, beforeGraph, nodes);

            if (nodes.Count > 1)
            {
                nodes = nodes.Where(n => n.ParentNodes.Any()).ToList(); // Ignoring root node
                nodes = FilterNodes(nodes); 
            }

            foreach (RelationshipGraphNode node in nodes)
            {
                foreach (RelationshipGraphNode parentNode in node.ParentNodes)
                {
                    yield return parentNode.EntityToken;
                }
            }
        }

        private static void FindNodes(RelationshipGraph leftGraph, RelationshipGraph rightGraph, List<RelationshipGraphNode> foundNodes)
        {
            foreach (RelationshipGraphNode leftNode in leftGraph.TopNodes)
            {
                RelationshipGraphNode currentNode = null;

                foreach (RelationshipGraphNode rightNode in rightGraph.TopNodes)
                {
                    RelationshipGraphNode foundNode = FindNode(leftNode, rightNode, null);

                    if (foundNode != null)
                    {
                        if (currentNode == null || currentNode.Level > foundNode.Level)
                        {
                            currentNode = foundNode;
                        }
                    }
                }

                if (currentNode != null)
                {
                    if (foundNodes.Find(node => node.EntityToken.Equals(currentNode.EntityToken)) == null)
                    {
                        foundNodes.Add(currentNode);
                    }
                }
            }
        }


        private static RelationshipGraphNode FindNode(RelationshipGraphNode leftNode, RelationshipGraphNode rightNode, RelationshipGraphNode lastLeftNode)
        {
            // Searched for the first node in "leftNode" chain which isn't present in "rightNode" chain
            // leftNode  -> A -> B -> C -> D -> ....
            // rightNode -> A -> B -> C -> E -> ....
            // Result: D;

            // leftNode  -> A -> B -> C -> D
            // rightNode -> A -> B -> C -> D -> ....
            // Result: D;

            // leftNode  -> A -> B -> C -> D -> ....
            // rightNode -> A -> B -> C -> D 
            // Result: D;

            // leftNode  -> A -> B -> C -> D
            // rightNode -> A -> B -> C -> D 
            // Result: D;

            if (!leftNode.EntityToken.Equals(rightNode.EntityToken))
            {
                return lastLeftNode; 
            }
            
            if (leftNode.ChildNode != null && rightNode.ChildNode != null)
            {
                return FindNode(leftNode.ChildNode, rightNode.ChildNode, leftNode);
            }

            return leftNode;
        }



        private static List<RelationshipGraphNode> FilterNodes(ICollection<RelationshipGraphNode> nodesToFilter)
        {
            var resultNodes = new List<RelationshipGraphNode>();

            foreach (RelationshipGraphNode nodeToFilter in nodesToFilter)
            {
                bool anyParentsInTheList =
                    nodesToFilter.Any(node => !node.EntityToken.Equals(nodeToFilter.EntityToken)
                                              && IsParent(nodeToFilter, node));

                if (!anyParentsInTheList)
                {
                    resultNodes.Add(nodeToFilter);
                }
            }

            return resultNodes;
        }



        private static bool IsParent(RelationshipGraphNode possibleChildNode, RelationshipGraphNode possibleParentNode)
        {
            foreach (RelationshipGraphNode parentNode in possibleChildNode.ParentNodes)
            {
                if (parentNode.EntityToken.Equals(possibleParentNode.EntityToken) 
                    || IsParent(parentNode, possibleParentNode))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
