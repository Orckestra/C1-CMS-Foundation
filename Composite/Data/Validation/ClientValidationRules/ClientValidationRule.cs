using System;
using Composite.Core.Serialization;

namespace Composite.Data.Validation.ClientValidationRules
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
