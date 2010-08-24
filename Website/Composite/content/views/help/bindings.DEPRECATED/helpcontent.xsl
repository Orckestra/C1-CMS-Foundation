<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
	xmlns="http://www.w3.org/1999/xhtml" 
	xmlns:x2="http://www.w3.org/2002/06/xhtml2"
	exclude-result-prefixes="x2">
	
	<xsl:template match="comment()"/>
	
	<xsl:template match="@*|*">
		<xsl:copy>
			<xsl:apply-templates select="*|@*|text()" />
		</xsl:copy>
	</xsl:template>
	
	<xsl:template match="*">
		<xsl:element name="{name()}">
			<xsl:apply-templates select="*|@*|text()" />
			<xsl:variable name="name" select="local-name()"/>
			<xsl:if test="$name='script' or $name='div' or $name='textarea' or $name='a'">
				<xsl:call-template name="uncollapse"/>
			</xsl:if>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="x2:html">
		<html>
			<head>
				<title>
					<xsl:value-of select="x2:head/x2:title"/>
				</title>
				<link rel="stylesheet" type="text/css" href="helpcontent.css.aspx"/>
				<script type="text/javascript" src="helpcontent/help.js">
					<xsl:call-template name="uncollapse"/>
				</script>
				<xsl:apply-templates select="x2:head[not(x2:title)]"/>
			</head>
			<body>
				<xsl:apply-templates select="x2:body/*"/>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="x2:h">
		<h1>
			<xsl:apply-templates select="*|@*|text()" />
		</h1>
	</xsl:template>
	
	<xsl:template match="x2:section/x2:h">
		<h4>
			<xsl:apply-templates select="*|@*|text()" />
		</h4>
	</xsl:template>
	
	<xsl:template name="uncollapse">
		<xsl:value-of select="./@ensureUncollapse" />
	</xsl:template>

</xsl:stylesheet>