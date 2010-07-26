
namespace Composite.Forms.WebChannel
{
    public class WebManagementChannel : IFormChannelIdentifier
    {
        private static IFormChannelIdentifier _instance = new WebManagementChannel();

        public static IFormChannelIdentifier Identifier { get { return _instance; } }

        private WebManagementChannel() { }

        public string ChannelName { get { return "AspNet.Management"; } }

        public override string ToString()
        {
            throw new System.Exception("Treated as string here!");
        }
    }
}

