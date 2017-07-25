using Composite.C1Console.Security;
using System.Collections.Generic;
using Composite.Core.Serialization;
using System.Text;
using Composite.Core;
using Newtonsoft.Json;


namespace Composite.C1Console.Trees.Foundation
{
    /// <exclude />
    [SecurityAncestorProvider(typeof(Composite.C1Console.Security.SecurityAncestorProviders.NoAncestorSecurityAncestorProvider))]
    public class TreePerspectiveEntityToken : EntityToken
    {
        private readonly string _id;
        private List<string> _childTrees = new List<string>();


        /// <exclude />
        [JsonConstructor]
        public TreePerspectiveEntityToken(string id)
        {
            _id = id;
        }


        /// <exclude />
        public override string Id
        {
            get { return _id; }
        }


        /// <exclude />
        [JsonIgnore]
        public override string Type
        {
            get { return "C1Trees"; }
        }


        /// <exclude />
        [JsonIgnore]
        public override string Source
        {
            get { return "C1Trees"; }
        }


        /// <exclude />
        public void AddChildTree(string treeId)
        {
            _childTrees.Add(treeId);
        }


        /// <exclude />
        public override string Serialize()
        {
            return CompositeJsonSerializer.Serialize(this);
            /*StringBuilder sb = new StringBuilder();
            
            StringConversionServices.SerializeKeyValuePair(sb, "Id", Id);
            
            int counter = 0;
            foreach (string treeId in _childTrees)
            {
                string key = "TreeId" + (counter++);
                StringConversionServices.SerializeKeyValuePair(sb, key, treeId);
            }

            return sb.ToString();*/
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            EntityToken entityToken;
            if (CompositeJsonSerializer.IsJsonSerialized(serializedEntityToken))
            {
                entityToken = CompositeJsonSerializer.Deserialize<TreePerspectiveEntityToken>(serializedEntityToken);
            }
            else
            {
                entityToken = DeserializeLegacy(serializedEntityToken);
                Log.LogVerbose(nameof(TreePerspectiveEntityToken), entityToken.GetType().FullName);
            }
            return entityToken;
        }

        /// <exclude />
        public static EntityToken DeserializeLegacy(string serializedEntityToken)
        {
            return new TreePerspectiveEntityToken(serializedEntityToken);
        }
    }
}
