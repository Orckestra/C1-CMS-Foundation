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
                orderby action.VisualData.ActionLocation.ActionGroup.Priority, action.VisualData.ActionLocation.ActionGroup.Name, action.VisualData.ActionLocation.ActionType
                select new ClientAction
                      {
                          ActionToken = ActionTokenSerializer.Serialize(action.ActionHandle.ActionToken, true),
                          Label = action.VisualData.Label,
                          ToolTip = action.VisualData.ToolTip,
                          Disabled = action.VisualData.Disabled,
                          Icon = action.VisualData.Icon,
                          BulkExecutionDialog = action.VisualData.BulkExecutionDialog,
                          CheckboxStatus = GetCheckboxStatusString(action.VisualData.ActionCheckedStatus),
                          ActivePositions = (int)action.VisualData.ActivePositions,
                          TagValue = action.TagValue,                          
                          ActionCategory = new ClientActionCategory
                               {
                                   GroupId = CalculateActionCategoryGroupId(action.VisualData.ActionLocation),
                                   GroupName = action.VisualData.ActionLocation.ActionGroup.Name,
                                   Name = action.VisualData.ActionLocation.ActionType.ToString(),
                                   IsInFolder = action.VisualData.ActionLocation.IsInFolder,
                                   IsInToolbar = action.VisualData.ActionLocation.IsInToolbar,
                                   FolderName = action.VisualData.ActionLocation.FolderName,
                                   ActionBundle = action.VisualData.ActionLocation.ActionBundle
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

        private static string CalculateActionCategoryGroupId(ActionLocation actionLocation)
        {
            // trying to aqvoid overflow - might be lamo way
            return "Key" + Math.Abs(Math.Abs(actionLocation.ActionGroup.Priority.GetHashCode()) - Math.Abs(actionLocation.ActionGroup.Name.GetHashCode())).ToString();
        }

    }
}
