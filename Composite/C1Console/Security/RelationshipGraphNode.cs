using System.Diagnostics;
using System.Collections.Generic;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum RelationshipGraphNodeType
    {
        Entity,
        Hooking
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("Level = {Level}, Type = {NodeType}, EntityToken = {EntityToken}")]
    public sealed class RelationshipGraphNode
    {
        internal RelationshipGraphNode(EntityToken entityToken, int level, RelationshipGraphNodeType relationshipGraphNodeType)
        {
            this.EntityToken = entityToken;
            this.Level = level;
            this.NodeType = relationshipGraphNodeType;
            this.ChildNode = null;
            this.ParentNodes = new List<RelationshipGraphNode>();
        }


        public EntityToken EntityToken
        {
            get;
            private set;
        }


        public int Level
        {
            get;
            private set;
        }


        public RelationshipGraphNodeType NodeType
        {
            get;
            private set;
        }

        public List<RelationshipGraphNode> ParentNodes
        {
            get;
            set;
        }

        public RelationshipGraphNode ChildNode
        {
            get;
            set;
        }
    }
}
