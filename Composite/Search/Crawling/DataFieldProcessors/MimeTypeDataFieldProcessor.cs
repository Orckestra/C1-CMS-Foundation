using System.Reflection;
using Composite.Core.IO;

namespace Composite.Search.Crawling.DataFieldProcessors
{
    internal class MimeTypeDataFieldProcessor : DefaultDataFieldProcessor
    {
        protected override DocumentFieldPreview.ValuePreviewDelegate GetPreviewFunction(PropertyInfo propertyInfo)
        {
            return value => GetLocalizedLabel((string)value);
        }

        protected override DocumentFieldFacet.FacetValuePreviewDelegate GetFacetValuePreviewFunction(PropertyInfo propertyInfo)
        {
            return GetLocalizedLabel;
        }

        private string GetLocalizedLabel(string mimeType) 
            => MimeTypeInfo.TryGetLocalizedName(mimeType) ?? mimeType;
    }
}
