<%@ Application Language="C#" %>
<%@ Import Namespace="Composite.Core.WebClient" %>

<script RunAt="server">
    void Application_Start(object sender, EventArgs e)
    {
        ApplicationLevelEventHandlers.LogRequestDetails = false;
        ApplicationLevelEventHandlers.LogApplicationLevelErrors = false;
        
        ApplicationLevelEventHandlers.Application_Start(sender, e);
    }

    
    void Application_End(object sender, EventArgs e)
    {
        ApplicationLevelEventHandlers.Application_End(sender, e);
    }

    
    void Application_BeginRequest(object sender, EventArgs e)
    {
        ApplicationLevelEventHandlers.Application_BeginRequest(sender, e);
    }

    
    void Application_EndRequest(object sender, EventArgs e)
    {
        ApplicationLevelEventHandlers.Application_EndRequest(sender, e);
    }

    
    protected void Application_Error(object sender, EventArgs e)
    {
        ApplicationLevelEventHandlers.Application_Error(sender, e);
    }
</script>

