<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/">
    <editor>
      <xsl:apply-templates select="/controls" />
    </editor>
  </xsl:template>

  <xsl:template match="controls">
    <!-- control elements -->
    <xsl:if test="control[@name='Path']">
      <control cmd="Path" />
    </xsl:if>
    <xsl:if test="control[@name='ContextMenu']">
      <control cmd="ContextMenu" />
    </xsl:if>
    <xsl:if test="control[@name='CleanupOnSave']">
      <control cmd="CleanupOnSave">
        <param name="output" value="xhtml" />
      </control>
    </xsl:if>

    <xsl:if test="control[@name='Bold']|control[@name='Italic']|control[@name='Underline']">
      <toolbar>

        <xsl:if test="control[@name='Bold']|control[@name='Italic']|control[@name='Underline']">
          <group>
            <xsl:if test="control[@name='Bold']">
              <control cmd="Bold" />
            </xsl:if>
            <xsl:if test="control[@name='Italic']">
              <control cmd="Italic" />
            </xsl:if>
            <xsl:if test="control[@name='Underline']">
              <control cmd="Underline" />
            </xsl:if>
          </group>
        </xsl:if>

        <xsl:if test="control[@name='JustifyLeft']|control[@name='JustifyRight']">
          <group>
            <xsl:if test="control[@name='JustifyLeft']">
              <control cmd="JustifyLeft" />
            </xsl:if>
            <xsl:if test="control[@name='JustifyRight']">
              <control cmd="JustifyRight" />
            </xsl:if>
          </group>
        </xsl:if>

        <xsl:if test="control[@name='InsertUnorderedList']|control[@name='InsertOrderedList']">
          <group>
            <xsl:if test="control[@name='InsertUnorderedList']">
              <control cmd="InsertUnorderedList" />
            </xsl:if>
            <xsl:if test="control[@name='InsertOrderedList']">
              <control cmd="InsertOrderedList" />
            </xsl:if>
          </group>
        </xsl:if>

      </toolbar>
    </xsl:if>

  </xsl:template>


</xsl:stylesheet>

