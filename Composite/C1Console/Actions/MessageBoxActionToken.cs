using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Security;
using Composite.C1Console.Events;
using Composite.Core.Serialization;

namespace Composite.C1Console.Actions
{

    internal sealed class MessageBoxActionTokenActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            MessageBoxActionToken messageBoxActionToken = (MessageBoxActionToken)actionToken;

            IManagementConsoleMessageService managementConsoleMessageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();

            managementConsoleMessageService.ShowMessage(messageBoxActionToken.DialogType, messageBoxActionToken.Title, messageBoxActionToken.Message);

            return null;
        }
    }

    /// <summary>
    /// To add a message box action
    /// </summary>
    [ActionExecutor(typeof(MessageBoxActionTokenActionExecutor))]
    public sealed class MessageBoxActionToken : ActionToken
    {
        private readonly List<PermissionType> _permissionTypes;

        /// <summary>
        /// To add a message box action
        /// </summary>
        /// <param name="title"></param>
        /// <param name="message"></param>
        /// <param name="dialogType"></param>
        public MessageBoxActionToken(string title, string message, DialogType dialogType)
            :this(title, message, dialogType, new List<PermissionType>() { PermissionType.Add, PermissionType.Administrate, PermissionType.Approve, PermissionType.Delete, PermissionType.Edit, PermissionType.Publish, PermissionType.Read })
        {            
        }

        /// <exclude />
        public MessageBoxActionToken(string title, string message, DialogType dialogType, List<PermissionType> permissionTypes)
        {
            _permissionTypes = permissionTypes;
            this.Title = title;
            this.Message = message;
            this.DialogType = dialogType;
        }

        /// <exclude />
        public string Title { get; private set; }
        /// <exclude />
        public string Message { get; private set; }
        /// <exclude />
        public DialogType DialogType { get; private set; }

        /// <exclude />
        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }

        /// <exclude />
        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "Title", this.Title);
            StringConversionServices.SerializeKeyValuePair(sb, "Message", this.Message);
            StringConversionServices.SerializeKeyValuePair(sb, "DialogType", this.DialogType.ToString());
            StringConversionServices.SerializeKeyValuePair(sb, "PermissionTypes", _permissionTypes.SerializePermissionTypes());

            return sb.ToString();
        }

        /// <exclude />
        public static ActionToken Deserialize(string serializedData)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedData);

            return new MessageBoxActionToken
            (
                StringConversionServices.DeserializeValueString(dic["Title"]),
                StringConversionServices.DeserializeValueString(dic["Message"]),
                (DialogType)Enum.Parse(typeof(DialogType), StringConversionServices.DeserializeValueString(dic["DialogType"])),
                StringConversionServices.DeserializeValueString(dic["PermissionTypes"]).DesrializePermissionTypes().ToList()
            );
        }
    }

}
