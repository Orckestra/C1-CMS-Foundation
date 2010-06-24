using System;
using System.Collections.Generic;

using Composite.Security.Foundation;


namespace Composite.Security
{
    public static class RefreshDeleteEntityTokenFinder
    {
        public static IEnumerable<EntityToken> FindEntityTokens(RelationshipGraph beforeGraph)
        {
            return FindEntityTokens(beforeGraph, false);
        }


        public static IEnumerable<EntityToken> FindEntityTokens(RelationshipGraph beforeGraph, bool skipBottemNodes)
        {
            if (beforeGraph == null) throw new ArgumentNullException("beforeGraph");

            List<EntityToken> foundEntityTokens = new List<EntityToken>();

            foreach (RelationshipGraphNode node in beforeGraph.BottomNodes)
            {
                if (skipBottemNodes == true)
                {
                    foreach (RelationshipGraphNode parentNode in node.ParentNodes)
                    {
                        FindExistingParents(parentNode, foundEntityTokens);
                    }
                }
                else
                {
                    FindExistingParents(node, foundEntityTokens);
                }
            }

            return foundEntityTokens;
        }



        private static void FindExistingParents(RelationshipGraphNode node, List<EntityToken> foundEntityTokens)
        {
            if ((SecurityAncestorFacade.GetParents(node.EntityToken) != null) ||
                (HookingFacade.GetHookies(node.EntityToken) != null))
            {
                if (foundEntityTokens.Find(et => et.GetHashCode() == node.EntityToken.GetHashCode()) == null)
                {
                    foundEntityTokens.Add(node.EntityToken);
                }
            }
            else
            {
                foreach (RelationshipGraphNode parentNode in node.ParentNodes)
                {
                    FindExistingParents(parentNode, foundEntityTokens);
                }
            }
        }
    }
}
