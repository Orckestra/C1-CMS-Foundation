using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;


namespace Composite.C1Console.Elements.ElementProviderHelpers.DataGroupingProviderHelper
{
    internal sealed class DataGroupingProviderHelper : IAuxiliarySecurityAncestorProvider
    {
        private const int MaxElementsToShow = 1000;


        private readonly ElementProviderContext _elementProviderContext;
        private readonly string _undefinedLabelValue;

        private static readonly MethodInfo GenericCastMethodInfo = 
            StaticReflection.GetGenericMethodInfo(() => DataGroupingProviderHelper.Cast<IData>(null));


        public DataGroupingProviderHelper(ElementProviderContext elementProviderContext)
        {
            _elementProviderContext = elementProviderContext;
            _undefinedLabelValue = StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "UndefinedLabelTemplate");

            this.FolderOpenIcon = GetIconHandle("datagroupinghelper-folder-open");
            this.FolderClosedIcon = GetIconHandle("datagroupinghelper-folder-closed");

            this.OnCreateLeafElement = d => new Element(_elementProviderContext.CreateElementHandle(d.GetDataEntityToken()));
            this.OnGetDataScopeIdentifier = t => DataScopeIdentifier.Administrated;
            this.OnAddActions = (e, p) => e;

            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataEntityToken>(this);
            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataGroupingProviderHelperEntityToken>(this);

            DataEventSystemFacade.SubscribeToDataAfterUpdate(typeof(IData), (sender, args) =>
            {
                if (!OnOwnsType(args.DataType)) return;

                var dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(args.DataType);

                IEnumerable<DataFieldDescriptor> groupingDataFieldDescriptors =
                    from dfd in dataTypeDescriptor.Fields
                    where dfd.GroupByPriority != 0
                    orderby dfd.GroupByPriority
                    select dfd;

                if (groupingDataFieldDescriptors.Any())
                {
                    EntityTokenCacheFacade.ClearCache(args.Data.GetDataEntityToken());
                }
            }, false);
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
                if (entityToken is DataGroupingProviderHelperEntityToken groupingEntityToken)
                {
                    var parent = GetGroupingEntityTokenParent(groupingEntityToken);

                    if (parent != null)
                    {
                        result.Add(entityToken, new [] { parent });
                    }
                    continue;
                }


                if (entityToken is DataEntityToken dataEntityToken)
                {
                    var parent = GetDataEntityTokenParent(dataEntityToken);
                    if (parent != null)
                    {
                        result.Add(entityToken, new[] { parent });
                    }
                }
            }

