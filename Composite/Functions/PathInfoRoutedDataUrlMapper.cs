using System;
using System.Linq;
using System.Reflection;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.Routing;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Functions
{
    internal class PathInfoRoutedDataUrlMapper<T> : IRoutedDataUrlMapper where T : class, IData
    {
        [Flags]
        public enum DataRouteKind
        {
            Key = 1,
            Label = 2,
            KeyAndLabel = 3,
        }

        private readonly IPage _page;
        private readonly DataRouteKind _dataRouteKind;

        private static PropertyInfo _keyPropertyInfo;
        private static PropertyInfo _labelPropertyInfo;

        public PathInfoRoutedDataUrlMapper(IPage page, DataRouteKind dataRouteKind)
        {
            _page = page;
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
                return GetListViewModel();
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

                        var data = DataFacade.TryGetDataByUniqueKey<T>(key);

                        bool isCanonical;
                        if (_dataRouteKind == DataRouteKind.KeyAndLabel)
                        {
                            string canonicalUrlLabel = GetUrlLabel(data);
                            isCanonical = string.IsNullOrEmpty(canonicalUrlLabel) 
                                ?  string.IsNullOrEmpty(label) 
                                : string.Equals(canonicalUrlLabel, label, StringComparison.Ordinal);
                        }
                        else
                        {
                            isCanonical = true;
                        }

                        return new RoutedDataModel(data, isCanonical);
                    }

                case DataRouteKind.Label:
                    {
                        if (pathInfo.Length < 2 || pathInfo.LastIndexOf('/') > 0)
                        {
                            return new RoutedDataModel();
                        }

                        string label = pathInfo.Substring(1);

                        bool isCanonical;
                        var data = GetDataByLabel(label, out isCanonical);
                        return new RoutedDataModel(data, isCanonical);
                    }
                default:
                    throw new InvalidOperationException("Not supported data url kind: " + _dataRouteKind);
            }
        }

        private RoutedDataModel GetListViewModel()
        {
            if (typeof(IPageRelatedData).IsAssignableFrom(typeof(T)))
            {
                Guid pageId = _page.Id;

                return new RoutedDataModel(() => DataFacade.GetData<T>().Where(t => (t as IPageRelatedData).PageId == pageId));

            }
            return new RoutedDataModel(DataFacade.GetData<T>);
        }

        public PageUrlData BuildDataUrl(IData dataItem)
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

            return new PageUrlData(_page) { PathInfo = pathInfo };
        }

        private static T GetDataByLabel(string label, out bool canonical)
        {
            foreach (var data in DataFacade.GetData<T>())
            {
                string urlLabel = GetUrlLabel(data);
                if (string.IsNullOrEmpty(urlLabel)) continue;

                if (label.Equals(urlLabel, StringComparison.OrdinalIgnoreCase))
                {
                    canonical = label.Equals(urlLabel, StringComparison.Ordinal);
                    return data;
                }
            }

            canonical = false;
            return null;
        }

        private static string LabelToUrlPart(string partnerName)
        {
            return partnerName.Trim().Replace("/", "").Replace("+", "_").Replace(" ", "_").Replace("__", "_").Replace("__", "_");
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
