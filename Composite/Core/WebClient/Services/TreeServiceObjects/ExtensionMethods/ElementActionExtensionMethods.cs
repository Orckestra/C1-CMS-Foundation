using System.Linq;
using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using System;


namespace Composite.Core.WebClient.Services.TreeServiceObjects.ExtensionMethods
{
    internal static class ElementActionExtensionMethods
    {
        public static List<ClientAction> ToClientActionList(this IEnumerable<ElementAction> actions)
        {
            var clientActions =
                from action in actions
                let visualData = action.VisualData
                let actionLocation = visualData.ActionLocation
                orderby actionLocation.ActionGroup.Priority, actionLocation.ActionGroup.Name, actionLocation.ActionType
                select new ClientAction
                      {
                          ActionToken = ActionTokenSerializer.Serialize(action.ActionHandle.ActionToken, true),
                          Label = visualData.Label,
                          ToolTip = visualData.ToolTip,
                          Disabled = visualData.Disabled,
                          Icon = visualData.Icon,
                          BulkExecutionDialog = visualData.BulkExecutionDialog,
                          CheckboxStatus = GetCheckboxStatusString(visualData.ActionCheckedStatus),
                          ActivePositions = (int)visualData.ActivePositions,
                          TagValue = action.TagValue,
                          ActionCategory = new ClientActionCategory
                               {
                                   GroupId = CalculateActionCategoryGroupId(actionLocation.ActionGroup),
                                   GroupName = actionLocation.ActionGroup.Name,
                                   Name = actionLocation.ActionType.ToString(),
                                   IsInFolder = actionLocation.IsInFolder,
                                   IsInToolbar = actionLocation.IsInToolbar,
                                   FolderName = actionLocation.FolderName,
                                   ActionBundle = actionLocation.ActionBundle
                          }
                      };

            return clientActions.ToList();
        }


        private static string GetCheckboxStatusString(ActionCheckedStatus actionCheckedStatus)
        {
            switch (actionCheckedStatus)
            {
                case ActionCheckedStatus.Uncheckable:
                    return null;
                case ActionCheckedStatus.Unchecked:
                    return "Unchecked";
                case ActionCheckedStatus.Checked:
                    return "Checked";
                default:
                    throw new InvalidOperationException("Unexpected ActionCheckedStatus value");
            }
        }

        private static string CalculateActionCategoryGroupId(ActionGroup actionGroup)
        {
            return "Key" + (actionGroup.Priority + actionGroup.Name).GetHashCode();
        }

    }
}
