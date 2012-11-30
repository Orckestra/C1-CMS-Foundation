using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Composite.C1Console.Security;
using Composite.C1Console.Trees.Foundation;
using Composite.C1Console.Trees.Foundation.AttachmentPoints;
using Composite.Core;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// Result of parsing tree definition xml file
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [DebuggerDisplay("{TreeId}")]
    public sealed class Tree
    {
        private static readonly string LogTitle = "TreeFacade";

        /// <exclude />
        public string TreeId { get; private set; }

        /// <exclude />
        public string AllowedAttachmentApplicationName { get; internal set; }

        /// <exclude />
        public TreeNode RootTreeNode { get; internal set; }


        internal BuildProcessContext BuildProcessContext { get; set; }

        /// <summary>
        /// Gets or sets information about validation erros.
        /// </summary>
        /// <value>
        /// The build result.
        /// </value>
        /// <exclude/>
        public BuildResult BuildResult { get; set; }


        // These are used to attach this tree at current/existing places
        internal List<IAttachmentPoint> AttachmentPoints { get; private set; }
        // These are used to determin if a tree CAN be attached to a given place
        internal List<IPossibleAttachmentPoint> PossibleAttachmentPoints { get; private set; }


        internal bool ShareRootElementById { get; set; }

        /// <exclude />
        public Tree(string treeId)
        {
            this.TreeId = treeId;
            this.AttachmentPoints = new List<IAttachmentPoint>();
            this.PossibleAttachmentPoints = new List<IPossibleAttachmentPoint>();
        }


        /// <exclude />
        public TreeNode GetTreeNode(string id)
        {
            return FindTreeNode(id, this.RootTreeNode);
        }



        /// <exclude />
        public ActionNode GetActionNode(int id)
        {
            return FindActionNode(id, this.RootTreeNode);
        }



        /// <exclude />
        public bool HasAttachmentPoints(EntityToken parentEntityToken)
        {
            return this.AttachmentPoints.Any(f => f.IsAttachmentPoint(parentEntityToken));
        }



        /// <exclude />
        public bool HasPossibleAttachmentPoints(EntityToken parentEntityToken)
        {
            return this.PossibleAttachmentPoints.Any(f => f.IsPossibleAttachmentPoint(parentEntityToken));
        }



        /// <exclude />
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
            ActionNode actionNode = treeNode.ActionNodes.SingleOrDefault(f => f.Id == id);
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



        /// <exclude />
        public void LogTree()
        {
            Log.LogVerbose(LogTitle, string.Format("{0} - Tree informations:", this.TreeId));

            Log.LogVerbose(LogTitle, "Attachment points:");
            AttachmentPoints.ForEach(a => a.Log(LogTitle, indention: "  "));

            Log.LogVerbose(LogTitle, "Possible attachment points:");
            PossibleAttachmentPoints.ForEach(a => a.Log(LogTitle, indention: "  "));

            Log.LogVerbose(LogTitle, "Tree nodes:");
            this.RootTreeNode.LogTree(1);
        }
    }
}
