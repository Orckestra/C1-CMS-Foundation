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
	
	<!-- 
	<xsl:template match="x:head">
		<head>
			<xsl:if test="$browser='explorer'">
				<meta http-equiv="X-UA-Compatible" content="chrome=1"/>
			</xsl:if>
			<xsl:apply-templates select="*"/>
		</head>
	</xsl:template>
	-->
	
	<xsl:template match="/|@*|*|processing-instruction()|comment()">
		<xsl:copy>
			<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
		</xsl:copy>
	</xsl:template>
	
	<!-- TODO: CDATA SECTION SCRIPTS AND STYLES IN ALL TRANSFORMATIONS! -->
	<xsl:template match="x:textarea | x:div | x:a | x:ul | x:select | x:title | x:script | x:style | x:iframe">
		<xsl:element name="{local-name()}">
			<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
			<xsl:call-template name="uncollapse" />
		</xsl:element>
	</xsl:template>
	
	<!-- uncollapse hack -->
	<xsl:template name="uncollapse">
		<xsl:value-of select="./@NONEXISTINGATTRIBUTE" />
	</xsl:template>
		
</xsl:stylesheet>