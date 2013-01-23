<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:setup="urn:Composte.C1.Setup"
	xmlns="http://www.w3.org/1999/xhtml" 
	xmlns:ui="urn:HACKED">
	
	<xsl:template match="setup:setup">
		<div>
			<xsl:call-template name="groups"/>
		</div>
	</xsl:template>
	 
	<xsl:template name="groups">
		<xsl:if test="setup:radio">
			<ui:radiodatagroup>
				<xsl:apply-templates select="setup:radio"/>
			</ui:radiodatagroup>
		</xsl:if>
		<xsl:if test="setup:check">
			<ui:checkboxgroup>
				<xsl:apply-templates select="setup:check"/>
			</ui:checkboxgroup>
		</xsl:if>
	</xsl:template>
	
	<xsl:template match="setup:radio">
		<ui:radio value="{@key}" label="{@label}" oncommand="Welcome.update ( this )">
			<xsl:if test="position()=1">
				<xsl:attribute name="ischecked">true</xsl:attribute>
			</xsl:if>
			<xsl:call-template name="uncollapse" />
		</ui:radio>
		<xsl:call-template name="continue"/>	
	</xsl:template>
	
	<xsl:template match="setup:check">
		<ui:checkbox value="{@key}" label="{@label}" oncommand="Welcome.update ( this )">
			<xsl:if test="@checked='true'">
				<xsl:attribute name="ischecked">true</xsl:attribute>
			</xsl:if>
		</ui:checkbox>
		<xsl:call-template name="continue"/>	
	</xsl:template>
	
	<xsl:template name="continue">
		<xsl:if test="@desc">
			<p><xsl:value-of select="@desc"/></p>
		</xsl:if>
		<xsl:if test="setup:radio or setup:check">
			<div class="options" id="div{@key}">
				<xsl:attribute name="class">
					<xsl:text>options</xsl:text>
					<xsl:if test="position()=1">
						<xsl:text> visible</xsl:text>
					</xsl:if>
				</xsl:attribute>
				<xsl:call-template name="groups"/>
			</div>
		</xsl:if>
	</xsl:template>

	<!-- uncollapse hack -->
	<xsl:template name="uncollapse">
		<xsl:value-of select="./@NONEXISTINGATTRIBUTE" />
	</xsl:template>
	
</xsl:stylesheet>