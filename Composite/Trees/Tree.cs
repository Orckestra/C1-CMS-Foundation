using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Composite.Logging;
using Composite.Security;
using Composite.Trees.Foundation;
using Composite.Trees.Foundation.AttachmentPoints;


namespace Composite.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [DebuggerDisplay("{TreeId}")]
    public sealed class Tree
    {
        public string TreeId { get; private set; }
        public string AllowedAttachmentApplicationName { get; internal set; }
        public TreeNode RootTreeNode { get; internal set; }


        internal BuildProcessContext BuildProcessContext { get; set; }
        public BuildResult BuildResult { get; set; }


        // These are used to attach this tree at current/existing places
        internal List<IAttachmentPoint> AttachmentPoints { get; private set; }
        // These are used to determin if a tree CAN be attached to a given place
        internal List<IPossibleAttachmentPoint> PossibleAttachmentPoints { get; private set; }


        public Tree(string treeId)
        {
            this.TreeId = treeId;
            this.AttachmentPoints = new List<IAttachmentPoint>();
            this.PossibleAttachmentPoints = new List<IPossibleAttachmentPoint>();
        }


        public TreeNode GetTreeNode(string id)
        {
            TreeNode resultTreeNode = FindTreeNode(id, this.RootTreeNode);
            if (resultTreeNode != null)
            {
                return resultTreeNode;
            }

            return null;
        }



        public ActionNode GetActionNode(int id)
        {
            ActionNode resultActionNode = FindActionNode(id, this.RootTreeNode);
            if (resultActionNode != null)
            {
                return resultActionNode;
            }

            return null;
        }



        public bool HasAttachmentPoints(EntityToken parentEntityToken)
        {
            return this.AttachmentPoints.Where(f => f.IsAttachmentPoint(parentEntityToken) == true).Any();
        }



        public bool HasPossibleAttachmentPoints(EntityToken parentEntityToken)
        {
            return this.PossibleAttachmentPoints.Where(f => f.IsPossibleAttachmentPoint(parentEntityToken) == true).Any();
        }



        public IEnumerable<IAttachmentPoint> GetAttachmentPoints(EntityToken parentEntityToken)
        {
            return this.AttachmentPoints.Where(f => f.IsAttachmentPoint(parentEntityToken));
        }



        internal void ClearAttachmentPoints<T>()
            where T : IAttachmentPoint
        {
            this.AttachmentPoints = this.AttachmentPoints.Where(f => f.GetType() != typeof(T)).ToList();
        }



        internal void AddValidationError(string xPath, string stringName, params object[] args)
        {
            this.BuildResult.AddValidationError(ValidationError.Create(xPath, stringName, args));
        }



        private TreeNode FindTreeNode(string id, TreeNode treeNode)
        {
            if (treeNode.Id == id) return treeNode;

            foreach (TreeNode childTreeNode in treeNode.ChildNodes)
            {
                TreeNode resultTreeNode = FindTreeNode(id, childTreeNode);
                if (resultTreeNode != null)
                {
                    return resultTreeNode;
                }
            }

            return null;
        }



        private ActionNode FindActionNode(int id, TreeNode treeNode)
        {
            ActionNode actionNode = treeNode.ActionNodes.Where(f => f.Id == id).SingleOrDefault();
            if (actionNode != null) return actionNode;


            foreach (TreeNode childTreeNode in treeNode.ChildNodes)
            {
                ActionNode resultActionNode = FindActionNode(id, childTreeNode);
                if (resultActionNode != null)
                {
                    return resultActionNode;
                }
            }

            return null;
        }



        public void LogTree()
        {
            LoggingService.LogVerbose("TreeFacade", string.Format("{0} - Tree informations:", this.TreeId));

            LoggingService.LogVerbose("TreeFacade", "Attachment points:");
            foreach (IAttachmentPoint attachmentPoint in this.AttachmentPoints)
            {
                attachmentPoint.Log("TreeFacade", "  ");
            }

            LoggingService.LogVerbose("TreeFacade", "Possible attachment points:");
            foreach (IPossibleAttachmentPoint possibleAttachmentPoint in this.PossibleAttachmentPoints)
            {
                possibleAttachmentPoint.Log("TreeFacade", "  ");
            }

            LoggingService.LogVerbose("TreeFacade", "Tree nodes:");
            this.RootTreeNode.LogTree(1);
        }
    }
}
