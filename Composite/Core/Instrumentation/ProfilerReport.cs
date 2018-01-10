using System;
using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.Security;
using Composite.Core.WebClient;


namespace Composite.Core.Instrumentation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ProfilerReport
    {
        private static readonly string ProfilerXslPath = UrlUtils.AdminRootPath + "/Transformations/page_profiler.xslt";

        /// <exclude />
        public static string BuildReport(Measurement measurement, string url)
        {
            string xmlHeader = $@"<?xml version=""1.0""?>
                             <?xml-stylesheet type=""text/xsl"" href=""{ProfilerXslPath}""?>";

            XElement reportXml = ProfilerReport.BuildReportXml(measurement);

            reportXml.Add(new XAttribute("url", url),
                new XAttribute("consoleUrl", UrlUtils.AdminRootPath));

            return xmlHeader + reportXml;
        }

        /// <exclude />
        public static XElement BuildReportXml(Measurement measurement)
        {
            int index = 0;

            var result = new XElement("Measurements", new XAttribute("MemoryUsageKb", measurement.MemoryUsage / 1024));

            foreach (var node in measurement.Nodes)
            {
                result.Add(BuildReportXmlRec(node, node.TotalTime, node.TotalTime, false, index.ToString()));
                index++;
            }

            foreach (var node in measurement.ParallelNodes)
            {
                result.Add(BuildReportXmlRec(node, node.TotalTime, node.TotalTime, true, index.ToString()));
                index++;
            }

            return result;
        }

        private static XElement BuildReportXmlRec(Measurement measurement, /* int level,*/ long totalTime, long parentTime, bool parallel, string id)
        {
            long persentTotal = (measurement.TotalTime * 100) / totalTime;

            long ownTime = measurement.TotalTime - measurement.Nodes.Select(childNode => childNode.TotalTime).Sum();

            var entityToken = measurement.EntityTokenFactory?.Invoke();
            string serializedEntityToken = entityToken != null
                ? EntityTokenSerializer.Serialize(entityToken, true)
                : null;

            var result = new XElement("Measurement",
                                      new XAttribute("_id", id),
                                      new XAttribute("title", measurement.Name),
                                      new XAttribute("totalTime", measurement.TotalTime),
                                      new XAttribute("ownTime", ownTime),
                                      new XAttribute("persentFromTotal", persentTotal),
                                      new XAttribute("parallel", parallel.ToString().ToLowerInvariant()));

            if (serializedEntityToken != null)
            {
                result.Add(new XAttribute("entityToken", serializedEntityToken));
            }

            if (measurement.MemoryUsage != 0)
            {
                result.Add(new XAttribute("memoryUsageKb", measurement.MemoryUsage / 1024));
            }

            int index = 0;
            foreach (var childNode in measurement.Nodes)  // .OrderByDescending(c => c.TotalTime)
            {
                result.Add(BuildReportXmlRec(childNode, totalTime, measurement.TotalTime, false, (id + "|" + index)));
                index++;
            }

            foreach (var childNode in measurement.ParallelNodes) // .OrderByDescending(c => c.TotalTime)
            {
                result.Add(BuildReportXmlRec(childNode, totalTime, measurement.TotalTime, true, (id + "|" + index)));
                index++;
            }  

            return result;
        }
    }
}
