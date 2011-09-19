namespace Composite.Core.ResourceSystem.Icons
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class CommonCommandIcons
    {
        /// <exclude />
        public static ResourceHandle AddNew { get { return GetIconHandle("generic-add"); } }
        /// <exclude />
        public static ResourceHandle Edit { get { return GetIconHandle("generic-edit"); } }
        /// <exclude />
        public static ResourceHandle Refresh { get { return GetIconHandle("generic-refresh"); } }
        /// <exclude />
        public static ResourceHandle Delete { get { return GetIconHandle("generic-delete"); } }
        /// <exclude />
        public static ResourceHandle Search { get { return GetIconHandle("generic-search"); } }
        /// <exclude />
        public static ResourceHandle SetSecurity { get { return GetIconHandle("generic-set-security"); } }
        /// <exclude />
        public static ResourceHandle ShowHistory { get { return GetIconHandle("generic-show-history"); } }
        /// <exclude />
        public static ResourceHandle ShowReport { get { return GetIconHandle("generic-show-report"); } }


        //private static ResourceHandle GetIconHandle()
        //{
        //    return new ResourceHandle(BuildInIconProviderName.ProviderName, "unknown");
        //}

        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}
