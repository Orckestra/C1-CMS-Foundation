using System.Collections.Generic;
using Composite.Elements.Plugins.ElementActionProvider.Runtime;
using Composite.Security;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementActionProvider
{
    [CustomFactory(typeof(ElementActionProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(ElementActionProviderDefaultNameRetriever))]
	internal interface IElementActionProvider
	{
        IEnumerable<ElementAction> GetActions(EntityToken entityToken);
	}
}
