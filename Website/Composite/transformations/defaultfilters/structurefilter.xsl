<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns="http://www.w3.org/1999/xhtml"
	xmlns:x="http://www.w3.org/1999/xhtml"
	xmlns:ui="http://www.w3.org/1999/xhtml">
	
	<xsl:template match="/|@*|*|processing-instruction()|comment()">
		<xsl:copy>
			<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
		</xsl:copy>
	</xsl:template>
	
	<!-- 
		In any percieved form, there should be only one "fields" element 
		enclosing the "fieldgroup"s. Fields element thus corresponds to the 
		HTML "form" element. For some reason, the backend may choose to 
		emit one "fields" element for EVERY "fieldgroup" element. This 
		makes it impossible (for IE CSS) to control the vertical spacing  
		between fieldgroups. With this hack, all fieldgroups are enclosed   
		back into a single fields element. TODO: Fix this on the backend :)
	-->
	
	<xsl:template match="ui:fields[following-sibling::ui:fields]"> 
		<ui:fields>
			<xsl:apply-templates select="@*"/>
			<xsl:apply-templates select="*"/>
			<xsl:for-each select="following-sibling::ui:fields">
				<xsl:apply-templates/>
			</xsl:for-each>
		</ui:fields>
	</xsl:template>
	
	<xsl:template match="ui:fields[preceding-sibling::ui:fields]"/>
	
	<!-- 
		We have the same problem with checkboxgroups: Multiple checkboxes 
		should be bundled together in a single group. TODO: Fix this on the backend :)
	-->
	
	<xsl:template match="ui:fielddata/ui:checkboxgroup[following-sibling::ui:checkboxgroup]"> 
		<ui:checkboxgroup>
			<xsl:apply-templates select="@*"/>
			<xsl:apply-templates select="*"/>
			<xsl:for-each select="following-sibling::ui:checkboxgroup">
				<xsl:apply-templates/>
			</xsl:for-each>
		</ui:checkboxgroup>
	</xsl:template>
	
	<xsl:template match="ui:fielddata/ui:checkboxgroup[preceding-sibling::ui:checkboxgroup]"/>
		
</xsl:stylesheet>