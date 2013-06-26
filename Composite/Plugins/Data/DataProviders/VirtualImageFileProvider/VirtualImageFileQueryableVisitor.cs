using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using Composite.Core.Types;
using Composite.Data.Types;

namespace Composite.Plugins.Data.DataProviders.VirtualImageFileProvider
{
    internal class VirtualImageFileQueryableVisitor: ExpressionVisitor
    {
        private static readonly MethodInfo Queryable_Count = typeof(Queryable).GetMethods().Single(x => x.Name == "Count" && x.IsGenericMethod && x.GetParameters().Count() == 1);

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
            var selectorLambdaExpression = (firstArgument as MethodCallExpression).Arguments[1];


            /*
            // Converting
            //     IQueryable<IMediaFile>.Select(mediaFile => ...).Count([condition])
            // to
            //     IQueryable<IMediaFile>.Count([condition])
            */
            if (m.Method.Name == "Count")
            {
                var mediaFileMethod = m.Method.GetGenericMethodDefinition().MakeGenericMethod(typeof (IMediaFile));

                if (m.Arguments.Count == 1)
                {
                    return base.Visit(Expression.Call(mediaFileMethod, mediaFileExpression));
                }

                var condition = new ParameterTypeReplacer().Visit(m.Arguments[1]);

                return base.Visit(Expression.Call(mediaFileMethod, mediaFileExpression, condition));
            }


            /*
            // Converting
            //     IQueryable<IMediaFile>.Select(mediaFile => (new VirtualImageFile(mediaFile) As IImageFile)).Where([condition])
            // to
            //     IQueryable<IMediaFile>.Method([condition]).Where(mediaFile => (new VirtualImageFile(mediaFile) As IImageFile))
            */
           

            return base.VisitMethodCall(m);

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
