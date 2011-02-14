namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class UserToken
    {
        /// <exclude />
        public UserToken(string username)
        {
            this.Username = username;
        }

        /// <exclude />
        public string Username
        {
            get;
            private set;
        }

        /// <exclude />
        public override bool Equals(object obj)
        {
            return obj != null && obj is UserToken && (obj as UserToken).Username == Username;
        }

        /// <exclude />
        public override int GetHashCode()
        {
            return Username.GetHashCode();
        }
    }
}
