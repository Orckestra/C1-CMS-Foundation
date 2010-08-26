using System.Linq;
using Composite.Core.Linq;
using System.Linq.Expressions;
using System.Reflection;


namespace Composite.C1Console.Trees.Foundation.FolderRanges
{
    internal sealed class StringFolderRanges : BaseFolderRanges
    {
        private readonly MethodInfo StringCompareMethodInfo = typeof(string).GetMethods().Where(f => f.Name == "Compare").First();
        private readonly MethodInfo ToUpperCompareMethodInfo = typeof(string).GetMethods().Where(f => f.Name == "ToUpper").First();


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

                currentExpression = Expression.Condition(
                    Expression.AndAlso(
                        Expression.NotEqual(
                            fieldExpression,
                            Expression.Constant(null, typeof(string))
                        ),
                        Expression.AndAlso(
                            Expression.GreaterThanOrEqual(
                                Expression.Call(
                                    this.StringCompareMethodInfo,
                                    Expression.Call(
                                        fieldExpression,
                                        this.ToUpperCompareMethodInfo
                                    ),
                                    Expression.Constant(
                                        minValue.ToUpper()
                                    )
                                ),
                                Expression.Constant(0)
                            ),
                            Expression.LessThanOrEqual(
                                Expression.Call(
                                    this.StringCompareMethodInfo,
                                    Expression.Call(
                                        fieldExpression,
                                        this.ToUpperCompareMethodInfo
                                    ),
                                    Expression.Constant(
                                        maxValue.ToUpper() + (char)(64967) + (char)(64967) + (char)(64967)
                                    )
                                ),
                                Expression.Constant(0)
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

                Expression expression = CreateFolderRangeExpression(folderRange, fieldExpression);

                return expression;
            }
            else
            {
                Expression currentExpression = null;
                foreach (IFolderRange folderRange in this.Ranges.Where(f => f.Index != -1))
                {
                    Expression expression = CreateFolderRangeExpression(folderRange, fieldExpression);

                    expression = Expression.Not(expression);

                    currentExpression = currentExpression.NestedAnd(expression);
                }

                return currentExpression;
            }
        }



        private Expression CreateFolderRangeExpression(IFolderRange folderRange, Expression fieldExpression)
        {
            string minValue = GetMinValue(folderRange);
            string maxValue = GetMaxValue(folderRange);            

            Expression expression = Expression.AndAlso(
                Expression.NotEqual(
                    fieldExpression,
                    Expression.Constant(null, typeof(string))
                ),
                Expression.AndAlso(
                    Expression.GreaterThanOrEqual(
                        Expression.Call(
                            this.StringCompareMethodInfo,
                            Expression.Call(
                                fieldExpression,
                                this.ToUpperCompareMethodInfo
                            ),
                            Expression.Constant(
                                minValue.ToUpper()
                            )
                        ),
                        Expression.Constant(0)
                    ),
                    Expression.LessThanOrEqual(
                        Expression.Call(
                            this.StringCompareMethodInfo,
                            Expression.Call(
                                fieldExpression,
                                this.ToUpperCompareMethodInfo
                            ),
                            Expression.Constant(
                                maxValue.ToUpper() + (char)(64967) + (char)(64967) + (char)(64967)
                            )
                        ),
                        Expression.Constant(0)
                    )
                )
            );

            return expression;
        }



        private string GetMinValue(IFolderRange folderRange)
        {
            if (folderRange.IsMinOpenEnded == false) return (string)folderRange.MinValue;
            else return "" + (char.MinValue + 1) + (char.MinValue + 1) + (char.MinValue + 1);
        }


        private string GetMaxValue(IFolderRange folderRange)
        {
            if (folderRange.IsMaxOpenEnded == false) return (string)folderRange.MaxValue;
            else return "" + char.MaxValue + char.MaxValue + char.MaxValue;
        }
    }
}
