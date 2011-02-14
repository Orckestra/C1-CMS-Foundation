using System;


namespace Composite.Data.Plugins.DataProvider.CodeGeneration.PropertyInitializer
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class RandomGuidPropertyInitializer : IPropertyInitializer
    {
        /// <exclude />
        public Type ValueType
        {
            get { return typeof(Guid); }
        }

        /// <exclude />
        public void GetValue(out object value)
        {
            value = Guid.NewGuid();
        }
    }
}
