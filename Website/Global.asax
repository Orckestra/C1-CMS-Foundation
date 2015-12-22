<%@ Application Language="C#" %>
<%@ Import Namespace="System.Web.Routing" %>
<%@ Import Namespace="Composite.Core.Routing" %>
<%@ Import Namespace="Composite.Core.WebClient" %>


<script RunAt="server">


    void Application_Start(object sender, EventArgs e)
    {
        ApplicationLevelEventHandlers.LogRequestDetails = false;
        ApplicationLevelEventHandlers.LogApplicationLevelErrors = true;
        
        ApplicationLevelEventHandlers.Application_Start(sender, e);

        RegisterRoutes(RouteTable.Routes);
    }


    public static void RegisterRoutes(RouteCollection routes)
    {
        Routes.RegisterPageRoute(routes);

        // If necessary, add the standard MVC route "{controller}/{action}/{id}" after registering the C1 page route
        
        Routes.Register404Route(routes);
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

    public override string GetVaryByCustomString(HttpContext context, string custom)
    {
        return ApplicationLevelEventHandlers.GetVaryByCustomString(context, custom) ?? base.GetVaryByCustomString(context, custom);
    }

</script>

