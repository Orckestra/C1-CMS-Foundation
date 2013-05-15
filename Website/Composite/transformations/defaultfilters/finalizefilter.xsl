<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns="http://www.w3.org/1999/xhtml"
	xmlns:x="http://www.w3.org/1999/xhtml" 
	xmlns:ui="http://www.w3.org/1999/xhtml" 
	exclude-result-prefixes="x">

	<xsl:param name="mode">operate</xsl:param>
	<xsl:param name="browser">opera</xsl:param>
	<xsl:param name="platform">amigaos</xsl:param>
	<xsl:param name="version">-1</xsl:param>
	<xsl:param name="doctype">False</xsl:param>

	<xsl:template match="/">
		<xsl:if test="$doctype='True'">
			<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;
</xsl:text>
		</xsl:if>
		<xsl:copy>
			<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
		</xsl:copy>
	</xsl:template>

	<xsl:template match="@*|*|processing-instruction()|comment()">
		<xsl:copy>
			<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
		</xsl:copy>
	</xsl:template>
	
	<!-- TODO: CDATA SECTION SCRIPTS AND STYLES IN ALL TRANSFORMATIONS! -->
	<xsl:template match="x:textarea | x:div | x:a | x:ul | x:select | x:title | x:script | x:style | x:iframe">
		<xsl:element name="{local-name()}">
			<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
      <xsl:value-of select="./@ForceTagNotToCollapseEvenWhenEmpty" />
		</xsl:element>
	</xsl:template>

	<xsl:template match="ui:balloon | ui:balloonset | ui:balloonspeak | ui:balloontext | ui:binding | ui:bindingmapping | ui:bindingmappingset | ui:box | ui:broadcaster | ui:broadcasterset | ui:checkbox | ui:checkboxgroup | ui:checkbutton | ui:clickbutton | ui:combobox | ui:control | ui:controlgroup | ui:cover | ui:cursor | ui:datadialog | ui:datainput | ui:datainputbutton | ui:datainputdialog | ui:datainputselector | ui:datalabeltext | ui:deck | ui:decks | ui:dialog | ui:dialogbody | ui:dialogborder | ui:dialogcover | ui:dialoghead | ui:dialogmatrix | ui:dialogpage | ui:dialogset | ui:dialogtoolbar | ui:dialogvignette | ui:dock | ui:dockpanel | ui:dockpanels | ui:docktab | ui:docktabs | ui:editorpage | ui:editortextbox | ui:error | ui:errorset | ui:explorer | ui:explorerdeck | ui:explorerdecks | ui:explorermenu | ui:explorersplitter | ui:explorertoolbar | ui:explorertoolbarbutton | ui:false | ui:feedback | ui:feedbackset | ui:field | ui:fielddata | ui:fielddesc | ui:fieldgroup | ui:fieldgroupseparator | ui:fieldhelp | ui:fields | ui:fieldsbutton | ui:filepicker | ui:flexbox | ui:focus | ui:functioneditor | ui:generic | ui:htmldatadialog | ui:imagebox | ui:imageboxsystem | ui:imagecover | ui:imageinputdialog | ui:imageselection | ui:imagetoolbox | ui:imagetoolboxdragger | ui:key | ui:keyset | ui:label | ui:labelbody | ui:labelbox | ui:labeltext | ui:lazybinding | ui:lazybindingset | ui:matrix | ui:menu | ui:menubar | ui:menubody | ui:menugroup | ui:menuitem | ui:menupopup | ui:multiselector | ui:nullpostbackdialog | ui:page | ui:pagebody | ui:pagedescription | ui:pagehead | ui:pageheading | ui:parametereditor | ui:persistance | ui:popup | ui:popupbody | ui:popupset | ui:postbackdialog | ui:progressbar | ui:radio | ui:radiobutton | ui:radiodatagroup | ui:radiogroup | ui:region | ui:request | ui:response | ui:scrollbox | ui:selection | ui:selector | ui:shadow | ui:simpleselector | ui:sourcecodeviewer | ui:sourceeditor | ui:splash | ui:splitbox | ui:splitpanel | ui:splitter | ui:splitterbody | ui:stage | ui:stagecontainer | ui:stagedeck | ui:stagedecks | ui:stagesplitterbody | ui:stringbundle | ui:tab | ui:tabbox | ui:tabpanel | ui:tabpanels | ui:tabs | ui:text | ui:textarea | ui:textbox | ui:theatre | ui:throbber | ui:titlebar | ui:titlebarbody | ui:toolbar | ui:toolbarbody | ui:toolbarbutton | ui:toolbargroup | ui:toolbarlabel | ui:tree | ui:treebody | ui:treecontent | ui:treenode | ui:treepositionindicator | ui:true | ui:uncover | ui:updatepanel | ui:updatepanelbody | ui:view | ui:viewset | ui:visualeditor | ui:visualmultieditor | ui:visualmultitemplateeditor | ui:window | ui:wizardpage | ui:wysiwygeditor | ui:wysiwygeditortoolbarbutton | ui:urlinputdialog">
		<xsl:choose>
			<xsl:when test="$browser='explorer'">
				<xsl:element name="{local-name()}">
					<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
          <xsl:value-of select="./@ForceTagNotToCollapseEvenWhenEmpty" />
				</xsl:element>
			</xsl:when>
			<xsl:otherwise>
				<xsl:copy>
					<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
				</xsl:copy>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
		
</xsl:stylesheet>