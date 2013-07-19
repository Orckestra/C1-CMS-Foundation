using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Types;
using Composite.Data.Types;

namespace Composite.Plugins.Data.DataProviders.VirtualImageFileProvider
{
    internal class VirtualImageFileQueryableVisitor: ExpressionVisitor
    {
        private static readonly MethodInfo Queryable_Count = typeof(Queryable).GetMethods().Single(x => x.Name == "Count" && x.IsGenericMethod && x.GetParameters().Count() == 1);
        private static readonly MethodInfo Queryable_Where = StaticReflection.GetGenericMethodInfo(() => System.Linq.Queryable.Where(null, (Expression<Func<int, bool>>)null));
        private static readonly MethodInfo Queryable_Take = typeof(Queryable).GetMethods().Single(x => x.Name == "Take" && x.IsGenericMethod && x.GetParameters().Count() == 2);
        private static readonly MethodInfo Queryable_First = typeof(Queryable).GetMethods().Single(x => x.Name == "First" && x.IsGenericMethod && x.GetParameters().Count() == 1);
        private static readonly MethodInfo Queryable_FirstOrDefault = typeof(Queryable).GetMethods().Single(x => x.Name == "FirstOrDefault" && x.IsGenericMethod && x.GetParameters().Count() == 1);
        private static readonly MethodInfo Queryable_Single = typeof(Queryable).GetMethods().Single(x => x.Name == "Single" && x.IsGenericMethod && x.GetParameters().Count() == 1);
        private static readonly MethodInfo Queryable_SingleOrDefault = typeof(Queryable).GetMethods().Single(x => x.Name == "SingleOrDefault" && x.IsGenericMethod && x.GetParameters().Count() == 1);

        protected override Expression VisitConstant(ConstantExpression node)
        {
            if (node.Value is IVirtualImageFileQueryable)
            {
                return Visit((node.Value as IVirtualImageFileQueryable).Source.Expression);
            }

            return base.VisitConstant(node);
        }

