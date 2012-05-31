using System;
using System.Collections.Generic;
using Composite.C1Console.Security;
using Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider;

namespace Composite.Core.PageTemplates
{
    /// <exclude />
    [SecurityAncestorProvider(typeof(PageTemplateEntityTokenSecurityAncestorProvider))]
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PageTemplateEntityToken : EntityToken
    {
        private readonly string _id;

        /// <exclude />
        public PageTemplateEntityToken(Guid templateId)
        {
            _id = templateId.ToString();
        }

        /// <exclude />
        public Guid TemplateId
        {
            get { return new Guid(_id); }
        }

        /// <exclude />
        public override string Type
        {
            get { return ""; }
        }

        /// <exclude />
        public override string Source
        {
            get { return ""; }
        }

        /// <exclude />
        public override string Id
        {
            get { return _id; }
        }

        /// <exclude />
        public override string Serialize()
        {
            return DoSerialize();
        }

        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            string type, source, id;

            EntityToken.DoDeserialize(serializedData, out type, out source, out id);

            return new PageTemplateEntityToken(new Guid(id));
        }
    }

    internal sealed class PageTemplateEntityTokenSecurityAncestorProvider : ISecurityAncestorProvider
    {
        public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            return new [] { new PageTemplateRootEntityToken() };
        }
    }
}