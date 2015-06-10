<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>
    
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Developer</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="Developer.js"></script>
	</head>
	<body>
		
		<ui:page image="${icon:developer}">
			
			<ui:tabbox id="developerviewtabbox" selectedindex="0" persist="selectedindex">
				<ui:tabs>
					<ui:tab label="Views"/>
					<ui:tab label="Dialogs"/>
					<ui:tab label="Actions"/>
				</ui:tabs>
				<ui:tabpanels>
					<ui:tabpanel>
						<ui:tree>
							<ui:treebody>
								<ui:treenode label="SourceEditor test" oncommand="Developer.load('test-fields-sourceedit')"/>
								<ui:treenode label="UpdateManager fun" oncommand="Developer.load('test-mothfun')"/>
								<ui:treenode label="Non-framework doc" oncommand="Developer.load('test-nonframework')"/>
								<ui:treenode label="Bindings" open="true">
									<ui:treenode label="DataBindings" open="false">
										<ui:treenode label="Null Tree Selector" oncommand="Developer.load('test-nulltreeselect')"/>
										<ui:treenode label="Visualeditors" oncommand="Developer.load('test-fields-visualedit')"/>
										<ui:treenode label="Sourceeditors" oncommand="Developer.load('test-fields-sourceedit')"/>
										<ui:treenode label="Radiogroups" oncommand="Developer.load('test-radiogroups')"/>
										<ui:treenode label="Selectors" oncommand="Developer.load('test-fields-selectors')"/>
										<ui:treenode label="Wysiwyg Editors" oncommand="Developer.load('test-fields-wysiwyg')"/>
										<ui:treenode label="Sourcecode editors" oncommand="Developer.load('test-fields-sourcecode')"/>
										<ui:treenode label="All DataBindings" oncommand="Developer.load('test-fields')"/>
										<ui:treenode label="HTMLDataDialog" oncommand="Developer.load('test-fields-htmldatadialog')"/>
										<ui:treenode label="Relations" oncommand="Developer.load('test-relations')"/>
										<ui:treenode label="LazyBindings" oncommand="Developer.load('test-lazy')"/>
										<ui:treenode label="DataInputs" oncommand="Developer.load('test-fields-datainputs')"/>
										<ui:treenode label="DataInputs Special" oncommand="Developer.load('test-fields-specialdatainputs')"/>
										<ui:treenode label="Textboxes" oncommand="Developer.load('test-textboxes')"/>
										<ui:treenode label="Checkboxes" oncommand="Developer.load('test-checkboxes')"/>
									</ui:treenode>
									<ui:treenode label="UIBindings" open="false">
										<ui:treenode label="Tabboxes" oncommand="Developer.load('test-tabboxes')"/>
										<ui:treenode label="Menus and toolbars" oncommand="Developer.load('test-menus')"/>
										<ui:treenode label="Source code viewers" oncommand="Developer.load('test-sourcecodeviewers')"/>
										<ui:treenode label="Icons" oncommand="Developer.load('test-icons')"/>
										<ui:treenode label="Focus" oncommand="Developer.load('test-focus')"/>
										<ui:treenode label="Buttons" oncommand="Developer.load('test-buttons')"/>
										<ui:treenode label="Splitboxes" oncommand="Developer.load('test-splitboxes')"/>
										<ui:treenode label="Styles" oncommand="Developer.load('test-style')"/>
									</ui:treenode>
									<ui:treenode label="Binding features" open="false">
										<ui:treenode label="Memory" oncommand="Developer.load('test-memory')"/>
										<ui:treenode label="Persistance" oncommand="Developer.load('test-persistance')"/>
									</ui:treenode>
									<ui:treenode label="Framework features" open="false">
										<!-- 
										<ui:treenode label="Trees" oncommand="Developer.load('test-trees')"/>
										-->
										<ui:treenode label="DOMEvents" oncommand="Developer.load('test-domevents')"/>
										<ui:treenode label="Crawlers" oncommand="Developer.load('test-crawlers')"/>
									</ui:treenode>
								</ui:treenode>
								<ui:treenode label="Editors">
									<ui:treenode label="Permissions editor" oncommand="Developer.loadView('Composite.Management.PermissionEditor')"/>
								</ui:treenode>
								<ui:treenode label="Stuff">
									<ui:treenode label="FlowUICompleted" oncommand="Developer.load('test-actionended')"/>
									<ui:treenode label="Browser" oncommand="Developer.loadView('Composite.Management.Browser')"/>
									<ui:treenode label="Execution Ended" oncommand="Developer.load('execition-ended')"/>
									<ui:treenode label="Server Error" oncommand="Developer.load('server-error')"/>
								</ui:treenode>
								<ui:treenode label="Atlas Tests">
									<ui:treenode label="Xslt preview" oncommand="Developer.load('xslt-preview')"/>
									<ui:treenode label="WidgetEditor" oncommand="Developer.load('widget-editor')"/>
									<ui:treenode label="Update Panels" oncommand="Developer.load('update-panel')"/>
								</ui:treenode>
							</ui:treebody>
						</ui:tree>
					</ui:tabpanel>
					<ui:tabpanel lazy="true">
						<ui:tree>
							<ui:treebody>
								<ui:treenode label="Dialogs types" open="true">
									<ui:treenode label="Subpage fitness" oncommand="Developer.launch ( 'dialog-subpageforcefitness' )"/> 
							 		<ui:treenode label="Fitness basic" oncommand="Developer.launch ( 'dialog-forcefitness-basic' )"/>
							 		<ui:treenode label="Fitness advanced" oncommand="Developer.launch ( 'dialog-forcefitness-advanced' )"/>
							 		<ui:treenode label="Fitness windowed" oncommand="Developer.launch ( 'dialog-forcefitness-windowed' )"/>
									<ui:treenode label="Auto height dialog" oncommand="Developer.launch('dialog-autoheight')"/>
									<ui:treenode label="Fixed height dialog" oncommand="Developer.launch('dialog-fixedheight')"/>
									<ui:treenode label="Sub-page dialog" oncommand="Developer.launch('dialog-subpages')"/>
									<ui:treenode label="Wizard" oncommand="Developer.launch('dialog-wizard')"/>
								</ui:treenode>
								<ui:treenode label="Misc garbage">
									<ui:treenode label="Text content bug" oncommand="Developer.launch('dialog-textcontent')"/>
									<ui:treenode label="Infobox wizard" oncommand="Developer.launch('dialog-test-infobox')"/>
									<ui:treenode label="No Ajax Wizard" oncommand="Developer.launch('dialog-no-ajax-wizard')"/>
								</ui:treenode>
								<ui:treenode label="Special dialogs">
									<ui:treenode label="Image selector" oncommand="Developer.launch('dialog-imageselector')"/>
									<ui:treenode label="Wysiwygeditor Image Selector" oncommand="Developer.launch('dialog-wysiwygimageselector')"/>
								</ui:treenode>
								<ui:treenode label="Atlas tests">
							 		<ui:treenode label="Edit Function Parameters" oncommand="Developer.launch('dialog-function-parameters')"/>
							 	</ui:treenode>
								<ui:treenode label="Standard dialogs">
									<ui:treenode label="Warning" oncommand="Dialog.warning('Beware','You must beware.')"/>
									<ui:treenode label="Message" oncommand="Dialog.message('Did you know','Freja has many features.')"/>
									<ui:treenode label="Error" oncommand="Dialog.error('You are wrong','It is an error.')"/>
									<ui:treenode label="Question" oncommand="Dialog.question('So what?','Now what?')"/>
								</ui:treenode>
							 	<ui:treenode label="Server Error" oncommand="Developer.launch('server-error-dialog')"/>
							</ui:treebody>
						</ui:tree>
					</ui:tabpanel>
					<ui:tabpanel lazy="true">
						<ui:toolbar>
							<ui:toolbarbody>
								<ui:toolbargroup>
									<ui:clickbutton label="Update MessageQueue" oncommand="MessageQueue.update ()" image="${icon:refresh}"/>
								</ui:toolbargroup>
							</ui:toolbarbody>
						</ui:toolbar>
					</ui:tabpanel>
				</ui:tabpanels>
			</ui:tabbox>
			
		</ui:page>
	</body>
</html>