<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
	<xsl:output method="html" indent="no"/>

  <xsl:variable name="TimeMeasurementDefined" select="count(descendant::Measurement[@memoryUsageKb]) &gt; 0" />
    
	<xsl:template match="Measurements">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head></head>
			<body>
		
		<div id="__C1PerformanceTrace">
			<style>
				#__C1PerformanceTrace
				{
				background-color: white;
				color: black;
				text-align: left;
				padding:0, 0;
				font-family:"Segoe UI",Tahoma,sans-serif;
				font-size: 12px;
				}

				div#__C1PerformanceTrace {
				padding-top: 20px;
				padding-left: 10px;
				}

				#__C1PerformanceTrace table {
				border-width: 0px;
				border-spacing: 0px;
				border-style: outset;
				border-color: gray;
				border-collapse: separate;
				background-color: white;
				}

				#__C1PerformanceTrace th {
				border-width: 1px;
				padding-top: 1px;
				padding-bottom: 1px;
				padding-left: 5px;
				padding-right: 5px;
				border-style: outset;
				border-color: white;
				background-color: black;
				color: white;
				-moz-border-radius: 0px 0px 0px 0px;
				}

				#__C1PerformanceTrace td {
				border-width: 1px;
				padding-top: 1px;
				padding-bottom: 1px;
				padding-left: 5px;
				padding-right: 5px;
				border-style: outset;
				border-color: white;
				background-color: white;
				-moz-border-radius: 0px 0px 0px 0px;
				}

				#__C1PerformanceTrace tr.weak {
				color: gray;
				}

				#__C1PerformanceTrace span.weak {
				color: gray;
				}

				.__TracePersent { text-align: right; padding-right: 5px; }
				.__TraceOwn { text-align: right; padding-right: 5px; }
				.__TraceTotalTime { text-align: right; padding-right: 5px;  }
				.__TraceName { text-align: left; padding-right: 50px; background-repeat: no-repeat }
        .__TraceMemoryUsage { text-align: right; padding-right: 5px;  }

				.__ParallelColumn {text-align: center;}

				.__parallel { color: blue; }
			</style>

			<script language="javascript" type="text/javascript">
					<![CDATA[ // <!--

    var __c1_collapsedNodes = new Array(); ]]>
				
	<!-- Collapsing all the nodes that take less than 11% of execution time, and those which whildren has 0 time in total -->
	<xsl:for-each select="descendant::Measurement[(@persentFromTotal &lt; 11) or (count(./Measurement[@totalTime &gt; 0]) = 0)]"> 
		<xsl:if test="count(./Measurement) > 0">
			__c1_collapsedNodes[__c1_collapsedNodes.length] = &quot;<xsl:value-of select="@_id" />&quot;;
		</xsl:if>
	</xsl:for-each> 

    
