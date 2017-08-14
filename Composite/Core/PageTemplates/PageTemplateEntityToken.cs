using System;
using System.Collections.Generic;
using Composite.C1Console.Security;
using Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider;
using Newtonsoft.Json;

namespace Composite.Core.PageTemplates
{

    /// <summary>
    /// Entity token of a page template
    /// </summary>
    [SecurityAncestorProvider(typeof(PageTemplateEntityTokenSecurityAncestorProvider))]
    public sealed class PageTemplateEntityToken : EntityToken
    {
        private readonly string _id;


        /// <summary>
        /// Initializes a new instance of the <see cref="PageTemplateEntityToken"/> class.
        /// </summary>
        /// <param name="templateId">The template id.</param>
        public PageTemplateEntityToken(Guid templateId)
        {
            _id = templateId.ToString();
        }


        /// <summary>
        /// Gets the template id.
        /// </summary>
        [JsonIgnore]
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