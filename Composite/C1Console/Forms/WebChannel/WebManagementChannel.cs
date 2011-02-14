
namespace Composite.C1Console.Forms.WebChannel
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class WebManagementChannel : IFormChannelIdentifier
    {
        private static IFormChannelIdentifier _instance = new WebManagementChannel();

        /// <exclude />
        public static IFormChannelIdentifier Identifier { get { return _instance; } }

        private WebManagementChannel() { }

        /// <exclude />
        public string ChannelName { get { return "AspNet.Management"; } }

        /// <exclude />
        public override string ToString()
        {
            throw new System.Exception("Treated as string here!");
        }
    }
}

