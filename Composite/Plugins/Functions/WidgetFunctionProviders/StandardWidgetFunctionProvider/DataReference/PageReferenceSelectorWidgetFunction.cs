using Composite.Data;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Data.Types;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference
{
    internal sealed class PageReferenceSelectorWidgetFunction : PageReferenceSelectorWidgetFunctionBase
    {
        public const string CompositeName = CompositeNameBase + ".PageSelector";

        public PageReferenceSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(DataReference<IPage>), entityTokenFactory)
        {
        }

        protected override bool IsNullable()
        {
            return false;
        }
    };
}
