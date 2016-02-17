using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Security;
using Composite.C1Console.Events;
using System.Web;


namespace Composite.C1Console.Actions
{
    /// <summary>
    /// To add a custom URL action
    /// </summary>
    [ActionExecutor(typeof(UrlActionTokenActionExecutor))]
    public sealed class UrlActionToken : ActionToken
    {
        private readonly IEnumerable<PermissionType> _permissionTypes;
        /// <summary>
        /// To add a custom URL action
        /// </summary>
        /// <param name="label"></param>
        /// <param name="url"></param>
        /// <param name="permissionTypes"></param>
        public UrlActionToken(string label, string url, IEnumerable<PermissionType> permissionTypes)
        {
            this.Url = url;
            _permissionTypes = permissionTypes;
        }

        /// <exclude />
        public string Label { get; private set; }
        /// <exclude />
        public string Url { get; private set; }

        /// <exclude />
        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }

        /// <exclude />
        public override string Serialize()
        {
            return this.Label + "·" + this.Url + "·" + this.PermissionTypes.SerializePermissionTypes();
        }


        /// <exclude />
        public static ActionToken Deserialize(string serializedData)
        {
            string[] s = serializedData.Split('·');

            return new UrlActionToken(s[0], s[1], s[2].DesrializePermissionTypes());
        }
    }



    internal sealed class UrlActionTokenActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            UrlActionToken urlActionToken = (UrlActionToken)actionToken;

            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

            string url = string.Format("{0}?EntityToken={1}", urlActionToken.Url, HttpUtility.UrlEncode(serializedEntityToken));

            ConsoleMessageQueueFacade.Enqueue(new OpenViewMessageQueueItem { Url = url, ViewId = Guid.NewGuid().ToString(), ViewType = ViewType.Main, Label = urlActionToken.Label }, currentConsoleId);

            return null;
        }
    }
}
