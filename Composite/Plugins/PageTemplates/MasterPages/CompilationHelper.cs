using System;
using System.Reflection;
using System.Web;
using System.Web.Compilation;
using System.Web.UI;
using System.Web.Util;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    internal static class CompilationHelper
    {
        public static MasterPage CompileMasterPage(string virtualPath)
        {
            // Calling: object virtualPathObj = new System.Web.VirtualPath(virtualPath);
            Assembly asmSystemWeb = typeof(HttpContext).Assembly;
            Type tVirtualType = asmSystemWeb.GetType("System.Web.VirtualPath");
            var virtualTypeConstructor = tVirtualType.GetConstructor(BindingFlags.NonPublic | BindingFlags.Instance, null,
                                                                     new[] { typeof(string) }, null);
            object virtualPathObj = virtualTypeConstructor.Invoke(new object[] { virtualPath });

            // Calling: return System.Web.Compilation.BuildManager.GetVPathBuildResultWithNoAssert(null, virtualPathObj, false, false, false)

            IWebObjectFactory factory = typeof(BuildManager)
                                            .GetMethod("GetVPathBuildResultWithNoAssert",
                                                       BindingFlags.NonPublic | BindingFlags.Static,
                                                       null,
                                                       CallingConventions.Any,
                                                       new Type[] { typeof(HttpContext), tVirtualType, typeof(bool), typeof(bool), typeof(bool) },
                                                       null)
                                            .Invoke(null, new object[] { null, virtualPathObj, false, false, false }) as IWebObjectFactory;

            Verify.IsNotNull(factory, "Failed to compile master page file");

            return factory.CreateInstance() as MasterPage;
        }
    }
}
