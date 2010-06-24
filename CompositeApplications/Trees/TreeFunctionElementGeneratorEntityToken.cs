using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Security;
using Composite.Security.SecurityAncestorProviders;
using Composite.Serialization;


namespace Composite.Trees
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    public sealed class TreeFunctionElementGeneratorEntityToken : EntityToken, IEntityTokenContainingParentEntityToken
    {
        private EntityToken _parentEntityToken;
        private string _treeNodeId;
        private string _treeId;
        private string _serializedParentEntityToken;


        public TreeFunctionElementGeneratorEntityToken(string treeNodeId, string treeId, string serializedParentEntityToken, string elementId)
        {
            _treeNodeId = treeNodeId;
            _treeId = treeId;
            _serializedParentEntityToken = serializedParentEntityToken;
            this.ElementId = elementId;
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


        public string ElementId
        {
            get;
            set;
        }


        public string TreeNodeId
        {
            get
            {
                return this.Id;
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
            StringBuilder sb = new StringBuilder();
            DoSerialize(sb);

            StringConversionServices.SerializeKeyValuePair(sb, "ElementId", this.ElementId);

            return sb.ToString();
        }


        public static EntityToken Deserialize(string serializedEntityToken)
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
            return Equals(obj as TreeFunctionElementGeneratorEntityToken);
        }



        public bool Equals(TreeFunctionElementGeneratorEntityToken treeFunctionElementGeneratorEntityToken)
        {
            if (treeFunctionElementGeneratorEntityToken == null) return false;

            return treeFunctionElementGeneratorEntityToken.Type == this.Type &&
                   treeFunctionElementGeneratorEntityToken.Source == this.Source &&
                   treeFunctionElementGeneratorEntityToken.Id == this.Id &&
                   treeFunctionElementGeneratorEntityToken.ElementId == this.ElementId;
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
