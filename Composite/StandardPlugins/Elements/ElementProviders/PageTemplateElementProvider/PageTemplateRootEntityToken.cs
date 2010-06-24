using Composite.Security;
using Composite.Security.SecurityAncestorProviders;


namespace Composite.StandardPlugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    public class PageTemplateRootEntityToken : EntityToken
    {
        public PageTemplateRootEntityToken()
        {
        }

        public override string Type
        {
            get { return ""; }
        }

        public override string Source
        {
            get { return ""; }
        }

        public override string Id
        {
            get { return ""; }
        }

        public override string Serialize()
        {
            return "";
        }

        public static EntityToken Deserialize(string serializedData)
        {
            return new PageTemplateRootEntityToken();
        }
    }
}
