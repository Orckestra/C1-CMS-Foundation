<%@ Control Language="C#" AutoEventWireup="true" Inherits="Controls_evi" Codebehind="evi.ascx.cs" %>
<asp:ScriptManager ID="ScriptManager1" runat="server">
</asp:ScriptManager>
<div>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server" ChildrenAsTriggers="true">
        <ContentTemplate>
            <div>
                <p class="more6">
                    <asp:LinkButton ID="lnkSearch" runat="server" Text="Tjek adresse" OnClick="lnkSearch_Click">
                    </asp:LinkButton>
                </p> - <%= DateTime.Now %>
            </div>
            <div id="dvName" runat="server" style="display: none">
                Nitesh Barot
                34
                223
                423
                4
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
</div>