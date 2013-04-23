using System.Diagnostics;
using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;


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

        /// <exclude />
        public override string Type
        {
            get { return _serializedParentEntityToken; }
        }


        /// <exclude />
        public override string Source
        {
            get { return _treeId; }
        }


        /// <exclude />
        public override string Id
        {
            get { return _treeNodeId; }
        }

        /// <exclude />
        public string TreeNodeId
        {
            get
            {
                return this.Id;
            }
        }

        /// <exclude />
        public string SerializedParentEntityToken
        {
            get
            {
                return _serializedParentEntityToken;
            }
        }

        /// <exclude />
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
