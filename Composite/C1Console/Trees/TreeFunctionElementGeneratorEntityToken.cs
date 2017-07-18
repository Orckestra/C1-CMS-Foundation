using System.Collections.Generic;
using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;
using Composite.Core;
using Composite.Core.Serialization;
using Newtonsoft.Json;


namespace Composite.C1Console.Trees
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    internal sealed class TreeFunctionElementGeneratorEntityToken : EntityToken, IEntityTokenContainingParentEntityToken
    {
        private EntityToken _parentEntityToken;
        private readonly string _treeNodeId;
        private readonly string _treeId;
        private readonly string _serializedParentEntityToken;


        public TreeFunctionElementGeneratorEntityToken(string treeNodeId, string treeId, string serializedParentEntityToken, string elementId)
        {
            _treeNodeId = treeNodeId;
            _treeId = treeId;
            _serializedParentEntityToken = serializedParentEntityToken;
            this.ElementId = elementId;
        }

        [JsonConstructor]
        private TreeFunctionElementGeneratorEntityToken(string id, string source, EntityToken parentEntityToken, string elementId)
        {
            _treeNodeId = id;
            _treeId = source;
            _parentEntityToken = parentEntityToken;
            this.ElementId = elementId;
        }

        public override string Type => _serializedParentEntityToken;


        public override string Source => _treeId;


        public override string Id => _treeNodeId;


        public string ElementId
        {
            get;
            set;
        }


        public string TreeNodeId => this.Id;


        [JsonIgnore]
        public EntityToken ParentEntityToken
        {
            get
            {
                if (_parentEntityToken == null)
                {
                    _parentEntityToken = EntityTokenSerializer.Deserialize(this.Type);
                }

                return _parentEntityToken;
            }
        }



        public EntityToken GetParentEntityToken()
        {
            return this.ParentEntityToken;
        }



        public override string Serialize()
        {
            return CompositeJsonSerializer.Serialize(this);
        }



        public static EntityToken Deserialize(string serializedEntityToken)
        {
            EntityToken entityToken;
            if (CompositeJsonSerializer.IsJsonSerialized(serializedEntityToken))
            {
                entityToken = CompositeJsonSerializer.Deserialize<TreeFunctionElementGeneratorEntityToken>(serializedEntityToken);
            }
            else
            {
                entityToken = DeserializeLegacy(serializedEntityToken);
                Log.LogVerbose(nameof(TreeFunctionElementGeneratorEntityToken), entityToken.GetType().FullName);
            }
            return entityToken;
        }



        public static EntityToken DeserializeLegacy(string serializedEntityToken)
        {
            string type, source, id;
            Dictionary<string, string> dic;

            DoDeserialize(serializedEntityToken, out type, out source, out id, out dic);

            string elementId = StringConversionServices.DeserializeValueString(dic["ElementId"]);

            return new TreeFunctionElementGeneratorEntityToken(id, source, type, elementId);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode() ^ this.ElementId.GetHashCode();
        }



        public override bool Equals(object obj)
        {
            return base.Equals(obj)
                && (obj as TreeFunctionElementGeneratorEntityToken).ElementId == this.ElementId;
        }



        public override void OnGetPrettyHtml(EntityTokenHtmlPrettyfier prettyfier)
        {
            EntityToken parentEntityToken = this.ParentEntityToken;

            prettyfier.OnWriteType = (token, helper) => helper.AddFullRow(new string[] { "<b>Type</b>", string.Format("<b>ParentEntityToken:</b><br /><b>Type:</b> {0}<br /><b>Source:</b> {1}<br /><b>Id:</b>{2}<br />", parentEntityToken.Type, parentEntityToken.Source, parentEntityToken.Id) });
        }



        public override string OnGetTypePrettyHtml()
        {
            EntityToken parentEntityToken = this.ParentEntityToken;

            string type;
            IEntityTokenContainingParentEntityToken containingParentEnitytToken = parentEntityToken as IEntityTokenContainingParentEntityToken;
            if (containingParentEnitytToken != null)
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
