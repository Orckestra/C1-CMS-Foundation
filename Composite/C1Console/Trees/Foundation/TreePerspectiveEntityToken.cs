using Composite.C1Console.Security;


namespace Composite.C1Console.Trees.Foundation
{
    [SecurityAncestorProvider(typeof(Composite.C1Console.Security.SecurityAncestorProviders.NoAncestorSecurityAncestorProvider))]
    internal class TreePerspectiveEntityToken : EntityToken
    {
        private readonly string _id;


        public TreePerspectiveEntityToken(string id)
        {
            _id = id;
        }


        public override string Id
        {
            get { return _id; }
        }


        public override string Type
        {
            get { return "C1Trees"; }
        }


        public override string Source
        {
            get { return "C1Trees"; }
        }


        public override string Serialize()
        {
            return Id;
        }


        public static EntityToken Deserialize(string serializedEntityToken)
        {
            return new TreePerspectiveEntityToken(serializedEntityToken);
        }
    }
}
