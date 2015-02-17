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



        public static List<Type> GetRefereeTypes(Type referencedType)
        {
            Verify.ArgumentNotNull(referencedType, "referencedType");

            List<Type> refereeTypes = new List<Type>();

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
            return GetForeignKeyProperties(refereeType);
        }

        public static List<ForeignPropertyInfo> GetForeignKeyProperties(Type refereeType)
        {
            Verify.ArgumentNotNull(refereeType, "refereeType");

            IReadOnlyList<ForeignPropertyInfo> foreignKeyProperyInfos;

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                if (_foreignKeyProperties.TryGetValue(refereeType, out foreignKeyProperyInfos) == false)
                {
                    return new List<ForeignPropertyInfo>();
                }
            }

            return new List<ForeignPropertyInfo>(foreignKeyProperyInfos);
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
            
            foreach (ForeignPropertyInfo foreignKeyProperyInfo in foreignKeyProperties)
            {
                if (foreignKeyProperyInfo.SourcePropertyInfo.CanRead == false) throw new InvalidOperationException(string.Format("The property '{0}' shoud have a getter", foreignKeyProperyInfo.SourcePropertyInfo));
                if (foreignKeyProperyInfo.TargetType.IsNotReferenceable()) throw new InvalidOperationException(string.Format("The referenced type '{0}' is marked NotReferenceable and can not be referenced by the interfaceType '{1}'", foreignKeyProperyInfo.TargetType, interfaceType));

                PropertyInfo propertyInfo = foreignKeyProperyInfo.TargetType.GetDataPropertyRecursivly(foreignKeyProperyInfo.TargetKeyPropertyName);

                Verify.IsNotNull(propertyInfo, "The data type '{0}' does not contain a property named '{1}' as specified by the '{2}' attribute on the data type '{3}'", foreignKeyProperyInfo.TargetType, foreignKeyProperyInfo.TargetKeyPropertyName, typeof(ForeignKeyAttribute), foreignKeyProperyInfo.SourcePropertyInfo.DeclaringType);
                Verify.That(propertyInfo.CanRead, "The property '{0}' shoud have a getter", propertyInfo);
                if (foreignKeyProperyInfo.IsNullableString && (propertyInfo.PropertyType != typeof(string))) throw new InvalidOperationException("NullableString can only be used when the foreign key is of type string");

                Type sourcePropertyType = foreignKeyProperyInfo.SourcePropertyInfo.PropertyType;
                if (sourcePropertyType.IsGenericType &&
                    (sourcePropertyType.GetGenericTypeDefinition() == typeof(Nullable<>)))
                {
                    // Handling og Nullable<>
                    sourcePropertyType = sourcePropertyType.GetGenericArguments()[0];
                }

                if (propertyInfo.PropertyType != sourcePropertyType) throw new InvalidOperationException(string.Format("Type mismatch '{0}' and '{1}' does not match from the two properties '{2}' and '{3}'", propertyInfo.PropertyType, foreignKeyProperyInfo.SourcePropertyInfo.PropertyType, propertyInfo, foreignKeyProperyInfo.SourcePropertyInfo));
                
                foreignKeyProperyInfo.TargetKeyPropertyInfo = propertyInfo;
            }


            _foreignKeyProperties.Add(interfaceType, foreignKeyProperties);

            foreach (ForeignPropertyInfo foreignKeyProperyInfo in foreignKeyProperties)
            {
                List<Type> referees;

                if (_referencedToReferees.TryGetValue(foreignKeyProperyInfo.TargetType, out referees) == false)
                {
                    referees = new List<Type>();

                    _referencedToReferees.Add(foreignKeyProperyInfo.TargetType, referees);
                } 
                else
                {
                    if(referees.Contains(interfaceType))
                    {
                        continue;
                    }
                }

                referees.Add(interfaceType);

                if (!DataProviderRegistry.AllInterfaces.Contains(foreignKeyProperyInfo.TargetType))
                {
                    Log.LogCritical(LogTitle, string.Format("The one type '{0}' is referring the non supported data type '{1}'", interfaceType, foreignKeyProperyInfo.TargetType));
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
