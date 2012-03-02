<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Dialogs.ImageEditor.ScaleImage</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript" src="ScaleImageDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage binding="ScaleImageDialogPageBinding"
			label="${string:Website.Dialogs.ImageEditor.ScaleImage.LabelScaleImage}" 
			image="${icon:scale}">
			<ui:pagebody>
				<ui:fields>
					<ui:fieldgroup label="${string:Website.Dialogs.ImageEditor.ScaleImage.LabelImageSize}">
						<ui:field>
							<ui:fielddesc label="${string:Website.Dialogs.ImageEditor.ScaleImage.LabelDimensions}"/>
							<ui:fielddata>
								<ui:selector id="dimensions">
									<ui:selection label="${string:Website.Dialogs.ImageEditor.ScaleImage.LabelFixedRatio}" value="fixed" selected="true"/>
									<ui:selection label="${string:Website.Dialogs.ImageEditor.ScaleImage.LabelFreeResize}" value="free"/>
								</ui:selector>
							</ui:fielddata>
						</ui:field>
						<ui:field>
							<ui:fielddesc label="${string:Website.Dialogs.ImageEditor.ScaleImage.Unit}"/>
							<ui:fielddata>
								<ui:selector id="unit">
									<ui:selection label="${string:Website.Dialogs.ImageEditor.ScaleImage.LabelPixels}" value="pixels" selected="true"/>
									<ui:selection label="${string:Website.Dialogs.ImageEditor.ScaleImage.LabelPercent}" value="percent"/>
								</ui:selector>
							</ui:fielddata>
						</ui:field>
						<ui:field>
							<ui:fielddesc label="${string:Website.Dialogs.ImageEditor.ScaleImage.Width}"/>
							<ui:fielddata>
								<ui:datainput id="width" type="integer"/>
							</ui:fielddata>
						</ui:field>
						<ui:field>
							<ui:fielddesc label="${string:Website.Dialogs.ImageEditor.ScaleImage.Height}"/>
							<ui:fielddata>
								<ui:datainput id="height" type="integer"/>
							</ui:fielddata>
						</ui:field>
					</ui:fieldgroup>
				</ui:fields>
			</ui:pagebody>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" id="buttonAccept" response="accept" focusable="true" default="true"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
			
		</ui:dialogpage>
	</body>
</html>