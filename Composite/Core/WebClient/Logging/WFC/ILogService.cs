using System;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace Composite.Core.WebClient.Logging.WCF
{
    [ServiceContract]
	internal interface ILogService
	{
        [OperationContract]
        [WebInvoke(BodyStyle = WebMessageBodyStyle.Wrapped)]
        string Authenticate(string adminPassword);

        [OperationContract]
        [WebInvoke(BodyStyle = WebMessageBodyStyle.Wrapped)]
        DateTime GetLastStartupTime();

        [OperationContract]
        [WebInvoke(BodyStyle = WebMessageBodyStyle.Wrapped)]
	    DateTime GetServerTime();

        [OperationContract]
        [WebInvoke(BodyStyle = WebMessageBodyStyle.Wrapped)]
        DateTime[] GetLoggingDates();

        [OperationContract]
        [WebInvoke(BodyStyle = WebMessageBodyStyle.Wrapped)]
        int GetLogEntriesCount(DateTime timeFrom, DateTime timeTo, bool includeVerbose);

        [OperationContract]
        [WebInvoke(BodyStyle = WebMessageBodyStyle.Wrapped)]
        int GetLogEntriesCountByDate(DateTime date, bool includeVerbose);

        [OperationContract]
        [WebInvoke(BodyStyle = WebMessageBodyStyle.Wrapped)]
        LogEntry[] GetLogEntries(DateTime timeFrom, DateTime timeTo, bool includeVerbose, int maximumAmount);

        [OperationContract]
        [WebInvoke(BodyStyle = WebMessageBodyStyle.Wrapped)]
        LogEntry[] GetLogEntriesFrom(DateTime timeFrom, bool includeVerbose, int maximumAmount);
	}
}
