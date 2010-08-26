using System;
using System.Collections.Generic;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Functions;
using Composite.Data;
using System.Linq.Expressions;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated.Filter
{
	internal sealed class CompoundFilter<T> : StandardFunctionBase, ICompoundFunction
        where T : class, IData
	{
        private static readonly ParameterExpression _dataItem = Expression.Parameter(typeof(T), "data");

        public CompoundFilter(EntityTokenFactory entityTokenFactory)
            : base("CompoundFilter", typeof(T).FullName, typeof(Expression<Func<T, bool>>), entityTokenFactory)
        {
            this.ResourceHandleNameStem = "Composite.IDataGenerated.Filter.CompoundFilter";
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider isAndQuerySelector = StandardWidgetFunctions.GetBoolSelectorWidget("And query", "Or Query");

                yield return new StandardFunctionParameterProfile(
                    "IsAndQuery",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(true),
                    isAndQuerySelector);

                yield return new StandardFunctionParameterProfile(
                    "Left",
                    typeof(Expression<Func<T, bool>>),
                    true,
                    new NoValueValueProvider(),
                    null);

                yield return new StandardFunctionParameterProfile(
                    "Right",
                    typeof(Expression<Func<T, bool>>),
                    true,
                    new NoValueValueProvider(),
                    null);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            bool isAndQuery = parameters.GetParameter<bool>("IsAndQuery");
            Expression<Func<T, bool>> left = parameters.GetParameter<Expression<Func<T, bool>>>("Left");
            Expression<Func<T, bool>> right = parameters.GetParameter<Expression<Func<T, bool>>>("Right");

            Expression compound;

            if (isAndQuery == true)
            {
                Expression leftFilter = Expression.Invoke(left, _dataItem);
                Expression rightFilter = Expression.Invoke(right, _dataItem);
                compound = Expression.And(leftFilter, rightFilter);
            }
            else
            {
                Expression leftFilter = Expression.Invoke(left, _dataItem);
                Expression rightFilter = Expression.Invoke(right, _dataItem);
                compound = Expression.Or(leftFilter, rightFilter);
            }

            Expression<Func<T, bool>> lambdaExpression = Expression.Lambda<Func<T, bool>>(compound, new ParameterExpression[] { _dataItem });

            return lambdaExpression;
        }

        public bool AllowRecursiveCall
        {
            get { return true; }
        }
    }
}
