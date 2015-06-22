<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output method="xml" indent="yes"/>

	<xsl:template match="/">
		<div>
			<xsl:if test="ActionItems/Page">
				<ul id="Pages">
					<xsl:apply-templates select="ActionItems/Page"/>
				</ul>
			</xsl:if>
			<xsl:if test="ActionItems/DataTypes/DataType">
				<ul id="DataTypes">
					<xsl:apply-templates select="ActionItems/DataTypes/DataType"/>
				</ul>
			</xsl:if>
		</div>
	</xsl:template>

	<xsl:template match="Page">
		<li class="Page">
			<xsl:variable name="iconname">
				<xsl:choose>
					<xsl:when test="@Status='published'">page</xsl:when>
					<xsl:when test="@Status='awaitingApproval'">page-awaiting-approval</xsl:when>
					<xsl:when test="@Status='awaitingPublication'">page-awaiting-publication</xsl:when>
					<xsl:when test="@Status='draft'">page-draft</xsl:when>
				</xsl:choose>
			</xsl:variable>
			<span class="Title status{@Status}" title="{@changedate}">
				<img src="/Website/Composite/services/icon/GetIcon.ashx?resourceName={$iconname}&amp;resourceNamespace=Composite.Icons" />
				<xsl:value-of select="@Title" />
			</span>
			<xsl:if test="PageFolder">
				<ul class="PageFolders">
					<xsl:apply-templates select="PageFolder"/>
				</ul>
			</xsl:if>
			<xsl:if test="Page">
				<ul class="Pages">
					<xsl:apply-templates select="Page"/>
				</ul>
			</xsl:if>
		</li>
	</xsl:template>


	<xsl:template match="PageFolder">
		<li class="PageFolder">
			<img src="/Website/Composite/services/icon/GetIcon.ashx?resourceName=data-interface-open&amp;resourceNamespace=Composite.Icons" />
			<span class="PageFolderTitle">
				<xsl:value-of select="@Title" />
			</span>
			<xsl:if test="DataItem">
				<ul class="DataItems">
					<xsl:apply-templates select="DataItem"/>
				</ul>
			</xsl:if>
		</li>
	</xsl:template>


	<xsl:template match="DataType">
		<li class="PageFolder">
			<img src="/Website/Composite/services/icon/GetIcon.ashx?resourceName=data-interface-open&amp;resourceNamespace=Composite.Icons" />
			<span class="DataFolderTitle">
				<xsl:value-of select="@Title" />
			</span>
			<xsl:if test="DataItem">
				<ul class="DataItems">
					<xsl:apply-templates select="DataItem"/>
				</ul>
			</xsl:if>
		</li>
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

		<li class="DataItem">
			<img src="/Website/Composite/services/icon/GetIcon.ashx?resourceName={$iconname}&amp;resourceNamespace=Composite.Icons" />
			<span class="Title status{@Status}">
				<xsl:value-of select="@Title" />
			</span>
		</li>
	</xsl:template>

	<xsl:template match="@*">
		<xsl:copy />
	</xsl:template>

</xsl:stylesheet>
