
namespace Composite.C1Console.Forms.WebChannel
{
    internal class WebStandardsChannel : IFormChannelIdentifier
    {
        private static IFormChannelIdentifier _instance = new WebStandardsChannel();

        public static IFormChannelIdentifier Identifier { get { return _instance; } }

        private WebStandardsChannel() { }

        public string ChannelName { get { return "AspNet.WebStandards"; } }

        public override string ToString()
        {
            throw new System.Exception("Treated as string here!");
        }
    }
}