using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Hosting;
using Composite.C1Console.Actions;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Foundation;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.Search;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;

using UserTexts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_C1Console_Users;
using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Management;


namespace Composite.Plugins.Elements.ElementProviders.VirtualElementProvider
{
    [ConfigurationElementType(typeof(VirtualElementProviderData))]

#pragma warning disable 612 // There is no easy/fast way to make this hookless /MRJ
    internal sealed class VirtualElementProvider : IElementProvider, IDataExchangingElementProvider, ILocaleAwareElementProvider
#pragma warning restore 612
    {
        private static readonly string RootElementId = "ID01";

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        private ElementProviderContext _context;

        private List<EntityTokenHook> _currentEntityTokenHooks;

        public static ResourceHandle ChangeOwnPasswordIcon => GetIconHandle("users-changeownpassword");
        public static ResourceHandle ChangeOwnCultureIcon => GetIconHandle("users-changeownculture");
        public static ResourceHandle SendMessageIcon => GetIconHandle("balloon");
        public static ResourceHandle RebuildSearchIndexIcon => GetIconHandle("refresh");
        public static ResourceHandle RestartApplicationIcon => GetIconHandle("restart-application");
        public static ResourceHandle ManageSecurityIcon => GetIconHandle("security-manage-permissions");
        public static ResourceHandle ChangeOwnActiveAndForeignLocaleIcon => GetIconHandle("localization-changelocale");

        private static readonly string LogTitle = typeof (VirtualElementProvider).Name;
        private static readonly HashSet<string> _notLoadedVirtualElements = new HashSet<string>();

        private readonly VirtualElementProviderData _configuration;

        public VirtualElementProvider(VirtualElementProviderData configuration)
        {
            _configuration = configuration;

            HookingFacade.SubscribeToNewElementProviderRootEntitiesEvent(OnNewElementProviderRootEntitiesEvent);
        }



        public ElementProviderContext Context
        {
            set { _context = value; }
        }



        public bool ContainsLocalizedData
        {
            get
            {
                return GetAttachedElementProviderNames(_configuration.Perspectives)
                       .Any(providerName => ElementFacade.ContainsLocalizedData(new ElementProviderHandle(providerName)));
            }
        }



        public IEnumerable<Element> GetRoots(SearchToken seachToken)
        {
            EntityToken entityToken = new VirtualElementProviderEntityToken(_context.ProviderName, RootElementId);

            var root = new Element(_context.CreateElementHandle(entityToken))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = "${Composite.Management, VirtualElementProviderElementProvider.ID01}",
                    Icon = CommonElementIcons.Folder,
                    OpenedIcon = CommonElementIcons.FolderOpen,
                    ToolTip = ""
                },
                TagValue = "Root"
            };

            root.ElementExternalActionAdding = root.ElementExternalActionAdding.Remove(ElementExternalActionAdding.AllowGlobal);

            AddRootActions(root);

