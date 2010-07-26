using Composite.Security;
using Composite.Security.SecurityAncestorProviders;


namespace Composite.Trees
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    internal sealed class TreeSimpleElementEntityToken : EntityToken, IEntityTokenContainingParentEntityToken
	{
        private EntityToken _parentEntityToken;
        private string _treeNodeId;
        private string _treeId;
        private string _serializedParentEntityToken;


        public TreeSimpleElementEntityToken(string treeNodeId, string treeId, string serializedParentEntityToken)
        {
            _treeNodeId = treeNodeId;
            _treeId = treeId;
            _serializedParentEntityToken = serializedParentEntityToken;
        }


        public override string Type
        {
            get { return _serializedParentEntityToken; }
        }


        public override string Source
        {
            get { return _treeId; }
        }


        public override string Id
        {
            get { return _treeNodeId; }
        }


        public string TreeNodeId
        {
            get
            {
                return this.Id;
            }
        }


        public string SerializedParentEntityToken
        {
            get
            {
                return _serializedParentEntityToken;
            }
        }


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
            return DoSerialize();
        }


        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;

            DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new TreeSimpleElementEntityToken(id, source, type);
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
            if ((parentEntityToken is TreeSimpleElementEntityToken) == true)
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
