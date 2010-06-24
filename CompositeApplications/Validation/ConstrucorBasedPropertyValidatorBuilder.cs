using System;
using System.CodeDom;

namespace Composite.Validation
{
    public sealed class ConstrucorBasedPropertyValidatorBuilder<T> : PropertyValidatorBuilder<T>
    {
        private CodeAttributeDeclaration _codeAttributeDeclaration;
        private Attribute _attribute;


        public ConstrucorBasedPropertyValidatorBuilder(CodeAttributeDeclaration codeAttributeDeclaration, Attribute attribute)
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