<![CDATA[	
	function __c1_updateTree() {
        function StringStartsWith(a, b) {
            return (a.length > b.length) && (a.substring(0, b.length) == b)
        }


        var table = document.getElementById("__tblPerformanceTrace");

        var rows = table.childNodes[1].childNodes;

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];

			var currentRowIsCollapsed = false;
			
            var shouldBeHidden = false;

            if (typeof (row.id) != "undefined") {
                for (var j = 0; j < __c1_collapsedNodes.length; j++) {
					if(row.id == __c1_collapsedNodes[j]) {
						currentRowIsCollapsed = true;
					}
				
                    var prefix = __c1_collapsedNodes[j] + "|";
					
                    if (StringStartsWith(row.id, prefix)) {
                        shouldBeHidden = true;
						break;
                    }
                }

                // Hiding/displaying the row node
                row.style.display = shouldBeHidden ? 'none' : '';
				
				// Rendering "+" or "-" image
				if(!shouldBeHidden)
				{
					var image = document.getElementById(row.id + "_image");
					if(image != null)
					{
						image.src = currentRowIsCollapsed ? "/Composite/skins/system/trees/icon-treenode-plus.png" : "/Composite/skins/system/trees/icon-treenode-minus.png";
					}
				}
            }
			
			
        }
    }

    function __c1_OnRowClick(imageButton) {
        row = imageButton.parentNode.parentNode;

        for(var i=0; i< __c1_collapsedNodes.length; i++)
        {
            if(__c1_collapsedNodes[i] == row.id) {
                var newArray = new Array();
                for(var j=0; j<__c1_collapsedNodes.length - 1; j++)
                {
                    newArray[j] = __c1_collapsedNodes[(j < i) ? j : j + 1];
                }

                __c1_collapsedNodes = newArray;
                __c1_updateTree();
                return;
            }
        }

        __c1_collapsedNodes[__c1_collapsedNodes.length] = row.id;
        __c1_updateTree();
        return;
    }
	  // --> ]]>	
			</script>

			<xsl:if test="count(@url) > 0">
				<div>
					URL: <a href="{@url}" target="_blank">
						<xsl:value-of select="@url"/>
					</a>
					
				</div>
				
				<br/>
			</xsl:if>
			
			Performance trace:
					
			<table id="__tblPerformanceTrace" style="padding-top: 5px">
				<thead>
					<tr>


						<th>Own time, ms</th>
						<th>P</th>

						<th style="width: 800px;">Function calls, ms</th>
            
            <xsl:if test="$TimeMeasurementDefined">
              <th>Memory usage, kb</th>
            </xsl:if>
					</tr>
				</thead>
				<tbody>
					<xsl:apply-templates select="Measurement">
						<xsl:with-param name="Level" select="0" />
					</xsl:apply-templates>
				</tbody>
			</table>
			<br />
			Own time - the time of the function's execution minus the time of the child functions' execution
			<br />
			ms - <a href="http://en.wikipedia.org/wiki/Millisecond" target="_blank">millisecond</a>
			<xsl:if test="count(descendant::Measurement[@parallel='true']) > 0">
				<br />
				<span class="__parallel">P</span> - code is executed in a parallel task
			</xsl:if>
      <br />
      <br />
      Allocated memory: <strong><xsl:value-of select="@MemoryUsageKb"/></strong> kb. 
      <br/>
      Note that memory measurement may be affected by other work happening in the AppDomain at the same time. Possible negative values are caused by garbage collections. 
      Run this in an isolated environment for getting precise data.

			<script language="javascript" type="text/javascript">
				<![CDATA[ // <!--
				
					__c1_updateTree(); 
					
					// -->
				]]>
			</script>	
			
		</div>
				
			</body>
		</html>
	</xsl:template>

	<xsl:template match="Measurement">
		<xsl:param name="Level" />
		<!-- <Measurement _id="0|1" title="Formatting output XHTML with Tidy.NET" totalTime="1" ownTime="1" persentFromTotal="33" parallel="false" /> -->

		<xsl:variable name="hasChildren" select="count(./Measurement) > 0" />
		
		<tr id="{@_id}">
			<xsl:if test="@totalTime &lt; 1000">
				<!-- If @totalTime less that 1 ms, the node isn't relevant, and therefore shown as weak -->
				<xsl:attribute name="class">weak</xsl:attribute>
			</xsl:if>

			<td class="__TraceOwn">
				<!-- If node has parallel children, we're not showing "ownTime" -->

				<xsl:if test="count(./Measurement[@parallel = 'true']) = 0">
					<xsl:value-of select="floor(@ownTime div 1000)" />
					<span class="weak">.<xsl:value-of select="floor(@ownTime div 100) mod 10" /></span>
				</xsl:if>
			</td>

			<td class="__ParallelColumn">
				<xsl:if test="@parallel = 'true'">
					<span class="__parallel">*</span>&#160;
				</xsl:if>
			</td>
			<td class="__TraceName" style="padding-left:{$Level * 15}px ">
				<!--xsl:if test="@parallel = 'true'">
					<span class="__parallel">p</span>&#160;
				</xsl:if-->
				
				<xsl:choose>
					<xsl:when test="$hasChildren">
						<input id="{@_id}_image" type="image" src="/Composite/skins/system/trees/icon-treenode-minus.png" width="10" height="10" onclick="__c1_OnRowClick(this);" style="margin-right: 2px;"/>
					</xsl:when>
					<xsl:otherwise>
						<span style="margin-left: 12px;" />
					</xsl:otherwise>
				</xsl:choose>


				<!--xsl:if test="$hasChildren">
					<input id="{@_id}_image" type="image" src="/Composite/skins/system/trees/icon-treenode-minus.png" width="10" height="10" onclick="__c1_OnRowClick(this);"/>
				</xsl:if-->
				
				<xsl:value-of select="floor(@totalTime div 1000)" />
				<span class="weak">.<xsl:value-of select="floor(@totalTime div 100) mod 10" /></span>
				
				(<xsl:value-of select="@persentFromTotal" />%)

				

				<!-- label style="width: 10px; background-image: url(/Composite/skins/system/trees/icon-treenode-minus.png)">&#160;</label -->
				<xsl:value-of select="@title" />
				<!--xsl:if test="@parallel='true'">
					<span class="__parallel">*</span>
				</xsl:if -->
			</td>
      <xsl:if test="$TimeMeasurementDefined">
        <td class="__TraceMemoryUsage">
          <xsl:value-of select="@memoryUsageKb"/>
        </td>
      
      </xsl:if>
		</tr>

		<xsl:apply-templates select="./Measurement">
			<xsl:with-param name="Level" select="$Level + 1" />
		</xsl:apply-templates>

	</xsl:template>

	<!--xsl:template match="@* | node()" mode="Copy">
        <xsl:copy>
            <xsl:apply-templates select="@* | node()" mode="Copy"/>
        </xsl:copy>
    </xsl:template-->
</xsl:stylesheet>
