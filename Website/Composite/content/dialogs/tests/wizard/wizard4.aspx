<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Wizard4</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
	</head>
	<body>
		<ui:wizardpage id="formcontrolpage" label="Infobox scrollbox!" resizable="true">
			<ui:pagebody>
				<ui:scrollbox class="infobox">
					<h3>This is the heading</h3>
					<p>This is the info.</p>
				</ui:scrollbox>
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
		</ui:wizardpage>
	</body>
</html>