using Composite.C1Console.Actions;
using System.Web.UI;


namespace Composite.Core.WebClient.FlowMediators.FormFlowRendering
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IFormFlowWebRenderingService : IFlowControllerService
    {
        /// <exclude />
        void SetNewPageOutput(Control pageOutput);

        /// <exclude />
        void SetNewPageMimeType(string mimyType);

        /// <exclude />
        Control NewPageOutput { get; }

        /// <exclude />
        string NewPageMimeType { get; }
    }
}
