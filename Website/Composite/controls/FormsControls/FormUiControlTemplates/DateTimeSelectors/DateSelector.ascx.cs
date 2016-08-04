using System;
using System.Web;
using System.Web.UI.WebControls;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient.UiControlLib;
using Composite.Plugins.Forms.WebChannel.UiControlFactories;
using System.Web.UI;
using System.Linq;
using Composite.Core.Configuration;
using Composite.Core.Extensions;


namespace Composite.controls.FormsControls.FormUiControlTemplates.DateTimeSelectors
{
    public abstract class DateSelectorBase : DateTimeSelectorTemplateUserControlBase
    {
        private string ResetOnClickValue
        {
            get { return this.ViewState["resetOnClickValue"] as string; }
            set { this.ViewState["resetOnClickValue"] = value; }
        }

        public Calendar DateTimeSelector;
        public PlaceHolder CalendarPlaceHolder;
        public PlaceHolder MessagesPlaceHolder;
        public string CurrentStringValue;

        protected void Page_Init(object sender, EventArgs e)
        {
            if (ReadOnly)
            {
                DateTimeSelector.CssClass = "readonly";
            }

            if (this.CurrentStringValue == null)
            {
                this.CurrentStringValue = Request.Form[this.UniqueID];
            }
        }

        private void InsertSelectedDate(DateTime? toShow)
        {
            if (toShow.HasValue && toShow.Value != DateTime.MinValue)
            {
                if (!ShowHours)
                {
                    this.CurrentStringValue = toShow.Value.ToTimeZoneDateString();
                }
                else
                {
                    this.CurrentStringValue = toShow.Value.ToTimeZoneDateTimeString();
                }
            }
            else
            {
                this.CurrentStringValue = "";
            }
        }

        public override void BindStateToProperties()
        {
            if (this.ReadOnly)
                return;

            try
            {
                if (string.IsNullOrEmpty(this.CurrentStringValue))
                {
                    this.Date = null;
                }
                else
                {
                    DateTime parsedTime;
                    if (!DateTimeExtensionMethods.TryParseInTimeZone(this.CurrentStringValue, out parsedTime))
                    {
                        throw new FormatException();
                    }

                    if (!ShowHours)
                        parsedTime -= parsedTime.TimeOfDay;

                    this.Date = parsedTime.FromTimeZoneToUtc().ToLocalTime();
                }
                this.IsValid = true;
            }
            catch (Exception)
            {
                this.IsValid = false;
                this.ValidationError = string.Format(StringResourceSystemFacade.GetString("Composite.Management", "Validation.DateTime.InvalidDateFormat"),
                                       this.CurrentStringValue, SampleDateString);
            }
        }

        private string SampleDateString
        {
            get
            {
                if(ShowHours)
                {
                    return DateTime.Now.ToTimeZoneDateTimeString();
                }
                else
                {
                    return DateTime.Now.ToTimeZoneDateString();
                }
            }
        }

        public override void InitializeViewState()
        {
            SetCalendar(this.Date);
            InsertSelectedDate(this.Date);
        }

        private void SetCalendar(DateTime? date)
        {
            if (date.HasValue == true && date.Value > DateTime.MinValue)
            {
                DateTimeSelector.SelectedDate = date.Value - date.Value.TimeOfDay;
                DateTimeSelector.VisibleDate = DateTimeSelector.SelectedDate;
            }
            else
            {
                DateTimeSelector.SelectedDate = DateTime.MinValue;
                DateTimeSelector.VisibleDate = DateTime.Now;
            }
        }

        public override string GetDataFieldClientName()
        {
            return this.UniqueID;
        }

        public string GetButtonCallbackId()
        {
            return "btnDate" + this.UniqueID;
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
            DateTime toShow = DateTimeSelector.SelectedDate;

            if (ShowHours)
            {
                DateTime oldDateTime;
                if (DateTimeExtensionMethods.TryParseInTimeZone(this.CurrentStringValue, out oldDateTime))
                    toShow += oldDateTime.TimeOfDay;
            }

            InsertSelectedDate(toShow.FromTimeZoneToUtc());
            this.MessagesPlaceHolder.Controls.Add(new DocumentDirtyEvent());
        }

        private void MessagesTextbox(string message)
        {
            FieldMessage fm = new FieldMessage(this.UniqueID, message);
            MessagesPlaceHolder.Controls.Add(fm);
        }

        private void Page_Load(object sender, EventArgs args)
        {
            var c = MessagesPlaceHolder.Controls;
            string eventTarget = HttpContext.Current.Request.Form["__EVENTTARGET"];
            if (eventTarget == GetButtonCallbackId())
            {
                bool enteringCalendarMode = !CalendarPlaceHolder.Visible;

                if (enteringCalendarMode)
                {
                    BindStateToProperties();
                    if (!this.IsValid)
                    {
                        bool clickWillReset = this.CurrentStringValue.Equals(this.ResetOnClickValue);
                        this.ResetOnClickValue = this.CurrentStringValue;
                        this.Date = null;
                        if (!clickWillReset)
                        {
                            MessagesTextbox(string.Format(
                                    "This is not a valid date. Click again to reset calendar or use format '{0}'.",
                                    SampleDateString));

                            enteringCalendarMode = false;
                        }
                    }
                    SetCalendar(this.Date);

                    if (this.Date.HasValue)
                        this.ResetOnClickValue = null;
                }

                CalendarPlaceHolder.Visible = enteringCalendarMode;
            }
        }
    }
}