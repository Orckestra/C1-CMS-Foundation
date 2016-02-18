namespace Composite.Core.WebClient.Services.TreeServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ClientActionCategory
    {
        /// <exclude />
        public string GroupId { get; set; }

		/// <exclude />
		public string GroupName { get; set; }

        /// <exclude />
        public string Name { get; set; }

        /// <exclude />
        public bool IsInToolbar { get; set; }

        /// <exclude />
        public bool IsInFolder { get; set; }

        /// <exclude />
        public string FolderName { get; set; }

        /// <exclude />
        public string ActionBundle { get; set; }
    }
}
