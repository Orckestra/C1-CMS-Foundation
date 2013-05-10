using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.IO;

namespace Composite.Plugins.PageTemplates.Common
{
    internal class CachedTemplateInformation
    {
        private CachedTemplateInformation() {}

        public CachedTemplateInformation(Core.PageTemplates.PageTemplateDescriptor parsedTemplate)
        {
            TemplateId = parsedTemplate.Id;
            Title = parsedTemplate.Title;
        }

        public Guid TemplateId { get; set; }
        public string Title { get; set; }

        public static void SerializeToFile(CachedTemplateInformation pageTemplate, string filePath)
        {
            var lines = new List<string>();

            if (pageTemplate != null)
            {
                lines.Add(pageTemplate.TemplateId.ToString());
                lines.Add(pageTemplate.Title);
            }

            C1File.WriteAllLines(filePath, lines);
        }

        public static CachedTemplateInformation DeserializeFromFile(string filePath)
        {
            var lines = C1File.ReadAllLines(filePath);
            if (lines == null || lines.Length == 0)
            {
                return null;
            }
                
            Guid templateId = Guid.Parse(lines[0]);
            string title = string.Join(Environment.NewLine, lines.Skip(1));

            return new CachedTemplateInformation { TemplateId = templateId, Title = title };
        }
    }
        
}
