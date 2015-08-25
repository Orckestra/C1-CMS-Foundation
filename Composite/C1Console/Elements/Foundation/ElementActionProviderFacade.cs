using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using Composite.C1Console.Actions;
using Composite.C1Console.Elements.Foundation.PluginFacades;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.ProcessControlled;


namespace Composite.C1Console.Elements.Foundation
{
    #region ManageUserPermissions
    internal sealed class ManageUserPermissionsActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

            Dictionary<string, string> viewArguments = new Dictionary<string, string>();
            viewArguments.Add("serializedEntityToken", serializedEntityToken);

            ConsoleMessageQueueFacade.Enqueue(new OpenHandledViewMessageQueueItem(EntityTokenSerializer.Serialize(entityToken, true), "Composite.Management.PermissionEditor", viewArguments), currentConsoleId);

            return null;
        }
    }



    [ActionExecutor(typeof(ManageUserPermissionsActionExecutor))]
    internal sealed class ManageUserPermissionsActionToken : ActionToken
    {
        private static PermissionType[] _permissionTypes = new PermissionType[] { PermissionType.Administrate };

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }

        public override string Serialize()
        {
            return "ManageUserPermissions";
        }


        public static ActionToken Deserialize(string serializedData)
        {
            return new ManageUserPermissionsActionToken();
        }
    }
    #endregion



    #region ShowGraph
    internal sealed class RelationshipGraphActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

            if (actionToken.Serialize() == "ShowGraph")
            {
                string url = string.Format("{0}?EntityToken={1}", UrlUtils.ResolveAdminUrl("content/views/relationshipgraph/Default.aspx"), System.Web.HttpUtility.UrlEncode(serializedEntityToken));

                ConsoleMessageQueueFacade.Enqueue(new OpenViewMessageQueueItem { Url = url, ViewId = Guid.NewGuid().ToString(), ViewType = ViewType.Main, Label = "Show graph..." }, currentConsoleId);
            }
            else if (actionToken.Serialize() == "ShowOrientedGraph")
            {
                
                Guid id = Guid.NewGuid();
                string filename = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TempDirectory), string.Format("{0}.RelationshipGraph", id));
                C1File.WriteAllLines(filename, new string[] { serializedEntityToken });

                string url = string.Format("{0}?Id={1}", UrlUtils.ResolveAdminUrl("content/views/relationshipgraph/ShowRelationshipOrientedGraph.aspx"), id);

                ConsoleMessageQueueFacade.Enqueue(new OpenViewMessageQueueItem { Url = url, ViewId = Guid.NewGuid().ToString(), ViewType = ViewType.Main, Label = "Show graph..." }, currentConsoleId);
            }

            return null;
        }
    }



    [ActionExecutor(typeof(RelationshipGraphActionExecutor))]
    internal sealed class RelationshipGraphActionToken : ActionToken
    {
        private static PermissionType[] _permissionTypes = new PermissionType[] { PermissionType.Administrate };

        private string _type;



        public RelationshipGraphActionToken(string type)
        {
            _type = type;
        }



        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }



        public override string Serialize()
        {
            return _type;
        }



        public static ActionToken Deserialize(string serializedData)
        {
            return new RelationshipGraphActionToken(serializedData);
        }
    }
    #endregion



    #region ShowElementInformation
    internal sealed class ShowElementInformationActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

            StringBuilder sb = new StringBuilder();

            var elementInformationService = flowControllerServicesContainer.GetService<IElementInformationService>();

            if (elementInformationService != null)
            {
                Dictionary<string, string> piggybag = elementInformationService.Piggyback;

                foreach (var kvp in piggybag)
                {
                    Core.Serialization.StringConversionServices.SerializeKeyValuePair(sb, kvp.Key, kvp.Value);
                }
            }

            Guid id = Guid.NewGuid();
            string filename = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TempDirectory), string.Format("{0}.showinfo", id));

            C1File.WriteAllLines(filename, new string[] { serializedEntityToken, sb.ToString() });

            string url = string.Format("{0}?PiggyBagId={1}", UrlUtils.ResolveAdminUrl("content/views/showelementinformation/Default.aspx"), id);

            ConsoleMessageQueueFacade.Enqueue(new OpenViewMessageQueueItem { Url = url, ViewId = Guid.NewGuid().ToString(), ViewType = ViewType.Main, Label = "Show Element Information..." }, currentConsoleId);

            return null;
        }
    }



    [ActionExecutor(typeof(ShowElementInformationActionExecutor))]
    internal sealed class ShowElementInformationActionToken : ActionToken
    {
        private static PermissionType[] _permissionTypes = new PermissionType[] { PermissionType.Administrate };

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }

        public override string Serialize()
        {
            return "ShowElementInformation";
        }


        public static ActionToken Deserialize(string serializedData)
        {
            return new ShowElementInformationActionToken();
        }
    }
    #endregion




    #region Search
    internal sealed class SearchActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            SearchActionToken searchActionToken = (SearchActionToken)actionToken;

            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

            string viewId = Guid.NewGuid().ToString();



            string url = UrlUtils.ResolveAdminUrl(string.Format("content/dialogs/treesearch/treeSearchForm.aspx?ProviderName={0}&EntityToken={1}&ViewId={2}&ConsoleId={3}", HttpUtility.UrlEncode(searchActionToken.ProviderName), HttpUtility.UrlEncode(serializedEntityToken), HttpUtility.UrlEncode(viewId), HttpUtility.UrlEncode(currentConsoleId)));

            ConsoleMessageQueueFacade.Enqueue(
                new OpenViewMessageQueueItem
                {
                    Url = url,
                    ViewId = viewId,
                    ViewType = ViewType.ModalDialog,
                    Label = StringResourceSystemFacade.GetString("Composite.Management", "RelationshipGraphActionExecutor.SearchElements"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "RelationshipGraphActionExecutor.SearchElementsToolTip"),
                    IconResourceHandle = CommonElementIcons.Question
                }, currentConsoleId);


            return null;
        }
    }



    [ActionExecutor(typeof(SearchActionExecutor))]
    internal sealed class SearchActionToken : ActionToken
    {
        private const string _serializePrefix = "Search:";

        internal SearchActionToken(string providerName)
        {
            this.ProviderName = providerName;
        }


        internal string ProviderName { get; private set; }

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { yield break; }
        }

        public override string Serialize()
        {
            return _serializePrefix + this.ProviderName;
        }


        public static ActionToken Deserialize(string serializedData)
        {
            if (serializedData.StartsWith(_serializePrefix) == false) throw new ArgumentException("Serialized data is not in correct format.");
            string providerName = serializedData.Remove(0, _serializePrefix.Length);
            return new SearchActionToken(providerName);
        }
    }
    #endregion




    internal static class ElementActionProviderFacade
    {
        private static readonly ActionGroup AppendedActionGroup = new ActionGroup("Common tasks", ActionGroupPriority.GeneralAppendMedium);

        private static ResourceHandle ManageSecurityIcon { get { return GetIconHandle("security-manage-permissions"); } }

        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }


        public static void AddActions(IEnumerable<Element> elements, string providerName)
        {
            string manageUserPermissionsOnBranchLabel = StringResourceSystemFacade.GetString("Composite.Management", "ManageUserPermissions.ManageUserPermissionsOnBranchLabel");
            string manageUserPermissionsItemLabel = StringResourceSystemFacade.GetString("Composite.Management", "ManageUserPermissions.ManageUserPermissionsOnItemLabel");
            string manageUserPermissionsToolTip = StringResourceSystemFacade.GetString("Composite.Management", "ManageUserPermissions.ManageUserPermissionsToolTip");
            string relationshipGraphLabel = StringResourceSystemFacade.GetString("Composite.Management", "RelationshipGraphActionExecutor.ShowGraph");
            string relationshipGraphToolTip = StringResourceSystemFacade.GetString("Composite.Management", "RelationshipGraphActionExecutor.ShowGraphToolTip");
            string relationshipOrientedGraphLabel = StringResourceSystemFacade.GetString("Composite.Management", "RelationshipGraphActionExecutor.ShowOrientedGraph");
            string relationshipOrientedGraphToolTip = StringResourceSystemFacade.GetString("Composite.Management", "RelationshipGraphActionExecutor.ShowOrientedGraphToolTip");
            string showElementInformationLabel = StringResourceSystemFacade.GetString("Composite.Management", "ShowElementInformationActionExecutor.ShowElementInformation.Label");
            string showElementInformationToolTip = StringResourceSystemFacade.GetString("Composite.Management", "ShowElementInformationActionExecutor.ShowElementInformation.ToolTip");

            IEnumerable<string> elementActionProviderNames = ElementActionProviderRegistry.ElementActionProviderNames;

            if (elementActionProviderNames == null)
            {
                const string message = "Failed to load one of the element action providers";
                Log.LogCritical("ElementActionProviderFacade", message);

                return;
            }

            foreach (Element element in elements)
            {
                AddBuildinActions(providerName, manageUserPermissionsOnBranchLabel, manageUserPermissionsItemLabel, manageUserPermissionsToolTip, relationshipGraphLabel, relationshipGraphToolTip, relationshipOrientedGraphLabel, relationshipOrientedGraphToolTip, showElementInformationLabel, showElementInformationToolTip, element);

                if ((element.ElementExternalActionAdding & ElementExternalActionAdding.AllowGlobal) == ElementExternalActionAdding.AllowGlobal)
                {
                    foreach (string elementActionProviderName in elementActionProviderNames)
                    {
                        try
                        {
                            IEnumerable<ElementAction> actions = ElementActionProviderPluginFacade.GetActions(elementActionProviderName, element.ElementHandle.EntityToken);

                            element.AddAction(actions);
                        }
                        catch (Exception ex)
                        {
                            Log.LogCritical("ElementActionProviderFacade", string.Format("Failed to add actions from the element action provider named '{0}'", elementActionProviderName));
                            Log.LogCritical("ElementActionProviderFacade", ex);
                        }
                    }
                }
            }
        }



        private static void AddBuildinActions(string providerName, string manageUserPermissionsOnBranchLabel, string manageUserPermissionsItemLabel, string manageUserPermissionsToolTip, string relationshipGraphLabel, string relationshipGraphToolTip, string relationshipOrientedGraphLabel, string relationshipOrientedGraphToolTip, string showElementInformationLabel, string showElementInformationToolTip, Element element)
        {
            if ((element.ElementExternalActionAdding & ElementExternalActionAdding.AllowGlobal) == ElementExternalActionAdding.AllowGlobal)
            {
                element.AddAction(new ElementAction(new ActionHandle(new RelationshipGraphActionToken("ShowGraph")))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = relationshipGraphLabel,
                        ToolTip = relationshipGraphToolTip,
                        Icon = Composite.Core.ResourceSystem.Icons.CommonElementIcons.Nodes,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.DeveloperMode,
                            IsInFolder = false,
                            IsInToolbar = false,
                            ActionGroup = AppendedActionGroup
                        }
                    }
                });


                element.AddAction(new ElementAction(new ActionHandle(new RelationshipGraphActionToken("ShowOrientedGraph")))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = relationshipOrientedGraphLabel,
                        ToolTip = relationshipOrientedGraphToolTip,
                        Icon = Composite.Core.ResourceSystem.Icons.CommonElementIcons.Nodes,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.DeveloperMode,
                            IsInFolder = false,
                            IsInToolbar = false,
                            ActionGroup = AppendedActionGroup
                        }
                    }
                });



                element.AddAction(new ElementAction(new ActionHandle(new ShowElementInformationActionToken()))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = showElementInformationLabel,
                        ToolTip = showElementInformationToolTip,
                        Icon = Composite.Core.ResourceSystem.Icons.CommonElementIcons.Search,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.DeveloperMode,
                            IsInFolder = false,
                            IsInToolbar = false,
                            ActionGroup = AppendedActionGroup
                        }
                    }
                });





                //element.AddAction(new ElementAction(new ActionHandle(new SearchActionToken(providerName)))
                //{
                //    VisualData = new ActionVisualizedData
                //    {
                //        Label = StringResourceSystemFacade.GetString("Composite.Management", "RelationshipGraphActionExecutor.Search"),
                //        ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "RelationshipGraphActionExecutor.SearchToolTip"),
                //        Icon = Composite.Core.ResourceSystem.Icons.CommonCommandIcons.Search,
                //        Disabled = false,
                //        ActionLocation = new ActionLocation
                //        {
                //            ActionType = ActionType.Other,
                //            IsInFolder = false,
                //            IsInToolbar = false,
                //            ActionGroup = AppendedActionGroup
                //        }
                //    }
                //});

                if (RuntimeInformation.IsDebugBuild)
                {
                }
            }

            if ((element.ElementExternalActionAdding & ElementExternalActionAdding.AllowManageUserPermissions) == ElementExternalActionAdding.AllowManageUserPermissions)
            {
                if (!element.Actions.Any(f => f.ActionHandle.ActionToken is ManageUserPermissionsActionToken)) // Fixing problem with the buggy virtual element provider
                {
                    element.AddAction(new ElementAction(new ActionHandle(new ManageUserPermissionsActionToken()))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = (element.VisualData.HasChildren ? manageUserPermissionsOnBranchLabel : manageUserPermissionsItemLabel),
                            ToolTip = manageUserPermissionsToolTip,
                            Icon = ManageSecurityIcon,
                            Disabled = false,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Other,
                                IsInFolder = false,
                                IsInToolbar = false,
                                ActionGroup = AppendedActionGroup
                            }
                        }
                    });
                }
            }

            if ((element.ElementExternalActionAdding & ElementExternalActionAdding.AllowProcessController) == ElementExternalActionAdding.AllowProcessController)
            {
                if (element.ElementHandle.EntityToken is DataEntityToken)
                {
                    DataEntityToken token = (DataEntityToken)element.ElementHandle.EntityToken;

                    Type elementProviderType;
                    if (ElementProviderRegistry.ElementProviderNames.Contains(providerName))
                    {
                        elementProviderType = ElementProviderRegistry.GetElementProviderType(providerName);
                    }
                    else
                    {
                        elementProviderType = ElementAttachingProviderRegistry.GetElementProviderType(providerName);
                    }


                    List<ElementAction> actions = ProcessControllerFacade.GetActions(token.Data, elementProviderType);
                    foreach (ElementAction action in actions)
                    {
                        element.AddAction(action);
                    }
                }
            }
        }
    }
}
