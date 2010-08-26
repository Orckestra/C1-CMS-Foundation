using System.Linq;
using System.Linq.Expressions;
using Composite.Core.Linq;


namespace Composite.C1Console.Trees.Foundation.FolderRanges
{
    internal sealed class IntFolderRanges : BaseFolderRanges
    {
        public override Expression CreateContainsListSelectBodyExpression(Expression fieldExpression, ParameterExpression parameterExpression)
        {
            Expression currentExpression = null;

            foreach (IFolderRange folderRange in this.Ranges)
            {
                int minValue = (int)folderRange.MinValue;
                int maxValue = (int)folderRange.MaxValue;


                if (currentExpression == null)
                {
                    currentExpression = Expression.Constant(-1);
                }

                Expression minExpression = Expression.GreaterThanOrEqual(
                    fieldExpression,
                    Expression.Constant(minValue)
                );

                Expression maxExpression = Expression.LessThanOrEqual(
                    fieldExpression,
                    Expression.Constant(maxValue)
                );

                if (folderRange.IsMinOpenEnded == true)
                {
                    currentExpression = Expression.Condition(
                        maxExpression,
                        Expression.Constant(folderRange.Index),
                        currentExpression
                    );
                }
                else if (folderRange.IsMaxOpenEnded == true)
                {
                    currentExpression = Expression.Condition(
                        minExpression,
                        Expression.Constant(folderRange.Index),
                        currentExpression
                    );
                }
                else
                {
                    currentExpression = Expression.Condition(
                        Expression.AndAlso(
                            minExpression,
                            maxExpression
                        ),
                        Expression.Constant(folderRange.Index),
                        currentExpression
                    );
                }
            }

            return currentExpression;
        }



        public override Expression CreateFilterExpression(int folderRangeIndex, Expression fieldExpression)
        {
            if (folderRangeIndex != -1)
            {
                IFolderRange folderRange = this.GetFolderRange(folderRangeIndex);

                int minValue = (int)folderRange.MinValue;
                int maxValue = (int)folderRange.MaxValue;

                Expression minExpression = Expression.GreaterThanOrEqual(
                    fieldExpression,
                    Expression.Constant(minValue)
                );

                Expression maxExpression = Expression.LessThanOrEqual(
                    fieldExpression,
                    Expression.Constant(maxValue)
                );

                Expression expression;
                if (folderRange.IsMinOpenEnded == true)
                {
                    expression = maxExpression;
                }
                else if (folderRange.IsMaxOpenEnded == true)
                {
                    expression = minExpression;
                }
                else
                {
                    expression = Expression.And(minExpression, maxExpression);
                }

                return expression;
            }
            else
            {
                Expression currentExpression = null;
                foreach (IFolderRange folderRange in this.Ranges.Where(f => f.Index != -1))
                {
                    int minValue = (int)folderRange.MinValue;
                    int maxValue = (int)folderRange.MaxValue;

                    Expression minExpression = Expression.GreaterThanOrEqual(
                        fieldExpression,
                        Expression.Constant(minValue)
                    );

                    Expression maxExpression = Expression.LessThanOrEqual(
                        fieldExpression,
                        Expression.Constant(maxValue)
                    );

                    if (folderRange.IsMinOpenEnded == true)
                    {
                        currentExpression = currentExpression.NestedAnd(Expression.Not(maxExpression));
                    }
                    else if (folderRange.IsMaxOpenEnded == true)
                    {
                        currentExpression = currentExpression.NestedAnd(Expression.Not(minExpression));
                    }
                    else
                    {
                        currentExpression = currentExpression.NestedAnd(
                            Expression.Not(
                                Expression.And(
                                    minExpression,
                                    maxExpression
                                )
                            )
                        );
                    }
                }

                return currentExpression;
            }
        }
    }
}
