using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Text;
using Composite.C1Console.Actions;
using Composite.C1Console.Actions.Data;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.ElementProviderHelpers.DataGroupingProviderHelper;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Core.Serialization;
using Composite.Core.Types;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_GeneratedDataTypesElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    #region ToXml
    internal sealed class DataTypeDescriptorToXmlActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            GeneratedDataTypesElementProviderTypeEntityToken castedEntityToken = (GeneratedDataTypesElementProviderTypeEntityToken)entityToken;

            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            string url = string.Format("{0}?TypeName={1}", UrlUtils.ResolveAdminUrl("content/views/datatypedescriptor/ToXml.aspx"), System.Web.HttpUtility.UrlEncode(castedEntityToken.SerializedTypeName));

            ConsoleMessageQueueFacade.Enqueue(
                new OpenViewMessageQueueItem
                {
                    EntityToken = EntityTokenSerializer.Serialize(entityToken, true),
                    Url = url,
                    ViewId = Guid.NewGuid().ToString(),
                    ViewType = ViewType.Main,
                    Label = GeneratedDataTypesElementProvider.GetText("DataTypeDescriptorToXmlLabel")
                },
                currentConsoleId
            );

            return null;
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [ActionExecutor(typeof(DataTypeDescriptorToXmlActionExecutor))]
    public sealed class DataTypeDescriptorToXmlActionToken : ActionToken
    {
        private static readonly PermissionType[] _permissionTypes = { PermissionType.Administrate };

        /// <exclude />
        public override IEnumerable<PermissionType> PermissionTypes => _permissionTypes;

        /// <exclude />
        public override string Serialize()
        {
            return "DataTypeDescriptorToXml";
        }

        /// <exclude />
        public static ActionToken Deserialize(string serializedData)
        {
            return new DataTypeDescriptorToXmlActionToken();
        }
    }
    #endregion



    [ConfigurationElementType(typeof(GeneratedDataTypesElementProviderData))]
    internal sealed class GeneratedDataTypesElementProvider : IHooklessElementProvider, ILocaleAwareElementProvider
    {
        private static readonly string LogTitle = typeof (GeneratedDataTypesElementProvider).Name;

        private ElementProviderContext _providerContext;
        private readonly bool _websiteItemsView;
        private DataGroupingProviderHelper _dataGroupingProviderHelper;


        /// <exclude />
        public static ResourceHandle RootOpen => GetIconHandle("generated-root-open");

        /// <exclude />
        public static ResourceHandle RootClosed => GetIconHandle("generated-root-closed");

        /// <exclude />
        public static ResourceHandle DynamicDataTypeIconOpen => GetIconHandle("generated-type-open");

        /// <exclude />
        public static ResourceHandle DynamicDataTypeIconClosed => GetIconHandle("generated-type-closed");

        /// <exclude />
        public static ResourceHandle InterfaceOpen => GetIconHandle("data-interface-open");

        /// <exclude />
        public static ResourceHandle InterfaceClosed => GetIconHandle("data-interface-closed");

        /// <exclude />
        public static ResourceHandle AddDataTypeIcon => GetIconHandle("generated-type-add");

        /// <exclude />
        public static ResourceHandle EditDataTypeIcon => GetIconHandle("generated-type-edit");

        /// <exclude />
        public static ResourceHandle DeleteDataTypeIcon => GetIconHandle("generated-type-delete");

        /// <exclude />
        public static ResourceHandle LocalizeDataTypeIcon => GetIconHandle("generated-type-localize");

        /// <exclude />
        public static ResourceHandle DelocalizeDataTypeIcon => GetIconHandle("generated-type-delocalize");

        /// <exclude />
        public static ResourceHandle AddDataIcon => GetIconHandle("generated-type-data-add");

        /// <exclude />
        public static ResourceHandle DuplicateDataIcon => GetIconHandle("copy");

        /// <exclude />
        public static ResourceHandle EditDataIcon => GetIconHandle("generated-type-data-edit");

        /// <exclude />
        public static ResourceHandle DeleteDataIcon => GetIconHandle("generated-type-data-delete");

        /// <exclude />
        public static ResourceHandle LocalizeDataIcon => GetIconHandle("generated-type-data-localize");

        /// <exclude />
        public static ResourceHandle ListUnpublishedItemsIcon = GetIconHandle("generated-type-list-unpublished-items");

        /// <exclude />
        public static ResourceHandle ShowincontentareaIcon = GetIconHandle("generated-type-showincontentarea");

        /// <exclude />
        public static ResourceHandle EditFormMarkupIcon => GetIconHandle("generated-type-form-markup-edit");

        /// <exclude />
        public static ResourceHandle ToXmlIcon => GetIconHandle("generated-type-to-xml");

        /// <exclude />
        public static readonly Dictionary<string, ResourceHandle> DataIconLookup;

        /// <exclude />
        public static ResourceHandle ErrorIcon => GetIconHandle("error");

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);
        private static readonly ActionGroup ViewActionGroup = new ActionGroup("View", ActionGroupPriority.PrimaryLow);
        private static readonly ActionGroup AppendedActionGroup = new ActionGroup("Develop", ActionGroupPriority.GeneralAppendMedium);

        private static readonly PermissionType[] _addNewInterfaceTypePermissionTypes = { PermissionType.Add };
        private static readonly PermissionType[] _editInterfaceTypePermissionTypes = { PermissionType.Edit };
        private static readonly PermissionType[] _editFormMarkupPermissionTypes = { PermissionType.Edit };
        private static readonly PermissionType[] _deleteInterfaceTypePermissionTypes = { PermissionType.Delete };

        private static readonly PermissionType[] _addNewDataPermissionTypes = { PermissionType.Add };
        private static readonly PermissionType[] _editDataPermissionTypes = { PermissionType.Edit };
        private static readonly PermissionType[] _deleteDataPermissionTypes = { PermissionType.Delete };
        private static readonly PermissionType[] _localizeDataPermissionTypes = { PermissionType.Add };



        /// <exclude />
        static GeneratedDataTypesElementProvider()
        {
            DataIconLookup = new Dictionary<string, ResourceHandle>
            {
                {GenericPublishProcessController.Draft, DataIconFacade.DataDraftIcon},
                {GenericPublishProcessController.AwaitingApproval, DataIconFacade.DataAwaitingApprovalIcon},
                {GenericPublishProcessController.AwaitingPublication, DataIconFacade.DataAwaitingPublicationIcon},
                {GenericPublishProcessController.Published, DataIconFacade.DataPublishedIcon}
            };
        }



        /// <exclude />
        public GeneratedDataTypesElementProvider(bool onlyShowGlobalDatas)
        {
            _websiteItemsView = onlyShowGlobalDatas;
        }



        /// <exclude />
        public ElementProviderContext Context
        {
            set
            {
                _providerContext = value;
                _dataGroupingProviderHelper = new DataGroupingProviderHelper(_providerContext)
                {
                    FolderOpenIcon = InterfaceOpen,
                    FolderClosedIcon = InterfaceClosed,
                    OnCreateLeafElement = GetElementFromData,
                    OnCreateGhostedLeafElement = GetGhostedElementFromData,
                    OnCreateDisabledLeafElement = GetDisabledElementFromData,
                    OnAddActions = AddGroupFolderActions,
                    OnGetRootParentEntityToken = GetRootParentEntityToken,
                    OnOwnsType = type =>
                    {
                        if (!type.IsGenerated() && !type.IsStaticDataType()) return false;
                        if (PageFolderFacade.GetAllFolderTypes().Contains(type)) return false;
                        if (PageMetaDataFacade.GetAllMetaDataTypes().Contains(type)) return false;

                        return !_websiteItemsView || IsTypeWhiteListed(type);
                    },
                    OnGetPayload = token => null
                };
            }
        }
        


        /// <exclude />
        public bool ContainsLocalizedData
        {
            get
            {
                return DataFacade.GetGeneratedInterfaces().Any(DataLocalizationFacade.IsLocalized);
            }
        }



        /// <exclude />
        public IEnumerable<Element> GetRoots(SearchToken seachToken)
        {
            List<Element> roots = new List<Element>();

            Element globalDataElement;
            if (_websiteItemsView)
            {
                globalDataElement = new Element(_providerContext.CreateElementHandle(new GeneratedDataTypesElementProviderRootEntityToken(_providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = Texts.GlobalDataFolderLabel_OnlyGlobalData,
                        ToolTip = Texts.GlobalDataFolderToolTip_OnlyGlobalData,
                        HasChildren = true,
                        Icon = GeneratedDataTypesElementProvider.InterfaceClosed,
                        OpenedIcon = GeneratedDataTypesElementProvider.InterfaceOpen
                    }
                };
            }
            else
            {
                globalDataElement = new Element(_providerContext.CreateElementHandle(new GeneratedDataTypesElementProviderRootEntityToken(_providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId)))
                    {
                        VisualData = new ElementVisualizedData
                        {
                            Label = Texts.GlobalDataFolderLabel,
                            ToolTip = Texts.GlobalDataFolderToolTip,
                            HasChildren = GlobalDataTypeFacade.GetAllGlobalDataTypes().Any() || DataFacade.GetAllKnownInterfaces().Any(t => t.IsStaticDataType()),
                            Icon = GeneratedDataTypesElementProvider.RootClosed,
                            OpenedIcon = GeneratedDataTypesElementProvider.RootOpen
                        }
                    };
            }

            if (!_websiteItemsView)
            {
                globalDataElement.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.AddNewInterfaceTypeWorkflow"), _addNewInterfaceTypePermissionTypes) { Payload = _providerContext.ProviderName }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("Add"),
                            ToolTip = GetText("AddToolTip"),
                            Icon = GeneratedDataTypesElementProvider.AddDataTypeIcon,
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

            globalDataElement.AddAction(
                new ElementAction(new ActionHandle(new ViewUnpublishedItemsActionToken()))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = GetText("ViewUnpublishedItems"),
                        ToolTip = GetText("ViewUnpublishedItemsToolTip"),
                        Icon = GeneratedDataTypesElementProvider.ListUnpublishedItemsIcon,
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


            roots.Add(globalDataElement);


            if (!_websiteItemsView)
            {
                bool pageDataFolderHasChildren = PageFolderFacade.GetAllFolderTypes().Any();

                var pageDataFolderElement = new Element(_providerContext.CreateElementHandle(new GeneratedDataTypesElementProviderRootEntityToken(_providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = GetText("PageDataFolderDataFolderLabel"),
                        ToolTip = GetText("PageDataFolderDataFolderToolTip"),
                        HasChildren = pageDataFolderHasChildren,
                        Icon = GeneratedDataTypesElementProvider.RootClosed,
                        OpenedIcon = GeneratedDataTypesElementProvider.RootOpen
                    }
                };

                pageDataFolderElement.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.AddNewInterfaceTypeWorkflow"), _addNewInterfaceTypePermissionTypes) { Payload = TypeManager.SerializeType(typeof(IPage)) }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("AddDataFolder"),
                            ToolTip = GetText("AddDataFolderToolTip"),
                            Icon = GeneratedDataTypesElementProvider.AddDataTypeIcon,
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

                roots.Add(pageDataFolderElement);


                bool pageMetaDataHasChildren = PageMetaDataFacade.GetAllMetaDataTypes().Any();


                var pageMetaDataElement = new Element(_providerContext.CreateElementHandle(new GeneratedDataTypesElementProviderRootEntityToken(_providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.PageMetaDataTypeFolderId)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = GetText("PageMetaDataFolderLabel"),
                        ToolTip = GetText("PageMetaDataFolderToolTip"),
                        HasChildren = pageMetaDataHasChildren,
                        Icon = GeneratedDataTypesElementProvider.RootClosed,
                        OpenedIcon = GeneratedDataTypesElementProvider.RootOpen
                    }
                };

                pageMetaDataElement.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.AddNewCompositionTypeWorkflow"), _addNewInterfaceTypePermissionTypes) { Payload = TypeManager.SerializeType(typeof(IPage)) }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("AddMetaDataLabel"),
                            ToolTip = GetText("AddMetaDataToolTip"),
                            Icon = GeneratedDataTypesElementProvider.AddDataTypeIcon,
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

                roots.Add(pageMetaDataElement);
            }


            return roots;
        }



        /// <exclude />
        public IEnumerable<Element> GetForeignRoots(SearchToken searchToken)
        {
            return GetRoots(searchToken);
        }



        /// <exclude />
        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken searchToken)
        {
            return GetChildren(entityToken, searchToken, false);
        }



        /// <exclude />
        public IEnumerable<Element> GetForeignChildren(EntityToken entityToken, SearchToken searchToken)
        {
            return GetChildren(entityToken, searchToken, true);
        }



        private IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken searchToken, bool showForeignChildren)
        {
            if (entityToken is GeneratedDataTypesElementProviderRootEntityToken rootEntityToken)
            {
                return GetRootChildren(searchToken, rootEntityToken);
            }

            if (entityToken is GeneratedDataTypesElementProviderTypeEntityToken castedEntityToken)
            {
                string typeManagerName = castedEntityToken.SerializedTypeName;

                Type type = TypeManager.TryGetType(typeManagerName);

                if (type == null)
                {
                    return Enumerable.Empty<Element>();
                }

                // These are never shown in the tree
                if (typeof(IPageMetaData).IsAssignableFrom(type))
                {
                    return Enumerable.Empty<Element>();
                }

                IEnumerable<Element> elements = _dataGroupingProviderHelper.GetRootGroupFolders(type, entityToken, showForeignChildren);

                return elements.ToList();
            }

            if (entityToken is DataGroupingProviderHelperEntityToken dataGroupingEntityToken)
            {
                List<Element> elements = _dataGroupingProviderHelper
                    .GetGroupChildren(dataGroupingEntityToken, showForeignChildren).ToList();

                return elements;
            }

            if (entityToken is DataEntityToken)
            {
                return Enumerable.Empty<Element>();
            }

            throw new InvalidOperationException("This code should not be reachable");
        }



        private List<Element> GetRootChildren(SearchToken searchToken, GeneratedDataTypesElementProviderRootEntityToken entityToken)
        {
            if (entityToken.Id == GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId)
            {
                return GetGlobalDataTypesElements(searchToken).OrderBy(f => f.VisualData.Label).ToList();
            }
            if (entityToken.Id == GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId)
            {
                return GetPageFolderDataTypesElements(searchToken).OrderBy(f => f.VisualData.Label).ToList();
            }
            if (entityToken.Id == GeneratedDataTypesElementProviderRootEntityToken.PageMetaDataTypeFolderId)
            {
                return GetPageMetaDataTypesElements(searchToken).OrderBy(f => f.VisualData.Label).ToList();
            }

            throw new InvalidOperationException("This code should not be reachable");
        }



        private List<Element> GetGlobalDataTypesElements(SearchToken searchToken)
        {
            List<Element> elements = new List<Element>();

            IEnumerable<Type> interfaceList = DataFacade.GetAllInterfaces(UserType.Developer).Where(i => i.IsStaticDataType() || i.IsGenerated());

            interfaceList = interfaceList.OrderBy(t => t.FullName);
            interfaceList = interfaceList.Except(PageFolderFacade.GetAllFolderTypes());
            interfaceList = interfaceList.Except(PageMetaDataFacade.GetAllMetaDataTypes());

            if (searchToken.IsValidKeyword())
            {
                interfaceList = interfaceList.Where(x => x.FullName.ToLower().Contains(searchToken.Keyword.ToLower())).ToList();
            }


            var interfaces = new Dictionary<Type, DataTypeDescriptor>();
            foreach (var type in interfaceList)
            {
                DataTypeDescriptor dataTypeDescriptor;
                try
                {
                    dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, ex);
                    continue;
                }

                if (dataTypeDescriptor != null)
                {
                    interfaces.Add(type, dataTypeDescriptor);
                }
            }

            IEnumerable<KeyValuePair<Type, DataTypeDescriptor>> sortedInterfaces = interfaces;
            if (_websiteItemsView)
            {
                sortedInterfaces = interfaces.OrderBy(f => f.Value.Title);
            }

            List<string> whiteList = DataFacade.GetData<IGeneratedTypeWhiteList>().Select(element => element.TypeManagerTypeName).ToList();

            foreach (var kvp in sortedInterfaces)
            {
                Type type = kvp.Key;
                DataTypeDescriptor dataTypeDescriptor = kvp.Value;

                DataTypeDescriptor tempDescriptor;

                bool storeCreated = DynamicTypeManager.TryGetDataTypeDescriptor(type.GetImmutableTypeId(), out tempDescriptor);

                string typeName = TypeManager.SerializeType(type);

                if (_websiteItemsView && !whiteList.Contains(typeName))
                {
                    continue;
                }

                DataScopeIdentifier dataScopeIdentifier = DataScopeIdentifier.Public;
                if (typeof(IPublishControlled).IsAssignableFrom(type))
                {
                    dataScopeIdentifier = DataScopeIdentifier.Administrated;
                }

                Exception queryDataException = null;

                bool hasChildren = false;
                try
                {
                    using (new DataScope(dataScopeIdentifier))
                    {
                        hasChildren = storeCreated && DataFacade.GetData(type).Any();

                        if (!hasChildren && storeCreated && DataLocalizationFacade.IsLocalized(type))
                        {
                            using (new DataScope(UserSettings.ForeignLocaleCultureInfo))
                            {
                                hasChildren |= DataFacade.GetData(type).Any();
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, ex);
                    queryDataException = ex;
                }
                
                string label = type.FullName;
                if (_websiteItemsView)
                {
                    label = dataTypeDescriptor.Title;
                }

                bool failedToLoad = queryDataException != null;
                bool isStaticType = type.IsStaticDataType();

                var openIcon = _websiteItemsView || isStaticType ? InterfaceOpen : DynamicDataTypeIconOpen;
                var closedIcon = _websiteItemsView ||isStaticType ? InterfaceClosed : DynamicDataTypeIconClosed;

                var element = new Element(_providerContext.CreateElementHandle(
                    new GeneratedDataTypesElementProviderTypeEntityToken(typeName, _providerContext.ProviderName,
                        GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = label,
                        ToolTip = !failedToLoad ? label : GetNestedExceptionMessage(queryDataException),
                        HasChildren = hasChildren,
                        Icon = !failedToLoad ? closedIcon : ErrorIcon,
                        OpenedIcon = !failedToLoad ? openIcon : ErrorIcon
                    }
                };


                if (storeCreated && !_websiteItemsView)
                {
                    AddNonShowOnlyGlobalActions(type, typeName, element);
                }

                if (storeCreated)
                {
                    element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.AddNewDataWorkflow"), _addNewDataPermissionTypes) { DoIgnoreEntityTokenLocking = true }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("AddData"),
                            ToolTip = GetText("AddDataToolTip"),
                            Icon = GeneratedDataTypesElementProvider.AddDataIcon,
                            Disabled = false,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Add,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    });
                }

                if (RuntimeInformation.IsDebugBuild)
                {
                    element.AddAction(
                    new ElementAction(new ActionHandle(new DataTypeDescriptorToXmlActionToken()))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("ToXmlLabel"),
                            ToolTip = GetText("ToXmlToolTip"),
                            Icon = GeneratedDataTypesElementProvider.ToXmlIcon,
                            Disabled = false,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Add,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = AppendedActionGroup
                            }
                        }
                    });
                }

                // TODO: add "Create store" action
                elements.Add(element);
            }

            return elements;
        }

        private string GetNestedExceptionMessage(Exception queryDataException)
        {
            var ex = queryDataException;

            while (ex is TargetInvocationException)
            {
                ex = ex.InnerException;
            }

            return ex.Message;
        }

        
        private void AddNonShowOnlyGlobalActions(Type type, string typeName, Element element)
        {
            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type.GetImmutableTypeId());
            bool isEditable = dataTypeDescriptor.IsCodeGenerated;

            if (DataLocalizationFacade.UseLocalization)
            {
                element.AddAction(GetChangeLocalizationElementAction(type, isEditable));
            }

            element.AddAction(
                new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditInterfaceTypeWorkflow"), _editInterfaceTypePermissionTypes) { Payload = _providerContext.ProviderName }))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = GetText("Edit"),
                        ToolTip = GetText("EditToolTip"),
                        Icon = GeneratedDataTypesElementProvider.EditDataTypeIcon,
                        Disabled = !isEditable,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Edit,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }
                    }
                });

            element.AddAction(
                new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.DeleteInterfaceTypeWorkflow"), _deleteInterfaceTypePermissionTypes) { Payload = _providerContext.ProviderName }))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = GetText("Delete"),
                        ToolTip = GetText("DeleteToolTip"),
                        Icon = GeneratedDataTypesElementProvider.DeleteDataTypeIcon,
                        Disabled = !isEditable,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Delete,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }
                    }
                });

            element.AddAction(
                new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditFormWorkflow"), _editFormMarkupPermissionTypes) { Payload = _providerContext.ProviderName, DoIgnoreEntityTokenLocking = true }))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = GetText("EditFormMarkup"),
                        ToolTip = GetText("EditFormMarkupToolTip"),
                        Icon = GeneratedDataTypesElementProvider.EditFormMarkupIcon,
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


            bool exists = DataFacade.GetData<IGeneratedTypeWhiteList>().Any(f => f.TypeManagerTypeName == typeName);


            element.AddAction(
                new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType(
                    exists == false ?
                        "Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.AddTypeToWhiteListWorkflow" :
                        "Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.RemoveTypeFromWhiteListWorkflow"
                    ), _addNewInterfaceTypePermissionTypes) { DoIgnoreEntityTokenLocking = true }))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = GetText("ShowInContent"),
                        ToolTip = GetText("ShowInContentToolTip"),
                        Icon = GeneratedDataTypesElementProvider.ShowincontentareaIcon,
                        Disabled = false,
                        ActionCheckedStatus = exists == false ? ActionCheckedStatus.Unchecked : ActionCheckedStatus.Checked,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Add,
                            IsInFolder = false,
                            IsInToolbar = false,
                            ActionGroup = PrimaryActionGroup
                        }
                    }
                });
        }

        private static ElementAction GetChangeLocalizationElementAction(Type type, bool isEditable)
        {
            if (!DataLocalizationFacade.IsLocalized(type))
            {
                return
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EnableTypeLocalizationWorkflow"), _editInterfaceTypePermissionTypes)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("EnableLocalization"),
                            ToolTip = GetText("EnableLocalizationToolTip"),
                            Icon = GeneratedDataTypesElementProvider.LocalizeDataTypeIcon,
                            Disabled = !DataLocalizationFacade.ActiveLocalizationCultures.Any() || !isEditable,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Other,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    };
            }


            return
                new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.DisableTypeLocalizationWorkflow"), _editInterfaceTypePermissionTypes)))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = GetText("DisableLocalization"),
                        ToolTip = GetText("DisableLocalizationToolTip"),
                        Icon = GeneratedDataTypesElementProvider.DelocalizeDataTypeIcon,
                        Disabled = !isEditable,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Other,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }
                    }
                };
        }
        

        private List<Element> GetPageFolderDataTypesElements(SearchToken searchToken)
        {
            var elements = new List<Element>();

            IEnumerable<Type> types = PageFolderFacade.GetAllFolderTypes();

            if (searchToken.IsValidKeyword())
            {
                types = types.Where(x => x.FullName.ToLower().Contains(searchToken.Keyword.ToLower()));
            }

            foreach (Type type in types)
            {
                DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type.GetImmutableTypeId());
                bool isEditable = dataTypeDescriptor.IsCodeGenerated;

                string typeName = TypeManager.SerializeType(type);

                var element = new Element(_providerContext.CreateElementHandle(new GeneratedDataTypesElementProviderTypeEntityToken(typeName, _providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = type.FullName,
                        ToolTip = type.FullName,
                        HasChildren = false,
                        Icon = isEditable ? DynamicDataTypeIconClosed : InterfaceClosed,
                        OpenedIcon = isEditable ? DynamicDataTypeIconOpen : InterfaceOpen
                    }
                };

                if (DataLocalizationFacade.UseLocalization)
                {
                    element.AddAction(GetChangeLocalizationElementAction(type, true));
                }


                element.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(
                        WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditInterfaceTypeWorkflow"), _editInterfaceTypePermissionTypes) { Payload = typeName }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("EditDataFolderTypeLabel"),
                            ToolTip = GetText("EditDataFolderTypeToolTip"),
                            Icon = GeneratedDataTypesElementProvider.EditDataTypeIcon,
                            Disabled = !isEditable,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Edit,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    });

                element.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.DeleteAggregationTypeWorkflow"), _deleteInterfaceTypePermissionTypes) { Payload = typeName }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("DeleteDataFolderTypeLabel"),
                            ToolTip = GetText("DeleteDataFolderTypeToolTip"),
                            Icon = GeneratedDataTypesElementProvider.DeleteDataTypeIcon,
                            Disabled = !isEditable,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Delete,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    });


                element.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditFormWorkflow"), _editFormMarkupPermissionTypes) { Payload = _providerContext.ProviderName, DoIgnoreEntityTokenLocking = true }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("EditFormMarkup"),
                            ToolTip = GetText("EditFormMarkupToolTip"),
                            Icon = GeneratedDataTypesElementProvider.EditFormMarkupIcon,
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

                elements.Add(element);
            }

            return elements;
        }



        private List<Element> GetPageMetaDataTypesElements(SearchToken searchToken)
        {
            List<Element> elements = new List<Element>();

            IEnumerable<Type> types = PageMetaDataFacade.GetAllMetaDataTypes();

            if (searchToken.IsValidKeyword())
            {
                types = types.Where(x => x.FullName.ToLower().Contains(searchToken.Keyword.ToLower()));
            }

            foreach (Type type in types)
            {
                DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type.GetImmutableTypeId());
                bool isEditable = dataTypeDescriptor.IsCodeGenerated;

                string typeName = TypeManager.SerializeType(type);

                Element element = new Element(_providerContext.CreateElementHandle(new GeneratedDataTypesElementProviderTypeEntityToken(typeName, _providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.PageMetaDataTypeFolderId)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = type.FullName,
                        ToolTip = type.FullName,
                        HasChildren = false,
                        Icon = isEditable ? DynamicDataTypeIconClosed : InterfaceClosed,
                        OpenedIcon = isEditable ? DynamicDataTypeIconOpen : InterfaceOpen
                    }
                };


                if (DataLocalizationFacade.UseLocalization)
                {
                    element.AddAction(GetChangeLocalizationElementAction(type, isEditable));
                }


                element.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditCompositionTypeWorkflow"), _editInterfaceTypePermissionTypes) { Payload = typeName }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("EditMetaDataTypeLabel"),
                            ToolTip = GetText("EditMetaDataTypeToolTip"),
                            Icon = GeneratedDataTypesElementProvider.EditDataTypeIcon,
                            Disabled = !isEditable,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Edit,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    });

                element.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.DeleteCompositionTypeWorkflow"), _deleteInterfaceTypePermissionTypes) { Payload = typeName }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("DeleteMetaDataTypeLabel"),
                            ToolTip = GetText("DeleteMetaDataTypeToolTip"),
                            Icon = GeneratedDataTypesElementProvider.DeleteDataTypeIcon,
                            Disabled = !isEditable,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Delete,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    });

                element.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditFormWorkflow"), _editFormMarkupPermissionTypes) { DoIgnoreEntityTokenLocking = true }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("EditFormMarkup"),
                            ToolTip = GetText("EditFormMarkupToolTip"),
                            Icon = GeneratedDataTypesElementProvider.EditFormMarkupIcon,
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

                elements.Add(element);
            }

            return elements;
        }



        private Element GetElementFromData(IData data)
        {
            Type type = data.DataSourceId.InterfaceType;

            string label = data.GetLabel(true);

            Element element = new Element(_providerContext.CreateElementHandle(data.GetDataEntityToken()))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = label,
                    ToolTip = label,
                    HasChildren = false,
                    Icon = (data is IPublishControlled ? DataIconLookup[((IPublishControlled)data).PublicationStatus] : DataIconFacade.DataPublishedIcon)
                }
            };



            if (PageMetaDataFacade.GetAllMetaDataTypes().Contains(type) == false)
            {
                element.AddAction(
                    new ElementAction(new ActionHandle(new ProxyDataActionToken(ActionIdentifier.Edit, _editDataPermissionTypes)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("EditData"),
                            ToolTip = GetText("EditDataToolTip"),
                            Icon = GeneratedDataTypesElementProvider.EditDataIcon,
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


                element.AddAction(
                    new ElementAction(new ActionHandle(new ProxyDataActionToken(ActionIdentifier.Delete,_deleteDataPermissionTypes)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("DeleteData"),
                            ToolTip = GetText("DeleteDataToolTip"),
                            Icon = GeneratedDataTypesElementProvider.DeleteDataIcon,
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
                element.AddAction(
                    new ElementAction(new ActionHandle(new ProxyDataActionToken(ActionIdentifier.Duplicate, _addNewDataPermissionTypes)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("DuplicateData"),
                            ToolTip = GetText("DuplicateDataToolTip"),
                            Icon = GeneratedDataTypesElementProvider.DuplicateDataIcon,
                            Disabled = false,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Add,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    });
            }

            return element;
        }



        private Element GetGhostedElementFromData(IData data)
        {
            string label = string.Format("{0} ({1})", data.GetLabel(true), DataLocalizationFacade.GetCultureTitle(UserSettings.ForeignLocaleCultureInfo));

            Element element = new Element(_providerContext.CreateElementHandle(data.GetDataEntityToken()))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = label,
                    ToolTip = label,
                    HasChildren = false,
                    Icon = DataIconFacade.DataGhostedIcon,
                    IsDisabled = false
                }
            };

            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.LocalizeDataWorkflow"), _localizeDataPermissionTypes) { Payload = "Global" }))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = GetText("LocalizeData"),
                    ToolTip = GetText("LocalizeDataToolTip"),
                    Icon = GeneratedDataTypesElementProvider.LocalizeDataIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Add,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            });

            return element;
        }



        private Element GetDisabledElementFromData(IData data)
        {
            string label = string.Format("{0} ({1})", data.GetLabel(true), DataLocalizationFacade.GetCultureTitle(UserSettings.ForeignLocaleCultureInfo));

            Element element = new Element(_providerContext.CreateElementHandle(data.GetDataEntityToken()))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = label,
                    ToolTip = GetText("DisabledData"),
                    HasChildren = false,
                    Icon = DataIconFacade.DataDisabledIcon,
                    IsDisabled = true
                }
            };

            return element;
        }



        private Element AddGroupFolderActions(Element element, PropertyInfoValueCollection propertyInfoValueCollection)
        {
            StringBuilder sb = new StringBuilder();
            foreach (var kvp in propertyInfoValueCollection.PropertyValues)
            {
                string value = ValueTypeConverter.Convert<string>(kvp.Value);
                StringConversionServices.SerializeKeyValuePair<string>(sb, kvp.Key.Name, value);
            }

            element.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.AddNewDataWorkflow"), _addNewDataPermissionTypes) { DoIgnoreEntityTokenLocking = true, Payload = sb.ToString() }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetText("AddData"),
                            ToolTip = GetText("AddDataToolTip"),
                            Icon = GeneratedDataTypesElementProvider.AddDataIcon,
                            Disabled = false,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Add,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    });

            return element;
        }


        private static bool IsTypeWhiteListed(Type type)
        {
            string typeManagerTypeName = TypeManager.SerializeType(type);

            IEnumerable<IGeneratedTypeWhiteList> whileList = DataFacade.GetData<IGeneratedTypeWhiteList>(true);

            return whileList.Any(f => f.TypeManagerTypeName == typeManagerTypeName);
        }



        private EntityToken GetRootParentEntityToken(Type type, EntityToken entityToken)
        {
            bool isPageFolder = PageFolderFacade.GetAllFolderTypes().Contains(type);

            if (!isPageFolder)
            {
                if (_websiteItemsView && !IsTypeWhiteListed(type)) return null;

                return new GeneratedDataTypesElementProviderTypeEntityToken(
                    TypeManager.SerializeType(type),
                    _providerContext.ProviderName,
                    GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId
                );
            }

            if (_websiteItemsView) return null;

            var groupingEntityToken = entityToken as DataGroupingProviderHelperEntityToken;
            if (groupingEntityToken != null && !groupingEntityToken.Payload.IsNullOrEmpty())
            {
                // Grouping entity tokens with payload aren't attached to the data type folder in the 'Data' perspective
                return null;
            }

            return new GeneratedDataTypesElementProviderTypeEntityToken(
                    TypeManager.SerializeType(type),
                    _providerContext.ProviderName,
                    GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId
                );
        }



        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }

        internal static string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", key);
        }
    }


    [Assembler(typeof(GeneratedDataTypesElementProviderAssembler))]
    internal sealed class GeneratedDataTypesElementProviderData : HooklessElementProviderData
    {
        private const string _onlyShowGlobalDatasPropertyName = "onlyShowGlobalDatas";
        /// <exclude />
        [ConfigurationProperty(_onlyShowGlobalDatasPropertyName, IsRequired = false, DefaultValue = false)]
        public bool OnlyShowGlobalDatas
        {
            get { return (bool)base[_onlyShowGlobalDatasPropertyName]; }
            set { base[_onlyShowGlobalDatasPropertyName] = value; }
        }
    }



    internal sealed class GeneratedDataTypesElementProviderAssembler : IAssembler<IHooklessElementProvider, HooklessElementProviderData>
    {
        public IHooklessElementProvider Assemble(IBuilderContext context, HooklessElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            var data = (GeneratedDataTypesElementProviderData)objectConfiguration;

            return new GeneratedDataTypesElementProvider(data.OnlyShowGlobalDatas);
        }
    }
}
