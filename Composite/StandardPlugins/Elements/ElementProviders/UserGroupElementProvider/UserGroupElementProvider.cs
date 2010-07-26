using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Linq;
using Composite.Data.Types;
using Composite.Elements;
using Composite.Elements.Plugins.ElementProvider;
using Composite.ResourceSystem;
using Composite.ResourceSystem.Icons;
using Composite.Security;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.Workflow;
using Composite.Types;


namespace Composite.StandardPlugins.Elements.ElementProviders.UserGroupElementProvider
{
    [ConfigurationElementType(typeof(NonConfigurableHooklessElementProvider))]
    internal sealed class UserGroupElementProvider : IHooklessElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _elementProviderContext;

        public static ResourceHandle RootOpenIcon { get { return GetIconHandle("usergroups-rootfolder-open"); } }
        public static ResourceHandle RootClosedIcon { get { return GetIconHandle("usergroups-rootfolder-closed"); } }
        public static ResourceHandle UserGroupIcon { get { return GetIconHandle("usergroups-usergroup"); } }
        public static ResourceHandle AddUserGroupIcon { get { return GetIconHandle("usergroups-addusergroup"); } }
        public static ResourceHandle EditUserGroupIcon { get { return GetIconHandle("usergroups-editusergroup"); } }
        public static ResourceHandle DeleteUserGroupIcon { get { return GetIconHandle("usergroups-deleteusergroup"); } }

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);
        private static readonly PermissionType[] AddNewUserGroupPermissionTypes = new PermissionType[] { PermissionType.Administrate };
        private static readonly PermissionType[] EditUserGroupPermissionTypes = new PermissionType[] { PermissionType.Administrate };
        private static readonly PermissionType[] DeleteUserGroupPermissionTypes = new PermissionType[] { PermissionType.Administrate };


        public UserGroupElementProvider()
        {
            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataEntityToken>(this);
        }



        public ElementProviderContext Context
        {
            set
            {
                _elementProviderContext = value;
            }
        }



        public IEnumerable<Element> GetRoots(SearchToken seachToken)
        {
            int userGroupCount = DataFacade.GetData<IUserGroup>().Count();

            Element element = new Element(_elementProviderContext.CreateElementHandle(new UserGroupElementProviderRootEntityToken()))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "UserGroupElementProvider.RootLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "UserGroupElementProvider.RootToolTip"),
                    HasChildren = userGroupCount > 0,
                    Icon = UserGroupElementProvider.RootClosedIcon,
                    OpenedIcon = UserGroupElementProvider.RootOpenIcon
                }
            };

            element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.UserGroupElementProvider.AddNewUserGroupWorkflow"), AddNewUserGroupPermissionTypes)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "UserGroupElementProvider.AddNewUserGroupLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "UserGroupElementProvider.AddNewUserGroupToolTip"),
                    Icon = UserGroupElementProvider.AddUserGroupIcon,
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

            yield return element;
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken seachToken)
        {
            if ((entityToken is UserGroupElementProviderRootEntityToken) == false) return new Element[] { };

            IEnumerable<IUserGroup> userGroups =
                (from ug in DataFacade.GetData<IUserGroup>()
                 orderby ug.Name
                 select ug).Evaluate();

            List<Element> elements = new List<Element>();

            foreach (IUserGroup userGroup in userGroups)
            {
                Element element = new Element(_elementProviderContext.CreateElementHandle(userGroup.GetDataEntityToken()))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = userGroup.Name,
                        ToolTip = userGroup.Name,
                        HasChildren = false,
                        Icon = UserGroupElementProvider.UserGroupIcon,
                        OpenedIcon = UserGroupElementProvider.UserGroupIcon
                    }
                };

                element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.UserGroupElementProvider.EditUserGroupWorkflow"), EditUserGroupPermissionTypes)))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "UserGroupElementProvider.EditUserGroupLabel"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "UserGroupElementProvider.EditUserGroupToolTip"),
                        Icon = UserGroupElementProvider.EditUserGroupIcon,
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

                element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.UserGroupElementProvider.DeleteUserGroupWorkflow"), DeleteUserGroupPermissionTypes)))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "UserGroupElementProvider.DeleteUserGroupLabel"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.UserGroupElementProvider", "UserGroupElementProvider.DeleteUserGroupToolTip"),
                        Icon = UserGroupElementProvider.DeleteUserGroupIcon,
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

                elements.Add(element);
            }

            return elements;
        }



        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            Dictionary<EntityToken, IEnumerable<EntityToken>> result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                DataEntityToken dataEntityToken = entityToken as DataEntityToken;

                Type type = dataEntityToken.InterfaceType;
                if (type != typeof(IUserGroup)) continue;

                UserGroupElementProviderRootEntityToken newEntityToken = new UserGroupElementProviderRootEntityToken();

                result.Add(entityToken, new EntityToken[] { newEntityToken });
            }

            return result;
        }



        private List<EntityTokenHook> CreateHooks()
        {
            IEnumerable<EntityToken> userGroupsEntityTokens =
                from ug in DataFacade.GetData<IUserGroup>()
                select (EntityToken)ug.GetDataEntityToken();

            EntityTokenHook hook = new EntityTokenHook(new UserGroupElementProviderRootEntityToken());
            hook.AddHookies(userGroupsEntityTokens);

            return new List<EntityTokenHook> { hook };
        }



        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}
