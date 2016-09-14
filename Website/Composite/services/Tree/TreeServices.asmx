<%@ WebService Language="C#" Class="Composite.Services.TreeServices" %>

using System;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.Core;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Core.Routing;
using Composite.Core.Xml;
using Composite.Core.Types;
using Composite.Core.WebClient.Services.TreeServiceObjects;
using Composite.Core.WebClient.FlowMediators;
using Composite.Core.WebClient.Services.TreeServiceObjects.ExtensionMethods;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Core.Extensions;
using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_PageElementProvider;

// Search token stuff
using Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider;
using Composite.Plugins.Elements.ElementProviders.AllFunctionsElementProvider;

namespace Composite.Services
{
    [WebService(Namespace = "http://www.composite.net/ns/management")]
    [SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
    public class TreeServices : WebService
    {
        private const string LogTitle = "TreeService";

        private void RemoveDuplicateActions(List<ClientElement> listToClean)
        {
            var knownActionKeys = new List<string>();
            foreach (ClientElement clientElement in listToClean)
            {
                clientElement.Actions.RemoveAll(f => knownActionKeys.Contains(f.ActionKey));
                knownActionKeys.AddRange(clientElement.ActionKeys.Where(f => !knownActionKeys.Contains(f)));
            }
        }



        [WebMethod]
        public List<ClientElement> GetActivePerspectiveElements(string dummy)
        {
            try
            {
                string username = UserValidationFacade.GetUsername();

                List<Element> allPerspectives = ElementFacade.GetPerspectiveElementsWithNoSecurity().ToList();
                List<string> activePerspectiveEntityTokens = UserPerspectiveFacade.GetSerializedEntityTokens(username).ToList();
                activePerspectiveEntityTokens.AddRange(UserGroupPerspectiveFacade.GetSerializedEntityTokens(username));
                activePerspectiveEntityTokens = activePerspectiveEntityTokens.Distinct().ToList();

                List<ClientElement> activePerspectives = allPerspectives.Where(f => activePerspectiveEntityTokens.Contains(EntityTokenSerializer.Serialize(f.ElementHandle.EntityToken))).ToList().ToClientElementList();

                foreach (ClientElement clientElement in activePerspectives)
                {
                    clientElement.Actions.Clear();
                    clientElement.ActionKeys.Clear();
                }

                return activePerspectives;
            }
            catch (Exception ex)
            {
                Log.LogCritical(LogTitle, "Unable to get any perspectives, console will not work!");
                Log.LogCritical(LogTitle, ex);
                return new List<ClientElement>();
            }
        }

        [WebMethod]
        public List<ClientElement> GetUnpublishedElements(string dummy)
        {
            var rootElement = ElementFacade.GetPerspectiveElements(false).First();
            var allElements = GetPublishControlledDescendants(rootElement.ElementHandle);

            var publicationStates = new Dictionary<string, string>
            {
                {GenericPublishProcessController.Draft, StringResourceSystemFacade.GetString("Composite.Management", "PublishingStatus.draft")},
                {GenericPublishProcessController.AwaitingApproval, StringResourceSystemFacade.GetString("Composite.Management", "PublishingStatus.awaitingApproval")},
                {GenericPublishProcessController.AwaitingPublication, StringResourceSystemFacade.GetString("Composite.Management", "PublishingStatus.awaitingPublication")}
            };

            List<Tuple<Element, IPublishControlled>> actionRequiredPages =
                 (from element in allElements
                  let publishControlledData = (IPublishControlled)((DataEntityToken)element.ElementHandle.EntityToken).Data
                  where publishControlledData.PublicationStatus != "published"
                  select new Tuple<Element, IPublishControlled>(element, publishControlledData)).ToList();

            foreach (var actionRequiredPage in actionRequiredPages)
            {
                var propertyBag = actionRequiredPage.Item1.PropertyBag;
                var data = actionRequiredPage.Item2;

                  
                propertyBag[Texts.ViewUnpublishedItems_PageTitleLabel] = data.GetLabel();

                var publicationStatus = data.PublicationStatus;
                propertyBag[Texts.ViewUnpublishedItems_StatusLabel] = publicationStates.ContainsKey(publicationStatus)
                    ? publicationStates[publicationStatus]
                    : "Unknown State";

                var versionedData = data as IVersioned;
                if (versionedData != null)
                {
                    string versionName = versionedData.LocalizedVersionName(); // TODO: type cast?
                    if (!string.IsNullOrEmpty(versionName))
                    {
                        propertyBag[Texts.ViewUnpublishedItems_VersionLabel] = versionName;
                    }
                }

                Func<DateTime, string> toSortableString = date => String.Format("{0:s}", date);

                var changeHistory = data as IChangeHistory;
                if (changeHistory != null)
                {
                    propertyBag[Texts.ViewUnpublishedItems_DateModifiedLabel] = changeHistory.ChangeDate.ToTimeZoneDateTimeString();
                    propertyBag[Texts.ViewUnpublishedItems_DateModifiedLabel+"Sortable"] = toSortableString(changeHistory.ChangeDate);
                }
                var creationHistory = data as ICreationHistory;
                if (creationHistory != null)
                {
                    propertyBag[Texts.ViewUnpublishedItems_DateCreatedLabel] =
                        creationHistory.CreationDate.ToTimeZoneDateTimeString();
                    propertyBag[Texts.ViewUnpublishedItems_DateCreatedLabel+"Sortable"] =
                        toSortableString(creationHistory.CreationDate);
                }

                try
                {
                    if (data is IVersioned)
                    {
                        foreach (
                            var x in (data as IVersioned).GetExtraProperties() ?? new List<VersionedExtraProperties>())
                        {
                            propertyBag[x.ColumnName] = x.Value;
                            propertyBag[x.ColumnName + "Sortable"] = x.SortableValue;

                        }
                    }
                }
                catch (Exception ex)
                {
                    Log.LogCritical(LogTitle, "Problem getting extra properties from version packages");
                    Log.LogCritical(LogTitle, ex);
                    throw;
                }

            }
            return actionRequiredPages.Select(pair => pair.Item1).ToList().ToClientElementList();
        }

        IEnumerable<Element> GetPublishControlledDescendants(ElementHandle elementHandle)
        {
            HashSet<string> elementBundles = null;

            var children = ElementFacade.GetChildren(elementHandle, new SearchToken()) ?? Enumerable.Empty<Element>();
            foreach (var child in children)
            {
                if (IsPublishControlled(child))
                {
                    yield return child;
                }

                string elementBundle = child.VisualData.ElementBundle;
                if (elementBundle != null)
                {
                    elementBundles = elementBundles ?? new HashSet<string>();
                    if (elementBundles.Contains(elementBundle))
                    {
                        continue;
                    }

                    elementBundles.Add(elementBundle);
                }

                if (child.VisualData.HasChildren)
                {
                    foreach (var element in GetPublishControlledDescendants(child.ElementHandle))
                    {
                        yield return element;
                    }
                }
            }
        }

        private bool IsPublishControlled(Element v)
        {
            var entityToken = v.ElementHandle.EntityToken as DataEntityToken;
            return entityToken != null
                   && typeof (IPublishControlled).IsAssignableFrom(entityToken.InterfaceType);
        }

        [WebMethod]
        public List<ClientElement> GetElements(ClientElement clientElement)
        {
            return GetElementsBySearchToken(clientElement, null);
        }


        [WebMethod]
        public List<ClientElement> GetRootElements(string dummy)
        {
            try
            {
                return GetElementsBySearchToken(null, null);
            }
            catch (Exception ex)
            {
                Log.LogCritical(LogTitle, ex);
                throw;
            }
        }


        [WebMethod]
        public List<RefreshChildrenInfo> FindEntityToken(string rootEntityToken, string entityToken, List<RefreshChildrenParams> openedNodes)
        {
            Verify.ArgumentNotNullOrEmpty(rootEntityToken, "rootEntityToken");
            Verify.ArgumentNotNullOrEmpty(entityToken, "entityToken");
            Verify.ArgumentNotNull(openedNodes, "openedNodes");

            List<RefreshChildrenInfo> refreshingInfo = TreeServicesFacade.FindEntityToken(rootEntityToken, entityToken, openedNodes);
            if (refreshingInfo == null)
            {
                return new List<RefreshChildrenInfo>();
            }

            foreach (RefreshChildrenInfo nodeRefreshingInfo in refreshingInfo)
            {
                RemoveDuplicateActions(nodeRefreshingInfo.ClientElements);
            }
            return refreshingInfo;
        }


        [WebMethod]
        public List<RefreshChildrenInfo> GetMultipleChildren(List<RefreshChildrenParams> clientProviderNameEntityTokenPairs)
        {
            Verify.ArgumentNotNull(clientProviderNameEntityTokenPairs, "clientProviderNameEntityTokenPairs");

            List<RefreshChildrenInfo> multiChildren = TreeServicesFacade.GetMultipleChildren(clientProviderNameEntityTokenPairs);
            foreach (RefreshChildrenInfo multiChild in multiChildren)
            {
                RemoveDuplicateActions(multiChild.ClientElements);
            }
            return multiChildren;
        }



        [WebMethod]
        public List<ClientElement> GetElementsBySearchToken(ClientElement clientElement, string serializedSearchToken)
        {
            try
            {

                VerifyClientElement(clientElement);

                if (clientElement == null || string.IsNullOrEmpty(clientElement.ProviderName))
                {
                    return new List<ClientElement> { TreeServicesFacade.GetRoot() };
                }

                List<ClientElement> clientElements = TreeServicesFacade.GetChildren(clientElement.ProviderName, clientElement.EntityToken, clientElement.Piggybag, serializedSearchToken);
                RemoveDuplicateActions(clientElements);
                return clientElements;
            }
            catch (Exception ex)
            {
                Log.LogCritical(LogTitle, ex);
                throw;
            }
        }



        [WebMethod]
        public List<ClientElement> GetNamedRoots(string name)
        {
            try
            {
                return GetNamedRootsBySearchToken(name, null);
            }
            catch (Exception ex)
            {
                Log.LogCritical(LogTitle, ex);
                throw;
            }
        }



        [WebMethod]
        public List<ClientElement> GetNamedRootsBySearchToken(string name, string serializedSearchToken)
        {
            Verify.ArgumentNotNullOrEmpty(name, "name");

            List<ClientElement> clientElements = TreeServicesFacade.GetRoots(name, serializedSearchToken);
            RemoveDuplicateActions(clientElements);
            return clientElements;
        }



        [WebMethod]
        public string GetEntityTokenByPageUrl(string pageUrl)
        {
            EntityToken entityToken = UrlToEntityTokenFacade.TryGetEntityToken(pageUrl);

            return entityToken != null ? EntityTokenSerializer.Serialize(entityToken, true) : string.Empty;
        }


        [WebMethod]
        public ClientBrowserViewSettings GetBrowserUrlByEntityToken(string serializedEntityToken, bool showPublished)
        {

            var entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);

            using (new DataScope(showPublished ? PublicationScope.Published : PublicationScope.Unpublished))
            {
                var browserViewSettings = UrlToEntityTokenFacade.TryGetBrowserViewSettings(entityToken, showPublished);

                if (browserViewSettings != null)
                {
                    return new ClientBrowserViewSettings { Url = browserViewSettings.Url, ToolingOn = browserViewSettings.ToolingOn };
                }

            }

            return null;
        }


        [WebMethod]
        public List<ClientLabeledProperty> GetProperties(ClientElement clientElement)
        {
            VerifyClientElement(clientElement);
            return TreeServicesFacade.GetLabeledProperties(clientElement.ProviderName, clientElement.EntityToken, clientElement.Piggybag);
        }



        [WebMethod]
        public List<ActionResult> ExecuteSingleElementAction(ClientElement clientElement, string serializedActionToken, string consoleId)
        {
            try
            {
                VerifyClientElement(clientElement);
                TreeServicesFacade.ExecuteElementAction(clientElement.ProviderName, clientElement.EntityToken, clientElement.Piggybag, serializedActionToken, consoleId);
            }
            catch (Exception ex)
            {
                Log.LogError(LogTitle, ex);

                IConsoleMessageQueueItem errorLogEntry = new LogEntryMessageQueueItem { Sender = typeof(TreeServices), Level = Composite.Core.Logging.LogLevel.Error, Message = ex.ToString() };
                ConsoleMessageQueueFacade.Enqueue(errorLogEntry, consoleId);
                IConsoleMessageQueueItem msgBoxEntry = new MessageBoxMessageQueueItem { DialogType = DialogType.Error, Title = "Error executing action", Message = "An error occured executing the action. Please contact your system administrator or consult the log for help" };
                ConsoleMessageQueueFacade.Enqueue(msgBoxEntry, consoleId);
            }

            return new List<ActionResult> { new ActionResult { ResponseType = ActionResultResponseType.None } };
        }



        [WebMethod]
        public bool ExecuteDropElementAction(ClientElement draggedClientElement, ClientElement newParentClientElement, int dropIndex, string consoleId, bool isCopy)
        {
            try
            {
                VerifyClientElement(draggedClientElement);
                VerifyClientElement(newParentClientElement);
                return TreeServicesFacade.ExecuteElementDraggedAndDropped(draggedClientElement.ProviderName, draggedClientElement.EntityToken, draggedClientElement.Piggybag, newParentClientElement.ProviderName, newParentClientElement.EntityToken, newParentClientElement.Piggybag, dropIndex, consoleId, isCopy);
            }
            catch (Exception ex)
            {
                IConsoleMessageQueueItem errorLogEntry = new LogEntryMessageQueueItem { Sender = typeof(TreeServices), Level = Composite.Core.Logging.LogLevel.Error, Message = ex.Message };
                ConsoleMessageQueueFacade.Enqueue(errorLogEntry, consoleId);

                throw;
            }
        }


        [WebMethod]
        public List<KeyValuePair> GetSearchTokens(string dummy)
        {
            var tokens = new List<KeyValuePair>();

            var embedableMediaFileSearchToken = new MediaFileSearchToken
            {
                MimeTypes = new[] { MimeTypeInfo.Asf, MimeTypeInfo.Avi, MimeTypeInfo.Director, MimeTypeInfo.Flash, MimeTypeInfo.QuickTime, MimeTypeInfo.Wmv }
            };
            tokens.Add(new KeyValuePair("MediaFileElementProvider.EmbeddableMedia", embedableMediaFileSearchToken.Serialize()));

            var imageMediaFileSearchToken = new MediaFileSearchToken
            {
                MimeTypes = new[] { MimeTypeInfo.Gif, MimeTypeInfo.Jpeg, MimeTypeInfo.Png, MimeTypeInfo.Bmp, MimeTypeInfo.Svg }
            };
            tokens.Add(new KeyValuePair("MediaFileElementProvider.WebImages", imageMediaFileSearchToken.Serialize()));

            var writableMediaFolderSearchToken = new MediaFileSearchToken { MimeTypes = new[] { "." } };
            tokens.Add(new KeyValuePair("MediaFileElementProvider.WritableFolders", writableMediaFolderSearchToken.Serialize()));

            var xhtmlDocumentFunctionsSearchToken = AllFunctionsElementProviderSearchToken.Build(new[] { typeof(XhtmlDocument), typeof(System.Web.UI.Control) });
            tokens.Add(new KeyValuePair("AllFunctionsElementProvider.VisualEditorFunctions", xhtmlDocumentFunctionsSearchToken.Serialize()));

            var xsltFunctionCallsSearchToken = AllFunctionsElementProviderSearchToken.Build(new[] { typeof(XhtmlDocument), typeof(IEnumerable<XElement>), typeof(XElement) });
            tokens.Add(new KeyValuePair("AllFunctionsElementProvider.XsltFunctionCall", xsltFunctionCallsSearchToken.Serialize()));

            return tokens;
        }

        [WebMethod]
        public bool ExecuteInlineElementAction(string serializedScriptAction, string consoleId)
        {
            InlineScriptActionFacade.ExecuteElementScriptAction(serializedScriptAction, consoleId);

            return true;
        }



        private void VerifyClientElement(ClientElement clientElement)
        {
            if (clientElement == null) return;

            if (!HashSigner.ValidateSignedHash(clientElement.Piggybag, HashValue.Deserialize(clientElement.PiggybagHash)))
            {
                throw new System.Security.SecurityException("Data has been tampered");
            }
        }

        [WebMethod]
        public List<KeyValuePair> GetDefaultEntityTokens(string dummy)
        {
            var tokens = new List<KeyValuePair>();
            using (new DataConnection())
            {
                var homepage = PageServices.GetChildren(Guid.Empty).FirstOrDefault();
                if (homepage != null)
                {
                    tokens.Add(
                        new KeyValuePair(
                            EntityTokenSerializer.Serialize(AttachingPoint.ContentPerspective.EntityToken, true),
                            EntityTokenSerializer.Serialize(homepage.GetDataEntityToken(), true)
                            )
                        );
                }
                tokens.Add(
                    new KeyValuePair(
                        EntityTokenSerializer.Serialize(AttachingPoint.SystemPerspective.EntityToken, true),
                        EntityTokenSerializer.Serialize(new Composite.Plugins.Elements.ElementProviders.PackageElementProvider.PackageElementProviderAvailablePackagesFolderEntityToken(), true)
                        )
                    );


            }
            return tokens;
        }

        [WebMethod]
        public List<string> GetCurrentLocaleEntityTokens(List<string> serializedEntityTokens)
        {
            var currentLocaleEntityTokens = new List<string>();
            foreach (var serializedEntityToken in serializedEntityTokens)
            {
                try
                {
                    var entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);
                    if (entityToken is DataEntityToken)
                    {
                        var dataItem = (entityToken as DataEntityToken).Data;
                        if (dataItem is ILocalizedControlled)
                        {
                            var dataItemFromTheotherLocale = DataFacade.GetDataFromOtherLocale(dataItem, UserSettings.ActiveLocaleCultureInfo).ToList();

                            if (!dataItemFromTheotherLocale.Any() && UserSettings.ForeignLocaleCultureInfo != null)
                            {
                                dataItemFromTheotherLocale = DataFacade.GetDataFromOtherLocale(dataItem, UserSettings.ForeignLocaleCultureInfo).ToList();
                            }

                            if (dataItemFromTheotherLocale.Count == 1)
                            {
                                var foreignEntityToken = dataItemFromTheotherLocale[0].GetDataEntityToken();

                                currentLocaleEntityTokens.Add(EntityTokenSerializer.Serialize(foreignEntityToken, true));
                                continue;
                            }
                        }
                    }
                    currentLocaleEntityTokens.Add(serializedEntityToken);
                }
                catch
                {
                }
            }
            return currentLocaleEntityTokens;
        }

