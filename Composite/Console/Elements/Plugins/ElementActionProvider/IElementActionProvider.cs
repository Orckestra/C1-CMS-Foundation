using System.Collections.Generic;
using Composite.C1Console.Elements.Plugins.ElementActionProvider.Runtime;
using Composite.C1Console.Security;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementActionProvider
{
    [CustomFactory(typeof(ElementActionProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(ElementActionProviderDefaultNameRetriever))]
	internal interface IElementActionProvider
	{
        IEnumerable<ElementAction> GetActions(EntityToken entityToken);
	}
}
