using System;
using Composite.Functions;
using Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Xml;
using System.Xml;

namespace Composite.StandardPlugins.Functions.FunctionProviders.StandardFunctionProvider.Xslt.Extensions
{
    internal sealed class DateFormattingXsltExtensionsFunction : StandardFunctionBase
    {
        public DateFormattingXsltExtensionsFunction(EntityTokenFactory entityTokenFactory)
            : base("DateFormatting", "Composite.Xslt.Extensions", typeof(IXsltExtensionDefinition), entityTokenFactory)
        {
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return new XsltExtensionDefinition<DateFormattingXsltExtensions>
            {
                EntensionObject = new DateFormattingXsltExtensions(),
                ExtensionNamespace = "#dateExtensions"
            };
        }


        internal class DateFormattingXsltExtensions
        {
            public string Now()
            {
                return XmlConvert.ToString(DateTime.Now, XmlDateTimeSerializationMode.Local);
            }

            public string LongDateFormat(string xmlFormattedDate)
            {
                DateTime date = XmlConvert.ToDateTime(xmlFormattedDate, XmlDateTimeSerializationMode.Local);
                return date.ToLongDateString();
            }

            public string LongTimeFormat(string xmlFormattedDate)
            {
                DateTime date = XmlConvert.ToDateTime(xmlFormattedDate, XmlDateTimeSerializationMode.Local);
                return date.ToLongTimeString();
            }

            public string ShortDateFormat(string xmlFormattedDate)
            {
                DateTime date = XmlConvert.ToDateTime(xmlFormattedDate, XmlDateTimeSerializationMode.Local);
                return date.ToShortDateString();
            }

            public string ShortTimeFormat(string xmlFormattedDate)
            {
                DateTime date = XmlConvert.ToDateTime(xmlFormattedDate, XmlDateTimeSerializationMode.Local);
                return date.ToShortTimeString();
            }

            public int Day(string xmlFormattedDate)
            {
                DateTime date = XmlConvert.ToDateTime(xmlFormattedDate, XmlDateTimeSerializationMode.Local);
                return date.Day;
            }

            public int Month(string xmlFormattedDate)
            {
                DateTime date = XmlConvert.ToDateTime(xmlFormattedDate, XmlDateTimeSerializationMode.Local);
                return date.Month;
            }

            public int Year(string xmlFormattedDate)
            {
                DateTime date = XmlConvert.ToDateTime(xmlFormattedDate, XmlDateTimeSerializationMode.Local);
                return date.Year;
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

            public string Format(string xmlFormattedDate, string DateFormat)
            {
                DateTime date = XmlConvert.ToDateTime(xmlFormattedDate, XmlDateTimeSerializationMode.Local);

                return date.ToString(DateFormat);
            }
        }
    }
}
