using System;
using System.Collections.Generic;
using System.Linq;

namespace Composite.Data.Types
{
    /// <summary>
    /// Represents a data item with timed publishing
    /// </summary>
    public abstract class VersionedPageHelperContract
    {
        public abstract string LocalizedVersionName<T>(T str) where T : IVersioned;
    }

    public static class VersionedPageHelper
    {
        private static List<VersionedPageHelperContract> instances;

        public static void RegisterVersionHelper(VersionedPageHelperContract vpc)
        {
            if(instances==null)
                instances = new List<VersionedPageHelperContract>();
            instances.Add(vpc);
        }

        public static string LocalizedVersionName<T>(this T str) where T : IVersioned
        {
            if (instances == null)
                return "";
            return instances.Select(p=>p.LocalizedVersionName(str)).Single(p=>p != null);
        }
    }
}
