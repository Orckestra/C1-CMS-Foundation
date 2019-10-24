using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using Composite.Core.Serialization;
using Composite.Core.Types;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FlowHandle
    {
        private FlowToken _flowToken;

        private string _serializedData = null;


        /// <exclude />
        public FlowHandle(FlowToken FlowToken)
        {
            _flowToken = FlowToken;
        }


        /// <exclude />
        public FlowToken FlowToken
        {
            get { return _flowToken; }
        }


        /// <exclude />
        public static FlowHandle Deserialize(string serializedFlowHandle)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedFlowHandle);

            if ((dic.ContainsKey("_flowTokenType_") == false) ||
                (dic.ContainsKey("_flowToken_") == false))
            {
                throw new ArgumentException("The serializedFlowHandle is not a serialized flow handle", "serializedFlowHandle");
            }

            string flowTokenTypeString = StringConversionServices.DeserializeValueString(dic["_flowTokenType_"]);
            string flowTokenString = StringConversionServices.DeserializeValueString(dic["_flowToken_"]);

            Type flowTokenType = TypeManager.GetType(flowTokenTypeString);

            MethodInfo methodInfo = flowTokenType.GetMethod("Deserialize", BindingFlags.Public | BindingFlags.Static);
            if (methodInfo == null || !(typeof(FlowToken).IsAssignableFrom(methodInfo.ReturnType)))
            {
                throw new InvalidOperationException(string.Format("The flow token '{0}' is missing a public static Deserialize method taking a string as parameter and returning an '{1}'", flowTokenType, typeof(FlowToken)));
            }


            FlowToken flowToken;
            try
            {
                flowToken = (FlowToken)methodInfo.Invoke(null, new object[] { flowTokenString });
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(string.Format("The flow token '{0}' is missing a public static Deserialize method taking a string as parameter and returning an '{1}'", flowTokenType, typeof(FlowToken)), ex);
            }

            if (flowToken == null)
            {
                throw new InvalidOperationException(string.Format("public static Deserialize method taking a string as parameter and returning an '{0}' on the flow token '{1}' did not return an object", flowTokenType, typeof(FlowToken)));
            }

            return new FlowHandle(flowToken);
        }


        /// <exclude />
        public string Serialize()
        {
            return ToString();
        }


        /// <exclude />
        public override string ToString()
        {
            if (_serializedData == null)
            {
                StringBuilder sb = new StringBuilder();
                StringConversionServices.SerializeKeyValuePair(sb, "_flowTokenType_", TypeManager.SerializeType(_flowToken.GetType()));
                StringConversionServices.SerializeKeyValuePair(sb, "_flowToken_", _flowToken.Serialize());

                _serializedData = sb.ToString();
            }

            return _serializedData;
        }
    }
}
