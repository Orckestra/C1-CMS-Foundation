using System;
using System.CodeDom;


namespace Composite.Validation
{
	public interface IPropertyValidatorBuilder
	{
        /// <summary>
        /// This method should return a CodeAttributeDeclaration that will beused for 
        /// code genereting the correct attribute this class represents.
        /// </summary>
        /// <returns></returns>
//MRJ: Data module refac: Change this to return something else: AttributeType and List of strings for making CodeSnippitExpression
        CodeAttributeDeclaration GetCodeAttributeDeclaration();


        Attribute GetAttribute();
	}
}
