namespace Composite.ResourceSystem.Icons
{
    public static class CommonCommandIcons
    {
        public static ResourceHandle AddNew { get { return GetIconHandle("generic-add"); } }
        public static ResourceHandle Edit { get { return GetIconHandle("generic-edit"); } }
        public static ResourceHandle Refresh { get { return GetIconHandle("generic-refresh"); } }
        public static ResourceHandle Delete { get { return GetIconHandle("generic-delete"); } }
        public static ResourceHandle Search { get { return GetIconHandle("generic-search"); } }
        public static ResourceHandle SetSecurity { get { return GetIconHandle("generic-set-security"); } }
        public static ResourceHandle ShowHistory { get { return GetIconHandle("generic-show-history"); } }
        public static ResourceHandle ShowReport { get { return GetIconHandle("generic-show-report"); } }



        private static ResourceHandle GetIconHandle()
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, "unknown");
        }


        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}
