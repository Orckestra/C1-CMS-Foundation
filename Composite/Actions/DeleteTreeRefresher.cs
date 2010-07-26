using System;
using Composite.ConsoleEventSystem;
using Composite.Logging;
using Composite.Security;


namespace Composite.Actions
{
    public sealed class DeleteTreeRefresher
    {
        private RelationshipGraph _beforeGraph;
        private FlowControllerServicesContainer _flowControllerServicesContainer;
        private bool _postRefreshMessegesCalled = false;
        

        public DeleteTreeRefresher(EntityToken beforeDeleteEntityToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            if (beforeDeleteEntityToken == null) throw new ArgumentNullException("beforeDeleteEntityToken");
            if (flowControllerServicesContainer == null) throw new ArgumentNullException("flowControllerServicesContainer");

            _beforeGraph = new RelationshipGraph(beforeDeleteEntityToken, RelationshipGraphSearchOption.Both);
            _flowControllerServicesContainer = flowControllerServicesContainer;            
        }



        public void PostRefreshMesseges()
        {
            PostRefreshMesseges(false);
        }



        public void PostRefreshMesseges(bool skipBeforeDeleteEntityToken)
        {
            if (_postRefreshMessegesCalled == true)
            {
                throw new InvalidOperationException("Only one PostRefreshMesseges call is allowed");
            }
            else
            {
                _postRefreshMessegesCalled = true;

                IManagementConsoleMessageService messageService = _flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

                foreach (EntityToken entityToken in RefreshDeleteEntityTokenFinder.FindEntityTokens(_beforeGraph, skipBeforeDeleteEntityToken))
                {
                    messageService.RefreshTreeSection(entityToken);
                    LoggingService.LogVerbose("DeleteTreeRefresher", string.Format("Refreshing EntityToken: Type = {0}, Source = {1}, Id = {2}, EntityTokenType = {3}", entityToken.Type, entityToken.Source, entityToken.Id, entityToken.GetType()));
                }
            }
        }
    }
}
