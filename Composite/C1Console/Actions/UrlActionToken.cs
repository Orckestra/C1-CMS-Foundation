using System;
using System.Collections.Generic;
using Composite.C1Console.Security;
using Composite.C1Console.Events;
using System.Web;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;


namespace Composite.C1Console.Actions
{
    /// <summary>
    /// To add a custom URL action
    /// </summary>
    [ActionExecutor(typeof(UrlActionTokenActionExecutor))]
    public sealed class UrlActionToken : ActionToken
    {
        /// <summary>
        /// To add a custom URL action
        /// </summary>
        /// <param name="label"></param>
        /// <param name="url"></param>
        /// <param name="permissionTypes"></param>
        public UrlActionToken(string label, string url, IEnumerable<PermissionType> permissionTypes)
            : this(label, DefaultIcon, url, permissionTypes)
        {
        }

        /// <summary>
        /// To add a custom URL action
        /// </summary>
        /// <param name="label"></param>
        /// <param name="url"></param>
        /// <param name="icon"></param>
        /// <param name="permissionTypes"></param>
        public UrlActionToken(string label, ResourceHandle icon, string url, IEnumerable<PermissionType> permissionTypes)
        {
            Label = label;
            Url = url;
            PermissionTypes = permissionTypes;
            Icon = icon;
        }

        /// <exclude />
        public string Label { get; }

        /// <exclude />
        public string Url { get; }

        /// <exclude />
        public override IEnumerable<PermissionType> PermissionTypes { get; }

        /// <exclude />
        public ResourceHandle Icon { get; }

        /// <exclude />
        public override string Serialize()
        {
            return $"{Label}·{Url}·{PermissionTypes.SerializePermissionTypes()}·{Icon.ResourceNamespace}·{Icon.ResourceName}";
        }

        private static ResourceHandle DefaultIcon => new ResourceHandle(BuildInIconProviderName.ProviderName, "page");


        /// <exclude />
        public static ActionToken Deserialize(string serializedData)
        {
            string[] s = serializedData.Split('·');

            var icon = s.Length == 5
                ? new ResourceHandle(s[3], s[4])
                : DefaultIcon;

            return new UrlActionToken(s[0], icon, s[1], s[2].DesrializePermissionTypes());
        }
    }



    internal sealed class UrlActionTokenActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            UrlActionToken urlActionToken = (UrlActionToken)actionToken;

            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

            string url = urlActionToken.Url;

            string extendedUrl = $"{url}{(url.Contains("?") ? "&" : "?")}EntityToken={HttpUtility.UrlEncode(serializedEntityToken)}";

            ConsoleMessageQueueFacade.Enqueue(
                new OpenViewMessageQueueItem
                {
                    Url = extendedUrl,
                    ViewId = Guid.NewGuid().ToString(),
                    ViewType = ViewType.Main,
                    Label = urlActionToken.Label,
                    IconResourceHandle = urlActionToken.Icon
                }, currentConsoleId);

            return null;
        }
    }
}
