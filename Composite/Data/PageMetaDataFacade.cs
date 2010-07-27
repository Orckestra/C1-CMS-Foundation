using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Transactions;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Linq;
using Composite.Transactions;
using Composite.Types;
using Composite.Users;


namespace Composite.Data
{
    /// <summary>
    /// Using the same name for a metadata definition is allowed iff metadata type and label are the same
    /// on all instances.
    /// </summary>
    public static class PageMetaDataFacade
    {
        internal static readonly string MetaDataType_IdFieldName = "Id";
        internal static readonly string MetaDataType_PageReferenceFieldName = "IPageIdForeignKey";
        internal static readonly string MetaDataType_MetaDataDefinitionFieldName = "ICompositionDescriptionNameForeignKey";

        /// <summary>
        /// Returns all possible meta data types. This is NOT types that only have been defined on any pages or page type
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<Type> GetAllMetaDataTypes()
        {
            return DataAssociationRegistry.GetAssociationTypes(typeof(IPage), DataAssociationType.Composition);
        }




        /// <summary>
        /// Returns all meta data types that are defined on the given page.
        /// </summary>
        /// <param name="page">If this is null, Guid.Empty is assumed as defining item id</param>
        /// <returns></returns>
        public static IEnumerable<Type> GetDefinedMetaDataTypes(this IPage page)
        {
            Guid pageId = page.GetPageIdOrNull();

            IEnumerable<Guid> metaDataTypeIds =
                DataFacade.GetData<IPageMetaDataDefinition>().
                Where(f => f.DefiningItemId == pageId).
                Select(f => f.MetaDataTypeId).
                Distinct();

            foreach (Guid metaDataTypeId in metaDataTypeIds)
            {
                DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(metaDataTypeId);

                yield return TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);
            }
        }



