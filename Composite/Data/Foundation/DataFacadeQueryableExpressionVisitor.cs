using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.Types;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration;


namespace Composite.Data.Foundation
{
    /// <summary>
    /// Pulls queries into the memory if needed. Handles multiple source IQueryable-s
    /// </summary>
    internal sealed class DataFacadeQueryableExpressionVisitor : ExpressionVisitor
    {
        private static readonly MethodInfo _dataFacadeGetDataMethodInfo = typeof(DataFacade).GetMethods().First(x => x.Name == "GetData" && x.IsGenericMethod);
        private static readonly MethodInfo _dataConnectionGetDataMethodInfo = typeof(DataConnection).GetMethods().First(x => x.Name == "Get" && x.IsGenericMethod);

        private static readonly MethodInfo Queryable_Where = StaticReflection.GetGenericMethodInfo(() => System.Linq.Queryable.Where(null, (Expression<Func<int, bool>>)null));
        private static readonly MethodInfo Queryable_Any = typeof(Queryable).GetMethods().Single(x => x.Name == "Any" && x.IsGenericMethod && x.GetParameters().Count() == 1);
        private static readonly MethodInfo Queryable_All = typeof(Queryable).GetMethods().Single(x => x.Name == "All" && x.IsGenericMethod && x.GetParameters().Count() == 2);
        private static readonly MethodInfo Queryable_Count = typeof(Queryable).GetMethods().Single(x => x.Name == "Count" && x.IsGenericMethod && x.GetParameters().Count() == 1);
        private static readonly MethodInfo Queryable_FirstOrDefault = typeof(Queryable).GetMethods().Single(x => x.Name == "FirstOrDefault" && x.IsGenericMethod && x.GetParameters().Count() == 1);
        private static readonly MethodInfo Queryable_SingleOrDefault = typeof(Queryable).GetMethods().Single(x => x.Name == "SingleOrDefault" && x.IsGenericMethod && x.GetParameters().Count() == 1);
        private static readonly MethodInfo Queryable_Take = typeof(Queryable).GetMethods().Single(x => x.Name == "Take" && x.IsGenericMethod && x.GetParameters().Count() == 2);

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
            
                throw new NotSupportedException("Supporing for DataFacade method '{0}' or one of it's overloads not yet implemented".FormatWith(m.Method.Name));
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

                throw new NotSupportedException("Supporing for DataConnection method '{0}' or one of it's overloads not yet implemented".FormatWith(m.Method.Name));
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

            // Processing queries like
            //
            // multipleSourceQueryable.METHOD()
            // multipleSourceQueryable.METHOD(predicate)
            // multipleSourceQueryable(.Where(predicate))*.METHOD()
            // multipleSourceQueryable(.Where(predicate))*.METHOD(predicate)
            //
            // Where the supported METHOD options are: "Where", "Any", "Count", "First" and "FirstOrDefault"

            IQueryable[] sources = null;
            List<Expression> predicates = null;

            if (m.Method.IsStatic
                && (m.Method.Name == "Where"
                    || m.Method.Name == "Any"
                    || m.Method.Name == "All"
                    || m.Method.Name == "Count"
                    || m.Method.Name == "First"
                    || m.Method.Name == "FirstOrDefault"
                    || m.Method.Name == "Single"
                    || m.Method.Name == "SingleOrDefault")
                && (m.Arguments.Count == 1
                    || (m.Arguments.Count == 2 
                        && m.Arguments[1] is UnaryExpression))
                && ExtractMultipleSourceQueryable(m.Arguments[0], ref sources, ref predicates))
            {
                Expression operationPredicate = m.Arguments.Count == 2 ? (m.Arguments[1] as UnaryExpression).Operand : null;

                if (m.Method.Name == "All")
                {
                    _queryable = _queryable ?? new bool[0].AsQueryable(); 

                    return Expression.Constant(All(sources, predicates, operationPredicate));
                }

                if (operationPredicate != null)
                {
                    predicates.Add(operationPredicate);
                }

                if (m.Method.Name == "Where")
                {
                    IQueryable loadedSet = LoadToMemory(sources, predicates);

                    _queryable = _queryable ?? loadedSet;

                    return Expression.Constant(loadedSet);
                }

                _queryable = _queryable ?? new bool[0].AsQueryable();

                if (m.Method.Name == "Any")
                {
                    return Expression.Constant(Any(sources, predicates));
                }

                if (m.Method.Name == "Count")
                {
                    return Expression.Constant(Count(sources, predicates));
                }

                if (m.Method.Name == "First")
                {
                    return Expression.Constant(First(sources, predicates));
                }
                
                if (m.Method.Name == "FirstOrDefault")
                {
                    return Expression.Constant(FirstOrDefault(sources, predicates));
                }

                if (m.Method.Name == "Single")
                {
                    return Expression.Constant(Single(sources, predicates));
                }

                if (m.Method.Name == "SingleOrDefault")
                {
                    return Expression.Constant(SingleOrDefault(sources, predicates));
                }
                
                throw new InvalidOperationException("This code should not be reachable. Current expression: " + m);
            }

