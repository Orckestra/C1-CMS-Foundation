<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title></title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<form id="hans" action="child.aspx" method="post" class="updateform updatezone">
		<ui:page>
			<div id="johnson">
				<div style="padding-bottom:10px;">
					<ui:clickbutton label="Update" oncommand="document.forms [ 0 ].submit ();"/>
				</div>
				<br style="clear:both;"/>
				<ui:scrollbox class="padded" id="thingy">
					
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
					
					
				</ui:scrollbox>
			</div>
		</ui:page>
		</form>
	</body>
</html>