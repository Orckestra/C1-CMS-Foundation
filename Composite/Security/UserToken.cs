namespace Composite.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class UserToken
    {
        public UserToken(string username)
        {
            this.Username = username;
        }

        public string Username
        {
            get;
            private set;
        }

        public override bool Equals(object obj)
        {
            return obj != null && obj is UserToken && (obj as UserToken).Username == Username;
        }

        public override int GetHashCode()
        {
            return Username.GetHashCode();
        }
    }
}
