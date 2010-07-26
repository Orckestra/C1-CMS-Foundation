

namespace Composite.Data.Types
{
    [DataScope(DataScopeIdentifier.PublicName)]
    public interface IHostHeader
    {
        string IpAddress { get; set; }
        int? TcpPort { get; set; }
        string HostName { get; set; }
    }
}
