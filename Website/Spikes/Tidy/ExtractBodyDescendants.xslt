<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0"
                exclude-result-prefixes="xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output indent="yes"/>

  <xsl:template match="/ | @* | node() | *">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="/">
    <xsl:apply-templates select="/xhtml:html/xhtml:body/node()"/> <!-- /node() -->
  </xsl:template>

</xsl:stylesheet>