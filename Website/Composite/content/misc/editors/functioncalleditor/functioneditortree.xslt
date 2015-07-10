<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet 
	version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:msxsl="urn:schemas-microsoft-com:xslt" 
	xmlns:f="http://www.composite.net/ns/function/1.0" 
	xmlns:desc="#functionDescription" 
	xmlns:ui="http://www.w3.org/1999/xhtml"
  xmlns:helper="functioncalleditor"
	exclude-result-prefixes="xsl msxsl f desc helper">

  <xsl:param name="SelectedId" />
  
	<xsl:template match="/">
		<ui:tree id="tree">
			<ui:treebody id="treebody">
				<!--<ui:treenode label="Function Calls" open="true">-->
					<xsl:apply-templates select="*/f:function"/>
      		<xsl:apply-templates select="*/f:widgetfunction"/>
<!--        		</ui:treenode> -->
			</ui:treebody>
		</ui:tree>
	</xsl:template>

	<xsl:template match="f:function|f:widgetfunction">
	
		<xsl:variable name="desc" select="//desc:function[@compositename=current()/@name]"/>
		<xsl:if test="count($desc)=0">
			<xsl:message terminate="yes">Undescribed function name encountered.</xsl:message>
		</xsl:if>

	    <xsl:variable name="label">
	    	<xsl:value-of select="$desc/@namespace" />
	    	<xsl:text>.</xsl:text>
	    	<xsl:value-of select="$desc/@name" />
	    	<xsl:if test="@localname != ''">
		    	<xsl:text> : </xsl:text>
		    	<xsl:value-of select="@localname "/>
	    	</xsl:if>
	    </xsl:variable>

		<xsl:variable name="id" select="translate(@id,'-','')"/>

		<ui:treenode 
			label="{$label}" 
			image="${{icon:base-function-function}}" 
			open="true" title="{$desc/@description}" 
			callbackid="{@id}"
			id="id{$id}"
			handle="handle{@id}">
      
      <xsl:if test="$SelectedId = $id">
        <xsl:attribute name="focused">true</xsl:attribute>
      </xsl:if>

      <xsl:apply-templates select="$desc/desc:param">
				<xsl:with-param name="funcimpl" select="."/>
			</xsl:apply-templates>
		</ui:treenode>
		
	</xsl:template>

	<xsl:template match="desc:param">
		<xsl:param name="funcimpl"/>
    
		<xsl:variable name="desc" select="."/>
		<xsl:variable name="impl" select="$funcimpl/f:param[@name=$desc/@name]"/>
    <xsl:variable name="id"><xsl:choose>
        <xsl:when test="count($impl) > 0"><xsl:value-of select="$impl/@id"/></xsl:when>
        <xsl:otherwise><xsl:value-of select="helper:GetVirtualParameterId($funcimpl/@path, $desc/@name)"/></xsl:otherwise>
    </xsl:choose></xsl:variable>

    <xsl:variable name="cleanedId"><xsl:value-of select="translate($id,'-','')" /></xsl:variable>

    <xsl:variable name="label">
      <xsl:value-of select="$desc/@label" />
      <xsl:if test="$impl/@inputParameter != ''">
        <xsl:text> ← </xsl:text>
        <xsl:value-of select="$impl/@inputParameter"/>
      </xsl:if>
    </xsl:variable>
    
		<ui:treenode label="{$label}" open="false" title="{$desc/@description}" callbackid="{$id}" id="id{$cleanedId}" handle="handle{$cleanedId}">
      <xsl:if test="$SelectedId = $id">
        <xsl:attribute name="focused">true</xsl:attribute>
      </xsl:if>
      
			<xsl:choose>
				<xsl:when test="count($impl) &gt; 0 and count($impl/f:function)=0">
					<xsl:attribute name="image">${icon:parameter_overloaded}</xsl:attribute>
				</xsl:when> 
				<xsl:when test="count($impl) &gt; 0">
					<xsl:attribute name="image">${icon:parameter_overloaded}</xsl:attribute>
					<xsl:apply-templates select="$impl/f:function"/>
				</xsl:when>
				<xsl:when test="$desc/@required='true'">
					<xsl:attribute name="image">${icon:parameter_missing}</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="image">${icon:parameter}</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
		</ui:treenode>
	</xsl:template>

	<!--
		<ui:treenode label="Composite.Data.Types.IMediaFolder.GetIMediaFolderXml" image="${{icon:functioncall}}" open="true"> <ui:treenode label="Selected fields: Id, Path" image="${{icon:parameter_overloaded}}" /> <ui:treenode label="Filter" image="${{icon:parameter_overloaded}}" open="true">
		<ui:treenode label="Composite.Data.Types.IMediaFolder.FieldPredicateFilter" image="${{icon:functioncall}}" open="true"> <ui:treenode label="Id" image="${{icon:parameter_overloaded}}" open="true"> <ui:treenode label="Composite.Utils.Predicates.GuidEquals" image="${{icon:functioncall}}" open="true">
		<ui:treenode label="The value to compare to" image="${{icon:parameter_overloaded}}" open="true"> <ui:treenode label="Composite.Web.Request.QueryStringGuidValue" image="${{icon:functioncall}}" open="true"> <ui:treenode label="Parameter name: mediafolderid" image="${{icon:parameter_overloaded}}" />
		<ui:treenode label="Fallback Value" image="${{icon:parameter}}" /> </ui:treenode> </ui:treenode> </ui:treenode> </ui:treenode> <ui:treenode label="KeyPath" image="${{icon:parameter}}" /> <ui:treenode label="CompositePath" image="${{icon:parameter}}" /> <ui:treenode label="StoreId"
		image="${{icon:parameter}}" /> <ui:treenode label="Path" image="${{icon:parameter}}" /> <ui:treenode label="Title" image="${{icon:parameter}}" /> <ui:treenode label="Descrition" image="${{icon:parameter}}" /> </ui:treenode> </ui:treenode> <ui:treenode label="Order by" image="${{icon:parameter}}"
		/> <ui:treenode label="Order ascending" image="${{icon:parameter}}" /> <ui:treenode label="Page" image="${{icon:parameter}}" /> </ui:treenode>
	-->

</xsl:stylesheet>
