using System.Globalization;


namespace Composite.Data.Plugins.DataProvider
{
    internal interface ILocalizedDataProvider : IDataProvider
	{
        void AddLocale(CultureInfo cultureInfo);

        void RemoveLocale(CultureInfo cultureInfo);
	}
}
