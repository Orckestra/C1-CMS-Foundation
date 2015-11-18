using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using Composite.Core.Extensions;
using Composite.C1Console.Security.Foundation;
using Composite.C1Console.Users;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class RelationshipOrientedGraphNodeExtensions
    {
        /// <exclude />
        public static IEnumerable<IEnumerable<EntityToken>> GetAllPaths(this RelationshipOrientedGraphNode node)
        {
            List<List<EntityToken>> allPaths = new List<List<EntityToken>>();
            List<EntityToken> path = new List<EntityToken> { node.EntityToken };
            allPaths.Add(path);

            GetAllPathsImpl(node, path, allPaths, new List<RelationshipOrientedGraphNode>());

            return allPaths;
        }




        private static void GetAllPathsImpl(RelationshipOrientedGraphNode node, List<EntityToken> currentPath, List<List<EntityToken>> allPaths, List<RelationshipOrientedGraphNode> processedNodes)
        {
            processedNodes.Add(node);

            int count = node.Parents.Count();

            if (count == 0)
            {
                return;
            }

            if (count == 1)
            {
                RelationshipOrientedGraphNode parentNode = node.Parents.Single();
                if (!processedNodes.Contains(parentNode))
                {
                    currentPath.Add(parentNode.EntityToken);

                    GetAllPathsImpl(parentNode, currentPath, allPaths, processedNodes);
                }
                return;
            }
            
            allPaths.Remove(currentPath);
            foreach (RelationshipOrientedGraphNode parentNode in node.Parents)
            {
                if (!processedNodes.Contains(parentNode))
                {
                    var newCurrentPath = new List<EntityToken>(currentPath);
                    allPaths.Add(newCurrentPath);
                    newCurrentPath.Add(parentNode.EntityToken);

                    GetAllPathsImpl(parentNode, newCurrentPath, allPaths, new List<RelationshipOrientedGraphNode>(processedNodes));
                }
            }
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("EntityToken = {EntityToken}")]
    public sealed class RelationshipOrientedGraphNode
    {
        private List<RelationshipOrientedGraphNode> _parentNodes;
        private Action<RelationshipOrientedGraphNode> _expandAction;


        /// <exclude />
        public RelationshipOrientedGraphNode(EntityToken entityToken, Action<RelationshipOrientedGraphNode> expandAction)
        {
            this.EntityToken = entityToken;
            _expandAction = expandAction;
        }



        /// <exclude />
        public EntityToken EntityToken { get; private set; }



        /// <exclude />
        public IEnumerable<RelationshipOrientedGraphNode> Parents
        {
            get
            {
                Expand();

                foreach (RelationshipOrientedGraphNode parentNode in _parentNodes)
                {
                    yield return parentNode;
                }
            }
        }



        internal void Expand()
        {
            if (_parentNodes != null) return;

            _parentNodes = new List<RelationshipOrientedGraphNode>();

            _expandAction(this);
        }



        internal void AddParant(RelationshipOrientedGraphNode parentNode)
        {
            if (_parentNodes.Contains(parentNode) == false)
            {
                _parentNodes.Add(parentNode);
            }
        }



        /// <exclude />
        public override int GetHashCode()
        {
            return this.EntityToken.GetHashCode();
        }



        /// <exclude />
        public override bool Equals(object obj)
        {
            return Equals(obj as RelationshipOrientedGraphNode);
        }



        /// <exclude />
        public bool Equals(RelationshipOrientedGraphNode node)
        {
            if (node == null) return false;

            return node.EntityToken.Equals(this.EntityToken);
        }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class RelationshipOrientedGraph
    {
        private List<RelationshipOrientedGraphNode> _nodes = new List<RelationshipOrientedGraphNode>();


        /// <exclude />
        public RelationshipOrientedGraph(EntityToken sourceEntityToken)
        {
            RelationshipOrientedGraphNode node = CreateNewNode(sourceEntityToken);

            _nodes.Add(node);
        }



        /// <exclude />
        public RelationshipOrientedGraphNode Root
        {
            get
            {
                return _nodes[0];
            }
        }



        private void Expand(RelationshipOrientedGraphNode node)
        {
            IEnumerable<EntityToken> nativeParentEntityTokens = SecurityAncestorFacade.GetParents(node.EntityToken);
            if (nativeParentEntityTokens != null)
            {
                nativeParentEntityTokens.ForEach(f => AddEntityToken(node, f));
            }


            IEnumerable<EntityToken> auxiliaryParentEntityTokens = AuxiliarySecurityAncestorFacade.GetParents(node.EntityToken);
            if (auxiliaryParentEntityTokens != null)
            {
                auxiliaryParentEntityTokens.ForEach(f => AddEntityToken(node, f));
            }


            IEnumerable<EntityToken> hookingParentEntityTokens = HookingFacade.GetHookies(node.EntityToken);
            if (hookingParentEntityTokens != null)
            {
                hookingParentEntityTokens.ForEach(f => AddEntityToken(node, f));
            }
        }



        private void AddEntityToken(RelationshipOrientedGraphNode node, EntityToken parentEntityToken)
        {
            RelationshipOrientedGraphNode existingParentNode =
                (from n in _nodes
                 where n.EntityToken.Equals(parentEntityToken)
                 select n).SingleOrDefault();

            if (existingParentNode != null)
            {
                node.AddParant(existingParentNode);
            }
            else
            {
                RelationshipOrientedGraphNode parentNode = CreateNewNode(parentEntityToken);
                _nodes.Add(parentNode);

                node.AddParant(parentNode);
            }
        }



        private RelationshipOrientedGraphNode CreateNewNode(EntityToken entityToken)
        {
            return new RelationshipOrientedGraphNode(entityToken, Expand);
        }
    }











    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum RelationshipGraphSearchOption
    {
        /// <summary>
        /// Parent items get from <see cref="ISecurityAncestorProvider"/>
        /// </summary>
        Native = 0,

        /// <summary>
        /// Parent items get from <see cref="IAuxiliarySecurityAncestorProvider"/> and <see cref="HookingFacade"/>
        /// </summary>
        Hooked = 1,

        /// <exclude />
        Both = 2
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class RelationshipGraph
    {
        private readonly RelationshipGraphSearchOption _searchOption;
        private readonly Dictionary<int, List<RelationshipGraphNode>> _levels = new Dictionary<int, List<RelationshipGraphNode>>();
        private readonly HashSet<EntityToken> _visitedEntityTokens = new HashSet<EntityToken>();
        private readonly bool _excludeReoccuringNodes;

        private bool _moreLevelsToExpend;

        /// <exclude />
        public RelationshipGraph(EntityToken sourceEntityToken, RelationshipGraphSearchOption searchOption)
            : this(sourceEntityToken, searchOption, false, true)
        {
        }

        /// <exclude />
        public RelationshipGraph(EntityToken sourceEntityToken, RelationshipGraphSearchOption searchOption, bool lazyEvaluation)
            : this(sourceEntityToken, searchOption, lazyEvaluation, true)
        {
        }


        /// <exclude />
        public RelationshipGraph(EntityToken sourceEntityToken, RelationshipGraphSearchOption searchOption, bool lazyEvaluation, bool excludeReoccuringNodes)
        {
            _excludeReoccuringNodes = excludeReoccuringNodes;

            Verify.ArgumentNotNull(sourceEntityToken, "sourceEntityToken");

            _searchOption = searchOption;

            RelationshipGraphNode node = new RelationshipGraphNode(sourceEntityToken, 0, RelationshipGraphNodeType.Entity);
            _levels.Add(0, new List<RelationshipGraphNode> { node });

            string userName = UserValidationFacade.IsLoggedIn() ? UserSettings.Username : null;

            ExpandNextLevel(userName);

            if (lazyEvaluation == false)
            {
                while (_moreLevelsToExpend)
                {
                    ExpandNextLevel(userName);
                }
            }
        }



        /// <exclude />
        public IEnumerable<RelationshipGraphLevel> Levels
        {
            get
            {
                return new RelationshipGraphLevelEnumerable(this);
            }
        }



        /// <exclude />
        public IEnumerable<RelationshipGraphNode> TopNodes
        {
            get
            {
                Verify.That(!_excludeReoccuringNodes, "It is necessary to set 'excludeReoccuringNodes' to 'false' to enable TopNodes calculation.");

                foreach (List<RelationshipGraphNode> nodes in _levels.Values)
                {
                    foreach (RelationshipGraphNode node in nodes)
                    {
                        if (node.ParentNodes.Count == 0)
                        {
                            yield return node;
                        }
                    }
                }
            }
        }



        /// <exclude />
        public IEnumerable<RelationshipGraphNode> BottomNodes
        {
            get
            {
                foreach (List<RelationshipGraphNode> nodes in _levels.Values)
                {
                    foreach (RelationshipGraphNode node in nodes)
                    {
                        if (node.ChildNode == null)
                        {
                            yield return node;
                        }
                    }
                }
            }
        }



        /// <exclude />
        public override string ToString()
        {
            var sb = new StringBuilder();

            foreach (RelationshipGraphLevel level in this.Levels)
            {
                sb.AppendLine("Level: " + level.Level);
                foreach (EntityToken entityToken in level.Entities)
                {
                    sb.AppendLine("Native: Type = " + entityToken.Type + " Source = " + entityToken.Source + " Id = " + entityToken.Id);
                }

                foreach (EntityToken entityToken in level.HookedEntities)
                {
                    sb.AppendLine("Hooked: Type = " + entityToken.Type + " Source = " + entityToken.Source + " Id = " + entityToken.Id);
                }

                sb.AppendLine("---------");
            }

            return sb.ToString();
        }


        internal int LevelCount
        {
            get
            {
                return _levels.Count;
            }
        }



        internal RelationshipGraphLevel GetLevel(int level)
        {
            string userName = UserValidationFacade.IsLoggedIn() ? UserSettings.Username : null;

            while ((_levels.Count - 1 < level) && (_moreLevelsToExpend))
            {
                ExpandNextLevel(userName);
            }

            if (_levels.Count - 1 < level)
            {
                return null;
            }

            return new RelationshipGraphLevel(level, _levels[level]);
        }



        private void ExpandNextLevel(string userName)
        {
            int levelNumber = _levels.Count - 1;

            if (levelNumber > 1000)
            {
                throw new InvalidOperationException( $"The entity token '{_levels[0][0].EntityToken}' has more than 1000 levels of parents, this might be an infinite loop");
            }

            _moreLevelsToExpend = false;

            List<RelationshipGraphNode> nodes = _levels[levelNumber];

            if (nodes.Count > 1000)
            {
                throw new InvalidOperationException($"The entity token '{_levels[0][0].EntityToken}' has more than 1000 nodes at the level {levelNumber}, this might be an infinite loop");
            }


            foreach (RelationshipGraphNode node in nodes)
            {
                if (_searchOption == RelationshipGraphSearchOption.Native || _searchOption == RelationshipGraphSearchOption.Both)
                {
                    IEnumerable<EntityToken> parentEntityTokens;
                    if (!EntityTokenCacheFacade.GetCachedNativeParents(node.EntityToken, out parentEntityTokens, userName))
                    {
                        parentEntityTokens = SecurityAncestorFacade.GetParents(node.EntityToken);

                        EntityTokenCacheFacade.AddNativeCache(node.EntityToken, parentEntityTokens);
                    }

                    if (parentEntityTokens != null)
                    {
                        AddNewParentEntityTokens(node, parentEntityTokens, RelationshipGraphNodeType.Entity, levelNumber);
                    }
                }

                if (_searchOption == RelationshipGraphSearchOption.Hooked || _searchOption == RelationshipGraphSearchOption.Both)
                {
                    IEnumerable<EntityToken> parentEntityTokens;

                    if (!EntityTokenCacheFacade.GetCachedHookingParents(node.EntityToken, out parentEntityTokens, userName))
                    {
                        IEnumerable<EntityToken> auxiliaryParentEntityTokens = AuxiliarySecurityAncestorFacade.GetParents(node.EntityToken);
                        IEnumerable<EntityToken> hookingParentEntityTokens = HookingFacade.GetHookies(node.EntityToken);

                        parentEntityTokens = auxiliaryParentEntityTokens.ConcatOrDefault(hookingParentEntityTokens);

                        EntityTokenCacheFacade.AddHookingCache(node.EntityToken, parentEntityTokens);
                    }

                    if (parentEntityTokens != null)
                    {
                        AddNewParentEntityTokens(node, parentEntityTokens, RelationshipGraphNodeType.Hooking, levelNumber);
                    }                        
                }
            }
        }



        private void AddNewParentEntityTokens(RelationshipGraphNode childNode, IEnumerable<EntityToken> parents, RelationshipGraphNodeType nodeType, int levelNumber)
        {
            int newLevelNumber = levelNumber + 1;

            List<RelationshipGraphNode> levelNodes;
            if (!_levels.TryGetValue(newLevelNumber, out levelNodes))
            {
                levelNodes = new List<RelationshipGraphNode>();
                _levels.Add(newLevelNumber, levelNodes);
            }


            foreach (EntityToken parent in parents)
            {
                if(parent == null)
                {
                    continue;
                }

                if (_visitedEntityTokens.Contains(parent))
                {
                    if (_excludeReoccuringNodes)
                    {
                        continue; // We have already visited this entity token, no new information here
                    }
                }
                else
                {
                    _visitedEntityTokens.Add(parent);
                }
                
            
                var parentNode = new RelationshipGraphNode(parent, newLevelNumber, nodeType);

                levelNodes.Add(parentNode);

                childNode.ParentNodes.Add(parentNode);
                parentNode.ChildNode = childNode;

                _moreLevelsToExpend = true;
            }
        }
    }
}
