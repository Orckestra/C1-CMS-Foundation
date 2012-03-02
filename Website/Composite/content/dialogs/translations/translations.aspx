<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialog.Translations</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="TranslationsDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage binding="TranslationsDialogPageBinding" resizable="false" class="standard question">
			<ui:decks id="decks">
				<ui:deck id="fieldsdeck">
					<ui:fields>
						<ui:fieldgroup label="Translation settings">
							<ui:field>
								<ui:fielddesc label="Translations mode"/>
								<ui:fielddata>
									<ui:checkboxgroup>
										<ui:checkbox label="Enable translations" relate="translationsenabled" ischecked="true"/>
									</ui:checkboxgroup>
								</ui:fielddata>
							</ui:field>
							<ui:field relation="translationsenabled">
								<ui:fielddesc label="Source language"/>
								<ui:fieldhelp label="Explaining the concept of source language."/>
								<ui:fielddata>
									<ui:selector name="sourcelanguage"/>
								</ui:fielddata>
							</ui:field>
							<ui:field relation="translationsenabled">
								<ui:fielddesc label="Target language"/>
								<ui:fieldhelp label="Explaining the concept of target language."/>
								<ui:fielddata>
									<ui:selector name="targetlanguage"/>
								</ui:fielddata>
							</ui:field>
						</ui:fieldgroup>
					</ui:fields>
				</ui:deck>
				<ui:deck id="warningdeck">
					<ui:flexbox>
	                     <table id="dialoglayout">
	                         <tr>
	                             <td id="dialogvignette">
	                                <ui:dialogvignette/>
	                            </td>
	                             <td id="dialogtext">
	                                <ui:text label="Are your sure you wish to change the target language? The application will restart and all your unsaved changes will be lost."/>
	                            </td>
	                        </tr>
	                    </table>
	                </ui:flexbox>
				</ui:deck>
			</ui:decks>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true" class="right">
					<ui:toolbargroup>
						<ui:clickbutton label="OK" id="buttonAccept" response="accept" focusable="true" default="true"/>
						<ui:clickbutton label="Cancel" response="cancel" focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>