            return new [] { root };
        }



        public IEnumerable<Element> GetForeignRoots(SearchToken seachToken)
        {
            // Expected that root note is a foldernode
            return GetRoots(seachToken);
        }



        private void AddRootActions(Element element)
        {
            // "User" actions
            element.AddAction(new ElementAction(new ActionHandle(
                new WorkflowActionToken(
                    WorkflowFacade.GetWorkflowType("Composite.C1Console.Users.Workflows.ChangeOwnForeignLocaleWorkflow"),
                    new PermissionType[] { }
                )))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = UserTexts.ChangeForeignLocaleWorkflow_ActionLabel,
                    ToolTip = UserTexts.ChangeForeignLocaleWorkflow_ActionToolTip,
                    Icon = VirtualElementProvider.ChangeOwnActiveAndForeignLocaleIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Add,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                },
                TagValue = "User"
            });


            element.AddAction(new ElementAction(new ActionHandle(
                new WorkflowActionToken(
                    WorkflowFacade.GetWorkflowType("Composite.C1Console.Users.Workflows.ChangeOwnCultureWorkflow"),
                    new PermissionType[] { }
                )))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = UserTexts.ChangeOwnCultureWorkflow_ElementActionLabel,
                    ToolTip = UserTexts.ChangeOwnCultureWorkflow_ElementActionToolTip,
                    Icon = VirtualElementProvider.ChangeOwnCultureIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Add,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                },
                TagValue = "User"
            });


            if (UserValidationFacade.CanSetUserPassword)
            {
                element.AddAction(new ElementAction(new ActionHandle(
                    new WorkflowActionToken(
                        WorkflowFacade.GetWorkflowType("Composite.C1Console.Users.Workflows.ChangeOwnPasswordWorkflow"),
                        new PermissionType[] { }
                    )
                    { DoIgnoreEntityTokenLocking = true }))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = UserTexts.ChangeOwnPasswordWorkflow_ElementActionLabel,
                        ToolTip = UserTexts.ChangeOwnPasswordWorkflow_ElementActionToolTip,
                        Icon = VirtualElementProvider.ChangeOwnPasswordIcon,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Add,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }
                    },
                    TagValue = "User"
                });
            }

            // Other actions

            string manageGlobalUserPermissionsLabel = StringResourceSystemFacade.GetString("Composite.Management", "ManageUserPermissions.ManageGlobalUserPermissionsLabel");
            string manageUserPermissionsToolTip = StringResourceSystemFacade.GetString("Composite.Management", "ManageUserPermissions.ManageUserPermissionsToolTip");

            element.AddAction(new ElementAction(new ActionHandle(new ManageUserPermissionsActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = manageGlobalUserPermissionsLabel,
                    ToolTip = manageUserPermissionsToolTip,
                    Icon = ManageSecurityIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = false,
                        ActionGroup = PrimaryActionGroup,
                        ActionBundle = StringResourceSystemFacade.GetString("Composite.Management", "VirtualElementProviderElementProvider.RootActions.GlobalSetting")
                    }
                }
            });

            element.AddAction(
                    new ElementAction(
                        new ActionHandle(
                            new WorkflowActionToken(
                                WorkflowFacade.GetWorkflowType("Composite.C1Console.Tools.SetTimeZoneWorkflow"))))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.Management", "VirtualElementProviderElementProvider.RootActions.SetTimezoneLabel"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "VirtualElementProviderElementProvider.RootActions.SetTimezoneTooltip"),
                            Icon = VirtualElementProvider.ChangeOwnCultureIcon,
                            Disabled = false,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Other,
                                IsInFolder = false,
                                IsInToolbar = false,
                                ActionGroup = PrimaryActionGroup,
                                ActionBundle = StringResourceSystemFacade.GetString("Composite.Management", "VirtualElementProviderElementProvider.RootActions.GlobalSetting")
                            }
                        }
                    });

            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Tools.SendMessageToConsolesWorkflow"))))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "VirtualElementProviderElementProvider.RootActions.SendMessageLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "VirtualElementProviderElementProvider.RootActions.SendMessageTooltip"),
                    Icon = VirtualElementProvider.SendMessageIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = false,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            });

            if (ServiceLocator.HasService(typeof (ISearchIndexUpdater)))
            {
                element.AddAction(new ElementAction(new RebuildSearchIndexActionToken())
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = Texts.VirtualElementProviderElementProvider_RootActions_RebuildSearchIndexLabel,
                        ToolTip = Texts.VirtualElementProviderElementProvider_RootActions_RebuildSearchIndexTooltip,
                        Icon = RebuildSearchIndexIcon,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Other,
                            IsInFolder = false,
                            IsInToolbar = false,
                            ActionGroup = PrimaryActionGroup
                        }
                    }
                });
            }

            element.AddAction(new ElementAction(new RestartApplicationActionToken())
            {
                VisualData = new ActionVisualizedData
                {
                    Label = Texts.VirtualElementProviderElementProvider_RootActions_RestartApplicationLabel,
                    ToolTip = Texts.VirtualElementProviderElementProvider_RootActions_RestartApplicationTooltip,
                    Icon = RestartApplicationIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = false,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            });
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken seachToken)
        {
            return GetChildren(entityToken, seachToken, false);
        }



        public IEnumerable<Element> GetForeignChildren(EntityToken entityToken, SearchToken seachToken)
        {
            return GetChildren(entityToken, seachToken, true);
        }



        private IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken seachToken, bool useForeign)
        {
            IEnumerable<VirtualElementConfigurationElement> elementNodes;

            if(entityToken.Id == RootElementId)
            {
                elementNodes = _configuration.Perspectives;
            }
            else
            {
                SimpleVirtualElement node = FindElementNode(entityToken.Id, _configuration.Perspectives);

                Verify.IsNotNull(node, "No corresponding node was found with the id '{0}'", entityToken.Id);

                elementNodes = node.Elements;
            }

            var result = new List<Element>();

            foreach (var elementNode in elementNodes)
            {
                if (elementNode is SimpleVirtualElement)
                {
                    Element createdElement;
                    if(TryBuildElement(elementNode as SimpleVirtualElement, out createdElement))
                    {
                        result.Add(createdElement);
                    }
                    continue;
                }

                if (elementNode is AttachProviderVirtualElement)
                {
                    string providerName = (elementNode as AttachProviderVirtualElement).ProviderName;

                    var providerHandle = new ElementProviderHandle(providerName);

                    List<Element> elementsFromProvider;
                    if (useForeign && ElementFacade.IsLocaleAwareElementProvider(providerHandle))
                    {
                        elementsFromProvider = ElementFacade.GetForeignRoots(providerHandle, seachToken).ToList();
                    }
                    else
                    {
                        elementsFromProvider = ElementFacade.GetRoots(providerHandle, seachToken).ToList();
                    }

                    foreach (Element element in elementsFromProvider)
                    {
                        element.ElementExternalActionAdding = element.ElementExternalActionAdding.Remove(ElementExternalActionAdding.AllowGlobal);
                    }

                    result.AddRange(elementsFromProvider);
                    continue;
                }

                throw new NotSupportedException();
            }

            return result;
        }

        private bool TryBuildElement(SimpleVirtualElement simpleVirtualElement, out Element result)
        {
            try
            {
                result = CreateElement(simpleVirtualElement);
            }
            catch (ConfigurationErrorsException exception)
            {
                string elementName = simpleVirtualElement.Name ?? "";

                lock (_notLoadedVirtualElements)
                {
                    if (!_notLoadedVirtualElements.Contains(elementName))
                    {
                        Log.LogError(LogTitle, "Failed to initialize virtual element/perspective. Label: '{0}', name: '{1}'\n" +
                                               "Remove the related configuration element from /App_Data/Composite/Composite.Config if it refers to a package that is no longer installed.",
                                               simpleVirtualElement.Label ?? "", elementName);

                        Log.LogError(LogTitle, exception);

                        _notLoadedVirtualElements.Add(elementName);
                    }
                }

                result = null;
            }

            return result != null;
        }

        public List<EntityTokenHook> GetHooks()
        {
            return this.CurrentEntityTokenHooks;
        }



        public object GetData(string elementId)
        {
            string parentNodeId = GetParentNodeId(elementId, RootElementId, _configuration.Perspectives);

            if (parentNodeId == null)
            {
                return null;
            }

            return new VirtualElementProviderEntityToken(_context.ProviderName, parentNodeId);
        }


        private List<EntityTokenHook> CurrentEntityTokenHooks
        {
            get
            {
                if (_currentEntityTokenHooks == null)
                {
                    var result = new List<EntityTokenHook>();
                    CreateHooks(result);

                    _currentEntityTokenHooks = result;
                }

                return _currentEntityTokenHooks;
            }
        }



        private IEnumerable<string> GetAttachedElementProviderNames(IEnumerable<VirtualElementConfigurationElement> elements)
        {
            foreach (var virtualElement in elements)
            {
                if(virtualElement is AttachProviderVirtualElement)
                {
                    yield return (virtualElement as AttachProviderVirtualElement).ProviderName;
                    continue;
                }

                if (virtualElement is SimpleVirtualElement)
                {
                    foreach (var providerName in GetAttachedElementProviderNames((virtualElement as SimpleVirtualElement).Elements))
                    {
                        yield return providerName;
                    }
                    continue;
                }

                throw new NotSupportedException("Not supported VirtualElementConfigurationElement type");
            }
        }



        private SimpleVirtualElement FindElementNode(string name, IEnumerable<VirtualElementConfigurationElement> elements)
        {
            foreach (var element in elements.OfType<SimpleVirtualElement>())
            {
                if (element.Name == name) return element;

                SimpleVirtualElement foundNode = FindElementNode(name, element.Elements);

                if (foundNode != null) return foundNode;
            }

            return null;
        }



        private string GetParentNodeId(string name, string currentId, IEnumerable<VirtualElementConfigurationElement> elements)
        {
            foreach (var element in elements.OfType<SimpleVirtualElement>())
            {
                if (element.Name == name) return currentId;

                string foundNode = GetParentNodeId(name, element.Name, element.Elements);

                if (foundNode != null) return foundNode;
            }

            return null;
        }


        private void CreateHooks(List<EntityTokenHook> foundHooks)
        {
            CreateHooks(RootElementId, _configuration.Perspectives, foundHooks);
        }


        private void CreateHooks(string parentId, IEnumerable<VirtualElementConfigurationElement> elements, List<EntityTokenHook> foundHooks)
        {
            var entityToken = new VirtualElementProviderEntityToken(_context.ProviderName, parentId);
            var entityTokenHook = new EntityTokenHook(entityToken);

            foreach (var attachProviderElement in elements.OfType<AttachProviderVirtualElement>())
            {
                lock (_notLoadedVirtualElements)
                {
                    if(_notLoadedVirtualElements.Contains(attachProviderElement.Name)) continue;
                }


                string providerName = attachProviderElement.ProviderName;
                var childElements = ElementFacade.GetRootsWithNoSecurity(new ElementProviderHandle(providerName), null).ToList();

                foreach (Element childElement in childElements)
                {
                    entityTokenHook.AddHookie(childElement.ElementHandle.EntityToken);
                }
            }

            foundHooks.Add(entityTokenHook);

            foreach (var simpleElement in elements.OfType<SimpleVirtualElement>())
            {
                CreateHooks(simpleElement.Name, simpleElement.Elements, foundHooks);
            }
        }



        private Element CreateElement(SimpleVirtualElement simpleElementNode)
        {
            EntityToken entityToken = new VirtualElementProviderEntityToken(_context.ProviderName, simpleElementNode.Name);

            Element element = new Element(_context.CreateElementHandle(entityToken))
            {
                TagValue = simpleElementNode.Tag,
                VisualData = new ElementVisualizedData
                {
                    Label = StringResourceSystemFacade.ParseString(simpleElementNode.Label),
                    HasChildren = true // fixing refresh problem easy way... was: HasChildren(baseElementNode)
                }
            };



            Action<IEnumerable> collectProviders = null;

            // Recursively searching for attached providers
            var attachedProviders = new List<AttachProviderVirtualElement>();
            collectProviders = currentElements =>
            {
                attachedProviders.AddRange(currentElements.OfType<AttachProviderVirtualElement>());
                currentElements.OfType<SimpleVirtualElement>().ForEach(e => collectProviders(e.Elements));
            };
            collectProviders(simpleElementNode.Elements);


            foreach (var attachedProvider in attachedProviders)
            {
                if (ElementFacade.ContainsLocalizedData(new ElementProviderHandle(attachedProvider.ProviderName)))
                {
                    element.IsLocaleAware = true;
                }
            }


            if (element.VisualData.HasChildren)
            {
                ResourceHandle openHandle = IconResourceSystemFacade.GetResourceHandle(simpleElementNode.OpenFolderIconName);
                ResourceHandle closeHandle = IconResourceSystemFacade.GetResourceHandle(simpleElementNode.CloseFolderIconName);

                closeHandle = closeHandle ?? openHandle;
                openHandle = openHandle ?? closeHandle;

                if (openHandle == null)
                {
                    openHandle = CommonElementIcons.Folder;
                    closeHandle = CommonElementIcons.FolderOpen;
                }

                element.VisualData.Icon = openHandle;
                element.VisualData.OpenedIcon = closeHandle;
            }
            else
            {
                element.VisualData.Icon = CommonElementIcons.FolderDisabled;
            }

            var placeholderElementNode = simpleElementNode as PlaceholderVirtualElement;
            if (placeholderElementNode != null)
            {
                element.PropertyBag["Path"] = placeholderElementNode.Path;
                element.PropertyBag["IsTool"] = placeholderElementNode.IsTool;
            }

            return element;
        }



        private bool HasChildren(BaseElementNode baseElementNode)
        {
            if (baseElementNode is FolderElementNode)
            {
                return baseElementNode.Children.Count != 0;
            }

            if (baseElementNode is ProviderHookingElementNode)
            {
                return true;

                // Non-lazy check children
                //ProviderHookingElementNode proivderNode = (ProviderHookingElementNode)baseElementNode;

                //List<Element> children = ElementFacade.GetRoots(proivderNode.ProviderName);

                //return children.Count != 0;
            }

            throw new NotSupportedException(string.Format("The element node type '{0}' is not supported", baseElementNode.GetType()));
        }



        private void OnNewElementProviderRootEntitiesEvent(HookingFacadeEventArgs hookingFacadeEventArgs)
        {
            if (_currentEntityTokenHooks != null)
            {
                HookingFacade.RemoveHooks(this.CurrentEntityTokenHooks);
            }

            var newHooks = new List<EntityTokenHook>();
            CreateHooks(newHooks);

            _currentEntityTokenHooks = newHooks;

            HookingFacade.AddHooks(this.CurrentEntityTokenHooks);
        }




        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }



