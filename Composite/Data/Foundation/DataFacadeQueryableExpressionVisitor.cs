using System;
using System.Data.Linq;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.Types;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration;


namespace Composite.Data.Foundation
{
    internal sealed class DataFacadeQueryableExpressionVisitor : ExpressionVisitor
    {
        private static readonly MethodInfo _dataFacadeGetDataMethodInfo = typeof(DataFacade).GetMethods().First(x => x.Name == "GetData" && x.IsGenericMethod);
        private static readonly MethodInfo _dataConnectionGetDataMethodInfo = typeof(DataConnection).GetMethods().First(x => x.Name == "Get" && x.IsGenericMethod);

        private static readonly MethodInfo Queryable_Where = StaticReflection.GetGenericMethodInfo(() => System.Linq.Queryable.Where(null, (Expression<Func<int, bool>>)null));
        private static readonly MethodInfo Queryable_Any = typeof(Queryable).GetMethods().Single(x => x.Name == "Any" && x.IsGenericMethod && x.GetParameters().Count() == 1);

        private readonly bool _pullAllToMemory;
        private IQueryable _queryable;



        public DataFacadeQueryableExpressionVisitor(bool pullAllToMemeory)
        {
            _pullAllToMemory = pullAllToMemeory;
        }



        protected override Expression VisitConstant(ConstantExpression c)
        {
            if (c.Value is IDataFacadeQueryable)
            {
                IQueryable queryable = HandleMultipleSourceQueryable(c.Value);

                return queryable.Expression;
            }
            
            return base.VisitConstant(c);
        }




        protected override Expression VisitMember(MemberExpression m)
        {
            if (m.Member.DeclaringType.IsCompilerGeneratedType())
            {
                if (m.Member.MemberType == MemberTypes.Field)
                {
                    Type fieldType = ((FieldInfo)m.Member).FieldType;

                    if ((fieldType.IsGenericType) &&
                        (fieldType.GetGenericTypeDefinition() == typeof(IQueryable<>)) &&
                        (m.Expression.NodeType == ExpressionType.Constant))
                    {
                        // Container for holding a IQueryable<TARGET_TYPE>

                        ConstantExpression constatntExpression = (ConstantExpression)m.Expression;
                        FieldInfo fieldInfo = (FieldInfo)m.Member;

                        object value = fieldInfo.GetValue(constatntExpression.Value);

                        IQueryable queryable = HandleMultipleSourceQueryable(value);

                        if (queryable != null)
                        {
                            fieldInfo.SetValue(constatntExpression.Value, queryable);
                        }
                    }
                }
            }


            return base.VisitMember(m);
        }



        protected override Expression VisitMethodCall(MethodCallExpression m)
        {
            if (m.Method.DeclaringType == typeof (DataFacade))
            {
                if ((m.Method.IsGenericMethod) &&
                     (m.Method.GetGenericMethodDefinition() == _dataFacadeGetDataMethodInfo))
                {
                    object result = m.Method.Invoke(null, null);

                    return Expression.Constant(result is IDataFacadeQueryable ? HandleMultipleSourceQueryable(result) : result);
                }

                // Handling some of the overloads of GetData()
                if (m.Method.Name == _dataFacadeGetDataMethodInfo.Name && m.Arguments.All(arg => (arg as ConstantExpression) != null))
                {
                    object[] parameters = m.Arguments.Select(arg => (arg as ConstantExpression).Value).ToArray();

                    object result = m.Method.Invoke(null, parameters);

                    return Expression.Constant(result is IDataFacadeQueryable ? HandleMultipleSourceQueryable(result) : result);
                }
            
                throw new NotImplementedException("Supporing for DataFacade method '{0}' or one of it's overloads not yet implemented".FormatWith(m.Method.Name));
            }

            if (m.Method.DeclaringType == typeof (DataConnection))
            {
                if (m.Method.IsGenericMethod 
                    && m.Method.GetGenericMethodDefinition() == _dataConnectionGetDataMethodInfo)
                {
                    var dataConnection = EvaluateExpression<DataConnection>(m.Object);
                    object result = m.Method.Invoke(dataConnection, null);

                    return Expression.Constant(result is IDataFacadeQueryable ? HandleMultipleSourceQueryable(result) : result);
                }

                throw new NotImplementedException("Supporing for DataConnection method '{0}' or one of it's overloads not yet implemented".FormatWith(m.Method.Name));
            }

            // Replacing Guid.NewGuid() call with "newid()" sql statement
            if (m.Method.IsStatic && m.Method.DeclaringType == typeof(Guid) && m.Method.Name == "NewGuid"
                && _queryable != null)
            {
                var dataContext = GetContext(_queryable) as DataContextBase;
                if(dataContext != null)
                {
                    return Expression.Call(Expression.Constant(dataContext), DataContextBase.GetNewIdMethodInfo());
                }
            }

            // Processing queries that have multiple IQueryable sources 
            if (m.Method.IsStatic
                && (m.Method.Name == "Where" || m.Method.Name == "FirstOrDefault" || m.Method.Name == "Any" || m.Method.Name == "First")
                && m.Arguments.Count == 2
                && m.Arguments[1] is UnaryExpression
                && m.Arguments[0] is ConstantExpression
                && (m.Arguments[0] as ConstantExpression).Value is IDataFacadeQueryable
                && ((m.Arguments[0] as ConstantExpression).Value as IDataFacadeQueryable).Sources.Count() > 1)
            {
                var condition = m.Arguments[1] as UnaryExpression;
                var sources = ((m.Arguments[0] as ConstantExpression).Value as IDataFacadeQueryable).Sources.ToArray();

                if (m.Method.Name == "Any")
                {
                    _queryable = _queryable ?? new bool[0].AsQueryable(); // TODO: refactor ?

                    return Expression.Constant(Any(sources, condition.Operand));
                }

                IQueryable loadedSet = LoadToMemory(sources, condition.Operand);

                if (_queryable == null)
                {
                    _queryable = loadedSet;
                }

                if (m.Method.Name == "Where")
                {
                    return Expression.Constant(loadedSet);
                }

                var methodToCall = typeof (Queryable).GetMethods()
                    .First(method => method.Name == m.Method.Name 
                        && method.GetParameters().Length == 1)
                    .MakeGenericMethod(m.Method.GetGenericArguments());

                return Expression.Call(methodToCall, Expression.Constant(loadedSet));
            }

            return base.VisitMethodCall(m);
        }


