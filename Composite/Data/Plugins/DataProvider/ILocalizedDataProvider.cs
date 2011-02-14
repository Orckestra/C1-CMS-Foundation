using System.Globalization;


namespace Composite.Data.Plugins.DataProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface ILocalizedDataProvider : IDataProvider
	{
        /// <exclude />
        void AddLocale(CultureInfo cultureInfo);

        /// <exclude />
        void RemoveLocale(CultureInfo cultureInfo);
	}
}
