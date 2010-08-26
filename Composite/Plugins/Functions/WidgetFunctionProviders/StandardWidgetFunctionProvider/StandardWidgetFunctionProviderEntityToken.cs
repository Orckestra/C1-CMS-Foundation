using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    internal sealed class StandardWidgetFunctionProviderEntityToken : EntityToken
	{
        private string _id;
        private string _source;

        public StandardWidgetFunctionProviderEntityToken(string source, string id)
        {
            _source = source;
            _id = id;
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
            get { return _id; }
        }

        public override string Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;

            DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new StandardWidgetFunctionProviderEntityToken(id, source);
        }
    }
}
