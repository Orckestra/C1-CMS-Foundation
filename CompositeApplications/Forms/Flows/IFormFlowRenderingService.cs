using Composite.Actions;

namespace Composite.Forms.Flows
{
    internal interface IFormFlowRenderingService : IFlowControllerService
    {
        void RerenderView();
        bool RerenderViewRequested { get; }
        bool HasFieldMessages { get; }

        void ShowFieldMessage(string fieldBindingPath, string message);
        void SetSaveStatus(bool succeeded);
    }
}
