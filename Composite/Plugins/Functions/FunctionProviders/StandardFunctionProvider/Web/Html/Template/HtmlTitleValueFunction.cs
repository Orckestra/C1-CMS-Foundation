using System.Collections.Generic;
using System.Web.UI;

using Composite.Data;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;



namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Html.Template
{
    internal sealed class HtmlTitleValueFunction : StandardFunctionBase
    {
        public HtmlTitleValueFunction(EntityTokenFactory entityTokenFactory)
            : base("HtmlTitleValue", "Composite.Web.Html.Template", typeof(Control), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextAreaWidget;

                yield return new StandardFunctionParameterProfile("prefixToRemove", typeof(string), false, new ConstantValueProvider(""), textboxWidget);
                yield return new StandardFunctionParameterProfile("postfixToRemove", typeof(string), false, new ConstantValueProvider(""), textboxWidget);
            }
        }

        
        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return new TitleControl { PrefixToRemove = parameters.GetParameter<string>("prefixToRemove"), PostfixToRemove = parameters.GetParameter<string>("postfixToRemove") };
        }

        private class TitleControl : Control
        {
            public string PrefixToRemove { get; set; }
            public string PostfixToRemove { get; set; }

            protected override void Render(HtmlTextWriter writer)
            {
                string pageTitle = this.Page.Title;

                if (string.IsNullOrWhiteSpace(pageTitle))
                {
                    using (DataConnection connection = new DataConnection())
                    {
                        pageTitle = connection.SitemapNavigator.CurrentPageNode.Title;
                    }
                }

                pageTitle = pageTitle.Trim();

                if (!string.IsNullOrEmpty(this.PrefixToRemove) && pageTitle.StartsWith(this.PrefixToRemove))
                {
                    pageTitle = pageTitle.Remove(0, this.PrefixToRemove.Length);
                }

                if (!string.IsNullOrEmpty(this.PostfixToRemove) && pageTitle.EndsWith(this.PostfixToRemove))
                {
                    pageTitle = pageTitle.Remove(pageTitle.Length - PostfixToRemove.Length);
                }

                writer.Write(pageTitle);

            }
        }
    }
}
