using System.Collections.Generic;

namespace Composite.Core.WebClient.PhantomJs
{
    internal class RenderingResult
    {
        public RenderingResultStatus Status { get; set; }
        public string FilePath { get; set; }
        public ICollection<string> Output { get; set; }
        public string RedirectUrl { get; set; }
    }
}
