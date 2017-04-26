using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Events;
using Composite.Core;



namespace Composite.Data.Foundation
{
    internal static class DataReferenceRegistry
    {
        private static readonly string LogTitle = "DataReferenceRegistry";

        private static Dictionary<Type, List<Type>> _referencedToReferees = new Dictionary<Type, List<Type>>();
        private static Dictionary<Type, IReadOnlyList<ForeignPropertyInfo>> _foreignKeyProperties = new Dictionary<Type, IReadOnlyList<ForeignPropertyInfo>>();



        static DataReferenceRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }



        public static IReadOnlyCollection<Type> GetRefereeTypes(Type referencedType)
        {
            Verify.ArgumentNotNull(referencedType, "referencedType");

            List<Type> refereeTypes = new List<Type>();

            // TODO: rewrite using concurrent dictionaries
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                foreach (var key in _referencedToReferees.Keys)
                {
                    if (referencedType.IsAssignableFrom(key))
                    {
                        _referencedToReferees[key].ForEach(refereeTypes.Add);
                    }
                }
            }

            return refereeTypes;
        }

        [Obsolete("Use 'GetForeignKeyProperties' instead")]
        public static List<ForeignPropertyInfo> GetForeignKeyPropertyInfos(Type refereeType)
        {
            return GetForeignKeyProperties(refereeType).ToList();
        }

        public static IReadOnlyCollection<ForeignPropertyInfo> GetForeignKeyProperties(Type refereeType)
        {
            Verify.ArgumentNotNull(refereeType, "refereeType");

            IReadOnlyList<ForeignPropertyInfo> foreignKeyProperties;

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                if (!_foreignKeyProperties.TryGetValue(refereeType, out foreignKeyProperties))
                {
                    return Array.Empty<ForeignPropertyInfo>();
                }
            }

            return foreignKeyProperties;
        }



        internal static void Initialize_PostDataTypes()
        {
            if (RuntimeInformation.IsDebugBuild)
            {
                GlobalInitializerFacade.ValidateIsOnlyCalledFromGlobalInitializerFacade(new StackTrace());
            }

            _referencedToReferees = new Dictionary<Type, List<Type>>();
            _foreignKeyProperties = new Dictionary<Type, IReadOnlyList<ForeignPropertyInfo>>();

            foreach (Type type in DataProviderRegistry.AllInterfaces)
            {
                AddNewType(type);
            }
        }



        private static void AddNewType(Type interfaceType)
        {
            var foreignKeyProperties = DataAttributeFacade.GetDataReferenceProperties(interfaceType);
            
            foreach (ForeignPropertyInfo foreignKeyPropertyInfo in foreignKeyProperties)
            {
                if (!foreignKeyPropertyInfo.SourcePropertyInfo.CanRead) throw new InvalidOperationException(
                    $"The property '{foreignKeyPropertyInfo.SourcePropertyInfo}' shoud have a getter");
                if (foreignKeyPropertyInfo.TargetType.IsNotReferenceable()) throw new InvalidOperationException(
                    $"The referenced type '{foreignKeyPropertyInfo.TargetType}' is marked NotReferenceable and can not be referenced by the interfaceType '{interfaceType}'");

                PropertyInfo propertyInfo = foreignKeyPropertyInfo.TargetType.GetDataPropertyRecursively(foreignKeyPropertyInfo.TargetKeyPropertyName);

                Verify.IsNotNull(propertyInfo, "The data type '{0}' does not contain a property named '{1}' as specified by the '{2}' attribute on the data type '{3}'", foreignKeyPropertyInfo.TargetType, foreignKeyPropertyInfo.TargetKeyPropertyName, typeof(ForeignKeyAttribute), foreignKeyPropertyInfo.SourcePropertyInfo.DeclaringType);
                Verify.That(propertyInfo.CanRead, "The property '{0}' should have a getter", propertyInfo);
                if (foreignKeyPropertyInfo.IsNullableString && (propertyInfo.PropertyType != typeof(string))) throw new InvalidOperationException("NullableString can only be used when the foreign key is of type string");

                Type sourcePropertyType = foreignKeyPropertyInfo.SourcePropertyInfo.PropertyType;
                if (sourcePropertyType.IsGenericType &&
                    (sourcePropertyType.GetGenericTypeDefinition() == typeof(Nullable<>)))
                {
                    // Handling og Nullable<>
                    sourcePropertyType = sourcePropertyType.GetGenericArguments()[0];
                }

                if (propertyInfo.PropertyType != sourcePropertyType) throw new InvalidOperationException(
                    $"Type mismatch '{propertyInfo.PropertyType}' and '{foreignKeyPropertyInfo.SourcePropertyInfo.PropertyType}' does not match from the two properties '{propertyInfo}' and '{foreignKeyPropertyInfo.SourcePropertyInfo}'");
                
                foreignKeyPropertyInfo.TargetKeyPropertyInfo = propertyInfo;
            }


            _foreignKeyProperties.Add(interfaceType, foreignKeyProperties);

            foreach (ForeignPropertyInfo foreignKeyPropertyInfo in foreignKeyProperties)
            {
                List<Type> referees;

                if (!_referencedToReferees.TryGetValue(foreignKeyPropertyInfo.TargetType, out referees))
                {
                    referees = new List<Type>();

                    _referencedToReferees.Add(foreignKeyPropertyInfo.TargetType, referees);
                } 
                else
                {
                    if(referees.Contains(interfaceType))
                    {
                        continue;
                    }
                }

                referees.Add(interfaceType);

                if (!DataProviderRegistry.AllInterfaces.Contains(foreignKeyPropertyInfo.TargetType))
                {
                    Log.LogCritical(LogTitle, $"The one type '{interfaceType}' is referring the non supported data type '{foreignKeyPropertyInfo.TargetType}'");
                }
            }
        }



        private static void Flush()
        {
            _referencedToReferees = new Dictionary<Type, List<Type>>();
            _foreignKeyProperties = new Dictionary<Type, IReadOnlyList<ForeignPropertyInfo>>();
        }
    }
}
