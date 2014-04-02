<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.InfoTableTemplateUserControlBase"  %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Xml.Linq" %>
<%@ Import Namespace="Composite.Plugins.Forms.WebChannel.UiControlFactories" %>
<%@ Register Src="../../Helpers/StyleFileLoaderControl.ascx" TagPrefix="control" TagName="StyleLoader" %>

<control:StyleLoader adminRelativePath="controls/FormsControls/FormUiControlTemplates/Text/InfoTable.css" runat="server" />

<script runat="server">    
    protected override void InitializeViewState(){}

    private string BuildTable()
    {
    	string result = "";
    
    	if (this.Rows != null && this.Rows.Count > 0)
        {
            foreach (List<string> row in this.Rows)
            {
            	foreach (string columnText in row) {
	                result += "<br/><br/>" + Server.HtmlEncode(columnText);
	            }
            }
        }
    
    	return result;
    
    	/*
        if ((this.Rows == null || this.Rows.Count == 0) && (this.Headers == null || this.Headers.Count == 0))
            return "";

        StringBuilder tableClassNamesBuilder = new StringBuilder("infoTableUiControl");
        if (this.Border == true) tableClassNamesBuilder.Append(" infoTableUiControl_border");

        XElement tableElement = new XElement("table", new XAttribute("class", tableClassNamesBuilder.ToString()));

        if (string.IsNullOrEmpty(this.Caption) == false)
        {
            tableElement.Add(new XElement("caption", this.Caption));
        }
        
        if (this.Headers != null && this.Headers.Count > 0)
        {
            XElement tableHead = new XElement("thead");
            XElement tableHeadRow = new XElement("tr");
            
            foreach (string columnHeaderText in this.Headers)
                tableHeadRow.Add(new XElement("th", columnHeaderText));

            tableHead.Add(tableHeadRow);
            tableElement.Add(tableHead);
        }

        if (this.Rows != null && this.Rows.Count > 0)
        {
            XElement tableBody = new XElement("tbody");

            foreach (List<string> row in this.Rows)
            {
                XElement tableRow = new XElement("tr");
                foreach (string columnText in row)
                    tableRow.Add(new XElement("td", columnText ));

                tableBody.Add(tableRow);
            }

            tableElement.Add(tableBody);
        }
        
        return tableElement.ToString();
        */
    }
</script>


<%= BuildTable() %>



