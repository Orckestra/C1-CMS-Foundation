using Composite.C1Console.Security;
using Newtonsoft.Json;


namespace Composite.C1Console.Actions.Workflows
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


        /// <exclude />
        public EntityTokenLockedEntityToken(string lockedByUsername, string serializedLockedActionToken, string serializedLockedEntityToken)
        {
            _lockedByUsername = lockedByUsername;
            _serializedLockedActionToken = serializedLockedActionToken;
            _serializedLockedEntityToken = serializedLockedEntityToken;            
        }


        /// <exclude />
        [JsonIgnore]
        public string LockedByUsername
        {
            get { return _lockedByUsername; }
        }


        /// <exclude />
        [JsonIgnore]
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


        /// <exclude />
        [JsonIgnore]
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


        /// <exclude />
        public override string Type
        {
            get { return _lockedByUsername; }
        }


        /// <exclude />
        public override string Source
        {
            get { return _serializedLockedActionToken; }
        }


        /// <exclude />
        public override string Id
        {
            get { return _serializedLockedEntityToken; }
        }


        /// <exclude />
        public override string Serialize()
        {
            return DoSerialize();
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;

            DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new EntityTokenLockedEntityToken(type, source, id);
        }
    }
}
