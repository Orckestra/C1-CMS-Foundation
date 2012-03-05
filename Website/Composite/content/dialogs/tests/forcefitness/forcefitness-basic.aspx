<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title></title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<form>
			<ui:dialogpage label="Fitness" height="300" resizable="true">
				
				<ui:pagebody style="border: 1px solid black;">
					<ui:toolbar>
						<ui:toolbarbody>
							<ui:toolbargroup>
								<ui:clickbutton label="Fit!!!" oncommand="this.dispatchAction(Binding.ACTION_UPDATED)" style="margin: 0"/>
							</ui:toolbargroup>
						</ui:toolbarbody>
					</ui:toolbar>
					<div style="padding: 10px;">
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content</div>
						<div>Content LAST!</div>
					</div>
				</ui:pagebody>
					
				
				<ui:dialogtoolbar>
					<ui:toolbarbody align="right" equalsize="true">
						<ui:toolbargroup>
							<ui:clickbutton label="OK" response="accept"/>
						</ui:toolbargroup>
					</ui:toolbarbody>
				</ui:dialogtoolbar>
			
			</ui:dialogpage>
		</form>
	</body>
</html>