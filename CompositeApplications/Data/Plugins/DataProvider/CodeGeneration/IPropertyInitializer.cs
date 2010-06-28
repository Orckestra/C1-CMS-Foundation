using System;


namespace Composite.Data.Plugins.DataProvider.CodeGeneration
{
    internal interface IPropertyInitializer
    {
        Type ValueType { get; }
        void GetValue(out object value);
    }
}
