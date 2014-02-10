using System;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.C1Console.Security;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class AddNewTreeRefresher
    {
        private readonly FlowControllerServicesContainer _flowControllerServicesContainer;
        private readonly RelationshipGraph _beforeGraph;
        private RelationshipGraph _afterGraph;
        private bool _postRefreshMessegesCalled;


        /// <exclude />
        public AddNewTreeRefresher(EntityToken parentEntityToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            Verify.ArgumentNotNull(parentEntityToken, "parentEntityToken");
            Verify.ArgumentNotNull(flowControllerServicesContainer, "flowControllerServicesContainer");

            _beforeGraph = new RelationshipGraph(parentEntityToken, RelationshipGraphSearchOption.Both, false, false);
            _flowControllerServicesContainer = flowControllerServicesContainer;
        }



        /// <exclude />
        public void PostRefreshMesseges(EntityToken newChildEntityToken)
        {
            Verify.ArgumentNotNull(newChildEntityToken, "newChildEntityToken");
            Verify.That(!_postRefreshMessegesCalled, "Only one PostRefreshMesseges call is allowed");

            _postRefreshMessegesCalled = true;

            _afterGraph = new RelationshipGraph(newChildEntityToken, RelationshipGraphSearchOption.Both, false, false);

            IManagementConsoleMessageService messageService = _flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            foreach (EntityToken entityToken in RefreshBeforeAfterEntityTokenFinder.FindEntityTokens(_beforeGraph, _afterGraph))
            {
                messageService.RefreshTreeSection(entityToken);
                Log.LogVerbose("AddNewTreeRefresher", string.Format("Refreshing EntityToken: Type = {0}, Source = {1}, Id = {2}, EntityTokenType = {3}", entityToken.Type, entityToken.Source, entityToken.Id, entityToken.GetType()));
            }
        }
    }
}
