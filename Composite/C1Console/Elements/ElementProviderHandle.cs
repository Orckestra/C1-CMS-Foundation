using System;
using System.Text;
using System.Collections.Generic;
using Composite.Core.Serialization;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ElementProviderHandle
    {
        private string _serializedData = null;


        /// <exclude />
        public ElementProviderHandle(string providerName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

            this.ProviderName = providerName;
        }



        /// <exclude />
        public string ProviderName
        {
            get;
            private set;
        }



        /// <exclude />
        public string Serialize()
        {
            return ToString();
        }



        /// <exclude />
        public static ElementProviderHandle Deserialize(string serializedElementHandle)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedElementHandle);

            if (dic.ContainsKey("_providerName_") == false)
            {
                throw new ArgumentException("The serializedElementProviderHandle is not a serialized element provider handle", "serializedElementProviderHandle");
            }

            string providerName = StringConversionServices.DeserializeValueString(dic["_providerName_"]);

            return new ElementProviderHandle(providerName);
        }



        /// <exclude />
        public override string ToString()
        {
            if (_serializedData == null)
            {
                StringBuilder sb = new StringBuilder();
                StringConversionServices.SerializeKeyValuePair(sb, "_providerName_", ProviderName);

                _serializedData = sb.ToString();
            }

            return _serializedData;
        }
    }
}