        [WebMethod]
        public List<string> GetAllParents(string serializedEntityToken)
        {
            var entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);
            var graph = new RelationshipGraph(entityToken, RelationshipGraphSearchOption.Both, true);
            var tokens = new HashSet<EntityToken>();

            foreach (var level in graph.Levels)
            {
                tokens.UnionWith(level.AllEntities);
            }

            return tokens.Select(d => EntityTokenSerializer.Serialize(d, true)).ToList();
        }


        [WebMethod]
        public string GetCompositeUrlLabel(string path)
        {
            var relativePath = Regex.Replace(path, @"^http://[\w\.\d:]+/", "/");
            var mediaUrlData = MediaUrls.ParseUrl(relativePath);

            using (var conn = new DataConnection())
            {
                if (mediaUrlData != null)
                {
                    var mediaId = mediaUrlData.MediaId;
                    var store = mediaUrlData.MediaStore;

                    var matchingMedia = conn.Get<IMediaFile>().FirstOrDefault(media => media.Id == mediaId && media.StoreId == store);

                    if (matchingMedia != null)
                    {
                        string label = string.Format("{0} ({1}:{2})", matchingMedia.FileName, matchingMedia.StoreId, matchingMedia.FolderPath);
                        return label;
                    }
                }

                var pageUrlData = PageUrls.ParseUrl(relativePath);
                if (pageUrlData != null)
                {
                    var pageNode = conn.SitemapNavigator.GetPageNodeById(pageUrlData.PageId);

                    if (pageNode != null)
                    {
                        string label = string.Format("{0} ( {1} )", pageNode.Title, RemovePreviewMarker(pageNode.Url));
                        return label;
                    }
                }

                IDataReference dataReference = InternalUrls.TryParseInternalUrl(path);
                if (dataReference != null)
                {
                    var data = dataReference.Data;
                    if (data != null)
                    {
                        string label = data.GetLabel();

                        if (label != null)
                        {
                            var dataPageUrlData = DataUrls.TryGetPageUrlData(dataReference);
                            var dataPublicUrl = dataPageUrlData != null ? PageUrls.BuildUrl(dataPageUrlData) : null;

                            if (dataPublicUrl != null)
                            {
                                label += " ( " + RemovePreviewMarker(dataPublicUrl) + " )";
                            }

                            return label;
                        }
                    }
                }
            }

            return path;
        }

        private static string RemovePreviewMarker(string url)
        {
            return url.Replace("/c1mode(unpublished)", "");
        }

        [WebMethod]
        public string GetCompositeEntityToken(string path)
        {
            var relativePath = Regex.Replace(path, @"^http://[\w\.\d:]+/", "/");
            var mediaUrlData = MediaUrls.ParseUrl(relativePath);

            using (var connection = new DataConnection())
            {
                if (mediaUrlData != null)
                {
                    var mediaId = mediaUrlData.MediaId;
                    var store = mediaUrlData.MediaStore;

                    var matchingMedia = connection.Get<IMediaFile>().FirstOrDefault(media => media.Id == mediaId && media.StoreId == store);

                    if (matchingMedia != null)
                    {
                        return EntityTokenSerializer.Serialize(matchingMedia.GetDataEntityToken(), true);
                    }
                }

                var pageUrlData = PageUrls.ParseUrl(relativePath);
                if (pageUrlData != null)
                {
                    var page = PageManager.GetPageById(pageUrlData.PageId);

                    if (page != null)
                    {
                        return EntityTokenSerializer.Serialize(page.GetDataEntityToken(), true);
                    }
                }

                IDataReference dataReference = InternalUrls.TryParseInternalUrl(path);
                if (dataReference != null)
                {
                    var data = dataReference.Data;
                    if (data != null)
                    {
                        return EntityTokenSerializer.Serialize(data.GetDataEntityToken(), true);
                    }
                }
            }

            return null;
        }

        [WebMethod]
        public string GetWidgetEntityToken(string name)
        {
            Functions.IWidgetFunction function;
            if (Functions.FunctionFacade.TryGetWidgetFunction(out function, name))
            {
                return EntityTokenSerializer.Serialize(function.EntityToken, true);
            }

            return null;
        }
    }
}