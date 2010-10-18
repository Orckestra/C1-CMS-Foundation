using Composite.Functions;

using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Utils.GuidFunctions
{
    internal sealed class NewGuid : StandardFunctionBase
    {
        public NewGuid(EntityTokenFactory entityTokenFactory)
            : base("NewGuid", "Composite.Utils.Guid", typeof(System.Guid), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return System.Guid.NewGuid();
        }
    }
}
