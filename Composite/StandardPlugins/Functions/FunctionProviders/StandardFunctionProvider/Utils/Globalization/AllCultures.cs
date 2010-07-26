using System;
using System.Linq;
using Composite.Functions;

using System.Collections.Generic;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using System.Globalization;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.Globalization
{
    internal sealed class AllCultures : StandardFunctionBase
    {
        public AllCultures(EntityTokenFactory entityTokenFactory)
            : base("AllCultures", "Composite.Utils.Globalization", typeof(IEnumerable<CultureInfo>), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return GetCultures();
        }


        private IEnumerable<CultureInfo> GetCultures()
        {
            foreach (CultureInfo info in CultureInfo.GetCultures(CultureTypes.SpecificCultures).OrderBy( f=>f.DisplayName))
            {
                yield return info;
            }
        }
    }
}
