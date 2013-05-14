<?xml version="1.0" encoding="UTF-8"?>
<%@ Page Language="C#" ValidateRequest="false" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head runat="server">
		<title>Composite.Management.ServerErrorDialog</title>
		<control:scriptloader type="sub" runat="server" />
		<control:styleloader runat="server" />
		<link rel="stylesheet" type="text/css" href="error.css.aspx" />
		<script type="text/javascript" src="ServerErrorDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage 
			binding="ServerErrorDialogPageBinding" 
			label="${string:Website.ServerError.ServerErrorTitle}" 
			image="${icon:error}" 
            resizable="true"
			width="500">
			
                <div id="errerdetails">
<% for(int i=0; i<10; i++)
   {
       string indexStr = i == 0 ? string.Empty : i.ToString();
       string type = Request.QueryString["type" + indexStr];

       if (string.IsNullOrEmpty(type)) break;

       string msg = Request.QueryString["msg" + indexStr];
       string stack = Request.QueryString["stack" + indexStr];

       Response.AddHeader("X-Error-Type" + indexStr, type);
       Response.AddHeader("X-Error-Message" + indexStr, msg);
%>                    

<pre class="errordetailshead"><%= HttpUtility.HtmlAttributeEncode(type)%>:
<strong><%= HttpUtility.HtmlAttributeEncode(msg)%></strong></pre>

<pre class="errordetailsstack">Stack trace:
<%= HttpUtility.HtmlAttributeEncode(stack)%></pre>

<% } %>

<pre id="errordetailsgenerated">Generated <%= HttpUtility.HtmlAttributeEncode(DateTime.Now.ToString("yyyy-MM-dd HH:mm"))%></pre>
                </div>
			<ui:flexbox>
				<div id="box">
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
				</div>
			</ui:flexbox>
			
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" response="accept" />
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>