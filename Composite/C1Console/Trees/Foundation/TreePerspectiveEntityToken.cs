using Composite.C1Console.Security;
using Composite.Core.Serialization;
using Composite.Core;
using Newtonsoft.Json;


namespace Composite.C1Console.Trees.Foundation
{
    /// <exclude />
    [SecurityAncestorProvider(typeof(Composite.C1Console.Security.SecurityAncestorProviders.NoAncestorSecurityAncestorProvider))]
    public class TreePerspectiveEntityToken : EntityToken
    {
        /// <exclude />
        [JsonConstructor]
        public TreePerspectiveEntityToken(string id)
        {
            Id = id;
        }


        /// <exclude />
        public override string Id { get; }


        /// <exclude />
        [JsonIgnore]
        public override string Type => "C1Trees";


        /// <exclude />
        [JsonIgnore]
        public override string Source => "C1Trees";


        /// <exclude />
        public override string Serialize() => CompositeJsonSerializer.Serialize(this);


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
