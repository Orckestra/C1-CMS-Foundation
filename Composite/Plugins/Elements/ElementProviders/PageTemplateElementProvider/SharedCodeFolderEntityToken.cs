using System;
using System.Collections.Generic;
using Composite.C1Console.Security;

namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [SecurityAncestorProvider(typeof(SharedCodeFolderEntityToken.SharedCodeFolderSecurityAncestorProvider))]
    internal class SharedCodeFolderEntityToken : EntityToken
    {
        public override string Type { get { return "_"; } }
        public override string Source { get { return "_"; } }
        public override string Id { get { return "_"; } }
        public override string Serialize() { return ""; }

        public static EntityToken Deserialize(string serializedData)
        {
            return new SharedCodeFolderEntityToken();
        }

        internal class SharedCodeFolderSecurityAncestorProvider : ISecurityAncestorProvider
        {
            public IEnumerable<EntityToken> GetParents(EntityToken entityToken)
            {
                return new[] { new PageTemplateRootEntityToken() };
            }
        }
    }
}
