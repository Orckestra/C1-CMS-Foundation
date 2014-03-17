using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading;
using System.Xml.Linq;
using Composite.Core.Routing;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Pages
{
    /// <summary>
    /// Gets information about current page in all the languages.
    /// </summary>
	internal class GetForeignPageInfoFunction: StandardFunctionBase
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
                    IPage match = PageManager.GetPageById(PageRenderer.CurrentPageId);

                    if (match == null)
                    {
                        continue;
                    }

                    annotatedMatch = new XElement("LanguageVersion"
                            , new XAttribute("Culture", culture.Name)
                            , new XAttribute("CurrentCulture", culture.Equals(Thread.CurrentThread.CurrentCulture))
                            , new XAttribute("Id", match.Id)
                            , new XAttribute("Title", match.Title)
                            , (match.MenuTitle == null ? null : new XAttribute("MenuTitle", match.MenuTitle))
                            , new XAttribute("UrlTitle", match.UrlTitle)
                            , new XAttribute("Description", match.Description)
                            , new XAttribute("URL", PageUrls.BuildUrl(match))
                            );

                }

                yield return annotatedMatch;
            }
        }
	}
}
