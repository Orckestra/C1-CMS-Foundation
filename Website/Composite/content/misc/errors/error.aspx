<?xml version="1.0" encoding="UTF-8"?>
<%@ Page Language="C#" ValidateRequest="false" %>
<script runat="server">
	protected void Page_Load(object sender, EventArgs e)
	{
		// Header for handling redirect error page by javascript
		for (int i = 0; i < 10; i++)
		{
			string indexStr = i == 0 ? string.Empty : i.ToString();
			string type = Request.QueryString["type" + indexStr];
			if (string.IsNullOrEmpty(type)) break;
			string msg = Request.QueryString["msg" + indexStr];
			Response.AddHeader("X-Error-Type" + indexStr, type);
			Response.AddHeader("X-Error-Message" + indexStr, msg);
		}
	}
</script>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head runat="server">
		<title>Composite.Management.ServerError</title>
		<control:scriptloader type="sub" runat="server" />
		<control:styleloader runat="server" />
		<link rel="stylesheet" type="text/css" href="error.css.aspx" />
		<script type="text/javascript" src="ServerErrorPageBinding.js"></script>
	</head>
	<body>
		<ui:page binding="ServerErrorPageBinding" 
			label="${string:Website.ServerError.ServerErrorTitle}" 
			image="${icon:error}">
                <div id="errerdetails">
                    
<% for(int i=0; i<10; i++)
   {
       string indexStr = i == 0 ? string.Empty : i.ToString();
       string type = Request.QueryString["type" + indexStr];

       if (string.IsNullOrEmpty(type)) break;

       string msg = Request.QueryString["msg" + indexStr];
       string stack = Request.QueryString["stack" + indexStr];

%>                    

<pre class="errordetailshead"><%= HttpUtility.HtmlAttributeEncode(type)%>:
<strong><%= HttpUtility.HtmlAttributeEncode(msg)%></strong></pre>

<pre class="errordetailsstack">Stack trace:
<%= HttpUtility.HtmlAttributeEncode(stack)%></pre>

<% } %>

<pre id="errordetailsgenerated">Generated <%= HttpUtility.HtmlAttributeEncode(DateTime.Now.ToString("yyyy-MM-dd HH:mm"))%></pre>
                </div>
			<div id="layout">
				<ui:cover id="cover" busy="false"/>
				<div id="image"></div>
				<div id="text">
					<ui:text label="${string:Website.ServerError.ServerErrorMessage}" />
				    <div id="detailslink" onclick="document.getElementById('errerdetails').style.display='block'">
					    <ui:text label="${string:Website.ServerError.ServerErrorDetails}" />
				    </div>
				</div>
			</div>
		</ui:page>
	</body>
</html>