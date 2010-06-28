using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Elements;
using Composite.Elements.ElementProviderHelpers.DataGroupingProviderHelper;
using Composite.Elements.Plugins.ElementProvider;
using Composite.Extensions;
using Composite.Linq;
using Composite.Logging;
using Composite.ResourceSystem;
using Composite.ResourceSystem.Icons;
using Composite.Security;
using Composite.Serialization;
using Composite.Types;
using Composite.Users;
using Composite.WebClient;
using Composite.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    #region ToXml
    internal sealed class DataTypeDescriptorToXmlActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            GeneratedDataTypesElementProviderTypeEntityToken castedEntityToken = (GeneratedDataTypesElementProviderTypeEntityToken)entityToken;

            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

            string url = string.Format("{0}?TypeName={1}", UrlUtils.ResolveAdminUrl("content/views/datatypedescriptor/ToXml.aspx"), System.Web.HttpUtility.UrlEncode(castedEntityToken.SerializedTypeName));
            
            ConsoleMessageQueueFacade.Enqueue(
                new OpenViewMessageQueueItem
                {
                    EntityToken = EntityTokenSerializer.Serialize(entityToken, true),
                    Url = url,
                    ViewId = Guid.NewGuid().ToString(),
                    ViewType = ViewType.Main,
                    Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DataTypeDescriptorToXmlLabel")
                },
                currentConsoleId
            );

            return null;
        }
    }



    [ActionExecutor(typeof(DataTypeDescriptorToXmlActionExecutor))]
    internal sealed class DataTypeDescriptorToXmlActionToken : ActionToken
    {
        private static PermissionType[] _permissionTypes = new PermissionType[] { PermissionType.Administrate };

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }

        public override string Serialize()
        {
            return "DataTypeDescriptorToXml";
        }


        public static ActionToken Deserialize(string serializedData)
        {
            return new DataTypeDescriptorToXmlActionToken();
        }
    }
    #endregion



    [ConfigurationElementType(typeof(GeneratedDataTypesElementProviderData))]
    internal sealed class GeneratedDataTypesElementProvider : IHooklessElementProvider, ILocaleAwareElementProvider
    {
        private ElementProviderContext _providerContext;
        private bool _onlyShowGlobalDatas;
        private DataGroupingProviderHelper _dataGroupingProviderHelper;


        public static ResourceHandle RootOpen { get { return GetIconHandle("generated-root-open"); } }
        public static ResourceHandle RootClosed { get { return GetIconHandle("generated-root-closed"); } }
        public static ResourceHandle InterfaceOpen { get { return GetIconHandle("generated-interface-open"); } }
        public static ResourceHandle InterfaceClosed { get { return GetIconHandle("generated-interface-closed"); } }

        public static ResourceHandle AddDataTypeIcon { get { return GetIconHandle("generated-type-add"); } }
        public static ResourceHandle EditDataTypeIcon { get { return GetIconHandle("generated-type-edit"); } }
        public static ResourceHandle DeleteDataTypeIcon { get { return GetIconHandle("generated-type-delete"); } }
        public static ResourceHandle LocalizeDataTypeIcon { get { return GetIconHandle("generated-type-localize"); } }
        public static ResourceHandle DelocalizeDataTypeIcon { get { return GetIconHandle("generated-type-delocalize"); } }
        public static ResourceHandle AddDataIcon { get { return GetIconHandle("generated-type-data-add"); } }
        public static ResourceHandle EditDataIcon { get { return GetIconHandle("generated-type-data-edit"); } }
        public static ResourceHandle DeleteDataIcon { get { return GetIconHandle("generated-type-data-delete"); } }
        public static ResourceHandle LocalizeDataIcon { get { return GetIconHandle("generated-type-data-localize"); } }
        public static ResourceHandle ListUnpublishedItemsIcon = GetIconHandle("generated-type-list-unpublished-items");
        public static ResourceHandle ShowincontentareaIcon = GetIconHandle("generated-type-showincontentarea");

        public static ResourceHandle EditFormMarkupIcon { get { return GetIconHandle("generated-type-form-markup-edit"); } }

        public static ResourceHandle ToXmlIcon { get { return GetIconHandle("generated-type-to-xml"); } }

        public static readonly Dictionary<string, ResourceHandle> DataIconLookup;

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);
        private static readonly ActionGroup ViewActionGroup = new ActionGroup("View", ActionGroupPriority.PrimaryLow);
        private static readonly ActionGroup AppendedActionGroup = new ActionGroup("Develop", ActionGroupPriority.GeneralAppendMedium);

        private static readonly PermissionType[] _addNewInterfaceTypePermissionTypes = new PermissionType[] { PermissionType.Add };
        private static readonly PermissionType[] _editInterfaceTypePermissionTypes = new PermissionType[] { PermissionType.Edit };
        private static readonly PermissionType[] _editFormMarkupPermissionTypes = new PermissionType[] { PermissionType.Edit };
        private static readonly PermissionType[] _deleteInterfaceTypePermissionTypes = new PermissionType[] { PermissionType.Delete };

        private static readonly PermissionType[] _addNewDataPermissionTypes = new PermissionType[] { PermissionType.Add };
        private static readonly PermissionType[] _editDataPermissionTypes = new PermissionType[] { PermissionType.Edit };
        private static readonly PermissionType[] _deleteDataPermissionTypes = new PermissionType[] { PermissionType.Delete };
        private static readonly PermissionType[] _localizeDataPermissionTypes = new PermissionType[] { PermissionType.Add };



        static GeneratedDataTypesElementProvider()
        {
            DataIconLookup = new Dictionary<string, ResourceHandle>();
            DataIconLookup.Add(GenericPublishProcessController.Draft, DataIconFacade.DataDraftIcon);
            DataIconLookup.Add(GenericPublishProcessController.AwaitingApproval, DataIconFacade.DataAwaitingApprovalIcon);
            DataIconLookup.Add(GenericPublishProcessController.AwaitingPublication, DataIconFacade.DataAwaitingPublicationIcon);
            DataIconLookup.Add(GenericPublishProcessController.Published, DataIconFacade.DataPublishedIcon);
        }



        public GeneratedDataTypesElementProvider(bool onlyShowGlobalDatas)
        {
            _onlyShowGlobalDatas = onlyShowGlobalDatas;
        }



        public ElementProviderContext Context
        {
            set
            {
                _providerContext = value;
                _dataGroupingProviderHelper = new DataGroupingProviderHelper(_providerContext);
                _dataGroupingProviderHelper.FolderOpenIcon = GetIconHandle("generated-interface-open");
                _dataGroupingProviderHelper.FolderClosedIcon = GetIconHandle("generated-interface-closed");
                _dataGroupingProviderHelper.OnCreateLeafElement = data => { return GetElementFromData(data); };
                _dataGroupingProviderHelper.OnCreateGhostedLeafElement = data => { return GetGhostedElementFromData(data); };
                _dataGroupingProviderHelper.OnCreateDisabledLeafElement = data => { return GetDisabledElementFromData(data); };
                _dataGroupingProviderHelper.OnAddActions = (element, propertyValues) => { return AddGroupFolderActions(element, propertyValues); };
                _dataGroupingProviderHelper.OnGetRootParentEntityToken = type => { return new GeneratedDataTypesElementProviderTypeEntityToken(TypeManager.SerializeType(type), _providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId); };
                _dataGroupingProviderHelper.OnOwnsType = type =>
                {
                    if (type.IsGenerated() == false) return false;
                    if (PageFolderFacade.GetAllFolderTypes().Contains(type) == true) return false;
                    if (PageMetaDataFacade.GetAllMetaDataTypes().Contains(type) == true) return false;

                    if (_onlyShowGlobalDatas == true)
                    {
                        string typeManagerTypeName = TypeManager.SerializeType(type);
                        IEnumerable<IGeneratedTypeWhiteList> whileList = DataFacade.GetData<IGeneratedTypeWhiteList>(true);
                        bool isWhiteListed = whileList.Where(f => f.TypeManagerTypeName == typeManagerTypeName).Any();
                        if (isWhiteListed == false) return false;
                    }

                    return true;
                };

            }
        }



        public bool ContainsLocalizedData
        {
            get
            {
                foreach (Type type in DataFacade.GetGeneratedInterfaces())
                {
                    if (DataLocalizationFacade.IsLocalized(type) == true)
                    {
                        return true;
                    }
                }

                return false;
            }
        }



        public IEnumerable<Element> GetRoots(SearchToken seachToken)
        {
            List<Element> roots = new List<Element>();                     

            Element globalDataElement;
            if (_onlyShowGlobalDatas == true)
            {
                globalDataElement = new Element(_providerContext.CreateElementHandle(new GeneratedDataTypesElementProviderRootEntityToken(_providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "GlobalDataFolderLabel_OnlyGlobalData"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "GlobalDataFolderToolTip_OnlyGlobalData"),
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
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "GlobalDataFolderLabel"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "GlobalDataFolderToolTip"),
                            HasChildren = GlobalDataTypeFacade.GetAllGlobalDataTypes().Any(),
                            Icon = GeneratedDataTypesElementProvider.RootClosed,
                            OpenedIcon = GeneratedDataTypesElementProvider.RootOpen
                        }
                    };
            }

            if (_onlyShowGlobalDatas == false)
            {
                globalDataElement.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.AddNewInterfaceTypeWorkflow"), _addNewInterfaceTypePermissionTypes) { Payload = _providerContext.ProviderName }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "Add"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "AddToolTip"),
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
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "ViewUnpublishedItems"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "ViewUnpublishedItemsToolTip"),
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
            

            if (_onlyShowGlobalDatas == false)
            {
                bool pageDataFolderHasChildren = PageFolderFacade.GetAllFolderTypes().Count() > 0;

                Element pageDataFolderElement = new Element(_providerContext.CreateElementHandle(new GeneratedDataTypesElementProviderRootEntityToken(_providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "PageDataFolderDataFolderLabel"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "PageDataFolderDataFolderToolTip"),
                        HasChildren = pageDataFolderHasChildren,
                        Icon = GeneratedDataTypesElementProvider.RootClosed,
                        OpenedIcon = GeneratedDataTypesElementProvider.RootOpen
                    }
                };

                pageDataFolderElement.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.AddNewAggregationTypeWorkflow"), _addNewInterfaceTypePermissionTypes) { Payload = TypeManager.SerializeType(typeof(IPage)) }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "AddDataFolder"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "AddDataFolderToolTip"),
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


                bool pageMetaDataHasChildren = PageMetaDataFacade.GetAllMetaDataTypes().Count() > 0;

                Element pageMetaDataElement = new Element(_providerContext.CreateElementHandle(new GeneratedDataTypesElementProviderRootEntityToken(_providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.PageMetaDataTypeFolderId)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "PageMetaDataFolderLabel"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "PageMetaDataFolderToolTip"),
                        HasChildren = pageMetaDataHasChildren,
                        Icon = GeneratedDataTypesElementProvider.RootClosed,
                        OpenedIcon = GeneratedDataTypesElementProvider.RootOpen
                    }
                };

                pageMetaDataElement.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.AddNewCompositionTypeWorkflow"), _addNewInterfaceTypePermissionTypes) { Payload = TypeManager.SerializeType(typeof(IPage)) }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "AddMetaDataLabel"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "AddMetaDataToolTip"),
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



        public IEnumerable<Element> GetForeignRoots(SearchToken searchToken)
        {
            return GetRoots(searchToken);
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken searchToken)
        {
            return GetChildren(entityToken, searchToken, false);
        }



        public IEnumerable<Element> GetForeignChildren(EntityToken entityToken, SearchToken searchToken)
        {
            return GetChildren(entityToken, searchToken, true);
        }



        private IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken searchToken, bool showForeignChildren)
        {
            if (entityToken is GeneratedDataTypesElementProviderRootEntityToken)
            {
                return GetRootChildren(searchToken, entityToken as GeneratedDataTypesElementProviderRootEntityToken);
            }

            if (entityToken is GeneratedDataTypesElementProviderTypeEntityToken)
            {
                var castedEntityToken = entityToken as GeneratedDataTypesElementProviderTypeEntityToken;

                string typeManagerName = castedEntityToken.SerializedTypeName;

                Type type = TypeManager.TryGetType(typeManagerName);

                if (type != null)
                {
                    // These are never shown in the tree
                    if (PageMetaDataFacade.GetAllMetaDataTypes().Contains(type) == true)
                    {
                        return new List<Element>();
                    }

                    IEnumerable<Element> elements = _dataGroupingProviderHelper.GetRootGroupFolders(type, entityToken, showForeignChildren);

                    return elements.OrderBy(f => f.VisualData.Label).ToList();
                }

                LoggingService.LogWarning("GeneratedDataTypesElementProvider", "Can not get children for unknown type '{0}'".FormatWith(typeManagerName));

                return null;
            }

            if (entityToken is DataGroupingProviderHelperEntityToken)
            {
                List<Element> elements = _dataGroupingProviderHelper.GetGroupChildren(entityToken as DataGroupingProviderHelperEntityToken, showForeignChildren).ToList();

                return elements.OrderBy(f => f.VisualData.Label);
            }

            if (entityToken is DataEntityToken)
            {
                return new List<Element>();
            }

            throw new NotImplementedException();
        }



        private List<Element> GetRootChildren(SearchToken searchToken, GeneratedDataTypesElementProviderRootEntityToken entityToken)
        {
            if (entityToken.Id == GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId)
            {
                return GetGlobalDataTypesElements(searchToken).OrderBy(f=>f.VisualData.Label).ToList();
            }
            else if (entityToken.Id == GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId)
            {
                return GetPageFolderDataTypesElements(searchToken).OrderBy(f => f.VisualData.Label).ToList();
            }
            else if (entityToken.Id == GeneratedDataTypesElementProviderRootEntityToken.PageMetaDataTypeFolderId)
            {
                return GetPageMetaDataTypesElements(searchToken).OrderBy(f => f.VisualData.Label).ToList();
            }
            else
            {
                throw new NotImplementedException();
            }
        }



        private List<Element> GetGlobalDataTypesElements(SearchToken searchToken)
        {
            List<Element> elements = new List<Element>();

            IEnumerable<Type> allGeneratedInterfaces = DataFacade.GetGeneratedInterfaces().OrderBy(t => t.FullName);
            allGeneratedInterfaces = allGeneratedInterfaces.Except(PageFolderFacade.GetAllFolderTypes());
            allGeneratedInterfaces = allGeneratedInterfaces.Except(PageMetaDataFacade.GetAllMetaDataTypes());

            if (searchToken.IsValidKeyword() == true)
            {
                allGeneratedInterfaces = allGeneratedInterfaces.Where(x => x.FullName.ToLower().Contains(searchToken.Keyword.ToLower())).ToList();
            }


            Dictionary<Type, DataTypeDescriptor> interfaces = allGeneratedInterfaces.ToDictionary(f => f, f => DynamicTypeManager.GetDataTypeDescriptor(f));

            IEnumerable<KeyValuePair<Type, DataTypeDescriptor>> sortedInterface = interfaces;
            if (_onlyShowGlobalDatas == true)
            {
                sortedInterface = interfaces.OrderBy(f => f.Value.Title);
            }

            List<string> whiteList = DataFacade.GetData<IGeneratedTypeWhiteList>().Select(element => element.TypeManagerTypeName).ToList();

            foreach (var kvp in sortedInterface)
            {
                Type type = kvp.Key;
                DataTypeDescriptor dataTypeDescriptor = kvp.Value;

                string typeName = TypeManager.SerializeType(type);

                if (_onlyShowGlobalDatas && !whiteList.Contains(typeName))
                {
                    continue;
                }

                DataScopeIdentifier dataScopeIdentifier = DataScopeIdentifier.Public;
                if (typeof(IPublishControlled).IsAssignableFrom(type) == true)
                {
                    dataScopeIdentifier = DataScopeIdentifier.Administrated;
                }

                bool hasChildren;
                using (new DataScope(dataScopeIdentifier))
                {
                    hasChildren = DataFacade.GetData(type).Any();

                    if (DataLocalizationFacade.IsLocalized(type) == true)
                    {
                        using (new DataScope(UserSettings.ForeignLocaleCultureInfo))
                        {
                            hasChildren |= DataFacade.GetData(type).Any();
                        }
                    }
                }

                string label = type.FullName;
                if (_onlyShowGlobalDatas == true)
                {
                    label = dataTypeDescriptor.Title;
                }


                Element element = new Element(_providerContext.CreateElementHandle(new GeneratedDataTypesElementProviderTypeEntityToken(typeName, _providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.GlobalDataTypeFolderId)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = label,
                        ToolTip = label,
                        HasChildren = hasChildren,
                        Icon = GeneratedDataTypesElementProvider.InterfaceClosed,
                        OpenedIcon = GeneratedDataTypesElementProvider.InterfaceOpen
                    }
                };


                if (_onlyShowGlobalDatas == false)
                {
                    AddNonShowOnlyGlobalActions(type, typeName, element);
                }


                element.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.AddNewDataWorkflow"), _addNewDataPermissionTypes) { DoIgnoreEntityTokenLocking = true }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "AddData"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "AddDataToolTip"),
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

                if (RuntimeInformation.IsDebugBuild == true)
                {
                    element.AddAction(
                    new ElementAction(new ActionHandle(new DataTypeDescriptorToXmlActionToken()))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "ToXmlLabel"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "ToXmlToolTip"),
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

                elements.Add(element);

            }

            return elements;
        }



        private void AddNonShowOnlyGlobalActions(Type type, string typeName, Element element)
        {
            if (DataLocalizationFacade.UseLocalization == true)
            {
                if (DataLocalizationFacade.IsLocalized(type) == false)
                {
                    element.AddAction(
                        new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EnableTypeLocalizationWorkflow"), _editInterfaceTypePermissionTypes)))
                        {
                            VisualData = new ActionVisualizedData
                            {
                                Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EnableLocalization"),
                                ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EnableLocalizationToolTip"),
                                Icon = GeneratedDataTypesElementProvider.LocalizeDataTypeIcon,
                                Disabled = DataLocalizationFacade.ActiveLocalizationCultures.Any() == false,
                                ActionLocation = new ActionLocation
                                {
                                    ActionType = ActionType.Other,
                                    IsInFolder = false,
                                    IsInToolbar = true,
                                    ActionGroup = PrimaryActionGroup
                                }
                            }
                        });
                }
                else
                {
                    element.AddAction(
                        new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.DisableTypeLocalizationWorkflow"), _editInterfaceTypePermissionTypes)))
                        {
                            VisualData = new ActionVisualizedData
                            {
                                Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DisableLocalization"),
                                ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DisableLocalizationToolTip"),
                                Icon = GeneratedDataTypesElementProvider.DelocalizeDataTypeIcon,
                                Disabled = false,
                                ActionLocation = new ActionLocation
                                {
                                    ActionType = ActionType.Other,
                                    IsInFolder = false,
                                    IsInToolbar = true,
                                    ActionGroup = PrimaryActionGroup
                                }
                            }
                        });
                }
            }

            element.AddAction(
                new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditInterfaceTypeWorkflow"), _editInterfaceTypePermissionTypes) { Payload = _providerContext.ProviderName }))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "Edit"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditToolTip"),
                        Icon = GeneratedDataTypesElementProvider.EditDataTypeIcon,
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
                new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.DeleteInterfaceTypeWorkflow"), _deleteInterfaceTypePermissionTypes) { Payload = _providerContext.ProviderName }))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "Delete"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DeleteToolTip"),
                        Icon = GeneratedDataTypesElementProvider.DeleteDataTypeIcon,
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
                new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditFormWorkflow"), _editFormMarkupPermissionTypes) { Payload = _providerContext.ProviderName, DoIgnoreEntityTokenLocking = true }))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditFormMarkup"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditFormMarkupToolTip"),
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


            bool exists = DataFacade.GetData<IGeneratedTypeWhiteList>().Where(f => f.TypeManagerTypeName == typeName).Any();


            element.AddAction(
                new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType(
                    exists == false ?
                        "Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.AddTypeToWhiteListWorkflow" :
                        "Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.RemoveTypeFromWhiteListWorkflow"
                    ), _addNewInterfaceTypePermissionTypes) { DoIgnoreEntityTokenLocking = true }))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "ShowInContent"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "ShowInContentToolTip"),
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



        private List<Element> GetPageFolderDataTypesElements(SearchToken searchToken)
        {
            List<Element> elements = new List<Element>();

            IEnumerable<Type> types = PageFolderFacade.GetAllFolderTypes();

            if (searchToken.IsValidKeyword() == true)
            {
                types = types.Where(x => x.FullName.ToLower().Contains(searchToken.Keyword.ToLower()));
            }

            foreach (Type type in types)
            {
                string typeName = TypeManager.SerializeType(type);

                bool hasChildren = false;

                Element element = new Element(_providerContext.CreateElementHandle(new GeneratedDataTypesElementProviderTypeEntityToken(typeName, _providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.PageDataFolderTypeFolderId)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = type.FullName,
                        ToolTip = type.FullName,
                        HasChildren = hasChildren,
                        Icon = GeneratedDataTypesElementProvider.InterfaceClosed,
                        OpenedIcon = GeneratedDataTypesElementProvider.InterfaceOpen
                    }
                };

                if (DataLocalizationFacade.UseLocalization == true)
                {
                    if (DataLocalizationFacade.IsLocalized(type) == false)
                    {
                        element.AddAction(
                            new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EnableTypeLocalizationWorkflow"), _editInterfaceTypePermissionTypes)))
                            {
                                VisualData = new ActionVisualizedData
                                {
                                    Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EnableLocalization"),
                                    ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EnableLocalizationToolTip"),
                                    Icon = GeneratedDataTypesElementProvider.LocalizeDataTypeIcon,
                                    Disabled = DataLocalizationFacade.ActiveLocalizationCultures.Any() == false,
                                    ActionLocation = new ActionLocation
                                    {
                                        ActionType = ActionType.Other,
                                        IsInFolder = false,
                                        IsInToolbar = true,
                                        ActionGroup = PrimaryActionGroup
                                    }
                                }
                            });
                    }
                    else
                    {
                        element.AddAction(
                            new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.DisableTypeLocalizationWorkflow"), _editInterfaceTypePermissionTypes)))
                            {
                                VisualData = new ActionVisualizedData
                                {
                                    Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DisableLocalization"),
                                    ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DisableLocalizationToolTip"),
                                    Icon = GeneratedDataTypesElementProvider.DelocalizeDataTypeIcon,
                                    Disabled = false,
                                    ActionLocation = new ActionLocation
                                    {
                                        ActionType = ActionType.Other,
                                        IsInFolder = false,
                                        IsInToolbar = true,
                                        ActionGroup = PrimaryActionGroup
                                    }
                                }
                            });
                    }
                }

                if (type.IsGenerated() == true)
                {
                    element.AddAction(
                        new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditAggregationTypeWorkflow"), _editInterfaceTypePermissionTypes) { Payload = typeName }))
                        {
                            VisualData = new ActionVisualizedData
                            {
                                Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditDataFolderTypeLabel"),
                                ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditDataFolderTypeToolTip"),
                                Icon = GeneratedDataTypesElementProvider.EditDataTypeIcon,
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
                        new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.DeleteAggregationTypeWorkflow"), _deleteInterfaceTypePermissionTypes) { Payload = typeName }))
                        {
                            VisualData = new ActionVisualizedData
                            {
                                Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DeleteDataFolderTypeLabel"),
                                ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DeleteDataFolderTypeToolTip"),
                                Icon = GeneratedDataTypesElementProvider.DeleteDataTypeIcon,
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
                }

                element.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditFormWorkflow"), _editFormMarkupPermissionTypes) { Payload = _providerContext.ProviderName, DoIgnoreEntityTokenLocking = true }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditFormMarkup"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditFormMarkupToolTip"),
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

            if (searchToken.IsValidKeyword() == true)
            {
                types = types.Where(x => x.FullName.ToLower().Contains(searchToken.Keyword.ToLower()));
            }

            foreach (Type type in types)
            {
                string typeName = TypeManager.SerializeType(type);

                bool hasChildren = false;

                Element element = new Element(_providerContext.CreateElementHandle(new GeneratedDataTypesElementProviderTypeEntityToken(typeName, _providerContext.ProviderName, GeneratedDataTypesElementProviderRootEntityToken.PageMetaDataTypeFolderId)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = type.FullName,
                        ToolTip = type.FullName,
                        HasChildren = hasChildren,
                        Icon = GeneratedDataTypesElementProvider.InterfaceClosed,
                        OpenedIcon = GeneratedDataTypesElementProvider.InterfaceOpen
                    }
                };

                element.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditCompositionTypeWorkflow"), _editInterfaceTypePermissionTypes) { Payload = typeName }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditMetaDataTypeLabel"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditMetaDataTypeToolTip"),
                            Icon = GeneratedDataTypesElementProvider.EditDataTypeIcon,
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
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.DeleteCompositionTypeWorkflow"), _deleteInterfaceTypePermissionTypes) { Payload = typeName }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DeleteMetaDataTypeLabel"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DeleteMetaDataTypeToolTip"),
                            Icon = GeneratedDataTypesElementProvider.DeleteDataTypeIcon,
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
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditFormWorkflow"), _editFormMarkupPermissionTypes) { DoIgnoreEntityTokenLocking = true }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditFormMarkup"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditFormMarkupToolTip"),
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



            if ( PageMetaDataFacade.GetAllMetaDataTypes().Contains(type) == false)
            {
                element.AddAction(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditDataWorkflow"), _editDataPermissionTypes)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditData"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "EditDataToolTip"),
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
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.DeleteDataWorkflow"), _deleteDataPermissionTypes)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DeleteData"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DeleteDataToolTip"),
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
            }

            return element;
        }



        private Element GetGhostedElementFromData(IData data)
        {
            Type type = data.DataSourceId.InterfaceType;

            string label = string.Format("{0} ({1})", data.GetLabel(true), StringResourceSystemFacade.GetString("Composite.Cultures", UserSettings.ForeignLocaleCultureInfo.Name));

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

            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.LocalizeDataWorkflow"), _localizeDataPermissionTypes) { Payload = "Global" }))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "LocalizeData"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "LocalizeDataToolTip"),
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
            Type type = data.DataSourceId.InterfaceType;

            string label = string.Format("{0} ({1})", data.GetLabel(true), StringResourceSystemFacade.GetString("Composite.Cultures", UserSettings.ForeignLocaleCultureInfo.Name));

            Element element = new Element(_providerContext.CreateElementHandle(data.GetDataEntityToken()))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = label,
                    ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "DisabledData"),
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
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.AddNewDataWorkflow"), _addNewDataPermissionTypes) { DoIgnoreEntityTokenLocking = true, Payload = sb.ToString() }))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "AddData"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.GeneratedDataTypesElementProvider", "AddDataToolTip"),
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



        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }


    [Assembler(typeof(GeneratedDataTypesElementProviderAssembler))]
    internal sealed class GeneratedDataTypesElementProviderData : HooklessElementProviderData
    {
        private const string _onlyShowGlobalDatasPropertyName = "onlyShowGlobalDatas";
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
            GeneratedDataTypesElementProviderData data = (GeneratedDataTypesElementProviderData)objectConfiguration;

            return new GeneratedDataTypesElementProvider(data.OnlyShowGlobalDatas);
        }
    }
}
