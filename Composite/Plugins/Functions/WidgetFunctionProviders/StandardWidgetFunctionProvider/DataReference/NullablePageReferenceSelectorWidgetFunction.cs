using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.Data;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Data.Types;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference
{
    internal sealed class NullablePageReferenceSelectorWidgetFunction : PageReferenceSelectorWidgetFunctionBase
    {
        public const string CompositeName = CompositeNameBase + ".OptionalPageSelector";

        public NullablePageReferenceSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(NullableDataReference<IPage>), entityTokenFactory)
        {
        }

        protected override bool IsNullable()
        {
            return true;
        }
    };
}