            // Processing queries like
            //
            // multipleSourceQueryable(.Where(predicate))*.Take(N)
            if (m.Method.IsStatic
                && m.Method.Name == "Take"
                && (m.Arguments.Count == 2
                    && m.Arguments[1] is ConstantExpression
                    && (m.Arguments[1] as ConstantExpression).Value is int)
                && ExtractMultipleSourceQueryable(m.Arguments[0], ref sources, ref predicates))
            {
                int count = (int) (m.Arguments[1] as ConstantExpression).Value;

                var result = Take(sources, count, predicates);

                _queryable = _queryable ?? result;

                return Expression.Constant(result);
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

        private static bool Any(IQueryable[] sources, IEnumerable<Expression> predicates = null)
        {
            Type elementType = GetElementType(sources);

            foreach (IQueryable query in sources)
            {
                IQueryable filteredQuery = ApplyPredicates(query, elementType, predicates);

                bool any = (bool) Queryable_Any.MakeGenericMethod(elementType).Invoke(null, new object[] { filteredQuery });

                if (any) return true;
            }

            return false;
        }

        private static bool All(IQueryable[] sources, IEnumerable<Expression> predicates, Expression operationPredicate)
        {
            Type elementType = GetElementType(sources);

            foreach (IQueryable query in sources)
            {
                IQueryable filteredQuery = ApplyPredicates(query, elementType, predicates);

                bool all = (bool)Queryable_All.MakeGenericMethod(elementType).Invoke(null, new object[] { filteredQuery, operationPredicate });

                if (!all) return false;
            }

            return true;
        }

        private static int Count(IQueryable[] sources, IEnumerable<Expression> predicates = null)
        {
            Type elementType = GetElementType(sources);

            int result = 0;

            foreach (IQueryable query in sources)
            {
                IQueryable filteredQuery = ApplyPredicates(query, elementType, predicates);

                int count = (int) Queryable_Count.MakeGenericMethod(elementType).Invoke(null, new object[] { filteredQuery });

                result += count;
            }

            return result;
        }

        private static object First(IQueryable[] sources, IEnumerable<Expression> predicates = null)
        {
            var result = FirstOrDefault(sources, predicates);

            if (result == null)
            {
                string predicateInfo = predicates != null ? string.Join(" ANDALSO ", predicates.Select(p => p.ToString())) : "";
                throw new InvalidOperationException("Sequence contains no elements. " + predicateInfo);
            }

            return result;
        }

        private static object FirstOrDefault(IQueryable[] sources, IEnumerable<Expression> predicates = null)
        {
            Type elementType = GetElementType(sources);


            foreach (IQueryable query in sources)
            {
                IQueryable filteredQuery = ApplyPredicates(query, elementType, predicates);

                object result = Queryable_FirstOrDefault.MakeGenericMethod(elementType).Invoke(null, new object[] { filteredQuery });

                // Result can't be value type, so null is always the default value
                if (result != null)
                {
                    return result;
                }
            }

            return null;
        }


        private static object Single(IQueryable[] sources, IEnumerable<Expression> predicates = null)
        {
            var result = SingleOrDefault(sources, predicates);

            if (result == null)
            {
                string predicateInfo = predicates != null ? string.Join(" ANDALSO ", predicates.Select(p => p.ToString())) : "";
                throw new InvalidOperationException("Sequence contains no elements. " + predicateInfo);
            }

            return result;
        }

        private static object SingleOrDefault(IQueryable[] sources, IEnumerable<Expression> predicates = null)
        {
            Type elementType = GetElementType(sources);

            object result = null;

            foreach (IQueryable query in sources)
            {
                IQueryable filteredQuery = ApplyPredicates(query, elementType, predicates);

                object subqueryResult = Queryable_SingleOrDefault.MakeGenericMethod(elementType).Invoke(null, new object[] { filteredQuery });

                if (subqueryResult != null)
                {
                    if (result != null)
                    {
                        string predicateInfo = predicates != null ? string.Join(" ANDALSO ", predicates.Select(p => p.ToString())) : "";
                        throw new InvalidOperationException("More than one value returned. " + predicateInfo);
                    }

                    result = subqueryResult;
                }
            }

            return result;
        }


        private static IQueryable Take(IQueryable[] sources, int count, IEnumerable<Expression> predicates = null)
        {
            Type elementType = GetElementType(sources);

            MethodInfo addRangeToListMethodInfo = DataFacadeReflectionCache.List_AddRangeMethodInfo(elementType);

            Type listType = typeof(List<>).MakeGenericType(elementType);
            var List_Count = listType.GetProperty("Count");
            var list = Activator.CreateInstance(listType);

            int taken = 0;

            foreach (IQueryable query in sources)
            {
                IQueryable filteredQuery = ApplyPredicates(query, elementType, predicates);

                int elementsToTake = count - taken;

                var subList = Queryable_Take.MakeGenericMethod(elementType).Invoke(null, new object[] { filteredQuery, elementsToTake });

                addRangeToListMethodInfo.Invoke(list, new object[] { subList });

                taken = (int) List_Count.GetValue(list, null);

                if(taken == count) break;
            }

            MethodInfo asQueryableMethodInfo = DataFacadeReflectionCache.Queryable_AsQueryableMethodInfo(elementType);

            object listedDataAsQueryable = asQueryableMethodInfo.Invoke(null, new [] { list });

            return (IQueryable)listedDataAsQueryable;
        }

        private static IQueryable LoadToMemory(IQueryable[] sources, IEnumerable<Expression> predicates = null)
        {
            Type elementType = GetElementType(sources);

            MethodInfo addRangeToListMethodInfo = DataFacadeReflectionCache.List_AddRangeMethodInfo(elementType);
            MethodInfo toListMethodInfo = DataFacadeReflectionCache.Enumerable_ToList(elementType);

            IList list = DataFacadeReflectionCache.List_New(elementType);

            foreach (IQueryable query in sources)
            {
                IQueryable filteredQuery = ApplyPredicates(query, elementType, predicates);

                var subList = toListMethodInfo.Invoke(null, new object[] { filteredQuery });

                addRangeToListMethodInfo.Invoke(list, new object[] { subList });
            }

            MethodInfo asQueryableMethodInfo = DataFacadeReflectionCache.Queryable_AsQueryableMethodInfo(elementType);

            object listedDataAsQueryable = asQueryableMethodInfo.Invoke(null, new object[] { list });


            // TODO: remove before release
            if (list.Count > 500)
            {
                Log.LogInformation("DataFacadeQuery", list.Count + " rows in a single query. Element type:" + elementType.FullName);
            }

            return (IQueryable)listedDataAsQueryable;
        }

        private static IQueryable ApplyPredicates(IQueryable queryable, Type elementType,
                                                  IEnumerable<Expression> predicates)
        {
            if (predicates != null)
            {
                foreach (var predicate in predicates)
                {
                    queryable = (IQueryable) Queryable_Where.MakeGenericMethod(elementType).Invoke(null, new object[] {queryable, predicate});
                }
            }

            return queryable;
        }

        /// <summary>
        /// Extracts multiple source queryable with predicates defined in WHERE statements
        /// </summary>
        private static bool ExtractMultipleSourceQueryable(Expression expression, ref IQueryable[] sources, ref List<Expression> predicates)
        {
            if (expression is ConstantExpression)
            {
                var constantExpression = expression as ConstantExpression;

                if (constantExpression.Value is IDataFacadeQueryable 
                    && (constantExpression.Value as IDataFacadeQueryable).Sources.Count() > 1)
                {
                    predicates = new List<Expression>();
                    sources = (constantExpression.Value as IDataFacadeQueryable).Sources.ToArray();
                    return true;
                }
                
                return false;
            }

            if (expression is MethodCallExpression)
            {
                var methodCallExpression = (expression as MethodCallExpression);

                if (methodCallExpression.Method.Name == "Where"
                    && methodCallExpression.Arguments[1] is UnaryExpression
                    && ExtractMultipleSourceQueryable(methodCallExpression.Arguments[0], ref sources, ref predicates))
                {
                    predicates.Add((methodCallExpression.Arguments[1] as UnaryExpression).Operand);
                    return true;
                }
            }

            return false;
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
