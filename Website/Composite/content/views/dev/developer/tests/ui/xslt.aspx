<?xml version="1.0" encoding="UTF-8"?>
<%@ Register Src="~/Composite/controls/RegisterOutputTransformation.ascx" TagPrefix="local" TagName="outputtransformation" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<local:outputtransformation ID="AlarmOutPutTransformation" runat="server" position="1" path="transformations/masterfilterALARM.xsl"/>
	<local:outputtransformation ID="DimseOutPutTransformation" runat="server" position="3" path="transformations/masterfilterFISSE.xsl"/>
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Test.XSLT</title>
		<control:styleloader runat="server" />
		<script type="text/javascript">
			window.isServersideExpand = false;
		</script>
		<control:scriptloader type="sub" runat="server" />
	</head>
	<body id="THEBODY" class="TESTBODYCLASSNAME">
		<ui:page label="XSLT">
			<h1>Labels</h1>
			<div>
				<ui:labelbox label="Hans" lort="alarm" class="dims" />
				<ui:labelbox label="Jens" />
				<ui:labelbox label="Ole" />
				<ui:labelbox label="Bent" />
				<div style="clear:both;"></div>
			</div>
			<h1>Toolbarbuttons</h1>
			<ui:toolbar>
				<ui:toolbarbody>
					<ui:toolbargroup>
						<ui:xtoolbarbutton label="John" />
						<!-- 
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						<ui:xtoolbarbutton label="John" />
						-->
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>
		</ui:page>
	</body>
</html>