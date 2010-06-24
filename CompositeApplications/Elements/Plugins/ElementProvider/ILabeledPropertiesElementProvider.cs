using System.Collections.Generic;
using Composite.Security;


namespace Composite.Elements.Plugins.ElementProvider
{
	public interface ILabeledPropertiesElementProvider : IHooklessElementProvider
	{
        IEnumerable<LabeledProperty> GetLabeledProperties(EntityToken entityToken);        
	}
}
