<%@ Control Language="C#" Inherits="CompositeMultiContentXhtmlEditor.MultiContentXhtmlEditor" CodeFile="MultiContentXhtmlEditor.ascx.cs" %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.Xml.Linq" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="Composite.Core.WebClient.Services.WysiwygEditor" %>
<%@ Import Namespace="Composite.Core.Types" %>

<script runat="server">
    private string EmbedableFieldsTypesString
    {
        get
        {
            if (this.EmbedableFieldsTypes == null)
            {
                return "";
            }
            else
            {
                var serializedNames =
                    from t in this.EmbedableFieldsTypes
                    select TypeManager.SerializeType(t);

                return string.Join("|", serializedNames.ToArray());
            }
        }
    }
</script>

<ui:visualmultieditor 
	formattingconfiguration="common"
	embedablefieldstypenames="<%= HttpUtility.HtmlAttributeEncode(this.EmbedableFieldsTypesString) %>"
	id="<%= this.UniqueID %>">
    <!-- THIS CAN NOW BE REMOVED (INCLUDING CODEBEHIND SUPPORT!) -->
   	<aspui:Selector SimpleSelectorMode="false" ID="TemplateSelector" runat="server">
   	    <asp:ListItem>default</asp:ListItem>
   	</aspui:Selector> 
	<div>
	    <asp:PlaceHolder ID="ContentsPlaceHolder" runat="server"/>
    </div>
</ui:visualmultieditor>