namespace Composite.Data
{
	public interface ISetPropertyHandler
	{
        void Handle(IData data, object value);
	}
}
