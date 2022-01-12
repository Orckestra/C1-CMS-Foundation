using System;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters;
using System.Security;
using Composite.C1Console.Security;
using Composite.Core.Types;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Composite.Core.Serialization
{
    /// <summary>
    /// Use this class to serialize and deserialize objects with json serializer
    /// </summary>
    public static class CompositeJsonSerializer
    {
        private const string ObjectKeyString = "meta:obj";
        private const string TypeKeyString = "meta:type";
        private const string HashKeyString = "meta:hash";

        /// <summary>
        /// Check if string is serialized with JsonSerializer
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static bool IsJsonSerialized(string str)
        {
            return str.StartsWith("{");
        }

        /// <summary>
        /// Serialize with automatic type name handling
        /// </summary>
        /// <param name="obj">Object to serialize</param>
        /// <returns>serialized string</returns>
        public static string Serialize(object obj)
        {
            var serializedData = JsonConvert.SerializeObject(obj, new JsonSerializerSettings
            {
                TypeNameAssemblyFormat = FormatterAssemblyStyle.Simple,
                TypeNameHandling = TypeNameHandling.Auto,
                Converters = { new JsonTypeConverter() },
                Binder = CompositeSerializationBinder.Instance
            });

            return serializedData;
        }

        /// <summary>
        /// Serialize with json object structure type name handling
        /// </summary>
        /// <param name="obj">Object to serialize</param>
        /// <returns>serialized string</returns>
        public static string SerializeObject(object obj)
        {
            var serializedData = JsonConvert.SerializeObject(obj, new JsonSerializerSettings
            {
                TypeNameAssemblyFormat = FormatterAssemblyStyle.Simple,
                TypeNameHandling = TypeNameHandling.Objects,
                Formatting = Formatting.None,
                Converters = { new JsonTypeConverter() },
                Binder = CompositeSerializationBinder.Instance
            });

            return serializedData;
        }

        /// <summary>
        /// Serialize only the property names that is specified
        /// </summary>
        /// <param name="obj">Object to serialize</param>
        /// <param name="propertyNames">List of properties to be serialized</param>
        /// <returns>serialized string</returns>
        public static string SerializePartial(object obj, IEnumerable<string> propertyNames)
        {
            if (propertyNames == null)
            {
                return SerializeObject(obj);
            }

            var serializedData = JsonConvert.SerializeObject(obj, new JsonSerializerSettings
            {
                Converters = { new PartialJsonConvertor(propertyNames, obj.GetType()) }
            });

            return serializedData;
        }

        /// <summary>
        /// Serialize with a wrapper containing the serialized object, its hash sign and its type
        /// </summary>
        /// <param name="obj">Object to serialize</param>
        /// <param name="shouldSign">To calculate the hash sign</param>
        /// <returns>serialized string</returns>
        public static string Serialize(object obj, bool shouldSign)
        {
            var type = obj.GetType();
            string serializedData;

            var methodInfo = type.GetMethod("Serialize");
            if (methodInfo == null)
            {
                serializedData = Serialize(obj);
            }
            else
            {
                serializedData = (string)methodInfo.Invoke(obj, null);
            }

            var hash = shouldSign ? HashSigner.GetSignedHash(serializedData).GetHashCode() : 0;

            var serializedProperties = IsJsonSerialized(serializedData)
                ? serializedData.Substring(1, serializedData.Length - 2)
                : $@"""{ObjectKeyString}"":""{serializedData}""";

            return "{" + serializedProperties
                + $@",""{TypeKeyString}"":""{GetSerializedTypeName(type)}"""
                + (shouldSign ? $@",""{HashKeyString}"":""{hash}""" : "")
                + "}";
        }

        /// <summary>
        /// Deserialize string into object with specified type
        /// </summary>
        /// <param name="str">Serialized string</param>
        /// <typeparam name="T">Type of returned object</typeparam>
        /// <returns>The object</returns>
        public static T Deserialize<T>(string str)
        {
            var obj = JsonConvert.DeserializeObject<T>(str, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Auto,
                Binder = CompositeSerializationBinder.Instance
            });

            return obj;
        }

        /// <summary>
        /// Deserialize strings into object with specified type by merging them together
        /// </summary>
        /// <param name="strs">Serialized string</param>
        /// <typeparam name="T">Type of returned object</typeparam>
        /// <returns>The object</returns>
        public static T Deserialize<T>(params string[] strs)
        {
            var combinedObj = new JObject();

            var mergeSettings = new JsonMergeSettings
            {
                MergeArrayHandling = MergeArrayHandling.Union
            };

            try
            {
                foreach (var s in strs)
                {
                    combinedObj.Merge(JObject.Parse(s), mergeSettings);
                }
            }
            catch (Exception)
            {
                throw new ArgumentException("Cannot merge arguments into one");
            }

            var obj = JsonConvert.DeserializeObject<T>(combinedObj.ToString(), new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Auto,
                Binder = CompositeSerializationBinder.Instance
            });

            return obj;
        }

        /// <summary>
        /// Deserialize string into object
        /// </summary>
        /// <param name="str">Serialized string</param>
        /// <returns>The object</returns>
        public static object Deserialize(string str)
        {
            var obj = JsonConvert.DeserializeObject(str, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Objects,
                Binder = CompositeSerializationBinder.Instance
            });

            return obj;
        }

        /// <summary>
        /// Deserialize strings into object with specified type from a hash signed wrapper
        /// </summary>
        /// <param name="str">Serialized string</param>
        /// <param name="isSigned">Is signed</param>
        /// <typeparam name="T">Type of returned object</typeparam>
        /// <returns>The object</returns>
        public static T Deserialize<T>(string str, bool isSigned)
        {
            var legacyStyleSerialized = str.StartsWith("{\"" + ObjectKeyString + "\":\"");

            string obj;
            var hash = 0;

            var typeName = str.GetValue(TypeKeyString);
            if (string.IsNullOrWhiteSpace(typeName))
            {
                throw new SerializationException($"Failed to extract '{TypeKeyString}' property");
            }

            var type = TypeManager.TryGetType(typeName);

            if (type == null)
            {
                throw new SerializationException($"Failed to resolve type '{typeName}'");
            }

            if (isSigned)
            {
                if (!int.TryParse(str.GetValue(HashKeyString), out hash))
                {
                    throw new SerializationException($"Missing or invalid '{HashKeyString}' property");
                }
            }

            if (legacyStyleSerialized)
            {
                obj = str.GetValue(ObjectKeyString);
            }
            else
            {
                obj = "{" + str.Substring(1, str.LastIndexOf(TypeKeyString, StringComparison.InvariantCulture) - 3) + "}";
            }

            if (isSigned)
            {
                if (!HashSigner.ValidateSignedHash(obj, new HashValue(hash)))
                {
                    throw new SecurityException($"Serialized {typeof(T).FullName} is tampered");
                }
            }

            var methodInfo = type.GetMethod("Deserialize", BindingFlags.Public | BindingFlags.Static);
            if (methodInfo == null)
            {
                return Deserialize<T>(obj);
            }

            if (!(typeof(T).IsAssignableFrom(methodInfo.ReturnType)))
            {
                Log.LogWarning("CompositeJsonSerializer", $"The action {typeName} is missing a public static Deserialize method taking a string as parameter and returning an {typeof(T)}");

                throw new InvalidOperationException($"The token {typeName} is missing a public static Deserialize method taking a string as parameter and returning an {typeof(T)}");
            }

            return (T)methodInfo.Invoke(null, new object[] { obj });
        }

        private static string GetValue(this string str, string key)
        {
            var searchTerm = "\"" + key + "\":\"";
            var valueStartIndex = str.LastIndexOf(searchTerm, StringComparison.InvariantCulture) + searchTerm.Length;
            var valueLength = str.IndexOf("\"", valueStartIndex, StringComparison.InvariantCulture) - valueStartIndex;
            var value = str.Substring(valueStartIndex, valueLength);

            return value;
        }

        private static string GetSerializedTypeName(Type type)
        {
            return $"{type.FullName}, {type.Assembly.GetName().Name}";
        }

        private class JsonTypeConverter : JsonConverter
        {
            public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
            {
                var type = (Type)value;
                writer.WriteValue(GetSerializedTypeName(type));
            }

            public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
            {
                throw new NotImplementedException();
            }

            public override bool CanRead => false;

            public override bool CanConvert(Type objectType)
            {
                return typeof(Type).IsAssignableFrom(objectType);
            }
        }

        private class PartialJsonConvertor : JsonConverter
        {
            private readonly IEnumerable<string> _propertyNames;
            private readonly Type _type;

            public PartialJsonConvertor(IEnumerable<string> propertyNames, Type type)
            {
                _propertyNames = propertyNames;
                _type = type;
            }

            public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
            {
                var o = new JObject();

                o.AddFirst(new JProperty("$type", GetSerializedTypeName(_type)));

                var jsonSerializer = new JsonSerializer
                {
                    TypeNameAssemblyFormat = FormatterAssemblyStyle.Simple,
                    TypeNameHandling = TypeNameHandling.Objects,
                    Converters = { new JsonTypeConverter() }
                };

                foreach (var property in _propertyNames)
                {
                    o.Add(property, JToken.FromObject(GetPropValue(value, property), jsonSerializer));
                }

                o.WriteTo(writer);
            }

            private static object GetPropValue(object src, string propName)
            {
                var prop = src.GetType().GetProperty(propName);
                if (prop == null)
                {
                    throw new ArgumentException($"There is no {propName} in {src.GetType().FullName}");
                }

                return prop.GetValue(src, null);
            }

            public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
            {
                throw new NotImplementedException();
            }

            public override bool CanConvert(Type objectType)
            {
                return true;
            }
        }
    }
}
