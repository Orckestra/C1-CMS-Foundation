using System.Web.UI.WebControls;
using System.Web.UI;

namespace Composite.Core.WebClient.UiControlLib.Foundation
{
	internal static class ClientAttributes
	{
        public static void WriteClientAttributes(this WebControl uiControl, HtmlTextWriter writer)
        {
            foreach (string attributeName in uiControl.Attributes.Keys)
            {
                string attributeNameLower = attributeName.ToLowerInvariant();
                if (attributeNameLower.StartsWith("client_"))
                {
                    string clientAttributeName = attributeNameLower.Substring("client_".Length);
                    writer.WriteAttribute(clientAttributeName, uiControl.Attributes[attributeName]);
                }
            }
        }


        public static void AddClientAttributes(this WebControl uiControl, HtmlTextWriter writer)
        {
            foreach (string attributeName in uiControl.Attributes.Keys)
            {
                string attributeNameLower = attributeName.ToLowerInvariant();
                if (attributeNameLower.StartsWith("client_"))
                {
                    string clientAttributeName = attributeNameLower.Substring("client_".Length);
                    writer.AddAttribute(clientAttributeName, uiControl.Attributes[attributeName]);
                }
            }
        }

	}
}
