using System;
using System.Linq;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Linq;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ParentTreeRefresher
	{
        private bool _postRefreshMessagesCalled;
        private readonly FlowControllerServicesContainer _flowControllerServicesContainer;


        /// <exclude />
        public ParentTreeRefresher(FlowControllerServicesContainer flowControllerServicesContainer)
        {
            Verify.ArgumentNotNull(flowControllerServicesContainer, "flowControllerServicesContainer");

            _flowControllerServicesContainer = flowControllerServicesContainer;
        }


        /// <exclude />
        [Obsolete("Use PostRefreshMessages instead")]
        public void PostRefreshMesseges(EntityToken childEntityToken)
        {
            PostRefreshMessages(childEntityToken);
        }


        /// <exclude />
        [Obsolete("Use PostRefreshMessages instead")]
        public void PostRefreshMesseges(EntityToken childEntityToken, int parentLevel)
        {
            PostRefreshMessages(childEntityToken, parentLevel);
        }

        /// <summary>
        /// Posts refresh messages to the ancestors of the specified entityToken
        /// </summary>
        /// <param name="childEntityToken"></param>
        /// <param name="parentLevel">1 means the first parent, 2 means the second, etc.</param>
        public void PostRefreshMessages(EntityToken childEntityToken, int parentLevel = 1)
        {
            Verify.ArgumentNotNull(childEntityToken, "childEntityToken");

            if (_postRefreshMessagesCalled)
            {
                throw new InvalidOperationException("Only one PostRefreshMessages call is allowed");
            }

            _postRefreshMessagesCalled = true;

            RelationshipGraph relationshipGraph = new RelationshipGraph(childEntityToken, RelationshipGraphSearchOption.Both);

            var levels = relationshipGraph.Levels.Evaluate();

            if (levels.Count <= parentLevel)
            {
                return;
            }

            RelationshipGraphLevel relationshipGraphLevel = levels.ElementAt(parentLevel);

            IManagementConsoleMessageService messageService = _flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            foreach (EntityToken entityToken in relationshipGraphLevel.AllEntities)
            {
                messageService.RefreshTreeSection(entityToken);
                Log.LogVerbose(this.GetType().Name, "Refreshing EntityToken: Type = {0}, Source = {1}, Id = {2}, EntityTokenType = {3}", entityToken.Type, entityToken.Source, entityToken.Id, entityToken.GetType());
            }
        }
	}
}
