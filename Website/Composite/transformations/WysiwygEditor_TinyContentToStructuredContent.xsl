<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" exclude-result-prefixes="x" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml" xmlns:x="http://www.w3.org/1999/xhtml">

  <xsl:param name="requestscheme" />
  <xsl:param name="requesthostname" />
  <xsl:param name="requestport" />
  <xsl:param name="requestapppath" />

  <xsl:variable name="uriWithPort" select="concat($requestscheme,'://',$requesthostname,':',$requestport,$requestapppath,'/')" />
  <xsl:variable name="uriNoPort" select="concat($requestscheme,'://',$requesthostname,$requestapppath,'/')" />

  <!-- these will be stripped from innerHTML input in order to allow relative URLs -->
  <xsl:variable name="uriEditor">Composite/content/misc/editors/visualeditor/</xsl:variable>
  <xsl:variable name="uriEditor1" select="concat($requestapppath,'/',$uriEditor)"/>
  <xsl:variable name="uriEditor2" select="concat($uriWithPort,$uriEditor)"/>
  <xsl:variable name="uriEditor3" select="concat($uriNoPort,$uriEditor)"/>

  <xsl:template match="@*|*|processing-instruction()|comment()">
    <xsl:copy>
      <xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
    </xsl:copy>
  </xsl:template>

  <xsl:template match="/">
    <html>
      <head>
        <title>Composite.Management</title>
      </head>
      <body>
        <xsl:apply-templates select="/x:html/x:body/node()" />
      </body>
    </html>
  </xsl:template>

  <!-- strip empty attributes -->
  <xsl:template match="@*[.='']" />

  <!-- strip this attribute -->
  <xsl:template match="@id[.='__mce']"/>

  <!-- strip tinymce internals -->
  <xsl:template match="@mce_serialized|@mce_keep|@mce_src|@mce_href|@mce_bogus|@mce_style|@data-mce-src|@data-mce-href|@mce_imageresize_id|@data-mce-selected" />

  <!-- more tinymce internals -->
  <xsl:template match="@class[contains(.,'mceVisualAid')]">
    <xsl:choose>
      <xsl:when test=".='mceVisualAid'" />
			<xsl:when test="contains(.,' mceVisualAid')">
				<xsl:attribute name="class">
					<xsl:value-of select="substring-before(.,' mceVisualAid')" />
					<xsl:value-of select="substring-after(.,' mceVisualAid')" />
				</xsl:attribute>
			</xsl:when>
			<xsl:otherwise>
				<xsl:attribute name="class">
					<xsl:value-of select="substring-after(.,'mceVisualAid ')" />
				</xsl:attribute>
			</xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- more tinymce internals -->
  <xsl:template match="@class[contains(.,'mceC1Focused')]">
    <xsl:choose>
      <xsl:when test=".='mceC1Focused'" />
			<xsl:when test="contains(.,' mceC1Focused')">
				<xsl:attribute name="class">
					<xsl:value-of select="substring-before(.,' mceC1Focused')" />
					<xsl:value-of select="substring-after(.,' mceC1Focused')" />
				</xsl:attribute>
			</xsl:when>
      <xsl:otherwise>
				<xsl:attribute name="class">
					<xsl:value-of select="substring-after(.,'mceC1Focused ')" />
				</xsl:attribute>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- more tinymce internals -->
  <xsl:template match="@class[contains(.,'mceItemTable')]">
    <xsl:choose>
      <xsl:when test=".='mceItemTable'" />
			<xsl:when test="contains(.,' mceItemTable')">
				<xsl:attribute name="class">
					<xsl:value-of select="substring-before(.,' mceItemTable')" />
					<xsl:value-of select="substring-after(.,' mceItemTable')" />
				</xsl:attribute>
			</xsl:when>
			<xsl:otherwise>
				<xsl:attribute name="class">
					<xsl:value-of select="substring-after(.,'mceItemTable ')" />
				</xsl:attribute>
			</xsl:otherwise>
    </xsl:choose>
  </xsl:template>

	<!-- more tinymce internals -->
	<xsl:template match="@class[contains(.,'mce-item-table')]">
		<xsl:choose>
			<xsl:when test=".='mce-item-table'" />
			<xsl:when test="contains(.,' mce-item-table')">
				<xsl:attribute name="class">
					<xsl:value-of select="substring-before(.,' mce-item-table')" />
					<xsl:value-of select="substring-after(.,' mce-item-table')" />
				</xsl:attribute>
			</xsl:when>
			<xsl:otherwise>
				<xsl:attribute name="class">
					<xsl:value-of select="substring-after(.,'mce-item-table ')" />
				</xsl:attribute>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- more tinymce internals -->
	<xsl:template match="@class[contains(.,'mceItemAnchor')]">
		<xsl:choose>
			<xsl:when test=".='mceItemAnchor'" />
			<xsl:when test="contains(.,' mceItemAnchor')">
				<xsl:attribute name="class">
					<xsl:value-of select="substring-before(.,' mceItemAnchor')" />
					<xsl:value-of select="substring-after(.,' mceItemAnchor')" />
				</xsl:attribute>
			</xsl:when>
			<xsl:otherwise>
				<xsl:attribute name="class">
					<xsl:value-of select="substring-after(.,'mceItemAnchor ')" />
				</xsl:attribute>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

  <!-- more tinymce internals -->
  <xsl:template match="x:a/@tinymcetargetalias">
    <xsl:attribute name="target">
      <xsl:value-of select="." />
    </xsl:attribute>
  </xsl:template>

  <!-- stripping system-local URI parts -->
  <xsl:template match="@src | @href">
    <xsl:attribute name="{local-name()}"> 
      <xsl:variable name="cleanpath">
        <xsl:choose>
          <xsl:when test="starts-with(.,$uriEditor1)">
            <xsl:value-of select="substring-after(.,$uriEditor1)"/>
          </xsl:when>
          <xsl:when test="starts-with(.,$uriEditor2)">
            <xsl:value-of select="substring-after(.,$uriEditor2)"/>
          </xsl:when>
          <xsl:when test="starts-with(.,$uriEditor3)">
            <xsl:value-of select="substring-after(.,$uriEditor3)"/>
          </xsl:when>
          <xsl:when test="starts-with(.,$uriWithPort)">
            <xsl:value-of select="concat('~/',substring-after(.,$uriWithPort))" />
          </xsl:when>
          <xsl:when test="($requestport='80' or $requestport='443') and starts-with(.,$uriNoPort)">
            <xsl:value-of select="concat('~/',substring-after(.,$uriNoPort))" />
          </xsl:when>
          <xsl:when test="starts-with(.,'../../../../..')">
            <xsl:value-of select="concat('~', substring-after(.,'../../../../..'))" />
          </xsl:when>
          <xsl:when test="starts-with(.,'../../../..')">
            <xsl:value-of select="concat('~/Composite', substring-after(.,'../../../..'))" />
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="." />
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      
      
      <xsl:choose>
        <xsl:when test="starts-with($cleanpath,concat($requestapppath,'/Renderers/'))">
          <xsl:value-of select="concat('~',substring-after($cleanpath,$requestapppath))" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$cleanpath" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:attribute>

  </xsl:template>


  <!-- table cells -->
  <xsl:template match="x:td[x:br[not(preceding-sibling::node()) and not (following-sibling::node())]]">
    <td>
      <xsl:apply-templates select="@*" />
      <xsl:call-template name="uncollapse" />
      <xsl:text></xsl:text>
    </td>
  </xsl:template>

  <!-- when a formatblock change has been made to a media embed, the image remains -->
  <xsl:template match="x:img[@params]"></xsl:template>

  <!-- media embeds [owerrules the previous rule] -->
  <xsl:template match="x:img[@class[contains(.,'compositemedia')]]">
    <xsl:variable name="type">
      <xsl:choose>
        <xsl:when test="contains(@class,' ')">
          <xsl:value-of select="substring-before(@class,' ')" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="@class" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="class">
      <xsl:choose>
        <xsl:when test="contains(@class,' ')">
          <xsl:value-of select="substring-after(@class,' ')" />
        </xsl:when>
        <xsl:otherwise></xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="classid">
      <xsl:choose>
        <xsl:when test="$type='compositemediaflash'">clsid:D27CDB6E-AE6D-11cf-96B8-444553540000</xsl:when>
        <xsl:when test="$type='compositemediaquicktime'">clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B</xsl:when>
        <xsl:when test="$type='compositemediashockwave'">clsid:166B1BCA-3F9C-11CF-8075-444553540000</xsl:when>
        <xsl:when test="$type='compositemediawinmedia'">clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6</xsl:when>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="codebase">
      <xsl:choose>
        <xsl:when test="$type='compositemediaflash'">http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0</xsl:when>
        <xsl:when test="$type='compositemediaquicktime'">http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0</xsl:when>
        <xsl:when test="$type='compositemediashockwave'">http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0</xsl:when>
        <xsl:when test="$type='compositemediawinmedia'">http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701</xsl:when>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="mimetype">
      <xsl:choose>
        <xsl:when test="$type='compositemediaflash'">application/x-shockwave-flash</xsl:when>
        <xsl:when test="$type='compositemediaquicktime'">video/quicktime</xsl:when>
        <xsl:when test="$type='compositemediashockwave'">application/x-director</xsl:when>
        <xsl:when test="$type='compositemediawinmedia'">application/x-mplayer2</xsl:when>
      </xsl:choose>
    </xsl:variable>
    <object classid="{$classid}" codebase="{$codebase}">
      <xsl:if test="@id">
        <xsl:attribute name="id">
          <xsl:value-of select="@id" />
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="$class!=''">
        <xsl:attribute name="class">
          <xsl:value-of select="$class" />
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="@width">
        <xsl:attribute name="width">
          <xsl:value-of select="@width" />
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="@height">
        <xsl:attribute name="height">
          <xsl:value-of select="@height" />
        </xsl:attribute>
      </xsl:if>
      <xsl:call-template name="objectparams">
        <xsl:with-param name="params" select="@params" />
      </xsl:call-template>
      <embed type="{$mimetype}">
        <xsl:if test="@width">
          <xsl:attribute name="width">
            <xsl:value-of select="@width" />
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="@height">
          <xsl:attribute name="height">
            <xsl:value-of select="@height" />
          </xsl:attribute>
        </xsl:if>
        <xsl:call-template name="embedparams">
          <xsl:with-param name="params" select="@params" />
        </xsl:call-template>
      </embed>
    </object>
  </xsl:template>

  <xsl:template name="objectparams">
    <xsl:param name="params" />
    <xsl:if test="contains($params,';')">
      <xsl:variable name="param" select="substring-before($params,';')" />
      <xsl:variable name="name" select="substring-before($param,'===')" />
      <xsl:variable name="value" select="substring-after($param,'===')" />
      <param name="{$name}" value="{$value}" />
      <xsl:call-template name="objectparams">
        <xsl:with-param name="params" select="substring-after($params,';')" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <xsl:template name="embedparams">
    <xsl:param name="params" />
    <xsl:if test="contains($params,';')">
      <xsl:variable name="param" select="substring-before($params,';')" />
      <xsl:variable name="name" select="substring-before($param,'===')" />
      <xsl:variable name="value" select="substring-after($param,'===')" />
      <xsl:attribute name="{$name}">
        <xsl:value-of select="$value" />
      </xsl:attribute>
      <xsl:call-template name="embedparams">
        <xsl:with-param name="params" select="substring-after($params,';')" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>

  <!-- uncollapse hack! -->
  <xsl:template name="uncollapse">
    <xsl:value-of select="./@ensureUncollapse" />
  </xsl:template>

  <!-- the following templates remove garbage markup (quite agressively) -->

  <!-- remove empty paragraphs (bad tiny habit) -->
  <xsl:template match="x:body/x:p[normalize-space(.)='' and x:br[not(preceding-sibling::*) and not(following-sibling::*)]]"/>

  <!-- remove empty paragraphs (for real) -->
  <xsl:template match="x:p[not(node())]"/>

  <!-- cleanup pages with only a single br (bad tiny habit) -->
  <xsl:template match="x:body/x:br[not(preceding-sibling::*) and not(following-sibling::*)]"/>

  <!-- remove empty paragrahps (bad tiny habit) -->
  <xsl:template match="x:body/x:p[text()='&#160;' and count(*)=0]"/>

  <!-- remove weird BR tags inserted into stuff (bad tiny habit) -->
  <xsl:template match="x:*/x:br[not(following-sibling::node())]"/>

  <!-- remove bogus br -->
  <xsl:template match="x:br[@mce_bogus='1']"/>
  
  <!-- remove weird br tags inserted into li -->
  <xsl:template match="x:br[@data-mce-bogus='1']"/>

  <!-- remove weird newline char (still stuck after removing weird BR tags) -->
  <xsl:template match="x:p/text()">
    <xsl:variable name="newline">
      <xsl:text>
