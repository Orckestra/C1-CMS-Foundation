using System;
using System.CodeDom;

namespace Composite.Validation
{
	public abstract class PropertyValidatorBuilder<T> : IPropertyValidatorBuilder
	{
        /// <summary>
        /// This method should return a CodeAttributeDeclaration that will beused for 
        /// code genereting the correct attribute this class represents.
        /// </summary>
        /// <returns></returns>
        public abstract CodeAttributeDeclaration GetCodeAttributeDeclaration();


        public abstract Attribute GetAttribute();
	}
}
