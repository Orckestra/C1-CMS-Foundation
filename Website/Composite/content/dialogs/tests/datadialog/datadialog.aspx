<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Test</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:dialogpage label="Data Dialog Test" resizable="false">
			<ui:pagebody>
				<ui:fields>
					<ui:fieldgroup label="Options">
						<ui:field>
							<ui:fielddesc>Option 1</ui:fielddesc>
							<ui:fielddata>
								<ui:selector name="option1" label="(default)">
									<ui:selection label="High" value="high"/>
									<ui:selection label="Low" value="low"/>
									<ui:selection label="Autohigh" value="autoheigh"/>
									<ui:selection label="Autolow" value="autolow"/>
									<ui:selection label="Best" value="best"/>
								</ui:selector>
							</ui:fielddata>
						</ui:field>
						<ui:field>
							<ui:fielddesc>Option 2</ui:fielddesc>
							<ui:fielddata>
								<ui:selector name="option2" label="(default)">
									<ui:selection label="Window" value="window"/>
									<ui:selection label="Opaque" value="opaque"/>
									<ui:selection label="Transparent" value="transparent"/>
								</ui:selector>
							</ui:fielddata>
						</ui:field>
						<ui:field>
							<ui:fielddesc>Settings</ui:fielddesc>
							<ui:fielddata>
								<ui:checkboxgroup>
									<ui:checkbox label="Option 3" name="option3" ischecked="true"/>
									<ui:checkbox label="Option 4" name="option4" ischecked="true"/>
									<ui:checkbox label="Option 5" name="option5" ischecked="true"/>
									<ui:checkbox label="Option 6" name="option6"/>
								</ui:checkboxgroup>
							</ui:fielddata>
						</ui:field>
					</ui:fieldgroup>
				</ui:fields>
			</ui:pagebody>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton 
							id="buttonAccept" 
							label="OK" 
							default="true" 
							response="accept" 
							focusable="true"/>
						<ui:clickbutton 
							label="Cancel" 
							response="cancel" 
							focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>