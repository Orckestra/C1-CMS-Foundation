using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    internal class PageTemplateRootEntityToken : EntityToken
    {
        public override string Type { get { return ""; } }
        public override string Source { get { return ""; } }
        public override string Id { get { return "PageTemplateRootEntityToken"; } }
        public override string Serialize() { return ""; }

        public static EntityToken Deserialize(string serializedData)
        {
            return new PageTemplateRootEntityToken();
        }
    }
}
