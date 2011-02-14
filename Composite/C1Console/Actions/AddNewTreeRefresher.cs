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
    public sealed class AddNewTreeRefresher
    {
        private RelationshipGraph _beforeGraph;
        private RelationshipGraph _afterGraph;
        private FlowControllerServicesContainer _flowControllerServicesContainer;
        private bool _postRefreshMessegesCalled = false;


        /// <exclude />
        public AddNewTreeRefresher(EntityToken parentEntityToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            if (parentEntityToken == null) throw new ArgumentNullException("parentEntityToken");
            if (flowControllerServicesContainer == null) throw new ArgumentNullException("flowControllerServicesContainer");

            _beforeGraph = new RelationshipGraph(parentEntityToken, RelationshipGraphSearchOption.Both);
            _flowControllerServicesContainer = flowControllerServicesContainer;
        }



        /// <exclude />
        public void PostRefreshMesseges(EntityToken newChildEntityToken)
        {
            if (newChildEntityToken == null) throw new ArgumentNullException("newChildEntityToken");

            if (_postRefreshMessegesCalled == true)
            {
                throw new InvalidOperationException("Only one PostRefreshMesseges call is allowed");
            }

            _postRefreshMessegesCalled = true;

            _afterGraph = new RelationshipGraph(newChildEntityToken, RelationshipGraphSearchOption.Both);

            IManagementConsoleMessageService messageService = _flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            foreach (EntityToken entityToken in RefreshBeforeAfterEntityTokenFinder.FindEntityTokens(_beforeGraph, _afterGraph))
            {
                messageService.RefreshTreeSection(entityToken);
                LoggingService.LogVerbose("AddNewTreeRefresher", string.Format("Refreshing EntityToken: Type = {0}, Source = {1}, Id = {2}, EntityTokenType = {3}", entityToken.Type, entityToken.Source, entityToken.Id, entityToken.GetType()));
            }
        }
    }
}
