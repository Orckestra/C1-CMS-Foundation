using System.Collections.Generic;
using System.Web.UI;

using Composite.Data;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;



namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Html.Template
{
    internal sealed class MetaDescriptionValueFunction : StandardFunctionBase
    {
        public MetaDescriptionValueFunction(EntityTokenFactory entityTokenFactory)
            : base("MetaDescriptionValue", "Composite.Web.Html.Template", typeof(Control), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return new DescriptionControl();
        }

        private class DescriptionControl : Control
        {

            protected override void Render(HtmlTextWriter writer)
            {
                string description = Page.Header.Description;

                if (string.IsNullOrWhiteSpace(description))
                {
                    using (DataConnection connection = new DataConnection())
                    {
                        description = connection.SitemapNavigator.CurrentPageNode.Description;
                    }
                }

                if (string.IsNullOrWhiteSpace(description)) return;

                writer.WriteEncodedText(description);
            }
        }
    }
}
