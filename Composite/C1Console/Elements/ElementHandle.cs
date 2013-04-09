using System;
using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.Serialization;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// A "identity token" which identifies a specific element from a specific provider. 
    /// </summary>
    public sealed class ElementHandle
    {
        private readonly string _providerName;
        private readonly EntityToken _entityToken;
        private string _serializedPiggyback = null;
        Dictionary<string, string> _piggyback = null;


        /// <summary>
        /// Constructs a new ElementHandle
        /// </summary>
        /// <param name="providerName"></param>
        /// <param name="entityToken"></param>
        public ElementHandle(string providerName, EntityToken entityToken)
            : this(providerName, entityToken, (string)null)
        {
        }



        /// <summary>
        /// Constructs a new ElementHandle
        /// </summary>
        /// <param name="providerName"></param>
        /// <param name="entityToken"></param>
        /// <param name="piggyback"></param>
        public ElementHandle(string providerName, EntityToken entityToken, Dictionary<string, string> piggyback)
        {
            Verify.ArgumentNotNull(piggyback, "piggyback");

            _providerName = providerName;
            _entityToken = entityToken;
            _piggyback = piggyback;
        }



        /// <summary>
        /// Constructs a new ElementHandle
        /// </summary>
        /// <param name="providerName"></param>
        /// <param name="entityToken"></param>
        /// <param name="piggyback"></param>
        public ElementHandle(string providerName, EntityToken entityToken, string piggyback)
        {
            if (piggyback == null)
            {
                piggyback = string.Empty;
            }

            _providerName = providerName;
            _entityToken = entityToken;

            _serializedPiggyback = piggyback;
        }



        /// <summary>
        /// Name of provider this ElementHandle originate from
        /// </summary>
        public string ProviderName
        {
            get { return _providerName; }
        }



        /// <summary>
        /// The entity token of the element
        /// </summary>
        public EntityToken EntityToken
        {
            get { return _entityToken; }
        }



        /// <summary>
        /// Custom values appended to this ElementHandle
        /// </summary>
        public Dictionary<string, string> Piggyback
        {
            get
            {
                if (_piggyback == null)
                {
                    string serialized = _serializedPiggyback;
                    Verify.IsNotNull(serialized, "Serialized state is NULL");

                    _piggyback = PiggybagSerializer.Deserialize(_serializedPiggyback);
                }

                return _piggyback;
            }
        }



        /// <exclude />
        public string SerializedPiggyback
        {
            get
            {
                if (_serializedPiggyback == null)
                {
                    _serializedPiggyback = PiggybagSerializer.Serialize(this.Piggyback);
                }

                return _serializedPiggyback;
            }
        }



        /// <exclude />
        public override bool Equals(object obj)
        {
            return Equals(obj as ElementHandle);
        }



        /// <exclude />
        public bool Equals(ElementHandle elementHandle)
        {
            if (elementHandle == null) return false;

            if ((elementHandle.EntityToken.Equals(this.EntityToken) == false) || (elementHandle.ProviderName != this.ProviderName)) return false;

            if (elementHandle.Piggyback.Count != this.Piggyback.Count) return false;

            foreach (KeyValuePair<string, string> kvp in elementHandle.Piggyback)
            {
                string value;
                if (this.Piggyback.TryGetValue(kvp.Key, out value) == false) return false;

                if (kvp.Value != value) return false;
            }

            return true;
        }



        /// <exclude />
        public override int GetHashCode()
        {
            int hashCode = this._providerName.GetHashCode() ^ _entityToken.GetHashCode();

            foreach (KeyValuePair<string, string> kvp in this.Piggyback)
            {
                hashCode ^= kvp.Key.GetHashCode();
                hashCode ^= kvp.Value.GetHashCode();
            }

            return hashCode;
        }
    }
}
