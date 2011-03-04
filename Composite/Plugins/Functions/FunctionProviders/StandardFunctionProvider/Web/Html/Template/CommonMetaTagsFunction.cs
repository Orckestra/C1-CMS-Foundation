using System.Collections.Generic;
using System.Threading;
using System.Xml.Linq;
using Composite.Core.Xml;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Html.Template
{
    internal sealed class CommonMetaTagsFunction : StandardFunctionBase
    {
        public CommonMetaTagsFunction(EntityTokenFactory entityTokenFactory)
            : base("CommonMetaTags", "Composite.Web.Html.Template", typeof(IEnumerable<XElement>), entityTokenFactory)
        {
        }



        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider showGeneratorWidget = StandardWidgetFunctions.GetBoolSelectorWidget("Yes, show Composite C1 support!", "No, please hide this...");

                yield return new StandardFunctionParameterProfile(
                    "ContentType",
                    typeof(string),
                    false,
                    new ConstantValueProvider("text/html; charset=utf-8"),
                    StandardWidgetFunctions.TextBoxWidget);

                yield return new StandardFunctionParameterProfile(
                    "Designer",
                    typeof(string),
                    false,
                    new ConstantValueProvider(""),
                    StandardWidgetFunctions.TextBoxWidget);

                yield return new StandardFunctionParameterProfile(
                    "ShowGenerator",
                    typeof(bool),
                    false,
                    new ConstantValueProvider(true),
                    showGeneratorWidget);
            }
        }



        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            var metaTags = new List<XElement>();

            string contentType = parameters.GetParameter<string>("ContentType");
            string designer = parameters.GetParameter<string>("Designer");
            bool showGenerator = parameters.GetParameter<bool>("ShowGenerator");

            if (!string.IsNullOrWhiteSpace(contentType))
            {
                metaTags.Add(new XElement(Namespaces.Xhtml + "meta",
                    new XAttribute("http-equiv", "Content-Type"),
                    new XAttribute("content", contentType)));
            }

            metaTags.Add(new XElement(Namespaces.Xhtml + "meta",
                new XAttribute("http-equiv", "Content-Language"),
                new XAttribute("content", Thread.CurrentThread.CurrentCulture.Name)));

            if (!string.IsNullOrWhiteSpace(designer))
            {
                metaTags.Add(new XElement(Namespaces.Xhtml + "meta",
                    new XAttribute("name", "Designer"),
                    new XAttribute("content", designer)));
            }

            if (showGenerator)
            {
                metaTags.Add(new XElement(Namespaces.Xhtml + "meta",
                    new XAttribute("name", "Generator"),
                    new XAttribute("content", "Composite C1 CMS - Free Open Source from http://composite.net/")));
            }

            return metaTags;
        }
    }
}
