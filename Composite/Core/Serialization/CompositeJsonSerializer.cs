using System;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.Serialization;
using System.Security;
using System.Text.RegularExpressions;
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
        private const string ObjectKeyString = "obj";
        private const string TypeKeyString = "meta:type";
        private const string HashKeyString = "meta:hash";

        private static readonly Regex WrappedJsonObjectRegex =
            new Regex($"{{(?\'obj\'[\\s\\S]*),\\\"{TypeKeyString}\\\":\"(?\'type\'[\\s\\S]*?)\"(?(?=,\\\"{HashKeyString}\\\":),\\\"{HashKeyString}\\\":\"(?\'hash\'[\\s\\S]*)\"|(?:))}}", RegexOptions.Compiled|RegexOptions.ExplicitCapture);

        private static readonly Regex WrappedLegacyObjectRegex =
            new Regex($"{{\\\"{ObjectKeyString}\\\":(?\'obj\'[\\s\\S]*),\\\"{TypeKeyString}\\\":\"(?\'type\'[\\s\\S]*?)\"(?(?=,\\\"{HashKeyString}\\\":),\\\"{HashKeyString}\\\":\"(?\'hash\'[\\s\\S]*)\"|(?:))}}", RegexOptions.Compiled | RegexOptions.ExplicitCapture);

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
            var type = obj.GetType();
            MethodInfo methodInfo = type.GetMethod("Serialize");
            string serializedData = "";
            if (methodInfo == null)
            {
                serializedData = Serialize(obj);
            }
            else
            {
                serializedData = (string)methodInfo.Invoke(obj, null);
            }

            var hash = hashSign ? HashSigner.GetSignedHash(serializedData).GetHashCode() : 0;

            if (IsJsonSerialized(serializedData))
            {
                return "{" + serializedData.Substring(1, serializedData.Length - 2) +
                       ",\"" + TypeKeyString + "\":\"" + type.FullName + ", " +
                       type.Assembly.GetName().Name + "\"" +
                       (hashSign ? ",\"" + HashKeyString + "\":\"" + hash + "\"}" : "}");
            }
            else
            {
                return "{\"" + ObjectKeyString + "\":\"" + serializedData +
                       "\",\"" + TypeKeyString + "\":\"" + type.FullName + ", " +
                       type.Assembly.GetName().Name + "\"" +
                       (hashSign ? ",\"" + HashKeyString + "\":\"" + hash + "\"}" : "}");
            }
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
            MatchCollection matches=null;
            bool legacyStyleSerilized = str.StartsWith("{\"" + ObjectKeyString);

            if (legacyStyleSerilized)
            {
                matches = WrappedLegacyObjectRegex.Matches(str);
            }
            else
            {
                matches = WrappedJsonObjectRegex.Matches(str);
            }

            if (matches == null || matches.Count > 1)
                throw new SerializationException($"Incorrect Serilization: {str}");
            
            Match match = matches[0];

            int hash = hashSign ? int.Parse(match.Groups["hash"].Value) : 0;
            var type = TypeManager.GetType(match.Groups["type"].Value);
            var obj = match.Groups["obj"].Value;

            if (legacyStyleSerilized)
            {
                obj = obj.Trim('"');
            }
            else
            {
                obj = "{" + obj + "}";
            }

            if (hashSign)
            {
                if (!HashSigner.ValidateSignedHash(obj, new HashValue(hash)))
                {
                    throw new SecurityException($"Serialized {typeof(T).FullName} is tampered");
                }
            }
            MethodInfo methodInfo = type.GetMethod("Deserialize", BindingFlags.Public | BindingFlags.Static);
            if (methodInfo == null)
            {
                return Deserialize<T>(obj);
            }
            return (T)methodInfo.Invoke(null, new object[] { obj });
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
