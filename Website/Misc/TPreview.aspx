<!DOCTYPE html>

<%@ Page Language="C#" %>
<%@ Import Namespace="Composite.Core.WebClient.Services.WysiwygEditor" %>


<script runat="server" language="c#">
   
    readonly StringBuilder _output = new StringBuilder();

    private Guid _pageId = new Guid("148ec879-f225-4906-bb4c-9d403269bcd9");
    private Guid _templateId = new Guid("ea2ca748-efbf-4d94-8e2a-11ce49b71cd5");

    private string _imagePath;
    private PageTemplatePreview.PlaceholderInformation[] _placeholders;

       
    private void Page_Init(object sender, EventArgs e)
    {
        // string url = "http://local/Renderers/TemplatePreview.ashx?p=&t=a270f819-0b5c-4f7e-9194-4b554043e4ab";

        PageTemplatePreview.GetPreviewInformation(Context, _pageId, _templateId, out _imagePath, out _placeholders);

        foreach (var placeholder in _placeholders)
        {
            OutPut("Placeholder: " + placeholder.PlaceholderId + "; Width: " + placeholder.ClientRectangle);
        }
    }

        
    void OutPut(string str)
    {
        _output.AppendLine("<pre>");
        _output.AppendLine(Server.HtmlEncode(str));
        _output.AppendLine("</pre>");
    }
        
    private static readonly string LogTitle = "text.aspx";    

</script>


<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Template preview</title>
    <script type="text/javascript" src="TPreview.js"></script>
    <style type="text/css">
        canvas#myCanvas
        {
            pointer-events: none;       /* make the canvas transparent to the mouse - needed since canvas is position infront of image */
            position: absolute;
        }
    </style>
</head>
<body onload="CanvasInit('templateMapImg')">
    <%= _output.ToString() %>
    
    <canvas id="myCanvas"></canvas>

    <img src="/Renderers/TemplatePreviewImage?p=<%= _pageId.ToString() %>&t=<%= _templateId.ToString() %>" usemap="#templatemap" id="templateMapImg"/>
    
    <map name="templatemap">
        <% foreach (var pl in _placeholders)
           {
               var r = pl.ClientRectangleWithZoom;
               string coords = r.Left + "," + r.Top + "," + r.Right + "," + r.Bottom;
        %>
        
        <area shape="rect" coords="<%= coords %>" href="javascript:alert('<%= pl.PlaceholderId %>');" alt="<%= pl.PlaceholderId %>"
              onmouseover='myHover(this);' onmouseout='myLeave();' >

        <% } %>
      
    </map>
</html>
