using System.Reflection;
using Composite.Core.ResourceSystem;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Search.Untranslated;

namespace Composite.Search.Crawling
{
    internal class PublicationStatusDataFieldProcessor: DefaultDataFieldProcessor
    {
        public override string GetFieldLabel(PropertyInfo propertyInfo) => Texts.FieldNames_PublicationStatus;

        protected override DocumentFieldPreview.ValuePreviewDelegate GetPreviewFunction(PropertyInfo propertyInfo)
        {
            return value => GetLocalizedPublicationStatus((string) value);
        }

        protected override DocumentFieldFacet.FacetValuePreviewDelegate GetFacetValuePreviewFunction(PropertyInfo propertyInfo)
        {
            return GetLocalizedPublicationStatus;
        }

        private static string GetLocalizedPublicationStatus(string status)
        {
            switch (status)
            {
                case GenericPublishProcessController.Published:
                    return LocalizationFiles.Composite_Management.PublishingStatus_published;
                case GenericPublishProcessController.Draft:
                    return LocalizationFiles.Composite_Management.PublishingStatus_draft;
                case GenericPublishProcessController.AwaitingApproval:
                    return LocalizationFiles.Composite_Management.PublishingStatus_awaitingApproval;
                case GenericPublishProcessController.AwaitingPublication:
                    return LocalizationFiles.Composite_Management.PublishingStatus_awaitingPublication;
            }

            return status;
        }
    }
}
