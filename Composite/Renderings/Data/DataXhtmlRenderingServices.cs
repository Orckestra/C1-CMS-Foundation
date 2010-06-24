using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Types;
using Composite.Xml;


namespace Composite.Renderings.Data
{
	public static class DataXhtmlRenderingServices
	{
        public static bool CanRender(Type dataTypeToRender, XhtmlRenderingType renderingType)
        {
            IEnumerable<XhtmlRendererProviderAttribute> rendererAttributes = dataTypeToRender.GetCustomInterfaceAttributes<XhtmlRendererProviderAttribute>();
            return rendererAttributes.Any(f => f.SupportedRenderingType == renderingType);
        }


        public static XhtmlDocument Render(IDataReference dataToRender, XhtmlRenderingType renderingType)
        {
            Type dataTypeToRender = dataToRender.ReferencedType;
            IEnumerable<XhtmlRendererProviderAttribute> rendererAttributes = dataTypeToRender.GetCustomInterfaceAttributes<XhtmlRendererProviderAttribute>();

            XhtmlRendererProviderAttribute rendererAttribute = rendererAttributes.FirstOrDefault(f => f.SupportedRenderingType == renderingType);

            if (rendererAttribute == null) throw new NotImplementedException(string.Format("No '{0}' xhtml renderer found for type '{1}'",renderingType, dataTypeToRender.FullName));

            IDataXhtmlRenderer renderer = rendererAttribute.BuildRenderer();

            return renderer.Render(dataToRender);
        }
	}
}
