using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Core.ResourceSystem;
using Composite.Data.ProcessControlled;
using Composite.Core.ResourceSystem.Icons;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;

namespace Composite.Data
{
    internal static class DataIconFacade
    {
        public static ResourceHandle DataIcon = GetIconHandle("data");
        public static ResourceHandle DataDraftIcon { get { return GetIconHandle("data-draft"); } }
        public static ResourceHandle DataAwaitingApprovalIcon { get { return GetIconHandle("data-awaiting-approval"); } }
        public static ResourceHandle DataAwaitingPublicationIcon { get { return GetIconHandle("data-awaiting-publication"); } }
        public static ResourceHandle DataPublishedIcon { get { return GetIconHandle("data-published"); } }
        public static ResourceHandle DataGhostedIcon { get { return GetIconHandle("data-ghosted"); } }
        public static ResourceHandle DataDisabledIcon { get { return GetIconHandle("data-disabled"); } }
        


        public static ResourceHandle GetIcon(this IData data)
        {
            IPublishControlled publishControlled = data as IPublishControlled;

            if (publishControlled != null)
            {
                switch (publishControlled.PublicationStatus)
                {
                    case GenericPublishProcessController.Draft:
                        return DataDraftIcon;

                    case GenericPublishProcessController.AwaitingApproval:
                        return DataAwaitingApprovalIcon;

                    case GenericPublishProcessController.AwaitingPublication:
                        return DataAwaitingPublicationIcon;

                    case GenericPublishProcessController.Published:
                        return DataPublishedIcon;

                    default:
                        throw new NotImplementedException();
                }
            }
            else
            {
                return DataIcon;
            }
        }



        public static ResourceHandle GetForeignIcon(this IData data)
        {
            if (data.IsLocaleDisabled() == false)
            {
                return DataGhostedIcon;
            }
            else
            {
                return DataDisabledIcon;
            }
        }



        public static bool IsLocaleDisabled(this IData data)
        {
            IPublishControlled publishControlled = data as IPublishControlled;

            if (publishControlled != null)
            {
                switch (publishControlled.PublicationStatus)
                {
                    case GenericPublishProcessController.Draft:
                        return true;

                    case GenericPublishProcessController.AwaitingApproval:
                        return true;

                    case GenericPublishProcessController.AwaitingPublication:
                        return false;

                    case GenericPublishProcessController.Published:
                        return false;                    

                    default:
                        throw new NotImplementedException();
                }
            }
            else
            {
                return false;
            }
        }


        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}
