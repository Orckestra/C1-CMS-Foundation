using Composite.Security.SecurityAncestorProviders;


namespace Composite.Security
{
    /// <summary>
    /// This will alway be shown and allow all actions on it.
    /// It is not possible for the user to set any permissions on it.
    /// Use with care!!
    /// </summary>
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    internal sealed class NoSecurityEntityToken : EntityToken
    {
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
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializeedEntityToken)
        {
            return new NoSecurityEntityToken();
        }
    }
}
