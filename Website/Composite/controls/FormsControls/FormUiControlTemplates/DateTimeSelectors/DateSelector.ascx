<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.DateTimeSelectorTemplateUserControlBase" %>
<%@ Import Namespace="System.Globalization" %>

<script runat="server">

    private void InsertSelectedDate()
    {
        if (DateTimeSelector.SelectedDate != DateTime.MinValue)
        {
            var dateLabel = DateTimeSelector.SelectedDate.ToLongDateString();
            
            ListItem dateItem = DateActionSelector.Items.FindByValue("date");
            if (dateItem == null)
            {
                DateActionSelector.Items.Insert(0, new ListItem(dateLabel, "date"));
            }
            else
            {
                dateItem.Text = dateLabel;
            }
            DateActionSelector.SelectedIndex = 0;               
        }
    }

    void DateActionSelectorChanged(object sender, EventArgs e)
    {
        switch (DateActionSelector.SelectedValue)
        {
            case "none":
                CalendarPlaceHolder.Visible = false;
                DateTimeSelector.SelectedDate = DateTime.MinValue;
                ListItem dateItem = DateActionSelector.Items.FindByValue("date");
                if (dateItem != null)
                {
                    DateActionSelector.Items.Remove(dateItem);
                }
                break;
            case "select":
                CalendarPlaceHolder.Visible = true;
                break;
            default:
                CalendarPlaceHolder.Visible = false;
                break;
        }
    }

    protected override void BindStateToProperties()
    {
        this.Date = DateTimeSelector.SelectedDate;
    }

    protected override void InitializeViewState()
    {
        if (this.Date.HasValue == true && this.Date.Value > DateTime.MinValue)
        {
            DateTimeSelector.SelectedDate = this.Date.Value - this.Date.Value.TimeOfDay;
            DateTimeSelector.VisibleDate = DateTimeSelector.SelectedDate;
            InsertSelectedDate();
        }
        else
        {
            DateTimeSelector.VisibleDate = DateTime.Now;
            InsertSelectedDate();
        }
    }

    public override string GetDataFieldClientName()
    {
        return DateActionSelector.UniqueID;
    }

    public void CalendarYearBackClick(object sender, EventArgs e)
    {
        this.DateTimeSelector.VisibleDate = this.DateTimeSelector.VisibleDate.AddYears(-1);
    }

    public void CalendarYearForwardClick(object sender, EventArgs e)
    {
        this.DateTimeSelector.VisibleDate = this.DateTimeSelector.VisibleDate.AddYears(1);
    }

    public void CalendarSelectionChange(object sender, EventArgs e)
    {
        CalendarPlaceHolder.Visible = false;
        InsertSelectedDate();
    }
    
    
</script>
<aspui:Selector ID="DateActionSelector" runat="server" AutoPostBack="true" OnSelectedIndexChanged="DateActionSelectorChanged">
    <asp:ListItem Value="none" Text="(no date selected)" />
    <asp:ListItem Value="select" Text="Select date" />
</aspui:Selector>
<div id="updatezone<%= this.UniqueID %>">
	<asp:PlaceHolder ID="CalendarPlaceHolder" Visible="false" runat="server">
	    <div class="calendar">
	        <asp:Calendar ID="DateTimeSelector" runat="server" ShowDayHeader="true" OnSelectionChanged="CalendarSelectionChange" OtherMonthDayStyle-CssClass="othermonth" SelectedDayStyle-CssClass="selectedday" />
            <!-- masterfilter.xslt will make the links below show up inside the calendar -->
            <asp:LinkButton ID="LinkButton1" CssClass="calendaryearback" OnClick="CalendarYearBackClick" runat="server">back</asp:LinkButton>
            <asp:LinkButton ID="LinkButton2" CssClass="calendaryearforward" OnClick="CalendarYearForwardClick" runat="server">forward</asp:LinkButton>
	    </div>
	</asp:PlaceHolder>
</div>