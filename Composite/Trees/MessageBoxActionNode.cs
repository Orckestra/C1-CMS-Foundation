using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Elements;
using Composite.Security;
using Composite.Serialization;



namespace Composite.Trees
{
    internal class MessageBoxActionNode : ActionNode
    {
        public string Title { get; set; }                                   // Required
        public string Message { get; set; }                                 // Required
        public DialogType DialogType { get; set; }                          // Optional        

        // Cached values
        private DynamicValuesHelper TitleDynamicValuesHelper { get; set; }
        private DynamicValuesHelper MessageDynamicValuesHelper { get; set; }


        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            ActionToken actionToken = new MessageBoxActionNodeActionToken(
                this.TitleDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext),
                this.MessageDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext),
                this.Serialize(), 
                this.PermissionTypes
                );

            ElementAction elementAction = new ElementAction(new ActionHandle(actionToken))
            {
                VisualData = this.CreateActionVisualizedData(dynamicValuesHelperReplaceContext)
            };

            elementAction.VisualData.ActionLocation = this.Location;

            actionAdder(elementAction);
        }



        protected override void OnInitialize()
        {
            this.TitleDynamicValuesHelper = new DynamicValuesHelper(this.Title);
            this.TitleDynamicValuesHelper.Initialize(this.OwnerNode);

            this.MessageDynamicValuesHelper = new DynamicValuesHelper(this.Message);
            this.MessageDynamicValuesHelper.Initialize(this.OwnerNode);
        }
    }



    internal sealed class MessageBoxActionNodeActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            MessageBoxActionNodeActionToken messageBoxActionNodeActionToken = (MessageBoxActionNodeActionToken)actionToken;

            MessageBoxActionNode messageBoxActionNode = (MessageBoxActionNode)ActionNode.Deserialize(messageBoxActionNodeActionToken.SerializedActionNode);            

            IManagementConsoleMessageService managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            managementConsoleMessageService.ShowMessage(
                messageBoxActionNode.DialogType, 
                messageBoxActionNodeActionToken.Title, 
                messageBoxActionNodeActionToken.Message);

            return null;
        }
    }



    [ActionExecutor(typeof(MessageBoxActionNodeActionExecutor))]
    internal sealed class MessageBoxActionNodeActionToken : ActionToken
    {
        private List<PermissionType> _permissionTypes;


        public MessageBoxActionNodeActionToken(string title, string message, string serializedActionNode, List<PermissionType> permissionTypes)
        {
            this.Title = title;
            this.Message = message;
            _permissionTypes = permissionTypes;
            this.SerializedActionNode = serializedActionNode;
        }

        public string Title { get; private set; }
        public string Message { get; private set; }
        public string SerializedActionNode { get; private set; }        

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }


        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "Title", this.Title);
            StringConversionServices.SerializeKeyValuePair(sb, "Message", this.Message);
            StringConversionServices.SerializeKeyValuePair(sb, "SerializedActionNode", this.SerializedActionNode);
            StringConversionServices.SerializeKeyValuePair(sb, "PermissionTypes", _permissionTypes.SerializePermissionTypes());            

            return sb.ToString();
        }


        public static ActionToken Deserialize(string serializedData)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedData);

            return new MessageBoxActionNodeActionToken
            (
                StringConversionServices.DeserializeValueString(dic["Title"]),
                StringConversionServices.DeserializeValueString(dic["Message"]),
                StringConversionServices.DeserializeValueString(dic["SerializedActionNode"]),
                StringConversionServices.DeserializeValueString(dic["PermissionTypes"]).DesrializePermissionTypes().ToList()
            );
        }
    }
}
