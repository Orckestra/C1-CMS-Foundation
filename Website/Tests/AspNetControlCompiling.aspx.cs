using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Elements.Foundation.PluginFacades;
using Composite.Plugins.Elements.ElementProviders.PageElementProvider;
using Composite.Core.Logging;
using Composite.C1Console.Forms.Plugins.UiControlFactory.Runtime;
using Composite.Core.Configuration;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using System.Reflection;
using System.IO;
using Composite.Core.IO;
using Composite.C1Console.Forms.Flows.Plugins.UiContainerFactory.Runtime;
using Composite.C1Console.Forms.Flows.Plugins.UiContainerFactory;
using Composite.Core.Parallelization;
using Composite.Core.WebClient;
using Composite.Core.Instrumentation;
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