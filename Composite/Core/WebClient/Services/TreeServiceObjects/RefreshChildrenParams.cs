namespace Composite.Core.WebClient.Services.TreeServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class RefreshChildrenParams
	{
        /// <exclude />
        public string ProviderName { get; set; }

        /// <exclude />
        public string EntityToken { get; set; }

        /// <exclude />
        public string Piggybag { get; set; }

		/// <exclude />
		public string SearchToken { get; set; }
	}
}
