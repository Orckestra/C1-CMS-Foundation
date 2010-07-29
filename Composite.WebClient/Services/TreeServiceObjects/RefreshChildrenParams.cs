namespace Composite.WebClient.Services.TreeServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class RefreshChildrenParams
	{
        public string ProviderName { get; set; }
        public string EntityToken { get; set; }  
        public string Piggybag { get; set; }
	}
}
