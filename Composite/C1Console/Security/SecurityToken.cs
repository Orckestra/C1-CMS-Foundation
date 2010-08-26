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


        public SecurityToken(EntityToken entityToken, ActionToken actionToken, UserToken userToken)
        {
            _entityToken = entityToken;
            _actionToken = actionToken;
            _userToken = userToken;
        }


        public EntityToken EntityToken
        {
            get { return _entityToken; }
        }


        public ActionToken ActionToken
        {
            get { return _actionToken; }
        }


        public UserToken UserToken
        {
            get { return _userToken; }
        }
    }
}
