using System;
using Composite.Core.Serialization;
using Composite.Core.Types;


namespace Composite.C1Console.Elements
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class SearchToken
    {
        /// <exclude />
        public string Keyword { get; set; }

        /// <exclude />
        public string Serialize()
        {
            string serializedSearchToken = SerializationFacade.Serialize(this);
            string serializedClassName = TypeManager.SerializeType(this.GetType());

            string serializedSearchTokenWithClass = string.Format("{0}|{1}", serializedClassName, serializedSearchToken);

            return serializedSearchTokenWithClass;
        }


        /// <exclude />
        public static SearchToken Deserialize( string serializedSearchToken )
        {
            if (string.IsNullOrEmpty(serializedSearchToken)) throw new ArgumentNullException();
            if (serializedSearchToken.IndexOf('|') == -1) throw new ArgumentException("Malformed serializedSearchToken - must be formated like '<class name>|<serialized values>'");

            string[] parts = serializedSearchToken.Split('|');

            string className = parts[0];
            string serializedSearchTokenWithoutClassName = parts[1];

            Type searchTokenType = TypeManager.GetType(className);

            SearchToken searchToken = (SearchToken)SerializationFacade.Deserialize(searchTokenType, serializedSearchTokenWithoutClassName);

            return searchToken;
        }
    }



    internal static class SeachTokenExtensionMethods
    {
        /// <summary>
        /// This method return true if the searchToken is NOT null and the keyword is NOT null or empty
        /// </summary>
        /// <param name="searchToken"></param>
        /// <returns></returns>
        public static bool IsValidKeyword(this SearchToken searchToken)
        {
            if (searchToken == null) return false;
            if (string.IsNullOrEmpty(searchToken.Keyword) == true) return false;

            return true;
        }
    }
}
