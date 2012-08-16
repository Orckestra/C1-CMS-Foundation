using System;
using System.Collections.Generic;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Plugins.Elements.ElementProviders.Common
{
    internal class PageTemplateHelper
    {
        public static string LoadDefaultTemplateFile(string fileName)
        {
            return C1File.ReadAllText(PathUtil.Resolve("~/Composite/templates/PageTemplates/" + fileName))
                  .Replace("    ", "\t");
        }

        public static Guid GetTheMostUsedTemplate(IEnumerable<Guid> templateIds)
        {
            IDictionary<Guid, int> usageStats = TemplateUsageStatictic();
            Guid mostUsed = Guid.Empty;
            int usages = 0;

            foreach (Guid templateId in templateIds)
            {
                if (usageStats.ContainsKey(templateId)
                    && usages < usageStats[templateId])
                {
                    mostUsed = templateId;
                    usages = usageStats[templateId];
                }
                else if(usages == 0 && mostUsed == Guid.Empty)
                {
                    mostUsed = templateId;
                }
            }

            return mostUsed;
        }

        private static IDictionary<Guid, int> TemplateUsageStatictic()
        {
            var result = new Dictionary<Guid, int>();
            foreach (IPage page in DataFacade.GetData<IPage>())
            {
                Guid templateId = page.TemplateId;

                if (!result.ContainsKey(templateId))
                {
                    result.Add(templateId, 1);
                }
                else
                {
                    result[templateId] = result[templateId] + 1;
                }
            }
            return result;
        }
    }
}
