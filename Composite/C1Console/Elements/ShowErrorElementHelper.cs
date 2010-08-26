using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Actions;


namespace Composite.C1Console.Elements
{
    internal static class ShowErrorElementHelper
    {
        public static Element CreateErrorElement(string label, string toolTip, string message)
        {
            Element errorElement = new Element(new ElementHandle("DUMMYPROVIDER", new NoSecurityEntityToken()))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = label,
                    ToolTip = toolTip,
                    Icon = ResourceHandle.BuildIconFromDefaultProvider("close"),
                    OpenedIcon = ResourceHandle.BuildIconFromDefaultProvider("close"),
                    HasChildren = false
                }
            };


            errorElement.AddAction(new ElementAction(new ActionHandle(new MessageBoxActionToken(
                label,
                message,
                C1Console.Events.DialogType.Error
            )))
            {
                VisualData = new ActionVisualizedData()
                {
                    Label = label,
                    ToolTip = toolTip,
                    Icon = ResourceHandle.BuildIconFromDefaultProvider("close"),
                    ActionLocation = ActionLocation.OtherPrimaryActionLocation
                }
            });


            return errorElement;
        }
    }
}
