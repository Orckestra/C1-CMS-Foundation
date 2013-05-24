using System;
using System.Collections.Generic;
using Composite.Core.Extensions;
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

        /// <summary>
        /// Replaces html escape sequences with their XML alternative.
        /// Fixes casing in DOCTYPE declaration
        /// </summary>
        public static string FixHtmlEscapeSequences(string xhtml)
        {
            return xhtml
                .Replace("&nbsp;", "&#160;", StringComparison.OrdinalIgnoreCase)
                .Replace("&ldquo;", "“", StringComparison.OrdinalIgnoreCase)
                .Replace("&rdguo;", "”", StringComparison.OrdinalIgnoreCase)
                .Replace("&lsquo;", "‘", StringComparison.OrdinalIgnoreCase)
                .Replace("&rsquo;", "’", StringComparison.OrdinalIgnoreCase)
                .Replace("&laquo;", "«", StringComparison.OrdinalIgnoreCase)
                .Replace("&raquo;", "»", StringComparison.OrdinalIgnoreCase)
                .Replace("&lsaquo;", "‹", StringComparison.OrdinalIgnoreCase)
                .Replace("&rsaquo;", "›", StringComparison.OrdinalIgnoreCase)
                .Replace("&bull;", "•", StringComparison.OrdinalIgnoreCase)
                .Replace("&deg;", "°", StringComparison.OrdinalIgnoreCase)
                .Replace("&hellip;", "…", StringComparison.OrdinalIgnoreCase)
                .Replace("&trade;", "™", StringComparison.OrdinalIgnoreCase)
                .Replace("&copy;", "©", StringComparison.OrdinalIgnoreCase)
                .Replace("&reg;", "®", StringComparison.OrdinalIgnoreCase)
                .Replace("&mdash;", "—", StringComparison.OrdinalIgnoreCase)
                .Replace("&ndash;", "–", StringComparison.OrdinalIgnoreCase)
                .Replace("&sup2;", "²", StringComparison.OrdinalIgnoreCase)
                .Replace("&sup3;", "³", StringComparison.OrdinalIgnoreCase)
                .Replace("&frac14;", "¼", StringComparison.OrdinalIgnoreCase)
                .Replace("&frac12;", "½", StringComparison.OrdinalIgnoreCase)
                .Replace("&frac34;", "¾", StringComparison.OrdinalIgnoreCase)
				.Replace("&times;", "×", StringComparison.OrdinalIgnoreCase)
				.Replace("&larr;", "←", StringComparison.OrdinalIgnoreCase)
				.Replace("&rarr;", "→", StringComparison.OrdinalIgnoreCase)
				.Replace("&uarr;", "↑", StringComparison.OrdinalIgnoreCase)
				.Replace("&darr;", "↓", StringComparison.OrdinalIgnoreCase)
			    .Replace("&middot;", "·", StringComparison.OrdinalIgnoreCase)
				.Replace("<!doctype", "<!DOCTYPE", StringComparison.OrdinalIgnoreCase);
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
