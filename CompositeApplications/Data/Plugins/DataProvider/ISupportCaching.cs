namespace Composite.Data.Plugins.DataProvider
{
	public interface ISupportCachingDataProvider: IDataProvider
	{
        bool AllowResultsWrapping { get; }
	}
}
