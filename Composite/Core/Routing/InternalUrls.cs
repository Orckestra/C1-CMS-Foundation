using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Composite.Core.Instrumentation;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.Foundation;
using Composite.Plugins.Routing.InternalUrlConverters;
using Composite.Plugins.Routing.InternalUrlProviders;

namespace Composite.Core.Routing
{
    /// <summary>
    /// Allows setting custom urls conversions.
    /// </summary>
    public static class InternalUrls
    {
        private static readonly List<IInternalUrlConverter> _converters = new List<IInternalUrlConverter>();
        private static readonly ConcurrentDictionary<Type, IInternalUrlProvider> _providers = new ConcurrentDictionary<Type, IInternalUrlProvider>();

        internal static void Initialize_PostDataTypes()
        {
            foreach (Type type in DataProviderRegistry.AllInterfaces)
            {
                string internalUrlPrefix = DynamicTypeReflectionFacade.GetInternalUrlPrefix(type);
                if(string.IsNullOrEmpty(internalUrlPrefix)) continue;

                Register(new DataInternalUrlConverter(internalUrlPrefix, type));
                Register(type, new DataInternalUrlProvider(internalUrlPrefix, type));
            }
        }


        /// <summary>
        /// Registers an internal url converter.
        /// </summary>
        /// <param name="urlConverter"></param>
        public static void Register(IInternalUrlConverter urlConverter)
        {
            _converters.Add(urlConverter);
        }

        /// <summary>
        /// Register an internal url provider.
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="urlProvider"></param>
        public static void Register(Type dataType, IInternalUrlProvider urlProvider)
        {
            _providers[dataType] = urlProvider;
        }
        

        /// <summary>
        /// Converts internal urls to public ones in a given html fragment
        /// </summary>
        /// <param name="html"></param>
        /// <returns></returns>
        public static string ConvertInternalUrlsToPublic(string html)
        {
            Verify.ArgumentNotNull(html, "html");

            return ConvertInternalUrlsToPublic(html, _converters);
        }


        /// <summary>
        /// Indicates whether internal urls can be generated for the specified data type.
        /// </summary>
        /// <param name="dataType"></param>
        /// <returns></returns>
        public static bool DataTypeSupported(Type dataType)
        {
            Verify.ArgumentNotNull(dataType, "dataType");

            return _providers.ContainsKey(dataType);
        }


        /// <summary>
        /// Gets an internal url for the specified data reference.
        /// </summary>
        /// <param name="dataReference">The data referenc.</param>
        /// <returns></returns>
        public static string TryBuildInternalUrl(IDataReference dataReference)
        {
            Verify.ArgumentNotNull(dataReference, "dataReference");

            var type = dataReference.ReferencedType;

            IInternalUrlProvider internalUrlProvider;

            if (!_providers.TryGetValue(type, out internalUrlProvider))
            {
                return null;
            }

            return internalUrlProvider.BuildInternalUrl(dataReference);
        }


        /// <summary>
        /// Tries to parse an internal url, returns a <value>null</value> if failed.
        /// </summary>
        /// <param name="internalUrl">The internal url.</param>
        /// <returns></returns>
        public static IDataReference TryParseInternalUrl(string internalUrl)
        {
            if (!internalUrl.StartsWith("~/")) return null;

            string urlWithoutTilde = internalUrl.Substring(2);
            foreach (var converter in _converters)
            {
                foreach (var prefix in converter.AcceptedUrlPrefixes.Reverse())
                {
                    if (urlWithoutTilde.StartsWith(prefix, StringComparison.Ordinal))
                    {
                        return converter.ToDataReference(internalUrl);
                    }
                }
            }

            return null;
        }


