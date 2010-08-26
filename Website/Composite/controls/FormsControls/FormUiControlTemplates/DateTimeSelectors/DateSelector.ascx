<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.DateTimeSelectorTemplateUserControlBase" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Import Namespace="Composite.Core.Extensions" %>

<script runat="server">
    bool _stateLoaded;
    private DateTime? _currentlySelectedDate;
    
    private DateTime? CurrentlySelectedDate
    {
        get { return _currentlySelectedDate; }
        set
        {
            _currentlySelectedDate = value;
            _stateLoaded = true;
        }
    }

    private void LoadState()
    {
        if(_stateLoaded)
        {
            return;
        }
        
        string serializedValue = Request.Form[fldState.UniqueID];

        _currentlySelectedDate = serializedValue.IsNullOrEmpty()
                                     ? (DateTime?) null
                                     : DateTime.Parse(serializedValue, CultureInfo.InvariantCulture);

        _stateLoaded = true;
    }

    private void SaveState()
    {
        fldState.Value = _currentlySelectedDate == null ? string.Empty : _currentlySelectedDate.Value.ToString(CultureInfo.InvariantCulture);
    }

    protected void Page_Init(object sender, EventArgs e)
    {
        if(!IsPostBack)
        {
            return;
        }
        
        string eventTarget = Request.Form["__EVENTTARGET"];
        if (eventTarget == DateActionSelector.UniqueID)
        {
            LoadState();
            
            DateActionSelector_Changed(Request.Form[DateActionSelector.UniqueID]);
        }
        else if (eventTarget == DateTimeSelector.UniqueID)
        {
            LoadState();
            
            // Loading selector's state
            (DateTimeSelector as IPostBackEventHandler).RaisePostBackEvent(Request.Form["__EVENTARGUMENT"]);
            
            DateTimeSelector_SelectionChanged();
        }
    }

    protected void Page_PreRender(object sender, EventArgs e)
    {
        if(!_stateLoaded)
        {
            LoadState();
        }
        
        InsertSelectedDate();
        
        SaveState();
    }

    private void InsertSelectedDate()
    {
        if (CurrentlySelectedDate != null)
        {
            var dateLabel = CurrentlySelectedDate.Value.ToLongDateString();
            
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

    void DateActionSelector_Changed(string value)
    {
        switch (value)
        {
            case "none":
                CalendarPlaceHolder.Visible = false;
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
                    DateTimeSelector.SelectedDate = DateTime.MinValue;
                }
                else
                {
                    DateTimeSelector.VisibleDate = CurrentlySelectedDate.Value;
                    DateTimeSelector.SelectedDate = CurrentlySelectedDate.Value;
                }
                break;
            default:
                CalendarPlaceHolder.Visible = false;
                break;
        }
    }


    void DateTimeSelector_SelectionChanged()
    {
        if (DateTimeSelector.SelectedDate == DateTime.MinValue)
        {
            CalendarPlaceHolder.Visible = true;
            return;
        }
        
        CurrentlySelectedDate = DateTimeSelector.SelectedDate;
        InsertSelectedDate();
        CalendarPlaceHolder.Visible = false;
    }

    protected override void BindStateToProperties()
    {
        LoadState();
        
        this.Date = CurrentlySelectedDate;
    }

    protected override void InitializeViewState()
    {
        if (this.Date.HasValue == true && this.Date.Value > DateTime.MinValue)
        {
            DateTimeSelector.SelectedDate = this.Date.Value - this.Date.Value.TimeOfDay;
            DateTimeSelector.VisibleDate = DateTimeSelector.SelectedDate;
            CurrentlySelectedDate = DateTimeSelector.SelectedDate;
        }
        else
        {
            DateTimeSelector.VisibleDate = DateTime.Now;
            CurrentlySelectedDate = null;
        }
    }

    public override string GetDataFieldClientName()
    {
        return DateActionSelector.UniqueID;
    }
</script>
<aspui:Selector ID="DateActionSelector" runat="server" AutoPostBack="true" EnableViewState="false">
    <asp:ListItem Value="none" Text="(no date selected)" />
    <asp:ListItem Value="select" Text="Select date" />
</aspui:Selector>
<asp:HiddenField runat="server" ID="fldState" />
<div id="updatezone<%= this.UniqueID %>">
	<asp:PlaceHolder ID="CalendarPlaceHolder" Visible="false" runat="server" EnableViewState="false">
	    <div class="calendar">
	        <asp:Calendar ID="DateTimeSelector" runat="server" ShowDayHeader="false"/>
	    </div>
	</asp:PlaceHolder>
</div>