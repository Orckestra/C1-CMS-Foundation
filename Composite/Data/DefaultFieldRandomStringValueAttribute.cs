using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.C1Console.Events;
using Composite.Core.Linq;
using Composite.Core.Types;
using Composite.Core.WebClient;
using Composite.Data.DynamicTypes;

namespace Composite.Data
{
    /// <summary>
    /// Sets the field's value to a random base64 string value of the specified length.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class DefaultFieldRandomStringValueAttribute : DefaultFieldValueAttribute
    {
        private static readonly ConcurrentDictionary<Type, IEnumerable<RandomStringValueProperty>> ReflectionCache =
            new ConcurrentDictionary<Type, IEnumerable<RandomStringValueProperty>>();

        internal int Length { get; private set; }
        internal bool CheckCollisions { get; private set; }

        private class RandomStringValueProperty
        {
            public PropertyInfo Property;
            public DefaultFieldRandomStringValueAttribute Attribute;
            public bool IsKey;
        }

        /// <summary>
        /// Sets the field's value to a random base64 string value of the specified length.
        /// </summary>
        /// <param name="length">The length of a generated random string. Allowed range is [3..22].</param>
        /// <param name="checkCollisions">When set to 2, the inserted value will be checked for a collision.</param>
        public DefaultFieldRandomStringValueAttribute(int length = 8, bool checkCollisions = false)
        {
            Verify.ArgumentCondition(length >= 3, "length", "Minimum allowed length is 3 characters");
            Verify.ArgumentCondition(length <= 22, "length", "Maximum allowed length is 22 characters, which is an equivalent to a Guid value");

            Length = length;
            CheckCollisions = checkCollisions;
        }

        static DefaultFieldRandomStringValueAttribute()
        {
            DataEvents<IData>.OnNew += (sender, arguments) => SetRandomStringFieldValues(arguments.Data, false);
            DataEvents<IData>.OnBeforeAdd += (sender, arguments) => SetRandomStringFieldValues(arguments.Data, true);
            GlobalEventSystemFacade.SubscribeToFlushEvent(a => ReflectionCache.Clear());
        }

        private static void SetRandomStringFieldValues(IData data, bool checkCollisions)
        {
            var interfaceType = data.DataSourceId.InterfaceType;

            var fieldsToFill = GetRandomStringProperties(interfaceType);

            foreach (var field in fieldsToFill)
            {
                var value = field.Property.GetValue(data, null);
                if (value != null
                    && (!(checkCollisions && field.Attribute.CheckCollisions)
                        || !ValueIsInUse(interfaceType, field.Property, (string)value, field.IsKey))) continue;

                string randomString = GenerateNewUniqueValue(interfaceType, field);

                field.Property.SetValue(data, randomString);
            }
        }

        private static string GenerateNewUniqueValue(Type interfaceType, RandomStringValueProperty field)
        {
            string randomString = GenerateRandomString(field.Attribute.Length);

            if (field.Attribute.CheckCollisions)
            {
                bool uniqueValueFound = false;

                const int tries = 2;
                for (int i = 0; i < tries; i++)
                {
                    if (!ValueIsInUse(interfaceType, field.Property, randomString, field.IsKey))
                    {
                        uniqueValueFound = true;
                        break;
                    }

                    randomString = GenerateRandomString(field.Attribute.Length);
                }

                if (!uniqueValueFound)
                {
                    Verify.That(uniqueValueFound, "Failed to generate a unique random string value after {0} tries. Field name: {1}, random value length: {2}",
                        tries, field.Property.Name, field.Attribute.Length);
                }
            }

            return randomString;
        }

        private static bool ValueIsInUse(Type interfaceType, PropertyInfo property, string value, bool isKeyField)
        {
            if (isKeyField)
            {
                var keyCollection = new DataKeyPropertyCollection();
                keyCollection.AddKeyProperty(property, value);

                return DataFacade.TryGetDataByUniqueKey(interfaceType, keyCollection) != null;
            }

            var parameter = Expression.Parameter(interfaceType, "data");
            var predicateExpression = ExpressionHelper.CreatePropertyPredicate(parameter, new[]
            {
                new Tuple<PropertyInfo, object>(property, value)
            });

            Type delegateType = typeof(Func<,>).MakeGenericType(new [] { interfaceType, typeof(bool) });

            LambdaExpression lambdaExpression = Expression.Lambda(delegateType, predicateExpression, new [] { parameter });

            MethodInfo methodInfo = DataFacade.GetGetDataWithPredicatMethodInfo(interfaceType);

            var queryable = (IQueryable)methodInfo.Invoke(null, new object[] { lambdaExpression });

            return queryable.OfType<IData>().Any();
        }

        private static string GenerateRandomString(int length)
        {
            return UrlUtils.CompressGuid(Guid.NewGuid()).Substring(0, length);
        }

        private static IEnumerable<RandomStringValueProperty> GetRandomStringProperties(Type interfaceType)
        {
            return ReflectionCache.GetOrAdd(interfaceType, type =>
            {
                List<RandomStringValueProperty> result = null;

                var stringProperties = type.GetPropertiesRecursively().Where(property => property.PropertyType == typeof(string));
                foreach (var property in stringProperties)
                {
                    var attribute = property.GetCustomAttribute<DefaultFieldRandomStringValueAttribute>(true);
                    if (attribute == null) continue;

                    result = result ?? new List<RandomStringValueProperty>();

                    var keyPropertyNames = type.GetKeyPropertyNames();

                    bool isKey = keyPropertyNames.Count == 1 && keyPropertyNames[0] == property.Name;

                    result.Add(new RandomStringValueProperty { Attribute = attribute, Property = property, IsKey = isKey});
                }

                return result ?? Enumerable.Empty<RandomStringValueProperty>();
            });
        }

        /// <exclude />
        public override DefaultValue GetDefaultValue()
        {
            return DefaultValue.RandomString(Length, CheckCollisions);
        }
    }
}
