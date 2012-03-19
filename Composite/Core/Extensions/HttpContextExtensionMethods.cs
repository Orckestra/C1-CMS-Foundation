using System.Reflection;
using System.Web;

namespace Composite.Core.Extensions
{
    /// <exclude />
    public static class HttpContextExtensionMethods
    {
        private static readonly FieldInfo HideRequestResponseFieldInfo = typeof(HttpContext).GetField("HideRequestResponse", BindingFlags.Instance | BindingFlags.NonPublic);

        /// <exclude />
        public static bool RequestIsAvaliable(this HttpContext httpContext)
        {
            return !(bool) HideRequestResponseFieldInfo.GetValue(httpContext);
        }
    }
}
