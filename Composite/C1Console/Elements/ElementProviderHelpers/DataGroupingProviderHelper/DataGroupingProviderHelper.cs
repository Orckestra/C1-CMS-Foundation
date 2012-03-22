using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.C1Console.Security;
using Composite.Core.Types;
using Composite.C1Console.Users;


namespace Composite.C1Console.Elements.ElementProviderHelpers.DataGroupingProviderHelper
{
    internal sealed class DataGroupingProviderHelper : IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _elementProviderContext;
        private string _undefinedLableValue;

        private static readonly MethodInfo GenericCastMethodInfo = typeof(DataGroupingProviderHelper)
                                                                   .GetMethod("Cast", BindingFlags.NonPublic | BindingFlags.Static);


        public DataGroupingProviderHelper(ElementProviderContext elementProviderContext)
        {
            _elementProviderContext = elementProviderContext;
            _undefinedLableValue = StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "UndefinedLabelTemplate");

            this.FolderOpenIcon = GetIconHandle("datagroupinghelper-folder-open");
            this.FolderClosedIcon = GetIconHandle("datagroupinghelper-folder-closed");

            this.OnCreateLeafElement = d => new Element(_elementProviderContext.CreateElementHandle(d.GetDataEntityToken()));
            this.OnGetDataScopeIdentifier = t => DataScopeIdentifier.Administrated;
            this.OnAddActions = (e, p) => e;

            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataEntityToken>(this);
            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataGroupingProviderHelperEntityToken>(this);
        }


        public ResourceHandle FolderOpenIcon { get; set; }
        public ResourceHandle FolderClosedIcon { get; set; }

        public Func<IData, Element> OnCreateLeafElement { get; set; }
        public Func<IData, Element> OnCreateGhostedLeafElement { get; set; }
        public Func<IData, Element> OnCreateDisabledLeafElement { get; set; }
        public Func<Type, DataScopeIdentifier> OnGetDataScopeIdentifier { get; set; }
        public Func<Type, bool> OnOwnsType { get; set; }
        public Func<Type, EntityToken, EntityToken> OnGetRootParentEntityToken { get; set; }
        public Func<Element, PropertyInfoValueCollection, Element> OnAddActions { get; set; }
        public Func<EntityToken, Func<IData, bool>> OnGetLeafsFilter { get; set; } 
        public Func<EntityToken, string> OnGetPayload { get; set; }

        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            var result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                DataGroupingProviderHelperEntityToken groupingEntityToken = entityToken as DataGroupingProviderHelperEntityToken;
                if (groupingEntityToken != null)
                {
                    Type type = TypeManager.TryGetType(groupingEntityToken.Type);

                    if (groupingEntityToken.GroupingValues.Count == 1)
                    {
                        EntityToken parentEntityToken = OnGetRootParentEntityToken(type, entityToken);
                        if(parentEntityToken != null)
                        {
                            result.Add(entityToken, new EntityToken[] { parentEntityToken });
                        }

                        continue;
                    }

                    DataGroupingProviderHelperEntityToken newGroupingParentEntityToken = new DataGroupingProviderHelperEntityToken(groupingEntityToken.Type);
                    newGroupingParentEntityToken.Payload = this.OnGetPayload(groupingEntityToken);
                    newGroupingParentEntityToken.GroupingValues = new Dictionary<string, object>();
                    foreach (var kvp in groupingEntityToken.GroupingValues.Take(groupingEntityToken.GroupingValues.Count - 1))
                    {
                        newGroupingParentEntityToken.GroupingValues.Add(kvp.Key, kvp.Value);
                    }

                    result.Add(entityToken, new EntityToken[] { newGroupingParentEntityToken });
                    continue;
                }


                DataEntityToken dataEntityToken = entityToken as DataEntityToken;
                if (dataEntityToken != null)
                {
                    Type interfaceType = dataEntityToken.InterfaceType;
                    if (OnOwnsType(interfaceType) == false) continue;

                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);

                    IEnumerable<DataFieldDescriptor> groupingDataFieldDescriptors =
                        from dfd in dataTypeDescriptor.Fields
                        where dfd.GroupByPriority != 0
                        orderby dfd.GroupByPriority
                        select dfd;

                    if (groupingDataFieldDescriptors.Count() == 0)
                    {
                        EntityToken parentEntityToken = OnGetRootParentEntityToken(interfaceType, dataEntityToken);
                        result.Add(entityToken, new EntityToken[] { parentEntityToken });
                        continue;
                    }

                    IData data = dataEntityToken.Data;

                    DataGroupingProviderHelperEntityToken parentToken = new DataGroupingProviderHelperEntityToken(dataEntityToken.Type);
                    parentToken.Payload = this.OnGetPayload(dataEntityToken);
                    parentToken.GroupingValues = new Dictionary<string, object>();
                    foreach (DataFieldDescriptor dfd in groupingDataFieldDescriptors)
                    {
                        PropertyInfo propertyInfo = interfaceType.GetPropertiesRecursively().Where(f => f.Name == dfd.Name).Single();

                        object value = propertyInfo.GetValue(data, null);
                        parentToken.GroupingValues.Add(propertyInfo.Name, value);
                    }

                    result.Add(entityToken, new EntityToken[] { parentToken });
                    continue;
                }

            }

            return result;
        }


        public IEnumerable<Element> GetRootGroupFolders(Type interfaceType, EntityToken parentEntityToken)
        {
            return GetRootGroupFolders(interfaceType, parentEntityToken, false);
        }



        public IEnumerable<Element> GetRootGroupFolders(Type interfaceType, EntityToken parentEntityToken, bool includeForeignFolders)
        {
            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);

            IEnumerable<DataFieldDescriptor> groupingDataFieldDescriptors =
                from dfd in dataTypeDescriptor.Fields
                where dfd.GroupByPriority != 0
                orderby dfd.GroupByPriority
                select dfd;

            using (DataScope dataScope = new DataScope(this.OnGetDataScopeIdentifier(interfaceType)))
            {
                if (groupingDataFieldDescriptors.Count() != 0)
                {
                    ValidateGroupByPriorities(interfaceType, groupingDataFieldDescriptors);

                    DataFieldDescriptor firstDataFieldDescriptor = groupingDataFieldDescriptors.First();
                    PropertyInfo propertyInfo = interfaceType.GetPropertiesRecursively().Where(f => f.Name == firstDataFieldDescriptor.Name).Single();

                    List<Element> elements = GetRootGroupFoldersFoldersFolders(interfaceType, parentEntityToken, firstDataFieldDescriptor, propertyInfo).ToList();

                    if (includeForeignFolders == true)
                    {
                        using (DataScope localeScope = new DataScope(UserSettings.ForeignLocaleCultureInfo))
                        {
                            elements.AddRange(GetRootGroupFoldersFoldersFolders(interfaceType, parentEntityToken, firstDataFieldDescriptor, propertyInfo));
                        }
                    }

                    return elements.Distinct();
                }
                else
                {
                    Func<IData, bool> filter = null;

                    if (this.OnGetLeafsFilter != null)
                    {
                        filter = this.OnGetLeafsFilter(parentEntityToken);
                    }

                    List<Element> elements = GetRootGroupFoldersFoldersLeafs(interfaceType, filter, false).ToList();

                    if (includeForeignFolders == true)
                    {
                        using (new DataScope(UserSettings.ForeignLocaleCultureInfo))
                        {
                            elements.AddRange(GetRootGroupFoldersFoldersLeafs(interfaceType, filter, true));
                        }
                    }

                    return elements.Distinct();
                }
            }
        }



        private IEnumerable<Element> GetRootGroupFoldersFoldersFolders(Type interfaceType, EntityToken parentEntityToken, DataFieldDescriptor firstDataFieldDescriptor, PropertyInfo propertyInfo)
        {
            Func<IData, bool> filter = (this.OnGetLeafsFilter != null) ? this.OnGetLeafsFilter(parentEntityToken) : null;

            IQueryable queryable = GetFilteredData(interfaceType, filter);

            ExpressionBuilder expressionBuilder = new ExpressionBuilder(interfaceType, queryable);

            IQueryable resultQueryable = expressionBuilder.
                OrderBy(propertyInfo, true).
                Select(propertyInfo, true).
                Distinct().
                CreateQuery();

            PropertyInfoValueCollection propertyInfoValueCollection = new PropertyInfoValueCollection();

            return CreateGroupFolderElements(interfaceType, firstDataFieldDescriptor, resultQueryable, parentEntityToken, propertyInfoValueCollection);
        }

        /// <summary>
        /// Called through reflection
        /// </summary>
        private static IQueryable Cast<T>(IQueryable<IData> queryable)
        {
            return queryable.Cast<T>();
        }

        private IEnumerable<Element> GetRootGroupFoldersFoldersLeafs(Type interfaceType, Func<IData, bool> filter, bool isForeign)
        {
            Func<IData, Element> func = OnCreateLeafElement;
            if (isForeign == true)
            {
                func = OnCreateGhostedLeafElement;
            }

            List<IData> datas = DataFacade.GetData(interfaceType).ToDataList();
            if (filter != null)
            {
                datas = datas.Where(filter).ToList();
            }

            foreach (IData data in datas)
            {
                Element element = GetDataFromCorrectScope(data, func, OnCreateDisabledLeafElement, isForeign);
                if (element != null)
                {
                    yield return element;
                }
            }
        }



        public IEnumerable<Element> GetGroupChildren(DataGroupingProviderHelperEntityToken groupEntityToken)
        {
            return GetGroupChildren(groupEntityToken, false);
        }



        public IEnumerable<Element> GetGroupChildren(DataGroupingProviderHelperEntityToken groupEntityToken, bool includeForeignFolders)
        {            
            Type interfaceType = TypeManager.GetType(groupEntityToken.Type);

            PropertyInfoValueCollection propertyInfoValueCollection = new PropertyInfoValueCollection();
            foreach (var kvp in groupEntityToken.GroupingValues)
            {
                PropertyInfo propertyInfo = interfaceType.GetPropertiesRecursively().Where(f => f.Name == kvp.Key).Single();
                propertyInfoValueCollection.AddPropertyValue(propertyInfo, kvp.Value);
            }

            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);

            DataFieldDescriptor groupingDataFieldDescriptor =
                (from dfd in dataTypeDescriptor.Fields
                 where dfd.GroupByPriority == groupEntityToken.GroupingValues.Count + 1
                 select dfd).SingleOrDefault();

            if ((groupingDataFieldDescriptor != null) && (propertyInfoValueCollection.PropertyValues.Where(f => f.Key.Name == groupingDataFieldDescriptor.Name).Any()))
            {
                // Grouping ordering has ben changed, at the moment the best thing we can do its to return no elements
                // TODO: This class and the whole attach element provider stuff should be redone
                return new Element[] { };
            }

            Func<IData, bool> filter = null;

            if (this.OnGetLeafsFilter != null)
            {
                filter = this.OnGetLeafsFilter(groupEntityToken);
            }

            using (new DataScope(this.OnGetDataScopeIdentifier(interfaceType)))
            {
                if (groupingDataFieldDescriptor != null)
                {
                    PropertyInfoValueCollection propertyInfoValueCol = propertyInfoValueCollection.Clone();
                    List<Element> elements = GetGroupChildrenFolders(groupEntityToken, interfaceType, filter, groupingDataFieldDescriptor, propertyInfoValueCol).ToList();

                    if (includeForeignFolders == true)
                    {
                        using (new DataScope(UserSettings.ForeignLocaleCultureInfo))
                        {
                            PropertyInfoValueCollection foreignPropertyInfoValueCol = propertyInfoValueCollection.Clone();
                            elements.AddRange(GetGroupChildrenFolders(groupEntityToken, interfaceType, filter, groupingDataFieldDescriptor, foreignPropertyInfoValueCol));
                        }
                    }

                    return elements.Distinct();
                }
                else
                {
                    PropertyInfoValueCollection propertyInfoValueCol = propertyInfoValueCollection.Clone();
                    List<Element> elements = GetGroupChildrenLeafs(interfaceType, filter, propertyInfoValueCol, false).ToList();

                    if (includeForeignFolders == true)
                    {
                        using (new DataScope(UserSettings.ForeignLocaleCultureInfo))
                        {
                            PropertyInfoValueCollection foreignPropertyInfoValueCol = propertyInfoValueCollection.Clone();
                            elements.AddRange(GetGroupChildrenLeafs(interfaceType, filter, foreignPropertyInfoValueCol, true));
                        }
                    }

                    return elements.Distinct();
                }
            }
        }



        private IEnumerable<Element> GetGroupChildrenFolders(DataGroupingProviderHelperEntityToken groupEntityToken, Type interfaceType, Func<IData, bool> filter, DataFieldDescriptor groupingDataFieldDescriptor, PropertyInfoValueCollection propertyInfoValueCollection)
        {
            IQueryable queryable = GetFilteredData(interfaceType, filter);
            ExpressionBuilder expressionBuilder = new ExpressionBuilder(interfaceType, queryable);
            PropertyInfo selectPropertyInfo = interfaceType.GetPropertiesRecursively(f => f.Name == groupingDataFieldDescriptor.Name).Single();

            IQueryable resultQueryable = expressionBuilder.
                Where(propertyInfoValueCollection, true).
                OrderBy(selectPropertyInfo, true).
                Select(selectPropertyInfo, true).
                Distinct().
                CreateQuery();

            foreach (Element element in CreateGroupFolderElements(interfaceType, groupingDataFieldDescriptor, resultQueryable, groupEntityToken, propertyInfoValueCollection))
            {
                yield return element;
            }
        }
        


        private IEnumerable<Element> GetGroupChildrenLeafs(Type interfaceType, Func<IData, bool> filter, PropertyInfoValueCollection propertyInfoValueCollection, bool isForeign)
        {
            IQueryable queryable = GetFilteredData(interfaceType, filter);
            ExpressionBuilder expressionBuilder = new ExpressionBuilder(interfaceType, queryable);

            IQueryable resultQueryable = expressionBuilder.
                Where(propertyInfoValueCollection, true).
                CreateQuery();

            List<IData> datas = resultQueryable.ToDataList();

            Func<IData, Element> func = OnCreateLeafElement;
            if (isForeign == true)
            {
                func = OnCreateGhostedLeafElement;
            }

            foreach (IData data in datas)
            {
                Element element = GetDataFromCorrectScope(data, func, OnCreateDisabledLeafElement, isForeign);
                if (element != null)
                {
                    yield return element;
                }
            }
        }

        private static IQueryable GetFilteredData(Type interfaceType, Func<IData, bool> filter)
        {
            IQueryable queryable = DataFacade.GetData(interfaceType);

            if (filter == null) return queryable;

            var dataQueryable = (queryable as IQueryable<IData>).Where(filter).AsQueryable();

            return GenericCastMethodInfo
                   .MakeGenericMethod(new[] { interfaceType })
                   .Invoke(null, new object[] { dataQueryable }) as IQueryable;
        }

        private static Element GetDataFromCorrectScope(IData data, Func<IData, Element> createElementFunc, Func<IData, Element> createDisabledElementFunc, bool isForeign)
        {
            IPublishControlled publishControlled = data as IPublishControlled;

            if (isForeign 
                && publishControlled != null
                && (publishControlled.PublicationStatus == GenericPublishProcessController.Draft 
                    || publishControlled.PublicationStatus == GenericPublishProcessController.AwaitingApproval))
            {
                IData publicData = DataFacade.GetDataFromOtherScope(data, DataScopeIdentifier.Public).SingleOrDefault();
                if (publicData != null)
                {
                    return createElementFunc(publicData);
                }
                return createDisabledElementFunc(data);
            }
            return createElementFunc(data);
        }




        public IEnumerable<EntityTokenHook> CreateHooks(Type interfaceType, EntityToken parentEntityToken)
        {
            throw new NotImplementedException();
        }



        private IEnumerable<Element> CreateGroupFolderElements(Type interfaceType, DataFieldDescriptor dataFieldDescriptor, IQueryable queryable, EntityToken parentEntityToken, PropertyInfoValueCollection propertyInfoValueCollection)
        {
            PropertyInfo propertyInfo = interfaceType.GetPropertiesRecursively().Where(f => f.Name == dataFieldDescriptor.Name).Single();

            foreach (object obj in queryable)
            {
                DataGroupingProviderHelperEntityToken entityToken = new DataGroupingProviderHelperEntityToken(TypeManager.SerializeType(interfaceType));
                entityToken.Payload = this.OnGetPayload(parentEntityToken);
                entityToken.GroupingValues = new Dictionary<string, object>();

                foreach (var kvp in propertyInfoValueCollection.PropertyValues)
                {
                    entityToken.GroupingValues.Add(kvp.Key.Name, kvp.Value);
                }
                entityToken.GroupingValues.Add(propertyInfo.Name, obj);


                Element element = new Element(_elementProviderContext.CreateElementHandle(entityToken));


                string label = (obj == null ? string.Format(_undefinedLableValue, dataFieldDescriptor.Name) : obj.ToString());
                if ((obj != null) && (obj.GetType() == typeof(DateTime)))
                {
                    DateTime dt = (DateTime)obj;
                    label = dt.ToString("yyyy-MM-dd");
                }

                if ((obj != null) && (dataFieldDescriptor.ForeignKeyReferenceTypeName != null))
                {
                    Type refType = TypeManager.GetType(dataFieldDescriptor.ForeignKeyReferenceTypeName);

                    IData data = DataFacade.TryGetDataByUniqueKey(refType, obj); // Could be a newly added null field...

                    if (data != null)
                    {
                        label = data.GetLabel();
                    }
                }


                element.VisualData = new ElementVisualizedData
                {
                    Label = label,
                    ToolTip = label,
                    HasChildren = true,
                    Icon = this.FolderClosedIcon,
                    OpenedIcon = this.FolderOpenIcon
                };

                PropertyInfoValueCollection propertyInfoValueCollectionCopy = propertyInfoValueCollection.Clone();
                propertyInfoValueCollectionCopy.AddPropertyValue(propertyInfo, obj);

                yield return this.OnAddActions(element, propertyInfoValueCollectionCopy);
            }
        }



        private static string CreateId(object obj)
        {
            if (obj == null) return "";

            if (obj.GetType() != typeof(DateTime))
            {
                return (obj == null ? "" : obj.ToString());
            }
            else
            {
                return ((DateTime)obj).ToString("o");
            }
        }



        private static void ValidateGroupByPriorities(Type interfaceType, IEnumerable<DataFieldDescriptor> groupingDataFieldDescriptors)
        {
            int i = 1;
            foreach (DataFieldDescriptor dataFieldDescriptor in groupingDataFieldDescriptors)
            {
                if (dataFieldDescriptor.GroupByPriority != i)
                {
                    throw new InvalidOperationException(string.Format("Group by priority not correct for the type '{0}'", interfaceType));
                }

                i++;
            }
        }



        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}
