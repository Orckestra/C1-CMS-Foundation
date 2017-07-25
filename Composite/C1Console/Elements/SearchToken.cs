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
            return CompositeJsonSerializer.Serialize(this);
        }


        /// <summary>
        /// Deserializes a search token
        /// </summary>
        /// <param name="serializedSearchToken">String representation of searchtoken</param>
        /// <returns>Deserialized SearchToken</returns>
        public static SearchToken Deserialize( string serializedSearchToken )
        {
            Verify.ArgumentNotNullOrEmpty("serializedSearchToken", serializedSearchToken);

            return CompositeJsonSerializer.Deserialize<SearchToken>(serializedSearchToken);
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
