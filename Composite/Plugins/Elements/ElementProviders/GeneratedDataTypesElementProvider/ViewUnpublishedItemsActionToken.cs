using System.Collections.Generic;

using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.Plugins.Elements.ElementProviders.VirtualElementProvider;
using Composite.C1Console.Events;
using Composite.Core.WebClient;
using System.Web;
using Composite.Core.ResourceSystem;

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [ActionExecutor(typeof(ViewUnpublishedItemsActionExecutor))]
    internal sealed class ViewUnpublishedItemsActionToken : ActionToken
    {
        private static IEnumerable<PermissionType> _permissionType = new PermissionType[] { PermissionType.Read };

        public ViewUnpublishedItemsActionToken()
        {
        }

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionType; }
        }

        public override string Serialize()
        {
            return "ViewUnpublishedGlobalItems";
        }


        public static ActionToken Deserialize(string serializedData)
        {
            return new ViewUnpublishedItemsActionToken();
        }
    }




    internal sealed class ViewUnpublishedItemsActionExecutor : Composite.C1Console.Actions.IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            string documentTitle = StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "ViewUnpublishedItems-document-title");
            string description = StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "ViewUnpublishedItems-document-description");
            string emptyLabel = StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "ViewUnpublishedItems-document-empty-label");
            string url = string.Format("{0}?showglobaldata=true&title={1}&description={2}&emptyLabel={3}",
                UrlUtils.ResolveAdminUrl(string.Format("content/views/publishworkflowstatus/ViewUnpublishedItems.aspx")),
                HttpUtility.UrlEncodeUnicode(documentTitle),
                HttpUtility.UrlEncodeUnicode(description),
                HttpUtility.UrlEncodeUnicode(emptyLabel));

            IManagementConsoleMessageService consoleServices = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();
            OpenViewMessageQueueItem openViewMsg = new OpenViewMessageQueueItem
            {
                EntityToken = EntityTokenSerializer.Serialize(entityToken, true),
                ViewId = "ViewUnpublishedGlobalItems",
                Label = documentTitle,
                Url = url,
                ViewType = ViewType.Main
            };

            ConsoleMessageQueueFacade.Enqueue(openViewMsg, consoleServices.CurrentConsoleId);

            return null;
        }
    }


}
