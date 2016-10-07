using Composite.C1Console.Security;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// A handle to an action - a unique and serializable way to identify actions.
    /// </summary>
    public sealed class ActionHandle
    {
        private readonly ActionToken _actionToken;
        private string _serializedActionToken;



        /// <summary>
        /// Constructs a new instance.
        /// </summary>
        /// <param name="actionToken"></param>
        public ActionHandle(ActionToken actionToken)
        {
            _actionToken = actionToken;
        }



        /// <summary>
        /// <see cref="ActionToken"/> represented by this handle.
        /// </summary>
        public ActionToken ActionToken => _actionToken;


        private string SerializedActionToken
        {
            get
            {
                if (_serializedActionToken == null)
                {
                    _serializedActionToken = _actionToken.Serialize();
                }

                return _serializedActionToken;
            }
        }



        /// <exclude />
        public override bool Equals(object obj) => Equals(obj as ActionHandle);


        /// <exclude />
        public bool Equals(ActionHandle actionHandle)
        {
            if (actionHandle == null) return false;

            return this.SerializedActionToken == actionHandle.SerializedActionToken;
        }



        /// <exclude />
        public override int GetHashCode()
        {
            return this.SerializedActionToken.GetHashCode();
        }
    }
}
