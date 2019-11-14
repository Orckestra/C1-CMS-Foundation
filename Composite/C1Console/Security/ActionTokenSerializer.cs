using System;
using System.Collections.Generic;
using System.Reflection;
using System.Security;
using System.Text;
using Composite.Core.Serialization;
using Composite.Core.Types;
using Composite.Core;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ActionTokenSerializer
    {
        /// <exclude />
        public static string Serialize(ActionToken actionToken)
        {
            return Serialize(actionToken, false);
        }



        /// <exclude />
        public static string Serialize(ActionToken actionToken, bool includeHashValue)
        {
            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "actionTokenType", TypeManager.SerializeType(actionToken.GetType()));

            string serializedActionToken = actionToken.Serialize();
            StringConversionServices.SerializeKeyValuePair(sb, "actionToken", serializedActionToken);

            if (includeHashValue)
            {
                StringConversionServices.SerializeKeyValuePair(sb, "actionTokenHash", HashSigner.GetSignedHash(serializedActionToken).Serialize());
            }

            return sb.ToString();
        }



        /// <exclude />
        public static ActionToken Deserialize(string serialziedActionToken)
        {
            return Deserialize(serialziedActionToken, false);
        }



        /// <exclude />
        public static ActionToken Deserialize(string serialziedActionToken, bool includeHashValue)
        {
            if (string.IsNullOrEmpty(serialziedActionToken)) throw new ArgumentNullException("serialziedActionToken");

            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serialziedActionToken);

            if ((dic.ContainsKey("actionTokenType") == false) ||
                (dic.ContainsKey("actionToken") == false) ||
                ((includeHashValue) && (dic.ContainsKey("actionTokenHash") == false)))
            {
                throw new ArgumentException("Failed to deserialize the value. It has to be serialized with ActionTokenSerializer class.", "serialziedActionToken");
            }

            string actionTokenTypeString = StringConversionServices.DeserializeValueString(dic["actionTokenType"]);
            string actionTokenString = StringConversionServices.DeserializeValueString(dic["actionToken"]);

            if (includeHashValue)
            {
                string actionTokenHash = StringConversionServices.DeserializeValueString(dic["actionTokenHash"]);

                HashValue hashValue = HashValue.Deserialize(actionTokenHash);
                if (HashSigner.ValidateSignedHash(actionTokenString, hashValue) == false)
                {
                    throw new SecurityException("Serialized action token is tampered");
                }
            }

            Type actionType = TypeManager.GetType(actionTokenTypeString);

            MethodInfo methodInfo = actionType.GetMethod("Deserialize", BindingFlags.Public | BindingFlags.Static);
            if (methodInfo == null || !(typeof(ActionToken).IsAssignableFrom(methodInfo.ReturnType)))
            {
                Log.LogWarning("ActionTokenSerializer", string.Format("The action token {0} is missing a public static Deserialize method taking a string as parameter and returning an {1}", actionType, typeof(ActionToken)));
                throw new InvalidOperationException(string.Format("The action token {0} is missing a public static Deserialize method taking a string as parameter and returning an {1}", actionType, typeof(ActionToken)));
            }


            ActionToken actionToken;
            try
            {
                actionToken = (ActionToken)methodInfo.Invoke(null, new object[] { actionTokenString });
            }
            catch (Exception ex)
            {
                Log.LogWarning("ActionTokenSerializer", string.Format("The action token {0} is missing a public static Deserialize method taking a string as parameter and returning an {1}", actionType, typeof(ActionToken)));
                Log.LogWarning("ActionTokenSerializer", ex);

                throw new InvalidOperationException(string.Format("The action token {0} is missing a public static Deserialize method taking a string as parameter and returning an {1}", actionType, typeof(ActionToken)), ex);
            }

            if (actionToken == null)
            {
                Log.LogWarning("ActionTokenSerializer", string.Format("public static Deserialize method taking a string as parameter and returning an {1} on the action token {0} did not return an object", actionType, typeof(ActionToken)));

                throw new InvalidOperationException(string.Format("public static Deserialize method taking a string as parameter and returning an {1} on the action token {0} did not return an object", actionType, typeof(ActionToken)));
            }

            return actionToken;
        }



        /// <exclude />
        public static T Deserialize<T>(string serialziedActionToken)
            where T : ActionToken
        {
            return (T)Deserialize(serialziedActionToken);
        }
    }
}
