<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialog.TreeSelector</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="TreeSelectorDialogPageBinding.js"></script>
		<link rel="stylesheet" type="text/css" href="treeselector.css.aspx"/>
	</head>
	<body>
	
		<ui:dialogpage 
			binding="TreeSelectorDialogPageBinding"
			label="(title supplied as page argument!)"
			image="${icon:default}" 
			width="500"
			height="500"
			resizable="false">
			
			<ui:pagebody class="pad-0">
				<ui:tree id="selectiontree" binding="SystemTreeBinding" selectiontype="single" actionaware="false" locktoeditor="false">
					<ui:treebody/>
				</ui:tree>
			</ui:pagebody>
			
			<ui:dialogtoolbar>
				<ui:toolbarbody class="max">
					<ui:toolbargroup class="max">
						<ui:datainput readonly="true" isdisabled="true" id="treeselectionresult" name="treeselectionresult"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
				<ui:toolbarbody align="right" equalsize="true" class="right">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" id="buttonAccept" response="accept" isdisabled="true" focusable="true" default="true"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
			
		</ui:dialogpage>
	</body>
</html>