<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet version='1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:msxsl='urn:schemas-microsoft-com:xslt' exclude-result-prefixes='msxsl'>
    <xsl:output method='xml' indent='yes'/>

    <xsl:template match='@* | node()'>
        <xsl:copy>
            <xsl:apply-templates select='@* | node()'/>
        </xsl:copy>
    </xsl:template>

  <xsl:template match='configSections'>
    <configSections>
      <xsl:comment>The Configuration Transformation AddOn Fragment Installer did this</xsl:comment>
      <xsl:apply-templates select='@* | node()'/>
    </configSections>
  </xsl:template>

</xsl:stylesheet>
