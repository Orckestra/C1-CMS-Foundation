using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Hosting;
using Composite.C1Console.Actions;
using Composite.Core.Application;
using Composite.C1Console.Events;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Foundation;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.C1Console.Security;
using Composite.Core.Types;
using Composite.Core.WebClient;
using Composite.C1Console.Workflow;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Elements.ElementProviders.VirtualElementProvider
{
    [ConfigurationElementType(typeof(VirtualElementProviderData))]

#pragma warning disable 612 // There is no easy/fast way to make this hookless /MRJ
    internal sealed class VirtualElementProvider : IElementProvider, IDataExchangingElementProvider, ILocaleAwareElementProvider
#pragma warning restore 612
    {

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        private ElementProviderContext _context;
        private BaseElementNode _rootNode;

        private List<EntityTokenHook> _currentEntityTokenHooks;

        public static ResourceHandle ChangeOwnPasswordIcon { get { return GetIconHandle("users-changeownpassword"); } }
        public static ResourceHandle ChangeOwnCultureIcon { get { return GetIconHandle("users-changeownculture"); } }
        public static ResourceHandle ShowLogIcon { get { return GetIconHandle("log-showlog"); } }
        public static ResourceHandle SendMessageIcon { get { return GetIconHandle("balloon"); } }
        public static ResourceHandle RestartApplicationIcon { get { return GetIconHandle("restart-application"); } }
        public static ResourceHandle ManageSecurityIcon { get { return GetIconHandle("security-manage-permissions"); } }
        public static ResourceHandle ChangeOwnActiveAndForeignLocaleIcon { get { return GetIconHandle("localization-changelocale"); } }

        public VirtualElementProvider()
        {
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
                foreach (ProviderHookingElementNode node in GetProviderHookingElementNodes(_rootNode))
                {
                    foreach (string providerName in node.ProviderNames)
                    {
                        if (ElementFacade.ContainsLocalizedData(new ElementProviderHandle(providerName)) == true)
                        {
                            return true;
                        }
                    }
                }

                return false;
            }
        }



        public IEnumerable<Element> GetRoots(SearchToken seachToken)
        {
            List<Element> roots = new List<Element>();
            roots.Add(CreateElement(_rootNode));
            roots[0].ElementExternalActionAdding = ElementExternalActionAddingExtensions.Remove(roots[0].ElementExternalActionAdding, ElementExternalActionAdding.AllowGlobal);
            roots[0].TagValue = "Root";

            AddRootActions(roots[0]);

            return roots;
        }



        public IEnumerable<Element> GetForeignRoots(SearchToken seachToken)
        {
            // Expected that root note is a foldernode
            return GetRoots(seachToken);
        }



        private void AddRootActions(Element element)
        {
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
                        ActionGroup = PrimaryActionGroup
                    }
                }
            });



            element.AddAction(new ElementAction(new ActionHandle(
                new WorkflowActionToken(
                    WorkflowFacade.GetWorkflowType("Composite.C1Console.Users.Workflows.ChangeOwnPasswordWorkflow"),
                    new PermissionType[] {  }
                )))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.C1Console.Users", "ChangeOwnPasswordWorkflow.ElementActionLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.C1Console.Users", "ChangeOwnPasswordWorkflow.ElementActionToolTip"),
                    Icon = VirtualElementProvider.ChangeOwnPasswordIcon,
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


            element.AddAction(new ElementAction(new ActionHandle(
                new WorkflowActionToken(
                    WorkflowFacade.GetWorkflowType("Composite.C1Console.Users.Workflows.ChangeOwnCultureWorkflow"),
                    new PermissionType[] {  }
                )))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.C1Console.Users", "ChangeOwnCultureWorkflow.ElementActionLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.C1Console.Users", "ChangeOwnCultureWorkflow.ElementActionToolTip"),
                    Icon = VirtualElementProvider.ChangeOwnCultureIcon,
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




            element.AddAction(new ElementAction(new ActionHandle(
                new WorkflowActionToken(
                    WorkflowFacade.GetWorkflowType("Composite.C1Console.Users.Workflows.ChangeOwnForeignLocaleWorkflow"),
                    new PermissionType[] {  }
                )))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.C1Console.Users", "ChangeForeignLocaleWorkflow.ActionLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.C1Console.Users", "ChangeForeignLocaleWorkflow.ActionToolTip"),
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
                TagValue = "ChangeFromLocale"
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


            element.AddAction(new ElementAction(new ActionHandle(new ViewLogActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "VirtualElementProviderElementProvider.RootActions.ViewSystemLogLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "VirtualElementProviderElementProvider.RootActions.ViewSystemLogTooltip"),
                    Icon = VirtualElementProvider.ShowLogIcon,
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


            element.AddAction(new ElementAction(new ActionHandle(new RestartApplicationActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "VirtualElementProviderElementProvider.RootActions.RestartApplicationLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "VirtualElementProviderElementProvider.RootActions.RestartApplicationTooltip"),
                    Icon = VirtualElementProvider.RestartApplicationIcon,
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
            BaseElementNode node = FindElementNode(entityToken.Id, _rootNode);

            if (node == null) throw new InvalidOperationException(string.Format("No corresponding node was found with the id '{0}'", entityToken.Id));

            if (node is FolderElementNode)
            {
                FolderElementNode folderNode = (FolderElementNode)node;

                List<Element> elements = new List<Element>();

                foreach (BaseElementNode childNode in node.Children)
                {
                    elements.Add(CreateElement(childNode));
                }

                return elements;
            }
            else if (node is ProviderHookingElementNode)
            {
                ProviderHookingElementNode providerNode = (ProviderHookingElementNode)node;

                List<Element> elements = new List<Element>();
                foreach (string providerName in providerNode.ProviderNames)
                {
                    List<Element> elms;
                    if ((useForeign == true) && (ElementFacade.IsLocaleAwareElementProvider(new ElementProviderHandle(providerName)) == true))
                    {
                        elms = ElementFacade.GetForeignRoots(new ElementProviderHandle(providerName), seachToken).ToList();
                    }
                    else
                    {
                        elms = ElementFacade.GetRoots(new ElementProviderHandle(providerName), seachToken).ToList();
                    }

                    foreach (Element element in elms)
                    {
                        element.ElementExternalActionAdding = ElementExternalActionAddingExtensions.Remove(element.ElementExternalActionAdding, ElementExternalActionAdding.AllowGlobal);
                    }

                    elements.AddRange(elms);
                }

                return elements;
            }
            else
            {
                throw new NotImplementedException();
            }
        }



        public List<EntityTokenHook> GetHooks()
        {
            return this.CurrentEntityTokenHooks;
        }



        public object GetData(string name)
        {
            BaseElementNode node = FindElementNodeParent(name, _rootNode);

            if (node != null)
            {
                return new VirtualElementProviderEntityToken(_context.ProviderName, node.Id);
            }
            else
            {
                return null;
            }
        }



        internal void AddFolder(FolderElementConfigurationElement folderElementConfigurationElement)
        {
            FolderElementNode folderElementNode = new FolderElementNode
                {
                    Id = folderElementConfigurationElement.Id,
                    Label = folderElementConfigurationElement.Label,
                    Tag = folderElementConfigurationElement.Tag,
                    CloseFolderIconName = folderElementConfigurationElement.CloseFolderIconName,
                    OpenFolderIconName = folderElementConfigurationElement.OpenFolderIconName,
                };


            AddElementNode(folderElementNode, folderElementConfigurationElement.ParentId);
        }



        internal void AddProviderHook(ProviderHookingElementConfigurationElement providerHookingElementConfigurationElement)
        {
            ProviderHookingElementNode providerHookingElementNode = this.FindElementNode(providerHookingElementConfigurationElement.Id, _rootNode) as ProviderHookingElementNode;

            if (providerHookingElementNode == null)
            {
                providerHookingElementNode = new ProviderHookingElementNode
                    {
                        Id = providerHookingElementConfigurationElement.Id,
                        Label = providerHookingElementConfigurationElement.Label,
                        Tag = providerHookingElementConfigurationElement.Tag,
                        ProviderNames = new List<string> { providerHookingElementConfigurationElement.ProviderName },
                        OpenFolderIconName = providerHookingElementConfigurationElement.OpenFolderIconName,
                        CloseFolderIconName = providerHookingElementConfigurationElement.CloseFolderIconName,
                    };
            }
            else
            {
                providerHookingElementNode.ProviderNames.Add(providerHookingElementConfigurationElement.ProviderName);
            }


            AddElementNode(providerHookingElementNode, providerHookingElementConfigurationElement.ParentId);
        }



        private void AddElementNode(BaseElementNode baseElementNode, string parentId)
        {
            if (string.IsNullOrEmpty(parentId) == true)
            {
                if (_rootNode != null)
                {
                    throw new ConfigurationErrorsException(string.Format("Only one root node is allowed. Current root node id is '{0}' and the extra root node id is '{1}'", _rootNode.Id, parentId));
                }

                _rootNode = baseElementNode;
            }
            else
            {
                BaseElementNode parentNode = FindElementNode(parentId, _rootNode);
                if (parentNode == null)
                {
                    throw new ConfigurationErrorsException(string.Format("The parent node with id '{0}' should be added before any of its children", parentId));
                }

                // This is a nasty hack for letting nodes (folderElements/hookingElemetns) with the same id exist as one single element
                if (parentNode.Children.Contains(baseElementNode) == false)
                {
                    parentNode.Children.Add(baseElementNode);
                }
            }
        }


        private List<EntityTokenHook> CurrentEntityTokenHooks
        {
            get
            {
                if (_currentEntityTokenHooks == null)
                {
                    _currentEntityTokenHooks = new List<EntityTokenHook>();
                    CreateHooks(_rootNode, _currentEntityTokenHooks);
                }

                return _currentEntityTokenHooks;
            }
        }



        private IEnumerable<ProviderHookingElementNode> GetProviderHookingElementNodes(BaseElementNode baseElementNode)
        {
            if (baseElementNode is ProviderHookingElementNode) yield return baseElementNode as ProviderHookingElementNode;

            foreach (BaseElementNode childNode in baseElementNode.Children)
            {
                foreach (ProviderHookingElementNode node in GetProviderHookingElementNodes(childNode))
                {
                    yield return node;
                }
            }
        }



        private BaseElementNode FindElementNode(string id, BaseElementNode parentNode)
        {
            if (parentNode.Id == id) return parentNode;

            foreach (BaseElementNode node in parentNode.Children)
            {
                BaseElementNode foundNode = FindElementNode(id, node);

                if (foundNode != null) return foundNode;
            }

            return null;
        }



        private BaseElementNode FindElementNodeParent(string id, BaseElementNode parentNode)
        {
            foreach (BaseElementNode node in parentNode.Children)
            {
                if (node.Id == id) return parentNode;

                BaseElementNode foundNode = FindElementNodeParent(id, node);

                if (foundNode != null) return foundNode;
            }

            return null;
        }



        private void CreateHooks(BaseElementNode node, List<EntityTokenHook> foundHooks)
        {
            ProviderHookingElementNode providerHookingNode = node as ProviderHookingElementNode;

            if (providerHookingNode != null)
            {
                EntityToken hookerEntityToken = new VirtualElementProviderEntityToken(_context.ProviderName, providerHookingNode.Id);

                EntityTokenHook hook = new EntityTokenHook(hookerEntityToken);

                foreach (string providerName in providerHookingNode.ProviderNames)
                {
                    List<Element> childElements = ElementFacade.GetRootsWithNoSecurity(new ElementProviderHandle(providerName), null).ToList();

                    foreach (Element childElement in childElements)
                    {
                        hook.AddHookie(childElement.ElementHandle.EntityToken);
                    }
                }

                foundHooks.Add(hook);
            }

            foreach (BaseElementNode childNode in node.Children)
            {
                CreateHooks(childNode, foundHooks);
            }
        }



        private Element CreateElement(BaseElementNode baseElementNode)
        {
            EntityToken entityToken = new VirtualElementProviderEntityToken(_context.ProviderName, baseElementNode.Id);

            Element element = new Element(_context.CreateElementHandle(entityToken));
            element.TagValue = baseElementNode.Tag;

            element.VisualData = new ElementVisualizedData
                {
                    Label = StringResourceSystemFacade.ParseString(baseElementNode.Label),
                    HasChildren = true // fixing refresh problem easy way... was: HasChildren(baseElementNode) 
                };

            if ((baseElementNode is ProviderHookingElementNode) == true)
            {
                ProviderHookingElementNode providerHookingElementNode = baseElementNode as ProviderHookingElementNode;
                foreach (string name in providerHookingElementNode.ProviderNames)
                {
                    if (ElementFacade.ContainsLocalizedData(new ElementProviderHandle(name)) == true)
                    {
                        element.IsLocaleAware = true;
                    }
                }
            }

            if (element.VisualData.HasChildren == true)
            {
                ResourceHandle openHandle = IconResourceSystemFacade.GetResourceHandle(baseElementNode.OpenFolderIconName);
                ResourceHandle closeHandle = IconResourceSystemFacade.GetResourceHandle(baseElementNode.CloseFolderIconName);

                if (openHandle != null && closeHandle == null)
                {
                    closeHandle = openHandle;
                }
                if (closeHandle != null && openHandle == null)
                {
                    openHandle = closeHandle;
                }
                if (openHandle == null && closeHandle == null)
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


            return element;
        }



        private bool HasChildren(BaseElementNode baseElementNode)
        {
            if (baseElementNode is FolderElementNode)
            {
                return baseElementNode.Children.Count != 0;
            }
            else if (baseElementNode is ProviderHookingElementNode)
            {
                return true;

                // Non-lazy check children
                //ProviderHookingElementNode proivderNode = (ProviderHookingElementNode)baseElementNode;

                //List<Element> children = ElementFacade.GetRoots(proivderNode.ProviderName);

                //return children.Count != 0;
            }
            else
            {
                throw new NotImplementedException(string.Format("The element node type '{0}' is not supported", baseElementNode.GetType()));
            }
        }



        private void OnNewElementProviderRootEntitiesEvent(HookingFacadeEventArgs hookingFacadeEventArgs)
        {
            HookingFacade.RemoveHooks(this.CurrentEntityTokenHooks);

            _currentEntityTokenHooks = new List<EntityTokenHook>();
            CreateHooks(_rootNode, _currentEntityTokenHooks);

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

            VirtualElementProvider provider = new VirtualElementProvider();

            VirtualElementProviderData data = (VirtualElementProviderData)objectConfiguration;

            List<string> ids =
                (from elm in data.VirtualElements
                 select elm.Id).ToList();

            foreach (BaseElementConfigurationElement element in data.VirtualElements)
            {
                if ((element.ParentId != "") &&
                    (ids.Contains(element.ParentId) == false))
                {
                    throw new ConfigurationErrorsException(string.Format("The node with id '{0}' has a non existing parent node with id '{1}'", element.Id, element.ParentId));
                }
            }

            AddRecursively(provider, data, "");

            return provider;
        }



        private void AddRecursively(VirtualElementProvider provider, VirtualElementProviderData data, string parentId)
        {
            foreach (BaseElementConfigurationElement element in data.VirtualElements.Where(elm => elm.ParentId == parentId).OrderBy(elm => elm.Order))
            {
                if ((element is FolderElementConfigurationElement) == true)
                {
                    provider.AddFolder((FolderElementConfigurationElement)element);
                }
                else if ((element is ProviderHookingElementConfigurationElement) == true)
                {
                    provider.AddProviderHook((ProviderHookingElementConfigurationElement)element);
                }
                else
                {
                    throw new NotImplementedException();
                }

                AddRecursively(provider, data, element.Id);
            }
        }

    }




    [Assembler(typeof(VirtualElementProviderAssembler))]
#pragma warning disable 612
    internal sealed class VirtualElementProviderData : ElementProviderData
#pragma warning restore 612
    {
        private const string _virtualElementsProperty = "VirtualElements";
        [ConfigurationProperty(_virtualElementsProperty, IsRequired = true)]
        public NameTypeConfigurationElementCollection<BaseElementConfigurationElement, BaseElementConfigurationElement> VirtualElements
        {
            get
            {
                return (NameTypeConfigurationElementCollection<BaseElementConfigurationElement, BaseElementConfigurationElement>)base[_virtualElementsProperty];
            }
        }
    }







    [ActionExecutor(typeof(ViewLogActionExecutor))]
    internal sealed class ViewLogActionToken : ActionToken
    {
        private static IEnumerable<PermissionType> _permissionType = new PermissionType[] { PermissionType.Administrate };

        public ViewLogActionToken()
        {
        }

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionType; }
        }

        public override string Serialize()
        {
            return "ViewLog";
        }


        public static ActionToken Deserialize(string serializedData)
        {
            return new ViewLogActionToken();
        }
    }



    internal sealed class ViewLogActionExecutor : Composite.C1Console.Actions.IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            string url = UrlUtils.ResolveAdminUrl(string.Format("content/views/log/log.aspx"));

            IManagementConsoleMessageService consoleServices = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();
            OpenViewMessageQueueItem openViewMsg = new OpenViewMessageQueueItem
                {
                    EntityToken = EntityTokenSerializer.Serialize(entityToken, true),
                    ViewId = "ViewSystemLog",
                    Label = "System log",
                    Url = url,
                    ViewType = ViewType.Main
                };

            ConsoleMessageQueueFacade.Enqueue(openViewMsg, consoleServices.CurrentConsoleId);

            return null;
        }
    }


    
    [ActionExecutor(typeof(RestartApplicationActionExecutor))]
    internal sealed class RestartApplicationActionToken : ActionToken
    {
        private static IEnumerable<PermissionType> _permissionType = new PermissionType[] { PermissionType.Administrate };

        public RestartApplicationActionToken()
        {
        }

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionType; }
        }

        public override string Serialize()
        {
            return "RestartApplicationActionToken";
        }


        public static ActionToken Deserialize(string serializedData)
        {
            return new RestartApplicationActionToken();
        }
    }


    internal sealed class RestartApplicationActionExecutor : Composite.C1Console.Actions.IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            HostingEnvironment.InitiateShutdown();

            return null;
        }
    }
}
