<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" exclude-result-prefixes="x" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml" xmlns:x="http://www.w3.org/1999/xhtml">

	<xsl:template match="@*|*|processing-instruction()|comment()">
		<xsl:copy>
			<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
		</xsl:copy>
	</xsl:template>

	<xsl:template match="/">
		<html>
			<head>
				<title />
			</head>
			<body>
				<xsl:apply-templates select="/x:html/x:body/node()" />
			</body>
		</html>
	</xsl:template>
	
	<!-- kill all comments (they contain word processing info) -->
	<xsl:template match="comment()"/>
	
	<!-- 
		kill empty paragraphs. Especially because HTMLTidy replaces with BR elements.
		Normally we would add "and count(*)=0" but this seems to ignore the template!
	-->
	<xsl:template match="x:p[normalize-space()='']"/>
	
	<!-- kill word style quotes -->
	<xsl:template match="text()">
		<xsl:value-of select="translate(.,'“”','&quot;&quot;')"/>
	</xsl:template>
	
	<!-- simplify headings (word places tags like EM inside) -->
	<xsl:template match="x:h1|x:h2|x:h3|x:h4|x:h5|x:h6">
		<xsl:element name="{local-name(.)}">
			<xsl:value-of select="translate(.,'“”','&quot;&quot;')"/>
		</xsl:element>
	</xsl:template>

	<!-- kill em all -->
	<xsl:template match="@style|@class|@lang|x:ul/@type|x:ol/@type" />

	<!-- kill them too -->
	<xsl:template match="x:span|x:font">
		<xsl:apply-templates/>
	</xsl:template>
	
	<!-- browsers don't support ordered list start annotation -->
	<xsl:template match="x:ol/@start"/>
	
</xsl:stylesheet>