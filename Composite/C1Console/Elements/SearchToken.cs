using System;
using Composite.Core.Extensions;
using Composite.Core.Serialization;
using Composite.Core.Types;


namespace Composite.C1Console.Elements
{
    /// <summary>
    /// Class that describe a element provider search. Sub class this for more specific fields. As a minimum a Keyword is present.
    /// </summary>
    public class SearchToken
    {
        /// <summary>
        /// Keyword to search for
        /// </summary>
        public string Keyword { get; set; }

        /// <summary>
        /// Serializes this instance
        /// </summary>
        /// <returns>String representation</returns>
        public string Serialize()
        {
            return CompositeJsonSerializer.SerializeObject(this);
        }


        /// <summary>
        /// Deserializes a search token
        /// </summary>
        /// <param name="serializedSearchToken">String representation of searchtoken</param>
        /// <returns>Deserialized SearchToken</returns>
        public static SearchToken Deserialize( string serializedSearchToken )
        {
            Verify.ArgumentNotNullOrEmpty(serializedSearchToken, nameof(serializedSearchToken));

            if (serializedSearchToken.StartsWith("{"))
            {
                return CompositeJsonSerializer.Deserialize<SearchToken>(serializedSearchToken);
            }

            return DeserializeLegacy(serializedSearchToken);
        }

        private static SearchToken DeserializeLegacy(string serializedSearchToken)
        {
            Verify.ArgumentNotNullOrEmpty(serializedSearchToken, nameof(serializedSearchToken));
            Verify.ArgumentCondition(serializedSearchToken.IndexOf('|') > -1, nameof(serializedSearchToken), "Malformed serializedSearchToken - must be formated like '<class name>|<serialized values>'");

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
        /// This method return <value>true</value> if the <paramref name="searchToken"/> is NOT null and the keyword is NOT null or empty
        /// </summary>
        /// <param name="searchToken"></param>
        /// <returns></returns>
        public static bool IsValidKeyword(this SearchToken searchToken)
        {
            return searchToken != null && !searchToken.Keyword.IsNullOrEmpty();
        }
    }
}
