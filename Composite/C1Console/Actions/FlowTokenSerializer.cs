using System;
using System.Collections.Generic;
using System.Reflection;
using System.Security;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.Serialization;
using Composite.Core.Types;


namespace Composite.C1Console.Actions
{
	internal static class FlowTokenSerializer
	{
        public static string Serialize(FlowToken flowToken)
        {
            return Serialize(flowToken, false);
        }


        public static string Serialize(FlowToken flowToken, bool includeHashValue)
        {
            if (flowToken == null) throw new ArgumentNullException("flowToken");

            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "flowTokenType", TypeManager.SerializeType(flowToken.GetType()));

            string serializedFlowToken = flowToken.Serialize();
            StringConversionServices.SerializeKeyValuePair(sb, "flowToken", serializedFlowToken);

            if (includeHashValue)
            {
                StringConversionServices.SerializeKeyValuePair(sb, "flowTokenHash", HashSigner.GetSignedHash(serializedFlowToken).Serialize());
            }

            return sb.ToString();
        }



        public static FlowToken Deserialize(string serialziedFlowToken)
        {
            return Deserialize(serialziedFlowToken, false);
        }



        public static FlowToken Deserialize(string serialziedFlowToken, bool includeHashValue)
        {
            if (string.IsNullOrEmpty(serialziedFlowToken)) throw new ArgumentNullException("serialziedFlowToken");

            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serialziedFlowToken);

            if ((dic.ContainsKey("flowTokenType") == false) ||
                (dic.ContainsKey("flowToken") == false) ||
                ((includeHashValue) && (dic.ContainsKey("flowTokenHash") == false)))
            {
                throw new ArgumentException("The serialziedFlowToken is not a serialized flowToken", "serialziedFlowToken");
            }

            string flowTokenTypeString = StringConversionServices.DeserializeValueString(dic["flowTokenType"]);
            string flowTokenString = StringConversionServices.DeserializeValueString(dic["flowToken"]);

            if (includeHashValue)
            {
                string flowTokenHash = StringConversionServices.DeserializeValueString(dic["flowTokenHash"]);

                HashValue hashValue = HashValue.Deserialize(flowTokenHash);
                if (HashSigner.ValidateSignedHash(flowTokenString, hashValue) == false)
                {
                    throw new SecurityException("Serialized flow token is tampered");
                }
            }

            Type flowType = TypeManager.GetType(flowTokenTypeString);

            MethodInfo methodInfo = flowType.GetMethod("Deserialize", BindingFlags.Public | BindingFlags.Static);
            if (methodInfo == null || !(typeof(FlowToken).IsAssignableFrom(methodInfo.ReturnType)))
            {
                throw new InvalidOperationException(string.Format("The flow token {0} is missing a public static Deserialize method taking a string as parameter and returning an {1}", flowType, typeof(FlowToken)));
            }


            FlowToken flowToken;
            try
            {
                flowToken = (FlowToken)methodInfo.Invoke(null, new object[] { flowTokenString });
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(string.Format("The flow token {0} is missing a public static Deserialize method taking a string as parameter and returning an {1}", flowType, typeof(FlowToken)), ex);
            }

            if (flowToken == null)
            {
                throw new InvalidOperationException(string.Format("public static Deserialize method taking a string as parameter and returning an {1} on the flow token {0} did not return an object", flowType, typeof(FlowToken)));
            }

            return flowToken;
        }
	}
}
