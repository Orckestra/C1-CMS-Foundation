using System.Globalization;


namespace Composite.Data.Plugins.DataProvider
{
    public interface ILocalizedDataProvider : IDataProvider
	{
        void AddLocale(CultureInfo cultureInfo);

        void RemoveLocale(CultureInfo cultureInfo);
	}
}
