using System.Runtime.Serialization;

namespace Composite.Core.WebClient.PhantomJs
{
    [DataContract]
    internal class CookieInformation
    {
        [DataMember]
        public string name { get; set; }

        [DataMember]
        public string value { get; set; }

        [DataMember]
        public string domain { get; set; }
    }

    [DataContract]
    internal class RenderPreviewRequest
    {
        [DataMember]
        public string requestId { get; set; }

        [DataMember]
        public string mode { get; set; }

        [DataMember]
        public string url { get; set; }

        [DataMember]
        public string outputFilePath { get; set; }

        [DataMember]
        public CookieInformation[] cookies { get; set; }
    }
}
