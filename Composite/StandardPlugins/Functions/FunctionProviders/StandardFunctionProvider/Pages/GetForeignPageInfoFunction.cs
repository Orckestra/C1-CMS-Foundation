using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Xml.Linq;
using Composite.Data;
using Composite.Functions;
using Composite.Renderings.Page;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Pages
{
    /// <summary>
    /// Gets information about current page in all the languages.
    /// </summary>
	public class GetForeignPageInfoFunction: StandardFunctionBase
	{
        public GetForeignPageInfoFunction(EntityTokenFactory entityTokenFactory)
            : base("GetForeignPageInfo", "Composite.Pages", typeof(IEnumerable<XElement>), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return ExecuteInternal();
        }

        private static IEnumerable<XElement> ExecuteInternal()
        {
            // Grab all active languages...
            foreach (CultureInfo culture in DataLocalizationFacade.ActiveLocalizationCultures)
            {
                XElement annotatedMatch;

                // enter the 'data scope' of the next language
                using (new DataScope(culture))
                {
                    // fetch sitemap element for current page - if any
                    var match = PageStructureInfo.GetSiteMap().DescendantsAndSelf().Where(f => f.Attribute("Id") != null && f.Attribute("Id").Value == PageRenderer.CurrentPageId.ToString()).FirstOrDefault();

                    if (match == null)
                    {
                        continue;
                    }

                    annotatedMatch = new XElement("LanguageVersion"
                            , new XAttribute("Culture", culture.Name)
                            , new XAttribute("CurrentCulture", culture.Equals(Thread.CurrentThread.CurrentCulture))
                            , new XAttribute("Id", match.Attribute("Id").Value)
                            , new XAttribute("Title", match.Attribute("Title").Value)
                            , (match.Attribute("MenuTitle") == null ? null : new XAttribute("MenuTitle", match.Attribute("MenuTitle").Value))
                            , new XAttribute("UrlTitle", match.Attribute("UrlTitle").Value)
                            , new XAttribute("Abstract", match.Attribute("Abstract").Value)
                            , new XAttribute("URL", match.Attribute("URL").Value)
                            );

                }

                yield return annotatedMatch;
            }
        }
	}
}
