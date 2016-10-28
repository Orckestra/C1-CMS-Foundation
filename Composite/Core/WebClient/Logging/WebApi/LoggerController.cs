using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using Composite.Core.Logging;
using Microsoft.Web.WebSockets;
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
        /// Logger web socket endpoint
        /// </summary>
        [Route("WebSocket")]
        public HttpResponseMessage Get()
        {
            HttpContext.Current.AcceptWebSocketRequest(new LoggerWebSocketHandler());
            return Request.CreateResponse(HttpStatusCode.SwitchingProtocols);
        }

        private class LoggerWebSocketHandler : WebSocketHandler
        {
            private static readonly WebSocketCollection Clients = new WebSocketCollection();
           
            public override void OnOpen()
            {
                Clients.Add(this);
            }
    
            public override void OnMessage(string message)
            {
                try
                {
                    if (message == "GetDates")
                    {
                        Clients.Broadcast(
                            JsonConvert.SerializeObject(LogManager.GetLoggingDates().Select(f => f.ToShortDateString())));
                        return;
                    }
                    if (message == "Default")
                    {
                        var logRequestInfo = new LogRequestInfo()
                        {
                            Amount = "100",
                            DateFrom = DateTime.Now.AddDays(-1).ToLongDateString(),
                            DateTo = DateTime.Now.ToLongDateString(),
                            Severity = "Verbose"
                        };
                        Clients.Broadcast(JsonConvert.SerializeObject(GetLogData(logRequestInfo)));
                        return;
                    }
                    if (JsonConvert.DeserializeObject<LogRequestInfo>(message) != null)
                    {
                        Clients.Broadcast(JsonConvert.SerializeObject(GetLogData(JsonConvert.DeserializeObject<LogRequestInfo>(message))));
                    }
                }
                catch (Exception)
                {
                    Clients.Broadcast("Could not Parse Message");
                }
            }

            public override void OnClose()
            {
                Clients.Remove(this);
            }
        }

        /// <summary>
        /// Get method
        /// </summary>
        /// <returns></returns>
        [Route("GetDates")]
        public HttpResponseMessage GetDates()
        {
            var res = LogManager.GetLoggingDates().Select(f=>f.ToShortDateString());

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
            var res = GetLogData(logRequestInfo);

            return HttpResponseMessage(res);
        }

        private HttpResponseMessage HttpResponseMessage(object res)
        {
            string resJson = JsonConvert.SerializeObject(res);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(resJson, Encoding.UTF8, "application/json");
            return response;
        }

        private static List<LogData> GetLogData(LogRequestInfo logRequestInfo)
        {
            var logs = LogManager.GetLogEntries(DateTime.Parse(logRequestInfo.DateFrom),
                DateTime.Parse(logRequestInfo.DateTo),
                logRequestInfo.Severity == "Verbose", int.Parse(logRequestInfo.Amount));

            var res = logs.Select(logEntry => new LogData()
            {
                title = logEntry.Title,
                message = logEntry.Message,
                timeStamp = logEntry.TimeStamp.ToLongDateString(),
                severity = logEntry.Severity
            }).ToList();
            return res;
        }
    }

    /// <summary>
    /// Request structure
    /// </summary>
    public class LogRequestInfo
    {
        /// <exclude />
        public string DateFrom;
        /// <exclude />
        public string DateTo;
        /// <exclude />
        public string Severity;
        /// <exclude />
        public string Amount;
    }

    internal class LogData
    {
        public string title;
        public string message;
        public string timeStamp;
        public string severity;
    }

}
