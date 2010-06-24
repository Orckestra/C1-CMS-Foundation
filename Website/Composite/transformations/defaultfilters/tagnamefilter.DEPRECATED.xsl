<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns="http://www.w3.org/1999/xhtml" 
	xmlns:ui="http://www.w3.org/1999/xhtml" 
	xmlns:x="http://www.w3.org/1999/xhtml" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt"
	xmlns:temp="urn:TEMP"
	exclude-result-prefixes="temp msxsl">
	
	<xsl:preserve-space elements="script style"/>
	<xsl:param name="browser">opera</xsl:param>
	
	<xsl:template match="/">
		<html>
			<xsl:apply-templates select="x:html/@*"/>
			<xsl:if test="$browser='explorer'">
				<script type="text/javascript">
					<xsl:text>new function () { </xsl:text>
					<xsl:text>var tagnames = [ </xsl:text>
					<xsl:call-template name="indextagnames"/>
					<xsl:text> ]; </xsl:text>
					<xsl:text>var name, i = 0; while ( name = tagnames [ i++ ]) { document.createElement ( name ); }</xsl:text>
					<xsl:text>};</xsl:text>
				</script>
			</xsl:if>
			<xsl:apply-templates select="x:html/x:head"/>
			<xsl:apply-templates select="x:html/x:body"/>
		</html>
	</xsl:template>
	
	<xsl:template match="@*|*|processing-instruction()|comment()">
		<xsl:copy>
			<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
		</xsl:copy>
	</xsl:template>
	
	<xsl:template name="indextagnames">
		
		<!-- collect elements without structure -->
		<xsl:variable name="container">
			<temp:container>
				<xsl:for-each select="/x:html/x:head//*">
					<xsl:variable name="name" select="name()"/>
					<xsl:if test="$name!='title' and $name!='link' and $name!='script' and $name!='style' and $name!='meta'">
						<xsl:element name="{name()}"/>
					</xsl:if>
				</xsl:for-each>				
				<xsl:for-each select="/x:html/x:body//*">
					<xsl:variable name="name" select="name()"/>
					<xsl:if test="$name!='a' and $name!='div' and $name!='span' and $name!='table' and $name!='tbody' and $name!='thead' and $name!='tfoot' and $name!='tr' and $name!='td' and $name!='th' and $name!='input' and $name!='textarea' and $name!='img' and $name!='form' and $name!='iframe' and $name!='option' and $name!='script' and $name!='select'">
						<xsl:element name="{name()}"/>
					</xsl:if>
				</xsl:for-each>
			</temp:container>
		</xsl:variable>
		
		<!-- sort collected elements -->
		<xsl:variable name="sorted">
			<xsl:apply-templates select="msxsl:node-set($container)/temp:container/*">
				<xsl:sort select="name()"/>
			</xsl:apply-templates>	
		</xsl:variable>
		
		<!-- string resulting elements, removing duplicates -->
		<xsl:for-each select="msxsl:node-set($sorted)/*">
			<xsl:variable name="name" select="name()"/>
			<xsl:if test="not(preceding-sibling::*[name()=$name])">
				<xsl:text>"</xsl:text>
				<xsl:value-of select="name()"/>
				<xsl:text>"</xsl:text>
				<xsl:if test="following-sibling::*[name()!=$name]">
					<xsl:text>, </xsl:text>
				</xsl:if>
			</xsl:if>
		</xsl:for-each>
		
	</xsl:template>
	
	<xsl:template match="*[parent::temp:container]">
		<xsl:element name="{name()}"/>
	</xsl:template>
	
</xsl:stylesheet>