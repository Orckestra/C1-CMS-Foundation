using System.Diagnostics;
using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;
using Composite.Core.Serialization;
using Newtonsoft.Json;
using Composite.Core;
using Newtonsoft.Json.Linq;

namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    [DebuggerDisplay("Id = {Id}, TreeId = {Source}, ParentEntityToken = {Type}")]
    public sealed class TreeSimpleElementEntityToken : EntityToken, IEntityTokenContainingParentEntityToken
    {
        private EntityToken _parentEntityToken;
        private readonly string _treeNodeId;
        private readonly string _treeId;
        private readonly string _serializedParentEntityToken;

        /// <exclude />
        public TreeSimpleElementEntityToken(string treeNodeId, string treeId, string serializedParentEntityToken)
        {
            _treeNodeId = treeNodeId;
            _treeId = treeId;
            _serializedParentEntityToken = serializedParentEntityToken;
        }

        [JsonConstructor]
        private TreeSimpleElementEntityToken(string treeNodeId, string treeId, JRaw parentEntityToken, string serializedParentEntityToken)
        {
            _treeNodeId = treeNodeId;
            _treeId = treeId;
            _serializedParentEntityToken = parentEntityToken?.Value.ToString() ?? serializedParentEntityToken;
        }

        /// <exclude />
        [JsonProperty(PropertyName = "serializedParentEntityToken")]
        public override string Type => _serializedParentEntityToken;

        /// <exclude />
        public bool ShouldSerializeType()
        {
            return !CompositeJsonSerializer.IsJsonSerialized(_serializedParentEntityToken);
        }

        [JsonProperty(PropertyName = "parentEntityToken")]
        private JRaw rawSerializedParentEntityToken => new JRaw(_serializedParentEntityToken);

        /// <exclude />
        public bool ShouldSerializerawSerializedParentEntityToken()
        {
            return CompositeJsonSerializer.IsJsonSerialized(_serializedParentEntityToken);
        }

        /// <exclude />
        [JsonProperty(PropertyName = "treeId")]
        public override string Source => _treeId;


        /// <exclude />
        [JsonProperty(PropertyName = "treeNodeId")]
        public override string Id => _treeNodeId;

        /// <exclude />
        [JsonIgnore]
        public string TreeNodeId => this.Id;

        /// <exclude />
        [JsonIgnore]
        public string SerializedParentEntityToken => _serializedParentEntityToken;

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
            return CompositeJsonSerializer.Serialize(this);
        }

        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            EntityToken entityToken;
            if (CompositeJsonSerializer.IsJsonSerialized(serializedEntityToken))
            {
                entityToken =
                    CompositeJsonSerializer.Deserialize<TreeSimpleElementEntityToken>(serializedEntityToken);
            }
            else
            {
                entityToken = DeserializeLegacy(serializedEntityToken);
                Log.LogVerbose(nameof(TreeSimpleElementEntityToken), entityToken.GetType().FullName);
            }
            return entityToken;

        }

        /// <exclude />
        public static EntityToken DeserializeLegacy(string serializedEntityToken)
        {
            string type, source, id;

            DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new TreeSimpleElementEntityToken(id, source, type);
        }

        /// <exclude />
        public override void OnGetPrettyHtml(EntityTokenHtmlPrettyfier prettyfier)
        {
            EntityToken parentEntityToken = this.ParentEntityToken;

            prettyfier.OnWriteType = (token, helper) => helper.AddFullRow(new string[] { "<b>Type</b>", string.Format("<b>ParentEntityToken:</b><br /><b>Type:</b> {0}<br /><b>Source:</b> {1}<br /><b>Id:</b>{2}<br />", parentEntityToken.Type, parentEntityToken.Source, parentEntityToken.Id) });
        }


        /// <exclude />
        public override string OnGetTypePrettyHtml()
        {
            EntityToken parentEntityToken = this.ParentEntityToken;

            string type;
            if ((parentEntityToken is TreeSimpleElementEntityToken))
            {
                type = string.Format(@"<div style=""border: 1px solid blue;"">{0}</div>", parentEntityToken.OnGetTypePrettyHtml());
            }
            else
            {
                type = parentEntityToken.Type;
            }

            return string.Format("<b>ParentEntityToken:</b><br /><b>Type:</b> {0}<br /><b>Source:</b> {1}<br /><b>Id:</b>{2}<br />", type, parentEntityToken.Source, parentEntityToken.Id);
        }
    }
}
