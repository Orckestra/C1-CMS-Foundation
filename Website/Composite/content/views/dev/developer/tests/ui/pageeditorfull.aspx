<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server" />
	<head runat="server">
		<title>Composite.Management.TESTING!</title>
		<control:scriptloader type="sub" runat="server" />
		<control:styleloader runat="server" />
	</head>
	<body>
		<!-- DONT UPDATE TAG NESTING STRUCTURE WITHOUT CONSULTING MOTH! -->
		<form method="post" action="javascript:alert('hans')" id="aspnetForm">
			<ui:editorpage image="${icon:Composite.Icons:page-edit-page}" label="FrontPage">
				<ui:updatepanel id="ctl00_UpdatePanel1" repaintmode="normal" flex="true">
					<ui:updatepanelbody>
						<ui:broadcasterset>
							<ui:broadcaster id="broadcasterCanSave" isdisabled="true" />
						</ui:broadcasterset>
						<ui:toolbar>
							<ui:toolbarbody>
								<ui:toolbargroup>
									<span style="display:none;">
										<a id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl00_UiControl1_repeater_ctl00_UiControl2_ShadowSaveLinkButton" href="javascript:__doPostBack('ctl00$/AdministrativeTemplates/Document.xml$repeater$ctl00$UiControl1$repeater$ctl00$UiControl2$ShadowSaveLinkButton','')">Save</a>
									</span>
									<ui:toolbarbutton oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE);" callbackid="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl00_UiControl1_repeater_ctl00_UiControl2_ShadowSaveLinkButton" id="savebutton" image="${icon:save}" image-disabled="${icon:save-disabled}" label="Save" observes="broadcasterCanSave" />
								</ui:toolbargroup>
							</ui:toolbarbody>
						</ui:toolbar>
						<ui:lazybindingset>
							<ui:lazybinding bindingid="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanel1" name="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_lazybindingactivated1" />
							<ui:lazybinding bindingid="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanel2" name="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_lazybindingactivated2" />
						</ui:lazybindingset>
						<ui:tabbox id="maintabbox" binding="EditorPageTabBoxBinding">
							<ui:tabs>
								<ui:tab label="Settings" tooltip="Settings" selected="true" />
								<ui:tab label="Content" tooltip="Content" />
								<ui:tab label="Preview" tooltip="Preview" id="previewtab" callbackid="ctl00$/AdministrativeTemplates/Document.xml$repeater$ctl01$UiControl8$repeater$ctl00$UiControl0$tabpanelRepeater$ctl02$UiControl15$Preview" />
							</ui:tabs>
							<ui:tabpanels>
								<ui:tabpanel id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanel0">
									<ui:scrollbox class="padded">
										<ui:fields>
											<ui:fieldgroup label="General settings">
												<ui:field>
													<ui:fielddesc>Page title</ui:fielddesc>
													<ui:fieldhelp>The entry specified in this field is shown in the browser window title bar. The field is used by search engines and sitemaps</ui:fieldhelp>
													<ui:fielddata>
														<ui:datainput name="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl00_UiControl2_repeater_ctl00_UiControl3" value="FrontPage" required="true" />
													</ui:fielddata>
												</ui:field>
												<ui:field>
													<ui:fielddesc>Description</ui:fielddesc>
													<ui:fieldhelp>Use this field for at short description of the page</ui:fieldhelp>
													<ui:fielddata>
														<ui:textbox required="false" name="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl00_UiControl2_repeater_ctl01_UiControl4" />
													</ui:fielddata>
												</ui:field>
											</ui:fieldgroup>
										</ui:fields>
										<ui:fieldgroupseparator />
										<ui:fields>
											<ui:fieldgroup label="Publication settings">
												<ui:field>
													<ui:fielddesc>Status</ui:fielddesc>
													<ui:fieldhelp>Send the page to another status</ui:fieldhelp>
													<ui:fielddata>
														<ui:selector name="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl01_UiControl5_repeater_ctl00_UiControl6">
															<ui:selection label="Draft" value="draft" selected="true" />
															<ui:selection label="Awaiting Approval" value="awaitingApproval" />
															<ui:selection label="Awaiting Publication" value="awaitingPublication" />
														</ui:selector>
													</ui:fielddata>
												</ui:field>
												<ui:field>
													<ui:fielddesc>Publish date</ui:fielddesc>
													<ui:fieldhelp>Specify at which date and time you want the page to be published. At the specified time the page will automatically be published to the site</ui:fieldhelp>
													<ui:fielddata>
														<ui:updatepanel id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl01_UiControl5_repeater_ctl01_UiControl7_WrapperUpdatePanel" repaintmode="normal">
															<ui:updatepanelbody>
																<ui:selector name="ctl00$/AdministrativeTemplates/Document.xml$repeater$ctl01$UiControl8$repeater$ctl00$UiControl0$tabpanelRepeater$ctl00$UiControl1$repeater$ctl01$UiControl5$repeater$ctl01$UiControl7$TypeSelector" callbackid="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl01_UiControl5_repeater_ctl01_UiControl7_TypeSelector"
																	onchange="this.dispatchAction(PageBinding.ACTION_DOPOSTBACK)">
																	<ui:selection selected="true" label="(no date selected)" value="none" tooltip="(no date selected)" />
																	<ui:selection label="Select date" value="select" tooltip="Select date" />
																</ui:selector>
																<ui:updatepanel id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl01_UiControl5_repeater_ctl01_UiControl7_CalendarUpdatePanel" repaintmode="normal">
																	<ui:updatepanelbody />
																</ui:updatepanel>
																<ui:updatepanel id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl01_UiControl5_repeater_ctl01_UiControl7_TimeSelectorUpdatePanel" repaintmode="normal">
																	<ui:updatepanelbody />
																</ui:updatepanel>
															</ui:updatepanelbody>
														</ui:updatepanel>
													</ui:fielddata>
												</ui:field>
												<ui:field>
													<ui:fielddesc>Unpublish date</ui:fielddesc>
													<ui:fieldhelp>Specify at which date and time you want the page to be unpublished. At the specified time the page will automatically be removed from the site</ui:fieldhelp>
													<ui:fielddata>
														<ui:updatepanel id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl01_UiControl5_repeater_ctl02_UiControl8_WrapperUpdatePanel" repaintmode="normal">
															<ui:updatepanelbody>
																<ui:selector name="ctl00$/AdministrativeTemplates/Document.xml$repeater$ctl01$UiControl8$repeater$ctl00$UiControl0$tabpanelRepeater$ctl00$UiControl1$repeater$ctl01$UiControl5$repeater$ctl02$UiControl8$TypeSelector" callbackid="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl01_UiControl5_repeater_ctl02_UiControl8_TypeSelector"
																	onchange="this.dispatchAction(PageBinding.ACTION_DOPOSTBACK)">
																	<ui:selection selected="true" label="(no date selected)" value="none" tooltip="(no date selected)" />
																	<ui:selection label="Select date" value="select" tooltip="Select date" />
																</ui:selector>
																<ui:updatepanel id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl01_UiControl5_repeater_ctl02_UiControl8_CalendarUpdatePanel" repaintmode="normal">
																	<ui:updatepanelbody />
																</ui:updatepanel>
																<ui:updatepanel id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl01_UiControl5_repeater_ctl02_UiControl8_TimeSelectorUpdatePanel" repaintmode="normal">
																	<ui:updatepanelbody />
																</ui:updatepanel>
															</ui:updatepanelbody>
														</ui:updatepanel>
													</ui:fielddata>
												</ui:field>
											</ui:fieldgroup>
										</ui:fields>
										<ui:fieldgroupseparator />
										<ui:fields>
											<ui:fieldgroup label="Advanced settings">
												<ui:field>
													<ui:fielddesc>Menu title</ui:fielddesc>
													<ui:fieldhelp>The entry specified in this field can be used in the navigation on the website</ui:fieldhelp>
													<ui:fielddata>
														<ui:datainput name="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl02_UiControl9_repeater_ctl00_UiControl10" value="FrontPage" />
													</ui:fielddata>
												</ui:field>
												<ui:field>
													<ui:fielddesc>URL title</ui:fielddesc>
													<ui:fieldhelp>The entry specified in this field is shown in the browser address bar as a part of the URL address. The field is used by search engines</ui:fieldhelp>
													<ui:fielddata>
														<ui:datainput name="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl02_UiControl9_repeater_ctl01_UiControl11" value="FrontPage" required="true" regexrule="^[-\w]*$" />
													</ui:fielddata>
												</ui:field>
												<ui:field>
													<ui:fielddesc>Friendly URL</ui:fielddesc>
													<ui:fieldhelp>The entry specified in this field is shown in the browser address bar and replaces system generated URL´s. Note that the server has to be configured to support this feature</ui:fieldhelp>
													<ui:fielddata>
														<ui:datainput name="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl02_UiControl9_repeater_ctl02_UiControl12" />
													</ui:fielddata>
												</ui:field>
												<ui:field>
													<ui:fielddesc>Language</ui:fielddesc>
													<ui:fieldhelp>Select language for the page</ui:fieldhelp>
													<ui:fielddata>
														<ui:selector name="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl00_UiControl1_repeater_ctl02_UiControl9_repeater_ctl03_UiControl13">
															<ui:selection label="Afrikaans (South Africa)" value="af-ZA" />
															<ui:selection label="Albanian (Albania)" value="sq-AL" />
															<ui:selection label="Arabic (Algeria)" value="ar-DZ" />
															<ui:selection label="Arabic (Bahrain)" value="ar-BH" />
															<ui:selection label="Arabic (Egypt)" value="ar-EG" />
															<ui:selection label="Arabic (Iraq)" value="ar-IQ" />
															<ui:selection label="Arabic (Jordan)" value="ar-JO" />
															<ui:selection label="Arabic (Kuwait)" value="ar-KW" />
															<ui:selection label="Arabic (Lebanon)" value="ar-LB" />
															<ui:selection label="Arabic (Libya)" value="ar-LY" />
															<ui:selection label="Arabic (Morocco)" value="ar-MA" />
															<ui:selection label="Arabic (Oman)" value="ar-OM" />
															<ui:selection label="Arabic (Qatar)" value="ar-QA" />
															<ui:selection label="Arabic (Saudi Arabia)" value="ar-SA" />
															<ui:selection label="Arabic (Syria)" value="ar-SY" />
															<ui:selection label="Arabic (Tunisia)" value="ar-TN" />
															<ui:selection label="Arabic (U.A.E.)" value="ar-AE" />
															<ui:selection label="Arabic (Yemen)" value="ar-YE" />
															<ui:selection label="Armenian (Armenia)" value="hy-AM" />
															<ui:selection label="Azeri (Cyrillic, Azerbaijan)" value="az-Cyrl-AZ" />
															<ui:selection label="Azeri (Latin, Azerbaijan)" value="az-Latn-AZ" />
															<ui:selection label="Basque (Basque)" value="eu-ES" />
															<ui:selection label="Belarusian (Belarus)" value="be-BY" />
															<ui:selection label="Bosnian (Cyrillic, Bosnia and Herzegovina)" value="bs-Cyrl-BA" />
															<ui:selection label="Bosnian (Latin, Bosnia and Herzegovina)" value="bs-Latn-BA" />
															<ui:selection label="Bulgarian (Bulgaria)" value="bg-BG" />
															<ui:selection label="Catalan (Catalan)" value="ca-ES" />
															<ui:selection label="Chinese (Hong Kong S.A.R.)" value="zh-HK" />
															<ui:selection label="Chinese (Macao S.A.R.)" value="zh-MO" />
															<ui:selection label="Chinese (People's Republic of China)" value="zh-CN" />
															<ui:selection label="Chinese (Singapore)" value="zh-SG" />
															<ui:selection label="Chinese (Taiwan)" value="zh-TW" />
															<ui:selection label="Croatian (Bosnia and Herzegovina)" value="hr-BA" />
															<ui:selection label="Croatian (Croatia)" value="hr-HR" />
															<ui:selection label="Czech (Czech Republic)" value="cs-CZ" />
															<ui:selection label="Danish (Denmark)" value="da-DK" />
															<ui:selection label="Divehi (Maldives)" value="dv-MV" />
															<ui:selection label="Dutch (Belgium)" value="nl-BE" />
															<ui:selection label="Dutch (Netherlands)" value="nl-NL" />
															<ui:selection label="English (Australia)" value="en-AU" />
															<ui:selection label="English (Belize)" value="en-BZ" />
															<ui:selection label="English (Canada)" value="en-CA" />
															<ui:selection label="English (Caribbean)" value="en-029" />
															<ui:selection label="English (Ireland)" value="en-IE" />
															<ui:selection label="English (Jamaica)" value="en-JM" />
															<ui:selection label="English (New Zealand)" value="en-NZ" />
															<ui:selection label="English (Republic of the Philippines)" value="en-PH" />
															<ui:selection label="English (South Africa)" value="en-ZA" />
															<ui:selection label="English (Trinidad and Tobago)" value="en-TT" />
															<ui:selection label="English (United Kingdom)" value="en-GB" />
															<ui:selection label="English (United States)" value="en-US" selected="true" />
															<ui:selection label="English (Zimbabwe)" value="en-ZW" />
															<ui:selection label="Estonian (Estonia)" value="et-EE" />
															<ui:selection label="Faroese (Faroe Islands)" value="fo-FO" />
															<ui:selection label="Filipino (Philippines)" value="fil-PH" />
															<ui:selection label="Finnish (Finland)" value="fi-FI" />
															<ui:selection label="French (Belgium)" value="fr-BE" />
															<ui:selection label="French (Canada)" value="fr-CA" />
															<ui:selection label="French (France)" value="fr-FR" />
															<ui:selection label="French (Luxembourg)" value="fr-LU" />
															<ui:selection label="French (Principality of Monaco)" value="fr-MC" />
															<ui:selection label="French (Switzerland)" value="fr-CH" />
															<ui:selection label="Frisian (Netherlands)" value="fy-NL" />
															<ui:selection label="Galician (Galician)" value="gl-ES" />
															<ui:selection label="Georgian (Georgia)" value="ka-GE" />
															<ui:selection label="German (Austria)" value="de-AT" />
															<ui:selection label="German (Germany)" value="de-DE" />
															<ui:selection label="German (Liechtenstein)" value="de-LI" />
															<ui:selection label="German (Luxembourg)" value="de-LU" />
															<ui:selection label="German (Switzerland)" value="de-CH" />
															<ui:selection label="Greek (Greece)" value="el-GR" />
															<ui:selection label="Gujarati (India)" value="gu-IN" />
															<ui:selection label="Hebrew (Israel)" value="he-IL" />
															<ui:selection label="Hindi (India)" value="hi-IN" />
															<ui:selection label="Hungarian (Hungary)" value="hu-HU" />
															<ui:selection label="Icelandic (Iceland)" value="is-IS" />
															<ui:selection label="Indonesian (Indonesia)" value="id-ID" />
															<ui:selection label="Inuktitut (Latin, Canada)" value="iu-Latn-CA" />
															<ui:selection label="Irish (Ireland)" value="ga-IE" />
															<ui:selection label="Italian (Italy)" value="it-IT" />
															<ui:selection label="Italian (Switzerland)" value="it-CH" />
															<ui:selection label="Japanese (Japan)" value="ja-JP" />
															<ui:selection label="Kannada (India)" value="kn-IN" />
															<ui:selection label="Kazakh (Kazakhstan)" value="kk-KZ" />
															<ui:selection label="Kiswahili (Kenya)" value="sw-KE" />
															<ui:selection label="Konkani (India)" value="kok-IN" />
															<ui:selection label="Korean (Korea)" value="ko-KR" />
															<ui:selection label="Kyrgyz (Kyrgyzstan)" value="ky-KG" />
															<ui:selection label="Latvian (Latvia)" value="lv-LV" />
															<ui:selection label="Lithuanian (Lithuania)" value="lt-LT" />
															<ui:selection label="Luxembourgish (Luxembourg)" value="lb-LU" />
															<ui:selection label="Macedonian (Former Yugoslav Republic of Macedonia)" value="mk-MK" />
															<ui:selection label="Malay (Brunei Darussalam)" value="ms-BN" />
															<ui:selection label="Malay (Malaysia)" value="ms-MY" />
															<ui:selection label="Maltese" value="mt-MT" />
															<ui:selection label="Maori" value="mi-NZ" />
															<ui:selection label="Mapudungun (Chile)" value="arn-CL" />
															<ui:selection label="Marathi (India)" value="mr-IN" />
															<ui:selection label="Mohawk (Mohawk)" value="moh-CA" />
															<ui:selection label="Mongolian (Cyrillic, Mongolia)" value="mn-MN" />
															<ui:selection label="Norwegian, Bokmål (Norway)" value="nb-NO" />
															<ui:selection label="Norwegian, Nynorsk (Norway)" value="nn-NO" />
															<ui:selection label="Persian (Iran)" value="fa-IR" />
															<ui:selection label="Polish (Poland)" value="pl-PL" />
															<ui:selection label="Portuguese (Brazil)" value="pt-BR" />
															<ui:selection label="Portuguese (Portugal)" value="pt-PT" />
															<ui:selection label="Punjabi (India)" value="pa-IN" />
															<ui:selection label="Quechua (Bolivia)" value="quz-BO" />
															<ui:selection label="Quechua (Ecuador)" value="quz-EC" />
															<ui:selection label="Quechua (Peru)" value="quz-PE" />
															<ui:selection label="Romanian (Romania)" value="ro-RO" />
															<ui:selection label="Romansh (Switzerland)" value="rm-CH" />
															<ui:selection label="Russian (Russia)" value="ru-RU" />
															<ui:selection label="Sami, Inari (Finland)" value="smn-FI" />
															<ui:selection label="Sami, Lule (Norway)" value="smj-NO" />
															<ui:selection label="Sami, Lule (Sweden)" value="smj-SE" />
															<ui:selection label="Sami, Northern (Finland)" value="se-FI" />
															<ui:selection label="Sami, Northern (Norway)" value="se-NO" />
															<ui:selection label="Sami, Northern (Sweden)" value="se-SE" />
															<ui:selection label="Sami, Skolt (Finland)" value="sms-FI" />
															<ui:selection label="Sami, Southern (Norway)" value="sma-NO" />
															<ui:selection label="Sami, Southern (Sweden)" value="sma-SE" />
															<ui:selection label="Sanskrit (India)" value="sa-IN" />
															<ui:selection label="Serbian (Cyrillic, Bosnia and Herzegovina)" value="sr-Cyrl-BA" />
															<ui:selection label="Serbian (Cyrillic, Serbia)" value="sr-Cyrl-CS" />
															<ui:selection label="Serbian (Latin, Bosnia and Herzegovina)" value="sr-Latn-BA" />
															<ui:selection label="Serbian (Latin, Serbia)" value="sr-Latn-CS" />
															<ui:selection label="Sesotho sa Leboa (South Africa)" value="ns-ZA" />
															<ui:selection label="Setswana (South Africa)" value="tn-ZA" />
															<ui:selection label="Slovak (Slovakia)" value="sk-SK" />
															<ui:selection label="Slovenian (Slovenia)" value="sl-SI" />
															<ui:selection label="Spanish (Argentina)" value="es-AR" />
															<ui:selection label="Spanish (Bolivia)" value="es-BO" />
															<ui:selection label="Spanish (Chile)" value="es-CL" />
															<ui:selection label="Spanish (Colombia)" value="es-CO" />
															<ui:selection label="Spanish (Costa Rica)" value="es-CR" />
															<ui:selection label="Spanish (Dominican Republic)" value="es-DO" />
															<ui:selection label="Spanish (Ecuador)" value="es-EC" />
															<ui:selection label="Spanish (El Salvador)" value="es-SV" />
															<ui:selection label="Spanish (Guatemala)" value="es-GT" />
															<ui:selection label="Spanish (Honduras)" value="es-HN" />
															<ui:selection label="Spanish (Mexico)" value="es-MX" />
															<ui:selection label="Spanish (Nicaragua)" value="es-NI" />
															<ui:selection label="Spanish (Panama)" value="es-PA" />
															<ui:selection label="Spanish (Paraguay)" value="es-PY" />
															<ui:selection label="Spanish (Peru)" value="es-PE" />
															<ui:selection label="Spanish (Puerto Rico)" value="es-PR" />
															<ui:selection label="Spanish (Spain)" value="es-ES" />
															<ui:selection label="Spanish (Uruguay)" value="es-UY" />
															<ui:selection label="Spanish (Venezuela)" value="es-VE" />
															<ui:selection label="Swedish (Finland)" value="sv-FI" />
															<ui:selection label="Swedish (Sweden)" value="sv-SE" />
															<ui:selection label="Syriac (Syria)" value="syr-SY" />
															<ui:selection label="Tamil (India)" value="ta-IN" />
															<ui:selection label="Tatar (Russia)" value="tt-RU" />
															<ui:selection label="Telugu (India)" value="te-IN" />
															<ui:selection label="Thai (Thailand)" value="th-TH" />
															<ui:selection label="Turkish (Turkey)" value="tr-TR" />
															<ui:selection label="Ukrainian (Ukraine)" value="uk-UA" />
															<ui:selection label="Urdu (Islamic Republic of Pakistan)" value="ur-PK" />
															<ui:selection label="Uzbek (Cyrillic, Uzbekistan)" value="uz-Cyrl-UZ" />
															<ui:selection label="Uzbek (Latin, Uzbekistan)" value="uz-Latn-UZ" />
															<ui:selection label="Vietnamese (Vietnam)" value="vi-VN" />
															<ui:selection label="Welsh" value="cy-GB" />
															<ui:selection label="Xhosa" value="xh-ZA" />
															<ui:selection label="Zulu" value="zu-ZA" />
														</ui:selector>
													</ui:fielddata>
												</ui:field>
											</ui:fieldgroup>
										</ui:fields>
									</ui:scrollbox>
								</ui:tabpanel>
								<ui:tabpanel id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanel1">
									<ui:wysiwygeditor type="pageeditor">
										<ui:selector name="ctl00$/AdministrativeTemplates/Document.xml$repeater$ctl01$UiControl8$repeater$ctl00$UiControl0$tabpanelRepeater$ctl01$UiControl14$TemplateSelector" callbackid="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl01_UiControl14_TemplateSelector">
											<ui:selection selected="true" label="StandardTemplate" value="967f7fd3-13c1-4952-af48-14cec814c824" tooltip="StandardTemplate" />
										</ui:selector>
										<ui:updatepanel id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl01_UiControl14_ContentsUpdatePanel" repaintmode="normal">
											<ui:updatepanelbody>
												<textarea name="ctl00$/AdministrativeTemplates/Document.xml$repeater$ctl01$UiControl8$repeater$ctl00$UiControl0$tabpanelRepeater$ctl01$UiControl14$contentplaceholder" rows="2" cols="20" id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl01_UiControl14_contentplaceholder" placeholderid="contentplaceholder" placeholdername="Content" selected="true">
													<p>
														Lortepage.
														<br />
													</p>
												</textarea>
											</ui:updatepanelbody>
										</ui:updatepanel>
									</ui:wysiwygeditor>
								</ui:tabpanel>
								<ui:tabpanel id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanel2">
									<ui:window id="previewwindow" />
									<a id="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_tabpanelRepeater_ctl02_UiControl15_Preview" href="javascript:__doPostBack('ctl00$/AdministrativeTemplates/Document.xml$repeater$ctl01$UiControl8$repeater$ctl00$UiControl0$tabpanelRepeater$ctl02$UiControl15$Preview','')" style="display:none;">Preview</a>
								</ui:tabpanel>
							</ui:tabpanels>
						</ui:tabbox>
					</ui:updatepanelbody>
				</ui:updatepanel>
				<div style="display: none;">
					<ui:updatepanel id="ctl00_UpdatePanel2" repaintmode="normal">
						<ui:updatepanelbody />
					</ui:updatepanel>
				</div>
			</ui:editorpage>
			<div>
				<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWCQLb8a3+DwLfnt6QDwLy0v+zBgKktJTNDQLPgYf1DQKZ5+yLBgLohMFGAreE1MMNAre/jqQBFKN41H2wwOWSugRP397crKlss5I=" />
			</div>
		</form>
	</body>
</html>