        /// <summary>
        /// Tries to convert an internal url to a public one, returns the original value if failed.
        /// </summary>
        /// <param name="internalUrl">The internal url.</param>
        /// <param name="urlSpace">The url space.</param>
        /// <returns></returns>
        public static string TryConvertInternalUrlToPublic(string internalUrl, UrlSpace urlSpace = null)
        {
            if (!internalUrl.StartsWith("~/")) return internalUrl;

            string urlWithoutTilde = internalUrl.Substring(2);

            foreach (var converter in _converters)
            {
                foreach (var prefix in converter.AcceptedUrlPrefixes.Reverse())
                {
                    if (urlWithoutTilde.StartsWith(prefix, StringComparison.Ordinal))
                    {
                        return converter.ToPublicUrl(internalUrl, urlSpace ?? new UrlSpace()) ?? internalUrl;
                    }
                }
            }

            return internalUrl;
        }

        private static string ResolvePrefix(string urlPrefix) => UrlUtils.PublicRootPath + "/" + urlPrefix;

        private static Dictionary<string, IInternalUrlConverter> GetConvertersMap(Func<string, string> mapPrefix)
        {
            var result = new Dictionary<string, IInternalUrlConverter>();
            foreach (var converter in _converters)
            {
                foreach (var prefix in converter.AcceptedUrlPrefixes)
                {
                    result[mapPrefix(prefix)] = converter;
                }
            }

            return result;
        }

        private static bool IsLinkAttribute(XName attrName) =>
            attrName.LocalName == "src"
            || attrName.LocalName == "href"
            || attrName.LocalName == "srcset";


