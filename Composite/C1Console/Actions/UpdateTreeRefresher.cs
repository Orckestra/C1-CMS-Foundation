using System;
using Composite.C1Console.Events;
using Composite.Core.Logging;
using Composite.C1Console.Security;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class UpdateTreeRefresher
    {
        private readonly FlowControllerServicesContainer _flowControllerServicesContainer;
        private readonly RelationshipGraph _beforeGraph;
        private RelationshipGraph _afterGraph;
        private bool _postRefreshMessegesCalled;


        /// <exclude />
        public UpdateTreeRefresher(EntityToken beforeUpdateEntityToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            Verify.ArgumentNotNull(beforeUpdateEntityToken, "beforeUpdateEntityToken");
            Verify.ArgumentNotNull(flowControllerServicesContainer, "flowControllerServicesContainer");

            _beforeGraph = new RelationshipGraph(beforeUpdateEntityToken, RelationshipGraphSearchOption.Both, false, false);
            _flowControllerServicesContainer = flowControllerServicesContainer;
        }


        /// <exclude />
        public void PostRefreshMesseges(EntityToken afterUpdateEntityToken)
        {
            if (_postRefreshMessegesCalled)
            {
                throw new InvalidOperationException("Only one PostRefreshMesseges call is allowed");
            }
            
            _postRefreshMessegesCalled = true;

            _afterGraph = new RelationshipGraph(afterUpdateEntityToken, RelationshipGraphSearchOption.Both, false, false);

            IManagementConsoleMessageService messageService = _flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            foreach (EntityToken entityToken in RefreshBeforeAfterEntityTokenFinder.FindEntityTokens(_beforeGraph, _afterGraph))
            {
                messageService.RefreshTreeSection(entityToken);
                LoggingService.LogVerbose("UpdateTreeRefresher", string.Format("Refreshing EntityToken: Type = {0}, Source = {1}, Id = {2}, EntityTokenType = {3}", entityToken.Type, entityToken.Source, entityToken.Id, entityToken.GetType()));
            }
        }
    }
}
