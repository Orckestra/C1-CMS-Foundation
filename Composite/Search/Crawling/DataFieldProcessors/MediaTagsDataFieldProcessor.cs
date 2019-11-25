using Composite.Core.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Composite.Search.Crawling.DataFieldProcessors
{
    class MediaTagsDataFieldProcessor : DefaultDataFieldProcessor
    {
        public override string[] GetFacetValues(object value)
        {
            var str = (string)value;
            var strList = str.Split(',').Select(s => s.Trim()).Where(s => !s.IsNullOrEmpty()).ToArray();
            return strList;
        }

        public override DocumentFieldFacet GetDocumentFieldFacet(PropertyInfo propertyInfo)
        {
            var result = base.GetDocumentFieldFacet(propertyInfo);

            result.FacetType = FacetType.MultipleValues;

            return result;
        }

    }

}