        /// <summary>
        /// Converts internal urls to public ones in a given html fragment
        /// </summary>
        /// <param name="document"></param>
        /// <returns></returns>
        public static void ConvertInternalUrlsToPublic(XDocument document)
        {
            Verify.ArgumentNotNull(document, nameof(document));

            var convertersMap = GetConvertersMap(ResolvePrefix);
            if (!convertersMap.Any()) return;

            var urlSpace = new UrlSpace();

            var convertionCache = new Dictionary<string, string>();
            foreach (var element in document.Descendants())
            {
                foreach (var attr in element.Attributes().Where(a => IsLinkAttribute(a.Name)))
                {
                    string link = attr.Value;
                    if (convertionCache.TryGetValue(link, out string cachedLink))
                    {
                        attr.Value = cachedLink;
                        continue;
                    }

                    foreach (var prefix in convertersMap.Keys)
                    {
                        if (link.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                        {
                            var converter = convertersMap[prefix];
                            var newLink = converter.ToPublicUrl(link, urlSpace);
                            if (newLink != null && newLink != link)
                            {
                                convertionCache[link] = newLink;
                                attr.Value = newLink;
                                break;
                            }
                        }
                    }
                }
            }
        }


        /// <summary>
        /// Converts internal urls to public ones in a given html fragment
        /// </summary>
        /// <param name="html"></param>
        /// <param name="converters"></param>
        /// <returns></returns>
        internal static string ConvertInternalUrlsToPublic(string html, IEnumerable<IInternalUrlConverter> converters)
        {
            var convertersMap = GetConvertersMap(_ => _);
            if (!convertersMap.Any())
            {
                return html;
            }

            // Urls, generated in UserControl-s may still have "~/" as a prefix
            foreach (var urlPrefix in convertersMap.Keys)
            {
                string rawUrlPrefix = "~/" + urlPrefix;
                string resolvedUrlPrefix = ResolvePrefix(urlPrefix);

                html = UrlUtils.ReplaceUrlPrefix(html, rawUrlPrefix, resolvedUrlPrefix);
            }

            StringBuilder result = null;

            var urlsToConvert = new List<UrlToConvert> ();

            foreach (var pair in convertersMap)
            {
                string internalPrefix = ResolvePrefix(pair.Key);
                var converter = pair.Value;

                // Bracket encoding fix
                string prefixToSearch = internalPrefix;
                if (prefixToSearch.EndsWith("(", StringComparison.Ordinal))
                {
                    prefixToSearch = prefixToSearch.Substring(0, internalPrefix.Length - 1);
                }

                urlsToConvert.AddRange(UrlUtils.FindUrlsInHtml(html, prefixToSearch).Select(match => 
                    new UrlToConvert(match, internalPrefix, converter)));
            }
            
            // Sorting the offsets by descending, so we can replace urls in that order by not affecting offsets of not yet processed urls
            urlsToConvert.Sort((a, b) => -a.Match.Index.CompareTo(b.Match.Index));

            int lastReplacementIndex = int.MaxValue;

            var urlSpace = new UrlSpace();

            var measurements = new Dictionary<string, Measurement>();

            var convertionCache = new Dictionary<string, string>();
            foreach (var urlToConvert in urlsToConvert)
            {
                UrlUtils.UrlMatch urlMatch = urlToConvert.Match;
                if(urlMatch.Index == lastReplacementIndex) continue;

                string internalUrlPrefix = urlToConvert.UrlPrefix;

                string internalUrl = urlMatch.Value;
                string publicUrl;

                if (!convertionCache.TryGetValue(internalUrl, out publicUrl))
                {
                    string decodedInternalUrl = internalUrl.Replace("%28", "(").Replace("%29", ")").Replace("&amp;", "&");

                    if (!decodedInternalUrl.StartsWith(internalUrlPrefix))
                    {
                        continue;
                    }

                    var converter = urlToConvert.Converter;
                    MeasureConvertionPerformance(measurements, converter, () =>
                    {
                        publicUrl = urlToConvert.Converter.ToPublicUrl(decodedInternalUrl, urlSpace);
                    });

                    if (publicUrl == null)
                    {
                        convertionCache.Add(internalUrl, null);
                        continue;
                    }

                    // Encoding xml attribute value
                    publicUrl = publicUrl.Replace("&", "&amp;");

                    convertionCache.Add(internalUrl, publicUrl);
                }
                else
                {
                    if (internalUrl == null) continue;
                }

                if (result == null)
                {
                    result = new StringBuilder(html);
                }

                result.Remove(urlMatch.Index, urlMatch.Value.Length);
                result.Insert(urlMatch.Index, publicUrl);

                lastReplacementIndex = urlMatch.Index;
            }

            foreach (var measurement in measurements.Values)
            {
                Profiler.AddSubMeasurement(measurement);
            }

            return result != null ? result.ToString() : html;
        }

        private static void MeasureConvertionPerformance(Dictionary<string, Measurement> measurements, IInternalUrlConverter converter, Action action)
        {
            string key = converter.GetType().FullName;

            var stopwatch = new Stopwatch();

            long memoryBefore = GC.GetTotalMemory(false);

            stopwatch.Start();
            action();
            stopwatch.Stop();

            long memoryTotal = GC.GetTotalMemory(false) - memoryBefore;
            long totalTime = (stopwatch.ElapsedTicks*1000000)/Stopwatch.Frequency;

            if (memoryTotal < 0)
            {
                memoryTotal = 0;
            }

            Measurement existingRecord;
            if (measurements.TryGetValue(key, out existingRecord))
            {
                existingRecord.MemoryUsage += memoryTotal;
                existingRecord.TotalTime += totalTime; // NOTE: Loosing some of the precision here
            }
            else
            {
                measurements.Add(key, new Measurement(key) { MemoryUsage = memoryTotal, TotalTime = totalTime });
            }
        }

        private class UrlToConvert : Tuple<UrlUtils.UrlMatch, string, IInternalUrlConverter>
        {
            public UrlToConvert(UrlUtils.UrlMatch match, string urlPrefix, IInternalUrlConverter converter)
                : base(match, urlPrefix, converter)
            {
            }

            public UrlUtils.UrlMatch Match { get { return Item1; } }
            public string UrlPrefix { get { return Item2; } }
            public IInternalUrlConverter Converter { get { return Item3; } }
        }
    }
}
