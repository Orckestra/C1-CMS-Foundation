using System;
using System.CodeDom;

namespace Composite.Data.DynamicTypes
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [Serializable]
    public class SearchProfile
    {
        /// <exclude />
        public bool IndexText { get; set; }

        /// <exclude />
        public bool EnablePreview { get; set; }

        /// <exclude />
        public bool IsFacet { get; set; }

        /// <exclude />
        public SearchProfile Clone()
        {
            return new SearchProfile
            {
                IndexText = IndexText,
                EnablePreview = EnablePreview,
                IsFacet = IsFacet
            };
        }

        /// <exclude />
        internal CodeAttributeDeclaration GetCodeAttributeDeclaration()
        {
            if (!IndexText && !EnablePreview && !IsFacet)
            {
                return null;
            }

            return new CodeAttributeDeclaration(
                typeof(SearchableFieldAttribute).FullName,
                    new CodeAttributeArgument(new CodePrimitiveExpression(IndexText)),
                    new CodeAttributeArgument(new CodePrimitiveExpression(EnablePreview)),
                    new CodeAttributeArgument(new CodePrimitiveExpression(IsFacet)));
        }
    }
}
