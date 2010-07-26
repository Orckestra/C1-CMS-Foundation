using Composite.Security;
using Composite.Security.SecurityAncestorProviders;


namespace Composite.StandardPlugins.Elements.ElementProviders.PageElementProvider
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    internal sealed class PageElementProviderEntityToken : EntityToken
	{
        private string _source;

        public PageElementProviderEntityToken(string source)
        {
            _source = source;
        }

        public override string Type
        {
            get { return ""; }
        }

        public override string Source
        {
            get { return _source; }
        }

        public override string Id
        {
            get { return ""; }
        }

        public override string Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedData)
        {
            string type, source, id;

            DoDeserialize(serializedData, out type, out source, out id);

            return new PageElementProviderEntityToken(source);
        }
    }
}
