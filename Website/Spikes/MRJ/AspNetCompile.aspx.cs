using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Composite.Types;
using System.Reflection;
using System.Collections;

namespace Composite.Spikes.MRJ
{
    public partial class AspNetCompile : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            FieldInfo theBuildManagerFieldInfo = typeof(System.Web.Compilation.BuildManager).GetField("_theBuildManager", BindingFlags.NonPublic | BindingFlags.Static);
            FieldInfo cachesManagerFieldInfo = typeof(System.Web.Compilation.BuildManager).GetField("_caches", BindingFlags.NonPublic | BindingFlags.Instance);

            object currentBuilderManager = theBuildManagerFieldInfo.GetValue(null);
            IEnumerable caches = cachesManagerFieldInfo.GetValue(currentBuilderManager) as IEnumerable;

            Type standardDiskBuildResultCacheType = caches.OfType<object>().Where(f => f.GetType().FullName == "System.Web.Compilation.StandardDiskBuildResultCache").Select(f => f.GetType()).Single();
            FieldInfo maxRecompilationsFieldInfo = standardDiskBuildResultCacheType.BaseType.GetField("s_maxRecompilations", BindingFlags.NonPublic | BindingFlags.Static);

            object oldValue = maxRecompilationsFieldInfo.GetValue(null);
            maxRecompilationsFieldInfo.SetValue(null, 100);
            Response.Write("Old value = " + oldValue + "<br />");
        }
    }
}
