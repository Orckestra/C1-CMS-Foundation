using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;


namespace Composite.Data.Foundation
{
    internal sealed class DataFacadeQueryableGathererExpressionVisitor : Composite.Core.Linq.Disassembled.ExpressionVisitor
    {
        private List<IDataFacadeQueryable> _multibleSourceQueryables = new List<IDataFacadeQueryable>();
        private int _sourceCount = 0;

        public override Expression VisitConstant(ConstantExpression c)
        {
            if (c.Value is IDataFacadeQueryable)
            {
                IDataFacadeQueryable multibleSourceQueryable = (IDataFacadeQueryable)c.Value;

                _sourceCount += multibleSourceQueryable.Sources.Count();

                IDataFacadeQueryable found = _multibleSourceQueryables.Find(delegate(IDataFacadeQueryable queryable) { return object.ReferenceEquals(multibleSourceQueryable, queryable); });

                if (found == null)
                {
                    _multibleSourceQueryables.Add(multibleSourceQueryable);
                }
            }

            return base.VisitConstant(c);
        }


        public List<IDataFacadeQueryable> MultibleSourceQueryables
        {
            get { return _multibleSourceQueryables; }
        }


        public int SourceCount
        {
            get { return _sourceCount; }
        }
    }
}
