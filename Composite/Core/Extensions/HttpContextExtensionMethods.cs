using System.Reflection;
using System.Web;

namespace Composite.Core.Extensions
{
    internal static class HttpContextExtensionMethods
    {
        private static readonly FieldInfo HideRequestResponseFieldInfo = typeof(HttpContext).GetField("HideRequestResponse", BindingFlags.Instance | BindingFlags.NonPublic);

        public static bool RequestIsAvaliable(this HttpContext httpContext)
        {
            return !(bool) HideRequestResponseFieldInfo.GetValue(httpContext);
        }
    }
}
