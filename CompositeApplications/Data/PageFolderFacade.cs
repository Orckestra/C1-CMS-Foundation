using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Transactions;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.Types;
using Composite.Linq;
using Composite.Transactions;
using Composite.Types;


namespace Composite.Data
{
    public static class PageFolderFacade
    {
        private static readonly string PageFolderType_IdFieldName = "Id";
        private static readonly string PageFolderType_PageReferenceFieldName = "IPageIdForeignKey";


        /// <summary>
        /// Returns all possible page folder types. This is NOT all types that only have been defined on any pages
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<Type> GetAllFolderTypes()
        {
            return DataAssociationRegistry.GetAssociationTypes(typeof(IPage), DataAssociationType.Aggregation);
        }



        /// <summary>
        /// Returns true if the given page has any folder definitions defined on it
        /// </summary>
        /// <param name="page"></param>
        /// <returns></returns>
        public static bool HasFolderDefinitions(this IPage page)
        {
            return
                DataFacade.GetData<IPageFolderDefinition>().
                Where(f => f.PageId == page.Id).
                Any();
        }



        /// <summary>
        /// Returns (if any) folder types that are defined on the given page
        /// </summary>
        /// <param name="page"></param>
        /// <returns></returns>
        public static IEnumerable<Type> GetDefinedFolderTypes(this IPage page)
        {
            IEnumerable<Guid> typeIds =
                DataFacade.GetData<IPageFolderDefinition>().
                Where(f => f.PageId == page.Id).
                Select(f => f.FolderTypeId).
                Evaluate();

            foreach (Guid typeId in typeIds)
            {
                DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeId);

                yield return TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);
            }
        }



        /// <summary>
        /// Returns the id of a folder definition given the page and folder type
        /// </summary>
        /// <param name="page"></param>
        /// <param name="folderType"></param>
        /// <returns></returns>
        public static Guid GetFolderDefinitionId(this IPage page, Type folderType)
        {
            return GetFolderDefinitionId(page, folderType.GetImmutableTypeId());
        }



        /// <summary>
        /// Returns the id (or empty guid if non exists) of a folder definition given the page and folder type id
        /// </summary>
        /// <param name="page"></param>
        /// <param name="folderTypeId"></param>
        /// <returns></returns>
        public static Guid GetFolderDefinitionId(this IPage page, Guid folderTypeId)
        {
            return
                DataFacade.GetData<IPageFolderDefinition>().
                Where(f => f.PageId == page.Id && f.FolderTypeId == folderTypeId).
                Select(f => f.Id).
                SingleOrDefault();
        }



        public static bool HasFolderData(this IPage page, Type pageFolderType)
        {
            //TODO: Consider caching here            
            ParameterExpression parameterExpression = Expression.Parameter(pageFolderType);

            LambdaExpression lambdaExpression = Expression.Lambda(
                Expression.Equal(
                    Expression.Property(
                        parameterExpression,
                        PageMetaDataFacade.GetDefinitionPageReferencePropertyInfo(pageFolderType)
                    ),
                    Expression.Constant(
                        page.Id,
                        typeof(Guid)
                    )
                ),
                parameterExpression
            );

            Expression whereExpression = ExpressionCreator.Where(DataFacade.GetData(pageFolderType).Expression, lambdaExpression);

            //TODO: Possible optimization here
            return DataFacade.GetData(pageFolderType).Provider.CreateQuery(whereExpression).ToEnumerableOfObjects().Any();
        }


        /// <summary>
        /// Returns all folder data given the page and folder data type
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageFolderType"></param>
        /// <returns></returns>
        public static IEnumerable<IData> GetFolderData(this IPage page, Type pageFolderType)
        {
            return GetFolderData(page.Id, pageFolderType);
        }

        /// <summary>
        /// Returns all folder data given the page id and folder data type
        /// </summary>
        /// <param name="pageId"></param>
        /// <param name="pageFolderType"></param>
        /// <returns></returns>
        public static IEnumerable<IData> GetFolderData(Guid pageId, Type pageFolderType)
        {
            //TODO: Consider caching here            
            ParameterExpression parameterExpression = Expression.Parameter(pageFolderType);

            LambdaExpression lambdaExpression = Expression.Lambda(
                Expression.Equal(
                    Expression.Property(
                        parameterExpression,
                        PageMetaDataFacade.GetDefinitionPageReferencePropertyInfo(pageFolderType)
                    ),
                    Expression.Constant(
                        pageId,
                        typeof(Guid)
                    )
                ),
                parameterExpression
            );

            Expression whereExpression = ExpressionCreator.Where(DataFacade.GetData(pageFolderType).Expression, lambdaExpression);

            IEnumerable<IData> datas = ExpressionHelper.GetCastedObjects<IData>(pageFolderType, whereExpression);

            return datas;
        }



        /// <summary>
        /// Returns all folder data for all defined folder types for the given page
        /// </summary>
        /// <param name="page"></param>
        /// <returns></returns>
        public static IEnumerable<IData> GetFolderData(this IPage page)
        {
            foreach (Type folderType in page.GetDefinedFolderTypes())
            {
                foreach (IData data in page.GetFolderData(folderType))
                {
                    yield return data;
                }
            }
        }




        /// <summary>
        /// Returns the referenced page
        /// </summary>
        /// <param name="folderData"></param>
        /// <returns></returns>
        public static IPage GetReferencedPage(IData folderData)
        {
            Guid pageId = (Guid)GetDefinitionPageReferencePropertyInfo(folderData.DataSourceId.InterfaceType).GetValue(folderData, null);

            return PageManager.GetPageById(pageId);
        }



        /// <summary>
        /// Adds a data folder type to the given page
        /// </summary>
        /// <param name="page"></param>
        /// <param name="dataFolderType"></param>
        // Overload
        public static void AddFolderDefinition(this IPage page, Type dataFolderType)
        {
            AddFolderDefinition(page, dataFolderType.GetImmutableTypeId());
        }



        /// <summary>
        /// Adds a data folder type to the given page
        /// </summary>
        /// <param name="page"></param>
        /// <param name="dataFolderTypeId"></param>
        public static void AddFolderDefinition(this IPage page, Guid dataFolderTypeId)
        {
            IPageFolderDefinition pageFolderDefinition = DataFacade.BuildNew<IPageFolderDefinition>();
            pageFolderDefinition.Id = Guid.NewGuid();
            pageFolderDefinition.PageId = page.Id;
            pageFolderDefinition.FolderTypeId = dataFolderTypeId;

            DataFacade.AddNew<IPageFolderDefinition>(pageFolderDefinition);
        }



        /// <summary>
        /// Removes a data folder type for the given page
        /// </summary>
        /// <param name="page"></param>
        /// <param name="dataFolderType"></param>
        /// <param name="deleteExistingFolderData"></param>
        public static void RemoveFolderDefinition(this IPage page, Type dataFolderType, bool deleteExistingFolderData = true)
        {
            RemoveFolderDefinition(page, dataFolderType.GetImmutableTypeId(), deleteExistingFolderData);
        }



        /// <summary>
        /// Removes a data folder type for the given page
        /// </summary>
        /// <param name="page"></param>
        /// <param name="dataFolderTypeId"></param>
        /// <param name="deleteExistingFolderData"></param>
        public static void RemoveFolderDefinition(this IPage page, Guid dataFolderTypeId, bool deleteExistingFolderData = true)
        {
            if (deleteExistingFolderData == true)
            {
                using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                {
                    foreach (CultureInfo cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures)
                    {
                        using (new DataScope(cultureInfo))
                        {
                            using (new DataScope(DataScopeIdentifier.Public))
                            {
                                foreach (Type definedPageFolderType in page.GetDefinedFolderTypes())
                                {
                                    IEnumerable<IData> dataset = page.GetFolderData(definedPageFolderType);
                                    DataFacade.Delete(dataset);
                                }
                            }

                            using (new DataScope(DataScopeIdentifier.Administrated))
                            {
                                foreach (Type definedPageFolderType in page.GetDefinedFolderTypes())
                                {
                                    IEnumerable<IData> dataset = page.GetFolderData(definedPageFolderType);
                                    DataFacade.Delete(dataset);
                                }
                            }
                        }
                    }

                    IPageFolderDefinition pageFolderDefinition =
                        DataFacade.GetData<IPageFolderDefinition>().
                        Where(f => f.PageId == page.Id && f.FolderTypeId == dataFolderTypeId).
                        Single();

                    DataFacade.Delete<IPageFolderDefinition>(pageFolderDefinition);

                    transactionScope.Complete();
                }
            }
            else
            {
                IPageFolderDefinition pageFolderDefinition =
                    DataFacade.GetData<IPageFolderDefinition>().
                    Where(f => f.PageId == page.Id && f.FolderTypeId == dataFolderTypeId).
                    Single();

                DataFacade.Delete<IPageFolderDefinition>(pageFolderDefinition);
            }
        }



        /// <summary>
        /// Removes all data folder definitions given the folder type id
        /// </summary>
        /// <param name="dataFolderTypeId"></param>
        public static void RemoveAllFolderDefinitions(Guid dataFolderTypeId, bool deleteExistingFolderData = true)
        {
            if (deleteExistingFolderData == true)
            {
                IEnumerable<IPageFolderDefinition> pageFolderDefinitions =
                    DataFacade.GetData<IPageFolderDefinition>().
                    Where(f => f.FolderTypeId == dataFolderTypeId);

                foreach (IPageFolderDefinition pageFolderDefinition in pageFolderDefinitions)
                {
                    IPage page = PageManager.GetPageById(pageFolderDefinition.Id);

                    page.RemoveFolderDefinition(pageFolderDefinition.FolderTypeId);
                }

                DataFacade.Delete<IPageFolderDefinition>(pageFolderDefinitions);
            }
            else
            {
                IEnumerable<IPageFolderDefinition> pageFolderDefinitions =
                    DataFacade.GetData<IPageFolderDefinition>().
                    Where(f => f.FolderTypeId == dataFolderTypeId);

                DataFacade.Delete<IPageFolderDefinition>(pageFolderDefinitions);
            }
        }



        /// <summary>
        /// Updates the given page folder item with new Id and setting the page folder defintion id and defining item id
        /// </summary>
        /// <param name="data"></param>
        /// <param name="metaDataDefinitionName"></param>
        /// <param name="definingPage"></param>
        public static void AssignFolderDataSpecificValues(IData pageFolderData, IPage definingPage)
        {
            Type interfaceType = pageFolderData.DataSourceId.InterfaceType;
            PropertyInfo idPropertyInfo = interfaceType.GetPropertiesRecursively().Where(f => f.Name == PageFolderType_IdFieldName).SingleOrDefault();
            idPropertyInfo.SetValue(pageFolderData, Guid.NewGuid(), null);

            PropertyInfo pageReferencePropertyInfo = GetDefinitionPageReferencePropertyInfo(interfaceType);
            pageReferencePropertyInfo.SetValue(pageFolderData, definingPage.Id, null);
        }



        public static PropertyInfo GetDefinitionPageReferencePropertyInfo(Type pageFolderType)
        {
            return pageFolderType.GetPropertiesRecursively().Where(f => f.Name == PageFolderType_PageReferenceFieldName).Single();
        }
    }
}
