using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.RegularExpressions;
using Composite.C1Console.Security;
using Composite.C1Console.Events;
using Composite.C1Console.Trees;
using Composite.C1Console.Users;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.Hierarchy;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Plugins.Commands.ConsoleCommandHandlers;

namespace Composite.C1Console.Actions
{
    /// <summary>
    /// Action to duplicate data
    /// </summary>
    [ActionExecutor(typeof(DuplicateActionExecuter))]
    public sealed class DuplicateActionToken : ActionToken
    {
        /// <exclude />
        public override IEnumerable<PermissionType> PermissionTypes => new[] { PermissionType.Add };

        /// <exclude />
        public static ActionToken Deserialize(string serializedData)
        {
            return new DuplicateActionToken();
        }
    }

    internal class DuplicateActionExecuter : IActionExecutor
    {
        /// <exclude />
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            return Execute(EntityTokenSerializer.Serialize(entityToken), ActionTokenSerializer.Serialize(actionToken), actionToken, flowControllerServicesContainer);
        }

        /// <exclude />
        public FlowToken Execute(string serializedEntityToken, string serializedActionToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            var dataEntityToken = (DataEntityToken)EntityTokenSerializer.Deserialize(serializedEntityToken);

            var data = dataEntityToken.Data;

            Verify.IsNotNull(data, "Failed to get the data from an entity token");

            using (new DataScope(DataScopeIdentifier.Administrated))
            {
                var treeRefresher = new AddNewTreeRefresher(dataEntityToken,flowControllerServicesContainer);

                var newData = (IData)StaticReflection.GetGenericMethodInfo(() => CloneData((IData)null))
                    .MakeGenericMethod(data.DataSourceId.InterfaceType).Invoke(this, new object[] { data });

                var consoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

                ConsoleCommandHelper.SelectConsoleElementWithoutPerspectiveChange(consoleId, newData.GetDataEntityToken());

                treeRefresher.PostRefreshMessages(dataEntityToken);
            }

            return null;
        }

        private static readonly Func<IPage, bool> IsRootPage = f => f.GetParent() == null;

        private IData CloneData<T>(T data) where T : class, IData
        {
            IData newdata = DataFacade.BuildNew<T>();

            var dataProperties = typeof(T).GetPropertiesRecursively();

            foreach (var propertyInfo in dataProperties.Where(f => f.CanWrite))
            {
                if (typeof(T).GetPhysicalKeyProperties().Contains(propertyInfo) && propertyInfo.PropertyType == typeof(Guid))
                {
                    propertyInfo.SetValue(newdata, Guid.NewGuid());
                }
                else
                {
                    propertyInfo.SetValue(newdata, propertyInfo.GetValue(data));
                }

            }

            var page = data as IPage;
            if (page != null)
            {
                if (IsRootPage(page))
                {
                    SetNewValue<T>(page, newdata, dataProperties.First(p => p.Name == nameof(IPage.Title)));
                }
                else if (!SetNewValue<T>(page, newdata, dataProperties.First(p => p.Name == nameof(IPage.MenuTitle))))
                {
                    SetNewValue<T>(page, newdata, dataProperties.First(p => p.Name == nameof(IPage.Title)));
                }

                SetNewValue<T>(page, newdata, dataProperties.First(p => p.Name == nameof(IPage.UrlTitle)), isUrl:true);
                
                PageInsertPosition.After(page.Id).CreatePageStructure(newdata as IPage, page.GetParentId());

            }
            else
            {
                var labelProperty = typeof(T).GetProperty(
                    DynamicTypeReflectionFacade.GetLabelPropertyName(typeof(T)));

                if (labelProperty != null && labelProperty.PropertyType == typeof(string))
                {
                    SetNewValue<T>(data, newdata, labelProperty);
                }
            }

            if (newdata is IPublishControlled)
            {
                (newdata as IPublishControlled).PublicationStatus = GenericPublishProcessController.Draft;
            }
            if (newdata is ILocalizedControlled)
            {
                (newdata as ILocalizedControlled).SourceCultureName = UserSettings.ActiveLocaleCultureInfo.Name;
            }

            newdata = DataFacade.AddNew(newdata);

            if (data is IPage)
            {
                CopyPageData(data as IPage, newdata as IPage);
            }

            return newdata;
        }

        private bool SetNewValue<T>( IData sourceData, IData newData, PropertyInfo property
            ,bool isUrl=false) where T : class, IData
        {
            var value = isUrl? (string)property.GetValue(sourceData):
                                GetStringWithoutCopyOf((string) property.GetValue(sourceData));

            var storeFieldType = property.GetCustomAttributes(typeof(StoreFieldTypeAttribute),true).FirstOrDefault();
            var maxLength = (storeFieldType as StoreFieldTypeAttribute)?.StoreFieldType.MaximumLength;

            if (!isUrl && value.IsNullOrEmpty())
                return false;
            for (var count = 1;; count++)
            {
                var str = GenerateCopyOfName(value, count, maxLength, isUrl);
                if (DataFacade.GetData<T>().Any(GetLambda<T>(property, str))) continue;
                property.SetValue(newData, str);
                break;
            }
            return true;
        }

