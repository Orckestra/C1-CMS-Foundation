using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using Composite.Core.Instrumentation;
using Composite.Core.Linq;
using Composite.Core.WebClient;

namespace Composite.Core.Routing
{
    /// <summary>
    /// Allows setting custom urls conversions.
    /// </summary>
    public static class InternalUrls
    {
        private static List<IInternalUrlConverter> _converters = new List<IInternalUrlConverter>();

        /// <summary>
        /// Registers a url transformation.
        /// </summary>
        /// <param name="urlConverter"></param>
        public static void Register(IInternalUrlConverter urlConverter)
        {
            _converters.Add(urlConverter);
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
        /// Converts internal urls to public ones in a given html fragment
        /// </summary>
        /// <param name="html"></param>
        /// <param name="converters"></param>
        /// <returns></returns>
        internal static string ConvertInternalUrlsToPublic(string html, IEnumerable<IInternalUrlConverter> converters)
        {
            converters = converters.Evaluate();

            if (!converters.Any())
            {
                return html;
            }

            var convertersMap = new Dictionary<string, IInternalUrlConverter>();
            foreach (var converter in converters)
            {
                foreach (var prefix in converter.AcceptedUrlPrefixes)
                {
                    convertersMap[prefix] = converter;
                }
            }

            if (!convertersMap.Any())
            {
                return html;
            }

            Func<string, string> resolvedPrefix = urlPrefix => UrlUtils.PublicRootPath + "/" + urlPrefix;

            // Urls, generated in UserControl-s may still have "~/" as a prefix
            foreach (var urlPrefix in convertersMap.Keys)
            {
                string rawUrlPrefix = "~/" + urlPrefix;
                string resolvedUrlPrefix = resolvedPrefix(urlPrefix);

                html = UrlUtils.ReplaceUrlPrefix(html, rawUrlPrefix, resolvedUrlPrefix);
            }

            StringBuilder result = null;

            var urlsToConvert = new List<UrlToConvert> ();

            foreach (var pair in convertersMap)
            {
                string internalPrefix = resolvedPrefix(pair.Key);
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

            var urlSpace = new UrlSpace();

            var measurements = new Dictionary<string, Measurement>();

            var convertionCache = new Dictionary<string, string>();
            foreach (var urlToConvert in urlsToConvert)
            {
                UrlUtils.UrlMatch urlMatch = urlToConvert.Match;
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
                        publicUrl = urlToConvert.Converter.Convert(decodedInternalUrl, urlSpace);
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
