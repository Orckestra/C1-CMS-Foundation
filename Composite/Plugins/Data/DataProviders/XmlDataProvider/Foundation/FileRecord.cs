using System;
using System.Collections.Generic;
using System.IO;
using System.Xml.Linq;

using Composite.Core.Collections.Generic;
using Composite.Data;
using Composite.Data.Caching;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation
{
    internal class FileRecord
    {
        internal FileRecord()
        {
            _randomTempFileKey = Path.GetFileNameWithoutExtension(Path.GetRandomFileName());
        }

        private readonly string _randomTempFileKey;

        public string FilePath;
        public string ElementName;
        public RecordSet RecordSet;
        public ICollection<XElement> ReadOnlyElementsList;
        public DateTime LastModified;
        public DateTime FileModificationDate;
        public CachedTable CachedTable;
        public bool Dirty = false; // Determines whether the inner XElement list is dirty


        public string TempFilePath
        {
            get
            {
                return string.Format("{0}.{1}.tmp", FilePath, _randomTempFileKey);
            }
        }
    }

    internal class RecordSet
    {
        public Hashtable<IDataId, XElement> Index;
    }
}
