using System;


namespace Composite.Data.Plugins.DataProvider.CodeGeneration.PropertyInitializer
{
    public sealed class RandomGuidPropertyInitializer : IPropertyInitializer
    {
        public Type ValueType
        {
            get { return typeof(Guid); }
        }

        public void GetValue(out object value)
        {
            value = Guid.NewGuid();
        }
    }
}
