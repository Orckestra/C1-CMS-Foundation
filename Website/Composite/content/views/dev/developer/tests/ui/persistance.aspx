<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Menus</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:page label="Persistance">
			
			<div style="padding: 10px;">This tabbox will persist selected panel on reload.</div>
			
				<ui:tabbox id="tabboxwithveryuniqueid" selectedindex="2" persist="selectedindex">
					<ui:tabs>
						<ui:tab label="Splitboxes"/>
						<ui:tab label="More Content"/>
						<ui:tab label="Most Content"/>
					</ui:tabs>
					<ui:tabpanels flex="false">
						<ui:tabpanel>
							<ui:splitbox id="splitboxwithveryuniqueid" orient="horizontal" layout="1:1" persist="layout">
								<ui:splitpanel>
									<div style="padding: 10px;">This split box will persist layout.</div>
								</ui:splitpanel>
								<ui:splitter/>
								<ui:splitpanel/>
							</ui:splitbox>
						</ui:tabpanel>
						<ui:tabpanel>
							<div><strong>Tabpanel 2</strong></div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
						</ui:tabpanel>
						<ui:tabpanel>
							<div><strong>Tabpanel 3</strong></div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
							<div>More content</div>
						</ui:tabpanel>
					</ui:tabpanels>
				</ui:tabbox>
			
		</ui:page>
	</body>
</html>