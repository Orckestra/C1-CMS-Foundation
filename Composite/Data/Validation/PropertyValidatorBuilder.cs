using System;
using System.CodeDom;


namespace Composite.Data.Validation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public abstract class PropertyValidatorBuilder<T> : IPropertyValidatorBuilder
	{
        /// <summary>
        /// This method should return a CodeAttributeDeclaration that will beused for 
        /// code generating the correct attribute this class represents.
        /// </summary>
        /// <returns></returns>
        public abstract CodeAttributeDeclaration GetCodeAttributeDeclaration();


        /// <exclude />
        public abstract Attribute GetAttribute();
	}
}
