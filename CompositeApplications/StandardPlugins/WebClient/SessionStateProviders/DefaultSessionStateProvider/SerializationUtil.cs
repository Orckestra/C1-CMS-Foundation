using System;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace Composite.StandardPlugins.WebClient.SessionStateProviders.DefaultSessionStateProvider
{
    public static class SerializationUtil
    {
        internal static readonly Encoding Encoding = Encoding.UTF8;

        public static string SerializeInternal<T>(T value)
        {
            return SerializeInternal(typeof (T), value);
        }

        public static string SerializeInternal(Type type, object value)
        {
            XmlSerializer serializer = GetSerializer(type);

            using (MemoryStream ms = new MemoryStream())
            {
                using (var xmlTextWriter = new XmlTextWriter(ms, Encoding))
                {
                    serializer.Serialize(xmlTextWriter, value);
                }

                return Encoding.GetString(ms.ToArray());
            }
        }

        public static object DeserializeInternal(Type type, string serializedValue)
        {
            XmlSerializer serializer = GetSerializer(type);

            byte[] bytes = Encoding.GetBytes(serializedValue);

            using (var stream = new MemoryStream(bytes))
            {
                return serializer.Deserialize(stream);
            }
        }

        public static string Serialize<T>(T value)
        {
            Type type = typeof (T);
            if(TypeRequiresWrapping(type))
            {
                return SerializeInternal(new XmlSerializationWrapper(value));
            }
            return SerializeInternal<T>(value);
        }

        public static T Deserialize<T>(string serializedValue)
        {
            Type type = typeof (T);
            if (TypeRequiresWrapping(type))
            {
                var wrapper = (XmlSerializationWrapper)DeserializeInternal(typeof (XmlSerializationWrapper), serializedValue);
                return (T)wrapper.Deserialize();
            }
            return (T) DeserializeInternal(type, serializedValue);
        }

        private static bool TypeRequiresWrapping(Type type)
        {
            return type.IsInterface
                   || type.FullName == "System.Object"
                   || (type.IsClass && !type.IsSealed);
        }

        private static XmlSerializer GetSerializer(Type type)
        {
            // TODO: implement caching
            return new XmlSerializer(type);
        }
    }
}
