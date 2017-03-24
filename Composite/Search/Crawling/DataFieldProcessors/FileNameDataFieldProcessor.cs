using System;
using System.Collections.Generic;

namespace Composite.Search.Crawling.DataFieldProcessors
{
    internal class FileNameDataFieldProcessor: DefaultDataFieldProcessor
    {
        public override IEnumerable<string> GetTextParts(object value)
        {
            string fileName = (string) value;
            yield return fileName;

            int extensionSeparator = fileName.LastIndexOf(".", StringComparison.Ordinal);
            if (extensionSeparator > 0)
            {
                yield return fileName.Substring(0, extensionSeparator);
            }   

            if (extensionSeparator + 1 < fileName.Length)
            {
                yield return fileName.Substring(extensionSeparator + 1);
            }
        }
    }
}
