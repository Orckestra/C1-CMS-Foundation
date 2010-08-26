using System.Web.UI;

using Composite.Plugins.Forms.WebChannel.UiContainerFactories;
using System.Web.UI.WebControls;
using System;
using System.Web;
using System.Collections.Generic;
using Composite.Core.WebClient.UiControlLib;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;


public partial class Composite_Forms_EmptyDocumentExecutionContainer : TemplatedUiContainerBase
{
    private PlaceHolder formPlaceHolder2 = new PlaceHolder();
    private PlaceHolder messagePlaceHolder2 = new PlaceHolder();

    protected string ContainerLabel { get; private set; }
    protected ResourceHandle ContainerIcon { get; private set; }

    protected string ContainerIconClientString
    {
        get
        {
            if (this.ContainerIcon != null)
            {
                return string.Format("${{icon:{0}:{1}}}", this.ContainerIcon.ResourceNamespace, this.ContainerIcon.ResourceName);
            }
            else
            {
                return "${icon:default}";
            }
        }
    }

    public override Control GetFormPlaceHolder()
    {
        return formPlaceHolder2;
    }

    public override Control GetMessagePlaceHolder()
    {
        return messagePlaceHolder2; 
    }

    public override void SetContainerTitle(string containerLabel)
    {
        this.ContainerLabel = containerLabel;
    }

    public override void SetContainerIcon(ResourceHandle icon)
    {
        this.ContainerIcon = icon;
    }

    protected void Page_Init(object sender, EventArgs e)
    {
        formPlaceHolder.Controls.Add(formPlaceHolder2);
        messagePlaceHolder.Controls.Add(messagePlaceHolder2);

        Page.Items.Add("CustomBroadcasterSets", this.customBroadcasterSets);
    }

    public override void ShowFieldMessages(Dictionary<string, string> clientIDPathedMessages)
    {
        foreach (var msgElement in clientIDPathedMessages)
        {
            FieldMessage fieldMessage = new FieldMessage(msgElement.Key, msgElement.Value);
            messagePlaceHolder.Controls.Add(fieldMessage);
        }
    }



}
