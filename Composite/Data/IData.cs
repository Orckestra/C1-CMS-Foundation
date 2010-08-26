using Composite.Core.Serialization;


namespace Composite.Data
{
#warning RELEASE: Missing documentation
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SerializerHandler(typeof(DataSerializerHandler))]
    public interface IData
    {
        DataSourceId DataSourceId { get; }
    }
}
