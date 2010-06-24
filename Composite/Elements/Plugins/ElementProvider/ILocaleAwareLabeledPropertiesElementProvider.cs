using System.Collections.Generic;
using Composite.Security;


namespace Composite.Elements.Plugins.ElementProvider
{
	public interface ILocaleAwareLabeledPropertiesElementProvider : ILocaleAwareElementProvider
	{
        IEnumerable<LabeledProperty> GetForeignLabeledProperties(EntityToken entityToken);
	}
}
