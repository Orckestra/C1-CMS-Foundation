<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns="http://www.w3.org/1999/xhtml"
	xmlns:ui="http://www.w3.org/1999/xhtml"
	xmlns:x="http://www.w3.org/1999/xhtml">

  <xsl:param name="mode">operate</xsl:param>
  <xsl:param name="browser">opera</xsl:param>
  <xsl:param name="platform">amigaos</xsl:param>
  <xsl:param name="version">-1</xsl:param>
  <xsl:param name="appVirtualPath"></xsl:param>

  <xsl:template match="/|@*|*|processing-instruction()|comment()">
    <xsl:copy>
      <xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
    </xsl:copy>
  </xsl:template>

  <!-- pull up head content from nested documents -->
  <xsl:template match="/x:html/x:head">
    <xsl:copy>
      <xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
      <!-- pull up nested head markup -->
      <xsl:apply-templates select="/x:html/x:body//x:head/*" />
    </xsl:copy>
  </xsl:template>

  <!-- suppress nested documents head elements (see above) -->
  <xsl:template match="/x:html/x:body//x:html">
    <xsl:apply-templates select="x:body/node()" />
  </xsl:template>

  <!-- resolve browser and platform regions -->
  <xsl:template match="ui:region">
    <xsl:choose>
      <xsl:when test="not(@platform)">
        <xsl:if test="@match=$browser">
          <xsl:apply-templates />
        </xsl:if>
      </xsl:when>
      <xsl:when test="not(@match)">
        <xsl:if test="@platform=$platform">
          <xsl:apply-templates />
        </xsl:if>
      </xsl:when>
      <xsl:otherwise>
        <xsl:if test="@match=$browser and @platform=$platform">
          <xsl:apply-templates />
        </xsl:if>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- remove empty attributes [which is what the ASPX file is trying to say] -->
  <xsl:template match="@*[.='']" />

  <!-- filter developermode content -->
  <xsl:template match="*[@rel='developermode']">
    <xsl:if test="$mode='develop'">
      <xsl:copy>
        <xsl:apply-templates select="*|@*|text()|processing-instruction()|comment()" />
      </xsl:copy>
    </xsl:if>
  </xsl:template>

  <!-- cache control scripts-->
  <xsl:template match="x:script[(not(starts-with(@src,'/')) or contains(translate(@src,'COMPSITE\','compsite/'),'/composite/'))]/@src">
    <xsl:attribute name="{name()}">
      <xsl:value-of select="." />
      <xsl:if test="not(starts-with(.,'/')) or starts-with(translate(.,'COMPSITE\','compsite/'), translate(concat($appVirtualPath, '/composite/'),'COMPSITE\','compsite/'))">
        <xsl:if test="not(contains(.,'?'))">
          <xsl:text>?c1=</xsl:text>
        </xsl:if>
        <xsl:if test="contains(.,'?')">
          <xsl:text>&amp;c1=</xsl:text>
        </xsl:if>
        <xsl:value-of select="$version" />
      </xsl:if>
    </xsl:attribute>
  </xsl:template>


  <!-- cache control stylesheets-->
  <xsl:template match="x:link[@rel='stylesheet' and (not(starts-with(@href,'/')) or contains(translate(@href,'COMPSITE\','compsite/'),'/composite/')) ]/@href">
    <xsl:attribute name="{name()}">
      <xsl:value-of select="." />
      <xsl:if test="not(starts-with(.,'/')) or starts-with(translate(.,'COMPSITE\','compsite/'), translate(concat($appVirtualPath, '/composite/'),'COMPSITE\','compsite/'))">
        <xsl:if test="not(contains(.,'.aspx')) and not(contains(.,'styles.css')) and not(contains(.,'styles.min.css'))">
          <xsl:text>.aspx</xsl:text>
        </xsl:if>
        <xsl:if test="not(contains(.,'?'))">
          <xsl:text>?c1=</xsl:text>
        </xsl:if>
        <xsl:if test="contains(.,'?')">
          <xsl:text>&amp;c1=</xsl:text>
        </xsl:if>
        <xsl:value-of select="$version" />
      </xsl:if>
    </xsl:attribute>
  </xsl:template>

  <!-- TEMP: Nuking ASP.NET AJAX crap 
	<xsl:template match="x:script[contains(@src,'Microsoft') or contains(@src,'WebResource')]"/>
	<xsl:template match="x:script[contains(@src,'BindingForm.js')]"/>
	<xsl:template match="x:script[contains(text(),'ASP.NET') or contains(text(),'Sys.')]"/>
	<xsl:template match="ui:updatepanel">
		<xsl:apply-templates select="ui:updatepanelbody/*"/>
	</xsl:template>
	-->

  <!-- generate id to optimize UpdateManager performance -->
  <xsl:template match="ui:fields[not(@id)]|ui:fieldgroup[not(@id)]">
    <xsl:variable name="id">
      <xsl:choose>
        <xsl:when test="descendant::*[@name]">
          <xsl:value-of select="descendant::*[@name]/@name"/>
        </xsl:when>
        <xsl:when test="descendant::*[@callbackid]">
          <xsl:value-of select="descendant::*[@callbackid]/@callbackid"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="generate-id(.)"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:element name="{name()}">
      <xsl:attribute name="id">
        <xsl:value-of select="local-name()"/>
        <xsl:text>_</xsl:text>
        <xsl:value-of select="translate($id,'$','_')"/>
      </xsl:attribute>
      <xsl:apply-templates select="*|@*|text()"/>
    </xsl:element>
  </xsl:template>

  <!-- generate id to optimize UpdateManager performance -->
  <xsl:template match="ui:field[not(@id)]|ui:fielddesc[not(@id)]|ui:fielddata[not(@id)]|ui:fieldhelp[not(@id)]">
    <xsl:variable name="id">
      <xsl:choose>
        <xsl:when test="ancestor-or-self::ui:field/descendant::*[@name]">
          <xsl:value-of select="ancestor-or-self::ui:field/descendant::*[@name]/@name"/>
        </xsl:when>
        <xsl:when test="ancestor-or-self::ui:field/descendant::*[@callbackid]">
          <xsl:value-of select="ancestor-or-self::ui:field/descendant::*[@callbackid]/@callbackid"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="generate-id(.)"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:element name="{name()}">
      <xsl:attribute name="id">
        <xsl:value-of select="local-name()"/>
        <xsl:text>_</xsl:text>
        <xsl:value-of select="translate($id,'$','_')"/>
      </xsl:attribute>
      <xsl:apply-templates select="*|@*|text()"/>
    </xsl:element>
  </xsl:template>

  <!-- generate id to optimize UpdateManager performance -->
  <!--ui:datainput, ui:textbox, ui:editortextbox, ui:datadialog -->
  <xsl:template match="ui:*[@name and not(@id)]">
    <xsl:element name="{name()}">
      <xsl:attribute name="id">
        <xsl:text>id_</xsl:text>
        <xsl:value-of select="@name"/>
      </xsl:attribute>
      <xsl:apply-templates select="*|@*|text()"/>
    </xsl:element>
  </xsl:template>

  <!-- disable autocomplete in all forms -->
  <xsl:template match="x:form[not(@autocomplete)]">
    <form>
      <xsl:attribute name="autocomplete">off</xsl:attribute>
      <xsl:apply-templates select="*|@*|text()"/>
    </form>
  </xsl:template>

  <!-- 
		Enlarge images on toolbar with specified imagesize.
		This only works for images with ${icon:xxx} syntax. 
	-->
  <xsl:template match="ui:toolbar[@imagesize]//ui:toolbarbutton/@image[contains(.,'${icon:')]|@image-hover[contains(.,'${icon:')]|@image-disabled[contains(.,'${icon:')]">
    <xsl:attribute name="{local-name()}">
      <xsl:call-template name="toolbarimagesize">
        <xsl:with-param name="image" select="." />
      </xsl:call-template>
    </xsl:attribute>
  </xsl:template>

  <!-- TODO: eliminate this, also from script? -->
  <xsl:template name="toolbarimagesize">
    <xsl:param name="image" />
    <xsl:choose>
      <xsl:when test="contains($image,')')">
        <xsl:value-of select="$image" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:variable name="temp" select="substring($image,1,string-length($image)-1)" />
        <xsl:value-of select="$temp" />
        <xsl:text>(</xsl:text>
        <xsl:value-of select="ancestor::ui:toolbar/@imagesize" />
        <xsl:text>)}</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- the shocking ASP.NET calendar control - lets make it usable! -->

  <!-- strip crappy attributes - note we carry on td@class in the template below -->
  <xsl:template match="x:div[@class='calendar']/table//*/@*"/>


  <!-- kill links -->
  <xsl:template match="x:div[@class='calendar']//x:td">
    <td>
      <xsl:choose>
        <xsl:when test="x:a and not(ancestor::x:table/@class='readonly')">
          <xsl:attribute name="onclick">
            <xsl:value-of select="substring-after(x:a/@href,'javascript:')"/>
          </xsl:attribute>
          <xsl:attribute name="class">
            active <xsl:value-of select="@class"/>
          </xsl:attribute>
        </xsl:when>
        <xsl:when test="x:a and ancestor::x:table/@class='readonly' and contains(@class,'selectedday')">
          <xsl:attribute name="class">selectedday</xsl:attribute>
        </xsl:when>
      </xsl:choose>
      <xsl:apply-templates select="*|text()"/>
    </td>
  </xsl:template>

  <!-- hide the handmade year back & forward links -->
  <xsl:template match="x:div[@class='calendar']/x:a" />
  <!-- simplify nested tables structure -->
  <xsl:template match="x:div[@class='calendar']//x:tr[position()=1]">
    <tr class="month">
      <td>
        <xsl:if test="not(ancestor::x:table/@class='readonly')">
          <div class="monthbrowse">
            <xsl:attribute name="onclick">
              <xsl:value-of select="substring-after(//x:table/x:tr/x:td[position()=1]/x:a/@href,'javascript:')"/>
            </xsl:attribute>
            <xsl:text>&#x25C0;</xsl:text>
          </div>
          <div class="monthbrowse">
            <xsl:attribute name="onclick">
              <xsl:value-of select="substring-after(../../x:a[1]/@href,'javascript:')"/>
            </xsl:attribute>
            <xsl:text>&#x25C1;</xsl:text>
          </div>
        </xsl:if>
      </td>
      <td colspan="5">
        <xsl:value-of select="substring-before(//x:table/x:tr/x:td[position()=2]/text(),' ')"/>
        <br/>
        <xsl:value-of select="substring-after(//x:table/x:tr/x:td[position()=2]/text(),' ')"/>
      </td>
      <td>
        <xsl:if test="not(ancestor::x:table/@class='readonly')">
          <div class="monthbrowse">
            <xsl:attribute name="onclick">
              <xsl:value-of select="substring-after(//x:table/x:tr/x:td[position()=3]/x:a/@href,'javascript:')"/>
            </xsl:attribute>
            <xsl:text>&#x25B6;</xsl:text>
          </div>
          <div class="monthbrowse">
            <xsl:attribute name="onclick">
              <xsl:value-of select="substring-after(../../x:a[2]/@href,'javascript:')"/>
            </xsl:attribute>
            <xsl:text>&#x25B7;</xsl:text>
          </div>
        </xsl:if>
      </td>
    </tr>
  </xsl:template>

  <!-- nuking the links -->
  <xsl:template match="x:div[@class='calendar']//x:td/x:a">
    <xsl:value-of select="text()"/>
  </xsl:template>

  <!-- 
	 	nuke this crappy script that sometimes pops up - in IE only! - 
	 	replacing the entire page on UpdateManager action. It may serve  
	 	some purpose for somebody, but at this point we don't really care.
 	-->
  <xsl:template match="x:script[contains(.,'WebForm_AutoFocus')]"/>

  <!-- 
 		another ASP thingy that may appear out of nowhere, causing the 
 		UpdateManager to replace entire page. In some browsers, the tag 
 		may appear inside an element with an ID attribute, in which case 
 		it is harmless, but not in other browsers... the wonders of ASPX! 
 		TODO: Wrap these fields inside <div id="x"> instead of nuking them?
 	-->
  <xsl:template match="x:input[@id='__LASTFOCUS']"/>

  <!-- 
 		lazybinding ID must be generated her (was done with 
 		javasript) so that the UpdateManager can do its' work.
 	 -->
  <xsl:template match="ui:lazybinding[@bindingid]">
    <ui:lazybinding>
      <xsl:attribute name="id">
        <xsl:value-of select="@bindingid"/>
        <xsl:text>lazybinding</xsl:text>
      </xsl:attribute>
      <xsl:apply-templates select="@*[name()!='id']"/>
    </ui:lazybinding>
  </xsl:template>

  <!-- 
 	<setup>
 		<radio name="Clean slate" key="1"/>
 		<radio name="Basic Website" key="2">
 			<radio name="Johns Website" key="21"/>
 		</radio>
 		<radio name="Demo Website" key="3">
 			<radio name="The Daily Demosite" key="31"/>
 			<radio name="Omnicorp Corporate Site" key="32"/>
 		</radio>
 	</setup>
 	-->

  <!-- wraps content in a table structure ... somewhat lamely -->
  <xsl:template match="ui:tableframe">
    <table cellspacing="0">
      <xsl:apply-templates select="@*"/>
      <tr>
        <td class="xnw"></td>
        <!-- prefix with "x" to fix CSS on nested tables -->
        <td class="xn"></td>
        <td class="xne"></td>
      </tr>
      <tr>
        <td class="xw"></td>
        <td class="xc">
          <xsl:apply-templates/>
        </td>
        <td class="xe"></td>
      </tr>
      <tr>
        <td class="xsw"></td>
        <td class="xs"></td>
        <td class="xse"></td>
      </tr>
    </table>
  </xsl:template>

</xsl:stylesheet>