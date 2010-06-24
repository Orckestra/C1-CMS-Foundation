namespace Composite.Data
{
	public interface IDataWrapper
	{
        IData WrappedData { get; }
        void CommitData();
	}
}
