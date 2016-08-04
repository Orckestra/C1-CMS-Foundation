using System;
using System.Globalization;
using System.IO;
using System.Text;
using Composite.Core.Configuration;
using Composite.Core.ResourceSystem;
using JetBrains.Annotations;


namespace Composite.Core.Extensions
{
    /// <summary>
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class DateExtensionMethods
    {

        /// <exclude />
        private static string TimeZoneAbbriviatedName()
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.TimezoneAbbriviations",
                "TimezoneAbbriviations." + GlobalSettingsFacade.TimeZone.Id);
        }


        /// <exclude />
        public static string ToTimeZoneDateTimeString(this DateTime? dateTime)
        {
            return dateTime?.ToTimeZoneDateTimeString();
        }

        /// <exclude />
        public static string ToTimeZoneDateTimeString(this DateTime dateTime)
        {

            var convertedToShow = dateTime.ToTimeZone();

            return
                $"{convertedToShow.ToShortDateString()} {convertedToShow.ToShortTimeString()} {TimeZoneAbbriviatedName()}";
        }

        /// <exclude />
        public static string ToTimeZoneDateString(this DateTime? dateTime)
        {
            return dateTime?.ToTimeZoneDateString();
        }

        /// <exclude />
        public static string ToTimeZoneDateString(this DateTime dateTime)
        {
            var convertedToShow = dateTime.ToTimeZone();

            return convertedToShow.ToShortDateString();
        }

        /// <exclude />
        public static DateTime FromTimeZoneToUtc(this DateTime dateTime)
        {
            return TimeZoneInfo.ConvertTime(dateTime, GlobalSettingsFacade.TimeZone, TimeZoneInfo.Utc);
        }

        /// <exclude />
        public static DateTime ToTimeZone(this DateTime dateTime)
        {
            return TimeZoneInfo.ConvertTime(dateTime, GlobalSettingsFacade.TimeZone);
        }

        /// <exclude />
        public static bool TryParseInTimeZone(string s, out DateTime result)
        {
            return DateTime.TryParse(s.Replace(TimeZoneAbbriviatedName(), ""), out result);
        }

    }
}
