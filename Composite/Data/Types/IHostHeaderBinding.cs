

namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DataScope(DataScopeIdentifier.PublicName)]
    public interface IHostHeader
    {
        /// <exclude />
        string IpAddress { get; set; }

        /// <exclude />
        int? TcpPort { get; set; }

        /// <exclude />
        string HostName { get; set; }
    }
}
