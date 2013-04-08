using System;
using System.Linq;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
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

            if (publishControlled == null)
            {
                return DataIcon;
            }

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
                    var allowedPublicationStatuses = new[] {
                        GenericPublishProcessController.Draft, 
                        GenericPublishProcessController.AwaitingApproval,
                        GenericPublishProcessController.AwaitingPublication, 
                        GenericPublishProcessController.Published, 
                    };

                    string allowedValues = string.Join(", ", allowedPublicationStatuses.Select(status => "'" + status + "'"));

                    throw new InvalidOperationException("Unexpected publication status '{0}'. Allowed values: {1}"
                                                         .FormatWith(publishControlled.PublicationStatus ?? "(null)", allowedValues));
            }
        }



        public static ResourceHandle GetForeignIcon(this IData data)
        {
            return data.IsTranslatable() ? DataGhostedIcon : DataDisabledIcon;
        }


        [Obsolete("Use !data.IsTranslatable() instead")]
        public static bool IsLocaleDisabled(this IData data)
        {
            return !IsTranslatable(data);
        }

        /// <summary>
        /// Checks whether the specified data item can be translated.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static bool IsTranslatable(this IData data)
        {
            IPublishControlled publishControlled = data as IPublishControlled;

            if (!GlobalSettingsFacade.OnlyTranslateWhenApproved || publishControlled == null)
            {
                return true;
            }
            
            switch (publishControlled.PublicationStatus)
            {
                case GenericPublishProcessController.Draft:
                case GenericPublishProcessController.AwaitingApproval:
                    return DataFacade.GetDataFromOtherScope(data, DataScopeIdentifier.Public).Any();

                case GenericPublishProcessController.AwaitingPublication:
                case GenericPublishProcessController.Published:
                    return true;

                default:
                    throw new InvalidOperationException("Unexpected publication status: " + (publishControlled.PublicationStatus ?? "(null)"));
            }
            
        }

        /// <summary>
        /// Returns the data item either from "Administrated" or from "Public" scope depending on, which has to be used as translation source.
        /// If onlyTranslateWhenApproved="true" or publication status is not "awaiting publishion" - item from the public scope will be returned.
        /// </summary>
        /// <param name="dataFromAdministratedScope">The data item</param>
        /// <returns></returns>
        public static T GetTranslationSource<T>(this T dataFromAdministratedScope) where T: class, IData
        {
            IPublishControlled publishControlled = dataFromAdministratedScope as IPublishControlled;

            if (!GlobalSettingsFacade.OnlyTranslateWhenApproved 
                || publishControlled == null 
                || publishControlled.PublicationStatus == GenericPublishProcessController.AwaitingPublication)
            {
                return dataFromAdministratedScope;
            }

            return (DataFacade.GetDataFromOtherScope(dataFromAdministratedScope as IData, DataScopeIdentifier.Public).FirstOrDefault() 
                    ?? dataFromAdministratedScope) as T;
        }

        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}
