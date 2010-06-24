using Composite.Actions;
using System.Web.UI;


namespace Composite.WebClient.FlowMediators.FormFlowRendering
{
    public interface IFormFlowWebRenderingService : IFlowControllerService
    {
        void SetNewPageOutput(Control pageOutput);
        void SetNewPageMimeType(string mimyType);
        Control NewPageOutput { get; }
        string NewPageMimeType { get; }
    }
}
