using System;
using System.Linq;
using System.Linq.Expressions;
using Composite.Core.Linq;
using Composite.Core.Types;
using Composite.Data;

namespace Composite.Core.Routing
{
    internal class DataReferenceRelativeRouteToPredicateMapper<TDataType, TField> 
        : IRelativeRouteToPredicateMapper<TField> where TDataType: class, IData
    {
        private readonly IRelativeRouteToPredicateMapper<TDataType> _dataTypeMapper;

        public DataReferenceRelativeRouteToPredicateMapper(IRelativeRouteToPredicateMapper<TDataType> dataTypeMapper)
        {
            _dataTypeMapper = dataTypeMapper;
        }

        public int PathSegmentsCount
        {
            get { return _dataTypeMapper.PathSegmentsCount; }
        }

        public Expression<Func<TField, bool>> GetPredicate(Guid pageId, RelativeRoute relativeRoute)
        {
            var dataPredicate = _dataTypeMapper.GetPredicate(pageId, relativeRoute);
            if (dataPredicate == null) return null;


            var data = DataFacade.GetData<TDataType>(dataPredicate).Evaluate();
            if (data.Count == 0)
            {
                return null;
            }

            if (data.Count > 1)
            {
                throw new DataUrlCollisionException(typeof(TDataType), relativeRoute);
            }

            var keyObject = data.First().GetUniqueKey();
            var key = ValueTypeConverter.Convert<TField>(keyObject);

            var paramExpr = Expression.Parameter(typeof (TField));
            var body = Expression.Equal(paramExpr, Expression.Constant(key));
            return Expression.Lambda<Func<TField, bool>>(body, paramExpr);
        }

        public RelativeRoute GetRoute(TField fieldValue, bool fieldSearchSignificant)
        {
            var data = DataFacade.TryGetDataByUniqueKey<TDataType>((object)fieldValue);
            if (data == null)
            {
                return null;
            }

            return _dataTypeMapper.GetRoute(data, fieldSearchSignificant);
        }
    }
}
