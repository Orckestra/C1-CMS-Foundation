using System.Collections.Generic;
using Composite.C1Console.Security;
using Newtonsoft.Json;

namespace Composite.C1Console.Elements.ElementProviderHelpers.DataGroupingProviderHelper
{
    [SecurityAncestorProvider(typeof(ElipsisSecurityAncestorProvider))]
    internal class ElipsisEntityToken: EntityToken
    {
        private EntityToken _parentEntityToken;
        private readonly string _serializedParentEntityToken;

        public ElipsisEntityToken(EntityToken parentEntityToken)
        {
            _parentEntityToken = parentEntityToken;
            _serializedParentEntityToken = EntityTokenSerializer.Serialize(parentEntityToken, false);
        }

        /// <exclude />
        public ElipsisEntityToken(string serializedParentEntityToken)
        {
            _serializedParentEntityToken = serializedParentEntityToken;
        }

        /// <exclude />
        public override string Type => _serializedParentEntityToken;


        /// <exclude />
        public override string Source => "";


        /// <exclude />
        public override string Id => "";


        /// <exclude />
        [JsonIgnore]
        public EntityToken ParentEntityToken
        {
            get
            {
                if (_parentEntityToken == null)
                {
                    _parentEntityToken = EntityTokenSerializer.Deserialize(_serializedParentEntityToken);
                }

                return _parentEntityToken;
            }
        }


        /// <exclude />
        public EntityToken GetParentEntityToken()
        {
            return this.ParentEntityToken;
        }


        /// <exclude />
        public override string Serialize()
        {
            return DoSerialize();
        }

        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;

            DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new ElipsisEntityToken(type);
        }
    }

    internal class ElipsisSecurityAncestorProvider: ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            if (entityToken is ElipsisEntityToken)
            {
                return new [] {(entityToken as ElipsisEntityToken).GetParentEntityToken()};
            }

            return null;
        }
    }
}
