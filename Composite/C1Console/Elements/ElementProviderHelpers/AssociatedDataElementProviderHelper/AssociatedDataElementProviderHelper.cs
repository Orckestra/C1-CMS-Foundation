using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Elements.ElementProviderHelpers.DataGroupingProviderHelper;
using Composite.C1Console.Security;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider;


namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    internal sealed class AssociatedDataElementProviderHelper<T> : IAuxiliarySecurityAncestorProvider
        where T : class, IData
    {
        internal delegate void HooksChangedCallbackDelegate();

        private ElementProviderContext _elementProviderContext;
        private EntityToken _rootEntityToken;
        private bool _addVisualFunctionActions;

        private ResourceHandle AddDataAssociationTypeIcon { get { return GetIconHandle("dataassociation-add-association"); } }
        private ResourceHandle EditDataAssociationTypeIcon { get { return GetIconHandle("dataassociation-edit-association"); } }
        private ResourceHandle RemoveDataAssociationTypeIcon { get { return GetIconHandle("dataassociation-remove-association"); } }
        public static ResourceHandle LocalizeDataTypeIcon { get { return GetIconHandle("generated-type-localize"); } }
        public static ResourceHandle DelocalizeDataTypeIcon { get { return GetIconHandle("generated-type-delocalize"); } }
        private ResourceHandle DataAssociationOpenIcon { get { return GetIconHandle("dataassociation-rootfolder-open"); } }
        private ResourceHandle DataAssociationClosedIcon { get { return GetIconHandle("dataassociation-rootfolder-closed"); } }
        private ResourceHandle InterfaceOpenIcon { get { return GetIconHandle("generated-interface-open"); } }
        private ResourceHandle InterfaceClosedIcon { get { return GetIconHandle("generated-interface-closed"); } }

        private ResourceHandle AddAssociatedDataIcon { get { return GetIconHandle("associated-data-add"); } }
        private ResourceHandle EditAssociatedDataIcon { get { return GetIconHandle("associated-data-edit"); } }
        private ResourceHandle DeleteAssociatedDataIcon { get { return GetIconHandle("associated-data-delete"); } }
        public static ResourceHandle LocalizeDataIcon { get { return GetIconHandle("generated-type-data-localize"); } }


        public static readonly Dictionary<string, ResourceHandle> DataIconLookup;

        internal static readonly PermissionType[] AddAssociatedTypePermissionTypes = new PermissionType[] { PermissionType.Configure, PermissionType.Administrate };
        internal static readonly PermissionType[] EditAssociatedTypePermissionTypes = new PermissionType[] { PermissionType.Configure, PermissionType.Administrate };
        internal static readonly PermissionType[] RemoveAssociatedTypePermissionTypes = new PermissionType[] { PermissionType.Configure, PermissionType.Administrate };
        private static readonly PermissionType[] _addAssociatedDataPermissionTypes = new PermissionType[] { PermissionType.Add };
        private static readonly PermissionType[] _editAssociatedDataPermissionTypes = new PermissionType[] { PermissionType.Edit };
        private static readonly PermissionType[] _deleteAssociatedDataPermissionTypes = new PermissionType[] { PermissionType.Delete };
        private static readonly PermissionType[] _localizeDataPermissionTypes = new PermissionType[] { PermissionType.Add };

        private static readonly ActionGroup AppendedActionGroup = new ActionGroup("Associated data", ActionGroupPriority.TargetedAppendMedium);
        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);


        private readonly DataGroupingProviderHelper.DataGroupingProviderHelper _dataGroupingProviderHelper;


        static AssociatedDataElementProviderHelper()
        {
            DataIconLookup = new Dictionary<string, ResourceHandle>();
            DataIconLookup.Add(GenericPublishProcessController.Draft, DataIconFacade.DataDraftIcon);
            DataIconLookup.Add(GenericPublishProcessController.AwaitingApproval, DataIconFacade.DataAwaitingApprovalIcon);
            DataIconLookup.Add(GenericPublishProcessController.AwaitingPublication, DataIconFacade.DataAwaitingPublicationIcon);
            DataIconLookup.Add(GenericPublishProcessController.Published, DataIconFacade.DataPublishedIcon);
        }



        public AssociatedDataElementProviderHelper(ElementProviderContext elementProviderContext, EntityToken rootEntityToken, bool addVisualFunctionActions)
        {
            if (elementProviderContext == null) throw new ArgumentNullException("elementProviderContext");
            if (rootEntityToken == null) throw new ArgumentNullException("rootEntityToken");

            _elementProviderContext = elementProviderContext;
            _rootEntityToken = rootEntityToken;
            _addVisualFunctionActions = addVisualFunctionActions;

            _dataGroupingProviderHelper = new DataGroupingProviderHelper.DataGroupingProviderHelper(elementProviderContext);
            _dataGroupingProviderHelper.OnOwnsType = type => typeof (IPageFolderData).IsAssignableFrom(type);
            _dataGroupingProviderHelper.OnCreateLeafElement = this.CreateElement;
            _dataGroupingProviderHelper.OnCreateDisabledLeafElement = data => ShowForeignElement(data, false);
            _dataGroupingProviderHelper.OnCreateGhostedLeafElement = data => ShowForeignElement(data, true);
            _dataGroupingProviderHelper.OnGetRootParentEntityToken = this.GetParentEntityToken;
            _dataGroupingProviderHelper.OnGetLeafsFilter = this.GetLeafsFilter;
            _dataGroupingProviderHelper.OnGetPayload = this.GetPayload;

            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataEntityToken>(this);
        }

        private string GetPayload(EntityToken entityToken)
        {
            return GetPageId(entityToken).ToString();
        }

        private Func<IData, bool> GetLeafsFilter(EntityToken parentEntityToken)
        {
            Guid pageId = GetPageId(parentEntityToken);
            return data => (data as IPageFolderData).PageId == pageId;
        }

        private Guid GetPageId(EntityToken entityToken)
        {
            var dataGroupingEntityToken = entityToken as DataGroupingProviderHelperEntityToken;
            if (dataGroupingEntityToken != null)
            {
                if(dataGroupingEntityToken.Payload.IsNullOrEmpty())
                {
                    return Guid.Empty;
                }

                return new Guid(dataGroupingEntityToken.Payload);
            }

            var pageFolderElementEntityToken = entityToken as AssociatedDataElementProviderHelperEntityToken;
            if( pageFolderElementEntityToken != null)
            {
                return new Guid(pageFolderElementEntityToken.Id);
            }

            var dataEntityToken = entityToken as DataEntityToken;
            if(dataEntityToken != null)
            {
                return (dataEntityToken.Data as IPageFolderData).PageId;
            }

            throw new InvalidOperationException("Unexpected entity token type '{0}'".FormatWith(entityToken.GetType().FullName));
        }

        private EntityToken GetParentEntityToken(Type interfaceType, EntityToken entityToken)
        {
            Verify.ArgumentNotNull(entityToken, "entityToken");

            Guid pageId = GetPageId(entityToken);

            if(pageId == Guid.Empty)
            {
                return null;
            }

            return new AssociatedDataElementProviderHelperEntityToken(
                TypeManager.SerializeType(typeof (IPage)),
                _elementProviderContext.ProviderName,
                pageId.ToString(),
                TypeManager.SerializeType(interfaceType));
        }


        /// <summary>
        /// Call this method to add actions to the element which represents the data of type T
        /// </summary>
        /// <param name="associatedDataElement"></param>
        /// <param name="data">Null is allowed</param>
        public void AttachElementActions(Element associatedDataElement, T data)
        {
            associatedDataElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AddDataFolderExWorkflow"), AddAssociatedTypePermissionTypes) { Payload = TypeManager.SerializeType(typeof(T)), DoIgnoreEntityTokenLocking = true }))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddDataFolderTypeLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddDataFolderTypeToolTip"),
                    Icon = this.AddDataAssociationTypeIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Add,
                        IsInFolder = false,
                        IsInToolbar = false,
                        ActionGroup = AppendedActionGroup
                    }
                }
            });


            associatedDataElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AddMetaDataWorkflow"), AddAssociatedTypePermissionTypes) { Payload = TypeManager.SerializeType(typeof(T)), DoIgnoreEntityTokenLocking = true }))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataTypeLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddMetaDataTypeToolTip"),
                    Icon = this.AddDataAssociationTypeIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Add,
                        IsInFolder = false,
                        IsInToolbar = false,
                        ActionGroup = AppendedActionGroup
                    }
                }
            });


            associatedDataElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.EditMetaDataWorkflow"), EditAssociatedTypePermissionTypes) { DoIgnoreEntityTokenLocking = true }))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.EditMetaDataTypeLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.EditMetaDataTypeToolTip"),
                    Icon = this.EditDataAssociationTypeIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Edit,
                        IsInFolder = false,
                        IsInToolbar = false,
                        ActionGroup = AppendedActionGroup
                    }
                }
            });


            associatedDataElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.DeleteMetaDataWorkflow"), RemoveAssociatedTypePermissionTypes)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.RemoveMetaDataTypeLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.RemoveMetaDataTypeToolTip"),
                    Icon = this.RemoveDataAssociationTypeIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Delete,
                        IsInFolder = false,
                        IsInToolbar = false,
                        ActionGroup = AppendedActionGroup
                    }
                }
            });
            
        }



        public bool HasChildren(T data)
        {
            return PageFolderFacade.HasFolderDefinitions((IPage)data);
        }



        public List<Element> GetChildren(T data, EntityToken parentEntityToken)
        {
            List<Element> children = new List<Element>();

            PropertyInfo idPropertyInfo = typeof(T).GetKeyProperties()[0];

            foreach (Type type in PageFolderFacade.GetDefinedFolderTypes((IPage)data).OrderBy(t => t.Name))
            {
                AssociatedDataElementProviderHelperEntityToken entityToken = new AssociatedDataElementProviderHelperEntityToken(
                            TypeManager.SerializeType(typeof(T)),
                            _elementProviderContext.ProviderName,
                            ValueTypeConverter.Convert<string>(idPropertyInfo.GetValue(data, null)),
                            TypeManager.SerializeType(type)
                        );

                DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);

                Element element = new Element(_elementProviderContext.CreateElementHandle(entityToken))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = dataTypeDescriptor.Title ?? type.Name,
                        ToolTip = dataTypeDescriptor.Title ?? type.Name,
                        Icon = this.InterfaceClosedIcon,
                        OpenedIcon = this.InterfaceOpenIcon,
                        HasChildren = true // This is sat to always true to boost performance.
                    }
                };


                element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow"), RemoveAssociatedTypePermissionTypes)))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.RemoveAssociatedTypeLabel"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.RemoveAssociatedTypeToolTip"),
                        Icon = this.RemoveDataAssociationTypeIcon,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Delete,
                            IsInFolder = false,
                            IsInToolbar = false,
                            ActionGroup = AppendedActionGroup
                        }
                    }
                });

                AddAddAssociatedDataAction(element, true);

                children.Add(element);
            }

            return children;
        }



        public List<Element> GetChildren(AssociatedDataElementProviderHelperEntityToken entityToken, bool includeForeignFolders)
        {
            IData data = entityToken.GetData();
            Type interfaceType = TypeManager.TryGetType(entityToken.Payload);

            if (data == null) return new List<Element>();
            if (interfaceType == null) return new List<Element>();


            return _dataGroupingProviderHelper.GetRootGroupFolders(interfaceType, entityToken, includeForeignFolders).ToList();
        }


        public List<Element> GetChildren(DataGroupingProviderHelperEntityToken entityToken, bool includeForeignFolders)
        {
            return _dataGroupingProviderHelper.GetGroupChildren(entityToken, includeForeignFolders).ToList();
        }


        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            Dictionary<EntityToken, IEnumerable<EntityToken>> result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                DataEntityToken dataEntityToken = entityToken as DataEntityToken;
                if (dataEntityToken.Data == null) continue;

                Type interfaceType = dataEntityToken.InterfaceType;

                if (PageFolderFacade.GetAllFolderTypes().Contains(interfaceType) == false) continue;

                IData data = dataEntityToken.Data;
                IPage referencedPage = PageFolderFacade.GetReferencedPage(data);
                if (referencedPage == null) continue; // TODO: check this branch

                result.Add(entityToken,
                    new AssociatedDataElementProviderHelperEntityToken[] 
                    {
                        new AssociatedDataElementProviderHelperEntityToken(
                        TypeManager.SerializeType(typeof(T)),
                        _elementProviderContext.ProviderName,
                        ValueTypeConverter.Convert<string>(referencedPage.Id),
                        TypeManager.SerializeType(interfaceType))
                    });
            }

            return result;
        }


        private Element CreateElement(IData data)
        {
            string label = data.GetLabel();

            Element element = new Element(_elementProviderContext.CreateElementHandle(data.GetDataEntityToken()))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = label,
                    ToolTip = label,
                    HasChildren = false,
                    Icon = (data is IPublishControlled 
                    ? DataIconLookup[((IPublishControlled)data).PublicationStatus] 
                    : DataIconFacade.DataPublishedIcon)
                }
            };

            AddEditAssociatedDataAction(element);
            AddDeleteAssociatedDataAction(element);

            return element;
        }

        private Element ShowForeignElement(IData data, bool enabled)
        {
            string label = string.Format("{0} ({1})", data.GetLabel(true), DataLocalizationFacade.GetCultureTitle(UserSettings.ForeignLocaleCultureInfo));

            EntityToken entityToken = data.GetDataEntityToken();

            if (enabled)
            {
                Element element = new Element(_elementProviderContext.CreateElementHandle(entityToken))
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

                element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.LocalizeDataWorkflow"), _localizeDataPermissionTypes) { Payload = "Pagefolder" }))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.LocalizeData"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.LocalizeDataToolTip"),
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
            
            return new Element(_elementProviderContext.CreateElementHandle(entityToken))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = label,
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.DisabledData"),
                    HasChildren = false,
                    Icon = DataIconFacade.DataDisabledIcon,
                    IsDisabled = true
                }
            };
        }


        #region Action methods
        private void AddAddAssociatedDataAction(Element element, bool isInToolbar)
        {
            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AddAssociatedDataWorkflow"), _addAssociatedDataPermissionTypes)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddAssociatedDataLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.AddAssociatedDataToolTip"),
                    Icon = this.AddAssociatedDataIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Add,
                        IsInFolder = false,
                        IsInToolbar = isInToolbar,
                        ActionGroup = AppendedActionGroup
                    }
                }
            });
        }



        private void AddEditAssociatedDataAction(Element element)
        {
            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.EditAssociatedDataWorkflow"), _editAssociatedDataPermissionTypes)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.EditAssociatedDataLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.EditAssociatedDataToolTip"),
                    Icon = this.EditAssociatedDataIcon,
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



        private void AddDeleteAssociatedDataAction(Element element)
        {
            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.DeleteAssociatedDataWorkflow"), _deleteAssociatedDataPermissionTypes)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.DeleteAssociatedDataLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "AssociatedDataElementProviderHelper.DeleteAssociatedDataToolTip"),
                    Icon = this.DeleteAssociatedDataIcon,
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
        #endregion



        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}