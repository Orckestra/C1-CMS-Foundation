<%@ Control Language="C#" Inherits="Composite.StandardPlugins.Forms.WebChannel.UiControlFactories.DateTimeSelectorTemplateUserControlBase" %>
<%@ Import Namespace="Composite.StandardPlugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="Composite.Extensions" %>
<script runat="server">
    bool _dateLoaded;
    private DateTime? _currentlySelectedDate;
    
    bool _timeLoaded;    
    private DateTime? _currentlySelectedTime;


    private DateTime? CurrentlySelectedDate
    {
        get { return _currentlySelectedDate; }
        set
        {
            _currentlySelectedDate = value;
            _dateLoaded = true;
        }
    }

    private DateTime? CurrentlySelectedTime
    {
        get { return _currentlySelectedTime; }
        set
        {
            _currentlySelectedTime = value;
            _timeLoaded = true;
        }
    }        
    


    private DateTime? CurrentlySelectedDateTime
    {
        get
        {
            if (!CurrentlySelectedDate.HasValue || CurrentlySelectedDate.Value == DateTime.MinValue)
            {
                return null;
            }
            
            if (CurrentlySelectedTime.HasValue == false)
            {
                return CurrentlySelectedDate;
            }

            return CurrentlySelectedDate.Value.Add(CurrentlySelectedTime.Value.TimeOfDay);
        }
    }


    private void LoadState()
    {
        if (!_dateLoaded)
        {
            string serializedValue = Request.Form[fldState_Date.UniqueID];

            _currentlySelectedDate = serializedValue.IsNullOrEmpty()
                                         ? (DateTime?) null
                                         : DateTime.Parse(serializedValue, CultureInfo.InvariantCulture);

            _dateLoaded = true;
        }

        if (!_timeLoaded)
        {
            string serializedValue = Request.Form[fldState_Time.UniqueID];

            _currentlySelectedTime = serializedValue.IsNullOrEmpty()
                                         ? (DateTime?)null
                                         : DateTime.Parse(serializedValue, CultureInfo.InvariantCulture);

            _timeLoaded = true;
        }
        
    }

    private void SaveState()
    {
        fldState_Date.Value = _currentlySelectedDate == null ? string.Empty : _currentlySelectedDate.Value.ToString(CultureInfo.InvariantCulture);
        fldState_Time.Value = _currentlySelectedTime == null ? string.Empty : _currentlySelectedTime.Value.ToString(CultureInfo.InvariantCulture);
    }    


    protected void Page_Init()
    {
        SetTimeOptions();

        LoadState();        
        
        string eventTarget = Request.Form["__EVENTTARGET"];
        if (eventTarget == DateActionSelector.UniqueID)
        {
            DateActionSelector_Changed(Request.Form[DateActionSelector.UniqueID]);
        }
        else if (eventTarget == DateSelector.UniqueID)
        {
            // Loading selector's state
            (DateSelector as IPostBackEventHandler).RaisePostBackEvent(Request.Form["__EVENTARGUMENT"]);

            DateSelector_SelectionChanged();
        }        
        else if(eventTarget == TimeSelector.UniqueID)
        {
            TimeSelector_SelectionChanged();
        }
    }

    protected void Page_PreRender(object sender, EventArgs e)
    {
        InsertSelectedDate();

        DateActionSelector.Items.FindByValue("selecttime").Enabled = CurrentlySelectedDateTime.HasValue;

        SaveState();        
    }

    private void InsertSelectedDate()
    {
        DateTime? dateTime = CurrentlySelectedDateTime;

        if (dateTime == null)
        {
            return;
        }

        string dateTimeString = string.Format("{0} {1}", dateTime.Value.ToShortDateString(), dateTime.Value.ToShortTimeString());
        ListItem dateItem = DateActionSelector.Items.FindByValue("date");
        if (dateItem == null)
        {
            DateActionSelector.Items.Insert(0, new ListItem(dateTimeString, "date"));
        }
        else
        {
            dateItem.Text = dateTimeString;
        }

        DateActionSelector.SelectedIndex = 0;
    }

    void DateActionSelector_Changed(string value)
    {
        switch (value)
        {
            case "none":
                CalendarPlaceHolder.Visible = false;
                TimeSelectorPlaceHolder.Visible = false;
                CurrentlySelectedDate = null;
                ListItem dateItem = DateActionSelector.Items.FindByValue("date");
                if (dateItem != null)
                {
                    DateActionSelector.Items.Remove(dateItem);
                }
                break;
            case "select":
                CalendarPlaceHolder.Visible = true;
                if (CurrentlySelectedDate == null)
                {
                    DateSelector.SelectedDate = DateTime.MinValue;
                }
                else
                {
                    DateSelector.VisibleDate = CurrentlySelectedDate.Value;
                    DateSelector.SelectedDate = CurrentlySelectedDate.Value;
                }
                break;
            case "selecttime":
                TimeSelectorPlaceHolder.Visible = true;
                if (CurrentlySelectedTime != null)
                {
                    string timeStr = CurrentlySelectedTime.Value.ToShortTimeString();
                    
                    if (TimeSelector.Items.FindByValue(timeStr) == null)
                    {
                        TimeSelector.Items.Add(timeStr);
                    }
                    TimeSelector.SelectedValue = timeStr;
                }
                break;
            default:
                CalendarPlaceHolder.Visible = false;
                TimeSelectorPlaceHolder.Visible = false;
                break;
        }
    }


    void TimeSelector_SelectionChanged()
    {
        CurrentlySelectedTime = DateTime.Parse(Request.Form[TimeSelector.UniqueID]);
        DateActionSelector.SelectedValue = "date";
        CalendarPlaceHolder.Visible = false;
        TimeSelectorPlaceHolder.Visible = false;
    }


    void DateSelector_SelectionChanged()
    {
        if (DateSelector.SelectedDate == DateTime.MinValue)
        {
            CalendarPlaceHolder.Visible = true;
            return;
        }        
        
        CurrentlySelectedDate = DateSelector.SelectedDate;
        if (CurrentlySelectedTime.HasValue == false) CurrentlySelectedTime = DateTime.MinValue;
        DateActionSelector.SelectedValue = "date";
        CalendarPlaceHolder.Visible = false;
        TimeSelectorPlaceHolder.Visible = false;
    }

    void SetTimeOptions()
    {
        const int minuteInterval = 15;
        DateTime counter = DateTime.MinValue;

        for (int i = 0; i < (24 * (60 / minuteInterval)); i++)
        {
            TimeSelector.Items.Add(new ListItem(counter.ToShortTimeString()));
            counter = counter.AddMinutes(minuteInterval);
        }
    }

    protected override void BindStateToProperties()
    {
        fldState_Date.Value = this.Request.Form[fldState_Date.UniqueID];
        fldState_Time.Value = this.Request.Form[fldState_Time.UniqueID];
        
        this.Date = CurrentlySelectedDateTime;
    }

    protected override void InitializeViewState()
    {
        if (this.Date.HasValue == false)
        {
            DateSelector.VisibleDate = DateTime.Now;
            CurrentlySelectedDate = null;
            return;
        }
        
        DateSelector.SelectedDate = this.Date.Value - this.Date.Value.TimeOfDay;
        DateSelector.VisibleDate = DateSelector.SelectedDate;
        CurrentlySelectedDate = DateSelector.SelectedDate;
        CurrentlySelectedTime = DateTime.MinValue.Add(this.Date.Value.TimeOfDay);
    }

    public override string GetDataFieldClientName()
    {
        return DateActionSelector.UniqueID;
    }
    
</script>
<aspui:Selector ID="DateActionSelector" runat="server" AutoPostBack="true">
    <asp:ListItem Value="none" Text="(no date selected)" />
    <asp:ListItem Value="select" Text="Select date" />
    <asp:ListItem Value="selecttime" Text="Select time" />
</aspui:Selector>
<asp:HiddenField runat="server" ID="fldState_Date" />
<asp:HiddenField runat="server" ID="fldState_Time" />
<div id="updatezone<%= this.UniqueID %>">
	<asp:PlaceHolder ID="CalendarPlaceHolder" Visible="false" runat="server" EnableViewState="false">
	    <div class="calendar">
	        <asp:Calendar ID="DateSelector" runat="server" ShowDayHeader="false"/>
	    </div>
	</asp:PlaceHolder>
</div>
<asp:PlaceHolder ID="TimeSelectorPlaceHolder" Visible="false" runat="server" EnableViewState="false">
    <aspui:Selector ID="TimeSelector" runat="server" AutoPostBack="true">
    </aspui:Selector>
</asp:PlaceHolder>
