<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialogs.WebServices.Error</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<link rel="stylesheet" type="text/css" href="error.css.aspx"/>
		<script type="text/javascript" src="WebServiceErrorDialogPageBinding.js"></script>
	</head>
	<body>
	
		<ui:dialogpage binding="WebServiceErrorDialogPageBinding"
			label="${string:Website.Dialogs.WebServices.LabelWebServiceError}" 
			image="${icon:error}"
			class="error" 
			resizable="true"
			width="700"
			height="500">
			<ui:pagebody>
				<table id="dialoglayout">
					<tr>
						<td id="dialogvignette">
							<ui:dialogvignette/>
						</td>
						<td id="dialogtext">
							<ui:text label="${string:Website.Dialogs.WebServices.Error}"/><span id="operationname">${operationname}</span>.
						</td>
					</tr>
					<tr>
						<td></td>
						<td id="textarea">
							<textarea wrap="off" id="faultstring" spellcheck="false" readonly="readonly"></textarea>
							<!-- 
							<ui:tabbox typed="boxed">
								<ui:tabs>
									<ui:tab label="Fault String"/>
									<ui:tab label="Request XML"/>
									<ui:tab label="Response XML"/>
								</ui:tabs>
								<ui:tabpanels>
									<ui:tabpanel>
										<textarea wrap="off" id="faultstring" spellcheck="false" readonly="readonly"></textarea>
									</ui:tabpanel>
									<ui:tabpanel/>
									<ui:tabpanel/>
								</ui:tabpanel>
							</ui:tabpanel>
							 -->
						</td>
					</tr>
				</table>
			</ui:pagebody>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" response="accept"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>