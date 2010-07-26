using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Composite.WebClient
{
	internal static class ConsoleInfo
	{
        public static string TryGetConsoleId()
        {
            if (HttpContext.Current != null && HttpContext.Current.Request != null && HttpContext.Current.Request.QueryString != null)
            {
                return HttpContext.Current.Request.QueryString["consoleId"];
            }
            else
            {
                return null;
            }

        }
	}
}
