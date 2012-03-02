<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.SourceCodeViewers</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:page label="SourceCodeViewers">
			<ui:splitbox orient="vertical" layout="1:1">
				<ui:splitpanel>
					<ui:toolbar>
						<ui:toolbarbody>
							<ui:toolbargroup>
								<ui:toolbarlabel label="${string:Website.Misc.SourceCodeViewer.LabelInput}" image="${icon:input}"/>
							</ui:toolbargroup>
						</ui:toolbarbody>
					</ui:toolbar>
					<ui:sourcecodeviewer syntax="xml">
						<textarea>&lt;in:inputs xmlns:in="http://www.composite.net/ns/transformation/input/1.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"&gt;
&lt;!-- Function Call Result, XPath /in:inputs/in:result[@name='IsLessThan'] --&gt;
&lt;in:result xsi:type="xsd:integer" name="IsLessThan"&gt;-1&lt;/in:result&gt;
&lt;/in:inputs&gt;</textarea>
					</ui:sourcecodeviewer>
				</ui:splitpanel>
				<ui:splitter/>
				<ui:splitpanel>
					<ui:toolbar>
						<ui:toolbarbody>
							<ui:toolbargroup>
								<ui:toolbarlabel label="${string:Website.Misc.SourceCodeViewer.LabelOutput}" image="${icon:output}"/>
							</ui:toolbargroup>
						</ui:toolbarbody>
					</ui:toolbar>
					<ui:sourcecodeviewer syntax="xml">
						<textarea>&lt;xml/&gt;</textarea>
					</ui:sourcecodeviewer>
				</ui:splitpanel>
			</ui:splitbox>
		</ui:page>
	</body>
</html>