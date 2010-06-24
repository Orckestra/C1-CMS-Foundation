<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders ID="Httpheaders1" runat="server" />
	<head>
		<title>Composite.Management.FunctionEditor</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript">
			DataManager.isPostBackFun = true;
		</script>
	</head>
	<body>
		<form id="Form1" runat="server">
			<ui:page id="functioneditorpage">
			
				<!-- hidden savebutton because ASP.NET can't save without it -->
				<ui:clickbutton id="savebutton" callbackid="savebutton" hidden="true"/>
				
				<!-- status updates ????? -->
				<ui:status id="status" checksum="RANDOM()" status="success"/>
			
				<ui:toolbar id="toolbar">
					<ui:toolbarbody>
						<ui:toolbarbutton label="Add New" image="${icon:functioncall}" />
						<ui:toolbarbutton label="Delete" image="${icon:delete}" image-disabled="${icon:delete-disabled()}" />
					</ui:toolbarbody>
				</ui:toolbar>
				<ui:splitbox orient="horizontal" layout="4:5">
					<ui:splitpanel id="treepanel">
						<ui:tree id="tree">
							<ui:treebody>
								<ui:treenode label="Fisse" />
							</ui:treebody>
						</ui:tree>
					</ui:splitpanel>
					<ui:splitter />
					<ui:splitpanel id="fieldspanel">
						<ui:scrollbox class="padded">
							<ui:fields>
								<ui:fieldgroup label="Parameter naming and help">
									<ui:field>
										<ui:fielddesc>Parameter name</ui:fielddesc>
										<ui:fieldhelp>The name of the parameter. The name is used by the system to identify this parameter. Names must be unique and may not contain spaces and other special characters. Use names like 'Title', 'StartDate', 'LargeImage' etc.</ui:fieldhelp>
										<ui:fielddata>
											<ui:datainput value="NewField" name="FlowUI$Document$DocumentBody$TabPanels$ParameterDesigner11$NameField" type="programmingidentifier"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc>Label</ui:fielddesc>
										<ui:fieldhelp>The text that users should see when specifying a value for this parameter. This is the 'human name' for the parameter.</ui:fieldhelp>
										<ui:fielddata>
											<ui:datainput value="" name="FlowUI$Document$DocumentBody$TabPanels$ParameterDesigner11$LabelField"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc>Help</ui:fielddesc>
										<ui:fieldhelp>Write a short text that tells the user what to do with the parameter.</ui:fieldhelp>
										<ui:fielddata>
											<ui:datainput value="" name="FlowUI$Document$DocumentBody$TabPanels$ParameterDesigner11$HelpField"/>
										</ui:fielddata>
									</ui:field>
								</ui:fieldgroup>
								<ui:fieldgroup label="Parameter type and values">
									<ui:field>
										<ui:fielddesc>Parameter type</ui:fielddesc>
										<ui:fieldhelp>The type of this parameter.</ui:fieldhelp>
										<ui:fielddata>
											<ui:selector name="FlowUI$Document$DocumentBody$TabPanels$ParameterDesigner11$TypeSelector" callbackid="FlowUI_Document_DocumentBody_TabPanels_ParameterDesigner11_TypeSelector" onchange="this.dispatchAction(PageBinding.ACTION_DOPOSTBACK)">
												<ui:selection label="Boolean" value="-248472580" tooltip="Boolean" />
												<ui:selection label="CultureInfo" value="892232283" tooltip="CultureInfo" />
												<ui:selection label="DataReference&lt;C1 Image File>" value="161147996" tooltip="DataReference&lt;C1 Image File>" />
												<ui:selection label="DataReference&lt;C1 Media File>" value="727607876" tooltip="DataReference&lt;C1 Media File>" />
												<ui:selection label="DataReference&lt;C1 Media Folder>" value="-1843137958" tooltip="DataReference&lt;C1 Media Folder>" />
												<ui:selection label="DataReference&lt;C1 Page>" value="84762267" tooltip="DataReference&lt;C1 Page>" />
												<ui:selection label="DataReference&lt;IAggregationDescription>" value="1094164598" tooltip="DataReference&lt;IAggregationDescription>" />
												<ui:selection label="DataReference&lt;ICompositionDescription>" value="-2104092004" tooltip="DataReference&lt;ICompositionDescription>" />
												<ui:selection label="DateTime" value="-902198056" tooltip="DateTime" />
												<ui:selection label="Decimal" value="-1692468461" tooltip="Decimal" />
												<ui:selection label="Expression&lt;Func&lt;C1 Image File,Boolean>>" value="2137102754" tooltip="Expression&lt;Func&lt;C1 Image File,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;C1 Media File,Boolean>>" value="-790473964" tooltip="Expression&lt;Func&lt;C1 Media File,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;Boolean,Boolean>>" value="-991038365" tooltip="Expression&lt;Func&lt;Boolean,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;DateTime,Boolean>>" value="-867007672" tooltip="Expression&lt;Func&lt;DateTime,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;Decimal,Boolean>>" value="1170381709" tooltip="Expression&lt;Func&lt;Decimal,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;Guid,Boolean>>" value="413491484" tooltip="Expression&lt;Func&lt;Guid,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;Int32,Boolean>>" value="-850971460" tooltip="Expression&lt;Func&lt;Int32,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;Nullable&lt;Boolean>,Boolean>>" value="829485412" tooltip="Expression&lt;Func&lt;Nullable&lt;Boolean>,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;Nullable&lt;DateTime>,Boolean>>" value="-950885811" tooltip="Expression&lt;Func&lt;Nullable&lt;DateTime>,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;Nullable&lt;Decimal>,Boolean>>" value="-675919243" tooltip="Expression&lt;Func&lt;Nullable&lt;Decimal>,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;Nullable&lt;Guid>,Boolean>>" value="355244672" tooltip="Expression&lt;Func&lt;Nullable&lt;Guid>,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;Nullable&lt;Int32>,Boolean>>" value="-44100536" tooltip="Expression&lt;Func&lt;Nullable&lt;Int32>,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;String,Boolean>>" value="1634936133" tooltip="Expression&lt;Func&lt;String,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;C1 Media Folder,Boolean>>" value="1754441164" tooltip="Expression&lt;Func&lt;C1 Media Folder,Boolean>>" />
												<ui:selection label="Expression&lt;Func&lt;C1 Page,Boolean>>" value="-2037740879" tooltip="Expression&lt;Func&lt;C1 Page,Boolean>>" />
												<ui:selection label="Guid" value="-1447194954" tooltip="Guid" />
												<ui:selection label="IEnumerable&lt;CultureInfo>" value="-638142556" tooltip="IEnumerable&lt;CultureInfo>" />
												<ui:selection label="IEnumerable&lt;String>" value="-1367539502" tooltip="IEnumerable&lt;String>" />
												<ui:selection label="IEnumerable&lt;XElement>" value="-274167916" tooltip="IEnumerable&lt;XElement>" />
												<ui:selection label="Int32" value="-1689782088" tooltip="Int32" />
												<ui:selection label="IXsltExtensionDefinition" value="-1801612126" tooltip="IXsltExtensionDefinition" />
												<ui:selection label="NullableDataReference&lt;C1 Image File>" value="915041099" tooltip="NullableDataReference&lt;C1 Image File>" />
												<ui:selection label="NullableDataReference&lt;C1 Media File>" value="885535896" tooltip="NullableDataReference&lt;C1 Media File>" />
												<ui:selection label="NullableDataReference&lt;C1 Media Folder>" value="-253009304" tooltip="NullableDataReference&lt;C1 Media Folder>" />
												<ui:selection label="NullableDataReference&lt;C1 Page>" value="-607210323" tooltip="NullableDataReference&lt;C1 Page>" />
												<ui:selection label="NullableDataReference&lt;IAggregationDescription>" value="1458645372" tooltip="NullableDataReference&lt;IAggregationDescription>" />
												<ui:selection label="NullableDataReference&lt;ICompositionDescription>" value="1407389455" tooltip="NullableDataReference&lt;ICompositionDescription>" />
												<ui:selection label="Object" value="-1560621677" tooltip="Object" />
												<ui:selection label="PropertyValidatorBuilder&lt;DateTime>" value="1972210404" tooltip="PropertyValidatorBuilder&lt;DateTime>" />
												<ui:selection label="PropertyValidatorBuilder&lt;Decimal>" value="-1594653455" tooltip="PropertyValidatorBuilder&lt;Decimal>" />
												<ui:selection label="PropertyValidatorBuilder&lt;Guid>" value="1432107524" tooltip="PropertyValidatorBuilder&lt;Guid>" />
												<ui:selection label="PropertyValidatorBuilder&lt;Int32>" value="956128661" tooltip="PropertyValidatorBuilder&lt;Int32>" />
												<ui:selection label="PropertyValidatorBuilder&lt;String>" value="-1387833684" tooltip="PropertyValidatorBuilder&lt;String>" />
												<ui:selection selected="true" label="String" value="1501690144" tooltip="String" />
												<ui:selection label="Type" value="2138184215" tooltip="Type" />
												<ui:selection label="UserControl" value="-968180480" tooltip="UserControl" />
												<ui:selection label="Void" value="839421632" tooltip="Void" />
												<ui:selection label="XElement" value="-666776655" tooltip="XElement" />
												<ui:selection label="XhtmlDocument" value="1192914341" tooltip="XhtmlDocument" />
											</ui:selector>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc>Default value</ui:fielddesc>
										<ui:fieldhelp>You can specify a default value for this parameter. If a parameter has a default value, users are not required to specify it when calling the function.</ui:fieldhelp>
										<ui:fielddata>
											<ui:datadialog label="Edit default value..." label-onempty="Specify a default value..." binding="StringDataDialogBinding" url='${root}/content/dialogs/functions/editFunctionCall.aspx?type=System.String&amp;dialoglabel=Parameter+default+value+configuration&amp;multimode=false&amp;functionmarkup='>
												<input name="FlowUI$Document$DocumentBody$TabPanels$ParameterDesigner11$DefaultValueFunctionMarkup" type="text" id="FlowUI_Document_DocumentBody_TabPanels_ParameterDesigner11_DefaultValueFunctionMarkup" />
											</ui:datadialog>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc>Test value</ui:fielddesc>
										<ui:fieldhelp>When previewing you can test with different input parameter values using this field. If this is left blank, the default value will be used for previews.</ui:fieldhelp>
										<ui:fielddata>
											<ui:datadialog label="Edit test value..." label-onempty="Specify a test value..." binding="StringDataDialogBinding" url='${root}/content/dialogs/functions/editFunctionCall.aspx?type=System.String&amp;dialoglabel=Parameter+default+value+configuration&amp;multimode=false&amp;functionmarkup='>
												<input name="FlowUI$Document$DocumentBody$TabPanels$ParameterDesigner11$TestValueFunctionMarkup" type="text" id="FlowUI_Document_DocumentBody_TabPanels_ParameterDesigner11_TestValueFunctionMarkup" />
											</ui:datadialog>
										</ui:fielddata>
									</ui:field>
								</ui:fieldgroup>
								<ui:fieldgroup label="Parameter presentation">
									<ui:field>
										<ui:fielddesc>Widget</ui:fielddesc>
										<ui:fieldhelp>You can select which type of input widget (like a textbox) to use when specifying a value for this parameter. Widgets are only available for simple types.</ui:fieldhelp>
										<ui:fielddata>
											<ui:datadialog callbackid="FlowUI_Document_DocumentBody_TabPanels_ParameterDesigner11_WidgetFunctionMarkup" name="FlowUI_Document_DocumentBody_TabPanels_ParameterDesigner11_WidgetFunctionMarkup" label="TextBox" binding="StringDataDialogBinding" url='${root}/content/dialogs/functions/editFunctionCall.aspx?functiontype=widget&amp;type=System.String&amp;dialoglabel=Parameter+widget+configuration&amp;multimode=false&amp;functionmarkup='>
												<input name="FlowUI$Document$DocumentBody$TabPanels$ParameterDesigner11$WidgetFunctionMarkup" type="text" value="&lt;f:widgetfunction xmlns:f=&quot;http://www.composite.net/ns/function/1.0&quot; name=&quot;Composite.Widgets.String.TextBox&quot; label=&quot;&quot; bindingsourcename=&quot;&quot;>&lt;f:helpdefinition xmlns:f=&quot;http://www.composite.net/ns/function/1.0&quot; helptext=&quot;&quot; />&lt;/f:widgetfunction>"
													onchange="javascript:setTimeout('__doPostBack(\'FlowUI$Document$DocumentBody$TabPanels$ParameterDesigner11$WidgetFunctionMarkup\',\'\')', 0)" id="FlowUI_Document_DocumentBody_TabPanels_ParameterDesigner11_WidgetFunctionMarkup" />
											</ui:datadialog>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc>Position</ui:fielddesc>
										<ui:fieldhelp>The position of the parameter. This controls the order of the parameters.</ui:fieldhelp>
										<ui:fielddata>
											<ui:selector name="FlowUI$Document$DocumentBody$TabPanels$ParameterDesigner11$PositionField" callbackid="FlowUI_Document_DocumentBody_TabPanels_ParameterDesigner11_PositionField" onchange="this.dispatchAction(PageBinding.ACTION_DOPOSTBACK)">
												<ui:selection label="1." value="0" tooltip="1." />
												<ui:selection selected="true" label="Last" value="-1" tooltip="Last" />
											</ui:selector>
										</ui:fielddata>
									</ui:field>
								</ui:fieldgroup>
							</ui:fields>
						</ui:scrollbox>
					</ui:splitpanel>
				</ui:splitbox>
			</ui:page>
		</form>
	</body>
</html>