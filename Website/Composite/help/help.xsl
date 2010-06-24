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
				<link rel="stylesheet" type="text/css" href="help.css.aspx"/>
				<script type="text/javascript" src="help.js">
					<xsl:call-template name="uncollapse"/>
				</script>
				<xsl:apply-templates select="x2:head[not(x2:title)]"/>
			</head>
			<body>
				<xsl:apply-templates select="x2:body/*"/>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="x2:section">
		<div class="section">
			<xsl:apply-templates select="*|@*|text()" />
		</div>
	</xsl:template>
	
	<!-- 
	<xsl:template match="x2:section[last()]">
		<div class="section">
			<xsl:apply-templates select="*|@*|text()" />
		</div>
	</xsl:template>
	-->
	
	<!-- matching both a and li tags! -->
	<xsl:template match="@href">
		<xsl:attribute name="href">
			<xsl:choose>
				<xsl:when test="contains(.,':')">
					<xsl:value-of select="."/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:text>?id=</xsl:text>
					<xsl:value-of select="."/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:attribute>
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
	
	<xsl:template match="x2:nl">
		<ul class="nl">
			<xsl:apply-templates select="*|@*|text()" />
		</ul>
	</xsl:template>
	
	<!--  
	<xsl:template match="x2:nl/x2:label">
		<li class="label">
			<xsl:apply-templates select="*|@*|text()" />
		</li>
	</xsl:template>
	-->
	
	<xsl:template match="x2:nl/x2:label"/>
	
	<xsl:template match="x2:nl/x2:li">
		<li>
			<xsl:choose>
				<xsl:when test="@href">
					<a>
						<xsl:apply-templates select="*|@*|text()" />
					</a>
				</xsl:when>
				<xsl:otherwise>
					<xsl:apply-templates select="*|@*|text()" />
				</xsl:otherwise>
			</xsl:choose>
		</li>
	</xsl:template>
	
	<xsl:template match="x2:nl/x2:li[x2:nl/x2:label]">
		<li>
			<a class="label" href="javascript:void(false)">
				<xsl:value-of select="x2:nl/x2:label"/>
			</a>
			<xsl:apply-templates select="x2:nl"/>
		</li>
	</xsl:template>
	
	<!-- image objects -->
	<xsl:template match="x2:object[@type='image/png' or @type='image/gif' or @type='image/jpg' or @type='image/jpeg' or @type='image/bmp' or @type='image/tiff']">
		<xsl:variable name="url">
			<xsl:text>content/</xsl:text>
			<xsl:value-of select="@data"/>
		</xsl:variable>
		<xsl:variable name="alt" select="."/>
		<img src="{$url}" alt="{$alt}">
			<xsl:choose>
				<xsl:when test="@title">
					<xsl:apply-templates select="@title"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="title"/>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:apply-templates select="@*[name()!='data' and name()!='type']"/>
		</img>
	</xsl:template>
	
	<xsl:template name="uncollapse">
		<xsl:value-of select="./@ensureUncollapse" />
	</xsl:template>

</xsl:stylesheet>