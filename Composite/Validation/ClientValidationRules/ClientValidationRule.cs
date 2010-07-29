using System;
using Composite.Serialization;

namespace Composite.Validation.ClientValidationRules
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    [SerializerHandler(typeof(ClientValidationRuleSerializerHandler))]
	public abstract class ClientValidationRule
	{
	}
}
