using System.Collections.Generic;


namespace Composite.WebClient.Services.TreeServiceObjects
{
    public sealed class ClientProviderNameEntityTokenClientElementsTriple
	{        
        public string ProviderName { get; set; }
        public string EntityToken { get; set; }  
        public List<ClientElement> ClientElements { get; set; }
	}
}
