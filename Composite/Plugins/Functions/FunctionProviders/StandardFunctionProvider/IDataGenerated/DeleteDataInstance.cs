using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Linq;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.IDataGenerated
{
    internal sealed class DeleteDataInstance<T> : StandardFunctionBase
        where T : class, IData
    {
        private List<StandardFunctionParameterProfile> _parameterProfiles = null;



        public DeleteDataInstance(EntityTokenFactory entityTokenFactory)
            : base("DeleteDataInstance", typeof(T).FullName, typeof(void), entityTokenFactory)
        {
            this.ResourceHandleNameStem = "Composite.IDataGenerated.DeleteDataInstance";
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                if (_parameterProfiles == null)
                {
                    _parameterProfiles = new List<StandardFunctionParameterProfile>();                    

                    Expression<Func<T, bool>> defaultFilter = DataFacade.GetEmptyPredicate<T>();

                    _parameterProfiles.Add(new StandardFunctionParameterProfile(
                        "Filter",
                        typeof(Expression<Func<T, bool>>),
                        false,
                        new ConstantValueProvider(defaultFilter),
                        null
                    ));
                }

                return _parameterProfiles;
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            Expression<Func<T, bool>> filter = parameters.GetParameter<Expression<Func<T, bool>>>("Filter");

            DataFacade.Delete<T>(filter);

            return null;
        }
    }
}
