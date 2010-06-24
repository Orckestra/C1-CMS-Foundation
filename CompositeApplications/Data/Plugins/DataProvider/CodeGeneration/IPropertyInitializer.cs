using System;


namespace Composite.Data.Plugins.DataProvider.CodeGeneration
{
    public interface IPropertyInitializer
    {
        Type ValueType { get; }
        void GetValue(out object value);
    }
}
