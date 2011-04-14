<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:variable name="spaces">&#160;&#160;&#160;&#160;</xsl:variable>

	<xsl:template match="/">
		<xsl:apply-templates />
	</xsl:template>

	<xsl:template match="processing-instruction()">
		<div class="pi">
			<xsl:call-template name="tab">
				<xsl:with-param name="node" select="." />
			</xsl:call-template>
			<span>
				<xsl:text>&lt;?</xsl:text>
				<xsl:value-of select="name(.)" />
				<xsl:value-of select="." />
				<xsl:text>?&gt;</xsl:text>
			</span>
		</div>
	</xsl:template>

	<xsl:template match="processing-instruction('xml')">
		<div class="pi">
			<xsl:call-template name="tab">
				<xsl:with-param name="node" select="." />
			</xsl:call-template>
			<span>
				<xsl:text>&lt;?</xsl:text>
				<xsl:text>xml</xsl:text>
				<xsl:for-each select="@*">
					<xsl:value-of select="name(.)" />
					<xsl:text>="</xsl:text>
					<xsl:value-of select="." />
					<xsl:text>"</xsl:text>
				</xsl:for-each>
				<xsl:text>?&gt;</xsl:text>
			</span>
		</div>
	</xsl:template>

	<xsl:template match="@*">
		<xsl:call-template name="space" />
		<!-- Fix for FF4 -->
		<xsl:choose>
			<xsl:when test="namespace-uri(.) = ''">
				<xsl:value-of select="local-name()" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="name()" />
			</xsl:otherwise>
		</xsl:choose>
		<xsl:text>=</xsl:text>
		<span class="attval">
			<xsl:text>"</xsl:text>
			<xsl:call-template name="encodestring">
				<xsl:with-param name="text" select="."/>
			</xsl:call-template>
			<xsl:text>"</xsl:text>
		</span>
	</xsl:template>
	 
	<xsl:template match="text()">
		<xsl:if test="normalize-space(.)!=''">
			<div class="text">
					<xsl:call-template name="tab">
						<xsl:with-param name="node" select="." />
					</xsl:call-template>
				<xsl:value-of select="normalize-space(.)" />
			</div>
		</xsl:if>
	</xsl:template>
	
	<!-- note that this will collapse the comment to a single line! -->
	<xsl:template match="comment()">
		<div class="comment">
			<xsl:call-template name="tab">
				<xsl:with-param name="node" select="." />
			</xsl:call-template>
			<xsl:text>&lt;!-</xsl:text>
			<xsl:text>-</xsl:text>
			<xsl:value-of select="." />
			<xsl:text>-</xsl:text>
			<xsl:text>-&gt;</xsl:text>
		</div>
	</xsl:template>

	<xsl:template match="*">
		<div class="element">
			<xsl:call-template name="tab">
				<xsl:with-param name="node" select="." />
			</xsl:call-template>
			<xsl:text>&lt;</xsl:text>
			<xsl:value-of select="name(.)" />
			<xsl:if test="@*">
				<span class="atts">
					<xsl:apply-templates select="@*" />
				</span>
			</xsl:if>
			<xsl:call-template name="namespacedeclaration">
				<xsl:with-param name="element" select="." />
			</xsl:call-template>
			<xsl:text>/&gt;</xsl:text>
		</div>
	</xsl:template>

	<xsl:template match="*[node()]">
		<div class="element">
			<xsl:call-template name="tab">
				<xsl:with-param name="node" select="." />
			</xsl:call-template>
			<xsl:text>&lt;</xsl:text>
			<xsl:value-of select="name(.)" />
			<xsl:if test="@*">
				<span class="atts">
					<xsl:apply-templates select="@*" />
				</span>
			</xsl:if>
			<xsl:call-template name="namespacedeclaration">
				<xsl:with-param name="element" select="." />
			</xsl:call-template>
			<span class="m">
				<xsl:text>&gt;</xsl:text>
			</span>
		</div>
		<div class="element">
			<xsl:apply-templates />
			<div>
				<xsl:call-template name="tab">
					<xsl:with-param name="node" select="." />
				</xsl:call-template>
				<xsl:text>&lt;/</xsl:text>
				<xsl:value-of select="name(.)" />
				<xsl:text>&gt;</xsl:text>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="*[text() and not (comment() or processing-instruction())]">
		<div class="element">
			<xsl:call-template name="tab">
				<xsl:with-param name="node" select="." />
			</xsl:call-template>
			<xsl:text>&lt;</xsl:text>
			<xsl:value-of select="name(.)" />
			<xsl:if test="@*">
				<span class="atts">
					<xsl:apply-templates select="@*" />
				</span>
			</xsl:if>
			<xsl:call-template name="namespacedeclaration">
				<xsl:with-param name="element" select="." />
			</xsl:call-template>
			<xsl:text>&gt;</xsl:text>
			<span class="text">
				<xsl:call-template name="encodestring">
					<xsl:with-param name="text" select="."/>
				</xsl:call-template>
				<!-- 
				<xsl:value-of select="." />
				-->
			</span>
			<xsl:text>&lt;/</xsl:text>
			<xsl:value-of select="name(.)" />
			<xsl:text>&gt;</xsl:text>
		</div>
	</xsl:template>

	<xsl:template match="*[*]">
		<div class="open">
			<div class="element haschildren">
				<xsl:call-template name="tab">
					<xsl:with-param name="node" select="." />
				</xsl:call-template>
				<span class="twisty">&#160;</span>
				<xsl:text>&lt;</xsl:text>
				<xsl:value-of select="name(.)" />
				<xsl:if test="@*">
					<span class="atts">
						<xsl:apply-templates select="@*" />
					</span>
				</xsl:if>
				<xsl:call-template name="namespacedeclaration">
					<xsl:with-param name="element" select="." />
				</xsl:call-template>
				<xsl:text>&gt;</xsl:text>
			</div>
			<div class="children">
				<xsl:apply-templates/>
			</div>
			<div>
				<div class="element">
					<xsl:call-template name="tab">
						<xsl:with-param name="node" select="." />
					</xsl:call-template>
					<xsl:text>&lt;/</xsl:text>
					<xsl:value-of select="name(.)" />
					<xsl:text>&gt;</xsl:text>
				</div>
			</div>
		</div>
	</xsl:template>

	<xsl:template name="tab">
		<xsl:param name="node" />
		<xsl:for-each select="$node">
			<xsl:if test="parent::*">
				<xsl:value-of select="$spaces" />
				<xsl:call-template name="tab">
					<xsl:with-param name="node" select="parent::*" />
				</xsl:call-template>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>

	<xsl:template name="space">
		<xsl:text>&#160;</xsl:text>
	</xsl:template>

	<xsl:template name="namespacedeclaration">
		<xsl:param name="element" />
		<xsl:if test="namespace-uri($element) != namespace-uri($element/parent::*)">
			<span class="atts">
				<xsl:call-template name="space" />
				<xsl:text>xmlns</xsl:text>
				<xsl:if test="name($element) != local-name($element)">
					<xsl:text>:</xsl:text>
					<xsl:value-of select="substring-before(name($element),':')" />
				</xsl:if>
				<xsl:text>=</xsl:text>
				<span class="attval">
					<xsl:text>"</xsl:text>
					<xsl:value-of select="namespace-uri($element)" />
					<xsl:text>"</xsl:text>
				</span>
			</span>
		</xsl:if>
	</xsl:template>
	
	<!-- encode attribute value, so that you may copy-paste the valid output -->
	<xsl:template name="encodestring">
		<xsl:param name="text"/>
		<xsl:variable name="temp1" select="translate($text,' ','&#160;')"/>
		<xsl:variable name="temp2">
			<xsl:call-template name="string-replace">
				<xsl:with-param name="string" select="$temp1"/>
				<xsl:with-param name="from">&amp;</xsl:with-param>
				<xsl:with-param name="to">&amp;amp;</xsl:with-param>
			</xsl:call-template>
		</xsl:variable>
		<xsl:variable name="temp3">
			<xsl:call-template name="string-replace">
				<xsl:with-param name="string" select="$temp2"/>
				<xsl:with-param name="from">&lt;</xsl:with-param>
				<xsl:with-param name="to">&amp;lt;</xsl:with-param>
			</xsl:call-template>
		</xsl:variable>
		<xsl:variable name="temp4">
			<xsl:call-template name="string-replace">
				<xsl:with-param name="string" select="$temp3"/>
				<xsl:with-param name="from">&gt;</xsl:with-param>
				<xsl:with-param name="to">&amp;gt;</xsl:with-param>
			</xsl:call-template>
		</xsl:variable>
		<xsl:variable name="temp5">
			<xsl:call-template name="string-replace">
				<xsl:with-param name="string" select="$temp4"/>
				<xsl:with-param name="from">&quot;</xsl:with-param>
				<xsl:with-param name="to">&amp;quot;</xsl:with-param>
			</xsl:call-template>
		</xsl:variable>
		<xsl:value-of select="$temp5"/>
	</xsl:template>
	
	<!-- replace all occurences of the character(s) 'from' by the string 'to' in the string 'string' --> 
	<xsl:template name="string-replace" >
		<xsl:param name="string"/>
		<xsl:param name="from"/>
		<xsl:param name="to"/>
		<xsl:choose>
			<xsl:when test="contains($string,$from)">
				<xsl:value-of select="substring-before($string,$from)"/>
				<xsl:value-of select="$to"/>
				<xsl:call-template name="string-replace">
					<xsl:with-param name="string" select="substring-after($string,$from)"/>
					<xsl:with-param name="from" select="$from"/>
					<xsl:with-param name="to" select="$to"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$string"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

</xsl:stylesheet>