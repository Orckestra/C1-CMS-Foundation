using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Linq;


namespace Composite.C1Console.Trees.Foundation.FolderRanges
{
    internal sealed class StringFolderRanges : BaseFolderRanges
    {
        private readonly MethodInfo StringCompare_MethodInfo = typeof(string).GetMethods().First(f => f.Name == "Compare");
        private readonly MethodInfo StringToUpper_MethodInfo = typeof(string).GetMethods().First(f => f.Name == "ToUpper");
        private readonly MethodInfo StringStartsWith_MethodInfo = typeof(string).GetMethods().First(f => f.Name == "StartsWith");


        public override Expression CreateContainsListSelectBodyExpression(Expression fieldExpression, ParameterExpression parameterExpression)
        {
            Expression currentExpression = null;

            foreach (IFolderRange folderRange in this.Ranges)
            {
                string minValue = GetMinValue(folderRange);
                string maxValue = GetMaxValue(folderRange);

                if (currentExpression == null)
                {
                    currentExpression = Expression.Constant(-1);
                }

                var fieldToUpper = Expression.Call(fieldExpression, this.StringToUpper_MethodInfo);

                currentExpression = Expression.Condition(
                    Expression.AndAlso(
                        Expression.NotEqual(
                            fieldExpression,
                            Expression.Constant(null, typeof(string))
                        ),
                        Expression.AndAlso(
                            Expression.GreaterThanOrEqual(
                                Expression.Call(
                                    this.StringCompare_MethodInfo,
                                    fieldToUpper,
                                    Expression.Constant(minValue.ToUpperInvariant())
                                ),
                                Expression.Constant(0)
                            ),
                            Expression.OrElse(
                                Expression.LessThanOrEqual(
                                    Expression.Call(
                                        this.StringCompare_MethodInfo,
                                        fieldToUpper,
                                        Expression.Constant(maxValue.ToUpperInvariant())
                                    ),
                                    Expression.Constant(0)
                                ),
                                Expression.Call(fieldToUpper, StringStartsWith_MethodInfo, Expression.Constant(maxValue.ToUpperInvariant()))
                            )
                            
                        )
                    ),
                    Expression.Constant(folderRange.Index),
                    currentExpression
                );
            }

            return currentExpression;
        }



        public override Expression CreateFilterExpression(int folderRangeIndex, Expression fieldExpression)
        {
            if (folderRangeIndex != -1)
            {
                IFolderRange folderRange = this.GetFolderRange(folderRangeIndex);

                return CreateFolderRangeExpression(folderRange, fieldExpression);
            }
            
            Expression currentExpression = null;
            foreach (IFolderRange folderRange in this.Ranges.Where(f => f.Index != -1))
            {
                Expression expression = CreateFolderRangeExpression(folderRange, fieldExpression);

                expression = Expression.Not(expression);

                currentExpression = currentExpression.NestedAnd(expression);
            }

            return currentExpression;
        }



        private Expression CreateFolderRangeExpression(IFolderRange folderRange, Expression fieldExpression)
        {
            string minValue = GetMinValue(folderRange);
            string maxValue = GetMaxValue(folderRange);

            var fieldToUpper = Expression.Call(fieldExpression, this.StringToUpper_MethodInfo);

            Expression expression = Expression.AndAlso(
                Expression.NotEqual(
                    fieldExpression,
                    Expression.Constant(null, typeof(string))
                ),
                Expression.AndAlso(
                    Expression.GreaterThanOrEqual(
                        Expression.Call(
                            this.StringCompare_MethodInfo,
                            fieldToUpper,
                            Expression.Constant(minValue.ToUpperInvariant())
                        ),
                        Expression.Constant(0)
                    ),

                    Expression.OrElse(
                        Expression.LessThanOrEqual(
                            Expression.Call(
                                this.StringCompare_MethodInfo,
                                fieldToUpper,
                                Expression.Constant(maxValue.ToUpperInvariant())
                            ),
                            Expression.Constant(0)
                        ),

                        Expression.Call(fieldToUpper, StringStartsWith_MethodInfo, Expression.Constant(maxValue.ToUpperInvariant()))
                    )
                    
                )
            );

            return expression;
        }



        private static string GetMinValue(IFolderRange folderRange)
        {
            if (folderRange.IsMinOpenEnded)
            {
                return "" + (char.MinValue + 1) + (char.MinValue + 1) + (char.MinValue + 1);
            }

            return (string) folderRange.MinValue;
        }


        private static string GetMaxValue(IFolderRange folderRange)
        {
            if (folderRange.IsMaxOpenEnded)
            {
                return "" + char.MaxValue + char.MaxValue + char.MaxValue;
            }

            return (string) folderRange.MaxValue;
        }
    }
}
