<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Link.Link</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="../compositeplugin/TinyDialogPageBinding.js"></script>
		<script type="text/javascript" src="LinkDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage binding="LinkDialogPageBinding"
			label="(label computed)"
			image="${icon:link}" 
			height="auto"
			resizable="false"
			class="tabboxed">
			<ui:pagebody>
				<ui:tabbox type="boxed" equalsize="true">
					<ui:tabs>
					 	<ui:tab label="${string:Composite.Web.VisualEditor:LabelTabBasic}"/>
						<ui:tab label="${string:Composite.Web.VisualEditor:LabelTabAdvanced}"/>
					</ui:tabs>
					<ui:tabpanels>
						<ui:tabpanel>
							<ui:fields>
								<ui:fieldgroup>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Link.LinkDestination}"/>
										<ui:fielddata>
											<ui:urlinputdialog type="url" handle="Composite.Management.LinkableSelectorDialog" name="href" required="true"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Link.LinkRole}"/>
										<ui:fielddata>
											<ui:datainputselector name="rel">
												<ui:selection value="Alternate" tooltip="Designates substitute versions for the document in which the link occurs."/>
												<ui:selection value="Start" tooltip="Refers to the first document in a collection of documents. This link type tells search engines which document is considered by the author to be the starting point of the collection."/>
												<ui:selection value="Next" tooltip="Refers to the next document in a linear sequence of documents. Browsers may choose to preload the &quot;next&quot; document, to reduce the perceived load time."/>
												<ui:selection value="Prev" tooltip="Refers to the previous document in an ordered series of documents."/>
												<ui:selection value="Contents" tooltip="Refers to a document serving as a table of contents."/>
												<ui:selection value="Index" tooltip="Refers to a document providing an index for the current document."/>
												<ui:selection value="Glossary" tooltip="Refers to a document providing a glossary of terms that pertain to the current document."/>
												<ui:selection value="Copyright" tooltip="Refers to a copyright statement for the current document."/>
												<ui:selection value="Chapter" tooltip="Refers to a document serving as a chapter in a collection of documents."/>
												<ui:selection value="Section" tooltip="Refers to a document serving as a section in a collection of documents."/>
												<ui:selection value="Subsection" tooltip="Refers to a document serving as a subsection in a collection of documents."/>
												<ui:selection value="Appendix" tooltip="Refers to a document serving as an appendix in a collection of documents."/>
												<ui:selection value="Help" tooltip="Refers to a document offering help (more information, links to other sources information, etc.)"/>
												<ui:selection value="Bookmark" tooltip="Refers to a bookmark. A bookmark is a link to a key entry point within an extended document. The title attribute may be used, for example, to label the bookmark. Note that several bookmarks may be defined in each document."/>
											</ui:datainputselector>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Link.TitleText}"/>
										<ui:fieldhelp label="${string:Composite.Web.VisualEditor:Link.TitleTextToolTip}"/>
										<ui:fielddata>
											<ui:datainput name="title"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Link.LinkTarget}"/>
										<ui:fielddata>
											<ui:checkboxgroup>
												<ui:checkbox label="${string:Composite.Web.VisualEditor:Link.LinkTarget.LabelCheckBox}" name="blank" value="true"/>
											</ui:checkboxgroup>
										</ui:fielddata>
									</ui:field>
								</ui:fieldgroup>
							</ui:fields>
						</ui:tabpanel>
						<ui:tabpanel>
							<ui:fields>
								<ui:fieldgroup>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:LabelClass}"/>
										<ui:fieldhelp label="${string:Composite.Web.VisualEditor:HelpClass}"/>
										<ui:fielddata>
											<ui:datainputselector id="classnameselector" name="classname"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:LabelId}"/>
										<ui:fieldhelp label="${string:Composite.Web.VisualEditor:HelpId}"/>
										<ui:fielddata>
											<ui:datainput name="id"/>
										</ui:fielddata>
									</ui:field>
								</ui:fieldgroup>
							</ui:fields>
						</ui:tabpanel>
					</ui:tabpanels>
				</ui:tabbox>
			</ui:pagebody>				
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton id="buttonAccept" label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
			
		</ui:dialogpage>
	</body>
</html>