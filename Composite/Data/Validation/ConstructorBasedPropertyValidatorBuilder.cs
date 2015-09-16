using System;
using System.CodeDom;

namespace Composite.Data.Validation
{
    internal sealed class ConstructorBasedPropertyValidatorBuilder<T> : PropertyValidatorBuilder<T>
    {
        private readonly CodeAttributeDeclaration _codeAttributeDeclaration;
        private readonly Attribute _attribute;


        public ConstructorBasedPropertyValidatorBuilder(CodeAttributeDeclaration codeAttributeDeclaration, Attribute attribute)
        {
            _codeAttributeDeclaration = codeAttributeDeclaration;
            _attribute = attribute;
        }


        public override CodeAttributeDeclaration GetCodeAttributeDeclaration()
        {
            return _codeAttributeDeclaration;
        }


        public override Attribute GetAttribute()
        {
            return _attribute;
        }
    }
}
