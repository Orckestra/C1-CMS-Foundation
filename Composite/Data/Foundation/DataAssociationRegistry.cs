using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using Composite.Data.ProcessControlled;
using Composite.C1Console.Events;
using Composite.Core.Linq;
using Composite.Core.Logging;
using Composite.Core.Types;
using Composite.Data.Types;


namespace Composite.Data.Foundation
{
    /// <summary>
    /// Associated type: The type that is "pointed" to by another type
    /// Association type: The type that is "pointing" to a nother type
    /// </summary>
    internal static class DataAssociationRegistry
    {
        // Associated type -> Association type
        private static Dictionary<Type, List<Type>> _associatedTypes = null;

        // Accociation type -> Associated type -> DataAssociationInfo
        // As long as only one association is allowed for a given type, this dictionary is over kill /MRJ
        private static Dictionary<Type, Dictionary<Type, DataAssociationInfo>> _dataAccociationInfoes = null;



        static DataAssociationRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static bool IsAssociationType(Type associationType)
        {
            if (associationType == null) throw new ArgumentNullException("associationType");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                return _dataAccociationInfoes.ContainsKey(associationType);
            }
        }



        public static DataAssociationType GetAssociationType(Type associationType)
        {
            if (associationType == null) throw new ArgumentNullException("associationType");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                Dictionary<Type, DataAssociationInfo> dataAssociationInfo;

                if (_dataAccociationInfoes.TryGetValue(associationType, out dataAssociationInfo) == true)
                {
                    return dataAssociationInfo.Single().Value.AssociationType;

                }
                else
                {
                    return DataAssociationType.None;
                }
            }
        }



        public static IEnumerable<string> GetForeignKeyPropertyNames(this Type associationType, DataAssociationType dataAssociationType)
        {
            if (associationType == null) throw new ArgumentNullException("associationType");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                Dictionary<Type, DataAssociationInfo> dataAssociationInfos;

                if (_dataAccociationInfoes.TryGetValue(associationType, out dataAssociationInfos) == true)
                {
                    IEnumerable<string> result =
                        from info in dataAssociationInfos.Values
                        where info.AssociationType == dataAssociationType
                        select info.ForeignKeyPropertyName;

                    foreach (string name in result)
                    {
                        yield return name;
                    }
                }
                else
                {
                    yield break;
                }
            }
        }



        public static List<Type> GetAssociationTypes(Type associatedType, DataAssociationType dataAssociationType)
        {
            if (associatedType == null) throw new ArgumentNullException("associatedType");
            if (dataAssociationType == DataAssociationType.None) throw new ArgumentException(string.Format("dataAssociationType may not be '{0}", DataAssociationType.None));

            List<Type> associationTypes;

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                if (_associatedTypes.TryGetValue(associatedType, out associationTypes) == false)
                {
                    return new List<Type>();
                }


                return
                    (from t1 in associationTypes
                     from info in _dataAccociationInfoes[t1].Values
                     where info.AssociationType == dataAssociationType
                     select t1).ToList();
            }
        }



        public static List<Type> GetAssociatedTypes(Type associationType, DataAssociationType dataAssociationType)
        {
            if (associationType == null) throw new ArgumentNullException("associationType");
            if (dataAssociationType == DataAssociationType.None) throw new ArgumentException(string.Format("dataAssociationType may not be '{0}", DataAssociationType.None));

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                Dictionary<Type, DataAssociationInfo> dataAssociationInfos;

                if (_dataAccociationInfoes.TryGetValue(associationType, out dataAssociationInfos) == false)
                {
                    throw new InvalidOperationException(string.Format("Type type '{0}' is not an association type", associationType));
                }

                return
                    (from info in dataAssociationInfos
                     where info.Value.AssociationType == dataAssociationType
                     select info.Key).ToList();
            }
        }



        public static string GetForeignKeyPropertyName(Type associatedType, Type associationType)
        {
            if (associatedType == null) throw new ArgumentNullException("associatedType");
            if (associationType == null) throw new ArgumentNullException("associationType");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                Dictionary<Type, DataAssociationInfo> dataAssociationInfos;

                if (_dataAccociationInfoes.TryGetValue(associationType, out dataAssociationInfos) == false) throw new ArgumentException(string.Format("The type '{0}' is not associated to any types", associationType));

                DataAssociationInfo dataAssociationInfo;
                if (dataAssociationInfos.TryGetValue(associatedType, out dataAssociationInfo) == false) throw new ArgumentException(string.Format("The type '{0}' is not associated to the type '{1}'", associationType, associatedType));

                return dataAssociationInfo.ForeignKeyPropertyName;
            }
        }



        public static PropertyInfo GetForeignKeyPropertyInfo(Type associatedType, Type associationType)
        {
            if (associatedType == null) throw new ArgumentNullException("associatedType");
            if (associationType == null) throw new ArgumentNullException("associationType");

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                Dictionary<Type, DataAssociationInfo> dataAssociationInfos;

                if (_dataAccociationInfoes.TryGetValue(associationType, out dataAssociationInfos) == false) throw new ArgumentException(string.Format("The type '{0}' is not associated to any types", associationType));

                DataAssociationInfo dataAssociationInfo;
                if (dataAssociationInfos.TryGetValue(associatedType, out dataAssociationInfo) == false) throw new ArgumentException(string.Format("The type '{0}' is not associated to the type '{1}'", associationType, associatedType));

                return dataAssociationInfo.ForeignKeyPropertyInfo;
            }
        }



        internal static void Initialize_PostDynamic()
        {
            if (RuntimeInformation.IsDebugBuild == true)
            {
                GlobalInitializerFacade.ValidateIsOnlyCalledFromGlobalInitializerFacade(new StackTrace());
            }

            _associatedTypes = new Dictionary<Type, List<Type>>();
            _dataAccociationInfoes = new Dictionary<Type, Dictionary<Type, DataAssociationInfo>>();

            foreach (Type type in DataProviderRegistry.AllInterfaces)
            {
                AddNewType(type);
            }
        }



        private static void AddNewType(Type interfaceType)
        {
            List<DataAssociationAttribute> attributes = interfaceType.GetCustomAttributesRecursively<DataAssociationAttribute>().ToList();

            if (attributes.Count > 0)
            {
                Dictionary<Type, DataAssociationInfo> dataAssociationInfos = new Dictionary<Type, DataAssociationInfo>();

                foreach (DataAssociationAttribute attribute in attributes)
                {
                    if (attribute.AssociationType == DataAssociationType.None) throw new ArgumentException(string.Format("The associationType on the attribute '{0}' on the interface type '{1}' may not be '{2}'", typeof(DataAssociationAttribute), interfaceType, DataAssociationType.None));
                    if (attribute.AssociatedInterfaceType == null) throw new ArgumentNullException(string.Format("The associatedInterfaceType on the attribute '{0}' on the interface type '{1}' is null", typeof(DataAssociationAttribute), interfaceType));

                    List<Type> associatedTypes;

                    if (_associatedTypes.TryGetValue(attribute.AssociatedInterfaceType, out associatedTypes) == false)
                    {
                        associatedTypes = new List<Type>();

                        _associatedTypes.Add(attribute.AssociatedInterfaceType, associatedTypes);

                        DataEventSystemFacade.SubscribeToDataAfterUpdate(attribute.AssociatedInterfaceType, OnAfterDataUpdated);
                    }

                    associatedTypes.Add(interfaceType);


                    PropertyInfo propertyInfo =
                        (from pi in interfaceType.GetAllProperties()
                         where pi.Name == attribute.ForeignKeyPropertyName
                         select pi).FirstOrDefault();

                    if (propertyInfo == null) throw new ArgumentException(string.Format("The foreign key property name '{0}' set on the attribute '{1}' does not exist on the interface '{2}'", attribute.ForeignKeyPropertyName, typeof(DataAssociationAttribute), interfaceType));

                    DataAssociationInfo dataAssociationInfo = new DataAssociationInfo
                        {
                            AssociatedInterfaceType = attribute.AssociatedInterfaceType,
                            ForeignKeyPropertyName = attribute.ForeignKeyPropertyName,
                            ForeignKeyPropertyInfo = propertyInfo,
                            AssociationType = attribute.AssociationType,
                        };

                    dataAssociationInfos.Add(dataAssociationInfo.AssociatedInterfaceType, dataAssociationInfo);

                    if (DataProviderRegistry.AllInterfaces.Contains(attribute.AssociatedInterfaceType) == true)
                    {
                        LoggingService.LogVerbose("DataReferenceRegistry", string.Format("The data type '{0}' is associated to the data type '{1}'", interfaceType, attribute.AssociatedInterfaceType));
                    }
                    else
                    {
                        LoggingService.LogCritical("DataReferenceRegistry", string.Format("The one type '{0}' is associated to the non supported data type '{1}'", interfaceType, attribute.AssociatedInterfaceType));
                    }
                }

                _dataAccociationInfoes.Add(interfaceType, dataAssociationInfos);
            }
        }



        private static void OnAfterDataUpdated(object sender, DataEventArgs dataEventArgs)
        {
            IPublishControlled publishControlled = dataEventArgs.Data as IPublishControlled;
            if (publishControlled == null) return;

            IPage page = dataEventArgs.Data as IPage;

            if (page == null) return;

            var metaDataToBeUpdated = page.GetMetaData().Evaluate();

            foreach (IData data in metaDataToBeUpdated)
            {
                IPublishControlled pc = data as IPublishControlled;

                if (pc.PublicationStatus != publishControlled.PublicationStatus)
                {
                    pc.PublicationStatus = publishControlled.PublicationStatus;

                    // THIS UPDATE WAS ALWAYS EXECUTED - OUTSIDE THE versionControlled CHECK - WAS THIS NEEDED?
                    DataFacade.Update(data, false, false, false);
                }
            }
        }



        private static void Flush()
        {
            _associatedTypes = null;
            _dataAccociationInfoes = null;
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private sealed class DataAssociationInfo
        {
            public Type AssociatedInterfaceType { get; set; }
            public string ForeignKeyPropertyName { get; set; }
            public PropertyInfo ForeignKeyPropertyInfo { get; set; }

            public DataAssociationType AssociationType { get; set; }
        }
    }
}
