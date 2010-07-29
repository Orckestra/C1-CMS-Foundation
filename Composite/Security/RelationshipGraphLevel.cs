using System.Linq;
using System.Collections.Generic;


namespace Composite.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class RelationshipGraphLevel
    {
        private List<RelationshipGraphNode> _relationshipGraphNodes;

        internal RelationshipGraphLevel(int level, List<RelationshipGraphNode> relationshipGraphNodes)
        {
            this.Level = level;
            this._relationshipGraphNodes = relationshipGraphNodes;
        }


        public int Level
        {
            get;
            private set;
        }


        public IEnumerable<EntityToken> Entities
        {
            get
            {
                return
                    from node in _relationshipGraphNodes
                    where node.NodeType == RelationshipGraphNodeType.Entity
                    select node.EntityToken;
            }
        }


        public IEnumerable<EntityToken> HookedEntities
        {
            get
            {
                return
                 from node in _relationshipGraphNodes
                 where node.NodeType == RelationshipGraphNodeType.Hooking
                 select node.EntityToken;
            }
        }


        public IEnumerable<EntityToken> AllEntities
        {
            get
            {
                return
                  from node in _relationshipGraphNodes
                  select node.EntityToken;
            }
        }
    }
}
