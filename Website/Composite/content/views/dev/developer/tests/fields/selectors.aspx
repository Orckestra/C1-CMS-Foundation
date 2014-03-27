<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Test.Selectors</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript">function __doPostBack () {}</script>
	</head>
	<body>
		<form action="javascript://" method="get"><!-- simulate dot net -->
			
			<ui:editorpage label="Fields">
				<ui:broadcasterset>
					<ui:broadcaster id="broadcasterCanSave" isdisabled="true" />
				</ui:broadcasterset>
				<ui:toolbar>
					<ui:toolbarbody>
						<ui:toolbargroup>
							<ui:toolbarbutton oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE)" id="savebutton" image="${icon:save}" image-disabled="${icon:save-disabled}" label="Save" observes="broadcasterCanSave" />
						</ui:toolbargroup>
					</ui:toolbarbody>
				</ui:toolbar>

				<ui:scrollbox class="padded">

					<ui:fields>
						
						<ui:fieldgroup label="Extreme selection count">
							<ui:field>
								<ui:fielddesc>Selector</ui:fielddesc>
								<ui:fielddata>
									<ui:selector name="selector1" type="integer">
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
										<ui:selection label="Selection" value="X" />
									</ui:selector>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>SimpleSelector</ui:fielddesc>
								<ui:fielddata>
									<ui:simpleselector required="true">
										<select>
											<option>Choose...</option>
											<option value="X">Lorem</option>
											<option value="X">Selection 2</option>
											<option value="X">Selection 3</option>
											<option value="X">Selection 4</option>
											<option value="X">Selection 5</option>
											<option value="X">Selection 6</option>
											<option value="X">Selection 7</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
										</select>
									</ui:simpleselector>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>SimpleSelector</ui:fielddesc>
								<ui:fieldhelp>This is the field help!</ui:fieldhelp>
								<ui:fielddata>
									<ui:simpleselector required="true">
										<select>
											<option>Choose...</option>
											<option value="X">Lorem ipsum lirum larum skibet gaar til aabenraa</option>
											<option value="X">Selection 2</option>
											<option value="X">Selection 3</option>
											<option value="X">Selection 4</option>
											<option value="X">Selection 5</option>
										</select>
									</ui:simpleselector>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>SimpleSelector</ui:fielddesc>
								<ui:fielddata>
									<ui:simpleselector required="true">
										<select>
											<option>Choose...</option>
											<option value="X">Lorem ipsum lirum larum skibet gaar til aabenraa</option>
											<option value="X">Selection 2</option>
											<option value="X">Selection 3</option>
											<option value="X">Selection 4</option>
											<option value="X">Selection 5</option>
											<option value="X">Selection 6</option>
											<option value="X">Selection 7</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
											<option value="X">Selection</option>
										</select>
									</ui:simpleselector>
								</ui:fielddata>
							</ui:field>
							
							<ui:field>
								<ui:fielddesc>Layout reference...</ui:fielddesc>
								<ui:fielddata>
									<ui:selector name="selectorRequired" required="true" label="Choose now...">
										<ui:selection label="Hej" value="thevalue"/>
									</ui:selector>
								</ui:fielddata>
							</ui:field>
						</ui:fieldgroup>
						
						<ui:fieldgroup label="Required selectors">
							<ui:field>
								<ui:fielddesc>Required selector</ui:fielddesc>
								<ui:fielddata>
									<ui:selector name="selectorRequired" required="true" label="Choose now...">
										<ui:selection label="Hej" value="thevalue"/>
									</ui:selector>
								</ui:fielddata>
							</ui:field>
						</ui:fieldgroup>

						<ui:fieldgroup label="Multiselectors">
							<ui:field>
								<ui:fielddesc>multiselector</ui:fielddesc>
								<ui:fielddata>
									<ui:multiselector name="multiselector1">
										<ui:selection label="Sporvognsaktieselskabskinneskidtsraberpersonalebeklningsmagasinforvalter" value="2" />
										<ui:selection label="Gr" value="3" selected="true" />
										<ui:selection label="Sort" value="4" />
										<ui:selection label="Pink" value="5" />
										<ui:selection label="Grlilla" value="6" selected="true" />
										<ui:selection label="Smaddersort" value="7" />
										<ui:selection label="Gaypink" value="8" selected="true" />
									</ui:multiselector>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>multiselector + help</ui:fielddesc>
								<ui:fieldhelp>This is the help.</ui:fieldhelp>
								<ui:fielddata>
									<ui:multiselector name="multiselector2">
										<ui:selection label="Sporvognsaktieselskabskinneskidtsraberpersonalebeklningsmagasinforvalter" value="2" />
										<ui:selection label="Kontakt presse" value="2973a746-15ef-46cc-9219-c15f626837e9" />
										<ui:selection label="Kontakt analyse" value="afa09d69-b4f5-4d95-ae9a-e74cd92f445e" />
										<ui:selection label="Kontakt JobASE" value="cc658e90-debf-433c-b30b-4076ce0a6c37" />
										<ui:selection label="Kontakt Topdanmark" value="ebf87b5c-0e4c-4ea4-a0b6-4915a1bebe33" />
										<ui:selection label="Kontakt IT" value="d38cff0d-c418-4b5b-a08f-b0a4ecc48283" />
										<ui:selection label="Bestil ASE+ materiale" value="3a3042a8-17f1-4cd6-922d-58789e837d5c" />
										<ui:selection label="Bestil materiale" value="0c7c1a34-f5e0-4a66-8fd4-a618627b5654" />
										<ui:selection label="Selvsyn" value="933b9e3c-37cb-4163-805c-ed69c2a84889" />
										<ui:selection label="L Selvsyn" value="38c11555-91ea-4897-ac89-987aa3bcfdad" />
										<ui:selection label="Nyt til medlemmer" value="85213064-e4be-4230-a57a-8ed36c9774c9" />
										<ui:selection label="Nyt fra ASE" value="398dd8d0-c262-40e3-a6ea-60f3594b5ef2" />
										<ui:selection label="Pressemeddelelser" value="9af1e352-1025-49ca-8047-43c55790b01f" />
										<ui:selection label="Analyser" value="c4a766a2-72ee-43a1-9617-28f1eb0a9a60" />
										<ui:selection label="Hent brochurer" value="4c8ae413-a0dd-42ce-8166-e1473e3d296d" />
										<ui:selection label="Hent blanketter" value="2e76715a-9507-405a-86b8-b34dd032e517" />
										<ui:selection label="Opbygning" value="3aa679f9-2bd4-495f-9675-b18b64b5038c" />
										<ui:selection label="Organisation" value="3990dd19-e5c8-42fb-b69e-4f85530ffef3" />
										<ui:selection label="Bestyrelse" value="28c66a82-d4b5-4133-a86c-d90f1599b7a9" />
										<ui:selection label="Vedtter" value="582c3d67-0579-441b-9ecd-413209cd1e53" />
										<ui:selection label="Kort om ASE " value="3afd29d8-3001-47a1-a3c9-4d0279b1c9ca" />
										<ui:selection label="ASEs bestyrelsesformand" value="35815b89-7320-4951-8e90-b1b21885b647" />
										<ui:selection label="ASEs direkt " value="1a9980c7-4353-4267-8a29-642151abcb0a" />
										<ui:selection label="S job i ASE" value="e2c1c610-065e-4982-b20b-cebda6815eeb" />
										<ui:selection label="Anstelsesforhold" value="87cee400-4605-4f8e-8618-c665c12a1f4d" />
										<ui:selection label="ASEs afdelinger" value="911c926a-7623-4466-ae8e-e81619082250" />
										<ui:selection label="Kontakt HR" value="32f15221-5dd4-431a-9c75-a0866a03e49e" />
										<ui:selection label="Mere om afdelingerne" value="a82f9220-ec52-41f0-826b-22f9153bdbb7" />
										<ui:selection label="M en medarbejder" value="cb6f6c9d-fdc0-41ef-a17f-8147644c4dd9" />
										<ui:selection label="Spg Hanne" value="f750f09e-2fe7-4a35-a7d3-88c1bf2e99d5" />
										<ui:selection label="Job i ASE" value="19b6d95a-c173-443e-a5bb-a08b974da1db" />
										<ui:selection label="Medarbejdere i HR" value="5e92803f-2c29-4342-af21-5139cac436e6" />
										<ui:selection label="Udbetalingsdatoer" value="3ee9308c-1f51-4b62-894f-4edfa3803e28" />
										<ui:selection label="Jobnet" value="5de96ca5-63ba-4752-835a-9250598c566b" />
										<ui:selection label="SVU-stte" value="888bec70-a46a-48a6-9eec-9f83983c7070" />
										<ui:selection label="VEU-godtgelse" value="6dc47b4a-e555-490c-bc81-7bca7d02f35b" />
										<ui:selection label="Husk SKAT" value="7464ffe2-b5f9-4f0f-879c-8c326943ec92" />
										<ui:selection label="Satser" value="0ef24711-6431-4943-922a-282fa01841d0" />
										<ui:selection label="Mere om dagpenge" value="65d90f26-e814-4959-9ef2-38913bea909f" />
										<ui:selection label="Mere om efterl" value="3e584ea1-0317-4aa0-b69c-4f782470399c" />
										<ui:selection label="Mere om prie" value="15db4e7d-b9f6-452c-9d99-a97bf712048e" />
										<ui:selection label="Fortrydelsesordning" value="e202e827-cebf-431d-b551-2c878f0c753c" />
										<ui:selection label="Mit ASE" value="4179868d-3542-4f44-b60f-27f4f4ac082d" />
										<ui:selection label="Support" value="e5346f0d-8129-477f-acfd-b3024072b222" />
										<ui:selection label="Tjekliste ledig" value="710cf24f-8638-4b9b-8355-5c05d7657351" />
										<ui:selection label="Tjekliste righed" value="b4927d92-6eeb-4983-9d1c-f5b822390b23" />
										<ui:selection label="Tjekliste efterl" value="4c745004-4ad7-40eb-bdd3-33e396ff0965" />
										<ui:selection label="Tjekliste efterlsbevis" value="adf2edca-a827-41e9-952c-c5896fa12911" />
										<ui:selection label="Ekstra fordele" value="5bcf5a6c-69af-451b-8f25-b0f343400adb" />
										<ui:selection label="Alt om ASE+" value="cecc4609-b817-452b-ad4d-553515e796c1" />
										<ui:selection label="Beregn" value="9457d08d-eb27-4a81-b816-155f3fed8198" />
										<ui:selection label="Mere om ASE+" value="9f9571be-73c3-4e6f-913f-0930628df700" />
										<ui:selection label="Sammenlign priser " value="f3ccfa8e-1ec9-4aa1-a280-9efd235ca919" />
										<ui:selection label="Se filmene" value="bf3e7cdd-5691-4222-995c-b2f104e9be1a" />
										<ui:selection label="Hent ringetone" value="2058aa5a-76b0-47e4-8a58-944a774fc722" />
										<ui:selection label="Medlemsfordele" value="65a19379-e504-458b-925c-b3631641e994" />
										<ui:selection label="Dine genveje" value="8470d50d-0fb6-4019-93e4-e382937db110" />
										<ui:selection label="Meld dig ind i nu!" value="680a7de5-5c5b-43b9-abb1-2a670ddeaf85" />
										<ui:selection label="Din jobportal" value="407676e0-15ae-43e6-8439-522c68efd547" />
										<ui:selection label="Vind lre prier " value="a2c06a7b-6418-4b06-b127-a567874aaee5" />
										<ui:selection label="Tilmeld dig OASEN" value="27eedaa4-a643-4d05-9623-6ce4b32d9bbd" />
										<ui:selection label="Skaf et medlem " value="c00ba432-106d-44b3-9902-8c517d89ca29" />
										<ui:selection label="Tilmeld dig BS " value="94938c77-d744-4ff9-86f9-37a46e43d980" />
										<ui:selection label="Lukkedage i 2008" value="fc7942dd-00c6-4ffe-ad44-371b45cbee8f" />
										<ui:selection label="Ser du job?" value="9b25681f-e072-4968-b715-a6b26163c710" />
										<ui:selection label="Hent vedtter" value="32bf45a0-afe2-42b7-8b52-4ef7a9f08d88" />
										<ui:selection label="Kontakt billedarkiv" value="6e0c9ba6-d067-4185-897c-844013c7b36a" />
										<ui:selection label="Ros og ris redaktionen" value="c60206a9-c65a-4753-8110-1e020ee40dad" />
										<ui:selection label="Annonc i Selvsyn" value="aa41b0e9-3d30-48a4-9c96-c0951646e6b1" />
										<ui:selection label="Img test" value="da9155d7-5841-4943-b043-34d0ff9bde28" />
										<ui:selection label="Test af billede i MWR" value="cb634f26-1923-467f-9e90-2dd03ad13220" />
										<ui:selection label="Test Ib" value="09934033-2c11-4600-b7fd-9b624d893711" />
										<ui:selection label="Seneste Selvsyn" value="44ca2b79-4686-4a5e-b0e5-1558af9a8ba6" />
										<ui:selection label="Rotation" value="13440a1c-b9e5-4591-a259-b19456880138" />
										<ui:selection label="Bliv Medlem" value="4be716d2-46cd-4748-ae5c-06cc5fdef88f" />
										<ui:selection label="Vd at vide DK" value="f0030ecd-34e2-434b-8f72-0b786fd83c2c" />
										<ui:selection label="Ring til os" value="8d306203-4197-4bf6-a8d0-daa820244d0a" />
										<ui:selection label="ningstider" value="8bef4294-af35-4ce2-ab2e-3d57dd99f2c0" />
										<ui:selection label="Send os en fax" value="23828455-c181-41f7-84bb-951a0b986ec1" />
										<ui:selection label="ASE Midtjylland" value="d8dd8bf9-0a55-4f78-b8e4-c40279973fb2" />
										<ui:selection label="Hovedstaden" value="3b19102a-bf85-4f5f-911c-af023878e6a4" />
										<ui:selection label="ASE Sydjylland" value="d45238b1-8bcd-4ef4-91f7-2f0f8adf3907" />
										<ui:selection label="ASE Fyn" value="41fe8988-a51d-4857-b4f8-704344ced993" />
										<ui:selection label="ASE Sjland" value="af77b028-ecc6-4a8c-9f98-9db560dad2ea" />
										<ui:selection label="ASE Nordjylland" value="2eca86d1-14e7-46a1-9e09-b276c4e813a1" />
										<ui:selection label="ASE Danmark" value="12d0104e-9fae-43b9-a5e5-586299a17a72" />
										<ui:selection label="ASE Hovedstaden" value="ed305707-9b57-4e85-9d50-fd2dad665ef2" />
										<ui:selection label="SMS service" value="3dc07880-7591-4808-a229-2efbdccfb352" />
										<ui:selection label="Medlem skaffer medlem" value="fae3083d-f1e1-4abf-a8d4-7e3851235e8a" />
										<ui:selection label="Test Img_rotator" value="049ceb4d-9324-4a93-89de-af401fac5e07" />
									</ui:multiselector>
								</ui:fielddata>
							</ui:field>
						</ui:fieldgroup>

						<ui:fieldgroup label="Selectors">
							<ui:field>
								<ui:fielddesc>Selector with loads of text</ui:fielddesc>
								<ui:fielddata>
									<ui:selector name="selector1" type="integer">
										<ui:selection label="Sporvognsaktieselskabskinneskidtsraberpersonalebeklningsmagasinforvalter" value="2" />
										<ui:selection label="Gr" value="3" />
										<ui:selection label="Sort" value="4" />
										<ui:selection label="Pink" value="5" />
									</ui:selector>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>selector with lots of selections</ui:fielddesc>
								<ui:fielddata>
									<ui:selector name="selector2" type="integer">
										<ui:selection label="A" value="A2" />
										<ui:selection label="B" value="A3" />
										<ui:selection label="C" value="A4" />
										<ui:selection label="D" value="A5" />
										<ui:selection label="E" value="A6" />
										<ui:selection label="F" value="A7" />
										<ui:selection label="G" value="A8" />
										<ui:selection label="H" value="A9" />
										<ui:selection label="I" value="A10" />
										<ui:selection label="J" value="A11" />
										<ui:selection label="K" value="A12" />
										<ui:selection label="L" value="A13" />
										<ui:selection label="M" value="A14" />
										<ui:selection label="N" value="A15" />
										<ui:selection label="O" value="A16" />
										<ui:selection label="P" value="A17" />
										<ui:selection label="Q" value="A18" />
										<ui:selection label="R" value="A19" />
										<ui:selection label="S" value="A20" />
										<ui:selection label="T" value="A21" />
									</ui:selector>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>selector + help</ui:fielddesc>
								<ui:fieldhelp>Help!</ui:fieldhelp>
								<ui:fielddata>
									<ui:selector name="selector3" label="(vg farve)" type="integer">
										<ui:selection label="Sporvognsaktieselskabskinneskidtsraberpersonalebeklningsmagasinforvalter" value="1" />
										<ui:selection label="Bl" value="2" />
										<ui:selection label="Gr" value="3" />
										<ui:selection label="Sort" value="4" selected="true" />
										<ui:selection label="Pink" value="5" />
									</ui:selector>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>selector with class</ui:fielddesc>
								<ui:fielddata>
									<ui:selector name="selector3" label="(vg farve)" type="integer">
										<ui:selection image="${icon:delete}" label="Icon" value="1" />
										<ui:selection image="${class:fonticon fonticon-asterisk}" label="ClassName asterisk" value="2" />
										<ui:selection image="${class:fonticon fonticon-cloud}" label="ClassName cloud" value="3" />
										<ui:selection image="${class:fonticon fonticon-envelope}" label="ClassName envelope" value="4" />
										<ui:selection image="${class:fonticon fonticon-pencil}" label="ClassName pencil" value="5" />
									</ui:selector>
								</ui:fielddata>
							</ui:field>

							<%--<ui:field>
								<ui:fielddesc>datainputselector</ui:fielddesc>
								<ui:fielddata>
									<ui:datainputselector name="datainputselector1" value="1" type="integer">
										<ui:selection value="2" />
										<ui:selection value="3" />
										<ui:selection value="4" />
										<ui:selection value="5" />
									</ui:datainputselector>
								</ui:fielddata>
							</ui:field>
							<ui:field>
								<ui:fielddesc>datainputselector + help</ui:fielddesc>
								<ui:fieldhelp>Help!</ui:fieldhelp>
								<ui:fielddata>
									<ui:datainputselector name="datainputselector2" value="1" type="integer">
										<ui:selection value="2" />
										<ui:selection value="3" />
										<ui:selection value="4" />
										<ui:selection value="5" />
									</ui:datainputselector>
								</ui:fielddata>
							</ui:field>--%>
						</ui:fieldgroup>

					</ui:fields>

				</ui:scrollbox>

			</ui:editorpage>
		</form>
	</body>
</html>