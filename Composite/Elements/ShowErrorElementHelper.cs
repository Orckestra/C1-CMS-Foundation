using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Security;
using Composite.ResourceSystem;
using Composite.Actions;


namespace Composite.Elements
{
    public static class ShowErrorElementHelper
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
                ConsoleEventSystem.DialogType.Error
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
