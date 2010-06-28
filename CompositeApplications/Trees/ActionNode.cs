using System;
using System.Collections.Generic;
using System.Text;
using Composite.Data;
using Composite.Elements;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.Serialization;


namespace Composite.Trees
{
	internal abstract class ActionNode
	{
        private static string TreeIdSerializedKeyName = "_TreeId_";
        private static string ActionNodeIdSerializedKeyName = "_ActionNodeId_";


        public string XPath { get; internal set; }
        public int Id { get; internal set; }

        public string Label { get; set; }                                   // Requried
        public string ToolTip { get; set; }                                 // Defaults to Label
        public ResourceHandle Icon { get; internal set; }                   // Requried
        public ActionLocation Location { get; internal set; }               // Optional
        public List<PermissionType> PermissionTypes { get; internal set; }  // Optional

        public TreeNode OwnerNode { get; internal set; }

        // Cached values
        private DynamicValuesHelper LabelDynamicValuesHelper { get; set; }
        private DynamicValuesHelper ToolTipDynamicValuesHelper { get; set; }        


        protected abstract void OnAddAction(Action<ElementAction> actionAdder, EntityToken parentEntityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext);
        protected virtual void OnInitialize() { }


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



        public void AddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext)
        {
            IData dataItem = null;
            if ((entityToken is DataEntityToken) == true)
            {
                dataItem = (entityToken as DataEntityToken).Data;
            }

            DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext = new DynamicValuesHelperReplaceContext()
            {
                CurrentDataItem = dataItem,
                PiggybagDataFinder = new PiggybagDataFinder(dynamicContext.Piggybag, dynamicContext.CurrentEntityToken)
            };

            OnAddAction(actionAdder, entityToken, dynamicContext, dynamicValuesHelperReplaceContext);
        }



        public string Serialize()
        {
            StringBuilder sb = new StringBuilder();
            Serialize(sb);
            return sb.ToString();
        }



        public void Serialize(StringBuilder sb)
        {
            StringConversionServices.SerializeKeyValuePair(sb, TreeIdSerializedKeyName, this.OwnerNode.Tree.TreeId);
            StringConversionServices.SerializeKeyValuePair(sb, ActionNodeIdSerializedKeyName, this.Id);
        }



        public static ActionNode Deserialize(string serializedString)
        {
            Dictionary<string, string> serializedValueCollection = StringConversionServices.ParseKeyValueCollection(serializedString);

            return Deserialize(serializedValueCollection);
        }



        public static ActionNode Deserialize(Dictionary<string, string> serializedValueCollection, bool removeEntiresFromCollection = false)
        {
            string treeId = StringConversionServices.DeserializeValueString(serializedValueCollection[TreeIdSerializedKeyName]);
            int actionNodeId = StringConversionServices.DeserializeValueInt(serializedValueCollection[ActionNodeIdSerializedKeyName]);

            if (removeEntiresFromCollection == true)
            {
                serializedValueCollection.Remove(TreeIdSerializedKeyName);
                serializedValueCollection.Remove(ActionNodeIdSerializedKeyName);
            }

            Tree tree = TreeFacade.GetTree(treeId);
            if (tree == null) return null;

            ActionNode actionNode = tree.GetActionNode(actionNodeId);
            return actionNode;
        }



        protected void AddValidationError(ValidationError validationError)
        {
            
            this.OwnerNode.Tree.BuildResult.AddValidationError(validationError);
        }



        protected void AddValidationError(string stringName, params object[] args)
        {
            this.OwnerNode.Tree.BuildResult.AddValidationError(ValidationError.Create(this.XPath, stringName, args));
        }
	}
}
