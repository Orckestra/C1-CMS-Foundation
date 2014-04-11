<%@ Control Language="C#" Inherits="CompositePageContentEditor.PageContentEditor" CodeFile="PageContentEditor.ascx.cs" %>
<%@ Register TagPrefix="aspui" Namespace="Composite.Core.WebClient.UiControlLib" Assembly="Composite" %>

<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.Xml.Linq" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="Composite.Core.WebClient.Services.WysiwygEditor" %>
<%@ Import Namespace="Composite.Core.Types" %>

<ui:visualmultitemplateeditor
	formattingconfiguration="<%= this.ClassConfigurationName %>"
    embedablefieldstypenames=""
	pageid="<%= this.PageId %>"
	id="<%= this.UniqueID %>">
	<div class="visualmultitemplateeditor_placeholders">
	    <asp:PlaceHolder ID="ContentsPlaceHolder" runat="server"/>
	</div>
	<div class="visualmultitemplateeditor_templateselector">
		<aspui:Selector SimpleSelectorMode="false" ID="TemplateSelector" runat="server" OnSelectedIndexChanged="TemplateSelector_SelectedIndexChanged" />
	</div>
</ui:visualmultitemplateeditor>