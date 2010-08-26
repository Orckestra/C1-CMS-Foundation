using System;
using Composite.Functions;

using System.Collections.Generic;
using System.Data.SqlTypes;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.Xml;
using System.Xml.Linq;
using System.Xml;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Xslt.Extensions
{
    internal sealed class GlobalizationXsltExtensionsFunction : StandardFunctionBase
    {
        public GlobalizationXsltExtensionsFunction(EntityTokenFactory entityTokenFactory)
            : base("Globalization", "Composite.Xslt.Extensions", typeof(IXsltExtensionDefinition), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return new XsltExtensionDefinition<GlobalizationXsltExtensions>
            {
                EntensionObject = new GlobalizationXsltExtensions(),
                ExtensionNamespace = "#globalizationExtensions"
            };
        }


        internal class GlobalizationXsltExtensions
        {
            public string GetGlobalResourceString(string resourceClassKey, string resourceKey)
            {
                return System.Web.HttpContext.GetGlobalResourceObject(resourceClassKey, resourceKey).ToString();
            }


            public string LongMonthName(int monthNumber)
            {
                if (monthNumber < 1 || monthNumber > 12) throw new ArgumentOutOfRangeException("monthNumber");

                DateTime date = new DateTime(1, monthNumber, 1);

                return date.ToString("MMMM");
            }


            public string ShortMonthName(int monthNumber)
            {
                if (monthNumber < 1 || monthNumber > 12) throw new ArgumentOutOfRangeException("monthNumber");

                DateTime date = new DateTime(1, monthNumber, 1);

                return date.ToString("MMM");
            }



        }
    }
}
