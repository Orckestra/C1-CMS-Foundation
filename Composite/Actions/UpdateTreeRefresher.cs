using System;
using Composite.ConsoleEventSystem;
using Composite.Logging;
using Composite.Security;


namespace Composite.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class UpdateTreeRefresher
    {
        private RelationshipGraph _beforeGraph;
        private RelationshipGraph _afterGraph;
        private FlowControllerServicesContainer _flowControllerServicesContainer;
        private bool _postRefreshMessegesCalled = false;


        public UpdateTreeRefresher(EntityToken beforeUpdateEntityToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            if (beforeUpdateEntityToken == null) throw new ArgumentNullException("beforeUpdateEntityToken");
            if (flowControllerServicesContainer == null) throw new ArgumentNullException("flowControllerServicesContainer");

            _beforeGraph = new RelationshipGraph(beforeUpdateEntityToken, RelationshipGraphSearchOption.Both);
            _flowControllerServicesContainer = flowControllerServicesContainer;
        }



        public void PostRefreshMesseges(EntityToken afterUpdateEntityToken)
        {
            if (_postRefreshMessegesCalled == true)
            {
                throw new InvalidOperationException("Only one PostRefreshMesseges call is allowed");
            }
            else
            {
                _postRefreshMessegesCalled = true;

                _afterGraph = new RelationshipGraph(afterUpdateEntityToken, RelationshipGraphSearchOption.Both);

                IManagementConsoleMessageService messageService = _flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

                foreach (EntityToken entityToken in RefreshBeforeAfterEntityTokenFinder.FindEntityTokens(_beforeGraph, _afterGraph))
                {
                    messageService.RefreshTreeSection(entityToken);
                    LoggingService.LogVerbose("UpdateTreeRefresher", string.Format("Refreshing EntityToken: Type = {0}, Source = {1}, Id = {2}, EntityTokenType = {3}", entityToken.Type, entityToken.Source, entityToken.Id, entityToken.GetType()));
                }
            }
        }
    }
}
