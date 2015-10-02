using System;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.Core;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class SpecificTreeRefresher
    {
        private bool _postRefreshMessagesCalled = false;
        private readonly FlowControllerServicesContainer _flowControllerServicesContainer;


        /// <exclude />
        public SpecificTreeRefresher(FlowControllerServicesContainer flowControllerServicesContainer)
        {
            Verify.ArgumentNotNull(flowControllerServicesContainer, "flowControllerServicesContainer");

            _flowControllerServicesContainer = flowControllerServicesContainer;
        }


        /// <exclude />
        [Obsolete("Use PostRefreshMessages instead")]
        public void PostRefreshMesseges(EntityToken specificEntityToken)
        {
            PostRefreshMessages(specificEntityToken);
        }

        /// <exclude />

        public void PostRefreshMessages(EntityToken specificEntityToken)
        {
            Verify.ArgumentNotNull(specificEntityToken, "specificEntityToken");

            if (_postRefreshMessagesCalled)
            {
                throw new InvalidOperationException("Only one PostRefreshMessages call is allowed");
            }

            IManagementConsoleMessageService messageService = _flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            messageService.RefreshTreeSection(specificEntityToken);

            Log.LogVerbose(GetType().Name, "Refreshing EntityToken: Type = {0}, Source = {1}, Id = {2}, EntityTokenType = {3}", specificEntityToken.Type, specificEntityToken.Source, specificEntityToken.Id, specificEntityToken.GetType());
        }
    }
}
