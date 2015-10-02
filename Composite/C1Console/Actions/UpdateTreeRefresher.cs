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
    public sealed class UpdateTreeRefresher
    {
        private readonly FlowControllerServicesContainer _flowControllerServicesContainer;
        private readonly RelationshipGraph _beforeGraph;
        private RelationshipGraph _afterGraph;
        private bool _postRefreshMessagesCalled;


        /// <exclude />
        public UpdateTreeRefresher(EntityToken beforeUpdateEntityToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            Verify.ArgumentNotNull(beforeUpdateEntityToken, "beforeUpdateEntityToken");
            Verify.ArgumentNotNull(flowControllerServicesContainer, "flowControllerServicesContainer");

            _beforeGraph = new RelationshipGraph(beforeUpdateEntityToken, RelationshipGraphSearchOption.Both, false, false);
            _flowControllerServicesContainer = flowControllerServicesContainer;
        }

        /// <exclude />
        [Obsolete("Use PostRefreshMessages instead")]
        public void PostRefreshMesseges(EntityToken afterUpdateEntityToken)
        {
            PostRefreshMessages(afterUpdateEntityToken);
        }

        /// <exclude />
        public void PostRefreshMessages(EntityToken afterUpdateEntityToken)
        {
            if (_postRefreshMessagesCalled)
            {
                throw new InvalidOperationException("Only one PostRefreshMessages call is allowed");
            }

            _postRefreshMessagesCalled = true;

            _afterGraph = new RelationshipGraph(afterUpdateEntityToken, RelationshipGraphSearchOption.Both, false, false);

            IManagementConsoleMessageService messageService = _flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            foreach (EntityToken entityToken in RefreshBeforeAfterEntityTokenFinder.FindEntityTokens(_beforeGraph, _afterGraph))
            {
                messageService.RefreshTreeSection(entityToken);
                Log.LogVerbose(this.GetType().Name, "Refreshing EntityToken: Type = {0}, Source = {1}, Id = {2}, EntityTokenType = {3}", entityToken.Type, entityToken.Source, entityToken.Id, entityToken.GetType());
            }
        }
    }
}
