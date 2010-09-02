<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Wizard1</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
	</head>
	<body>
		<ui:wizardpage id="formcontrolpage" label="Add new page" image="${icon:Composite.Icons:page-add-page}" resizable="false">
			<ui:pagebody>
				<ui:fields>
					<ui:fieldgroup label="General settings">
						<ui:field>
							<ui:fielddesc>Page title</ui:fielddesc>
							<ui:fieldhelp>The entry specified in this field is shown in the browser window title bar. The field is used by search engines and sitemaps</ui:fieldhelp>
							<ui:fielddata>
								<ui:datainput name="FlowUI$Wizard$DialogCanvas1$repeater$ctl00$FieldGroup0$TextBox1" required="true" />
							</ui:fielddata>
						</ui:field>
						<ui:field>
							<ui:fielddesc>Description</ui:fielddesc>
							<ui:fieldhelp>Use this field for at short description of the page</ui:fieldhelp>
							<ui:fielddata>
								<ui:textbox required="false" name="FlowUI$Wizard$DialogCanvas1$repeater$ctl00$FieldGroup0$TextArea2">
									<textarea />
								</ui:textbox>
							</ui:fielddata>
						</ui:field>
						<ui:field>
							<ui:fielddesc>Template</ui:fielddesc>
							<ui:fieldhelp>Select which template you want the page to be based on</ui:fieldhelp>
							<ui:fielddata>
								<ui:selector name="FlowUI$Wizard$DialogCanvas1$repeater$ctl00$FieldGroup0$KeySelector3">
									<ui:selection label="Alarmtemplate" value="6df64aaf-e378-4131-944d-a0e0b96fd465" />
									<ui:selection label="Fiaskotemplate" value="a2a80400-ff87-477c-a83a-4e553cf4f4be" />
									<ui:selection label="Nedturstemplate" value="61c8f749-0ab3-4fad-9cdb-ea6553d7f264" selected="true" />
									<ui:selection label="Opturstemplate" value="78d7bb75-5c36-4ffd-a89b-a945e6ee5766" />
									<ui:selection label="Skandaletemplate" value="0bd28f79-0790-4d2b-a33c-79e10c3c6fb7" />
									<ui:selection label="Spassertemplate" value="49960ce4-e2ac-4f2d-a28b-0bea82d963c9" />
									<ui:selection label="Spastikertemplate" value="91545b55-c161-4bca-9742-62c3a142fce2" />
									<ui:selection label="Successtemplate" value="e453965c-1454-4d7f-9b38-24c16c7ac19c" />
								</ui:selector>
							</ui:fielddata>
						</ui:field>
						<ui:field>
							<ui:fielddesc>Position</ui:fielddesc>
							<ui:fieldhelp>Select where in the content tree you want the page to be placed</ui:fieldhelp>
							<ui:fielddata>
								<ui:selector name="FlowUI$Wizard$DialogCanvas1$repeater$ctl00$FieldGroup0$KeySelector4">
									<ui:selection label="Insert at the bottom" value="Bottom" selected="true" />
									<ui:selection label="Insert at the top" value="Top" />
									<ui:selection label="Select position..." value="Relative" />
									<ui:selection label="Insert alphabetically" value="Alphabetic" />
								</ui:selector>
							</ui:fielddata>
						</ui:field>
					</ui:fieldgroup>
				</ui:fields>
			</ui:pagebody>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="Next" callbackid="FlowUI_Wizard_DialogToolbar4_repeater_ctl00_NextButton6_nextButton" oncommand="this.dispatchAction(WizardPageBinding.ACTION_NAVIGATE_NEXT);" id="nextbutton" image="${icon:next}" image-disabled="${icon:next-disabled}" focusable="true" />
						<ui:clickbutton label="Finish" callbackid="FlowUI_Wizard_DialogToolbar4_repeater_ctl01_FinishButton7_finishButton" oncommand="this.dispatchAction(WizardPageBinding.ACTION_FINISH);" id="finishbutton" image="${icon:finish}" image-disabled="${icon:finish-disabled}" focusable="true" default="true" />
						<ui:clickbutton label="Cancel" callbackid="FlowUI_Wizard_DialogToolbar4_repeater_ctl02_WizardCancelButton8_cancenButton" response="cancel" id="buttonCancel" focusable="true" image="${icon:cancel}" image-disabled="${icon:cancel-disabled}" />
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
			<div style="display: none;">
				<ui:updatepanel id="FlowUI_UpdatePanel2" repaintmode="normal">
					<ui:updatepanelbody>
						<ui:binding onattach="window.setTimeout('MessageQueue.update();',50);" />
					</ui:updatepanelbody>
				</ui:updatepanel>
			</div>
		</ui:wizardpage>
	</body>
</html>