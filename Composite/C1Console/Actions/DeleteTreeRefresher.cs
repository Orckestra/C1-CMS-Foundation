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
    public sealed class DeleteTreeRefresher
    {
        private RelationshipGraph _beforeGraph;
        private FlowControllerServicesContainer _flowControllerServicesContainer;
        private bool _postRefreshMessegesCalled = false;


        /// <exclude />
        public DeleteTreeRefresher(EntityToken beforeDeleteEntityToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            if (beforeDeleteEntityToken == null) throw new ArgumentNullException("beforeDeleteEntityToken");
            if (flowControllerServicesContainer == null) throw new ArgumentNullException("flowControllerServicesContainer");

            _beforeGraph = new RelationshipGraph(beforeDeleteEntityToken, RelationshipGraphSearchOption.Both);
            _flowControllerServicesContainer = flowControllerServicesContainer;            
        }



        /// <exclude />
        public void PostRefreshMesseges()
        {
            PostRefreshMesseges(false);
        }



        /// <exclude />
        public void PostRefreshMesseges(bool skipBeforeDeleteEntityToken)
        {
            if (_postRefreshMessegesCalled)
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
