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
            var strList = str.Split(',');
            var result = new string[strList.Length];
            var index = 0;
            foreach (var i in strList)
            {
                result[index] = i.Trim();
                index++;
            }
            return result;
        }

        public override DocumentFieldFacet GetDocumentFieldFacet(PropertyInfo propertyInfo)
        {
            var result = base.GetDocumentFieldFacet(propertyInfo);

            result.FacetType = FacetType.MultipleValues;

            return result;
        }

    }

}

