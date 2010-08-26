using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public abstract class ValueTypeConverterHelperAttribute : Attribute
	{
        public abstract bool TryConvert(object sourcevalue, Type targetType, out object targetValue);

	}
}
