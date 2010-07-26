using Composite.Security;
using Composite.Security.SecurityAncestorProviders;


namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
	internal sealed class StandardFunctionProviderEntityToken : EntityToken
	{
        private string _id;
        private string _source;

        public StandardFunctionProviderEntityToken(string source, string id)
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

            return new StandardFunctionProviderEntityToken(id, source );
        }
    }
}
