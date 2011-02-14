using System;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Xml.Serialization;
using Composite.Core.Extensions;

namespace Composite.Plugins.WebClient.SessionStateProviders.DefaultSessionStateProvider
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    [XmlRootAttribute(ElementName = "root")]
    public sealed class XmlSerializationWrapper
    {
        /// <exclude />
        public string TypeName;

        /// <exclude />
        public string AssebmlyName;

        /// <exclude />
        public string Value;


        // For serialization purposes
        /// <exclude />
        public XmlSerializationWrapper()
        {
        }


        internal XmlSerializationWrapper(object value)
        {
            Verify.ArgumentNotNull(value, "value");

            Type type = value.GetType();

            TypeName = type.FullName;
            AssebmlyName = type.Assembly.GetName().Name;

            Value = SerializationUtil.SerializeInternal(type, value);
        }

        /// <exclude />
        public object Deserialize()
        {
            Verify.IsNotNull(AssebmlyName, "'AssebmlyName' is null");
            Verify.IsNotNull(TypeName, "'TypeName' is null");

            // TODO: Caching?
            Assembly asm = AppDomain.CurrentDomain.GetAssemblies().Where(a => a.GetName().Name == AssebmlyName).FirstOrDefault();

            if(asm == null) throw new SerializationException("Failed to find assembly '{0}'".FormatWith(AssebmlyName));

            Type type = asm.GetType(TypeName);
            Verify.IsNotNull(type, "Failed to get type '{0}' from assembly '{1}'", AssebmlyName, TypeName);

            return SerializationUtil.DeserializeInternal(type, Value);
        }
    }
}
