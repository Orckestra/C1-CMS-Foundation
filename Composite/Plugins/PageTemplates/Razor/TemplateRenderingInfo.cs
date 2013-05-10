using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web.WebPages;
using Composite.AspNet.Razor;
using Composite.Core.PageTemplates;

namespace Composite.Plugins.PageTemplates.Razor
{
    internal class TemplateRenderingInfo
    {
        public TemplateRenderingInfo(string controlVirtualPath, IDictionary<string, PropertyInfo> placeholders)
        {
            ControlVirtualPath = controlVirtualPath;
            PlaceholderProperties = placeholders;
        }

        public string ControlVirtualPath { get; set; }
        public virtual IDictionary<string, PropertyInfo> PlaceholderProperties { get; private set; }
    }

    internal class LazyInitializedTemplateRenderingInfo : TemplateRenderingInfo
    {
        private IDictionary<string, PropertyInfo> _placeholderProperties;
        private readonly RazorPageTemplateProvider _provider;

        public LazyInitializedTemplateRenderingInfo(string controlVirtualPath, RazorPageTemplateProvider provider)
            :base(controlVirtualPath, null)
        {
            _provider = provider;
        }

        public override IDictionary<string, PropertyInfo> PlaceholderProperties
        {
            get
            {
                if (_placeholderProperties == null)
                {
                    lock (this)
                    {
                        if (_placeholderProperties == null)
                        {
                            _placeholderProperties = InitializePlaceholderProperties();
                        }
                    }
                }
                return _placeholderProperties;
            }
        }

        private IDictionary<string, PropertyInfo> InitializePlaceholderProperties()
        {
            WebPageBase webPage;
            PageTemplateDescriptor parsedTemplate;
            IDictionary<string, PropertyInfo> placeholderProperties;
            Exception loadingException;

            if (!_provider.LoadRazorTemplate(ControlVirtualPath, out webPage, out parsedTemplate, out placeholderProperties, out loadingException))
            {
                throw loadingException;
            }

            Verify.IsNotNull(webPage, "Failed to compile razor page template '{0}'", ControlVirtualPath);
            Verify.That(webPage is RazorPageTemplate, "Incorrect base class. '{0}'", ControlVirtualPath);

            return placeholderProperties;
        }
    }
}
