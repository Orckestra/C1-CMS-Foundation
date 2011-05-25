using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Plugins.Routing.Hostnames
{
    internal class FormFunctions
    {
        public static IEnumerable<Tuple<object, object, string>> GetRootPages()
        {
            var result = new List<Tuple<object, object, string>>();

            CultureInfo[] cultures = DataLocalizationFacade.ActiveLocalizationCultures.ToArray();

            foreach(var culture in cultures)
            {
                using(new DataScope(PublicationScope.Unpublished, culture))
                {
                    foreach(Guid rootPageId in PageManager.GetChildrenIDs(Guid.Empty))
                    {
                        IPage page = PageManager.GetPageById(rootPageId);

                        if(page == null) continue;

                        string label = page.Title;
                        if(cultures.Length > 1)
                        {
                            label += ", " + culture.NativeName;
                        }

                        result.Add(new Tuple<object, object, string>(page.Id, culture.Name, label));
                    }
                }
            }

            return result;
        }
    }
}
