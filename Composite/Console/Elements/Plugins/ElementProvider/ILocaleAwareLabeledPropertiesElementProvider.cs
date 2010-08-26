using System.Collections.Generic;
using Composite.C1Console.Security;


namespace Composite.C1Console.Elements.Plugins.ElementProvider
{
	internal interface ILocaleAwareLabeledPropertiesElementProvider : ILocaleAwareElementProvider
	{
        IEnumerable<LabeledProperty> GetForeignLabeledProperties(EntityToken entityToken);
	}
}
