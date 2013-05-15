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
			<xsl:apply-templates select="*|@*|text()|comment()" />
		</xsl:copy>
	</xsl:template>

	<xsl:template match="@*|*|comment()">
		<xsl:copy>
			<xsl:apply-templates select="*|@*|text()|comment()" />
		</xsl:copy>
	</xsl:template>
	
	<!-- TODO: CDATA SECTION SCRIPTS AND STYLES IN ALL TRANSFORMATIONS! -->
	<xsl:template match="x:textarea | x:div | x:a | x:ul | x:select | x:title | x:script | x:style | x:iframe">
		<xsl:element name="{local-name()}">
			<xsl:apply-templates select="*|@*|text()|comment()" />
      <xsl:value-of select="./@ForceTagNotToCollapseEvenWhenEmpty" />
		</xsl:element>
	</xsl:template>

  <xsl:template match="ui:*[starts-with(name(),'ui:')]">
		<xsl:choose>
			<xsl:when test="$browser='explorer'">
				<xsl:element name="{local-name()}">
					<xsl:apply-templates select="*|@*|text()|comment()" />
          <xsl:value-of select="./@ForceTagNotToCollapseEvenWhenEmpty" />
				</xsl:element>
			</xsl:when>
			<xsl:otherwise>
				<xsl:copy>
					<xsl:apply-templates select="*|@*|text()|comment()" />
				</xsl:copy>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
		
</xsl:stylesheet>