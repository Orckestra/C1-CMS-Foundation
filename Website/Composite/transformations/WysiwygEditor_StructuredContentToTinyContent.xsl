<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" 
	exclude-result-prefixes="x" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns="http://www.w3.org/1999/xhtml" 
	xmlns:x="http://www.w3.org/1999/xhtml">

  <xsl:param name="requestapppath" />

  <!-- TODO: an absolute pointer on this!!! -->
	<xsl:variable name="blankimageurl">../../../../images/blank.png</xsl:variable>
	
	<xsl:template match="@*|*|processing-instruction()|comment()">
		<xsl:copy>
			<xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()"/>
		</xsl:copy>
	</xsl:template>
	
	<xsl:template match="/">
		<html>
			<head>
				<title>Tiny Content</title>
			</head>
			<body>
				<xsl:apply-templates select="/x:html/x:body/node()" />
			</body>
		</html>
	</xsl:template>
	
	<!-- uncollapse empty table cells -->
	<xsl:template match="x:td[not(node()|text())]">
		<td>
			<xsl:apply-templates select="@*"/>
		</td>
	</xsl:template>
	
	<!-- media embeds -->
	<xsl:template match="x:object">
		<xsl:variable name="typeclass">
			<xsl:choose>
				<xsl:when test="@classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'">compositemediaflash</xsl:when>
				<xsl:when test="@classid='clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B'">compositemediaquicktime</xsl:when>
				<xsl:when test="@classid='clsid:166B1BCA-3F9C-11CF-8075-444553540000'">compositemediashockwave</xsl:when>
				<xsl:when test="@classid='clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6'">compositemediawinmedia</xsl:when>
				<xsl:otherwise>
					<xsl:choose>
						<xsl:when test="x:embed[@type='application/x-shockwave-flash']">compositemediaflash</xsl:when>
						<xsl:when test="x:embed[@type='video/quicktime']">compositemediaquicktime</xsl:when>
						<xsl:when test="x:embed[@type='application/x-director']">compositemediashockwave</xsl:when>
						<xsl:when test="x:embed[@type='application/x-mplayer2']">compositemediawinmedia</xsl:when>
						<xsl:otherwise>compositemediageneric</xsl:otherwise>
					</xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:variable name="class">
			<xsl:value-of select="$typeclass"/>
			<xsl:if test="@class">
				<xsl:text> </xsl:text>
				<xsl:value-of select="@class"/>
			</xsl:if>
		</xsl:variable>
		<img class="{$class}" src="{$blankimageurl}">
			<xsl:if test="@id">
				<xsl:attribute name="id">
					<xsl:value-of select="@id"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:if test="@width">
				<xsl:attribute name="width">
					<xsl:value-of select="@width"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:if test="@height">
				<xsl:attribute name="height">
					<xsl:value-of select="@height"/>
				</xsl:attribute>
			</xsl:if>
			
			<!-- note that all object params and embed attributes are collected as one! -->
			<xsl:if test="x:param or x:embed">
				<xsl:attribute name="params">
					
					<!-- collect params -->
					<xsl:for-each select="x:param">
						<xsl:value-of select="@name"/>
						<xsl:text>===</xsl:text>
						<xsl:value-of select="@value"/>
						<xsl:text>;</xsl:text>
					</xsl:for-each>
					
					<!-- collect embed attributes -->
					<xsl:for-each select="x:embed/@*">
						<xsl:variable name="name" select="name()"/>
						<xsl:if test="$name!='type' and not(parent::x:embed/parent::x:object/x:param[@name=$name])">
							<xsl:value-of select="$name"/>
							<xsl:text>===</xsl:text>
							<xsl:value-of select="."/>
							<xsl:text>;</xsl:text>
						</xsl:if>						
					</xsl:for-each>
					
				</xsl:attribute>
			</xsl:if>
		</img>
	</xsl:template>
	
	<!-- tinymce internals -->
	<xsl:template match="x:a/@target">
		<xsl:attribute name="tinymcetargetalias">
			<xsl:value-of select="."/>
		</xsl:attribute>
	</xsl:template>
	
  
	<!-- tilde root-URLS confuses TinyMCE and we fix it here -->
  <xsl:template match="x:a/@href[contains(.,'/misc/editors/visualeditor/%7E')]">
		<xsl:attribute name="href">
			<xsl:text>~</xsl:text>
			<xsl:value-of select="substring-after(.,'%7E')"/>
		</xsl:attribute>
	</xsl:template>


  <!-- img tags src reference fixing -->
  <xsl:template match="x:a/@href[starts-with(.,'/Renderers/')]">
    <xsl:attribute name="href">
      <xsl:value-of select="concat($requestapppath,.)"/>
    </xsl:attribute>
  </xsl:template>

  <!-- img tags src reference fixing -->
  <xsl:template match="x:img/@src[starts-with(.,'/Renderers/')]">
    <xsl:attribute name="src">
      <xsl:value-of select="concat($requestapppath,.)"/>
    </xsl:attribute>
  </xsl:template>

  <xsl:template match="x:img/@src[starts-with(.,'%7E')]">
    <xsl:attribute name="src">
      <xsl:value-of select="concat($requestapppath,substring-after(.,'%7E'))"/>
    </xsl:attribute>
    <xsl:attribute name="c1-preserve-tilde">true</xsl:attribute>
  </xsl:template>

  <xsl:template match="x:img/@src[starts-with(.,'~')]">
    <xsl:attribute name="src">
      <xsl:value-of select="concat($requestapppath,substring-after(.,'~'))"/>
    </xsl:attribute>
    <xsl:attribute name="c1-preserve-tilde">true</xsl:attribute>
  </xsl:template>

</xsl:stylesheet>