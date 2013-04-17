using System.Web;
using System.Web.UI;

using Composite.Data;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Core.Xml;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Html.Template
{
    internal sealed class MetaDescriptionValueFunction : StandardFunctionBase
    {
        public MetaDescriptionValueFunction(EntityTokenFactory entityTokenFactory)
            : base("MetaDescriptionValue", "Composite.Web.Html.Template", typeof(Control), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextAreaWidget;

                yield return new StandardFunctionParameterProfile("Element", typeof(XElement), false, new ConstantValueProvider(null), textboxWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return new DescriptionControl(parameters.GetParameter<XElement>("Element"));
        }


        private class DescriptionControl : Control
        {
            private XElement _element = null;

            public DescriptionControl(XElement element)
            {
                _element = element;
            }

            protected override void Render(HtmlTextWriter writer)
            {
                string description = Page.Header.Description;

                if (string.IsNullOrWhiteSpace(description) && SiteMap.CurrentNode != null)
                {
                    description = SiteMap.CurrentNode.Description;
                }

                if (string.IsNullOrWhiteSpace(description))
                {
                    using (DataConnection connection = new DataConnection())
                    {
                        description = connection.SitemapNavigator.CurrentPageNode.Description;
                    }
                }

                if (string.IsNullOrWhiteSpace(description)) return;

                if (_element != null)
                {
                    _element.Add(description);
                    string commonNs = string.Format(" xmlns=\"{0}\"", Namespaces.Xhtml );
                    string raw = _element.ToString().Replace(commonNs, "");
                    writer.Write(raw);
                }
                else
                {
                    writer.WriteEncodedText(description);
                }
            }
        }
    }
}
