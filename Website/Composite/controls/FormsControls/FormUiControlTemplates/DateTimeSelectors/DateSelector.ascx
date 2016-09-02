<%@ Control Language="C#" Inherits="Composite.controls.FormsControls.FormUiControlTemplates.DateTimeSelectors.DateSelectorBase" Src="~/Composite/controls/FormsControls/FormUiControlTemplates/DateTimeSelectors/DateSelector.ascx.cs" %>

<div id="updatezone<%= this.UniqueID %>A">
    <div>
        <ui:datainputbutton name="<%= this.UniqueID  %>" callbackid="<%=  GetButtonCallbackId()  %>"
            image="${icon:calendar-full}" value="<%= this.CurrentStringValue %>" 
			readonly="<%=this.ReadOnly.ToString().ToLower()%>"
			required="<%=this.Required.ToString().ToLower()%>" />
    </div>
    <div style="display:none">
        <asp:PlaceHolder ID="MessagesPlaceHolder" runat="server"></asp:PlaceHolder>
    </div>
</div>
<div id="updatezone<%= this.UniqueID %>B">
    <asp:PlaceHolder ID="CalendarPlaceHolder" Visible="false" runat="server">
        <div class="calendar">
            <asp:Calendar ID="DateTimeSelector" runat="server" ShowDayHeader="true" OnSelectionChanged="CalendarSelectionChange"
                OtherMonthDayStyle-CssClass="othermonth" SelectedDayStyle-CssClass="selectedday" />
            <!-- masterfilter.xslt will make the links below show up inside the calendar -->
            <asp:LinkButton ID="LinkButton1" CssClass="calendaryearback" OnClick="CalendarYearBackClick"
                runat="server">back</asp:LinkButton>
            <asp:LinkButton ID="LinkButton2" CssClass="calendaryearforward" OnClick="CalendarYearForwardClick"
                runat="server">forward</asp:LinkButton>
        </div>
    </asp:PlaceHolder>
</div>