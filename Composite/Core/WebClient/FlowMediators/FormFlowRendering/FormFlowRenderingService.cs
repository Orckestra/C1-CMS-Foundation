using System.Web.UI;

namespace Composite.Core.WebClient.FlowMediators.FormFlowRendering
{
    internal class FormFlowWebRenderingService : IFormFlowWebRenderingService
    {
        public void SetNewPageOutput(Control pageOutput)
        {
            this.NewPageOutput = pageOutput;
        }

        public void SetNewPageMimeType(string mimyType)
        {
            this.NewPageMimeType = mimyType;
        }

        public Control NewPageOutput { get; private set; }

        public string NewPageMimeType { get; private set; }

    }
}
