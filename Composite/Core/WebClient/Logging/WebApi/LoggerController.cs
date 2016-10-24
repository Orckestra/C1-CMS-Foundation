using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Composite.Core.Logging;
using Newtonsoft.Json;


namespace Composite.Core.WebClient.Logging.WebApi
{
    /// <summary>
    /// Logger web api endpoint
    /// </summary>
    [RoutePrefix("Composite/api/Logger")]
    public class LoggerController : ApiController
    {
        /// <summary>
        /// Get method
        /// </summary>
        /// <returns></returns>
        [Route("")]
        public HttpResponseMessage Get()
        {
            var logRequestInfo = new LogRequestInfo()
            {
                Amount = "100",
                DateFrom = DateTime.Now.AddDays(-1).ToLongDateString(),
                DateTo = DateTime.Now.ToLongDateString(),
                Severity = "Verbose"
            };

            var res = GetLogDatas(logRequestInfo);

            return HttpResponseMessage(res);
        }

        /// <summary>
        /// Get method
        /// </summary>
        /// <returns></returns>
        [Route("GetDates")]
        public HttpResponseMessage GetDates()
        {
            var res = LogManager.GetLoggingDates();

            return HttpResponseMessage(res);
        }

        /// <summary>
        /// Post log info
        /// </summary>
        /// <param name="logRequestInfo"></param>
        /// <returns></returns>
        [Route("GetData")]
        [HttpPost]
        public HttpResponseMessage GetData([FromBody] LogRequestInfo logRequestInfo)
        {
            var res = GetLogDatas(logRequestInfo);

            return HttpResponseMessage(res);
        }

        private HttpResponseMessage HttpResponseMessage(object res)
        {
            string resJson = JsonConvert.SerializeObject(res);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(resJson, Encoding.UTF8, "application/json");
            return response;
        }

        private static List<LogData> GetLogDatas(LogRequestInfo logRequestInfo)
        {
            var logs = LogManager.GetLogEntries(DateTime.Parse(logRequestInfo.DateFrom),
                DateTime.Parse(logRequestInfo.DateTo),
                logRequestInfo.Severity == "Verbose", int.Parse(logRequestInfo.Amount));

            var res = logs.Select(logEntry => new LogData()
            {
                Title = logEntry.Title,
                Message = logEntry.Message,
                TimeStamp = logEntry.TimeStamp.ToLongDateString(),
                Severity = logEntry.Severity
            }).ToList();
            return res;
        }
    }

    public class LogRequestInfo
    {
        public string DateFrom;
        public string DateTo;
        public string Severity;
        public string Amount;
    }

    internal class LogData
    {
        public string Title;
        public string Message;
        public string TimeStamp;
        public string Severity;
    }

}
