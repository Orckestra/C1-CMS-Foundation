using System;
using System.Web;
using System.Web.UI.WebControls;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient.UiControlLib;
using Composite.Plugins.Forms.WebChannel.UiControlFactories;
using System.Web.UI;

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
                    this.CurrentStringValue = toShow.Value.ToShortDateString();
                }
                else
                {
                    this.CurrentStringValue = string.Format("{0} {1}", toShow.Value.ToShortDateString(), toShow.Value.ToShortTimeString());
                }
            }
            else
            {
                this.CurrentStringValue = "";
            }
        }

        protected override void BindStateToProperties()
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
                    this.Date = DateTime.Parse(this.CurrentStringValue);
                    if (!ShowHours)
                        this.Date -= this.Date.Value.TimeOfDay;
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
                    return string.Format("{0} {1}", DateTime.Now.ToShortDateString(), DateTime.Now.ToShortTimeString());
                }
                else
                {
                    return DateTime.Now.ToShortDateString();
                } 
            }
        }

        protected override void InitializeViewState()
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
                if (DateTime.TryParse(this.CurrentStringValue, out oldDateTime))
                    toShow += oldDateTime.TimeOfDay;
            }

            InsertSelectedDate(toShow);
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