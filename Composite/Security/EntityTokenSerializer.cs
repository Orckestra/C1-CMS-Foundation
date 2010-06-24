using System;
using System.Collections.Generic;
using System.Reflection;
using System.Security;
using System.Text;
using Composite.Extensions;
using Composite.Serialization;
using Composite.Types;


namespace Composite.Security
{
    public static class EntityTokenSerializer
    {
        public static string Serialize(EntityToken entityToken)
        {
            return Serialize(entityToken, false);
        }


        public static string Serialize(EntityToken entityToken, bool includeHashValue)
        {
            Verify.ArgumentNotNull(entityToken, "entityToken");

            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "entityTokenType", TypeManager.SerializeType(entityToken.GetType()));
            
            string serializedEntityToken = entityToken.Serialize();

            if (serializedEntityToken == null)
            {
                throw new InvalidCastException(string.Format("'{0}' Serialize returned null", entityToken.GetType()));
            }

            StringConversionServices.SerializeKeyValuePair(sb, "entityToken", serializedEntityToken);

            if (includeHashValue == true)
            {
                StringConversionServices.SerializeKeyValuePair(sb, "entityTokenHash", HashSigner.GetSignedHash(serializedEntityToken).Serialize());
            }

            return sb.ToString();
        }



        public static EntityToken Deserialize(string serialziedEntityToken)
        {
            return Deserialize(serialziedEntityToken, false);
        }



        public static EntityToken Deserialize(string serialziedEntityToken, bool includeHashValue)
        {
            if (string.IsNullOrEmpty(serialziedEntityToken) == true) throw new ArgumentNullException("serialziedEntityToken");

            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serialziedEntityToken);

            if ((dic.ContainsKey("entityTokenType") == false) ||
                (dic.ContainsKey("entityToken") == false) ||
                ((includeHashValue == true) && (dic.ContainsKey("entityTokenHash") == false)))
            {
                throw new ArgumentException("Failed to deserialize the value. Is has to be searized with EntityTokenSerializer.", "serialziedEntityToken");
            }

            string entityTokenTypeString = StringConversionServices.DeserializeValueString(dic["entityTokenType"]);
            string entityTokenString = StringConversionServices.DeserializeValueString(dic["entityToken"]);

            if (includeHashValue == true)
            {
                string entityTokenHash = StringConversionServices.DeserializeValueString(dic["entityTokenHash"]);

                HashValue hashValue = HashValue.Deserialize(entityTokenHash);
                if (HashSigner.ValidateSignedHash(entityTokenString, hashValue) == false)
                {
                    throw new SecurityException("Serialized entity token is tampered");
                }
            }

            Type entityType = TypeManager.GetType(entityTokenTypeString);

            MethodInfo methodInfo = entityType.GetMethod("Deserialize", BindingFlags.Public | BindingFlags.Static);
            if (methodInfo == null)
            {
                throw new InvalidOperationException(string.Format("The entity token {0} is missing a public static Deserialize method taking a string as parameter and returning an {1}", entityType, typeof(EntityToken)));
            }


            EntityToken entityToken;
            try
            {
                entityToken = (EntityToken)methodInfo.Invoke(null, new object[] { entityTokenString });
            }
            catch (Exception ex)
            {
                throw new EntityTokenSerializerException("Failed to deserialize entity token '{0}'".FormatWith(entityTokenString), ex);
            }

            if (entityToken == null)
            {
                throw new EntityTokenSerializerException("Deserialization function returned null value. EntityToken: '{0}'".FormatWith(entityTokenString));
            }

            return entityToken;
        }



        public static T Deserialize<T>(string serialziedEntityToken)
            where T : EntityToken
        {
            return (T)Deserialize(serialziedEntityToken);
        }
    }
}
