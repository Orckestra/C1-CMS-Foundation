using System;


namespace Composite.Data.Plugins.DataProvider.CodeGeneration.PropertyInitializer
{
    public sealed class RandomIntPropertyInitializer : IPropertyInitializer
	{
        public Type ValueType
        {
            get { return typeof(int); }
        }

        public void GetValue(out object value)
        {
            Random rand = new Random();

            value = rand.Next();
        }
	}
}
