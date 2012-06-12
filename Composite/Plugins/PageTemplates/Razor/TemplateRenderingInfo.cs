using System;
using System.Collections.Generic;
using System.Reflection;

namespace Composite.Plugins.PageTemplates.Razor
{
    internal class TemplateRenderingInfo
    {
        public TemplateRenderingInfo(string controlVirtualPath, IDictionary<string, PropertyInfo> placeholders)
        {
            ControlVirtualPath = controlVirtualPath;
            Placeholders = placeholders;
        }

        public string ControlVirtualPath { get; set; }
        public IDictionary<string, PropertyInfo> Placeholders { get; set; }
    }
}
