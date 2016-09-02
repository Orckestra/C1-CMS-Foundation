using System.Collections.Generic;
using Composite.C1Console.Actions;

namespace Composite.C1Console.Forms.Flows
{
    /// <summary>
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IFormFlowRenderingService : IFlowControllerService
    {
        /// <exclude />
        void RerenderView();

        /// <exclude />
        bool RerenderViewRequested { get; }

        /// <exclude />
        bool HasFieldMessages { get; }

        /// <exclude />
        void ShowFieldMessage(string fieldBindingPath, string message);

        /// <exclude />
        void SetSaveStatus(bool succeeded);

        /// <exclude />
        Dictionary<string, string> BindingPathedMessages { get; }
    }
}
