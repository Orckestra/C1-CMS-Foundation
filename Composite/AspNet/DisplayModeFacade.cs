using System.Web;
using System.Web.WebPages;

namespace Composite.AspNet
{
    /// <summary>
    /// 
    /// </summary>
    public static class DisplayModeFacade
    {
        /// <summary>
        /// 
        /// </summary>
        public static void Initialize()
        {
            DisplayModeProvider.Instance.Modes.Insert(0, new LegacyC1DisplayMode("mobile")
            {
                ContextCondition = ctx => ctx.GetOverriddenBrowser().IsMobileDevice
            });

            DisplayModeProvider.Instance.Modes.Insert(0, new DefaultDisplayMode("print")
            {
                ContextCondition = PrintCondition
            });

            DisplayModeProvider.Instance.Modes.Insert(0, new LegacyC1DisplayMode("print")
            {
                ContextCondition = PrintCondition
            });
        }

        private static bool PrintCondition(HttpContextBase ctx)
        {
            var qs = ctx.Request.QueryString;

            return qs.AllKeys.Length > 0 && qs.Keys[0] == null && qs[0] == "print";
        }
    }
}