</xsl:text>
    </xsl:variable>
    <xsl:value-of select="translate(.,$newline,'')"/>
  </xsl:template>

  <!-- Correcting Crappy Chrome Code -->
  <!-- remove Chrome's fetish for "Apple-style-span" crap. Kill the element that has this class -->
  <xsl:template match="*[@class='Apple-style-span']">
    <xsl:apply-templates select="*|text()|processing-instruction()|comment()" />
  </xsl:template>

  <!-- remove Chrome's fetish for putting crappy styles on images that was copy/pasted in wysiwyg -->
  <xsl:template match="x:img/@style[starts-with(.,'outline-width:') or starts-with(.,'border-top-width:') or contains(.,' initial') ]" />


  <xsl:template match="x:img[@c1-preserve-tilde]/@src[not (starts-with(., '../'))]" >
    <xsl:choose>
      <xsl:when test="starts-with(., '~')">
        <xsl:attribute name="src">
          <xsl:value-of select="." />
        </xsl:attribute>
      </xsl:when>
      <xsl:when test="starts-with(., $requestapppath)">
        <xsl:attribute name="src">
          <xsl:value-of select="concat('~', substring-after(.,$requestapppath))"/>
        </xsl:attribute>
      </xsl:when>
      <xsl:otherwise>
        <xsl:attribute name="src">
          <xsl:value-of select="." />
        </xsl:attribute>
      </xsl:otherwise>
    </xsl:choose>
    
  </xsl:template>

  <xsl:template match="x:img/@c1-preserve-tilde" />

</xsl:stylesheet>