        private static DataContext GetContext(IQueryable q)
        {
            string typeName = q.GetType().FullName;

            if (!typeName.StartsWith("System.Data.Linq.DataQuery`1", StringComparison.Ordinal)
                && !typeName.StartsWith("System.Data.Linq.Table`1", StringComparison.Ordinal))
            {
                return null;
            }

            var field = q.GetType().GetField("context", BindingFlags.NonPublic | BindingFlags.Instance);

            return field == null ? null : field.GetValue(q) as DataContext;
        }



        private TResultType EvaluateExpression<TResultType>(Expression expression)
        {
            return Expression.Lambda<Func<TResultType>>(expression).Compile().Invoke();
        }

        public IQueryable Queryable
        {
            get { return _queryable; }
        }


        private static Type GetElementType(IQueryable[] sources)
        {
            // Choosing element type which is the "highest" in hierarhy. F.e. if we have IQueryable<IPage> and IQueryable<IData>, 
            // the "highest" element type would be IData
            Type elementType = sources[0].ElementType;
            for(int i=1; i<sources.Length; i++)
            {
                if(elementType != sources[i].ElementType && sources[i].ElementType.IsAssignableFrom(elementType))
                {
                    elementType = sources[i].ElementType;
                }
            }

            return elementType;
        }

        private static bool Any(IQueryable[] sources, Expression predicate = null)
        {
            Type elementType = GetElementType(sources);

            foreach (IQueryable query in sources)
            {
                IQueryable filteredQuery = predicate != null
                    ? (IQueryable)Queryable_Where.MakeGenericMethod(elementType).Invoke(null, new object[] { query, predicate })
                    : query;


                bool any = (bool) Queryable_Any.MakeGenericMethod(elementType).Invoke(null, new object[] { filteredQuery });

                if (any) return true;
            }

            return false;
        }

        private static IQueryable LoadToMemory(IQueryable[] sources, Expression predicate = null)
        {
            Type elementType = GetElementType(sources);

            MethodInfo addRangeToListMethodInfo = DataFacadeQueryableCache.GetAddRangeToListMethodInfo(elementType);
            MethodInfo toListMethodInfo = DataFacadeQueryableCache.GetToListMethodInfo(elementType);

            Type listType = DataFacadeQueryableCache.GetListType(elementType);
            var listedData = Activator.CreateInstance(listType);

            foreach (IQueryable query in sources)
            {
                IQueryable filteredQuery = predicate != null 
                    ? (IQueryable)Queryable_Where.MakeGenericMethod(elementType).Invoke(null, new object[] { query, predicate })
                    : query;


                var subList = toListMethodInfo.Invoke(null, new object[] { filteredQuery });

                addRangeToListMethodInfo.Invoke(listedData, new object[] { subList });
            }

            MethodInfo asQueryableMethodInfo = DataFacadeQueryableCache.GetAsQueryableMethodInfo(elementType);

            object listedDataAsQueryable = asQueryableMethodInfo.Invoke(null, new object[] { listedData });

            return (IQueryable)listedDataAsQueryable;
        }

        private IQueryable HandleMultipleSourceQueryable(object multipleSourceQueryableCandidate)
        {
            IDataFacadeQueryable multipleSourceQueryable = multipleSourceQueryableCandidate as IDataFacadeQueryable;

            if (multipleSourceQueryable == null) return null;

            IQueryable queryable;

            if (!_pullAllToMemory && multipleSourceQueryable.Sources.Count() == 1)
            {
                queryable = multipleSourceQueryable.Sources.First();
            }
            else
            {
                IQueryable[] sources = multipleSourceQueryable.Sources.ToArray();

                queryable = LoadToMemory(sources);
            }

            if (_queryable == null)
            {
                _queryable = queryable;
            }

            return queryable;
        }


    }
}
