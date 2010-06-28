using System;
using System.Collections.Generic;
using Composite.Elements;
using Composite.Logging;


namespace Composite.Data.ProcessControlled.ProcessControllers.GenericVersionProcessController
{
    [Obsolete("To be removed")]
    internal sealed class GenericVersionProcessController : IVersionProcessController
    {
        private static readonly ActionGroup AppendedActionGroup = new ActionGroup("Versioning", ActionGroupPriority.TargetedAppendLow);

        public void OnBeforeDataAdded(IData data)
        {
            if ((data is IPublishControlled) == true)
            {
                Type type = ProcessControllerFacade.GetProcessControllerType<IPublishProcessController>(data);

                if (type == typeof(GenericPublishProcessController.GenericPublishProcessController))
                {
                    if (DataScopeManager.MapByType(data.DataSourceId.InterfaceType).Equals(DataScopeIdentifier.Administrated) == true)
                    {
                        SetChangeHistory(data as IChangeHistory);
                    }
                }
                else
                {
                    LoggingService.LogWarning("GenericVersionProcessController", string.Format("The data type '{0}' is using another '{1}' controller than the expected '{2}'", data.DataSourceId.InterfaceType, typeof(IPublishProcessController), typeof(GenericPublishProcessController.GenericPublishProcessController)));
                }
            }
            else if (DataScopeManager.MapByType(data.DataSourceId.InterfaceType).Equals(DataScopeIdentifier.Public) == true)
            {
                SetChangeHistory(data as IChangeHistory);
            }
        }



        public void OnBeforeDataUpdated(IData data)
        {
            IPublishControlled publishControlled = data as IPublishControlled;
            IChangeHistory version = data as IChangeHistory;
            // IVersionControlledWritable writable = data as IVersionControlledWritable;

            if (publishControlled != null)
            {
                Type type = ProcessControllerFacade.GetProcessControllerType<IPublishProcessController>(data);

                if (type == typeof(GenericPublishProcessController.GenericPublishProcessController))
                {
                    if (DataScopeManager.MapByType(data.DataSourceId.InterfaceType).Equals(DataScopeIdentifier.Administrated) == true)
                    {
                        if (publishControlled.PublicationStatus != GenericPublishProcessController.GenericPublishProcessController.Published)
                        {
                            SetChangeHistory(version);
                        }
                    }
                }
                else
                {
                    LoggingService.LogWarning("GenericVersionProcessController", string.Format("The data type '{0}' is using another '{1}' controller than the expected '{2}'", data.DataSourceId.InterfaceType, typeof(IPublishProcessController), typeof(GenericPublishProcessController.GenericPublishProcessController)));
                }
            }
            else if (DataScopeManager.MapByType(data.DataSourceId.InterfaceType).Equals(DataScopeIdentifier.Public) == true)
            {
                SetChangeHistory(version);
            }
        }



        public List<ElementAction> GetActions(IData data, Type elementProviderType)
        {
            return null;
            // Versioning disabled for the moment /MRJ
            //return new List<ElementAction>() { 
            //        new ElementAction(new ActionHandle(new GenericVersionInformationActionToken())) {
            //            VisualData = new ActionVisualizedData
            //                {
            //                    Label = StringResourceSystemFacade.GetString("Composite.Management", "GenericVersionProcessController.Version"),
            //                    ToolTip = StringResourceSystemFacade.GetString("Composite.Management", "GenericVersionProcessController.VersionToolTip"),
            //                    Icon = CommonElementIcons.Clock,
            //                    Disabled = false,
            //                    ActionLocation = new ActionLocation
            //                    {
            //                        ActionType = ActionType.Other,
            //                        IsInFolder = false,
            //                        IsInToolbar = false,
            //                        ActionGroup = AppendedActionGroup
            //                    }
            //                }
            //        }
            //    };
        }

        private static void SetChangeHistory(IChangeHistory data)
        {
            data.ChangeDate = DateTime.Now;
        }
    }
}
