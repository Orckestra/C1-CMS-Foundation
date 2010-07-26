namespace Composite.Data.Plugins.DataProvider
{
	internal interface ISupportCachingDataProvider: IDataProvider
	{
        bool AllowResultsWrapping { get; }
	}
}
