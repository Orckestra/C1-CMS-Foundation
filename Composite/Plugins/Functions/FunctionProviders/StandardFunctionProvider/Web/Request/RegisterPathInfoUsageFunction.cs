using System;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Core.Routing.Pages;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Request
{
    internal sealed class RegisterPathInfoUsageFunction : StandardFunctionBase
    {
        public RegisterPathInfoUsageFunction(EntityTokenFactory entityTokenFactory)
            : base("RegisterPathInfoUsage", "Composite.Web.Request", typeof(void), entityTokenFactory)
        {
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                yield break;
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            C1PageRoute.RegisterPathInfoUsage();

            return null;
        }
    }
}
