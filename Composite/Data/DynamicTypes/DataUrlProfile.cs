using System;
using System.CodeDom;
using Composite.Core.Extensions;

namespace Composite.Data.DynamicTypes
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [Serializable]
    public class DataUrlProfile
    {
        /// <exclude />
        public int Order { get; set; }

        /// <exclude />
        public DataUrlSegmentFormat? Format { get; set; }

        /// <exclude />
        public DataUrlProfile Clone()
        {
            return new DataUrlProfile {Order = Order, Format = Format};
        }

        /// <exclude />
        internal CodeAttributeDeclaration GetCodeAttributeDeclaration()
        {
            if (Format == null || Format.Value == DataUrlSegmentFormat.Undefined)
            {
                return new CodeAttributeDeclaration(
                            typeof(RouteSegmentAttribute).FullName,
                                new CodeAttributeArgument( 
                                    new CodePrimitiveExpression(Order)));
            }

            var dateSegment = GetDateSegmentFormat();
            return new CodeAttributeDeclaration(typeof (RouteDateSegmentAttribute).FullName,
                new CodeAttributeArgument(new CodePrimitiveExpression(Order)),
                new CodeAttributeArgument(new CodeFieldReferenceExpression(
                    // Referencing an enum value
                    new CodeTypeReferenceExpression(typeof(DateSegmentFormat)), dateSegment.ToString())));
        }

        private DateSegmentFormat GetDateSegmentFormat()
        {
            switch (Format.Value)
            {
                case DataUrlSegmentFormat.DateTime_Year: return DateSegmentFormat.Year;
                case DataUrlSegmentFormat.DateTime_YearMonth: return DateSegmentFormat.YearMonth;
                case DataUrlSegmentFormat.DateTime_YearMonthDay: return DateSegmentFormat.YearMonthDay;
            }

            throw new InvalidOperationException("Failed to convert '{0}' to DateSegmentFormat".FormatWith(Format.Value));
        }
    }

    

    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public enum DataUrlSegmentFormat
    {
        /// <exclude />
        Undefined = 0,
        /// <exclude />
        DateTime_Year = 1,
        /// <exclude />
        DateTime_YearMonth = 2,
        /// <exclude />
        DateTime_YearMonthDay = 3
    }
}
