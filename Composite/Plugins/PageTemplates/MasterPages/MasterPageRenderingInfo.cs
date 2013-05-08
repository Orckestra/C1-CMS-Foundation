using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web.UI;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    internal class MasterPageRenderingInfo
    {
        public MasterPageRenderingInfo(string virtualPath, IDictionary<string, PropertyInfo> placeholderProperties)
        {
            VirtualPath = virtualPath;
            PlaceholderProperties = placeholderProperties;
        }

        public string VirtualPath { get; private set; }

        public virtual IDictionary<string, PropertyInfo> PlaceholderProperties { get; private set; }
    }

    internal class LazyInitializedMasterPageRenderingInfo : MasterPageRenderingInfo
    {
        private IDictionary<string, PropertyInfo> _placeholderProperties;
        private readonly MasterPagePageTemplateProvider _provider;
        private readonly string _filePath;

        public LazyInitializedMasterPageRenderingInfo(string filePath, string virtualPath, MasterPagePageTemplateProvider provider)
            : base(virtualPath, null)
        {
            _filePath = filePath;
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
            MasterPage masterPage;
            MasterPagePageTemplateDescriptor parsedPageTemplateDescriptor;
            MasterPageRenderingInfo renderingInfo;
            Exception loadingException;

            if (!_provider.LoadMasterPage(
                _filePath,
                out masterPage,
                out parsedPageTemplateDescriptor,
                out renderingInfo,
                out loadingException))
            {
                throw loadingException;
            }

            Verify.IsNotNull(masterPage, "Failed to compile master page file '{0}'", _filePath);
            Verify.That(masterPage is MasterPagePageTemplate, "Incorrect base class. '{0}'", _filePath);

            return renderingInfo.PlaceholderProperties;
        }
    }
}
