using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Linq;


namespace Composite.Data.Foundation
{
    internal sealed class DataFacadeQueryableExpressionVisitor : ExpressionVisitor
    {
        private static readonly MethodInfo _genericGetDataMethodInfo = typeof(DataFacade).GetMethods().Where(x => x.Name == "GetData" && x.IsGenericMethod == true).First();

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
            if (m.Method.DeclaringType != typeof (DataFacade))
            {
                return base.VisitMethodCall(m);
            }

            
            if ((m.Method.IsGenericMethod == true) &&
                (m.Method.GetGenericMethodDefinition() == _genericGetDataMethodInfo))
            {
                object result = m.Method.Invoke(null, null);

                IQueryable queryable = HandleMultibleSourceQueryable(result);

                return Expression.Constant(queryable);
            }

            // Handling some of the overloads of GetData()
            if (m.Method.Name == _genericGetDataMethodInfo.Name && m.Arguments.All(arg => (arg as ConstantExpression) != null))
            {
                object[] parameters = m.Arguments.Select(arg => (arg as ConstantExpression).Value).ToArray();

                object result = m.Method.Invoke(null, parameters);

                IQueryable queryable = HandleMultibleSourceQueryable(result);

                return Expression.Constant(queryable);
            }
            
            throw new NotImplementedException("This is fixable");
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
