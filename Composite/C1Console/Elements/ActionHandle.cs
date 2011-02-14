using System;
using System.Text;
using System.Reflection;
using System.Collections.Generic;
using Composite.Core.Types;
using Composite.C1Console.Security;
using Composite.Core.Serialization;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ActionHandle
    {
        private ActionToken _actionToken;
        private string _serializedActionToken;



        /// <exclude />
        public ActionHandle(ActionToken actionToken)
        {
            _actionToken = actionToken;
        }



        /// <exclude />
        public ActionToken ActionToken
        {
            get { return _actionToken; }
        }



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
        public override bool Equals(object obj)
        {
            return Equals(obj as ActionHandle);
        }



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
