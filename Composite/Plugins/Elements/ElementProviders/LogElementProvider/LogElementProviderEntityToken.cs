using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;


namespace Composite.Plugins.Elements.ElementProviders.LogElementProvider
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    internal sealed class LogElementProviderEntityToken : EntityToken
	{
        public static string RootFolderId { get { return "Root"; } }

        private string _id;

        public LogElementProviderEntityToken(string id)
        {
            _id = id;
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

            return new LogElementProviderEntityToken(id);
        }
    }
}
