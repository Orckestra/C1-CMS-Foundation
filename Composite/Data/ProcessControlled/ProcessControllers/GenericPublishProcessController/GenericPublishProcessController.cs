using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Transactions;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Elements;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.C1Console.Security;
using Composite.Data.Transactions;
using Composite.C1Console.Users;
using Composite.Data.Validation;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Composite.Data.Types;


namespace Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class GenericPublishProcessController : IPublishProcessController
    {
        private static readonly string _oldPublishedStatusTag = "OldPublishedStatus";

        /// <exclude />
        public const string Draft = "draft";

        /// <exclude />
        public const string AwaitingApproval = "awaitingApproval";

        /// <exclude />
        public const string AwaitingPublication = "awaitingPublication";

        /// <exclude />
        public const string Published = "published";

        private static readonly string _backToAwaitingApproval = "awaitingApprovalBack";
        private static readonly string _forwardToAwaitingApproval = "awaitingApprovalForward";
        private static readonly string _backToAwaitingPublication = "awaitingPublicationBack";
        private static readonly string _forwardToAwaitingPublication = "awaitingPublicationForward";

        private static readonly string _draftDisabled = "draftDisabled";
        private static readonly string _awaitingApprovalDisabled = "awaitingApprovalDisabled";
        private static readonly string _awaitingPublicationDisabled = "awaitingPublicationDisabled";
        private static readonly string _publishedDisabled = "publishedDisabled";

        private readonly IDictionary<string, IList<string>> _transitions;
        private readonly IDictionary<string, IList<string>> _visualTransitions;
        private readonly IDictionary<string, string> _transitionNames;
        private readonly IDictionary<string, Func<ElementAction>> _visualTransitionsActions;  // Using visual transition names as keys


        /// <exclude />
        public static ResourceHandle SendForwardForApproval { get { return GetIconHandle("item-send-forward-for-approval"); } }

        /// <exclude />
        public static ResourceHandle SendForwardForPublication { get { return GetIconHandle("item-send-forward-for-publication"); } }

        /// <exclude />
        public static ResourceHandle Publish { get { return GetIconHandle("item-publish"); } }

        /// <exclude />
        public static ResourceHandle Unpublish { get { return GetIconHandle("item-unpublish"); } }

        /// <exclude />
        public static ResourceHandle UndoUnpublishedChanges { get { return GetIconHandle("item-undo-unpublished-changes"); } }

        /// <exclude />
        public static ResourceHandle SendBackToDraft { get { return GetIconHandle("item-send-back-to-draft"); } }

        /// <exclude />
        public static ResourceHandle SendBackForApproval { get { return GetIconHandle("item-send-back-for-approval"); } }

        /// <exclude />
        public static ResourceHandle SendBackForPublication { get { return GetIconHandle("item-send-back-for-publication"); } }

        /// <exclude />
        public static readonly ActionGroup WorkflowActionGroup = new ActionGroup("Workflow", ActionGroupPriority.PrimaryMedium);

        /// <exclude />
        public static readonly IEnumerable<PermissionType> AwaitingPublicationActionPermissionType = new PermissionType[] { PermissionType.Approve };

        /// <exclude />
        public GenericPublishProcessController()
        {
            _transitions = new Dictionary<string, IList<string>>
            {
                {Draft, new List<string> {AwaitingApproval, AwaitingPublication, Published}},
                {AwaitingApproval, new List<string> {Draft, AwaitingPublication, Published}},
                {AwaitingPublication, new List<string> {Draft, AwaitingApproval, Published}},
                {Published, new List<string> {Draft, AwaitingApproval, AwaitingPublication}}
            };

            _visualTransitions = new Dictionary<string, IList<string>>
            {
                {Draft, new List<string> { _draftDisabled, _forwardToAwaitingApproval, _forwardToAwaitingPublication, Published }},
                {AwaitingApproval, new List<string> { Draft, _awaitingApprovalDisabled, _forwardToAwaitingPublication, Published }},
                {AwaitingPublication, new List<string> { Draft, _backToAwaitingApproval, _awaitingPublicationDisabled, Published }},
                {Published, new List<string>()} // when public, no "send to" available.
            };

            _transitionNames = new Dictionary<string, string>
            {
                {Draft, "Draft"},
                {AwaitingApproval, "Awaiting Approval"},
                {AwaitingPublication, "Awaiting Publication"},
                {Published, "Published"}
            };

            Func<ElementAction> sendBackToDraftAction = () => new ElementAction(new ActionHandle(new DraftActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendToDraft"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendToDraftToolTip"),
                    Icon = GenericPublishProcessController.SendBackToDraft,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = WorkflowActionGroup
                    }
                }
            };


            Func<ElementAction> sendForwardToAwaitingApprovalAction = () => new ElementAction(new ActionHandle(new AwaitingApprovalActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendForApproval"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendForApprovalToolTip"),
                    Icon = GenericPublishProcessController.SendForwardForApproval,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = WorkflowActionGroup
                    }
                }
            };


            Func<ElementAction> sendForwardToAwaitingPublicationAction = () => new ElementAction(new ActionHandle(new AwaitingPublicationActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendForPublication"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendForPublicationToolTip"),
                    Icon = GenericPublishProcessController.SendForwardForPublication,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = WorkflowActionGroup
                    }
                }
            };


            Func<ElementAction> publishAction = () => new ElementAction(new ActionHandle(new PublishActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "Publish"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "PublishToolTip"),
                    Icon = GenericPublishProcessController.Publish,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = WorkflowActionGroup
                    }
                }
            };


            // "arrow pointing left when state change is going backwards" actions
            Func<ElementAction> sendBackToAwaitingApprovalAction = () => new ElementAction(new ActionHandle(new AwaitingApprovalActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendForApproval"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendForApprovalToolTip"),
                    Icon = GenericPublishProcessController.SendForwardForApproval,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = WorkflowActionGroup
                    }
                }
            };


            Func<ElementAction> sendBackToAwaitingPublicationAction = () => new ElementAction(new ActionHandle(new AwaitingPublicationActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendForPublication"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendForPublicationToolTip"),
                    Icon = GenericPublishProcessController.SendForwardForApproval,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = WorkflowActionGroup
                    }
                }
            };


            // disabled actions 
            Func<ElementAction> draftActionDisabled = () => new ElementAction(new ActionHandle(new DraftActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendToDraft"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendToDraftToolTip"),
                    Icon = GenericPublishProcessController.SendBackToDraft,
                    Disabled = true,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = WorkflowActionGroup
                    }
                }
            };


            Func<ElementAction> awaitingApprovalActionDisabled = () => new ElementAction(new ActionHandle(new AwaitingApprovalActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendForApproval"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendForApprovalToolTip"),
                    Icon = GenericPublishProcessController.SendForwardForApproval,
                    Disabled = true,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = WorkflowActionGroup
                    }
                }
            };
                               

            Func<ElementAction> awaitingPublicationActionDisabled = () => new ElementAction(new ActionHandle(new AwaitingPublicationActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendForPublication"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "SendForPublicationToolTip"),
                    Icon = GenericPublishProcessController.SendBackForPublication,
                    Disabled = true,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = WorkflowActionGroup
                    }
                }
            };
                
                
            Func<ElementAction> publishActionDisabled = () => new ElementAction(new ActionHandle(new DisabledActionToken())) 
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "Publish"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "PublishToolTip"),
                    Icon = GenericPublishProcessController.Publish,
                    Disabled = true,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = WorkflowActionGroup
                    }
                }
            };

            _visualTransitionsActions = new Dictionary<string, Func<ElementAction>>
            {
                {Draft, sendBackToDraftAction},
                {_backToAwaitingApproval, sendBackToAwaitingApprovalAction},
                {_backToAwaitingPublication, sendBackToAwaitingPublicationAction},

                {_forwardToAwaitingApproval, sendForwardToAwaitingApprovalAction},
                {_forwardToAwaitingPublication, sendForwardToAwaitingPublicationAction},
                {Published, publishAction},

                {_draftDisabled, draftActionDisabled},
                {_awaitingApprovalDisabled, awaitingApprovalActionDisabled},
                {_awaitingPublicationDisabled, awaitingPublicationActionDisabled},
                {_publishedDisabled, publishActionDisabled}
            };
        }



        /// <exclude />
        public List<ElementAction> GetActions(IData data, Type elementProviderType)
        {
            if (!(data is IPublishControlled) ||
                !data.DataSourceId.DataScopeIdentifier.Equals(DataScopeIdentifier.Administrated))
            {
                return new List<ElementAction>();
            }

            if (data is ILocalizedControlled && !UserSettings.ActiveLocaleCultureInfo.Equals(data.DataSourceId.LocaleScope))
            {
                return new List<ElementAction>();
            }

            var publishControlled = (IPublishControlled)data;

            IList<string> visualTrans = _visualTransitions[publishControlled.PublicationStatus];

            var clientActions = visualTrans.Select(newState => _visualTransitionsActions[newState]()).ToList();


            IData publicData = DataFacade.GetDataFromOtherScope(data, DataScopeIdentifier.Public, true).FirstOrDefault();
            if (publicData != null)
            {
                var unpublishAction = new ElementAction(new ActionHandle(new UnpublishActionToken()))
                {
                    VisualData = new ActionVisualizedData()
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "Unpublish"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "UnpublishToolTip"),
                        Icon = GenericPublishProcessController.Unpublish,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Other,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = WorkflowActionGroup
                        }
                    }
                };

                clientActions.Add(unpublishAction);



                if (publishControlled.PublicationStatus == Draft)
                {
                    if (ProcessControllerAttributesFacade.IsActionIgnored(elementProviderType, GenericPublishProcessControllerActionTypeNames.UndoUnpublishedChanges) == false)
                    {
                        ActionToken actionToken;

                        IActionTokenProvider actionTokenProvider = ProcessControllerAttributesFacade.GetActionTokenProvider(elementProviderType, GenericPublishProcessControllerActionTypeNames.UndoUnpublishedChanges);
                        if (actionTokenProvider != null)
                        {
                            actionToken = actionTokenProvider.GetActionToken(GenericPublishProcessControllerActionTypeNames.UndoUnpublishedChanges, data);
                        }
                        else
                        {
                            actionToken = new UndoPublishedChangesActionToken();
                        }

                        var undoPublishedChangesAction = new ElementAction(new ActionHandle(actionToken))
                        {
                            VisualData = new ActionVisualizedData
                            {
                                Label = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "UndoPublishedChanges"),
                                ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "UndoPublishedChangesToolTip"),
                                Icon = GenericPublishProcessController.UndoUnpublishedChanges,
                                Disabled = false,
                                ActionLocation = new ActionLocation
                                {
                                    ActionType = ActionType.Other,
                                    IsInFolder = false,
                                    IsInToolbar = true,
                                    ActionGroup = WorkflowActionGroup
                                }
                            }
                        };

                        clientActions.Add(undoPublishedChangesAction);
                    }
                }
            }

            return clientActions;
        }



        /// <exclude />
        public void SetStartStatus(IData data)
        {
            if (!(data is IPublishControlled) ||
                !data.DataSourceId.DataScopeIdentifier.Equals(DataScopeIdentifier.Administrated))
            {
                return;
            }

            var publishControlled = (IPublishControlled)data;
            publishControlled.PublicationStatus = Draft;
        }



        /// <exclude />
        public IDictionary<string, string> GetValidTransitions(IData data)
        {
            if (!(data is IPublishControlled) ||
                !data.DataSourceId.DataScopeIdentifier.Equals(DataScopeIdentifier.Administrated))
            {
                return new Dictionary<string, string>();
            }

            return _transitionNames;
        }



        /// <exclude />
        public bool OnAfterBuildNew(IData data)
        {
            var publishControlled = (IPublishControlled)data;

            publishControlled.PublicationStatus = Draft;

            return true;
        }



        /// <exclude />
        public bool OnAfterDataUpdated(IData data)
        {
            DataFacade.RemoveDataTag(data, _oldPublishedStatusTag);

            if (!data.DataSourceId.DataScopeIdentifier.Equals(DataScopeIdentifier.Administrated)) return false;

            var publishControlled = (IPublishControlled)data;

            if (publishControlled.PublicationStatus == Published)
            {
                using (new DataScope(DataScopeIdentifier.Public))
                {
                    var existing = DataFacade.GetDataFromOtherScope((IData)publishControlled, DataScopeIdentifier.Public).Evaluate();

                    if (existing.Any())
                    {
                        DataFacade.Delete(existing, CascadeDeleteType.Disable);
                    }

                    DataFacade.AddNew(data);
                }

                return true;
            }

            // Check when do we have this situation
            return false;
        }



        /// <exclude />
        public void ValidateTransition(IData data, string status)
        {
            var publishControlled = (IPublishControlled)data;
            string oldTag;
            if (DataFacade.TryGetDataTag<string>(publishControlled, _oldPublishedStatusTag, out oldTag))
            {
                if (status != oldTag)
                {
                    if (!_transitions[oldTag].Contains(status))
                    {
                        throw new ArgumentException("Invalid transition");
                    }
                }
            }
            else
            {
                if (!String.IsNullOrEmpty(publishControlled.PublicationStatus) && status != publishControlled.PublicationStatus)
                {
                    if (_transitions[publishControlled.PublicationStatus].Contains(status) == false)
                    {
                        throw new ArgumentException("Invalid transition");
                    }
                }
            }

            DataFacade.SetDataTag(data, _oldPublishedStatusTag, status);
        }



        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }



        internal sealed class PublishActionExecutor : IActionExecutor
        {
            public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
            {
                DataEntityToken token = (DataEntityToken)entityToken;

                IPublishControlled publishControlled = (IPublishControlled)DataFacade.GetDataFromDataSourceId(token.DataSourceId);

                ValidationResults validationResults = ValidationFacade.Validate((IData)publishControlled);

                if (validationResults.IsValid)
                {
                    UpdateTreeRefresher treeRefresher = new UpdateTreeRefresher(token.Data.GetDataEntityToken(), flowControllerServicesContainer);

                    if (actionToken is PublishActionToken)
                    {
                        publishControlled.PublicationStatus = Published;
                    }
                    else if (actionToken is DraftActionToken)
                    {
                        publishControlled.PublicationStatus = Draft;
                    }
                    else if (actionToken is AwaitingApprovalActionToken)
                    {
                        publishControlled.PublicationStatus = AwaitingApproval;
                    }
                    else if (actionToken is AwaitingPublicationActionToken)
                    {
                        publishControlled.PublicationStatus = AwaitingPublication;
                    }
                    else if (actionToken is UnpublishActionToken)
                    {
                        publishControlled.PublicationStatus = Draft;

                        using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                        {
                            IData data = DataFacade.GetDataFromOtherScope(token.Data, DataScopeIdentifier.Public).SingleOrDefault();

                            if (data != null)
                            {
                                IPage page = data as IPage;
                                if (page != null)
                                {
                                    IEnumerable<IData> referees;
                                    using (new DataScope(DataScopeIdentifier.Public))
                                    {
                                        referees = page.GetMetaData();
                                    }

                                    DataFacade.Delete(referees, CascadeDeleteType.Disable);
                                }

                                
                                DataFacade.Delete(data, CascadeDeleteType.Disable);
                            }
                            
                            transactionScope.Complete();
                        }
                    }
                    else if (actionToken is UndoPublishedChangesActionToken)
                    {
                        using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                        {
                            using (ProcessControllerFacade.NoProcessControllers)
                            {
                                var administrativeData = (IPublishControlled)token.Data;
                                IData publishedData = DataFacade.GetDataFromOtherScope(token.Data, DataScopeIdentifier.Public).Single();

                                publishedData.FullCopyChangedTo(administrativeData);
                                administrativeData.PublicationStatus = Draft;

                                DataFacade.Update(administrativeData);
                            }

                            transactionScope.Complete();
                        }
                    }
                    else
                    {
                        throw new ArgumentException("Unknown action token", "actionToken");
                    }
                    
                    DataFacade.Update(publishControlled);

                    treeRefresher.PostRefreshMesseges(publishControlled.GetDataEntityToken());
                }
                else
                {
                    var managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

                    StringBuilder sb = new System.Text.StringBuilder();
                    sb.AppendLine(StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "ValidationErrorMessage"));
                    foreach (ValidationResult result in validationResults)
                    {
                        sb.AppendLine(result.Message);
                    }

                    managementConsoleMessageService.ShowMessage(DialogType.Error, StringResourceSystemFacade.GetString("Composite.Plugins.GenericPublishProcessController", "ValidationErrorTitle"), sb.ToString());
                }

                return null;
            }
        }



        internal sealed class DisabledActionToken : ActionToken
        {
            public override IEnumerable<PermissionType> PermissionTypes
            {
                get { yield break; }
            }


            public override string Serialize()
            {
                return "";
            }


            public static ActionToken Deserialize(string serializedData)
            {
                return new DisabledActionToken();
            }
        }


        [IgnoreEntityTokenLocking()]
        [ActionExecutor(typeof(PublishActionExecutor))]
        internal sealed class PublishActionToken : ActionToken
        {
            private static IEnumerable<PermissionType> _permissionTypes = new [] { PermissionType.Publish };

            public override IEnumerable<PermissionType> PermissionTypes
            {
                get { return _permissionTypes; }
            }


            public override string Serialize()
            {
                return Published;
            }


            public static ActionToken Deserialize(string serializedData)
            {
                return new PublishActionToken();
            }
        }


        [IgnoreEntityTokenLocking()]
        [ActionExecutor(typeof(PublishActionExecutor))]
        internal sealed class UnpublishActionToken : ActionToken
        {
            private static IEnumerable<PermissionType> _permissionTypes = new PermissionType[] { PermissionType.Publish };

            public override IEnumerable<PermissionType> PermissionTypes
            {
                get { return _permissionTypes; }
            }


            public override string Serialize()
            {
                return Published;
            }


            public static ActionToken Deserialize(string serializedData)
            {
                return new UnpublishActionToken();
            }
        }


        [IgnoreEntityTokenLocking()]
        [ActionExecutor(typeof(PublishActionExecutor))]
        internal sealed class UndoPublishedChangesActionToken : ActionToken
        {
            private static IEnumerable<PermissionType> _permissionTypes = new [] { PermissionType.Edit, PermissionType.Publish };

            public override IEnumerable<PermissionType> PermissionTypes
            {
                get { return _permissionTypes; }
            }


            public override string Serialize()
            {
                return "";
            }


            public static ActionToken Deserialize(string serializedData)
            {
                return new UndoPublishedChangesActionToken();
            }
        }


        [IgnoreEntityTokenLocking()]
        [ActionExecutor(typeof(PublishActionExecutor))]
        internal sealed class DraftActionToken : ActionToken
        {
            private static IEnumerable<PermissionType> _permissionTypes = new [] { PermissionType.Edit, PermissionType.Approve, PermissionType.Publish };

            public override IEnumerable<PermissionType> PermissionTypes
            {
                get { return _permissionTypes; }
            }


            public override string Serialize()
            {
                return Draft;
            }


            public static ActionToken Deserialize(string serializedData)
            {
                return new DraftActionToken();
            }
        }


        [IgnoreEntityTokenLocking()]
        [ActionExecutor(typeof(PublishActionExecutor))]
        internal sealed class AwaitingApprovalActionToken : ActionToken
        {
            private static IEnumerable<PermissionType> _permissionTypes = new [] { PermissionType.Edit };

            public override IEnumerable<PermissionType> PermissionTypes
            {
                get { return _permissionTypes; }
            }


            public override string Serialize()
            {
                return _forwardToAwaitingApproval;
            }


            public static Composite.C1Console.Security.ActionToken Deserialize(string serializedData)
            {
                return new AwaitingApprovalActionToken();
            }
        }


        [IgnoreEntityTokenLocking()]
        [ActionExecutor(typeof(PublishActionExecutor))]
        internal sealed class AwaitingPublicationActionToken : ActionToken
        {
            private static IEnumerable<PermissionType> _permissionTypes = new [] { PermissionType.Approve };

            public override IEnumerable<PermissionType> PermissionTypes
            {
                get { return _permissionTypes; }
            }


            public override string Serialize()
            {
                return _forwardToAwaitingApproval;
            }


            public static Composite.C1Console.Security.ActionToken Deserialize(string serializedData)
            {
                return new AwaitingPublicationActionToken();
            }
        }
    }
}
