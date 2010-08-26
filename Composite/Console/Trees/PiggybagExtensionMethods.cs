using System;
using System.Collections.Generic;
using Composite.Data;
using Composite.C1Console.Security;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class PiggybagExtensionMethods
    {
        private const string ParrentEntityTokenPiggybagString = "ParentEntityToken";
        private const string ParrentNodeIdPiggybagString = "ParentId";


        public static string GetParentIdFromPiggybag(this Dictionary<string, string> piggybag)
        {
            return GetParentIdFromPiggybag(piggybag, 1);
        }



        public static string GetParentIdFromPiggybag(this Dictionary<string, string> piggybag, int generation)
        {
            return piggybag[string.Format("{0}{1}", ParrentNodeIdPiggybagString, generation)];
        }



        public static Dictionary<string, string> PreparePiggybag(this Dictionary<string, string> piggybag, TreeNode parentNode, EntityToken parentEntityToken)
        {
            Dictionary<string, string> newPiggybag = new Dictionary<string, string>();

            foreach (KeyValuePair<string, string> kvp in piggybag)
            {
                if (kvp.Key.StartsWith(ParrentEntityTokenPiggybagString) == true)
                {
                    int generation = int.Parse(kvp.Key.Substring(ParrentEntityTokenPiggybagString.Length));

                    generation += 1;

                    newPiggybag.Add(string.Format("{0}{1}", ParrentEntityTokenPiggybagString, generation), kvp.Value);
                }
                else if (kvp.Key.StartsWith(ParrentNodeIdPiggybagString) == true)
                {
                    int generation = int.Parse(kvp.Key.Substring(ParrentNodeIdPiggybagString.Length));

                    generation += 1;

                    newPiggybag.Add(string.Format("{0}{1}", ParrentNodeIdPiggybagString, generation), kvp.Value);
                }
                else
                {
                    newPiggybag.Add(kvp.Key, kvp.Value);
                }
            }

            newPiggybag.Add(string.Format("{0}1", ParrentEntityTokenPiggybagString), EntityTokenSerializer.Serialize(parentEntityToken));
            newPiggybag.Add(string.Format("{0}1", ParrentNodeIdPiggybagString), parentNode.Id.ToString());

            return newPiggybag;
        }



        public static bool TryGetPiggybaggedEntityToken(this Dictionary<string, string> piggybag, out EntityToken entityToken)
        {
            return TryGetPiggybaggedEntityToken(piggybag, 1, out entityToken);
        }



        public static bool TryGetPiggybaggedEntityToken(this Dictionary<string, string> piggybag, int generation, out EntityToken entityToken)
        {
            string key = string.Format("{0}{1}", ParrentEntityTokenPiggybagString, generation);

            string serializedEntityToken;
            if (piggybag.TryGetValue(key, out serializedEntityToken) == false)
            {
                entityToken = null;
                return false;
            }

            entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);
            return true;
        }



        public static IEnumerable<EntityToken> GetParentEntityTokens(this Dictionary<string, string> piggybag, EntityToken entityTokenToInclude = null)
        {
            if (entityTokenToInclude != null)
            {
                yield return entityTokenToInclude;
            }

            int generation = 1;

            string seriazliedEntityToken;
            while (piggybag.TryGetValue(string.Format("{0}{1}", ParrentEntityTokenPiggybagString, generation), out seriazliedEntityToken) == true)
            {
                yield return EntityTokenSerializer.Deserialize(seriazliedEntityToken);

                generation++;
            }
        }



        public static DataEntityToken FindDataEntityToken(this IEnumerable<EntityToken> entityTokens, Type interfaceType)
        {
            foreach (EntityToken entityToken in entityTokens)
            {
                DataEntityToken dataEntityToken = entityToken as DataEntityToken;
                if (dataEntityToken == null) continue;

                if (dataEntityToken.InterfaceType == interfaceType)
                {
                    return dataEntityToken;
                }
            }

            return null;
        }
    }
}
