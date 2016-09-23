using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;
using System.Xml.Linq;
using Composite.C1Console.Elements;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.IO;
using Composite.Core.Serialization;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public abstract class ActionNode
	{
        private static string TreeIdSerializedKeyName = "_TreeId_";
        private static string ActionNodeIdSerializedKeyName = "_ActionNodeId_";


        /// <exclude />
        public string XPath { get; internal set; }

        /// <exclude />
        public int Id { get; internal set; }


        /// <exclude />
        public string Label { get; set; }                                   // Requried

        /// <exclude />
        public string ToolTip { get; set; }                                 // Defaults to Label

        /// <exclude />
        public ResourceHandle Icon { get; internal set; }                   // Requried

        /// <exclude />
        public ActionLocation Location { get; internal set; }               // Optional

        /// <exclude />
        public List<PermissionType> PermissionTypes { get; internal set; }  // Optional

        /// <exclude />
        public TreeNode OwnerNode { get; internal set; }

        // Cached values
        private DynamicValuesHelper LabelDynamicValuesHelper { get; set; }
        private DynamicValuesHelper ToolTipDynamicValuesHelper { get; set; }


        /// <exclude />
        protected abstract void OnAddAction(Action<ElementAction> actionAdder, EntityToken parentEntityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext);

        /// <exclude />
        protected virtual void OnInitialize() { }


        /// <exclude />
        protected ActionVisualizedData CreateActionVisualizedData(DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            return new ActionVisualizedData
            {
                Label = this.LabelDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext),
                ToolTip = this.ToolTipDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext),
                Icon = this.Icon,
                Disabled = false,
                ActionLocation = this.Location
            };
        }



        /// <summary>
        /// Use this method to do initializing and validation
        /// </summary>
        internal void Initialize() 
        {
            this.LabelDynamicValuesHelper = new DynamicValuesHelper(this.Label);
            this.LabelDynamicValuesHelper.Initialize(this);

            this.ToolTipDynamicValuesHelper = new DynamicValuesHelper(this.ToolTip);
            this.ToolTipDynamicValuesHelper.Initialize(this);

            OnInitialize();
        }



        /// <exclude />
        public void AddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext)
        {
            var piggybag = dynamicContext.Piggybag;
            if (!entityToken.Equals(dynamicContext.CurrentEntityToken))
            {
                piggybag = piggybag.PreparePiggybag(dynamicContext.CurrentTreeNode, dynamicContext.CurrentEntityToken);
            }

            var replaceContext = new DynamicValuesHelperReplaceContext(entityToken, piggybag);

            OnAddAction(actionAdder, entityToken, dynamicContext, replaceContext);
        }



        /// <exclude />
        public string Serialize()
        {
            var sb = new StringBuilder();
            Serialize(sb);
            return sb.ToString();
        }



        /// <exclude />
        public void Serialize(StringBuilder sb)
        {
            StringConversionServices.SerializeKeyValuePair(sb, TreeIdSerializedKeyName, this.OwnerNode.Tree.TreeId);
            StringConversionServices.SerializeKeyValuePair(sb, ActionNodeIdSerializedKeyName, this.Id);
        }



        /// <exclude />
        public static ActionNode Deserialize(string serializedString)
        {
            Dictionary<string, string> serializedValueCollection = StringConversionServices.ParseKeyValueCollection(serializedString);

            return Deserialize(serializedValueCollection);
        }



        /// <exclude />
        public static ActionNode Deserialize(Dictionary<string, string> serializedValueCollection, bool removeEntiresFromCollection = false)
        {
            string treeId = StringConversionServices.DeserializeValueString(serializedValueCollection[TreeIdSerializedKeyName]);
            int actionNodeId = StringConversionServices.DeserializeValueInt(serializedValueCollection[ActionNodeIdSerializedKeyName]);

            if (removeEntiresFromCollection)
            {
                serializedValueCollection.Remove(TreeIdSerializedKeyName);
                serializedValueCollection.Remove(ActionNodeIdSerializedKeyName);
            }

            Tree tree = TreeFacade.GetTree(treeId);

            return tree?.GetActionNode(actionNodeId);
        }



        /// <exclude />
        protected void AddValidationError(ValidationError validationError)
        {
            this.OwnerNode.Tree.BuildResult.AddValidationError(validationError);
        }



        /// <exclude />
        protected void AddValidationError(string stringName, params object[] args)
        {
            this.OwnerNode.Tree.BuildResult.AddValidationError(ValidationError.Create(this.XPath, stringName, args));
        }


        internal string LoadAndValidateCustomFormMarkupPath(string customFormMarkupPath)
        {
            string path;

            try
            {
                path = PathUtil.Resolve(customFormMarkupPath);
                if (!C1File.Exists(path))
                {
                    AddValidationError("TreeValidationError.CustomFormMarkup.MissingFile", path);
                    return customFormMarkupPath;
                }
            }
            catch
            {
                AddValidationError("TreeValidationError.CustomFormMarkup.BadMarkupPath", customFormMarkupPath);
                return customFormMarkupPath;
            }


            try
            {
                XDocument.Load(path);
            }
            catch(Exception ex)
            {
                Log.LogError(nameof(ActionNode), $"Failed to load xml file '{path}'");
                Log.LogError(nameof(ActionNode), ex);

                AddValidationError("TreeValidationError.CustomFormMarkup.InvalidXml", customFormMarkupPath);
            }

            return path;
        }
    }
}
