using System.Threading;
using System.Xml.Linq;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Web.Html.Template
{
    internal sealed class LangAttributeFunction : StandardFunctionBase
    {
        public LangAttributeFunction(EntityTokenFactory entityTokenFactory)
            : base("LangAttribute", "Composite.Web.Html.Template", typeof(XAttribute), entityTokenFactory)
        {
        }

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return new XAttribute("lang", Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName);
        }
    }
}
