using System;
using System.Linq;
using Composite.C1Console.Events;
using Composite.Core.Logging;
using Composite.C1Console.Security;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class SpecificTreeRefresher
    {
        private bool _postRefreshMessegesCalled = false;
        private FlowControllerServicesContainer _flowControllerServicesContainer;


        /// <exclude />
        public SpecificTreeRefresher(FlowControllerServicesContainer flowControllerServicesContainer)
        {
            if (flowControllerServicesContainer == null) throw new ArgumentNullException("flowControllerServicesContainer");

            _flowControllerServicesContainer = flowControllerServicesContainer;
        }


        /// <exclude />
        public void PostRefreshMesseges(EntityToken specificEntityToken)
        {
            if (specificEntityToken == null) throw new ArgumentNullException("specificEntityToken");


            if (_postRefreshMessegesCalled == true)
            {
                throw new InvalidOperationException("Only one PostRefreshMesseges call is allowed");
            }
            else
            {
                IManagementConsoleMessageService messageService = _flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

                messageService.RefreshTreeSection(specificEntityToken);

                LoggingService.LogVerbose("SpecificTreeRefresher", string.Format("Refreshing EntityToken: Type = {0}, Source = {1}, Id = {2}, EntityTokenType = {3}", specificEntityToken.Type, specificEntityToken.Source, specificEntityToken.Id, specificEntityToken.GetType()));
            }
        }
    }
}