        protected override Expression VisitMethodCall(MethodCallExpression m)
        {
            // Trying to convert trees like
            //     IQueryable<IMediaFile>.Select(mediaFile => (new VirtualImageFile(mediaFile) As IImageFile)).METHOD([Condition])
            // to
            //      IQueryable<IMediaFile>.METHOD([Condition])[.Select(mediaFile => (new VirtualImageFile(mediaFile) As IImageFile)]

            if (m.Method.DeclaringType != typeof(Queryable)
                || !m.Method.IsGenericMethod
                || m.Method.GetGenericArguments()[0] != typeof(IImageFile))
            {
                return base.VisitMethodCall(m);
            }

            var firstArgument = Visit(m.Arguments[0]);

            if (!(firstArgument is MethodCallExpression
                  && (firstArgument as MethodCallExpression).Method.Name == "Select"
                  && (firstArgument as MethodCallExpression).Method.GetGenericArguments()[0] == typeof(IMediaFile)
                  && (firstArgument as MethodCallExpression).Method.GetGenericArguments()[1] == typeof(IImageFile)))
            {
                return base.VisitMethodCall(m);
            }

            var mediaFileExpression = (firstArgument as MethodCallExpression).Arguments[0];
            var selectorMethod = (firstArgument as MethodCallExpression).Method;
            var selectorLambdaExpression = (firstArgument as MethodCallExpression).Arguments[1];

            // Converting
            //     IQueryable<IMediaFile>.Select(mediaFile => ...).Count([condition])
            //     IQueryable<IMediaFile>.Select(mediaFile => ...).Any([condition])
            //     IQueryable<IMediaFile>.Select(mediaFile => ...).All([condition])
            // to
            //     IQueryable<IMediaFile>.Count([condition])
            //     IQueryable<IMediaFile>.Any([condition])
            //     IQueryable<IMediaFile>.All([condition])
            
            if (m.Method.Name == "Count" || m.Method.Name == "Any" || m.Method.Name == "All")
            {
                var mediaFileMethod = m.Method.GetGenericMethodDefinition().MakeGenericMethod(typeof (IMediaFile));

                if (m.Arguments.Count == 1)
                {
                    return base.Visit(Expression.Call(mediaFileMethod, mediaFileExpression));
                }

                var condition = new ParameterTypeReplacer().Visit(m.Arguments[1]);

                return base.Visit(Expression.Call(mediaFileMethod, mediaFileExpression, condition));
            }


            // Converting
            //     IQueryable<IMediaFile>.Select(mediaFile => ....).Where(CONDITION)
            // to
            //     IQueryable<IMediaFile>.Where(CONDITION).Select(mediaFile => ....)

            if (m.Method.Name == "Where" && m.Arguments[1] is UnaryExpression)
            {
                var Where_mediaFile = m.Method.GetGenericMethodDefinition().MakeGenericMethod(typeof(IMediaFile));

                var convertedCondition = new ParameterTypeReplacer().Visit(m.Arguments[1]);

                //     IQueryable<IMediaFile>.Where(CONDITION)
                var whereExpression = Expression.Call(Where_mediaFile, mediaFileExpression, convertedCondition);

                //     IQueryable<IMediaFile>.Where(CONDITION).Select(mediaFile => ....)
                return base.Visit(Expression.Call(selectorMethod, whereExpression, selectorLambdaExpression));
            }


            // Converting
            //     IQueryable<IMediaFile>.Select(mediaFile => ....).Take(count)
            // to
            //     IQueryable<IMediaFile>.Take(count).Select(mediaFile => ....)

            if (m.Method.Name == "Take"
                && m.Arguments[1] is ConstantExpression
                && (m.Arguments[1] as ConstantExpression).Value is int)
            {
                var Take_mediaFile = m.Method.GetGenericMethodDefinition().MakeGenericMethod(typeof(IMediaFile));

                //     IQueryable<IMediaFile>.Take(count)
                var takeExpression = Expression.Call(Take_mediaFile, mediaFileExpression, m.Arguments[1]);

                //     IQueryable<IMediaFile>.Take(count).Select(mediaFile => ....)
                return base.Visit(Expression.Call(selectorMethod, takeExpression, selectorLambdaExpression));
            }


            // Converting
            //     IQueryable<IMediaFile>.Select(mediaFile => ....).First([predicate])
            //     IQueryable<IMediaFile>.Select(mediaFile => ....).FirstOrDefault([predicate])
            //     IQueryable<IMediaFile>.Select(mediaFile => ....).Single([predicate])
            //     IQueryable<IMediaFile>.Select(mediaFile => ....).SingleOrDefault([predicate])
            // to
            //     IQueryable<IMediaFile>[.Where(predicate)].Take(1).Select(mediaFile => ....).First()
            //     IQueryable<IMediaFile>[.Where(predicate)].Take(1).Select(mediaFile => ....).FirstOrDefault()
            //     IQueryable<IMediaFile>[.Where(predicate)].Take(2).Select(mediaFile => ....).Single()
            //     IQueryable<IMediaFile>[.Where(predicate)].Take(2).Select(mediaFile => ....).SingleOrDefault()

            if ((m.Method.Name == "First" 
                || m.Method.Name == "FirstOrDefault"
                || m.Method.Name == "Single"
                || m.Method.Name == "SingleOrDefault")
                && (m.Arguments.Count == 1
                    || (m.Arguments.Count == 2
                        && m.Arguments[1] is UnaryExpression)))
            {
                var predicate = m.Arguments.Count == 2 ? (m.Arguments[1] as UnaryExpression).Operand : null;

                // IQueryable<IMediaFile>[.Where(predicate)]
                var filteredMediaExpression = predicate != null 
                    ? Expression.Call(Queryable_Where.MakeGenericMethod(typeof (IMediaFile)), mediaFileExpression, ConvertPredicate(predicate))
                    : mediaFileExpression;

                bool isSingleQuery = m.Method.Name == "Single" || m.Method.Name == "SingleOrDefault";

                //     IQueryable<IMediaFile>[.Where(predicate)].Take(1)
                var takeExpression = Expression.Call(Queryable_Take.MakeGenericMethod(typeof (IMediaFile)),
                    filteredMediaExpression, Expression.Constant(isSingleQuery ? 2 : 1));

                //     IQueryable<IMediaFile>[.Where(predicate)].Take(1).Select(mediaFile => ....)
                //     IQueryable<IMediaFile>[.Where(predicate)].Take(2).Select(mediaFile => ....)
                var selector = Expression.Call(selectorMethod, takeExpression, selectorLambdaExpression);


                var method = isSingleQuery
                    ? (m.Method.Name == "Single" ? Queryable_Single : Queryable_SingleOrDefault).MakeGenericMethod(typeof(IMediaFile))
                    : (m.Method.Name == "First" ? Queryable_First : Queryable_FirstOrDefault).MakeGenericMethod(typeof(IMediaFile));

                //     IQueryable<IMediaFile>[.Where(predicate)].Take(1).Select(mediaFile => ....).First()
                //     IQueryable<IMediaFile>[.Where(predicate)].Take(1).Select(mediaFile => ....).FirstOrDefault()
                //     IQueryable<IMediaFile>[.Where(predicate)].Take(2).Select(mediaFile => ....).Single()
                //     IQueryable<IMediaFile>[.Where(predicate)].Take(2).Select(mediaFile => ....).SingleOrDefault()
                return base.Visit(Expression.Call(method, selector));
            }

            return base.VisitMethodCall(m);

        }

        /// <summary>
        /// Converts predicates Expression&lt;Func&lt;IImage, bool&gt;&gt; to Expression&lt;Func&lt;IMediaFile, bool&gt;&gt;
        /// </summary>
        private static Expression ConvertPredicate(Expression predicate)
        {
            return new ParameterTypeReplacer().Visit(predicate);
        }

        /// <summary>
        /// Replace parameters of type <see cref="IImageFile" /> with parameters of type <see cref="IMediaFile" />
        /// </summary>
        private sealed class ParameterTypeReplacer : ExpressionVisitor
        {
            readonly Dictionary<ParameterExpression, ParameterExpression> ParameterMap = new Dictionary<ParameterExpression, ParameterExpression>();

            protected override Expression VisitParameter(ParameterExpression parameter)
            {
                if (parameter.Type == typeof (IImageFile))
                {
                    if (!ParameterMap.ContainsKey(parameter))
                    {
                        ParameterMap.Add(parameter, Expression.Parameter(typeof (IMediaFile), parameter.Name));
                    }

                    return base.VisitParameter(ParameterMap[parameter]);
                }

                return base.VisitParameter(parameter);
            }

            protected override Expression VisitLambda<T>(Expression<T> node)
            {
                if (typeof (T) != typeof (Func<IImageFile, bool>))
                {
                    return base.VisitLambda<T>(node);
                }

                return Expression.Lambda<Func<IMediaFile, bool>>(Visit(node.Body), Visit(node.Parameters[0]) as ParameterExpression);
            }
        }
    }
}
