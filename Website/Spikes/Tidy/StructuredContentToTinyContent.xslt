<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0"
                exclude-result-prefixes="x"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns="http://www.w3.org/1999/xhtml"
                xmlns:x="http://www.w3.org/1999/xhtml">


  <xsl:template match="node()">
    <xsl:copy-of select="."/>
  </xsl:template>

  <xsl:template match="/">
    <html>
      <body>
        <xsl:apply-templates select="/x:html/x:body/node()"/>
      </body>
    </html>
  </xsl:template>



</xsl:stylesheet>