using Composite.Actions;
using System.Web.UI;


namespace Composite.WebClient.FlowMediators.FormFlowRendering
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IFormFlowWebRenderingService : IFlowControllerService
    {
        void SetNewPageOutput(Control pageOutput);
        void SetNewPageMimeType(string mimyType);
        Control NewPageOutput { get; }
        string NewPageMimeType { get; }
    }
}
