using System;
using Composite.C1Console.Elements;

namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class PageSearchToken : SearchToken
	{
        /// <exclude />
        public Guid? HomePageId { get; set; }
	}
}
