using System.Collections.Generic;


namespace Composite.C1Console.Security
{
    internal static class ParentsFacade
    {
        public static List<EntityToken> GetAllParents(EntityToken entityToken)
        {
            return GetAllParents(entityToken, 1);
        }



        public static List<EntityToken> GetAllParents(EntityToken entityToken, int levelCount)
        {
            RelationshipGraph graph = new RelationshipGraph(entityToken, RelationshipGraphSearchOption.Both, true);

            List<EntityToken> tokens = new List<EntityToken>();

            int currentLevel = 0;
            foreach (RelationshipGraphLevel level in graph.Levels)
            {
                if (currentLevel > levelCount)
                {
                    break;
                }
                else if ((currentLevel > 0) && (currentLevel <= levelCount))
                {
                    tokens.AddRange(level.AllEntities);
                }
                    
                currentLevel++;
            }

            return tokens;
        }
    }
}
