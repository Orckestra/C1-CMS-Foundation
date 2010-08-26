using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Composite.Data;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated
{
	internal sealed class GetNullableDataReference<T> : StandardFunctionBase
        where T : class, IData
	{
        private static readonly ParameterExpression _dataItem = Expression.Parameter(typeof(T), "data");

        public GetNullableDataReference(EntityTokenFactory entityTokenFactory)
            : base("GetNullableDataReference", typeof(T).FullName, typeof(NullableDataReference<T>), entityTokenFactory)
        {
            this.ResourceHandleNameStem = "Composite.IDataGenerated.GetNullableDataReference";
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                var keyPropertyInfo = DataAttributeFacade.GetKeyPropertyInfoes(typeof(T)).Single();

                WidgetFunctionProvider referenceSelector = StandardWidgetFunctions.GetNullableDataReferenceWidget<T>();

                yield return new StandardFunctionParameterProfile(
                    "KeyValue",
                    keyPropertyInfo.PropertyType,
                    false,
                    new ConstantValueProvider(new NullableDataReference<T>()),
                    referenceSelector);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            object keyValue = parameters.GetParameter("KeyValue");

            return new NullableDataReference<T>(keyValue);
        }
    }
}
