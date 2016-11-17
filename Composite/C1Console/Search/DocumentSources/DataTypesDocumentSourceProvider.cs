using System.Collections.Generic;
using System.Linq;
using Composite.Data;

namespace Composite.C1Console.Search.DocumentSources
{
    class DataTypesDocumentSourceProvider: ISearchDocumentSourceProvider
    {
        private List<ISearchDocumentSource> _documentSources;

        public IEnumerable<ISearchDocumentSource> GetDocumentSources()
        {
            if (_documentSources == null)
            {
                lock (this)
                {
                    if (_documentSources == null)
                    {
                        _documentSources = GetDataTypeDocumentSources().ToList();
                    }
                }
            }

            return _documentSources;
        }

        private IEnumerable<ISearchDocumentSource> GetDataTypeDocumentSources()
        {
            return from dataType in DataFacade.GetAllInterfaces()
                let attributes = dataType.GetCustomAttributes(true)
                where attributes.Any(a => a is SearchableTypeAttribute)
                select new DataTypeDocumentSource(dataType);
        }
    }
}
