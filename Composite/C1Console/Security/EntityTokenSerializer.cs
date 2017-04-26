using System;
using System.Reflection;
using System.Security;
using System.Text;
using Composite.Core.Serialization;
using Composite.Core.Types;


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

            var sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "entityTokenType", TypeManager.SerializeType(entityToken.GetType()));
            
            string serializedEntityToken = entityToken.Serialize();

            if (serializedEntityToken == null)
            {
                throw new InvalidCastException($"'{entityToken.GetType()}' Serialize returned null");
            }

            StringConversionServices.SerializeKeyValuePair(sb, "entityToken", serializedEntityToken);

            if (includeHashValue)
            {
                StringConversionServices.SerializeKeyValuePair(sb, "entityTokenHash", HashSigner.GetSignedHash(serializedEntityToken).Serialize());
            }

            return sb.ToString();
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

            var dic = StringConversionServices.ParseKeyValueCollection(serializedEntityToken);

            if (!dic.ContainsKey("entityTokenType")  ||
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
                throw new EntityTokenSerializerException($"Failed to deserialize entity token '{entityTokenString}'", ex);
            }

            if (entityToken == null)
            {
                throw new EntityTokenSerializerException($"Deserialization function returned null value. EntityToken: '{entityTokenString}'");
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
