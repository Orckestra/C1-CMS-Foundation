using System;
using Composite.C1Console.Events;
using Composite.Core.Logging;
using Composite.C1Console.Security;
using Composite.Core;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DeleteTreeRefresher
    {
        private readonly RelationshipGraph _beforeGraph;
        private readonly FlowControllerServicesContainer _flowControllerServicesContainer;
        private bool _postRefreshMessagesCalled;


        /// <exclude />
        public DeleteTreeRefresher(EntityToken beforeDeleteEntityToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            Verify.ArgumentNotNull(beforeDeleteEntityToken, "beforeDeleteEntityToken");
            Verify.ArgumentNotNull(flowControllerServicesContainer, "flowControllerServicesContainer");

            _beforeGraph = new RelationshipGraph(beforeDeleteEntityToken, RelationshipGraphSearchOption.Both);
            _flowControllerServicesContainer = flowControllerServicesContainer;            
        }



        /// <exclude />
        [Obsolete("Use PostRefreshMessages instead")]
        public void PostRefreshMesseges()
        {
            PostRefreshMessages(false);
        }


        /// <exclude />
        [Obsolete("Use PostRefreshMessages instead")]
        public void PostRefreshMesseges(bool skipBeforeDeleteEntityToken)
        {
            PostRefreshMessages(skipBeforeDeleteEntityToken);
        }


        /// <exclude />
        public void PostRefreshMessages(bool skipBeforeDeleteEntityToken = false)
        {
            if (_postRefreshMessagesCalled)
            {
                throw new InvalidOperationException("Only one PostRefreshMessages call is allowed");
            }

            _postRefreshMessagesCalled = true;

            IManagementConsoleMessageService messageService = _flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            foreach (EntityToken entityToken in RefreshDeleteEntityTokenFinder.FindEntityTokens(_beforeGraph, skipBeforeDeleteEntityToken))
            {
                messageService.RefreshTreeSection(entityToken);
                Log.LogVerbose(this.GetType().Name, "Refreshing EntityToken: Type = {0}, Source = {1}, Id = {2}, EntityTokenType = {3}", entityToken.Type, entityToken.Source, entityToken.Id, entityToken.GetType());
            }
        }
    }
}
