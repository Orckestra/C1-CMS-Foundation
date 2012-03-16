using System;
using System.Data.Linq;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration;


namespace Composite.Data.Foundation
{
    internal sealed class DataFacadeQueryableExpressionVisitor : ExpressionVisitor
    {
        private static readonly MethodInfo _dataFacadeGetDataMethodInfo = typeof(DataFacade).GetMethods().Where(x => x.Name == "GetData" && x.IsGenericMethod).First();
        private static readonly MethodInfo _dataConnectionGetDataMethodInfo = typeof(DataConnection).GetMethods().Where(x => x.Name == "Get" && x.IsGenericMethod).First();

        private bool _pullAllToMemory;
        private IQueryable _queryable = null;



        public DataFacadeQueryableExpressionVisitor(bool pullAllToMemeory)
        {
            _pullAllToMemory = pullAllToMemeory;
        }



        protected override Expression VisitConstant(ConstantExpression c)
        {
            if (c.Value is IDataFacadeQueryable)
            {
                IQueryable queryable = HandleMultibleSourceQueryable(c.Value);

                return queryable.Expression;
            }
            else
            {
                return base.VisitConstant(c);
            }
        }




        protected override Expression VisitMember(MemberExpression m)
        {
            if (m.Member.DeclaringType.IsCompilerGeneratedType() == true)
            {
                if (m.Member.MemberType == MemberTypes.Field)
                {
                    Type fieldType = ((FieldInfo)m.Member).FieldType;

                    if ((fieldType.IsGenericType == true) &&
                        (fieldType.GetGenericTypeDefinition() == typeof(IQueryable<>)) &&
                        (m.Expression.NodeType == ExpressionType.Constant))
                    {
                        // Container for holding a IQueryable<TARGET_TYPE>

                        ConstantExpression constatntExpression = (ConstantExpression)m.Expression;
                        FieldInfo fieldInfo = (FieldInfo)m.Member;

                        object value = fieldInfo.GetValue(constatntExpression.Value);

                        IQueryable queryable = HandleMultibleSourceQueryable(value);

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
                if ((m.Method.IsGenericMethod == true) &&
                     (m.Method.GetGenericMethodDefinition() == _dataFacadeGetDataMethodInfo))
                {
                    object result = m.Method.Invoke(null, null);

                    return Expression.Constant(result is IDataFacadeQueryable ? HandleMultibleSourceQueryable(result) : result);
                }

                // Handling some of the overloads of GetData()
                if (m.Method.Name == _dataFacadeGetDataMethodInfo.Name && m.Arguments.All(arg => (arg as ConstantExpression) != null))
                {
                    object[] parameters = m.Arguments.Select(arg => (arg as ConstantExpression).Value).ToArray();

                    object result = m.Method.Invoke(null, parameters);

                    return Expression.Constant(result is IDataFacadeQueryable ? HandleMultibleSourceQueryable(result) : result);
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

                    return Expression.Constant(result is IDataFacadeQueryable ? HandleMultibleSourceQueryable(result) : result);
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



        private IQueryable HandleMultibleSourceQueryable(object multibleSourceQueryableCandidate)
        {
            IDataFacadeQueryable multibleSourceQueryable = multibleSourceQueryableCandidate as IDataFacadeQueryable;

            if (multibleSourceQueryable == null) return null;

            IQueryable queryable;

            if (_pullAllToMemory == false && multibleSourceQueryable.Sources.Count() == 1)
            {
                queryable = multibleSourceQueryable.Sources.First();
            }
            else
            {
                IQueryable[] sources = multibleSourceQueryable.Sources.ToArray();

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

                MethodInfo addRangeToListMethodInfo = DataFacadeQueryableCache.GetAddRangeToListMethodInfo(elementType);
                MethodInfo toListMethodInfo = DataFacadeQueryableCache.GetToListMethodInfo(elementType);

                Type listType = DataFacadeQueryableCache.GetListType(elementType);
                var listedData = Activator.CreateInstance(listType);

                foreach (IQueryable query in sources)
                {
                    var subList = toListMethodInfo.Invoke(null, new object[] { query });

                    addRangeToListMethodInfo.Invoke(listedData, new object[] { subList });
                }

                MethodInfo asQueryableMethodInfo = DataFacadeQueryableCache.GetAsQueryableMethodInfo(elementType);

                object listedDataAsQueryable = asQueryableMethodInfo.Invoke(null, new object[] { listedData });

                queryable = (IQueryable)listedDataAsQueryable;
            }

            if (_queryable == null)
            {
                _queryable = queryable;
            }

            return queryable;
        }
    }
}
