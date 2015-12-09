using System;
using System.Collections.Generic;
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
        get { return Request.Form["Pager"]; }
    }

    protected bool IsBrowserView
    {
        get { return Request.QueryString["browserView"] == "true"; }
    }

    protected int MaxEntriesToShow
    {
        get
        {
            return IsBrowserView ? 1000 : 10000;
        }
    }

    private bool _allLogsHaveBeenDeleted;

    protected void Page_PreRender(object sender, EventArgs e)
    {
        bool includeVerbose = chkVerbose.Checked;
        bool includeInformation = chkInformation.Checked;
        bool includeWarning = chkWarning.Checked;
        bool includeError = chkError.Checked;
        bool includeCritical = chkCritical.Checked;

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

        var logEntries = new List<LogEntry>();

        DateTime fromDate = selectedDate;

        const int bulkSize = 5000;
        bool logEntriesRemoved = false;
        int totalExistingLogEntries = 0;

        while (true)
        {
            LogEntry[] entriesPart = LogManager.GetLogEntries(fromDate, selectedDate.AddDays(1.0), includeVerbose, bulkSize);

            logEntries.AddRange(entriesPart.Where(entry => (includeVerbose && entry.Severity == "Verbose")
                                                          || (includeInformation && entry.Severity == "Information")
                                                          || (includeWarning && entry.Severity == "Warning")
                                                          || (includeError && entry.Severity == "Error")
                                                          || (includeCritical && entry.Severity == "Critical")));

            totalExistingLogEntries += logEntries.Count;

            if (logEntries.Count > MaxEntriesToShow)
            {
                logEntries.RemoveRange(0, logEntries.Count - MaxEntriesToShow);
                logEntriesRemoved = true;
            }

            if (entriesPart.Length < bulkSize)
            {
                break;
            }

            fromDate = entriesPart[entriesPart.Length - 1].TimeStamp.AddMilliseconds(0.5);
        }

        if (logEntriesRemoved) 
        {
            string label = StringResourceSystemFacade.GetString("Composite.Management", IsBrowserView ? "ServerLog.LogEntriesRemovedBrowserViewLabel" : "ServerLog.LogEntriesRemovedLabel"); 
            LogEntriesRemovedLabel.Text = String.Format(label, this.MaxEntriesToShow, totalExistingLogEntries);
            LogEntriesRemovedPlaceHolder.Visible = true;
        }
        else
        {
            LogEntriesRemovedPlaceHolder.Visible = false;
        }

        if (logEntries.Count > 0)
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


    private void BuildLogTable(IEnumerable<LogEntry> entries)
    {
        XElement table = new XElement("table");

        XElement tableHeader = new XElement("tr");
        tableHeader.Add(
                new XElement("th", " "),
                new XElement("th", StringResourceSystemFacade.GetString("Composite.Management","ServerLog.LogEntry.DateLabel")),
                new XElement("th", StringResourceSystemFacade.GetString("Composite.Management","ServerLog.LogEntry.MessageLabel")),
                new XElement("th", StringResourceSystemFacade.GetString("Composite.Management","ServerLog.LogEntry.TitleLabel")),
                new XElement("th", StringResourceSystemFacade.GetString("Composite.Management","ServerLog.LogEntry.EventTypeLabel"))
            );

        table.Add(tableHeader);

        int index = 0;
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

            
            var colors = new []
                               {
                                   new Tuple<TraceEventType, string>(TraceEventType.Information, "lime"),
                                   new Tuple<TraceEventType, string>(TraceEventType.Verbose, "white"),
                                   new Tuple<TraceEventType, string>(TraceEventType.Warning, "orange"),
                                   new Tuple<TraceEventType, string>(TraceEventType.Error, "red"),
                                   new Tuple<TraceEventType, string>(TraceEventType.Critical, "darkred")
                               };

            string colorName = colors.Where(c => c.Item1 == eventType).Select(c => c.Item2).FirstOrDefault() ?? "orange";

            XAttribute color = new XAttribute("bgcolor", colorName);


            XElement row = new XElement("tr");
            row.Add(
                new XElement("td", color, " "),
                new XElement("td", logEntry.TimeStamp.ToString(View_DateTimeFormat)),
                new XElement("td", MessageMarkup(logEntry, index++)),
                new XElement("td", EncodeXml10InvalidCharacters(logEntry.Title)),
                new XElement("td", logEntry.Severity)
            );

            table.Add(row);
        }

        LogHolder.Controls.Add(new LiteralControl(table.ToString()));
    }

    public object[] MessageMarkup(LogEntry logEntry, int index)
    {
        if (!logEntry.Message.Contains("\n"))
        {
            string encodedMessage = EncodeXml10InvalidCharacters(logEntry.Message);
            return new object[] { encodedMessage };
        }

        string[] lines = EncodeXml10InvalidCharacters(logEntry.Message).Trim().Split('\n');

        if (lines.Length < 7)
        {
            return new object[]
            {
                new XElement("pre", EncodeXml10InvalidCharacters(logEntry.Message.Replace("\n", "")))
            };
        }

        return new object[]
        {
            PreTag(lines, 0, 2),
            new XElement("a", 
                new XAttribute("id", "a" + index),
                new XAttribute("href", "#"),
                new XAttribute("onclick", string.Format("document.getElementById('log{0}').style.display = 'block';document.getElementById('a{0}').style.display = 'none'", index)),
                new XAttribute("class", "expandCode"),
                ". . ."),
            PreTag(lines, 2, lines.Length - 4, 
                new XAttribute("id", "log" + index),
                new XAttribute("style", "display:none;")),
            PreTag(lines, lines.Length - 2, 2)
        };
    }

    private XElement PreTag(string[] lines, int startIndex, int count, params object[] content)
    {
        var text = string.Join("\n", lines.Skip(startIndex).Take(count));
        var result = new XElement("pre", text);
        if (content != null)
        {
            result.Add(content);
        }

        return result;
    }


    private string EncodeXml10InvalidCharacters(string text)
    {
        // We double encoding charaters 00h -> 1Fh except spaces so the encoded version will be shown.
        for (int i = 0; i < 32; i++) {
            if(i == 8 || i == 10 || i == 13) continue;

            char ch = (char) i;

            if(text.Contains(ch))
            {
                text = text.Replace(new string(ch, 1), "&#" + (i/16) + "0123456789ABCDEF"[i % 16] + ";");
            }
        }

        return text;
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
