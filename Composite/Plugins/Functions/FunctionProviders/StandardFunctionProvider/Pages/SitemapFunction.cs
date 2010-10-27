using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Functions;
using System.Xml.Linq;
using System.Xml.Xsl;
using System.Xml;
using Composite.Core.NewIO;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.C1Console.Security;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Logging;
using Composite.Core.Xml;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Pages
{
	internal sealed class SitemapFunction : StandardFunctionBase
    {
        #region XSLT constants
        const string _sitemapXslTemplate = @"<?xml version=""1.0"" encoding=""UTF-8""?>
<xsl:stylesheet version=""1.0"" xmlns:xsl=""http://www.w3.org/1999/XSL/Transform"" exclude-result-prefixes=""xsl""
	xmlns=""http://www.w3.org/1999/xhtml"">

	<xsl:template match=""/"">
		<html>
			<head>
				<style id=""CompositePagesXhtmlSitemapStyle"">
                    ul#Sitemap, ul#Sitemap ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }


                    ul#Sitemap ul {
                        margin-left: 0.8em;
                    }

                    ul#Sitemap li {
                        padding: 0;
                    }

                    #Sitemap a {
                        text-decoration: none;
                    }

                    #Sitemap a.sitemapCurrentPage
                    {
                        font-weight: bold;
                    }

                    #Sitemap a.sitemapOpenPage
                    {
                        font-style: italic;
                    }
				</style>
			</head>
			<body>
				<ul id=""Sitemap"">
					<xsl:apply-templates select=""/sitemap/Page"" />
				</ul>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match=""Page[@MenuTitle]"">
		<li>
			<xsl:apply-templates mode=""classAttribute"" select=""."" />
			<a href=""{@URL}"">
				<xsl:apply-templates mode=""classAttribute"" select=""."" />
				<xsl:value-of select=""@MenuTitle"" />
			</a>
			<xsl:if test=""count(Page)&gt;0"">
				<ul>
					<xsl:apply-templates select=""Page"" />
				</ul>
			</xsl:if>
		</li>
	</xsl:template>


	<xsl:template mode=""classAttribute"" match=""Page"">
		<xsl:choose>
			<xsl:when test=""@iscurrent='true'"">
				<xsl:attribute name=""class"">sitemapCurrentPage</xsl:attribute>
			</xsl:when>
			<xsl:when test=""@isopen='true'"">
				<xsl:attribute name=""class"">sitemapOpenPage</xsl:attribute>
			</xsl:when>
		</xsl:choose>
	</xsl:template>

</xsl:stylesheet>
";

        #endregion

        private static object _lock = new object();
        private static XslCompiledTransform xslt = null;

        private static XslCompiledTransform GetCompiledXslt()
        {
            lock (_lock)
            {
                if (xslt == null)
                {
                    xslt = new XslCompiledTransform();

                    XElement xsltSource = XElement.Parse(_sitemapXslTemplate);

                    xslt.Load(xsltSource.CreateReader());

                }
                return xslt;
            }
        }



        private EntityTokenFactory _entityTokenFactory;

        public SitemapFunction(EntityTokenFactory entityTokenFactory)
            : base("QuickSitemap", "Composite.Pages", typeof(XhtmlDocument), entityTokenFactory)
        {
            _entityTokenFactory = entityTokenFactory;
        }

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            XDocument xmlSitemap = new XDocument( new XElement("sitemap", PageStructureInfo.GetSiteMapWithActivePageAnnotations()));

            XDocument xhtmlSitemap = new XDocument();
            using (XmlWriter writer = xhtmlSitemap.CreateWriter())
            {
                GetCompiledXslt().Transform(xmlSitemap.CreateReader(), writer);
            }

            return new XhtmlDocument(xhtmlSitemap);
        }


    }
}
