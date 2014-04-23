using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Events;
using Composite.C1Console.Events.Foundation;
using Composite.C1Console.Security;
using Composite.Core.Types;
using Composite.C1Console.Users;
using Composite.Core.ResourceSystem;
using Composite.Core.Logging;
using Composite.Core.Configuration;


namespace Composite.Core.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ConsoleMessageServiceFacade
    {
        /// <exclude />
        public static int CurrentChangeNumber
        {
            get { return ConsoleMessageQueueFacade.CurrentChangeNumber; }
        }


        /// <exclude />
        public static GetMessagesResult GetNewMessages(string consoleId, int lastKnownChangeNumber)
        {
            ConsoleFacade.RegisterConsole(UserSettings.Username, consoleId);

            List<ConsoleAction> newMessages = new List<ConsoleAction>();

            GetMessagesResult result = new GetMessagesResult();
            result.CurrentSequenceNumber = ConsoleMessageQueueFacade.CurrentChangeNumber;
            
            List<ConsoleMessageQueueElement> messageQueueElements = ConsoleMessageQueueFacade.GetQueueElements(lastKnownChangeNumber, consoleId).ToList();
            if (messageQueueElements.Any() && messageQueueElements.Max(f => f.QueueItemNumber) > result.CurrentSequenceNumber)
            {
                result.CurrentSequenceNumber = messageQueueElements.Max(f => f.QueueItemNumber);
            }

            DocumentSuspectMessageRequests(consoleId, lastKnownChangeNumber, result, messageQueueElements);

            // Open views...
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(OpenViewMessageQueueItem)))
            {
                OpenViewMessageQueueItem openViewItem = (OpenViewMessageQueueItem)queueElement.QueueItem;

                List<KeyValuePair> arguments = new List<KeyValuePair>();
                if (openViewItem.UrlPostArguments != null)
                {
                    foreach (var entry in openViewItem.UrlPostArguments)
                    {
                        arguments.Add(new KeyValuePair(entry.Key, entry.Value));
                    }
                }

                OpenViewParams openViewParams = new OpenViewParams
                {
                    Url = openViewItem.Url,
                    Argument = arguments,
                    EntityToken = openViewItem.EntityToken,
                    FlowHandle = openViewItem.FlowHandle,
                    ViewId = openViewItem.ViewId,
                    ViewType = openViewItem.ViewType.AsConsoleType(),
                    Label = openViewItem.Label,
                    ToolTip = openViewItem.ToolTip ?? openViewItem.Label
                };

                openViewParams.Image = GetImageUrl(openViewItem.IconResourceHandle);

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.OpenView,
                    OpenViewParams = openViewParams
                });
            }


            // Open view definitions...
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(OpenHandledViewMessageQueueItem)))
            {
                OpenHandledViewMessageQueueItem openViewDefItem = (OpenHandledViewMessageQueueItem)queueElement.QueueItem;

                List<KeyValuePair> arguments = new List<KeyValuePair>();
                foreach (var entry in openViewDefItem.Arguments)
                {
                    arguments.Add(new KeyValuePair(entry.Key, entry.Value));
                }

                OpenViewDefinitionParams openViewDefParams = new OpenViewDefinitionParams
                {
                    ViewId = openViewDefItem.Handle + Guid.NewGuid().ToString(),
                    EntityToken = openViewDefItem.EntityToken,
                    Handle = openViewDefItem.Handle,
                    Argument = arguments
                };

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.OpenViewDefinition,
                    OpenViewDefinitionParams = openViewDefParams
                });
            }


            // Open generic views...
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(OpenGenericViewQueueItem)))
            {
                OpenGenericViewQueueItem openGenericView = (OpenGenericViewQueueItem)queueElement.QueueItem;

                List<KeyValuePair> arguments = new List<KeyValuePair>();
                foreach (var entry in openGenericView.UrlPostArguments)
                {
                    arguments.Add(new KeyValuePair(entry.Key, entry.Value));
                }

                OpenGenericViewParams openGenericViewParams = new OpenGenericViewParams
                {
                    ViewId = openGenericView.ViewId,
                    EntityToken = openGenericView.EntityToken,
                    Label = openGenericView.Label,
                    ToolTip = openGenericView.ToolTip ?? openGenericView.Label,
                    Url = openGenericView.Url,
                    UrlPostArguments = arguments
                };

                openGenericViewParams.Image = GetImageUrl(openGenericView.IconResourceHandle);

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.OpenGenericView,
                    OpenGenericViewParams = openGenericViewParams
                });
            }

            // Open external views...
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(OpenExternalViewQueueItem)))
            {
                OpenExternalViewQueueItem openExternalView = (OpenExternalViewQueueItem)queueElement.QueueItem;

                List<KeyValuePair> arguments = new List<KeyValuePair>();
                foreach (var entry in openExternalView.UrlPostArguments)
                {
                    arguments.Add(new KeyValuePair(entry.Key, entry.Value));
                }

                OpenExternalViewParams openExternalViewParams = new OpenExternalViewParams
                {
                    ViewId = openExternalView.ViewId,
                    EntityToken = openExternalView.EntityToken,
                    Label = openExternalView.Label,
                    ToolTip = openExternalView.ToolTip ?? openExternalView.Label,
                    ViewType = openExternalView.ViewType,
                    Url = openExternalView.Url,
                    UrlPostArguments = arguments
                };

                openExternalViewParams.Image = GetImageUrl(openExternalView.IconResourceHandle);

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.OpenExternalView,
                    OpenExternalViewParams = openExternalViewParams
                });
            }      


            // Download files...
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(DownloadFileMessageQueueItem)))
            {
                DownloadFileMessageQueueItem downloadFileItem = (DownloadFileMessageQueueItem)queueElement.QueueItem;

                DownloadFileParams downloadFileParams = new DownloadFileParams
                {
                    Url = downloadFileItem.Url,
                };

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.DownloadFile,
                    DownloadFileParams = downloadFileParams
                });
            }


            // Close views...
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(CloseViewMessageQueueItem)))
            {
                CloseViewMessageQueueItem closeViewItem = (CloseViewMessageQueueItem)queueElement.QueueItem;

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.CloseView,
                    CloseViewParams = new CloseViewParams
                     {
                         ViewId = closeViewItem.ViewId
                     }
                });
            }


            // Refresh tree...
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(RefreshTreeMessageQueueItem)))
            {
                var refreshTreeItem = (RefreshTreeMessageQueueItem)queueElement.QueueItem;

                string serializedEntityToken = EntityTokenSerializer.Serialize(refreshTreeItem.EntityToken, true);

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.RefreshTree,
                    RefreshTreeParams = new RefreshTreeParams
                     {
                         EntityToken = serializedEntityToken,
                     }
                });
            }


            // Send message boxes...
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(MessageBoxMessageQueueItem)))
            {
                MessageBoxMessageQueueItem messageBoxItem = (MessageBoxMessageQueueItem)queueElement.QueueItem;

                DialogType clientDialogType = DialogType.Message;

                switch (messageBoxItem.DialogType)
                {
                    case Composite.C1Console.Events.DialogType.Message:
                        clientDialogType = DialogType.Message;
                        break;
                    case Composite.C1Console.Events.DialogType.Question:
                        clientDialogType = DialogType.Question;
                        break;
                    case Composite.C1Console.Events.DialogType.Warning:
                        clientDialogType = DialogType.Warning;
                        break;
                    case Composite.C1Console.Events.DialogType.Error:
                        clientDialogType = DialogType.Error;
                        break;
                    default:
                        clientDialogType = DialogType.Message;
                        break;
                }


                newMessages.Add(new ConsoleAction
                                {
                                    SequenceNumber = queueElement.QueueItemNumber,
                                    ActionType = ActionType.MessageBox,
                                    MessageBoxParams = new MessageBoxParams
                                                     {
                                                         DialogType = clientDialogType,
                                                         Title = messageBoxItem.Title,
                                                         Message = messageBoxItem.Message
                                                     }
                                });
            }


            // Send log entries...
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(LogEntryMessageQueueItem)))
            {
                LogEntryMessageQueueItem logEntryItem = (LogEntryMessageQueueItem)queueElement.QueueItem;

                newMessages.Add(new ConsoleAction
                                {
                                    SequenceNumber = queueElement.QueueItemNumber,
                                    ActionType = ActionType.LogEntry,
                                    LogEntryParams = new LogEntryParams
                                                     {
                                                         SenderId = logEntryItem.Sender.Name,
                                                         Level = logEntryItem.Level.AsConsoleType(),
                                                         Message = logEntryItem.Message

                                                     }
                                });
            }


            // Restart console application (like culture change)...
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(RebootConsoleMessageQueueItem)))
            {
                RebootConsoleMessageQueueItem rebootConsoleItem = (RebootConsoleMessageQueueItem)queueElement.QueueItem;

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.Reboot
                });
            }


            // Collaps the tree and refresh
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(CollapseAndRefreshConsoleMessageQueueItem)))
            {
                CollapseAndRefreshConsoleMessageQueueItem collapseAndRefreshConsoleMessageQueueItem = (CollapseAndRefreshConsoleMessageQueueItem)queueElement.QueueItem;

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.CollapseAndRefresh
                });
            }


            // Close all open views
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(CloseAllViewsMessageQueueItem)))
            {
                CloseAllViewsMessageQueueItem closeAllViewsMessageQueueItem = (CloseAllViewsMessageQueueItem)queueElement.QueueItem;

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.CloseAllViews,
                    CloseAllViewsParams = new CloseAllViewsParams { Reason = closeAllViewsMessageQueueItem.Reason }
                });
            }


            // Lock the console application
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(LockSystemConsoleMessageQueueItem)))
            {
                LockSystemConsoleMessageQueueItem lockSystemConsoleMessageQueueItem = (LockSystemConsoleMessageQueueItem)queueElement.QueueItem;

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.LockSystem
                });
            }


            // Lock the console application
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(BroadcastMessageQueueItem)))
            {
                BroadcastMessageQueueItem broadcastMessageQueueItem = (BroadcastMessageQueueItem)queueElement.QueueItem;

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.BroadcastMessage,
                    BroadcastMessageParams = new BroadcastMessageParams
                    {
                        Name = broadcastMessageQueueItem.Name,
                        Value = broadcastMessageQueueItem.Value
                    }
                });
            }


            // SaveStatus
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(SaveStatusConsoleMessageQueueItem)))
            {
                SaveStatusConsoleMessageQueueItem saveStatusConsoleMessageQueueItem = (SaveStatusConsoleMessageQueueItem)queueElement.QueueItem;

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.SaveStatus,
                    SaveStatusParams = new SaveStatusParams { ViewId = saveStatusConsoleMessageQueueItem.ViewId, Succeeded = saveStatusConsoleMessageQueueItem.Succeeded }
                });
            }

            // BindEntityToken
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(BindEntityTokenToViewQueueItem)))
            {
                var bindEntityTokenToViewQueueItem = (BindEntityTokenToViewQueueItem)queueElement.QueueItem;
                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.BindEntityTokenToView,
                    BindEntityTokenToViewParams = new BindEntityTokenToViewParams { ViewId = bindEntityTokenToViewQueueItem.ViewId, EntityToken = bindEntityTokenToViewQueueItem.EntityToken }
                });
            }

            // BindEntityToken
            foreach (ConsoleMessageQueueElement queueElement in messageQueueElements.Where(f => f.QueueItem.GetType() == typeof(SelectElementQueueItem)))
            {
                var selectElementQueueItem = (SelectElementQueueItem)queueElement.QueueItem;

                newMessages.Add(new ConsoleAction
                {
                    SequenceNumber = queueElement.QueueItemNumber,
                    ActionType = ActionType.SelectElement,
                    BindEntityTokenToViewParams = new BindEntityTokenToViewParams { EntityToken = selectElementQueueItem.EntityToken }
                });
            }

            result.ConsoleActions = newMessages.OrderBy(f => f.SequenceNumber).ToList();

            return result;
        }



        /// <summary>
        /// If the client feeding from the queue goes haywire, we start to log details about it for debug purposes.
        /// </summary>
        private static void DocumentSuspectMessageRequests(string consoleId, int lastKnownChangeNumber, GetMessagesResult result, List<ConsoleMessageQueueElement> messageQueueElements)
        {
            int maxSecondsExpected = 60;

            if (lastKnownChangeNumber > result.CurrentSequenceNumber)
            {
                LoggingService.LogInformation("ConsoleMessageServiceFacade", string.Format("Console '{0}' has a last known change numer of {1}, but server current number is {2}.", consoleId, lastKnownChangeNumber, result.CurrentSequenceNumber));
            }

            if (messageQueueElements.Any() && DateTime.Now.Subtract(messageQueueElements.Min(f => f.EnqueueTime)).TotalSeconds > maxSecondsExpected)
            {
                ConsoleMessageQueueFacade.DoDebugSerializationToFileSystem();
                LoggingService.LogWarning("ConsoleMessageServiceFacade", string.Format("Console '{0}' are requesting messages that are more than {1} seconds old. Console has last known change number {2}, server is now at {3}. Debug XML dump saved at '{4}'.", consoleId, maxSecondsExpected, lastKnownChangeNumber, result.CurrentSequenceNumber, GlobalSettingsFacade.TempDirectory));
            }
        }



        private static string GetImageUrl(ResourceHandle resourceHandle)
        {
            if (resourceHandle == null) return null;

            return string.Format("${{root}}/services/Icon/GetIcon.ashx?resourceNamespace={0}&resourceName={1}", resourceHandle.ResourceNamespace, resourceHandle.ResourceName);
        }
    }
}
