using System.Collections.Generic;
using Composite.C1Console.Elements.Plugins.ElementActionProvider.Runtime;
using Composite.C1Console.Security;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementActionProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [CustomFactory(typeof(ElementActionProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(ElementActionProviderDefaultNameRetriever))]
	public interface IElementActionProvider
	{
        IEnumerable<ElementAction> GetActions(EntityToken entityToken);
	}
}
