<%@ Control Language="C#" Inherits="Composite.Plugins.Forms.WebChannel.UiControlFactories.PageReferenceSelectorTemplateUserControlBase" %>
<%@ Import Namespace="Composite.Core.Routing" %>
<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="Composite.Data.Types" %>

<script runat="server">
    // NOTE: This control is not used anymore
   
    private bool _initialized = false;
    
    protected override void BindStateToProperties()
    {
        if (!string.IsNullOrEmpty(pageSelectorDialog.Value))
        {
            Guid pageId = Guid.Parse(pageSelectorDialog.Value);
            this.Selected = DataReferenceFacade.BuildDataReference(typeof(IPage), pageId) as DataReference<IPage>;
        }
        else
        {
            this.Selected = null;
        }
        _initialized = true;
    }

        
    protected override void InitializeViewState()
    {
        _initialized = true;
    }

    protected override void OnPreRender(EventArgs e)
    {
        if (!_initialized)
        {
            BindStateToProperties();
        }
        
        base.OnPreRender(e);

        DataReference<IPage> reference = this.Selected;

        if (reference == null || reference.IsSet != true)
        {
            pageSelectorDialog.Value = string.Empty;
            pageSelectorDialog.Attributes["label"] = "Select a page";
            pageSelectorDialog.Attributes["tooltip"] = "";
            return;
        }
        
        Guid pageId = (Guid) reference.KeyValue;
        IPage page = DataFacade.GetData<IPage>(f => f.Id == pageId).FirstOrDefault();
        string pageTitle = page != null ? page.Title : null;
        if (!string.IsNullOrEmpty(pageTitle))
        {
            pageSelectorDialog.Value = pageId.ToString();
            pageSelectorDialog.Attributes["label"] = pageTitle;

            string pageUrl = PageUrls.BuildUrl(page);
            if (pageUrl != null)
            {
                int aspxOffset = pageUrl.IndexOf(".aspx");
                if (aspxOffset > -1)
                {
                    pageUrl = pageUrl.Substring(0, aspxOffset);
                }
                pageSelectorDialog.Attributes["tooltip"] = pageUrl;
            }
        }
    }

    public override string GetDataFieldClientName()
    {
        return pageSelectorDialog.UniqueID;
    }
    
</script>

<aspui:PostBackDialog 
    runat="server"
	id="pageSelectorDialog"  
	label="" 
	tooltip=""
	handle="Composite.Management.PageIdSelectorDialog"
	value=""/>