        private Expression<Func<T, bool>> GetLambda<T>(PropertyInfo labelProperty, string labelValue)
        {
            var p = Expression.Parameter(typeof(T));
            var propertry = Expression.Property(p, labelProperty.Name);
            var body = Expression.Equal(propertry, Expression.Constant(labelValue));
            return Expression.Lambda<Func<T, bool>>(body, p);
        }

        private static string GetStringWithoutCopyOf(string source)
        {
            Regex regexInstance = new Regex(StringResourceSystemFacade.GetString("Composite.Management", "Duplication.Text").Replace("{0}","").Replace("{count}", @"(\(.*\))*"));
            return regexInstance.Replace(source, "");

        }

        private string GenerateCopyOfName(string source, int count, int? maxLength, bool isUrl=false )
        {
            if (isUrl)
            {
                if (!source.IsNullOrEmpty())
                {
                    return string.Join("-", source, count.ToString());
                }
                var numberInString = count == 1 ? "" : count.ToString();
                return $"Copy{numberInString}-of";
            }

            Func <int, string> copyText = i => StringResourceSystemFacade.GetString("Composite.Management", "Duplication.Text")
                                    .Replace("{count}", i == 1 ? "" : $"({i})");
            var result = string.Format(copyText(count), source);
            return (maxLength!=null)?result.Substring(0, Math.Min(result.Length, maxLength.Value)):result;
        }

        internal void CopyPageData(IPage sourcePage, IPage newPage)
        {
            Guid sourcePageId = sourcePage.Id;
            Guid newPageId = newPage.Id;
            Guid sourceVersionId = sourcePage.VersionId;
            Guid newVersionId = newPage.VersionId;

            var newPlaceholders = new List<IPagePlaceholderContent>();
            var placeholders =
                DataFacade.GetData<IPagePlaceholderContent>().
                    Where(ph => ph.PageId == sourcePageId
                                 && ph.VersionId == sourceVersionId)
                    .ToList();

            foreach (var placeholderContent in placeholders)
            {
                var newPlaceholder = DataFacade.BuildNew<IPagePlaceholderContent>();

                newPlaceholder.PageId = newPageId;
                newPlaceholder.PlaceHolderId = placeholderContent.PlaceHolderId;
                newPlaceholder.Content = placeholderContent.Content;
                newPlaceholder.VersionId = newVersionId;

                newPlaceholders.Add(newPlaceholder);
            }
            DataFacade.AddNew<IPagePlaceholderContent>(newPlaceholders);

            var sourceMetaData = sourcePage.GetMetaData().Cast<IPageMetaData>()
                                    .Where(d => d.VersionId == sourceVersionId);
            foreach (var metaDataItem in sourceMetaData)
            {
                var metaDataType = metaDataItem.DataSourceId.InterfaceType;
                var typeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(metaDataType.GetImmutableTypeId());
                var definition = PageMetaDataFacade.GetMetaDataDefinition(sourcePageId, metaDataItem.GetTypeTitle());

                var newDataItem = (IPageMetaData)DataFacade.BuildNew(metaDataType);

                var properties = metaDataType.GetPropertiesRecursively().ToDictionary(p => p.Name);
                foreach (var field in typeDescriptor.Fields)
                {
                    var propertyInfo = properties[field.Name];
                    propertyInfo.SetValue(newDataItem, propertyInfo.GetValue(metaDataItem));
                }

                newDataItem.VersionId = newVersionId;
                newDataItem.Id = Guid.NewGuid();
                newDataItem.PageId = newPageId;
                newDataItem.PublicationStatus = GenericPublishProcessController.Draft;
                newDataItem = (IPageMetaData)DataFacade.AddNew((IData)newDataItem);

                if (definition != null)
                {
                    string title = newDataItem.GetTypeTitle();
                    newPage.AddMetaDataDefinition(title, title, newDataItem.GetImmutableTypeId(),
                        definition.MetaDataContainerId);
                }
            }

            List<string> selectableTreeIds = TreeFacade.AllTrees.Where(
                tree => tree.HasAttachmentPoints(sourcePage.GetDataEntityToken()))
                .Where(tree => !tree.HasAttachmentPoints(newPage.GetDataEntityToken()))
                .Select(tree => tree.TreeId).ToList();

            foreach (var selectableTreeId in selectableTreeIds)
            {
                TreeFacade.AddPersistedAttachmentPoint(selectableTreeId, newPage.DataSourceId.InterfaceType,
                 newPage.DataSourceId.GetKeyValue());
            }
            
            foreach (var dataFolderType in sourcePage.GetDefinedFolderTypes())
            {
                newPage.AddFolderDefinition(dataFolderType);
            }



        }
    }


}