#pragma warning disable 612
    internal sealed class VirtualElementProviderAssembler : IAssembler<IElementProvider, ElementProviderData>
    {
        public IElementProvider Assemble(IBuilderContext context, ElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
#pragma warning restore 612
        {
            var configuration = (VirtualElementProviderData)objectConfiguration;

            return new VirtualElementProvider(configuration);
        }
    }




    [Assembler(typeof(VirtualElementProviderAssembler))]
#pragma warning disable 612
    internal sealed class VirtualElementProviderData : ElementProviderData
#pragma warning restore 612
    {
        private const string _perspectivesProperty = "Perspectives";
        [ConfigurationProperty(_perspectivesProperty, IsRequired = true)]
        public NameTypeConfigurationElementCollection<VirtualElementConfigurationElement, VirtualElementConfigurationElement> Perspectives
        {
            get
            {
                return (NameTypeConfigurationElementCollection<VirtualElementConfigurationElement, VirtualElementConfigurationElement>)base[_perspectivesProperty];
            }
        }
    }




    [ActionExecutor(typeof(RebuildSearchIndexActionExecutor))]
    internal sealed class RebuildSearchIndexActionToken : ActionToken
    {
        private static readonly IEnumerable<PermissionType> _permissionType = new [] { PermissionType.Administrate };

        public override IEnumerable<PermissionType> PermissionTypes => _permissionType;

        public override string Serialize() => nameof(RebuildSearchIndexActionToken);

        public static ActionToken Deserialize(string serializedData) => new RebuildSearchIndexActionToken();
    }


    [ActionExecutor(typeof(RestartApplicationActionExecutor))]
    internal sealed class RestartApplicationActionToken : ActionToken
    {
        private static readonly IEnumerable<PermissionType> _permissionType = new [] { PermissionType.Administrate };

        public override IEnumerable<PermissionType> PermissionTypes => _permissionType;

        public override string Serialize() => nameof(RestartApplicationActionToken);

        public static ActionToken Deserialize(string serializedData) => new RestartApplicationActionToken();
    }


    internal sealed class RebuildSearchIndexActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            var service = ServiceLocator.GetService<ISearchIndexUpdater>();
            service?.Rebuild();

            return null;
        }
    }


    internal sealed class RestartApplicationActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            HostingEnvironment.InitiateShutdown();

            return null;
        }
    }
}
