using System.Web.WebPages;

namespace Composite.AspNet
{
    internal static class DisplayModeFacade
    {
        public static void Initialize()
        {
            DisplayModeProvider.Instance.Modes.Insert(0, new LegacyC1DisplayMode("mobile")
            {
                ContextCondition = ctx => ctx.GetOverriddenBrowser().IsMobileDevice
            });
        }
    }
}