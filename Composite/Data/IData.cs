using Composite.Serialization;


namespace Composite.Data
{
    [SerializerHandler(typeof(DataSerializerHandler))]
    public interface IData
    {
        DataSourceId DataSourceId { get; }
    }
}
