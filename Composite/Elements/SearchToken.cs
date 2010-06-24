using System;
using Composite.Serialization;
using Composite.Types;


namespace Composite.Elements
{
    public class SearchToken
    {
        public string Keyword { get; set; }

        public string Serialize()
        {
            string serializedSearchToken = SerializationFacade.Serialize(this);
            string serializedClassName = TypeManager.SerializeType(this.GetType());

            string serializedSearchTokenWithClass = string.Format("{0}|{1}", serializedClassName, serializedSearchToken);

            return serializedSearchTokenWithClass;
        }


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



    public static class SeachTokenExtensionMethods
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
