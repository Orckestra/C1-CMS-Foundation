using Composite.Security;


namespace Composite.Actions.Workflows
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    // This is a dummy token, no elements using this token exists!
    public sealed class EntityTokenLockedEntityToken : EntityToken
	{
        private string _lockedByUsername;
        private string _serializedLockedActionToken;
        private string _serializedLockedEntityToken;

        private ActionToken _lockedActionToken = null;
        private EntityToken _lockedEntityToken = null;

        public EntityTokenLockedEntityToken(string lockedByUsername, string serializedLockedActionToken, string serializedLockedEntityToken)
        {
            _lockedByUsername = lockedByUsername;
            _serializedLockedActionToken = serializedLockedActionToken;
            _serializedLockedEntityToken = serializedLockedEntityToken;            
        }

        public string LockedByUsername
        {
            get { return _lockedByUsername; }
        }

        public ActionToken LockedActionToken
        {
            get
            {
                if (_lockedActionToken == null)
                {
                    _lockedActionToken = ActionTokenSerializer.Deserialize(_serializedLockedActionToken);
                }

                return _lockedActionToken;
            }
        }

        public EntityToken LockedEntityToken
        {
            get
            {
                if (_lockedEntityToken == null)
                {
                    _lockedEntityToken = EntityTokenSerializer.Deserialize(_serializedLockedEntityToken);
                }

                return _lockedEntityToken;
            }
        }

        public override string Type
        {
            get { return _lockedByUsername; }
        }

        public override string Source
        {
            get { return _serializedLockedActionToken; }
        }

        public override string Id
        {
            get { return _serializedLockedEntityToken; }
        }

        public override string Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;

            DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new EntityTokenLockedEntityToken(type, source, id);
        }
    }
}
