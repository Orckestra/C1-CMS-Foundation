<%@ Page Language="C#" AutoEventWireup="true" Inherits="Spikes_Tidy_Default"
    ValidateRequest="false" Codebehind="Default.aspx.cs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Untitled Page</title>
    <style type="text/css">
        .errConsole
        {
            width: 80%;
            height: 80%;
            background-color: Black;
            color: White;
            font-size: small;
            font-family: Courier New;
            position: absolute;
            padding:1em;
            top: 5%;
            left: 10%;
        }
        
        .markupConsole
        {
        	width: 100%;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:TextBox ID="tinyMceMockTextBox" runat="server" Rows="15" TextMode="MultiLine" CssClass="markupConsole"
            Wrap="false">&lt;h1&gt;hej verden &#230;&#248;&#229; - chinese 解决方法&lt;/H1&gt;
&lt;span&gt;
    &lt;img src='rendering.jpg' f:id='b6a034e2-c8c2-4d44-a35d-159d6cbb8352' f:name=&quot;composite.module.yadayada&quot; fp:Name='value of name param' fp:Age='22'  xmlns:f=&quot;http://www.composite.net/ns/function/1.0&quot;  xmlns:fp=&quot;http://www.composite.net/ns/function/parameter/1.0&quot; /&gt;
&lt;/span&gt;
&lt;img src='normal.jpg'  /&gt;
&lt;p&gt;Linie 1&lt;/p&gt; &lt;p&gt;Linie 2 </asp:TextBox>
        <br />
        <asp:Button ID="tinyToSourceButton" runat="server" Text="Tiny to Source" OnClick="tinyToSourceButton_Click">
        </asp:Button>
        <br />
        <asp:TextBox ID="sourceCodeMockTextBox" runat="server" Columns="100" Rows="15" TextMode="MultiLine" CssClass="markupConsole"
            Wrap="false"></asp:TextBox>
        <br />
        <asp:Button ID="SourceToTinyButton" runat="server" Text="Source to Tiny" OnClick="SourceToTinyButton_Click">
        </asp:Button>
        <br />
        <asp:TextBox ID="recreatedTinyMceMockTextBox" runat="server" Columns="100" Rows="15" CssClass="markupConsole"
            TextMode="MultiLine" Wrap="false"></asp:TextBox>
    </div>
    <span ondblclick="this.style.display='none';">
        <asp:TextBox ID="errConsoleTextBox" runat="server" CssClass="errConsole" TextMode="MultiLine"
            Wrap="false" Visible="false"></asp:TextBox>
            </span>
    </div>
    </form>
</body>
</html>
