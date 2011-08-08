<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.DateTimeSelectorTemplateUserControlBase" %>
<%@ Import Namespace="System.Globalization" %>
<script runat="server">
    private DateTime? CurrentlySelectedDate
    {
        get
        {
            string serializedValue = fldState_Date.Value;
            if (string.IsNullOrEmpty(serializedValue))
            {
                return null;
            }
            return DateTime.Parse(serializedValue, CultureInfo.InvariantCulture);
        }
        set
        {
            fldState_Date.Value = value == null ? string.Empty : value.Value.ToString(CultureInfo.InvariantCulture);
        }
    }

    private DateTime? CurrentlySelectedTime
    {
        get
        {
            string serializedValue = fldState_Time.Value;
            if (string.IsNullOrEmpty(serializedValue))
            {
                return null;
            }
            return DateTime.Parse(serializedValue, CultureInfo.InvariantCulture);
        }
        set
        {
            fldState_Time.Value = value == null ? string.Empty : value.Value.ToString(CultureInfo.InvariantCulture);
        }
    }

    private DateTime? CurrentlySelectedDateTime
    {
        get
        {
            if (CurrentlySelectedDate.HasValue == true && CurrentlySelectedDate.Value > DateTime.MinValue)
            {
                if (CurrentlySelectedTime.HasValue == true)
                {
                    return CurrentlySelectedDate.Value.Add(CurrentlySelectedTime.Value.TimeOfDay);
                }
                else
                {
                    return CurrentlySelectedDate;
                }
            }
            else
            {
                return null;
            }
        }
    }


    protected void Page_Load()
    {
        if (DateSelector.VisibleDate == DateTime.MinValue)
        {
            DateSelector.VisibleDate = DateTime.Today;
        }
        
        if (this.IsPostBack == false)
        {
            SetTimeOptions();
        }
    }

    protected void Page_PreRender(object sender, EventArgs e)
    {
        InsertSelectedDate();

        if (this.CurrentlySelectedDateTime.HasValue == false)
        {
            DateActionSelector.Items.FindByValue("selecttime").Enabled = false;
        }
        else
        {
            DateActionSelector.Items.FindByValue("selecttime").Enabled = true;
        }
    }

    private void InsertSelectedDate()
    {
        if (CurrentlySelectedDateTime != null)
        {
            string dateTimeString = string.Format("{0} {1}", this.CurrentlySelectedDateTime.Value.ToShortDateString(), this.CurrentlySelectedDateTime.Value.ToShortTimeString());
            ListItem dateItem = DateActionSelector.Items.FindByValue("date");
            if (dateItem == null)
            {
                DateActionSelector.Items.Insert(0, new ListItem(dateTimeString, "date"));
            }
            else
            {
                dateItem.Text = dateTimeString;
            }
        }
    }

    void DateActionSelector_Change(object sender, EventArgs e)
    {
        switch (DateActionSelector.SelectedValue)
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
                if (CurrentlySelectedDate != null)
                {
                    if (TimeSelector.Items.FindByValue(CurrentlySelectedTime.Value.ToShortTimeString()) == null)
                    {
                        TimeSelector.Items.Add(CurrentlySelectedTime.Value.ToShortTimeString());
                    }
                    TimeSelector.SelectedValue = CurrentlySelectedTime.Value.ToShortTimeString();
                }
                break;
            default:
                CalendarPlaceHolder.Visible = false;
                TimeSelectorPlaceHolder.Visible = false;
                break;
        }
    }


    void TimeSelector_SelectionChanged(object sender, EventArgs e)
    {
        CurrentlySelectedTime = DateTime.Parse(TimeSelector.SelectedValue);
        InsertSelectedDate();
        DateActionSelector.SelectedValue = "date";
        CalendarPlaceHolder.Visible = false;
        TimeSelectorPlaceHolder.Visible = false;
    }


    void DateSelector_SelectionChanged(object sender, EventArgs e)
    {
        CurrentlySelectedDate = DateSelector.SelectedDate;
        InsertSelectedDate();
        if (CurrentlySelectedTime.HasValue == false) CurrentlySelectedTime = DateTime.MinValue;
        DateActionSelector.SelectedValue = "date";
        CalendarPlaceHolder.Visible = false;
        TimeSelectorPlaceHolder.Visible = false;
    }

    void SetTimeOptions()
    {
        int minuteInterval = 15;
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
        if (this.Date.HasValue == true)
        {
            DateSelector.SelectedDate = this.Date.Value - this.Date.Value.TimeOfDay;
            DateSelector.VisibleDate = DateSelector.SelectedDate;
            CurrentlySelectedDate = DateSelector.SelectedDate;
            CurrentlySelectedTime = DateTime.MinValue.Add(this.Date.Value.TimeOfDay);
        }
        else
        {
            DateSelector.VisibleDate = DateTime.Now;
            CurrentlySelectedDate = null;
        }
    }

    public override string GetDataFieldClientName()
    {
        return DateActionSelector.ClientID.Replace('_', '$');
    }

    public void CalendarYearBackClick(object sender, EventArgs e)
    {
        this.DateSelector.VisibleDate = this.DateSelector.VisibleDate.AddYears(-1);
    }

    public void CalendarYearForwardClick(object sender, EventArgs e)
    {
        this.DateSelector.VisibleDate = this.DateSelector.VisibleDate.AddYears(1);
    }
    
</script>
<aspui:Selector ID="DateActionSelector" runat="server" AutoPostBack="true" OnSelectedIndexChanged="DateActionSelector_Change">
    <asp:ListItem Value="none" Text="(no date selected)" />
    <asp:ListItem Value="select" Text="Select date" />
    <asp:ListItem Value="selecttime" Text="Select time" />
</aspui:Selector>
<asp:HiddenField runat="server" ID="fldState_Date" />
<asp:HiddenField runat="server" ID="fldState_Time" />
<div id="updatezone<%= this.UniqueID %>">
	<asp:PlaceHolder ID="CalendarPlaceHolder" Visible="false" runat="server">
	    <div class="calendar">
	        <asp:Calendar ID="DateSelector" runat="server" OnSelectionChanged="DateSelector_SelectionChanged" ShowDayHeader="true" OtherMonthDayStyle-CssClass="othermonth" SelectedDayStyle-CssClass="selectedday" />
            <!-- masterfilter.xslt will make the links below show up inside the calendar -->
            <asp:LinkButton ID="LinkButton1" CssClass="calendaryearback" OnClick="CalendarYearBackClick" runat="server">back</asp:LinkButton>
            <asp:LinkButton ID="LinkButton2" CssClass="calendaryearforward" OnClick="CalendarYearForwardClick" runat="server">forward</asp:LinkButton>
	    </div>
	</asp:PlaceHolder>
</div>
<asp:PlaceHolder ID="TimeSelectorPlaceHolder" Visible="false" runat="server">
    <aspui:Selector ID="TimeSelector" runat="server" AutoPostBack="true" OnSelectedIndexChanged="TimeSelector_SelectionChanged">
    </aspui:Selector>
</asp:PlaceHolder>
