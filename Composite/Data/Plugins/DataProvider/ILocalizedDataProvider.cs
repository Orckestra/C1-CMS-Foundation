using System.Globalization;


namespace Composite.Data.Plugins.DataProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface ILocalizedDataProvider : IDataProvider
	{
        void AddLocale(CultureInfo cultureInfo);

        void RemoveLocale(CultureInfo cultureInfo);
	}
}
