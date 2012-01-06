using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Events;
using Composite.Core.Logging;



namespace Composite.Data.Foundation
{
    internal static class DataReferenceRegistry
    {
        private static Dictionary<Type, List<Type>> _referencedToReferees = new Dictionary<Type, List<Type>>();
        private static Dictionary<Type, List<ForeignPropertyInfo>> _foreignKeyProperyInfos = new Dictionary<Type, List<ForeignPropertyInfo>>();



        static DataReferenceRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static List<Type> GetRefereeTypes(Type referencedType)
        {
            if (referencedType == null) throw new ArgumentNullException("referencedType");

            List<Type> refereeTypes;

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                if (_referencedToReferees.TryGetValue(referencedType, out refereeTypes) == false)
                {
                    return new List<Type>();
                }
            }

            return refereeTypes;
        }



        public static List<ForeignPropertyInfo> GetForeignKeyPropertyInfos(Type refereeType)
        {
            if (refereeType == null) throw new ArgumentNullException("refereeType");

            List<ForeignPropertyInfo> foreignKeyProperyInfos;

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                if (_foreignKeyProperyInfos.TryGetValue(refereeType, out foreignKeyProperyInfos) == false)
                {
                    return new List<ForeignPropertyInfo>();
                }
            }

            return foreignKeyProperyInfos;
        }



        internal static void Initialize_PostDataTypes()
        {
            if (RuntimeInformation.IsDebugBuild == true)
            {
                GlobalInitializerFacade.ValidateIsOnlyCalledFromGlobalInitializerFacade(new StackTrace());
            }

            _referencedToReferees = new Dictionary<Type, List<Type>>();
            _foreignKeyProperyInfos = new Dictionary<Type, List<ForeignPropertyInfo>>();

            foreach (Type type in DataProviderRegistry.AllInterfaces)
            {
                AddNewType(type);
            }
        }



        private static void AddNewType(Type interfaceType)
        {
            List<ForeignPropertyInfo> foreignKeyProperyInfos = DataAttributeFacade.GetDataReferencePropertyInfoes(interfaceType);


            foreach (ForeignPropertyInfo foreignKeyProperyInfo in foreignKeyProperyInfos)
            {
                if (foreignKeyProperyInfo.SourcePropertyInfo.CanRead == false) throw new InvalidOperationException(string.Format("The property '{0}' shoud have a getter", foreignKeyProperyInfo.SourcePropertyInfo));
                if (foreignKeyProperyInfo.TargetType.IsNotReferenceable() == true) throw new InvalidOperationException(string.Format("The referenced type '{0}' is marked NotReferenceable and can not be referenced by the interfaceType '{1}'", foreignKeyProperyInfo.TargetType, interfaceType));

                PropertyInfo propertyInfo = foreignKeyProperyInfo.TargetType.GetDataPropertyRecursivly(foreignKeyProperyInfo.TargetKeyPropertyName);

                if (propertyInfo == null) throw new InvalidOperationException(string.Format("The data type '{0}' does not contain a property named '{1}' as specified by the '{2}' attribute on the data type '{3}'", foreignKeyProperyInfo.TargetType, foreignKeyProperyInfo.TargetKeyPropertyName, typeof(ForeignKeyAttribute), foreignKeyProperyInfo.SourcePropertyInfo.DeclaringType));
                if (propertyInfo.CanRead == false) throw new InvalidOperationException(string.Format("The property '{0}' shoud have a getter", propertyInfo));
                if ((foreignKeyProperyInfo.IsNullableString == true) && (propertyInfo.PropertyType != typeof(string))) throw new InvalidOperationException(string.Format("NullableString can only be used when the foriegn key is of type string"));

                Type sourcePropertyType = foreignKeyProperyInfo.SourcePropertyInfo.PropertyType;
                if ((sourcePropertyType.IsGenericType == true) &&
                    (sourcePropertyType.GetGenericTypeDefinition() == typeof(Nullable<>)))
                {
                    // Handling og Nullable<>
                    sourcePropertyType = sourcePropertyType.GetGenericArguments()[0];
                }

                if (propertyInfo.PropertyType != sourcePropertyType) throw new InvalidOperationException(string.Format("Type mismatch '{0}' and '{1}' does not match from the two properties '{2}' and '{3}'", propertyInfo.PropertyType, foreignKeyProperyInfo.SourcePropertyInfo.PropertyType, propertyInfo, foreignKeyProperyInfo.SourcePropertyInfo));
                
                foreignKeyProperyInfo.TargetKeyPropertyInfo = propertyInfo;
            }


            _foreignKeyProperyInfos.Add(interfaceType, foreignKeyProperyInfos);

            foreach (ForeignPropertyInfo foreignKeyProperyInfo in foreignKeyProperyInfos)
            {
                List<Type> referees;

                if (_referencedToReferees.TryGetValue(foreignKeyProperyInfo.TargetType, out referees) == false)
                {
                    referees = new List<Type>();

                    _referencedToReferees.Add(foreignKeyProperyInfo.TargetType, referees);
                } else
                {
                    if(referees.Contains(interfaceType))
                    {
                        continue;
                    }
                }

                referees.Add(interfaceType);

                if (DataProviderRegistry.AllInterfaces.Contains(foreignKeyProperyInfo.TargetType) == true)
                {
                    LoggingService.LogVerbose("DataReferenceRegistry", string.Format("The data type '{0}' is referring the data type '{1}'", interfaceType, foreignKeyProperyInfo.TargetType));
                }
                else
                {
                    LoggingService.LogCritical("DataReferenceRegistry", string.Format("The one type '{0}' is referring the non supported data type '{1}'", interfaceType, foreignKeyProperyInfo.TargetType));
                }
            }
        }



        private static void Flush()
        {
            _referencedToReferees = new Dictionary<Type, List<Type>>();
            _foreignKeyProperyInfos = new Dictionary<Type, List<ForeignPropertyInfo>>();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
    }
}
