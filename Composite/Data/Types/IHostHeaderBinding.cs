

namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DataScope(DataScopeIdentifier.PublicName)]
    public interface IHostHeader
    {
        string IpAddress { get; set; }
        int? TcpPort { get; set; }
        string HostName { get; set; }
    }
}
