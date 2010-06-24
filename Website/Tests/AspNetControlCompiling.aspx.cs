using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Composite.Elements.Plugins.ElementProvider;
using Composite.Elements.Foundation.PluginFacades;
using Composite.StandardPlugins.Elements.ElementProviders.PageElementProvider;
using Composite.Logging;
using Composite.Forms.Plugins.UiControlFactory.Runtime;
using Composite.ConfigurationSystem;
using Composite.Forms.Plugins.UiControlFactory;
using System.Reflection;
using System.IO;
using Composite.IO;
using Composite.Forms.Flows.Plugins.UiContainerFactory.Runtime;
using Composite.Forms.Flows.Plugins.UiContainerFactory;
using Composite.Parallelization;
using Composite.WebClient;
using Composite.Instrumentation;
using System.Threading;


public partial class Tests_AspNetControlCompiling : System.Web.UI.Page
{   
    protected void Page_Load(object sender, EventArgs e)
    {
        if (this.Request.QueryString["abe"] != null)
        {
            IPerformanceCounterToken performanceCounterToken1 = PerformanceCounterFacade.BeginAspNetControlCompile();
            IPerformanceCounterToken performanceCounterToken2 = PerformanceCounterFacade.BeginElementCreation();
            
            Thread.Sleep(5000);
            PerformanceCounterFacade.EndAspNetControlCompile(performanceCounterToken1, 3);
            PerformanceCounterFacade.EndElementCreation(performanceCounterToken2, 2, 5);
            return;
        }


        if (this.Request.QueryString["reset"] != null)
        {
            foreach (string path in ControlCompilerService.GetControlPaths())
            {
                string resolvedPath = PathUtil.Resolve(path);

                FileEx.RemoveReadOnly(resolvedPath);

                string content = File.ReadAllText(resolvedPath);
                File.WriteAllText(resolvedPath, content);

                LoggingService.LogVerbose("Page_Load", path);
            }

            if (this.Request.QueryString["reset"] == "false") return;
        }


        using (DebugLoggingScope.CompletionTime(this.GetType(), "Force compiling controls"))
        {
            ControlCompilerService.CompileAll();
        }
    }
}