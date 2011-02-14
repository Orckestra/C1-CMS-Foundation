namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class SecurityToken
    {
        private EntityToken _entityToken;
        private ActionToken _actionToken;
        private UserToken _userToken;


        /// <exclude />
        public SecurityToken(EntityToken entityToken, ActionToken actionToken, UserToken userToken)
        {
            _entityToken = entityToken;
            _actionToken = actionToken;
            _userToken = userToken;
        }


        /// <exclude />
        public EntityToken EntityToken
        {
            get { return _entityToken; }
        }


        /// <exclude />
        public ActionToken ActionToken
        {
            get { return _actionToken; }
        }


        /// <exclude />
        public UserToken UserToken
        {
            get { return _userToken; }
        }
    }
}
