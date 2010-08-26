using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.AspNet
{
    internal sealed class LoadUserControlFunction : StandardFunctionBase
    {
        public LoadUserControlFunction(EntityTokenFactory entityTokenFactory)
            : base("LoadUserControl", "Composite.AspNet", typeof(UserControl), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                yield return new StandardFunctionParameterProfile(
                    "Path", typeof(string), true, new NoValueValueProvider(), StandardWidgetFunctions.TextBoxWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            string path = parameters.GetParameter<string>("Path");

            Page currentPage = HttpContext.Current.Handler as Page;
            if (currentPage == null) throw new InvalidOperationException("The Current HttpContext Handler must be a System.Web.Ui.Page");

            return currentPage.LoadControl(path);
        }
    }
}
