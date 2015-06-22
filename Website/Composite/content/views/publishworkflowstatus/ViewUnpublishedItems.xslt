<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="http://www.w3.org/1999/xhtml">
	
	<xsl:template match="/">
		<ui:tree focusable="false">
			<ui:treebody>
				<xsl:if test="ActionItems/Page">
					<xsl:apply-templates select="ActionItems/Page"/>
				</xsl:if>
				<xsl:if test="ActionItems/DataTypes/DataType">
					<xsl:apply-templates select="ActionItems/DataTypes/DataType"/>
				</xsl:if>
			</ui:treebody>
		</ui:tree>
	</xsl:template>
	
	<xsl:template match="Page">
		<ui:treenode open="true">
			<xsl:variable name="iconname">
				<xsl:choose>
					<xsl:when test="@Status='published'">page</xsl:when>
					<xsl:when test="@Status='awaitingApproval'">page-awaiting-approval</xsl:when>
					<xsl:when test="@Status='awaitingPublication'">page-awaiting-publication</xsl:when>
					<xsl:when test="@Status='draft'">page-draft</xsl:when>
				</xsl:choose>
			</xsl:variable>
			<xsl:attribute name="label">
				<xsl:value-of select="@Title"/>
			</xsl:attribute>
			<xsl:attribute name="image">
				<xsl:text>${icon:</xsl:text>
				<xsl:value-of select="$iconname"/>
				<xsl:text>}</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="tooltip">
				<xsl:value-of select="@changedate"/>
			</xsl:attribute>
			<xsl:if test="PageFolder">
				<xsl:apply-templates select="PageFolder"/>
			</xsl:if>
			<xsl:if test="Page">
				<xsl:apply-templates select="Page"/>
			</xsl:if>
		</ui:treenode>
	</xsl:template>
	
	<xsl:template match="PageFolder|DataType">
		<ui:treenode open="true" label="{@Title}">
			<xsl:attribute name="image">${icon:data-interface-open}</xsl:attribute>
			<xsl:if test="DataItem">
				<xsl:apply-templates select="DataItem"/>
			</xsl:if>
		</ui:treenode>
	</xsl:template>
	
	<xsl:template match="DataItem">
		<xsl:variable name="iconname">
			<xsl:choose>
				<xsl:when test="@Status='published'">generated-type-data-published</xsl:when>
				<xsl:when test="@Status='awaitingApproval'">generated-type-data-awaiting-approval</xsl:when>
				<xsl:when test="@Status='awaitingPublication'">generated-type-data-awaiting-publication</xsl:when>
				<xsl:when test="@Status='draft'">generated-type-data-draft</xsl:when>
			</xsl:choose>
		</xsl:variable>
		<ui:treenode open="true" label="{@Title}">
			<xsl:attribute name="image">
				<xsl:text>${icon:</xsl:text>
				<xsl:value-of select="$iconname"/>
				<xsl:text>}</xsl:text>
			</xsl:attribute>
		</ui:treenode>
	</xsl:template>
	
</xsl:stylesheet>