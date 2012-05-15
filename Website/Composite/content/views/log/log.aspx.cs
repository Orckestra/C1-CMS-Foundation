using System;
using System.Globalization;
using System.Web.UI;
using System.Xml.Linq;
using System.Diagnostics;
using System.Linq;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;


public partial class Composite_content_views_log_log : System.Web.UI.Page
{
    private const string DateTimeFormat = "yyyy-MM-dd";

    private const string View_DateTimeFormat = "yyyy-MM-dd HH:mm:ss.ff";
    

    private string SelectedDateStr
    {
        get
        {
            return System.Web.HttpContext.Current.Request.Form["Pager"];
        }
    }

    private bool _allLogsHaveBeenDeleted = false;

    protected void Page_PreRender(object sender, EventArgs e)
    {
        var dates = LogManager.GetLoggingDates().OrderByDescending(date => date).ToArray();

        this.Pager.Items.Clear();
        foreach (var date in dates)
        {
            this.Pager.Items.Add(date.ToString(DateTimeFormat));
        }

        DateTime selectedDate = DateTime.Now.Date;

        string selectDateStr = SelectedDateStr;
        if(!_allLogsHaveBeenDeleted && !string.IsNullOrEmpty(SelectedDateStr) && this.Pager.Items.FindByText(SelectedDateStr) != null)
        {
            selectedDate = DateTime.ParseExact(selectDateStr, DateTimeFormat, CultureInfo.InvariantCulture);

            this.Pager.SelectedValue = SelectedDateStr;
        }
        else
        {
            selectedDate = DateTime.Now;
        }

        selectedDate = selectedDate.Date;
        LogEntry[] logEntries = LogManager.GetLogEntries(selectedDate, selectedDate.AddDays(1.0), false, 0);

        if (logEntries.Length > 0)
        {
            BuildLogTable(logEntries);
            
            EmptyLabelPlaheHolder.Visible = false;
        }
        else
        {
            EmptyLabelPlaheHolder.Visible = true;
        }

        DeleteOlderButton.Enabled = dates.Count() > 1;
    }


    private void BuildLogTable(LogEntry[] entries)
    {
        XElement table = new XElement("table");

            XElement tableHeader = new XElement("tr");
            tableHeader.Add(
                    new XElement("th", " "),
                    new XElement("th", StringResourceSystemFacade.GetString("Composite.Management","ServerLog.LogEntry.DateLabel")),
                    new XElement("th", StringResourceSystemFacade.GetString("Composite.Management","ServerLog.LogEntry.MessageLabel")),
                    new XElement("th", StringResourceSystemFacade.GetString("Composite.Management","ServerLog.LogEntry.TitleLabel")),
                    new XElement("th", StringResourceSystemFacade.GetString("Composite.Management","ServerLog.LogEntry.EventTypeLabel"))
                    //new XElement("th", "URL"),
                    //new XElement("th", "Referer")
                );

            table.Add(tableHeader);

            foreach (LogEntry logEntry in entries.Reverse())
            {
                TraceEventType eventType;

                try
                {
                    eventType = (TraceEventType)Enum.Parse(typeof(TraceEventType), logEntry.Severity);
                }
                catch (Exception)
                {
                    eventType = TraceEventType.Information;
                }

                XAttribute color = null;

                switch (eventType)
                {
                    case TraceEventType.Information:
                        color = new XAttribute("bgcolor", "lime");
                        break;

                    case TraceEventType.Verbose:
                        color = new XAttribute("bgcolor", "white");
                        break;

                    case TraceEventType.Warning:
                        color = new XAttribute("bgcolor", "yellow");
                        break;

                    case TraceEventType.Error:
                        color = new XAttribute("bgcolor", "orange");
                        break;

                    case TraceEventType.Critical:
                        color = new XAttribute("bgcolor", "red");
                        break;

                    default:
                        color = new XAttribute("bgcolor", "pink");
                        break;
                }

                XElement row = new XElement("tr");
                row.Add(
                    new XElement("td", " ", color),
                    new XElement("td", logEntry.TimeStamp.ToString(View_DateTimeFormat)),
                    new XElement("td", new XElement("pre", logEntry.Message.Replace("\n", ""))),
                    new XElement("td", logEntry.Title),
                    new XElement("td", logEntry.Severity)
                    //new XElement("td", logEntry.HttpRequestUrl ?? "" + " "),
                    //new XElement("td", logEntry.HttpReferingUrl ?? "" + " ")
                );

                table.Add(row);
            }

            LogHolder.Controls.Add(new LiteralControl(table.ToString()));
    }


    protected void LogContentChanged(Object sender, EventArgs e)
    {
    }



    protected void DeleteOldButton_Click(Object sender, EventArgs e)
    {
        DateTime[] dates = LogManager.GetLoggingDates();

        DateTime today = DateTime.Now.Date;

        foreach(var date in dates)
        {
            if(date.Date != today)
            {
                LogManager.DeleteLogFile(date);
            }
        }
        
        this.DeleteOlderButton.Enabled = false;

        _allLogsHaveBeenDeleted = true;
    }


}
