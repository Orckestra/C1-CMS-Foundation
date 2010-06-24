using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated.Filter.Foundation;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Functions;
using Composite.Data;
using System.Reflection;
using System.Linq.Expressions;
using Composite.Renderings.Page;
using Composite.Data.Types;
using System.Xml.Linq;
using Composite.Linq;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated.Filter
{
	public sealed class DataReferenceFilter<T> : StandardFunctionBase
        where T : class, IData
	{
        private static readonly ParameterExpression _dataItem = Expression.Parameter(typeof(T), "data");

        public DataReferenceFilter(EntityTokenFactory entityTokenFactory)
            : base("DataReferenceFilter", typeof(T).FullName, typeof(Expression<Func<T, bool>>), entityTokenFactory)
        {
            this.ResourceHandleNameStem = "Composite.IDataGenerated.Filter.DataReferenceFilter";
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider referenceSelector = StandardWidgetFunctions.GetDataReferenceWidget<T>();

                yield return new StandardFunctionParameterProfile(
                    "DataReference",
                    typeof(DataReference<T>),
                    true,
                    new NoValueValueProvider(),
                    referenceSelector);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            DataReference<T> dataReference = parameters.GetParameter<DataReference<T>>("DataReference");

            return dataReference.GetPredicateExpression();
        }
    }
}
