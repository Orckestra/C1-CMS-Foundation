<?xml version="1.0" encoding="UTF-8"?>
<%@ Page Language="C#" ValidateRequest="false" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.UpdateManager</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="UpdateManagerTestPageBinding.js"/>
		
		<style type="text/css">
			h1,h3 {margin: 0 0 1em 0;}
			p { margin: 0; }
		</style>
		
		<!-- play with these classnames! -->
		<style type="text/css">
			.red { color: red; }
			.green { color: green; }
			.blue { color: blue; }
		</style>
		
	</head>
	<body>
	
		<!-- 1) This ajax-enabled FORM must have classname "updateform" -->
		<!-- 2) Updateable elements on page must be surrounded by classname "updatezone" -->
		<!-- 3) Use ID attributes on elements to update smallest possible regions -->
	
		<form id="ID_IS_IMPORTANT" runat="server" action="" method="post" class="updateform">
		
			<ui:page binding="UpdateManagerTestPageBinding" label="UpdateManager!" image="${icon:composite}">
			
				<ui:menubar id="menubar">
					<ui:menu label="Examples">
						<ui:menupopup>
							<ui:menubody>
								<ui:menugroup>
									<ui:menuitem label="Basic example" image="${icon:mimetype-html}" example="updatemanagertest/basic.txt"/>
									<ui:menuitem label="Advanced example" image="${icon:mimetype-html}" example="updatemanagertest/advanced.txt"/>
								</ui:menugroup>
								<ui:menugroup>
									<ui:menuitem label="Composite Forms" image="${icon:mimetype-html}" example="updatemanagertest/forms.txt"/>
								</ui:menugroup>
							</ui:menubody>
						</ui:menupopup>
					</ui:menu>
				</ui:menubar>
				
				<ui:splitbox orient="horizontal" layout="1:1">
					<ui:splitpanel>
						<ui:toolbar>
							<ui:toolbarbody>
								<ui:toolbargroup>
									<ui:toolbarlabel label="Request" image="${icon:mimetype-html}"/>
								</ui:toolbargroup>
							</ui:toolbarbody>
						</ui:toolbar>
						<ui:flexbox>
						
							<!-- posting this to change to updatezone! -->
							<ui:editortextbox id="markup" name="markup">
								<textarea>&lt;h3&gt;Press the &quot;Update&quot; button&lt;/h3&gt;
&lt;p&gt;Make some changes and press it again.&lt;/p&gt;
&lt;p&gt;Then check out examples from the menu.&lt;/p&gt;</textarea>
							</ui:editortextbox>
							
						</ui:flexbox>
						<ui:toolbar class="statusbar">
							<ui:toolbarbody align="right">
								<ui:toolbargroup>
									<ui:clickbutton id="updatebutton" label="Update" image="${icon:accept}"  oncommand="document.forms[0].submit();"/>
								</ui:toolbargroup>
							</ui:toolbarbody>
						</ui:toolbar>
					</ui:splitpanel>
					<ui:splitter/>
					<ui:splitpanel>
						<ui:splitbox orient="vertical" layout="2:1">
							<ui:splitpanel id="testsplitpanel">
								<ui:toolbar>
									<ui:toolbarbody>
										<ui:toolbargroup>
											<ui:toolbarlabel label="Response" image="${icon:page-view-public-scope}"/>
										</ui:toolbargroup>
									</ui:toolbarbody>
								</ui:toolbar>
						
								<!-- CSS classname "updatezone" and ID is required! -->
								<div class="updatezone padded" id="UPDATEZONE">
									<%= Request.Form [ "markup" ] %>
								</div>
								
							</ui:splitpanel>
							<ui:splitter/>
							<ui:splitpanel>
								<ui:toolbar>
									<ui:toolbarbody>
										<ui:toolbargroup>
											<ui:toolbarlabel label="Report" image="${icon:message}"/>
										</ui:toolbargroup>
									</ui:toolbarbody>
								</ui:toolbar>
								<ui:flexbox>
									<ui:editortextbox id="reporttextbox" readonly="true" isdisabled="true"/>
								</ui:flexbox>
							</ui:splitpanel>
						</ui:splitbox>
					</ui:splitpanel>
				</ui:splitbox>
				
			</ui:page>
		</form>
	</body>
</html>
