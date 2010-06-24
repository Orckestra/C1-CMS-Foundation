using System;
using System.Collections.Generic;


namespace Composite.Trees.Foundation
{
    internal sealed class BuildProcessContext
    {
        private int _nodeIdCounter;
        private List<string> _usedIds = new List<string>();

        public BuildProcessContext()
        {
            _nodeIdCounter = 0;
            this.ActionIdCounter = 0;
            this.FilterIdCounter = 0;
        }

        
        public int ActionIdCounter;
        public int FilterIdCounter;



        public string CreateNewNodeId()
        {
            return string.Format("NodeAutoId_{0}", _nodeIdCounter++);
        }




        public bool AlreadyUsed(string id)
        {
            return _usedIds.Contains(id);
        }



        public void AddUsedId(string id)
        {
            _usedIds.Add(id);
        }



        public Dictionary<Type, List<TreeNode>> DataInteraceToTreeNodes = new Dictionary<Type, List<TreeNode>>();
    }
}
