using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Actions.Data;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper;
using Composite.C1Console.Elements.ElementProviderHelpers.DataGroupingProviderHelper;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.Parallelization;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Transactions;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;
using Composite.C1Console.Security.Foundation;

namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    [ActionTokenProvider(GenericPublishProcessControllerActionTypeNames.UndoUnpublishedChanges, typeof(PageElementProviderActionTokenProvider))]
    [ConfigurationElementType(typeof(PageElementProviderData))]
    internal class PageElementProvider : IHooklessElementProvider, IDataExchangingElementProvider, IDragAndDropElementProvider, ILocaleAwareElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _context;
        private AssociatedDataElementProviderHelper<IPage> _pageAssociatedHelper;


        public static ResourceHandle EditPage = GetIconHandle("page-edit-page");
        public static ResourceHandle LocalizePage = GetIconHandle("page-localize-page");
        public static ResourceHandle ManageHostNames = GetIconHandle("page-manage-host-names");
        public static ResourceHandle AddPage = GetIconHandle("page-add-page");
        public static ResourceHandle ListUnpublishedItems = GetIconHandle("page-list-unpublished-items");
        public static ResourceHandle AddSubPage = GetIconHandle("page-add-sub-page");
        public static ResourceHandle DeletePage = GetIconHandle("page-delete-page");
        public static ResourceHandle PageDraft = GetIconHandle("page-draft");
        public static ResourceHandle PageAwaitingApproval = GetIconHandle("page-awaiting-approval");
        public static ResourceHandle PageAwaitingPublication = GetIconHandle("page-awaiting-publication");
        public static ResourceHandle PagePublication = GetIconHandle("page-publication");
        public static ResourceHandle PageGhosted = GetIconHandle("page-ghosted");
        public static ResourceHandle PageDisabled = GetIconHandle("page-disabled");
        public static ResourceHandle RootOpen = GetIconHandle("page-root-open");
        public static ResourceHandle RootClosed = GetIconHandle("page-root-closed");
        public static ResourceHandle ActivateLocalization = GetIconHandle("page-activatelocalization");
        public static ResourceHandle DeactivateLocalization = GetIconHandle("page-deactivatelocalization");
        public static ResourceHandle AddDataAssociationTypeIcon = GetIconHandle("dataassociation-add-association");
        public static ResourceHandle EditDataAssociationTypeIcon = GetIconHandle("dataassociation-edit-association");
        public static ResourceHandle RemoveDataAssociationTypeIcon = GetIconHandle("dataassociation-remove-association");

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);
        private static readonly ActionGroup ViewActionGroup = new ActionGroup("View", ActionGroupPriority.PrimaryLow);
        private static readonly ActionGroup AppendedActionGroup = new ActionGroup("Common tasks", ActionGroupPriority.GeneralAppendMedium);
        private static readonly ActionGroup MetaDataAppendedActionGroup = new ActionGroup("Associated data", ActionGroupPriority.PrimaryMedium);
        internal static readonly List<PermissionType> AddWebsitePermissionTypes = new List<PermissionType> { PermissionType.Configure, PermissionType.Administrate };
        internal static readonly List<PermissionType> EditPermissionTypes = new List<PermissionType> { PermissionType.Edit };
        internal static readonly List<PermissionType> LocalizePermissionTypes = new List<PermissionType> { PermissionType.Edit };
        internal static readonly List<PermissionType> AddPermissionTypes = new List<PermissionType> { PermissionType.Add };
        internal static readonly List<PermissionType> DeletePermissionTypes = new List<PermissionType> { PermissionType.Delete };

        internal static readonly string DefaultConfigurationName = "PageElementProvider";


        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }


        public PageElementProvider()
        {
            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataEntityToken>(this);
            DataEvents<IPageType>.OnStoreChanged += new StoreEventHandler(DataEvents_IPageType_OnStoreChanged);
        }



        public ElementProviderContext Context
        {
            set
            {
                _context = value;

                _pageAssociatedHelper = new AssociatedDataElementProviderHelper<IPage>(
                    _context,
                    new PageElementProviderEntityToken(_context.ProviderName),
                    true);
            }
        }



        public bool ContainsLocalizedData
        {
            get
            {
                return true;
            }
        }


        public IEnumerable<Element> GetRoots(SearchToken searchToken)
        {
            int pages;
            using (new DataScope(DataScopeIdentifier.Administrated))
            {
                pages = PageServices.GetChildrenCount(Guid.Empty);
            }

            EntityToken entityToken = new PageElementProviderEntityToken(_context.ProviderName);

            var dragAndDropInfo = new ElementDragAndDropInfo();
            dragAndDropInfo.AddDropType(typeof(IPage));
            dragAndDropInfo.SupportsIndexedPosition = true;

            var element = new Element(_context.CreateElementHandle(entityToken), dragAndDropInfo)
            {
                VisualData = new ElementVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.RootLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.RootLabelToolTip"),
                    HasChildren = pages != 0,
                    Icon = PageElementProvider.RootClosed,
                    OpenedIcon = PageElementProvider.RootOpen
                }
            };

            var allPageTypes = DataFacade.GetData<IPageType>();

            foreach (
                var pageType in
                    allPageTypes.Where(f => f.HomepageRelation != PageTypeHomepageRelation.OnlySubPages.ToPageTypeHomepageRelationString())
                        .OrderByDescending(f=>f.Id))
            {
                element.AddAction(
                    new ElementAction(
                        new ActionHandle(new PageAddActionToken(pageType.Id, ActionIdentifier.Add, AddPermissionTypes) {DoIgnoreEntityTokenLocking = true} ))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = string.Format(StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider",
                                    "PageElementProvider.AddPageAtRootFormat"), pageType.Name),
                            ToolTip =
                                StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider",
                                    "PageElementProvider.AddPageAtRootToolTip"),
                            Icon = PageElementProvider.AddPage,
                            Disabled = false,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Add,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup,
                                ActionBundle = "AddWebsite"
                            }
                        }

                    });
            }


            element.AddAction(new ElementAction(new ActionHandle(new ViewUnpublishedItemsActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    //Label = "List unpublished Pages and Folder Data",
                    //ToolTip = "Get an overview of pages and page folder data that haven't been published yet.",
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.ViewUnpublishedItems"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.ViewUnpublishedItemsToolTip"),
                    Icon = PageElementProvider.ListUnpublishedItems,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = ViewActionGroup
                    }
                }
            });

            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AddMetaDataWorkflow"), AssociatedDataElementProviderHelper<IPage>.AddAssociatedTypePermissionTypes) { DoIgnoreEntityTokenLocking = true }))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataTypeLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataTypeToolTip"),
                    Icon = AddDataAssociationTypeIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Add,
                        IsInFolder = false,
                        IsInToolbar = false,
                        ActionGroup = MetaDataAppendedActionGroup
                    }
                }
            });

            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.EditMetaDataWorkflow"), AssociatedDataElementProviderHelper<IPage>.EditAssociatedTypePermissionTypes)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.EditMetaDataTypeLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.EditMetaDataTypeToolTip"),
                    Icon = EditDataAssociationTypeIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Edit,
                        IsInFolder = false,
                        IsInToolbar = false,
                        ActionGroup = MetaDataAppendedActionGroup
                    }
                }
            });

            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.DeleteMetaDataWorkflow"), AssociatedDataElementProviderHelper<IPage>.RemoveAssociatedTypePermissionTypes)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.RemoveMetaDataTypeLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.RemoveMetaDataTypeToolTip"),
                    Icon = RemoveDataAssociationTypeIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Delete,
                        IsInFolder = false,
                        IsInToolbar = false,
                        ActionGroup = MetaDataAppendedActionGroup
                    }
                }
            });

            // Creates a problem for the front-end "toolbar caching" mechanism - dont re-introduce this right befroe a release
            // Reason: ActionTokin is always unique for a page, making the ActionKey (hash) unique
            //if (RuntimeInformation.IsDebugBuild)
            //{
            //    element.AddAction(new ElementAction(new ActionHandle(new DisplayLocalOrderingActionToken(Guid.Empty)))
            //    {
            //        VisualData = new ActionVisualizedData
            //        {
            //            Label = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.DisplayLocalOrderingLabel"),
            //            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.DisplayLocalOrderingToolTip"),
            //            Icon = CommonElementIcons.Nodes,
            //            Disabled = false,
            //            ActionLocation = new ActionLocation
            //            {
            //                ActionType = ActionType.DeveloperMode,
            //                IsInFolder = false,
            //                IsInToolbar = false,
            //                ActionGroup = AppendedActionGroup
            //            }
            //        }
            //    });
            //}

            yield return element;
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken searchToken)
        {
            if (entityToken is AssociatedDataElementProviderHelperEntityToken)
            {
                return _pageAssociatedHelper.GetChildren((AssociatedDataElementProviderHelperEntityToken)entityToken, false);
            }

            if (entityToken is DataGroupingProviderHelperEntityToken)
            {
                return _pageAssociatedHelper.GetChildren((DataGroupingProviderHelperEntityToken)entityToken, false);
            }

            using (new DataScope(DataScopeIdentifier.Administrated))
            {
                var allChildPages = GetChildrenPages(entityToken, searchToken);
                List<KeyValuePair<PageLocaleState, IPage>> childPages = IEnumerableExtensionMethods.ToList(allChildPages, f => new KeyValuePair<PageLocaleState, IPage>(PageLocaleState.Own, f));

                List<Element> childPageElements = GetElements(childPages, entityToken is PageElementProviderEntityToken);

                return GetChildElements(entityToken, childPageElements);
            }
        }



        public IEnumerable<Element> GetForeignRoots(SearchToken searchToken)
        {
            return GetRoots(searchToken);
        }



        public IEnumerable<Element> GetForeignChildren(EntityToken entityToken, SearchToken searchToken)
        {
            if (entityToken is DataEntityToken && ((DataEntityToken)entityToken).Data == null) return new Element[] { };

            if (entityToken is AssociatedDataElementProviderHelperEntityToken)
            {
                return _pageAssociatedHelper.GetChildren((AssociatedDataElementProviderHelperEntityToken)entityToken, true);
            }

            if (entityToken is DataGroupingProviderHelperEntityToken)
            {
                return _pageAssociatedHelper.GetChildren((DataGroupingProviderHelperEntityToken)entityToken, true);
            }

            Dictionary<Guid, IPage> pages;
            using (new DataScope(DataScopeIdentifier.Administrated))
            {
                pages = GetChildrenPages(entityToken, searchToken).ToDictionary(f => f.Id);
            }


            Dictionary<Guid, IPage> foreignAdministratedPages;
            using (new DataScope(DataScopeIdentifier.Administrated, UserSettings.ForeignLocaleCultureInfo))
            {
                foreignAdministratedPages = GetChildrenPages(entityToken, searchToken).ToDictionary(f => f.Id);
            }

            Dictionary<Guid, IPage> foreignPublicPages;
            using (new DataScope(DataScopeIdentifier.Public, UserSettings.ForeignLocaleCultureInfo))
            {
                foreignPublicPages = GetChildrenPages(entityToken, searchToken).ToList().ToDictionary(f => f.Id);
            }


            Guid? itemId = GetParentPageId(entityToken);
            if (itemId.HasValue == false) return new Element[] { };

            IEnumerable<Guid> childPageIds =
              (from ps in DataFacade.GetData<IPageStructure>()
               where ps.ParentId == itemId.Value
               orderby ps.LocalOrdering
               select ps.Id).ToList();


            var resultPages = new List<KeyValuePair<PageLocaleState, IPage>>();
            foreach (Guid pageId in childPageIds)
            {
                IPage page;
                if (pages.TryGetValue(pageId, out page))
                {
                    resultPages.Add(new KeyValuePair<PageLocaleState, IPage>(PageLocaleState.Own, page));
                }
                else if (foreignAdministratedPages.TryGetValue(pageId, out page)
                         && page.IsTranslatable())
                {
                    resultPages.Add(new KeyValuePair<PageLocaleState, IPage>(PageLocaleState.ForeignActive, page));
                }
                else if (foreignPublicPages.TryGetValue(pageId, out page))
                {
                    resultPages.Add(new KeyValuePair<PageLocaleState, IPage>(PageLocaleState.ForeignActive, page));
                }
                else if (foreignAdministratedPages.TryGetValue(pageId, out page))
                {
                    resultPages.Add(new KeyValuePair<PageLocaleState, IPage>(PageLocaleState.ForeignDisabled, page));
                }
            }

            List<Element> childPageElements = GetElements(resultPages, entityToken is PageElementProviderEntityToken);

            return GetChildElements(entityToken, childPageElements);
        }



        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            var result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                DataEntityToken dataEntityToken = entityToken as DataEntityToken;

                Type type = dataEntityToken.InterfaceType;
                if (type != typeof(IPage)) continue;

                Guid pageId = (Guid) dataEntityToken.DataSourceId.GetKeyValue();
                Guid parentPageId = PageManager.GetParentId(pageId);

                if (parentPageId != Guid.Empty) continue;

                result.Add(entityToken, new EntityToken[] { new PageElementProviderEntityToken(_context.ProviderName) });
            }

            return result;
        }


        private IEnumerable<Element> GetChildElements(EntityToken entityToken, IEnumerable<Element> childPageElements)
        {
            Guid? itemId = GetParentPageId(entityToken);
            if (itemId.HasValue == false) return new Element[] { };

            List<Element> associatedChildElements;
            if (itemId.Value != Guid.Empty)
            {
                using (new DataScope(DataScopeIdentifier.Administrated))
                {
                    IPage page = PageManager.GetPageById(itemId.Value);

                    if (page != null) // null => Foreign page
                    {
                        associatedChildElements = _pageAssociatedHelper.GetChildren(page, entityToken);
                    }
                    else
                    {
                        associatedChildElements = new List<Element>();
                    }
                }
            }
            else
            {
                associatedChildElements = new List<Element>();
            }

            associatedChildElements.AddRange(childPageElements);

            return associatedChildElements;
        }



        private static Guid? GetParentPageId(EntityToken entityToken)
        {
            if (entityToken is PageElementProviderEntityToken)
            {
                return Guid.Empty;
            }

            if (entityToken is DataEntityToken)
            {
                IPage parentPage = ((DataEntityToken)entityToken).Data as IPage;

                if (parentPage == null) return null;

                return parentPage.Id;
            }

            throw new NotImplementedException();
        }



        private IEnumerable<IPage> GetChildrenPages(EntityToken entityToken, SearchToken searchToken)
        {
            Guid? itemId = GetParentPageId(entityToken);

            if (!itemId.HasValue) return new IPage[] { };


            if (!searchToken.IsValidKeyword())
            {
                return PageServices.GetChildren(itemId.Value).Evaluate().AsQueryable();
            }

            string keyword = searchToken.Keyword.ToLowerInvariant();

            var predicateItems =
                from page in DataFacade.GetData<IPage>()
                where (page.Description != null && page.Description.ToLowerInvariant().Contains(keyword)) ||
                      (page.Title != null && page.Title.ToLowerInvariant().Contains(keyword))
                select new TreeNode { Key = page.Id, ParentKey = page.GetParentId() };


            List<TreeNode> keyTree =
                DataFacade.GetData<IPage>().Select(x => new TreeNode { Key = x.Id, ParentKey = x.GetParentId() }).ToList();

            IEnumerable<TreeNode> nodes = new List<TreeNode>();
            foreach (TreeNode node in predicateItems)
            {
                nodes = nodes.Concat(GetAncestorPath(node, keyTree)).ToList();
            }

            List<Guid> pageIds = nodes.Where(x => x.ParentKey == itemId).Select(x => x.Key).Distinct().ToList();

            var pages = new List<IPage>();

            foreach (var page in DataFacade.GetData<IPage>())
            {
                if (pageIds.Contains(page.Id))
                {
                    pages.Add(page);
                }
            }

            return pages.AsQueryable();
        }


        private class TreeNode
        {
            public Guid Key { get; set; }
            public Guid ParentKey { get; set; }

        }


        private IList<TreeNode> GetAncestorPath(TreeNode key, IList<TreeNode> keys)
        {
            if (key.ParentKey == Guid.Empty)
            {
                return new List<TreeNode>() { key };
            }

            var parent = keys.First(x => x.Key == key.ParentKey);

            IList<TreeNode> ancestors = GetAncestorPath(parent, keys);
            ancestors.Add(key);
            return ancestors;
        }



        public bool OnElementDraggedAndDropped(EntityToken draggedEntityToken, EntityToken newParentEntityToken, int dropIndex, DragAndDropType dragAndDropType, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            IPage draggedPage = (IPage)((DataEntityToken)draggedEntityToken).Data;
            Verify.IsNotNull(draggedPage, "Dragged page does not exist");

            Guid newParentPageId;
            if (newParentEntityToken is PageElementProviderEntityToken)
            {
                newParentPageId = Guid.Empty;
            }
            else if (newParentEntityToken is DataEntityToken)
            {
                IPage newParentPage = (IPage)((DataEntityToken)newParentEntityToken).Data;
                newParentPageId = newParentPage.Id;
            }
            else
            {
                throw new NotImplementedException();
            }

            IPage oldParent = null;
            Guid oldParentId = draggedPage.GetParentId();
            if (oldParentId != Guid.Empty)
            {
                oldParent = DataFacade.GetData<IPage>(f => f.Id == oldParentId).Single();
            }

            if (dragAndDropType == DragAndDropType.Move)
            {
                using (var transactionScope = TransactionsFacade.CreateNewScope())
                {
                    string urlTitle = draggedPage.UrlTitle;
                    int counter = 1;

                    while (true)
                    {
                        bool urlTitleClash =
                            (from p in PageServices.GetChildren(newParentPageId).AsEnumerable()
                             where p.UrlTitle == urlTitle && p.Id != draggedPage.Id
                             select p).Any();


                        if (!urlTitleClash)
                        {
                            break;
                        }

                        urlTitle = string.Format("{0}{1}", draggedPage.UrlTitle, counter++);
                    }

                    draggedPage.UrlTitle = urlTitle;

                    // Real drop index takes into account pages from other locales
                    int realDropIndex = GetRealDropIndex(draggedPage, newParentPageId, dropIndex);

                    draggedPage.MoveTo(newParentPageId, realDropIndex, false);
                    
                    DataFacade.Update(draggedPage);

                    EntityTokenCacheFacade.ClearCache(draggedPage.GetDataEntityToken());

                    transactionScope.Complete();
                }
            }
            else
            {
                throw new NotImplementedException();
            }


            if (oldParent != null)
            {
                var oldParentParentTreeRefresher = new ParentTreeRefresher(flowControllerServicesContainer);
                oldParentParentTreeRefresher.PostRefreshMesseges(oldParent.GetDataEntityToken());
            }
            else
            {
                var oldParentspecificTreeRefresher = new SpecificTreeRefresher(flowControllerServicesContainer);
                oldParentspecificTreeRefresher.PostRefreshMesseges(new PageElementProviderEntityToken(_context.ProviderName));
            }

            var newParentParentTreeRefresher = new ParentTreeRefresher(flowControllerServicesContainer);
            newParentParentTreeRefresher.PostRefreshMesseges(newParentEntityToken);

            return true;
        }


        private static int GetRealDropIndex(IPage draggedPage, Guid newParentPageId, int dropIndex)
        {
            if (dropIndex == 0)
            {
                return 0;
            }

            List<Guid> childPageIDs = PageManager.GetChildrenIDs(newParentPageId).ToList();

            // Removing pages that does not belong to the same locale
            using (new DataScope(draggedPage.DataSourceId.PublicationScope, draggedPage.DataSourceId.LocaleScope))
            {
                childPageIDs.RemoveAll(pageId => PageManager.GetPageById(pageId) == null);
            }

            if (childPageIDs.Count == 0)
            {
                return 0;
            }

            childPageIDs = childPageIDs.OrderBy(PageManager.GetLocalOrdering).ToList();

            return PageManager.GetLocalOrdering(childPageIDs[Math.Min(childPageIDs.Count - 1, dropIndex - 1)]) + 1;
        }


        private enum PageLocaleState
        {
            Own,
            ForeignActive,
            ForeignDisabled
        }


        private List<Element> GetElements(List<KeyValuePair<PageLocaleState, IPage>> pages, bool rootPages)
        {
            //ElementDragAndDropInfo dragAndDropInfo = new ElementDragAndDropInfo(typeof(IPage));
            //dragAndDropInfo.AddDropType(typeof(IPage));
            //dragAndDropInfo.SupportsIndexedPosition = true;




            string editPageLabel = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.EditPage");
            string editPageToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.EditPageToolTip");
            string localizePageLabel = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.LocalizePage");
            string localizePageToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.LocalizePageToolTip");
            string addNewPageLabel = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.AddSubPageFormat");
            string addNewPageToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.AddSubPageToolTip");
            string deletePageLabel = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.Delete");
            string deletePageToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.DeleteToolTip");

            string urlMappingName = null;
            if (UserSettings.ForeignLocaleCultureInfo != null)
            {
                urlMappingName = DataLocalizationFacade.GetCultureTitle(UserSettings.ForeignLocaleCultureInfo);
            }

            var elements = new Element[pages.Count];
            var allPageTypes = DataFacade.GetData<IPageType>();

            ParallelFacade.For("PageElementProvider. Getting elements", 0, pages.Count, i =>
            {
                var kvp = pages[i];
                IPage page = kvp.Value;

                EntityToken entityToken = page.GetDataEntityToken();

                var dragAndDropInfo = new ElementDragAndDropInfo(typeof(IPage));
                dragAndDropInfo.AddDropType(typeof(IPage));
                dragAndDropInfo.SupportsIndexedPosition = true;

                var element = new Element(_context.CreateElementHandle(entityToken), MakeVisualData(page, kvp.Key, urlMappingName, rootPages), dragAndDropInfo);

                element.PropertyBag.Add("Uri", "~/page({0})".FormatWith(page.Id));
                element.PropertyBag.Add("ElementType", "application/x-composite-page");
                element.PropertyBag.Add("DataId", page.Id.ToString());

                if (kvp.Key == PageLocaleState.Own)
                {
                    // Normal actions
                    element.AddAction(new ElementAction(new ActionHandle(new ProxyDataActionToken(ActionIdentifier.Edit,EditPermissionTypes)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = editPageLabel,
                            ToolTip = editPageToolTip,
                            Icon = PageElementProvider.EditPage,
                            Disabled = false,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Edit,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    });

                    IPageType parentPageType = allPageTypes.First(f => f.Id == page.PageTypeId);

                    foreach (var pageType in page.GetChildPageSelectablePageTypes().OrderByDescending(pt => pt.Id == parentPageType.DefaultChildPageType))
                    {
                        element.AddAction(new ElementAction(new ActionHandle(new PageAddActionToken(pageType.Id,ActionIdentifier.Add, AddPermissionTypes) { DoIgnoreEntityTokenLocking = true }))
                        {
                            VisualData = new ActionVisualizedData
                            {
                                Label = string.Format(addNewPageLabel, pageType.Name),
                                ToolTip = pageType.Description,
                                Icon = PageElementProvider.AddPage,
                                Disabled = false,
                                ActionLocation = new ActionLocation
                                {
                                    ActionType = ActionType.Add,
                                    IsInFolder = false,
                                    IsInToolbar = true,
                                    ActionGroup = PrimaryActionGroup,
                                    ActionBundle = "AddPage"
                                }
                            }
                        });
                    }


                    element.AddAction(new ElementAction(new ActionHandle(new ProxyDataActionToken(ActionIdentifier.Delete,DeletePermissionTypes)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = deletePageLabel,
                            ToolTip = deletePageToolTip,
                            Icon = DeletePage,
                            Disabled = false,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Delete,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    });

                    _pageAssociatedHelper.AttachElementActions(element, page);
                }
                else if (kvp.Key == PageLocaleState.ForeignActive)
                {
                    // Localized actions
                    bool addAction = false;

                    Guid parentId = page.GetParentId();
                    if (parentId == Guid.Empty)
                    {
                        addAction = true;
                    }
                    else
                    {
                        using (new DataScope(DataScopeIdentifier.Administrated, UserSettings.ActiveLocaleCultureInfo))
                        {
                            bool exists = DataFacade.GetData<IPage>(f => f.Id == parentId).Any();
                            if (exists)
                            {
                                addAction = true;
                            }
                        }
                    }


                    if (addAction)
                    {
                        element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageElementProvider.LocalizePageWorkflow"), LocalizePermissionTypes)))
                        {
                            VisualData = new ActionVisualizedData
                            {
                                Label = localizePageLabel,
                                ToolTip = localizePageToolTip,
                                Icon = PageElementProvider.LocalizePage,
                                Disabled = false,
                                ActionLocation = new ActionLocation
                                {
                                    ActionType = ActionType.Edit,
                                    IsInFolder = false,
                                    IsInToolbar = true,
                                    ActionGroup = PrimaryActionGroup
                                }
                            }
                        });
                    }
                }

                elements[i] = element;
            }); 

            return new List<Element>(elements);
        }



        private ElementVisualizedData MakeVisualData(IPage page, PageLocaleState pageLocaleState, string urlMappingName, bool isRootPage)
        {

            bool hasChildren = PageServices.GetChildrenCount(page.Id) > 0 || _pageAssociatedHelper.HasChildren(page);

            var visualizedElement = new ElementVisualizedData
            {
                HasChildren = hasChildren,
                Label = (isRootPage || string.IsNullOrWhiteSpace(page.MenuTitle)) ? page.Title : page.MenuTitle,
                ToolTip = page.Description
            };

            if (pageLocaleState == PageLocaleState.Own)
            {
                if (page.PublicationStatus == GenericPublishProcessController.Draft)
                {
                    visualizedElement.Icon = PageElementProvider.PageDraft;
                    visualizedElement.OpenedIcon = PageElementProvider.PageDraft;
                }
                else if (page.PublicationStatus == GenericPublishProcessController.AwaitingApproval)
                {
                    visualizedElement.Icon = PageElementProvider.PageAwaitingApproval;
                    visualizedElement.OpenedIcon = PageElementProvider.PageAwaitingApproval;
                }
                else if (page.PublicationStatus == GenericPublishProcessController.AwaitingPublication)
                {
                    visualizedElement.Icon = PageElementProvider.PageAwaitingPublication;
                    visualizedElement.OpenedIcon = PageElementProvider.PageAwaitingPublication;
                }
                else
                {
                    visualizedElement.Icon = PageElementProvider.PagePublication;
                    visualizedElement.OpenedIcon = PageElementProvider.PagePublication;
                }
            }
            else if (pageLocaleState == PageLocaleState.ForeignActive)
            {
                visualizedElement.Icon = PageElementProvider.PageGhosted;
                visualizedElement.OpenedIcon = PageElementProvider.PageGhosted;
                visualizedElement.IsDisabled = false;
                visualizedElement.Label = string.Format("{0} ({1})", visualizedElement.Label, urlMappingName);
            }
            else
            {
                visualizedElement.Icon = PageElementProvider.PageDisabled;
                visualizedElement.OpenedIcon = PageElementProvider.PageDisabled;
                visualizedElement.IsDisabled = true;
                visualizedElement.ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", "PageElementProvider.DisabledPage");
                visualizedElement.Label = string.Format("{0} ({1})", visualizedElement.Label, urlMappingName);
            }

            return visualizedElement;
        }




        private void DataEvents_IPageType_OnStoreChanged(object sender, StoreEventArgs storeEventArgs)
        {
            EntityToken entityToken = new PageElementProviderEntityToken(_context.ProviderName);

            var parents = HookingFacade.GetHookies(entityToken);

            if (parents != null)
            {
                foreach (var parentEntityToken in parents)
                {
                    ConsoleMessageQueueFacade.Enqueue(new RefreshTreeMessageQueueItem { EntityToken = parentEntityToken }, null);
                }
            }
        }


        #region IDataExchangingElementProvider Members

        public object GetData(string name)
        {
            return "The page element provider here - you asked me for '" + name + "'";
        }

        #endregion
    }

    // Not to used on elements. This is only for determin drag'n'drop security
    internal sealed class DragAndDropActionToken : ActionToken
    {
        private static readonly PermissionType[] _permissionTypes = { PermissionType.Administrate, PermissionType.Edit };

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }
    }



    internal sealed class PageElementProviderAssembler : IAssembler<IHooklessElementProvider, HooklessElementProviderData>
    {
        public IHooklessElementProvider Assemble(IBuilderContext context, HooklessElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new PageElementProvider();
        }
    }



    [Assembler(typeof(PageElementProviderAssembler))]
    internal sealed class PageElementProviderData : HooklessElementProviderData
    {
    }

}
