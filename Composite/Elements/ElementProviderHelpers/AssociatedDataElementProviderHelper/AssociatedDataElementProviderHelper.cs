using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.ResourceSystem;
using Composite.ResourceSystem.Icons;
using Composite.Security;
using Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider;
using Composite.Types;
using Composite.Users;
using Composite.Workflow;
using Composite.Parallelization;
using Composite.Data.Types;


namespace Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    public sealed class AssociatedDataElementProviderHelper<T> : IAuxiliarySecurityAncestorProvider
        where T : class, IData
    {
        public delegate void HooksChangedCallbackDelegate();

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

        private static readonly PermissionType[] _addAssociatedTypePermissionTypes = new PermissionType[] { PermissionType.Add };
        private static readonly PermissionType[] _editAssociatedTypePermissionTypes = new PermissionType[] { PermissionType.Edit };
        private static readonly PermissionType[] _removeAssociatedTypePermissionTypes = new PermissionType[] { PermissionType.Delete };
        private static readonly PermissionType[] _addAssociatedDataPermissionTypes = new PermissionType[] { PermissionType.Add };
        private static readonly PermissionType[] _editAssociatedDataPermissionTypes = new PermissionType[] { PermissionType.Edit };
        private static readonly PermissionType[] _deleteAssociatedDataPermissionTypes = new PermissionType[] { PermissionType.Delete };
        private static readonly PermissionType[] _localizeDataPermissionTypes = new PermissionType[] { PermissionType.Add };

        private static readonly ActionGroup AppendedActionGroup = new ActionGroup("Associated data", ActionGroupPriority.TargetedAppendMedium);
        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);



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

            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataEntityToken>(this);
        }




        /// <summary>
        /// Call this method to add actions to the element which represents the data of type T
        /// </summary>
        /// <param name="associatedDataElements"></param>
        /// <param name="data">Null is allowed</param>
        public void AttachElementActions(Element associatedDataElement, T data)
        {
            associatedDataElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AddDataFolderExWorkflow"), _addAssociatedTypePermissionTypes) { Payload = TypeManager.SerializeType(typeof(T)), DoIgnoreEntityTokenLocking = true }))
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


            associatedDataElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AddMetaDataWorkflow"), _addAssociatedTypePermissionTypes) { Payload = TypeManager.SerializeType(typeof(T)), DoIgnoreEntityTokenLocking = true }))
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


            associatedDataElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Workflows.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.EditMetaDataWorkflow"), _editAssociatedTypePermissionTypes) { DoIgnoreEntityTokenLocking = true }))
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


            associatedDataElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.DeleteMetaDataWorkflow"), _removeAssociatedTypePermissionTypes)))
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

            PropertyInfo idPropertyInfo = typeof(T).GetKeyPropertyInfoes()[0];

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


                element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.DeleteDataFolderWorkflow"), _removeAssociatedTypePermissionTypes)))
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

            return GetAggregationDataTypeFolderChildren(entityToken.GetData(), interfaceType, includeForeignFolders);
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



        private List<Element> GetAggregationDataTypeFolderChildren(IData data, Type assiciationType, bool includeForeignFolders)
        {
            IPage page = (IPage)data;

            List<Element> elements = new List<Element>();

            IEnumerable<IData> childDatas = null;

            if (page.GetDefinedFolderTypes().Contains(assiciationType) == true)
            {
                childDatas = page.GetFolderData(assiciationType);
            }
            else
            {
                childDatas = new List<IData>();
            }

            childDatas = childDatas.ToList().OrderBy(d => d.GetLabel());

            foreach (IData childData in childDatas)
            {
                string label = childData.GetLabel();

                Element element = new Element(_elementProviderContext.CreateElementHandle(childData.GetDataEntityToken()))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = label,
                        ToolTip = label,
                        HasChildren = false,
                        Icon = (childData is IPublishControlled ? DataIconLookup[((IPublishControlled)childData).PublicationStatus] : DataIconFacade.DataPublishedIcon)
                    }
                };

                AddEditAssociatedDataAction(element);
                AddDeleteAssociatedDataAction(element);

                elements.Add(element);
            }


            if (includeForeignFolders == true)
            {
                using (DataScope localeScope = new DataScope(UserSettings.ForeignLocaleCultureInfo))
                {
                    childDatas = page.GetFolderData(assiciationType);

                    foreach (IData childData in childDatas)
                    {
                        IData foreignData;
                        bool enabled = GetDataFromCorrectScope(childData, out foreignData);

                        EntityToken entityToken = foreignData.GetDataEntityToken();

                        bool exists = elements.Where(f => f.ElementHandle.EntityToken.Equals(entityToken) == true).Any();

                        if (exists == false)
                        {
                            string label = string.Format("{0} ({1})", foreignData.GetLabel(true), StringResourceSystemFacade.GetString("Composite.Cultures", UserSettings.ForeignLocaleCultureInfo.Name));

                            if (enabled == true)
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

                                element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.LocalizeDataWorkflow"), _localizeDataPermissionTypes) { Payload = "Pagefolder" }))
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

                                elements.Add(element);
                            }
                            else
                            {
                                Element element = new Element(_elementProviderContext.CreateElementHandle(entityToken))
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

                                elements.Add(element);
                            }
                        }
                    }
                }
            }

            return elements;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <param name="foreignData"></param>
        /// <returns>Returns true if the element should be enabled</returns>
        private bool GetDataFromCorrectScope(IData data, out IData foreignData)
        {
            foreignData = null;
            IPublishControlled publishControlled = data as IPublishControlled;
            if (publishControlled != null)
            {
                if ((publishControlled.PublicationStatus == GenericPublishProcessController.Draft) || (publishControlled.PublicationStatus == GenericPublishProcessController.AwaitingApproval))
                {
                    IData publicData = DataFacade.GetDataFromOtherScope(data, DataScopeIdentifier.Public).SingleOrDefault();
                    if (publicData != null)
                    {
                        foreignData = publicData;
                        return true;
                    }
                    else
                    {
                        // Disabled
                        foreignData = data;
                        return false;
                    }
                }
                else
                {
                    foreignData = data;
                    return true;
                }
            }
            else
            {
                foreignData = data;
                return true;
            }
        }



        #region Action methods
        private void AddAddAssociatedDataAction(Element element, bool isInToolbar)
        {
            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.AddAssociatedDataWorkflow"), _addAssociatedDataPermissionTypes)))
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
            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.EditAssociatedDataWorkflow"), _editAssociatedDataPermissionTypes)))
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
            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper.DeleteAssociatedDataWorkflow"), _deleteAssociatedDataPermissionTypes)))
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
