using Composite.Actions;

namespace Composite.Forms.Flows
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IFormFlowRenderingService : IFlowControllerService
    {
        void RerenderView();
        bool RerenderViewRequested { get; }
        bool HasFieldMessages { get; }

        void ShowFieldMessage(string fieldBindingPath, string message);
        void SetSaveStatus(bool succeeded);
    }
}
