using System;
using System.Collections.Generic;
using System.Reflection;
using System.Security;
using Composite.C1Console.Security;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Composite.Core.Serialization
{
    /// <summary>
    /// Use this class to serialize and deserialize objects with json serializer
    /// </summary>
    public static class CompositeJsonSerializer
    {
        /// <summary>
        /// Check if string is serilized with JsonSerializer
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static bool IsJsonSerialized(string str)
        {
            if (str.StartsWith("{"))
                return true;
            return false;
        }

        /// <summary>
        /// Serialize with automatic type name handling
        /// </summary>
        /// <param name="obj">Object to serialize</param>
        /// <returns>seialized string</returns>
        public static string Serialize(object obj)
        {
            var serializedData = JsonConvert.SerializeObject(obj, new JsonSerializerSettings
            {
                TypeNameAssemblyFormat = System.Runtime.Serialization.Formatters.FormatterAssemblyStyle.Simple,
                TypeNameHandling = TypeNameHandling.Auto,
                Converters = {new JsonTypeConverter()}
            });

            return serializedData;
        }

        /// <summary>
        /// Serialize with json object structure type name handling
        /// </summary>
        /// <param name="obj">Object to serialize</param>
        /// <returns>seialized string</returns>
        public static string SerializeObject(object obj)
        {
            var serializedData = JsonConvert.SerializeObject(obj, new JsonSerializerSettings
            {
                TypeNameAssemblyFormat = System.Runtime.Serialization.Formatters.FormatterAssemblyStyle.Simple,
                TypeNameHandling = TypeNameHandling.Objects,
                Formatting = Formatting.None,
                Converters = {new JsonTypeConverter()}
            });

            return serializedData;
        }

        /// <summary>
        /// Serialize only the property names that is specified
        /// </summary>
        /// <param name="obj">Object to serialize</param>
        /// <param name="propertyNames">List of properties to be serialized</param>
        /// <returns>seialized string</returns>
        public static string SerializePartial(object obj, IEnumerable<string> propertyNames)
        {
            var serializedData =
                JsonConvert.SerializeObject(obj, new PartialJsonConvertor(propertyNames, obj.GetType()));

            return serializedData;
        }

        /// <summary>
        /// Serialize with a wrapper containing the serialized object, its hash sign and its type
        /// </summary>
        /// <param name="obj">Object to serialize</param>
        /// <param name="hashSign">To calculate the hash sign</param>
        /// <returns>seialized string</returns>
        public static string Serialize(object obj, bool hashSign)
        {
            var serializedData = JsonConvert.SerializeObject(new ObjectWrapperWithHash(obj, hashSign),
                new JsonSerializerSettings
                {
                    Converters = { new JsonTypeConverter() }
                });

            return serializedData;
        }

        /// <summary>
        /// Deserialize string into object with specified type
        /// </summary>
        /// <param name="str">Serilaized string</param>
        /// <typeparam name="T">Type of returned object</typeparam>
        /// <returns>The object</returns>
        public static T Deserialize<T>(string str)
        {
            var obj = JsonConvert.DeserializeObject<T>(str, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Auto
            });
            return obj;
        }

        /// <summary>
        /// Deserialize strings into object with specified type by merging them together
        /// </summary>
        /// <param name="strs">Serilaized string</param>
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
                TypeNameHandling = TypeNameHandling.Auto
            });
            return obj;
        }

        /// <summary>
        /// Deserialize string into object
        /// </summary>
        /// <param name="str">Serilaized string</param>
        /// <returns>The object</returns>
        public static object Deserialize(string str)
        {
            var obj = JsonConvert.DeserializeObject(str, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Objects
            });
            return obj;
        }

        /// <summary>
        /// Deserialize strings into object with specified type from a hash signed wrapper
        /// </summary>
        /// <param name="str">Serilaized string</param>
        /// <param name="hashSign">Is signed</param>
        /// <typeparam name="T">Type of returned object</typeparam>
        /// <returns>The object</returns>
        public static T Deserialize<T>(string str, bool hashSign)
        {
            var obj = JsonConvert.DeserializeObject<ObjectWrapperWithHash>(str, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Auto
            });
            return obj.Getbject<T>(hashSign);
        }

        private class ObjectWrapperWithHash
        {
            private readonly bool _hashsign;

            internal T Getbject<T>(bool checkHash)
            {
                if (checkHash)
                {
                    if (!HashSigner.ValidateSignedHash(TheObject, new HashValue(HashValue)))
                    {
                        throw new SecurityException($"Serialized {typeof(T).FullName} is tampered");
                    }
                }
                MethodInfo methodInfo = Type.GetMethod("Deserialize", BindingFlags.Public | BindingFlags.Static);
                if (methodInfo == null)
                {
                    return Deserialize<T>(TheObject);
                }
                return (T) methodInfo.Invoke(null, new object[] { TheObject });
            }

            [JsonProperty(PropertyName = "hash")]
            private int HashValue { get; }

            public bool ShouldSerializeHashValue()
            {
                return _hashsign;
            }

            [JsonProperty(PropertyName = "obj")]
            private string TheObject { get; }

            [JsonProperty(PropertyName = "type")]
            private Type Type { get; }

            internal ObjectWrapperWithHash(object obj, bool hashSign)
            {
                Type = obj.GetType();
                MethodInfo methodInfo = Type.GetMethod("Serialize");

                if (methodInfo == null)
                {
                    TheObject = Serialize(obj);
                }
                else
                {
                    TheObject = (string)methodInfo.Invoke(obj, null);
                }
                _hashsign = hashSign;
                HashValue = hashSign ? HashSigner.GetSignedHash(TheObject).GetHashCode() : 0;
            }

            [JsonConstructor]
            private ObjectWrapperWithHash(string theObject, int hashValue, Type type)
            {
                TheObject = theObject;
                HashValue = hashValue;
                Type = type;
            }

        }

        private class JsonTypeConverter : JsonConverter
        {
            public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
            {
                if (value is Type)
                {
                    var type = (Type) value;
                    writer.WriteValue(type.FullName + ", " + type.Assembly.GetName().Name);
                }
                else
                {
                    var t = JToken.FromObject(value);
                    t.WriteTo(writer);
                }
            }

            public override object ReadJson(JsonReader reader, Type objectType, object existingValue,
                JsonSerializer serializer)
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
                o.AddFirst(new JProperty("$type", _type.FullName + ", " + _type.Assembly.GetName().Name));
                if (_propertyNames == null) return;

                var jsonSerializer = new JsonSerializer()
                {
                    TypeNameAssemblyFormat = System.Runtime.Serialization.Formatters.FormatterAssemblyStyle.Simple,
                    TypeNameHandling = TypeNameHandling.Objects,
                    Converters = {new JsonTypeConverter()}
                };

                foreach (var property in _propertyNames)
                {
                    o.Add(property, JToken.FromObject(GetPropValue(value, property), jsonSerializer));
                }

                o.WriteTo(writer);
            }

            private static object GetPropValue(object src, string propName)
            {
                var pinf = src.GetType().GetProperty(propName);
                if (pinf == null)
                {
                    throw new ArgumentException($"There is no {propName} in {src.GetType().FullName}");
                }
                return pinf.GetValue(src, null);

            }

            public override object ReadJson(JsonReader reader, Type objectType, object existingValue,
                JsonSerializer serializer)
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