            return result;
        }

        private EntityToken GetGroupingEntityTokenParent(DataGroupingProviderHelperEntityToken groupingEntityToken)
        {
            Type type = TypeManager.TryGetType(groupingEntityToken.Type);

            if (groupingEntityToken.GroupingValues.Count == 1)
            {
                return OnGetRootParentEntityToken(type, groupingEntityToken);
            }

            var newGroupingParentEntityToken = new DataGroupingProviderHelperEntityToken(groupingEntityToken.Type)
            {
                Payload = this.OnGetPayload(groupingEntityToken),
                GroupingValues = new Dictionary<string, object>()
            };
            foreach (var kvp in groupingEntityToken.GroupingValues.Take(groupingEntityToken.GroupingValues.Count - 1))
            {
                newGroupingParentEntityToken.GroupingValues.Add(kvp.Key, NormalizeGroupingValue(kvp.Value));
            }

            return newGroupingParentEntityToken;
        }

        private EntityToken GetDataEntityTokenParent(DataEntityToken dataEntityToken)
        {
            Type interfaceType = dataEntityToken.InterfaceType;
            if (!OnOwnsType(interfaceType))
            {
                return null;
            }

            var dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);

            IEnumerable<DataFieldDescriptor> groupingDataFieldDescriptors =
                from dfd in dataTypeDescriptor.Fields
                where dfd.GroupByPriority != 0
                orderby dfd.GroupByPriority
                select dfd;

            if (!groupingDataFieldDescriptors.Any())
            {
                return OnGetRootParentEntityToken(interfaceType, dataEntityToken);
            }

            IData data = dataEntityToken.Data;

            var parentToken = new DataGroupingProviderHelperEntityToken(dataEntityToken.Type)
            {
                Payload = this.OnGetPayload(dataEntityToken),
                GroupingValues = new Dictionary<string, object>()
            };
            foreach (DataFieldDescriptor dfd in groupingDataFieldDescriptors)
            {
                PropertyInfo propertyInfo = interfaceType.GetPropertiesRecursively().Single(f => f.Name == dfd.Name);

                object value = propertyInfo.GetValue(data, null);
                parentToken.GroupingValues.Add(propertyInfo.Name, NormalizeGroupingValue(value));
            }

            return parentToken;
        }

        private static object NormalizeGroupingValue(object value)
        {
            return (value as DateTime?)?.Date ?? value;
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

            using (new DataScope(this.OnGetDataScopeIdentifier(interfaceType)))
            {
                if (groupingDataFieldDescriptors.Count() != 0)
                {
                    ValidateGroupByPriorities(interfaceType, groupingDataFieldDescriptors);

                    DataFieldDescriptor firstDataFieldDescriptor = groupingDataFieldDescriptors.First();
                    PropertyInfo propertyInfo = interfaceType.GetPropertiesRecursively().Single(f => f.Name == firstDataFieldDescriptor.Name);

                    List<Element> elements = GetRootGroupFolders(interfaceType, parentEntityToken, firstDataFieldDescriptor, propertyInfo).ToList();

                    if (firstDataFieldDescriptor.ForeignKeyReferenceTypeName != null)
                    {
                        elements = (firstDataFieldDescriptor.TreeOrderingProfile.OrderDescending ?
                            elements.OrderByDescending(f => f.VisualData.Label) :
                            elements.OrderBy(f => f.VisualData.Label)).ToList();
                    }

                    if (includeForeignFolders)
                    {
                        using (new DataScope(UserSettings.ForeignLocaleCultureInfo))
                        {
                            elements.AddRange(GetRootGroupFolders(interfaceType, parentEntityToken, firstDataFieldDescriptor, propertyInfo));
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

                    bool listingLimitReached = elements.Count == MaxElementsToShow;

                    var labelFieldDescriptor = dataTypeDescriptor.Fields.FirstOrDefault(f => f.Name == dataTypeDescriptor.LabelFieldName);
                    if (labelFieldDescriptor?.ForeignKeyReferenceTypeName != null && labelFieldDescriptor.TreeOrderingProfile.OrderPriority.HasValue)
                    {
                        elements = (labelFieldDescriptor.TreeOrderingProfile.OrderDescending ?
                            elements.OrderByDescending(f => f.VisualData.Label) :
                            elements.OrderBy(f => f.VisualData.Label)).ToList();
                    }

                    if (!listingLimitReached && includeForeignFolders)
                    {
                        using (new DataScope(UserSettings.ForeignLocaleCultureInfo))
                        {
                            elements.AddRange(GetRootGroupFoldersFoldersLeafs(interfaceType, filter, true));
                        }

                        elements = elements.Distinct().Take(MaxElementsToShow).ToList();
                    }

                    if (elements.Count == MaxElementsToShow)
                    {
                        elements.Add(GetElipsisElement(parentEntityToken, MaxElementsToShow));
                    }

                    return elements;
                }
            }
        }



        private IEnumerable<Element> GetRootGroupFolders(Type interfaceType, EntityToken parentEntityToken, DataFieldDescriptor firstDataFieldDescriptor, PropertyInfo propertyInfo)
        {
            Func<IData, bool> filter = OnGetLeafsFilter?.Invoke(parentEntityToken);

            IQueryable queryable = GetFilteredData(interfaceType, filter);

            var expressionBuilder = new ExpressionBuilder(interfaceType, queryable);

            IQueryable resultQueryable = expressionBuilder.
                OrderBy(propertyInfo, true, firstDataFieldDescriptor.TreeOrderingProfile.OrderDescending).
                Select(propertyInfo, true).
                Distinct().
                CreateQuery();

            var propertyInfoValueCollection = new PropertyInfoValueCollection();

            return CreateGroupFolderElements(interfaceType, firstDataFieldDescriptor, resultQueryable, parentEntityToken, propertyInfoValueCollection);
        }

        private static IQueryable Cast<T>(IQueryable<IData> queryable)
        {
            return queryable.Cast<T>();
        }


        public static IQueryable OrderData(IQueryable source, Type interfaceType)
        {
            var typeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);

            List<DataFieldDescriptor> orderFields = typeDescriptor.Fields.Where(f => f.TreeOrderingProfile.OrderPriority.HasValue).OrderBy(f => f.TreeOrderingProfile.OrderPriority).ToList();

            if (orderFields.Any())
            {
                IOrderedQueryable ordered = source.OrderBy(interfaceType, orderFields.First().Name, orderFields.First().TreeOrderingProfile.OrderDescending);

                foreach (DataFieldDescriptor field in orderFields.Skip(1))
                {
                    ordered = ordered.ThenBy(interfaceType, field.Name, field.TreeOrderingProfile.OrderDescending);
                }

                return ordered;
            }
            
            if (!string.IsNullOrEmpty(typeDescriptor.LabelFieldName))
            {
                return source.OrderBy(interfaceType, typeDescriptor.LabelFieldName);
            }

            return source;
        }


        private IEnumerable<Element> GetRootGroupFoldersFoldersLeafs(Type interfaceType, Func<IData, bool> filter, bool isForeign)
        {
            Func<IData, Element> func = isForeign ? OnCreateGhostedLeafElement : OnCreateLeafElement;

            IQueryable source = DataFacade.GetData(interfaceType);

            IQueryable orderedData = OrderData(source, interfaceType);

            List<IData> data;

            if (filter == null)
            {
                data = ((IQueryable<IData>) orderedData).Take(MaxElementsToShow).ToList();
            }
            else
            {
                data = ((IQueryable<IData>) orderedData).Evaluate().Where(filter).ToList();
            }

            foreach (IData item in data)
            {
                Element element = GetDataFromCorrectScope(item, func, OnCreateDisabledLeafElement, isForeign);
                if (element != null)
                {
                    yield return element;
                }
            }
        }


        private Element GetElipsisElement(EntityToken parentEntityToken, int elementsShown)
        {
            var element =
                new Element(new ElementHandle(_elementProviderContext.ProviderName, new ElipsisEntityToken(parentEntityToken)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = LocalizationFiles.Composite_Management.Website_App_LimitedElementsShown(elementsShown.ToString()),
                        ToolTip = "",
                        Icon = GetIconHandle("warning"),
                        OpenedIcon = null,
                        HasChildren = false
                    }
                };

            return element;
        }


        public IEnumerable<Element> GetGroupChildren(DataGroupingProviderHelperEntityToken groupEntityToken)
        {
            return GetGroupChildren(groupEntityToken, false);
        }



        public IEnumerable<Element> GetGroupChildren(DataGroupingProviderHelperEntityToken groupEntityToken, bool includeForeignFolders)
        {            
            Type interfaceType = TypeManager.GetType(groupEntityToken.Type);

            var propertyInfoValueCollection = new PropertyInfoValueCollection();
            foreach (var kvp in groupEntityToken.GroupingValues)
            {
                PropertyInfo propertyInfo = interfaceType.GetPropertiesRecursively().Single(f => f.Name == kvp.Key);
                propertyInfoValueCollection.AddPropertyValue(propertyInfo, kvp.Value);
            }

            var dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);

            DataFieldDescriptor groupingDataFieldDescriptor =
                (from dfd in dataTypeDescriptor.Fields
                 where dfd.GroupByPriority == groupEntityToken.GroupingValues.Count + 1
                 select dfd).SingleOrDefault();

            if (groupingDataFieldDescriptor != null 
                && propertyInfoValueCollection.PropertyValues.Any(f => f.Key.Name == groupingDataFieldDescriptor.Name))
            {
                // Grouping ordering has ben changed, at the moment the best thing we can do its to return no elements
                // TODO: This class and the whole attach element provider stuff should be redone
                return Enumerable.Empty<Element>();
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

                    if (groupingDataFieldDescriptor.ForeignKeyReferenceTypeName != null)
                    {
                        elements = (groupingDataFieldDescriptor.TreeOrderingProfile.OrderDescending ?
                            elements.OrderByDescending(f => f.VisualData.Label) :
                            elements.OrderBy(f => f.VisualData.Label)).ToList();
                    }

                    if (includeForeignFolders)
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

                    if (!dataTypeDescriptor.Fields.Any(f => f.TreeOrderingProfile.OrderPriority.HasValue && f.ForeignKeyReferenceTypeName == null))
                    {
                        var labelFieldDescriptor = dataTypeDescriptor.Fields.FirstOrDefault(f => f.Name == dataTypeDescriptor.LabelFieldName);
                        if (labelFieldDescriptor?.ForeignKeyReferenceTypeName != null)
                        {
                            elements = (labelFieldDescriptor.TreeOrderingProfile.OrderDescending ?
                                elements.OrderByDescending(f => f.VisualData.Label) :
                                elements.OrderBy(f => f.VisualData.Label)).ToList();
                        }
                    }

                    if (includeForeignFolders)
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
                OrderBy(selectPropertyInfo, true, groupingDataFieldDescriptor.TreeOrderingProfile.OrderDescending).
                Select(selectPropertyInfo, true).
                Distinct().
                CreateQuery();

            return CreateGroupFolderElements(interfaceType, groupingDataFieldDescriptor, resultQueryable, groupEntityToken, propertyInfoValueCollection);
        }
        


        private IEnumerable<Element> GetGroupChildrenLeafs(Type interfaceType, Func<IData, bool> filter, PropertyInfoValueCollection propertyInfoValueCollection, bool isForeign)
        {
            IQueryable queryable = GetFilteredData(interfaceType, filter);
            queryable = OrderData(queryable, interfaceType);

            ExpressionBuilder expressionBuilder = new ExpressionBuilder(interfaceType, queryable);

            IQueryable resultQueryable = expressionBuilder.
                Where(propertyInfoValueCollection, true).
                CreateQuery();

            List<IData> datas = resultQueryable.ToDataList();

            Func<IData, Element> func = OnCreateLeafElement;
            if (isForeign)
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

            var dataQueryable = ((IQueryable<IData>) queryable).Where(filter).AsQueryable();

            return GenericCastMethodInfo
                   .MakeGenericMethod(interfaceType)
                   .Invoke(null, new object[] { dataQueryable }) as IQueryable;
        }

        private static Element GetDataFromCorrectScope(IData data, Func<IData, Element> createElementFunc, Func<IData, Element> createDisabledElementFunc, bool isForeign)
        {
            if (isForeign)
            {
                if (!data.IsTranslatable())
                {
                    return createDisabledElementFunc(data);
                }

                IData translationSource = data.GetTranslationSource();
                return createElementFunc(translationSource);
            }
            return createElementFunc(data);
        }




        public IEnumerable<EntityTokenHook> CreateHooks(Type interfaceType, EntityToken parentEntityToken)
        {
            throw new NotImplementedException();
        }



        private IEnumerable<Element> CreateGroupFolderElements(Type interfaceType, DataFieldDescriptor dataFieldDescriptor, IQueryable queryable, EntityToken parentEntityToken, PropertyInfoValueCollection propertyInfoValueCollection)
        {
            PropertyInfo propertyInfo = interfaceType.GetPropertiesRecursively().Single(f => f.Name == dataFieldDescriptor.Name);

            foreach (object obj in queryable)
            {
                var entityToken = new DataGroupingProviderHelperEntityToken(TypeManager.SerializeType(interfaceType))
                {
                    Payload = this.OnGetPayload(parentEntityToken),
                    GroupingValues = new Dictionary<string, object>()
                };

                foreach (var kvp in propertyInfoValueCollection.PropertyValues)
                {
                    entityToken.GroupingValues.Add(kvp.Key.Name, kvp.Value);
                }
                entityToken.GroupingValues.Add(propertyInfo.Name, obj);


                var element = new Element(_elementProviderContext.CreateElementHandle(entityToken));


                string label = obj?.ToString() ?? string.Format(_undefinedLabelValue, dataFieldDescriptor.Name);
                if (obj is DateTime dt)
                {
                    label = dt.ToString("yyyy-MM-dd");
                }

                if (obj != null && dataFieldDescriptor.ForeignKeyReferenceTypeName != null)
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



        private static void ValidateGroupByPriorities(Type interfaceType, IEnumerable<DataFieldDescriptor> groupingDataFieldDescriptors)
        {
            int i = 1;
            foreach (DataFieldDescriptor dataFieldDescriptor in groupingDataFieldDescriptors)
            {
                if (dataFieldDescriptor.GroupByPriority != i)
                {
                    throw new InvalidOperationException($"Group by priority not correct for the type '{interfaceType}'");
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
