<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:f="http://www.composite.net/ns/function/1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ui="http://www.w3.org/1999/xhtml">


	<xsl:template match="/">
		<ui:treenode label="Functions" open="true"><!-- image="{//layoutsettings/@containericonuri}" -->
			<xsl:apply-templates select="/*/f:function" mode="printNamespace">
				<xsl:sort select="@name" />
			</xsl:apply-templates>
		</ui:treenode>
	</xsl:template>


	<!-- namespaces -->
	<xsl:template match="f:function" mode="printNamespace">
		<xsl:param name="parentNamespaceSections" select="''" />

		<xsl:variable name="namespaceSection">
			<xsl:call-template name="GetNamespaceSection">
				<xsl:with-param name="parentNamespaceSections" select="$parentNamespaceSections" />
				<xsl:with-param name="name" select="@name" />
			</xsl:call-template>
		</xsl:variable>

		<xsl:if test="string-length($namespaceSection) &gt; 0">

			<xsl:variable name="namespaceSections">
				<xsl:call-template name="ConcatNamespaceSections">
					<xsl:with-param name="parentNamespaceSections" select="$parentNamespaceSections" />
					<xsl:with-param name="namespaceSection" select="$namespaceSection" />
				</xsl:call-template>
			</xsl:variable>

			<xsl:variable name="pre-siblings-matches" select="preceding-sibling::f:function[starts-with(@name, concat($namespaceSections,'.'))]" />

			<xsl:if test="count($pre-siblings-matches)=0">

				<ui:treenode label="{$namespaceSection}" open="true" callbackid="{//clickhandler/@callbackid}" handle="Namespace:{$namespaceSections}">
					<xsl:apply-templates select="/*/f:function[starts-with(@name,$namespaceSections)]" mode="printNamespace">
						<xsl:with-param name="parentNamespaceSections" select="$namespaceSections" />
						<xsl:sort select="@name" />
					</xsl:apply-templates>

					<xsl:apply-templates select="/*/f:function[starts-with(@name,concat($namespaceSections,'.')) and contains(substring-after(@name,concat($namespaceSections,'.')),'.') = false]" mode="printFunction">
						<xsl:with-param name="parentNamespaceSections" select="$namespaceSections" />
						<xsl:sort select="@name" />
					</xsl:apply-templates>
				</ui:treenode>

			</xsl:if>
		</xsl:if>
	</xsl:template>


	<!-- functions -->
	<xsl:template match="f:function" mode="printFunction">
		<xsl:param name="parentNamespaceSections" />
		<ui:treenode xlabel="{substring-after(@name,concat($parentNamespaceSections,'.'))} : {@localname}" open="true" handle="Function:{@handle}" image="{//layoutsettings/@functioniconuri}" callbackid="{//clickhandler/@callbackid}">
			<xsl:attribute name="label">
				<xsl:value-of select="substring-after(@name,concat($parentNamespaceSections,'.'))" />
				<xsl:if test="//layoutsettings/@displaylocalnames='true'">
					<xsl:value-of select="concat(' : ', @localname)" />
				</xsl:if>
			</xsl:attribute>

			<xsl:if test="count(/*/functioninfo[@name=current()/@name]/param) &gt; 0">
				<xsl:apply-templates select="/*/functioninfo[@name=current()/@name]">
					<xsl:with-param name="function" select="." />
				</xsl:apply-templates>
			</xsl:if>
		</ui:treenode>
	</xsl:template>


	<!-- parameters -->
	<xsl:template match="functioninfo">
		<xsl:param name="function" />

		<xsl:for-each select="param">

			<xsl:variable name="parameter" select="$function/f:param[@name=current()/@name]" />

			<ui:treenode label="{@label}" handle="Parameter:{$function/@handle}:{@name}" callbackid="{//clickhandler/@callbackid}">

				<xsl:choose>
					<xsl:when test="count($parameter) &gt; 0">
						<xsl:attribute name="image">${root}/services/Icon/GetIcon.ashx?resourceName=parameter_overloaded&amp;resourceNamespace=Composite.Icons&amp;size=normal</xsl:attribute>
						<xsl:choose>
							<xsl:when test="count($parameter/@value) &gt; 0">
								<xsl:attribute name="tooltip">
									<xsl:value-of select="$parameter/@value" />
								</xsl:attribute>
							</xsl:when>
							<xsl:otherwise>
								<xsl:attribute name="tooltip">
									<xsl:value-of select="$parameter/f:function/@name" />
								</xsl:attribute>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:when test="@isrequired='true'">
						<xsl:attribute name="image">${root}/services/Icon/GetIcon.ashx?resourceName=parameter_missing&amp;resourceNamespace=Composite.Icons&amp;size=normal</xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="image">${root}/services/Icon/GetIcon.ashx?resourceName=parameter&amp;resourceNamespace=Composite.Icons&amp;size=normal</xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>

			</ui:treenode>
		</xsl:for-each>
	</xsl:template>



	<xsl:template name="GetNamespaceSection">
		<xsl:param name="parentNamespaceSections" />
		<xsl:param name="name" />
		<xsl:choose>
			<xsl:when test="string-length($parentNamespaceSections)=0">
				<xsl:value-of select="substring-before($name,'.')" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="substring-before(substring-after($name,concat($parentNamespaceSections,'.')),'.')" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>


	<xsl:template name="ConcatNamespaceSections">
		<xsl:param name="parentNamespaceSections" />
		<xsl:param name="namespaceSection" />
		<xsl:choose>
			<xsl:when test="string-length($parentNamespaceSections)=0">
				<xsl:value-of select="$namespaceSection" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="concat($parentNamespaceSections,'.',$namespaceSection)" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>




</xsl:stylesheet>