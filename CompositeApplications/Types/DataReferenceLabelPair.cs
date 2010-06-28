using System;
using Composite.Data;

namespace Composite.Types
{
    internal sealed class DataReferenceLabelPair<T> where T : class, IData
    {
        public DataReferenceLabelPair(DataReference<T> reference, string label)
        {
            this.Label = label;
            this.DataReference = reference;
        }

        public DataReferenceLabelPair(T data, string label)
        {
            this.Label = label;
            this.DataReference = new DataReference<T>(data);
        }

        public string Label { get; private set; }
        public DataReference<T> DataReference { get; private set; }
    }    
}
