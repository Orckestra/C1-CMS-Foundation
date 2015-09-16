<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
  <xsl:output method="html" indent="no"/>

  <xsl:variable name="TimeMeasurementDefined" select="count(descendant::Measurement[@memoryUsageKb]) &gt; 0" />

  <xsl:variable name="consoleUrl" select="Measurements/@consoleUrl" />

  <xsl:template match="Measurements">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head></head>
      <body>

        <div id="__C1PerformanceTrace">
          <style>
            body, html {
            margin: 0;
            padding: 0;
            }
            #__C1PerformanceTrace
            {
            background-color: white;
            color: #333;
            font-family:"Segoe UI",Tahoma,sans-serif;
            font-size: 14px;
            padding: 0;
            }

            #__C1PerformanceTrace a {
            color: #22B980;
            }

            #__C1PerformanceTrace .dl {
            margin: 20px;
            }

            #__C1PerformanceTrace .info {
            display: inline-block;
            width: 18px;
            height: 18px;
            line-height: 18px;
            border-radius: 50%;
            text-align: center;
            cursor: pointer;
            background: #fcf8e3;
            border: solid 1px #faebcc;
            font-weight: bold;
            color: #999;
            position: relative;
            }

            #__C1PerformanceTrace .info small {
            display: none;
            font-weight: normal;
            color: #333;
            position: absolute;
            left: 25px;
            top: 0;
            background: #F7F7F7;
            border: solid 1px #ddd;
            padding: 5px 15px;
            text-align: left;
            min-width: 400px;

            }

            #__C1PerformanceTrace .info:hover small {
            display: block;
            }

            #__C1PerformanceTrace table {
            font-size: 13px;
            width: 100%;
            margin: 0;
            border-collapse: collapse;
            border-spacing: 0;
            table-layout: fixed;
            border: 1px solid #ddd;
            }

            #__C1PerformanceTrace #orderedByTime {
            display: none;
            }

            #__C1PerformanceTrace th, #__C1PerformanceTrace td {
            overflow: hidden;
            text-align: right;
            white-space: nowrap;
            border: 1px solid #ddd;
            padding: 4px 15px;
            }

            #__C1PerformanceTrace tr.head th {
            background: #F7F7F7;
            border-bottom-width: 2px;
            padding: 6px 15px;
            }

            #__C1PerformanceTrace tr:hover {
            background-color: #f5f5f5;
            }

            #__C1PerformanceTrace tfoot td {
            text-align: left;
            font-size: 85%;
            background: #F7F7F7;
            border: 0;
            }

            #__C1PerformanceTrace tr.weak {
            color: gray;
            }

            #__C1PerformanceTrace span.weak {
            color: gray;
            }

            #__C1PerformanceTrace .btn {
            display: inline-block;
            font-size: 14px;
            cursor: pointer;
            border: 1px solid #cccccc;
            border-radius: 4px;
            background: #fff;
            padding: 3px 8px;
            margin: 0 2px;

            }

            #__C1PerformanceTrace .btn.active {
            font-weight: bold;
            cursor: default;
            }

            .__TracePersent { text-align: right; padding-right: 5px; }
            .__TraceOwn { text-align: right; padding-right: 5px; }
            .__TraceTotalTime { text-align: right; padding-right: 5px;  }
            #__C1PerformanceTrace td.__TraceName { text-align: left; padding-right: 50px; background-repeat: no-repeat }
            .__TraceMemoryUsage { text-align: right; padding-right: 5px;  }

            .__ParallelColumn {text-align: center;}

            .__parallel { color: blue; }
          </style>

          <script language="javascript" type="text/javascript">
            <![CDATA[ // <!--
    var __c1_collapsedNodesTime = new Array(); 
    var __c1_collapsedNodesExecution = new Array();
    var __c1_order = 'execution';
    ]]>

            <!-- Collapsing all the nodes that take less than 11% of execution time, and those which whildren has 0 time in total -->
            <xsl:for-each select="descendant::Measurement[(@persentFromTotal &lt; 11) or (count(./Measurement[@totalTime &gt; 0]) = 0)]">
              <xsl:if test="count(./Measurement) > 0">
                __c1_collapsedNodesTime[__c1_collapsedNodesTime.length] = &quot;<xsl:value-of select="@_id" />&quot;;
              </xsl:if>
            </xsl:for-each>

            var consoleUrl = '<xsl:value-of select="$consoleUrl"/>';
            <![CDATA[	
	function __c1_updateTree(order) {
        function StringStartsWith(a, b) {
            return (a.length > b.length) && (a.substring(0, b.length) == b)
        }

        var table = order == 'execution' ? document.getElementById("orderedByExecution") : document.getElementById("orderedByTime");
        var __c1_collapsedNodes = order == 'execution' ? __c1_collapsedNodesExecution : __c1_collapsedNodesTime;
    
        var rows = table.childNodes;

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
                if(!shouldBeHidden) {
                  var image = document.getElementById(row.id + "_" + __c1_order + "_image");
                  if(image != null) {
                    image.src = consoleUrl + (currentRowIsCollapsed ? "/images/icon-treenode-plus.png" : "/images/icon-treenode-minus.png");
                  }
                }
            }
     }
}

    function __c1_OnRowClick(imageButton) {
        row = imageButton.parentNode.parentNode;
        
        var __c1_collapsedNodes = __c1_order == 'execution' ? __c1_collapsedNodesExecution : __c1_collapsedNodesTime;
        for(var i=0; i< __c1_collapsedNodes.length; i++)
        {
            if(__c1_collapsedNodes[i] == row.id) {
                var newArray = new Array();
                for(var j=0; j<__c1_collapsedNodes.length - 1; j++)
                {
                    newArray[j] = __c1_collapsedNodes[(j < i) ? j : j + 1];
                }

                __c1_order == 'execution' ? __c1_collapsedNodesExecution = newArray : __c1_collapsedNodesTime = newArray;
                __c1_updateTree(__c1_order);
                return;
            }
        }

        __c1_order == 'execution' ? __c1_collapsedNodesExecution[__c1_collapsedNodesExecution.length] = row.id : __c1_collapsedNodesTime[__c1_collapsedNodesTime.length] = row.id;
        __c1_updateTree(__c1_order);
        return;
    }
    
    function __c1_OrderTable(order) {
     __c1_order = order;
      var tableByTime  = document.getElementById("orderedByTime");
      var tableByExecution  = document.getElementById("orderedByExecution");
      var orderByTime = document.getElementById("orderByTime");
      var orderByExecution = document.getElementById("orderByExecution");
  
    if( __c1_order == 'execution' && orderByExecution.className.indexOf('active') < 0) { 
          tableByTime.style.display = 'none';
          orderByTime.className = orderByTime.className.replace('active', ' ');
          tableByExecution.style.display = 'table-row-group';
          orderByExecution.className = orderByExecution.className + ' active';
    }
    
     if( __c1_order == 'time' && orderByTime.className.indexOf('active') < 0) { 
         tableByExecution.style.display = 'none';
         orderByExecution.className = orderByExecution.className.replace('active', ' ');
         tableByTime.style.display = 'table-row-group';
         orderByTime.className = orderByTime.className  + ' active';
    }
    __c1_updateTree(__c1_order);
        return;
    }
	  // --> ]]>
          </script>

   
          <table id="__tblPerformanceTrace">
            <thead>
              <tr class="head">
                <th style="width: 80px;">Own time, ms</th>
                <th>
                  <div style="float: left; padding-top: 4px;">Function calls, ms</div>
                  <div style="float: right; font-weight: normal;">
                    Order by: <a id="orderByExecution" class="btn active order" onclick="__c1_OrderTable('execution')">Execution Order</a>
                    <a id="orderByTime" onclick="__c1_OrderTable('time')" class="btn order">Time Used</a>
                  </div>

                </th>
                <xsl:if test="$TimeMeasurementDefined">
                  <th style="width: 110px;">Memory usage, kb</th>
                </xsl:if>
              </tr>
            </thead>
            <tbody id="orderedByExecution">
              <xsl:apply-templates select="Measurement">
                <xsl:with-param name="Level" select="0" />
                <xsl:with-param name="OrderBy" select="'execution'" />
              </xsl:apply-templates>
            </tbody>
            <tbody id="orderedByTime">
              <xsl:apply-templates select="Measurement">
                <xsl:with-param name="Level" select="0" />
                <xsl:with-param name="OrderBy" select="'time'" />
                <xsl:sort select="number(@totalTime)" data-type="number" order="descending"/>
              </xsl:apply-templates>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3">
                  Own time - the time of the function's execution minus the time of the child functions' execution
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  ms - <a href="http://en.wikipedia.org/wiki/Millisecond" target="_blank">millisecond</a>
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="dl">
            <div>
              Allocated memory: <strong>
                <xsl:value-of select="@MemoryUsageKb"/>
              </strong> kb. <a class="info">
                i <small>
                  Note that memory measurement may be affected by other work happening in the AppDomain at the same time. Possible negative values are caused by garbage collections.
                  Run this in an isolated environment for getting precise data.
                </small>
              </a>
            </div>

          </div>
          <xsl:if test="count(descendant::Measurement[@parallel='true']) > 0">
            <br />
            <span class="__parallel">P</span> - code is executed in a parallel task
          </xsl:if>

        </div>

      </body>
    </html>
  </xsl:template>

  <xsl:template match="Measurement">
    <xsl:param name="Level" />
    <xsl:param name="OrderBy" />
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
          <span class="weak">
            .<xsl:value-of select="floor(@ownTime div 100) mod 10" />
          </span>
        </xsl:if>

       
       
      </td>
      <!--
			<td class="__ParallelColumn">
				<xsl:if test="@parallel = 'true'">
					<span class="__parallel">*</span>&#160;
				</xsl:if>
			</td>-->
      <td class="__TraceName" style="padding-left:{$Level * 15 + 4}px ">
        <!--xsl:if test="@parallel = 'true'">
					<span class="__parallel">p</span>&#160;
				</xsl:if-->

        <xsl:choose>
          <xsl:when test="$hasChildren">
            <input id="{@_id}_{$OrderBy}_image" type="image" src="{$consoleUrl}/images/icon-treenode-minus.png" width="10" height="10" onclick="__c1_OnRowClick(this);" style="margin-right: 2px;"/>
          </xsl:when>
          <xsl:otherwise>
            <span style="margin-left: 14px;" />
          </xsl:otherwise>
        </xsl:choose>

        <xsl:value-of select="floor(@totalTime div 1000)" />
        <span class="weak">
          .<xsl:value-of select="floor(@totalTime div 100) mod 10" />
        </span>

        (<xsl:value-of select="@persentFromTotal" />%)

        <xsl:choose>
          <xsl:when test="@entityToken">
            <a target="_top" href="{$consoleUrl}/top.aspx#FocusElement;{@entityToken}">
              <xsl:value-of select="@title" />
            </a>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="@title" />
          </xsl:otherwise>
        </xsl:choose>

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
    <xsl:choose>
      <xsl:when test="$OrderBy = 'time'">
        <xsl:apply-templates select="./Measurement">
          <xsl:with-param name="Level" select="$Level + 1" />
          <xsl:with-param name="OrderBy" select="'time'" />
          <xsl:sort select="@totalTime" data-type="number" order="descending"/>
        </xsl:apply-templates>
      </xsl:when>
      <xsl:otherwise>
        <xsl:apply-templates select="./Measurement">
          <xsl:with-param name="Level" select="$Level + 1" />
          <xsl:with-param name="OrderBy" select="'execution'" />
        </xsl:apply-templates>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
