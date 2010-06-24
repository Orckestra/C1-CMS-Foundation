namespace Composite.WebClient.Services.TreeServiceObjects
{
	public sealed class RefreshChildrenParams
	{
        public string ProviderName { get; set; }
        public string EntityToken { get; set; }  
        public string Piggybag { get; set; }
	}
}
