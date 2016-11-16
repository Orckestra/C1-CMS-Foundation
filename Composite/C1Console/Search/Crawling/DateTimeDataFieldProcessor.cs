using System;
using System.Globalization;

namespace Composite.C1Console.Search.Crawling
{
    public class DateTimeDataFieldProcessor: DefaultDataFieldProcessor
    {
        public override object GetIndexValue(object fieldValue)
        {
            return ((DateTime?) fieldValue)?.ToString("s");
        }

        protected override Func<object, string> GetPreviewFunction()
        {
            return obj =>
            {
                if (obj == null) return null;
                var date = DateTime.ParseExact((string)obj, "s", CultureInfo.InvariantCulture);

                return date.ToString("yyyy MMM d");
            };
        }

        public override string[] GetFacetValues(object value)
        {
            var str = ((DateTime?) value)?.ToString("yyyy MM");

            return str != null ? new [] {str} : null;
        }

        protected override Func<string, string> GetFacetLabelFunction()
        {
            return value =>
            {
                if (value == null) return null;
                var parts = value.Split(' ');

                int month = int.Parse(parts[1]);

                var monthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month);
                return $"{parts[0]} {monthName}";
            };
        }
    }
}
