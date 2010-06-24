<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Menus</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:page label="Menus">
		
			<ui:menubar id="menubar">
				<ui:menu label="File">
					<ui:menupopup>
						<ui:menubody>
							<ui:menugroup>
								<ui:menuitem label="Temp"/>
								<ui:menuitem label="Temp"/>
							</ui:menugroup>
							<ui:menugroup>
								<ui:menuitem label="Submenu">
									<ui:menupopup>
										<ui:menubody>
											<ui:menugroup>
												<ui:menuitem label="Temp"/>
												<ui:menuitem label="Temp"/>
												<ui:menuitem label="Submenu">
													<ui:menupopup>
														<ui:menubody>
															<ui:menugroup>
																<ui:menuitem label="Temp"/>
																<ui:menuitem label="Temp"/>
															</ui:menugroup>
														</ui:menubody>
													</ui:menupopup>
												</ui:menuitem>
											</ui:menugroup>
										</ui:menubody>
									</ui:menupopup>
								</ui:menuitem>
								<ui:menuitem label="Temp"/>
							</ui:menugroup>
						</ui:menubody>
					</ui:menupopup>
				</ui:menu>
				<ui:menu label="View">
					<ui:menupopup>
						<ui:menubody>
							<ui:menugroup>
								<ui:menuitem label="System Log" binding="StageViewMenuItemBinding" handle="Composite.Management.SystemLog" image="${icon:systemlog}"/>
								<ui:menuitem label="Developer Panel" binding="StageViewMenuItemBinding" handle="Composite.Management.Developer" image="${icon:developer}"/>
								<ui:menuitem label="Icon Pack" binding="StageViewMenuItemBinding" handle="Composite.Management.IconPack" image="${icon:icon}"/>
							</ui:menugroup>
						</ui:menubody>
					</ui:menupopup>
				</ui:menu>
				<ui:menu label="Tools">
					<ui:menupopup>
						<ui:menubody>
							<ui:menugroup>
								<ui:menuitem label="Options..." binding="StageViewMenuItemBinding" handle="Composite.Management.Options"/>
							</ui:menugroup>
						</ui:menubody>
					</ui:menupopup>
				</ui:menu>
				<ui:menu label="Help">
					<ui:menupopup>
						<ui:menubody>
							<ui:menugroup>
								<ui:menuitem label="Help Contents"/>
								<ui:menuitem label="About Composite Management" oncommand="Commands.about()"/>
							</ui:menugroup>
						</ui:menubody>
					</ui:menupopup>
				</ui:menu>
			</ui:menubar>
			
			<ui:toolbar>
				<ui:toolbarbody>
					<ui:toolbargroup>
						<ui:toolbarbutton label="Hej"/>
						<ui:toolbarbutton label="Dav"/>
					</ui:toolbargroup>
					<ui:toolbargroup>
						<ui:toolbarbutton label="Hallo" image="${icon:default}"/>
						<ui:toolbarbutton label="Hey" image="${icon:default}"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
				<ui:toolbarbody align="right">
					<ui:toolbargroup>
						<ui:toolbarlabel label="Radiobuttons"/>
						<ui:toolbarbutton cmd="JustifyLeft" tooltip="${string:Website.WysiwygEditor.ToolBar.ToolTipJustifyLeft}" type="radio" image="${skin}/wysiwygeditor/justifyleft.png" image-disabled="${skin}/wysiwygeditor/justifyleft-disabled.png" />
						<ui:toolbarbutton cmd="JustifyRight" tooltip="${string:Website.WysiwygEditor.ToolBar.ToolTipJustifyRight}" type="radio" image="${skin}/wysiwygeditor/justifyright.png" image-disabled="${skin}/wysiwygeditor/justifyright-disabled.png" />
						<ui:toolbarbutton cmd="JustifyCenter" tooltip="${string:Website.WysiwygEditor.ToolBar.ToolTipJustifyCenter}" type="radio" image="${skin}/wysiwygeditor/justifycenter.png" image-disabled="${skin}/wysiwygeditor/justifycenter-disabled.png" />
						<ui:toolbarbutton cmd="JustifyFull" tooltip="${string:Website.WysiwygEditor.ToolBar.ToolTipJustifyFull}" type="radio" image="${skin}/wysiwygeditor/justifyfull.png" image-disabled="${skin}/wysiwygeditor/justifyfull-disabled.png" />
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>
			
		</ui:page>
	</body>
</html>