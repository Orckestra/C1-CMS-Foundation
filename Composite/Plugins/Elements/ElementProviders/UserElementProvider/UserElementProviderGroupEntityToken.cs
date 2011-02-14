using Composite.C1Console.Security;


namespace Composite.Plugins.Elements.ElementProviders.UserElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(UserElementProviderGroupEntityTokenSecurityAncestorProvider))]
    public sealed class UserElementProviderGroupEntityToken : EntityToken
	{
        private string _id;

        /// <exclude />
        public UserElementProviderGroupEntityToken(string id)
        {
            _id = id;
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
            return _id;
        }

        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            return new UserElementProviderGroupEntityToken(serializedData);
        }
    }
}
