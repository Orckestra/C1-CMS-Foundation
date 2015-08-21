using System;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Elements.ElementProviderHelpers.DataGroupingProviderHelper;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.Routing;
using Composite.Core.Routing.Foundation.PluginFacades;
using Composite.Core.Types;
using Composite.Data;

using DataRouteKind = Composite.Functions.RoutedData.DataRouteKind;

namespace Composite.Functions
{
    /// <exclude />
    public interface IRoutedDataUrlMapper
    {
        /// <exclude />
        RoutedDataModel GetRouteDataModel(PageUrlData pageUrlData);
        /// <exclude />
        PageUrlData BuildItemUrl(IData item);
    }


    internal class PathInfoRoutedDataUrlMapper<T> : IRoutedDataUrlMapper where T : class, IData
    {
        private readonly Guid _pageId;
        private readonly DataRouteKind _dataRouteKind;

        private static PropertyInfo _keyPropertyInfo;
        private static PropertyInfo _labelPropertyInfo;

        public PathInfoRoutedDataUrlMapper(Guid pageId, DataRouteKind dataRouteKind)
        {
            _pageId = pageId;
            _dataRouteKind = dataRouteKind;

            if ((dataRouteKind & DataRouteKind.Key) > 0 && _keyPropertyInfo == null)
            {
                // TODO: support for compound keys
                _keyPropertyInfo = typeof(T).GetKeyProperties()
                .SingleOrException("No key fields found on data type '{0}''",
                                   "Data type '{0}' should have a single key field", typeof(T).FullName);
            }

            if ((dataRouteKind & DataRouteKind.Label) > 0 && _labelPropertyInfo == null)
            {
                _labelPropertyInfo = typeof(T).GetLabelPropertyInfo();
            }
        }

        public RoutedDataModel GetRouteDataModel(PageUrlData pageUrlData)
        {
            string pathInfo = pageUrlData.PathInfo;
            if (pathInfo.IsNullOrEmpty())
            {
                return new RoutedDataModel(GetListQueryable);
            }

            switch (_dataRouteKind)
            {
                case DataRouteKind.Key:
                case DataRouteKind.KeyAndLabel:
                    {
                        string key;
                        string label = null;
 
                        if (_dataRouteKind == DataRouteKind.KeyAndLabel)
                        {
                            string[] parts = pathInfo.Split(new[] { '/' }, StringSplitOptions.RemoveEmptyEntries);
                            if (parts.Length > 2)
                            {
                                return new RoutedDataModel();
                            }
                            key = parts[0];
                            label = parts.Length == 2 ? parts[1] : null;
                        }
                        else
                        {
                            if (pathInfo.Length < 2 || pathInfo.LastIndexOf('/') > 0)
                            {
                                return new RoutedDataModel();
                            }

                            key = pathInfo.Substring(1);
                        }

                        var keyType = _keyPropertyInfo.PropertyType;
                        object keyValue = ValueTypeConverter.Convert(key, keyType);
                        
                        if(keyValue == null 
                           || (keyValue is Guid && (Guid)keyValue == Guid.Empty && key != Guid.Empty.ToString()))
                        {
                            return new RoutedDataModel();
                        }

                        var data = DataFacade.TryGetDataByUniqueKey<T>(keyValue);

                        return new RoutedDataModel(data);
                    }

                case DataRouteKind.Label:
                    {
                        if (pathInfo.Length < 2 || pathInfo.LastIndexOf('/') > 0)
                        {
                            return new RoutedDataModel();
                        }

                        string label = pathInfo.Substring(1);

                        var data = GetDataByLabel(label);
                        return new RoutedDataModel(data);
                    }
                default:
                    throw new InvalidOperationException("Not supported data url kind: " + _dataRouteKind);
            }
        }

        private IQueryable GetListQueryable()
        {
            IQueryable<T> unorderedQuery = DataFacade.GetData<T>();

            if (typeof (IPageRelatedData).IsAssignableFrom(typeof (T)))
            {
                unorderedQuery = unorderedQuery.Where(t => (t as IPageRelatedData).PageId == _pageId);
            }

            return DataGroupingProviderHelper.OrderData(unorderedQuery, typeof(T));
        }

        public PageUrlData BuildItemUrl(IData dataItem)
        {
            Verify.ArgumentNotNull(dataItem, "dataItem");

            string keyUrlPart = null;
            string labelUrlPart = null;

            if ((_dataRouteKind & DataRouteKind.Key) > 0)
            {
                keyUrlPart = GetUrlKey(dataItem);
            }

            if ((_dataRouteKind & DataRouteKind.Label) > 0)
            {
                labelUrlPart = GetUrlLabel(dataItem);
            }

            string pathInfo;
            switch (_dataRouteKind)
            {
                case DataRouteKind.Key:
                    pathInfo = "/" + keyUrlPart;
                    break;
                case DataRouteKind.KeyAndLabel:
                    pathInfo = "/" + keyUrlPart + "/" + labelUrlPart;
                    break;
                case DataRouteKind.Label:
                    pathInfo = "/" + labelUrlPart;
                    break;
                default:
                    throw new InvalidOperationException("Not supported data url kind: " + _dataRouteKind);
            }

            var culture = LocalizationScopeManager.CurrentLocalizationScope;
            var publicationScope = DataScopeManager.CurrentDataScope.ToPublicationScope();
            return new PageUrlData(_pageId, publicationScope, culture) { PathInfo = pathInfo };
        }

        private static T GetDataByLabel(string label)
        {
            foreach (var data in DataFacade.GetData<T>())
            {
                string urlLabel = GetUrlLabel(data);
                if (string.IsNullOrEmpty(urlLabel)) continue;

                if (label.Equals(urlLabel, StringComparison.OrdinalIgnoreCase))
                {
                    return data;
                }
            }

            return null;
        }

        private static string LabelToUrlPart(string partnerName)
        {
            return UrlFormattersPluginFacade.FormatUrl(partnerName, true);
        }

        private static string GetUrlLabel(IData data)
        {
            object labelValue = _labelPropertyInfo.GetValue(data);
            if (labelValue == null)
            {
                return null;
            }

            string label = ValueTypeConverter.Convert<string>(labelValue);

            return string.IsNullOrEmpty(label) ? null : LabelToUrlPart(label);
        }

        private static string GetUrlKey(IData data)
        {
            object keyValue = _keyPropertyInfo.GetValue(data);

            if (keyValue == null)
            {
                return null;
            }

            string urlKey = keyValue.ToString();
            return string.IsNullOrEmpty(urlKey) ? null : urlKey;
        }
    }
}