        public static IEnumerable<Tuple<Type, string>> GetDefinedMetaDataTypeAndNames(this IPage page)
        {
            Guid pageId = page.GetPageIdOrNull();

            IEnumerable<Tuple<Guid, string>> metaDataTypeIdAndNames =
                DataFacade.GetData<IPageMetaDataDefinition>().
                Where(f => f.DefiningItemId == pageId).
                Select(f => new Tuple<Guid, string>(f.MetaDataTypeId, f.Name)).
                Distinct();

            foreach (Tuple<Guid, string> metaDataTypeIdAndName in metaDataTypeIdAndNames)
            {
                DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(metaDataTypeIdAndName.Item1);

                yield return new Tuple<Type, string>(TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName), metaDataTypeIdAndName.Item2);
            }
        }


        /// <summary>
        /// Returns a pagemeta data definition given the defining item id or null if none exists.
        /// </summary>
        /// <param name="definingItemId"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static IPageMetaDataDefinition GetMetaDataDefinition(Guid definingItemId, string name)
        {
            return
                DataFacade.GetData<IPageMetaDataDefinition>().
                Where(f => f.DefiningItemId == definingItemId && f.Name == name).
                SingleOrDefault(); // Its an error if multible exists on this point
        }



        /// <summary>
        /// Returns the composition container given the page metadata defintion name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public static ICompositionContainer GetMetaDataContainerByDefinitionName(string name)
        {
            return
                DataFacade.GetData<IPageMetaDataDefinition>().
                Join(DataFacade.GetData<ICompositionContainer>(), o => o.MetaDataContainerId, i => i.Id, (def, con) => new { def, con }).
                Where(f => f.def.Name == name).
                Select(f => f.con).
                Single(); // Its an error if multible exists on this point
        }



        /// <summary>
        /// Gets all meta data containers ordered. If none exists in the system, a default is created
        /// </summary>
        /// <returns></returns>
        public static List<KeyValuePair<Guid, string>> GetAllMetaDataContainers()
        {
            List<KeyValuePair<Guid, string>> containers;

            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                bool anyExists = DataFacade.GetData<ICompositionContainer>().Any();

                if (anyExists == false)
                {
                    ICompositionContainer defaultContainer = DataFacade.BuildNew<ICompositionContainer>();

                    defaultContainer.Id = Guid.NewGuid();
                    defaultContainer.Label = "${Composite.Management, DataCompositionVisabilityFacade.DefaultContainerLabel}";

                    DataFacade.AddNew<ICompositionContainer>(defaultContainer);
                }

                containers =
                    DataFacade.GetData<ICompositionContainer>().
                    OrderBy(f => f.Label).
                    ToList(f => new KeyValuePair<Guid, string>(f.Id, f.Label));

                transactionScope.Complete();
            }

            return containers;
        }



        /// <summary>
        /// Returns all allowed metadata containers on the given page
        /// </summary>
        /// <param name="page">If null, empty guid is used (whole website)</param>
        /// <returns></returns>
        public static IEnumerable<ICompositionContainer> GetAllowedMetaDataContainers(this IPage page)
        {
            foreach (Guid metaDataContainerId in GetAllowedMetaDataDefinitions(page).Select(f => f.MetaDataContainerId).Distinct())
            {
                yield return
                    DataFacade.GetData<ICompositionContainer>().
                    Where(f => f.Id == metaDataContainerId).
                    Single();
            }
        }



        /// <summary>
        /// Return all allowed metadata types on the given page
        /// </summary>
        /// <param name="page"></param>
        /// <returns></returns>
        public static IEnumerable<Type> GetAllowedMetaDataTypes(this IPage page)
        {
            foreach (Guid metaDataTypeId in GetAllowedMetaDataDefinitions(page).Select(f => f.MetaDataTypeId).Distinct())
            {
                DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(metaDataTypeId);

                yield return TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);
            }
        }



        /// <summary>
        /// Returns all allowed metadata definitions on the given page
        /// </summary>
        /// <param name="page">If null, empty guid is used (whole website)</param>
        /// <returns></returns>
        public static List<IPageMetaDataDefinition> GetAllowedMetaDataDefinitions(this IPage page)
        {
            IEnumerable<IPageMetaDataDefinition> pageMetaDataDefinitions =
                DataFacade.
                GetData<IPageMetaDataDefinition>().OrderBy(f => f.Label).
                Evaluate();

            List<IPageMetaDataDefinition> resultPageMetaDataDefinitions = new List<IPageMetaDataDefinition>();

            foreach (IPageMetaDataDefinition pageMetaDataDefinition in pageMetaDataDefinitions)
            {
                if (IsDefinitionAllowed(pageMetaDataDefinition, page) == true)
                {
                    if (resultPageMetaDataDefinitions.Where(f => f.Name == pageMetaDataDefinition.Name).Any() == false)
                    {
                        resultPageMetaDataDefinitions.Add(pageMetaDataDefinition);
                    }
                }
            }

            return resultPageMetaDataDefinitions;
        }



        /// <summary>
        /// Returns true if the given page metadata definition is allowed for the given page
        /// </summary>
        /// <param name="pageMetaDataDefinition"></param>
        /// <param name="page">If null, empty guid is used (whole website)</param>
        /// <returns></returns>
        public static bool IsDefinitionAllowed(IPageMetaDataDefinition pageMetaDataDefinition, IPage page)
        {
            Guid pageId = page.GetPageIdOrNull();

            if (pageMetaDataDefinition.DefiningItemId == page.PageTypeId) return true;

            // Its not a pagetype attached meta data definitions, check page attacked
            int levelsToParent = CountLevelsToParent(pageMetaDataDefinition.DefiningItemId, pageId);

            if (pageMetaDataDefinition.StartLevel > levelsToParent) return false;
            if (pageMetaDataDefinition.StartLevel + pageMetaDataDefinition.Levels < levelsToParent) return false;

            return true;
        }



        private static int CountLevelsToParent(Guid definingPageId, Guid pageId)
        {
            int count = 0;

            while (definingPageId != pageId)
            {
                Guid parentPageId = PageManager.GetParentID(pageId);

                if ((definingPageId != Guid.Empty) && (parentPageId == Guid.Empty)) return -1; // Page is not a (sub)child of _pageId                

                pageId = parentPageId;
                count++;
            }

            return count;
        }



        public static IEnumerable<IData> GetMetaData(string definitionName, Type metaDataType)
        {
            //TODO: Consider caching here            
            ParameterExpression parameterExpression = Expression.Parameter(metaDataType);

            LambdaExpression lambdaExpression = Expression.Lambda(
                Expression.Equal(
                    Expression.Property(
                        parameterExpression,
                        PageMetaDataFacade.GetDefinitionNamePropertyInfo(metaDataType)
                    ),
                    Expression.Constant(
                        definitionName,
                        typeof(string)
                    )
                ),
                parameterExpression
            );

            Expression whereExpression = ExpressionCreator.Where(DataFacade.GetData(metaDataType).Expression, lambdaExpression);

            IEnumerable<IData> datas = ExpressionHelper.GetCastedObjects<IData>(metaDataType, whereExpression);

            return datas;
        }



        public static IEnumerable<IData> GetMetaData(this IPage page)
        {
            return GetMetaData(page, DataScopeManager.CurrentDataScope);
        }



        public static IEnumerable<IData> GetMetaData(this IPage page, DataScopeIdentifier dataScopeIdentifier)
        {
            using (new DataScope(dataScopeIdentifier))
            {
                foreach (IPageMetaDataDefinition pageMetaDataDefinition in page.GetAllowedMetaDataDefinitions())
                {
                    IData data = page.GetMetaData(pageMetaDataDefinition.Name, pageMetaDataDefinition.MetaDataTypeId);

                    if (data != null)
                    {
                        yield return data;
                    }
                }
            }
        }



        public static IData GetMetaData(this IPage page, string definitionName, Guid metaDataTypeId)
        {
            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(metaDataTypeId);
            Type metaDataType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            return GetMetaData(page, definitionName, metaDataType);
        }


        public static IData GetMetaData(this IPage page, string definitionName, Type metaDataType)
        {
            return GetMetaData(page.Id, definitionName, metaDataType);
        }


        public static IData GetMetaData(Guid pageId, string definitionName, Type metaDataType)
        {
            //TODO: Consider caching here            
            ParameterExpression parameterExpression = Expression.Parameter(metaDataType);

            LambdaExpression lambdaExpression = Expression.Lambda(
                Expression.And(
                    Expression.Equal(
                        Expression.Property(
                            parameterExpression,
                            PageMetaDataFacade.GetDefinitionNamePropertyInfo(metaDataType)
                        ),
                        Expression.Constant(
                            definitionName,
                            typeof(string)
                        )
                    ),
                    Expression.Equal(
                        Expression.Property(
                            parameterExpression,
                            GetDefinitionPageReferencePropertyInfo(metaDataType)
                        ),
                        Expression.Constant(
                            pageId,
                            typeof(Guid)
                        )
                    )
                ),
                parameterExpression
            );

            Expression whereExpression = ExpressionCreator.Where(DataFacade.GetData(metaDataType).Expression, lambdaExpression);

            IEnumerable<IData> datas = ExpressionHelper.GetCastedObjects<IData>(metaDataType, whereExpression);

            return datas.SingleOrDefault();
        }


        /// <summary>
        /// Gets all existing pages that are affected by the given meta data definition
        /// </summary>
        /// <param name="definingPage">If null, empty guid is used</param>
        /// <param name="definitionName"></param>
        /// <returns></returns>
        public static IEnumerable<IPage> GetMetaDataAffectedPages(this IPage definingPage, string definitionName)
        {
            Guid pageId = definingPage.GetPageIdOrNull();

            IPageMetaDataDefinition pageMetaDataDefinition = GetMetaDataDefinition(pageId, definitionName);

            return GetMetaDataAffectedPages(definingPage, pageMetaDataDefinition.StartLevel, pageMetaDataDefinition.Levels);
        }


        /// <summary>
        /// Gets all existing pages that are affected by the given meta data definition
        /// </summary>
        /// <param name="definingPage"></param>
        /// <param name="startLevel"></param>
        /// <param name="levels"></param>
        /// <returns></returns>
        public static IEnumerable<IPage> GetMetaDataAffectedPages(this IPage definingPage, int startLevel, int levels)
        {
            List<IPage> pages;
            if (definingPage != null)
            {
                pages = new List<IPage> { definingPage };
            }
            else
            {
                pages = new List<IPage>();

                foreach (Guid pageId in PageManager.GetChildrenIDs(Guid.Empty))
                { 
                    pages.Add(PageManager.GetPageById(pageId));
                }
                                        
                startLevel--; // We have just taken one level
            }

            for (int i = 0; i < startLevel; i++)
            {
                List<IPage> newPages = new List<IPage>();

                foreach (IPage p in pages)
                {
                    IEnumerable<IPage> children = p.GetChildren();
                    newPages.AddRange(children);
                }

                pages = newPages;
            }


            for (int i = 0; i <= levels; i++)
            {
                if (pages.Count == 0) yield break;

                foreach (IPage p in pages)
                {
                    yield return p;
                }

                List<IPage> newPages = new List<IPage>();

                foreach (IPage p in pages)
                {
                    IEnumerable<IPage> children = p.GetChildren();
                    newPages.AddRange(children);
                }

                pages = newPages;
            }
        }



        public static IEnumerable<IPage> GetMetaDataAffectedPagesByPageTypeId(Guid definingPageTypeId)
        {
            return DataFacade.GetData<IPage>().Where(f => f.PageTypeId == definingPageTypeId);
        }



        //public static bool IsDefinitionAllowed(string name, string label, Guid metaDataTypeId)
        //{
        //    return
        //        DataFacade.GetData<IPageMetaDataDefinition>().
        //        Where(f => (f.Name == name) && ((f.Label != label) || (f.MetaDataTypeId != metaDataTypeId))).
        //        Any() == false;
        //}


        
        public static bool IsDefinitionAllowed(Guid definingItemId, string name, string label, Guid metaDataTypeId)
        {
            IEnumerable<IPageMetaDataDefinition> pageMetaDataDefinitions = DataFacade.GetData<IPageMetaDataDefinition>().Where(f => f.Name == name).Evaluate();
            
            foreach (IPageMetaDataDefinition pageMetaDataDefinition in pageMetaDataDefinitions)
            {
                if ((pageMetaDataDefinition.DefiningItemId == definingItemId) &&
                    (pageMetaDataDefinition.MetaDataTypeId == metaDataTypeId) && 
                    (pageMetaDataDefinition.Label != label) &&
                    (pageMetaDataDefinitions.Count() == 1))
                {
                    return true; // Allow renaming of label
                }

                if (pageMetaDataDefinition.Label != label) return false;
                if (pageMetaDataDefinition.MetaDataTypeId != metaDataTypeId) return false;
                if (pageMetaDataDefinition.DefiningItemId == definingItemId) return false;
            }

            return true;
        }



        public static bool IsNewContainerIdAllowed(Guid definingItemId, string name, Guid newMetaDataContainerName)
        {
            IEnumerable<IPageMetaDataDefinition> pageMetaDataDefinitions = DataFacade.GetData<IPageMetaDataDefinition>().Where(f => f.Name == name).Evaluate();

            IPageMetaDataDefinition pageMetaDataDefinition = pageMetaDataDefinitions.Where(f => f.DefiningItemId == definingItemId).SingleOrDefault();
            if ((pageMetaDataDefinition != null) && (pageMetaDataDefinition.MetaDataContainerId == newMetaDataContainerName)) 
            {
                return true; // Return true if no changes are made
            }

            if (pageMetaDataDefinitions.Count() > 1) return false;            

            return true;
        }


        /// <summary>
        /// Adds a new metadata definition to the given page
        /// </summary>
        /// <param name="definingPage"></param>
        /// <param name="name"></param>
        /// <param name="label"></param>
        /// <param name="metaDataTypeId"></param>
        /// <param name="metaDataContainerId"></param>
        /// <param name="startLevel"></param>
        /// <param name="levels"></param>        
        public static void AddMetaDataDefinition(this IPage definingPage, string name, string label, Guid metaDataTypeId, Guid metaDataContainerId, int startLevel = 0, int levels = 100000)
        {
            AddDefinition(definingPage.GetPageIdOrNull(), name, label, metaDataTypeId, metaDataContainerId, startLevel, levels);
        }



        /// <summary>
        /// Adds a new metadata definition to the given pagetype
        /// </summary>
        /// <param name="definingPageType"></param>
        /// <param name="name"></param>
        /// <param name="label"></param>
        /// <param name="metaDataTypeId"></param>
        /// <param name="metaDataContainerId"></param>
        public static void AddMetaDataDefinition(this IPageType definingPageType, string name, string label, Guid metaDataTypeId, Guid metaDataContainerId)
        {
            AddDefinition(definingPageType.Id, name, label, metaDataTypeId, metaDataContainerId, 0, 0);
        }



        /// <summary>
        /// Adds a new metadata definition to the given definingItemId. Guid.Empty is the whole website
        /// </summary>
        /// <param name="definingItemId"></param>
        /// <param name="name"></param>
        /// <param name="label"></param>
        /// <param name="metaDataTypeId"></param>
        /// <param name="metaDataContainerId"></param>
        /// <param name="startLevel"></param>
        /// <param name="levels"></param>        
        public static void AddDefinition(Guid definingItemId, string name, string label, Guid metaDataTypeId, Guid metaDataContainerId, int startLevel = 0, int levels = 100000)
        {
            IPageMetaDataDefinition pageMetaDataDefinition = DataFacade.BuildNew<IPageMetaDataDefinition>();
            pageMetaDataDefinition.Id = Guid.NewGuid();
            pageMetaDataDefinition.DefiningItemId = definingItemId;
            pageMetaDataDefinition.Name = name;
            pageMetaDataDefinition.Label = label;
            pageMetaDataDefinition.MetaDataContainerId = metaDataContainerId;
            pageMetaDataDefinition.MetaDataTypeId = metaDataTypeId;
            pageMetaDataDefinition.StartLevel = startLevel;
            pageMetaDataDefinition.Levels = levels;

            DataFacade.AddNew<IPageMetaDataDefinition>(pageMetaDataDefinition);
        }



        /// <summary>
        /// Using the given page this methods adds meta data instances that are missing
        /// </summary>
        /// <param name="definingPage">If null, empty guid is used</param>
        /// <param name="metaDataDefinitionName"></param>
        /// <param name="newDataTemplate"></param>
        public static void AddNewMetaDataToExistingPages(this IPage definingPage, string metaDataDefinitionName, IData newDataTemplate)
        {
            Guid pageId = definingPage.GetPageIdOrNull();

            IPageMetaDataDefinition pageMetaDataDefinition = GetMetaDataDefinition(pageId, metaDataDefinitionName);

            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(pageMetaDataDefinition.MetaDataTypeId);
            Type metaDataType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            IEnumerable<IPage> affectedPages = definingPage.GetMetaDataAffectedPages(metaDataDefinitionName);

            foreach (IPage affectedPage in affectedPages)
            {
                AddNewMetaDataToExistingPage(affectedPage, metaDataDefinitionName, metaDataType, newDataTemplate);
            }
        }



        public static void AddNewMetaDataToExistingPage(this IPage page, string metaDataDefinitionName, Type metaDataType, IData newDataTemplate)
        {
            IData data = page.GetMetaData(metaDataDefinitionName, metaDataType);
            if (data != null) return;

            IPublishControlled newData = DataFacade.BuildNew(metaDataType) as IPublishControlled;
            newDataTemplate.FullCopyChangedTo(newData);
            newData.PublicationStatus = GenericPublishProcessController.Draft;

            PageMetaDataFacade.AssignMetaDataSpecificValues(newData, metaDataDefinitionName, page);

            ILocalizedControlled localizedData = newData as ILocalizedControlled;
            localizedData.CultureName = UserSettings.ActiveLocaleCultureInfo.Name;
            localizedData.SourceCultureName = UserSettings.ActiveLocaleCultureInfo.Name;

            newData = (IPublishControlled)DataFacade.AddNew((IData)newData); // Cast is needed for the DataFacade to work correctly

            if (newData.PublicationStatus != page.PublicationStatus)
            {
                newData.PublicationStatus = page.PublicationStatus;
                DataFacade.Update(newData);
            }
        }



        /// <summary>
        /// Using the given pageType this methods adds meta data instances that are missing
        /// </summary>
        /// <param name="definingPageType"></param>
        /// <param name="metaDataDefinitionName"></param>
        /// <param name="newDataTemplate"></param>
        public static void AddNewMetaDataToExistingPages(this IPageType definingPageType, string metaDataDefinitionName, IData newDataTemplate)
        {
            IPageMetaDataDefinition pageMetaDataDefinition = GetMetaDataDefinition(definingPageType.Id, metaDataDefinitionName);

            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(pageMetaDataDefinition.MetaDataTypeId);
            Type metaDataType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            IEnumerable<IPage> affectedPages = PageMetaDataFacade.GetMetaDataAffectedPagesByPageTypeId(definingPageType.Id);


        }



        private static void AddNewMetaDataToExistingPages(IEnumerable<IPage> affectedPages, string metaDataDefinitionName, Type metaDataType, IData newDataTemplate)
        {
            foreach (IPage affectedPage in affectedPages)
            {
                IData data = affectedPage.GetMetaData(metaDataDefinitionName, metaDataType);
                if (data != null) continue;

                IPublishControlled newData = DataFacade.BuildNew(metaDataType) as IPublishControlled;
                newDataTemplate.FullCopyChangedTo(newData);
                newData.PublicationStatus = GenericPublishProcessController.Draft;
                PageMetaDataFacade.AssignMetaDataSpecificValues(newData, metaDataDefinitionName, affectedPage);

                DataFacade.AddNew(newData);

                ILocalizedControlled localizedData = newData as ILocalizedControlled;
                localizedData.CultureName = UserSettings.ActiveLocaleCultureInfo.Name;
                localizedData.SourceCultureName = UserSettings.ActiveLocaleCultureInfo.Name;

                newData = DataFacade.AddNew(newData);

                if (newData.PublicationStatus != affectedPage.PublicationStatus)
                {
                    newData.PublicationStatus = affectedPage.PublicationStatus;
                    DataFacade.Update(newData);
                }
            }
        }



        /// <summary>
        /// Update an existing metadata definition with possible new label and container id
        /// </summary>
        /// <param name="definingItemId"></param>
        /// <param name="definitionName"></param>
        /// <param name="newLabel"></param>
        /// <param name="newMetaDataContainerId"></param>
        public static void UpdateDefinition(Guid definingItemId, string definitionName, string newLabel, Guid newMetaDataContainerId)
        {
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IPageMetaDataDefinition pageMetaDataDefinition = GetMetaDataDefinition(definingItemId, definitionName);
                pageMetaDataDefinition.Label = newLabel;
                pageMetaDataDefinition.MetaDataContainerId = newMetaDataContainerId;


                // Update all data
                // PageDataAssociationVisabilityWrapper wrapper = new PageDataAssociationVisabilityWrapper(pageAssociationVisability);
                // Make join expression tree with compositionType and IPage on compositionType ref to IPage 
                // and test those pages against the PageDataAssociationVisabilityWrapper (IsAllowed) and
                // Change compositionType composition description name to new name


                DataFacade.Update(pageMetaDataDefinition);

                transactionScope.Complete();
            }
        }



        /// <summary>
        /// Update an existing metadata definition with possible new label and container id
        /// </summary>
        /// <param name="definingItemId"></param>
        /// <param name="definitionName"></param>
        /// <param name="newLabel"></param>
        /// <param name="newLevels"></param>
        /// <param name="newStartLevel"></param>
        /// <param name="newMetaDataContainerId"></param>
        public static void UpdateDefinition(Guid definingItemId, string definitionName, string newLabel, int newStartLevel, int newLevels, Guid newMetaDataContainerId)
        {
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IPageMetaDataDefinition pageMetaDataDefinition = GetMetaDataDefinition(definingItemId, definitionName);
                pageMetaDataDefinition.Label = newLabel;
                pageMetaDataDefinition.MetaDataContainerId = newMetaDataContainerId;
                pageMetaDataDefinition.StartLevel = newStartLevel;
                pageMetaDataDefinition.Levels = newLevels;

                // Update all data
                // PageDataAssociationVisabilityWrapper wrapper = new PageDataAssociationVisabilityWrapper(pageAssociationVisability);
                // Make join expression tree with compositionType and IPage on compositionType ref to IPage 
                // and test those pages against the PageDataAssociationVisabilityWrapper (IsAllowed) and
                // Change compositionType composition description name to new name


                DataFacade.Update(pageMetaDataDefinition);

                transactionScope.Complete();
            }
        }


        /// <summary>
        /// Removes a metadata definition and possibly deletes all data items that are defined by it
        /// </summary>
        /// <param name="definingPage"></param>
        /// <param name="definitionName"></param>        
        /// <param name="deleteExistingMetaData"></param>
        public static void RemoveMetaDataDefinition(this IPage definingPage, string definitionName, bool deleteExistingMetaData = true)
        {
            RemoveDefinition(definingPage.GetPageIdOrNull(), definitionName, deleteExistingMetaData);
        }



        /// <summary>
        /// Removes a metadata definition and possibly deletes all data items that are defined by it
        /// </summary>
        /// <param name="definingPageType"></param>
        /// <param name="definitionName"></param>        
        /// <param name="deleteExistingMetaData"></param>
        public static void RemoveMetaDataDefinition(this IPageType definingPageType, string definitionName, bool deleteExistingMetaData = true)
        {
            RemoveDefinition(definingPageType.Id, definitionName, deleteExistingMetaData);
        }



        /// <summary>
        /// Removes a metadata definition and possibly deletes all data items that are defined by it
        /// </summary>
        /// <param name="definingItemId"></param>
        /// <param name="definitionName"></param>        
        /// <param name="deleteExistingMetaData"></param>
        public static void RemoveDefinition(Guid definingItemId, string definitionName, bool deleteExistingMetaData = true)
        {
            IPageMetaDataDefinition pageMetaDataDefinition = GetMetaDataDefinition(definingItemId, definitionName);

            IEnumerable<IPageMetaDataDefinition> otherPageMetaDataDefinitions =
                DataFacade.GetData<IPageMetaDataDefinition>().
                Where(f => f.Name == definitionName && f.Id != pageMetaDataDefinition.Id).
                Evaluate();

            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(pageMetaDataDefinition.MetaDataTypeId);
            Type metaDataType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            if (deleteExistingMetaData == true)
            {
                using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                {
                    foreach (CultureInfo localeCultureInfo in DataLocalizationFacade.ActiveLocalizationCultures)
                    {
                        using (new DataScope(localeCultureInfo))
                        {
                            using (DataScope dataScope = new DataScope(DataScopeIdentifier.Public))
                            {
                                RemoveDefinitionDeleteData(definitionName, metaDataType, otherPageMetaDataDefinitions);
                            }

                            using (DataScope dataScope = new DataScope(DataScopeIdentifier.Administrated))
                            {
                                RemoveDefinitionDeleteData(definitionName, metaDataType, otherPageMetaDataDefinitions);
                            }
                        }
                    }

                    DataFacade.Delete(pageMetaDataDefinition);

                    transactionScope.Complete();
                }
            }
            else
            {
                DataFacade.Delete(pageMetaDataDefinition);
            }
        }



        private static void RemoveDefinitionDeleteData(string definitionName, Type metaDataType, IEnumerable<IPageMetaDataDefinition> otherPageMetaDataDefintions)
        {
            IEnumerable<IData> dataToDelete = PageMetaDataFacade.GetMetaData(definitionName, metaDataType).Evaluate();

            List<IData> datasNotToDelete = new List<IData>();
            foreach (IData data in dataToDelete)
            {
                IPage page = data.GetMetaDataReferencedPage();
                bool existsINOtherScope = ExistInOtherScope(page, otherPageMetaDataDefintions);
                if (existsINOtherScope == true)
                {
                    datasNotToDelete.Add(data);
                }
            }

            dataToDelete = dataToDelete.Except(datasNotToDelete);

            DataFacade.Delete(dataToDelete);
        }



        private static bool ExistInOtherScope(IPage page, IEnumerable<IPageMetaDataDefinition> otherPageMetaDataDefinition)
        {
            foreach (IPageMetaDataDefinition pageMetaDataDefinition in otherPageMetaDataDefinition)
            {
                bool isAllowed = IsDefinitionAllowed(pageMetaDataDefinition, page);
                if (isAllowed == true) return true;
            }

            return false;
        }



        public static void RemoveAllDefinitions(Guid metaDataTypeId, bool deleteExistingMetaData = true)
        {
            IEnumerable<IPageMetaDataDefinition> pageMetaDataDefinitions =
                DataFacade.GetData<IPageMetaDataDefinition>().
                Where(f => f.MetaDataTypeId == metaDataTypeId).
                Evaluate();

            foreach (IPageMetaDataDefinition pageMetaDataDefinition in pageMetaDataDefinitions)
            {
                RemoveDefinition(pageMetaDataDefinition.DefiningItemId, pageMetaDataDefinition.Name, deleteExistingMetaData);
            }
        }


        /// <summary>
        /// Updates the given metadata item with new Id and setting the metadata defintion name and defining item id
        /// </summary>
        /// <param name="metaData"></param>
        /// <param name="metaDataDefinitionName"></param>
        /// <param name="definingPage"></param>
        public static void AssignMetaDataSpecificValues(IData metaData, string metaDataDefinitionName, IPage definingPage)
        {
            Type interfaceType = metaData.DataSourceId.InterfaceType;

            PropertyInfo idPropertyInfo = interfaceType.GetPropertiesRecursively().Where(f => f.Name == MetaDataType_IdFieldName).SingleOrDefault();
            idPropertyInfo.SetValue(metaData, Guid.NewGuid(), null);

            PropertyInfo namePropertyInfo = GetDefinitionNamePropertyInfo(interfaceType);
            namePropertyInfo.SetValue(metaData, metaDataDefinitionName, null);

            PropertyInfo pageReferencePropertyInfo = GetDefinitionPageReferencePropertyInfo(interfaceType);
            pageReferencePropertyInfo.SetValue(metaData, definingPage.Id, null);
        }



        public static PropertyInfo GetDefinitionNamePropertyInfo(Type metaDataType)
        {
            return metaDataType.GetPropertiesRecursively().Where(f => f.Name == MetaDataType_MetaDataDefinitionFieldName).Single();
        }



        public static PropertyInfo GetDefinitionPageReferencePropertyInfo(Type metaDataType)
        {
            return metaDataType.GetPropertiesRecursively().Where(f => f.Name == MetaDataType_PageReferenceFieldName).Single();
        }



        public static Guid GetMetaDataReferencedPageId(IData metaData)
        {
            PropertyInfo propertyInfo = PageMetaDataFacade.GetDefinitionPageReferencePropertyInfo(metaData.DataSourceId.InterfaceType);

            Guid pageId = (Guid)propertyInfo.GetValue(metaData, null);

            return pageId;
        }



        public static IPage GetMetaDataReferencedPage(this IData metaData)
        {
            Guid pageId = GetMetaDataReferencedPageId(metaData);

            return PageManager.GetPageById(pageId);
        }



        private static Guid GetPageIdOrNull(this IPage page)
        {
            if (page != null)
            {
                return page.Id;
            }
            else
            {
                return Guid.Empty;
            }
        }

    }
}
