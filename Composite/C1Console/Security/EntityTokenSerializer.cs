using System;
using System.Reflection;
using System.Security;
using Composite.Core.Serialization;
using Composite.Core.Types;
using Composite.Core;

namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class EntityTokenSerializer
    {
        /// <exclude />
        public static string Serialize(EntityToken entityToken)
        {
            return Serialize(entityToken, false);
        }



        /// <exclude />
        public static string Serialize(EntityToken entityToken, bool includeHashValue)
        {
            Verify.ArgumentNotNull(entityToken, "entityToken");

            return CompositeJsonSerializer.Serialize(entityToken, includeHashValue);
        }

        
        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            return Deserialize(serializedEntityToken, false);
        }



        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken, bool includeHashValue)
        {
            if (string.IsNullOrEmpty(serializedEntityToken)) throw new ArgumentNullException(nameof(serializedEntityToken));

            EntityToken entityToken;
            if (CompositeJsonSerializer.IsJsonSerialized(serializedEntityToken))
            {
                entityToken =
                    CompositeJsonSerializer
                        .Deserialize<EntityToken>(serializedEntityToken,
                            includeHashValue);
            }
            else
            {
                entityToken = DeserializeLegacy(serializedEntityToken, includeHashValue);
                Log.LogVerbose(nameof(EntityTokenSerializer), entityToken.GetType().FullName);
            }

            if (entityToken == null)
            {
                throw new EntityTokenSerializerException($"Deserialization function returned null value. EntityToken: '{serializedEntityToken}'");
            }

            return entityToken;
            
            
        }

        private static EntityToken DeserializeLegacy(string serializedEntityToken, bool includeHashValue)
        {
            var dic = StringConversionServices.ParseKeyValueCollection(serializedEntityToken);

            if (!dic.ContainsKey("entityTokenType") ||
                !dic.ContainsKey("entityToken") ||
                (includeHashValue && !dic.ContainsKey("entityTokenHash")))
            {
                throw new ArgumentException("Failed to deserialize the value. Is has to be serialized with EntityTokenSerializer.", nameof(serializedEntityToken));
            }

            string entityTokenTypeString = StringConversionServices.DeserializeValueString(dic["entityTokenType"]);
            string entityTokenString = StringConversionServices.DeserializeValueString(dic["entityToken"]);

            if (includeHashValue)
            {
                string entityTokenHash = StringConversionServices.DeserializeValueString(dic["entityTokenHash"]);

                HashValue hashValue = HashValue.Deserialize(entityTokenHash);
                if (!HashSigner.ValidateSignedHash(entityTokenString, hashValue))
                {
                    throw new SecurityException("Serialized entity token is tampered");
                }
            }

            Type entityType = TypeManager.GetType(entityTokenTypeString);

            MethodInfo methodInfo = entityType.GetMethod("Deserialize", BindingFlags.Public | BindingFlags.Static);
            if (methodInfo == null)
            {
                throw new InvalidOperationException($"The entity token {entityType} is missing a public static Deserialize method taking a string as parameter and returning an {typeof(EntityToken)}");
            }

            EntityToken entityToken;
            try
            {
                entityToken = (EntityToken)methodInfo.Invoke(null, new object[] { entityTokenString });
            }
            catch (Exception ex)
            {
                throw new EntityTokenSerializerException($"Failed to deserialize entity token '{serializedEntityToken}'", ex);
            }

            if (entityToken == null)
            {
                throw new EntityTokenSerializerException($"Deserialization function returned null value. EntityToken: '{serializedEntityToken}'");
            }

            return entityToken;
        }


        /// <exclude />
        public static T Deserialize<T>(string serializedEntityToken)
            where T : EntityToken
        {
            return (T)Deserialize(serializedEntityToken);
        }
    }
}
