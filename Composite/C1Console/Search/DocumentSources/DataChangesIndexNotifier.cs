using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Core.Extensions;
using Composite.Data;
using Composite.Data.ProcessControlled;

namespace Composite.C1Console.Search.DocumentSources
{
    internal class DataChangesIndexNotifier
    {
        private readonly IEnumerable<IDocumentSourceListener> _listeners;
        private readonly Type _interfaceType;

        private Func<IData, SearchDocument> GetDocument { get; }
        private Func<IData, string> GetDocumentId { get; }

        public DataChangesIndexNotifier(
            IEnumerable<IDocumentSourceListener> listeners,
            Type interfaceType, 
            Func<IData, SearchDocument> getDocumentFunc,
            Func<IData, string> getDocumentIdFunc)
        {
            _listeners = listeners;
            _interfaceType = interfaceType;
            GetDocument = getDocumentFunc;
            GetDocumentId = getDocumentIdFunc;
        }

        public void Start()
        {
            DataEventSystemFacade.SubscribeToDataAfterAdd(_interfaceType, Data_OnAfterAdd, true);
            DataEventSystemFacade.SubscribeToDataAfterUpdate(_interfaceType, Data_OnAfterUpdate, true);
            DataEventSystemFacade.SubscribeToDataDeleted(_interfaceType, Data_OnDeleted, true);
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

        private void Data_OnAfterAdd(object sender, DataEventArgs dataEventArgs)
        {
            if (!_listeners.Any()) return;

            var data = dataEventArgs.Data;
            var document = GetDocument(data);

            foreach (var culture in GetCultures(data))
            {
                _listeners.ForEach(l => l.Create(culture, document));
            }
        }

        private void Data_OnAfterUpdate(object sender, DataEventArgs dataEventArgs)
        {
            if (!_listeners.Any()) return;

            var data = dataEventArgs.Data;
            var document = GetDocument(data);

            foreach (var culture in GetCultures(data))
            {
                _listeners.ForEach(l => l.Update(culture, document));
            }
        }

        private void Data_OnDeleted(object sender, DataEventArgs dataEventArgs)
        {
            if (!_listeners.Any()) return;

            var data = dataEventArgs.Data;
            var documentId = GetDocumentId(data);

            foreach (var culture in GetCultures(data))
            {
                _listeners.ForEach(l => l.Delete(culture, documentId));
            }
        }
    }
}
