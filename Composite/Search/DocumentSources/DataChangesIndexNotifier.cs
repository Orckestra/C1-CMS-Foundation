using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;

namespace Composite.Search.DocumentSources
{
    internal class DataChangesIndexNotifier
    {
        const string LogTitle = nameof(DataChangesIndexNotifier);

        private readonly IEnumerable<IDocumentSourceListener> _listeners;
        private readonly Type _interfaceType;

        private Func<IData, CultureInfo, SearchDocument> GetDocument { get; }
        private Func<IData, string> GetDocumentId { get; }

        public DataChangesIndexNotifier(
            IEnumerable<IDocumentSourceListener> listeners,
            Type interfaceType, 
            Func<IData, CultureInfo, SearchDocument> getDocumentFunc,
            Func<IData, string> getDocumentIdFunc)
        {
            _listeners = listeners;
            _interfaceType = interfaceType;
            GetDocument = getDocumentFunc;
            GetDocumentId = getDocumentIdFunc;
        }

        public void Start()
        {
            DataEventSystemFacade.SubscribeToDataAfterAdd(_interfaceType,
                (sender, args) => GetActionContainer().Add(() => Data_OnAfterAdd(sender, args)),
                true);

            DataEventSystemFacade.SubscribeToDataAfterUpdate(_interfaceType,
                (sender, args) => GetActionContainer().Add(() => Data_OnAfterUpdate(sender, args)),
                true);

            DataEventSystemFacade.SubscribeToDataDeleted(_interfaceType, 
                (sender, args) => GetActionContainer().Add(() => Data_OnDeleted(sender, args)),
                true);
        }

        private IndexUpdateActionContainer GetActionContainer()
        {
            var service = ServiceLocator.GetService<IndexUpdateActionContainer>();

            return service ?? new IndexUpdateActionContainer();
        }

        private IEnumerable<CultureInfo> GetCultures(IData data)
        {
            if (data is ILocalizedControlled)
            {
                return new[] { data.DataSourceId.LocaleScope };
            }

            // If data is not localized, it should be indexed for every localization scope
            return DataLocalizationFacade.ActiveLocalizationCultures;
        }

        private bool IgnoreNotification(DataEventArgs args) => !_listeners.Any();

        private void Data_OnAfterAdd(object sender, DataEventArgs dataEventArgs)
        {
            if (IgnoreNotification(dataEventArgs)) return;

            try
            {
                var data = dataEventArgs.Data;

                if (IsPublishedDataFromUnpublishedScope(data))
                {
                    return;
                }

                foreach (var culture in GetCultures(data))
                {
                    var document = GetDocument(data, culture);
                    if (document == null) continue;

                    _listeners.ForEach(l => l.Create(culture, document));
                }
            }
            catch (Exception ex)
            {
                Log.LogError(LogTitle, ex);
            }
        }

        private void Data_OnAfterUpdate(object sender, DataEventArgs dataEventArgs)
        {
            if (IgnoreNotification(dataEventArgs)) return;

            try
            {
                var data = dataEventArgs.Data;
                bool toBeDeleted = IsPublishedDataFromUnpublishedScope(data);

                if (toBeDeleted)
                {
                    DeleteDocuments(data);
                    return;
                }

                foreach (var culture in GetCultures(data))
                {
                    var document = GetDocument(data, culture);
                    if (document == null) continue;

                    _listeners.ForEach(l => l.Update(culture, document));
                }
            }
            catch (Exception ex)
            {
                Log.LogError(LogTitle, ex);
            }
        }

        private void Data_OnDeleted(object sender, DataEventArgs dataEventArgs)
        {
            if (IgnoreNotification(dataEventArgs)) return;

            var data = dataEventArgs.Data;
            DeleteDocuments(data);
        }

        private void DeleteDocuments(IData data)
        {
            try
            {
                var documentId = GetDocumentId(data);

                foreach (var culture in GetCultures(data))
                {
                    _listeners.ForEach(l => l.Delete(culture, documentId));
                }
            }
            catch (Exception ex)
            {
                Log.LogError(LogTitle, ex);
            }
        }

        private bool IsPublishedDataFromUnpublishedScope(IData data)
        {
            return typeof (IPublishControlled).IsAssignableFrom(_interfaceType)
                   && data.DataSourceId.PublicationScope == PublicationScope.Unpublished
                   && ((IPublishControlled)data).PublicationStatus == GenericPublishProcessController.Published;
        }
    }
}
