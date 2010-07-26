using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Functions;
using Composite.Data;
using System.Reflection;
using System.Linq.Expressions;
using Composite.Renderings.Page;
using Composite.Data.Types;
using System.Xml.Linq;
using Composite.Linq;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated
{
	internal sealed class GetDataReference<T> : StandardFunctionBase
        where T : class, IData
	{
        private static readonly ParameterExpression _dataItem = Expression.Parameter(typeof(T), "data");

        public GetDataReference(EntityTokenFactory entityTokenFactory)
            : base("GetDataReference", typeof(T).FullName, typeof(DataReference<T>), entityTokenFactory)
        {
            this.ResourceHandleNameStem = "Composite.IDataGenerated.GetDataReference";
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                var keyPropertyInfo = DataAttributeFacade.GetKeyPropertyInfoes(typeof(T)).Single();

                WidgetFunctionProvider referenceSelector = StandardWidgetFunctions.GetDataReferenceWidget<T>();

                yield return new StandardFunctionParameterProfile(
                    "KeyValue",
                    keyPropertyInfo.PropertyType,
                    true,
                    new NoValueValueProvider(),
                    referenceSelector);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            object keyValue = parameters.GetParameter("KeyValue");

            return new DataReference<T>(keyValue);
        }
    }
}
