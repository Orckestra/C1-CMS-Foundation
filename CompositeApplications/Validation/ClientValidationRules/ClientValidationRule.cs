using System;
using Composite.Serialization;

namespace Composite.Validation.ClientValidationRules
{
    [Serializable]
    [SerializerHandler(typeof(ClientValidationRuleSerializerHandler))]
	public abstract class ClientValidationRule
	{
	}
}
