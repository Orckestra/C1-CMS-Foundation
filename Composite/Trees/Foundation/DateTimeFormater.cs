using System;
using System.ComponentModel;
using System.Linq;
using System.Reflection;


namespace Composite.Trees.Foundation
{
    internal sealed class DateTimeFormater
    {
        private string _fieldName;
        private string _format;
        private int _fieldCount = 0;

        private string _yearFormat = null;
        private string _monthFormat = null;
        private string _dayFormat = null;
        private string _hourFormat = null;
        private string _minuteFormat = null;
        private string _secondFormat = null;


        public DateTimeFormater(string fieldName, string format)
        {
            _fieldName = fieldName;
            _format = format;

            if (_format != null)
            {
                // The ordering yyyy, yyy, yy, y is important here. So for the others.
                SetFormat("yyyy", ref _yearFormat);
                SetFormat("yyy", ref _yearFormat);
                SetFormat("yy", ref _yearFormat);
                SetFormat("y", ref _yearFormat);

                SetFormat("MMMM", ref _monthFormat);
                SetFormat("MMM", ref _monthFormat);
                SetFormat("MM", ref _monthFormat);
                SetFormat("M", ref _monthFormat);

                SetFormat("dddd", ref _dayFormat);
                SetFormat("ddd", ref _dayFormat);
                SetFormat("dd", ref _dayFormat);
                SetFormat("d", ref _dayFormat);

                SetFormat("hh", ref _hourFormat);
                SetFormat("h", ref _hourFormat);

                SetFormat("HH", ref _hourFormat);
                SetFormat("H", ref _hourFormat);

                SetFormat("mm", ref _minuteFormat);
                SetFormat("m", ref _minuteFormat);

                SetFormat("ss", ref _secondFormat);
                SetFormat("s", ref _secondFormat);
            }
        }



        public string FormatLabel(object dateTimeValue)
        {
            DateTime dateTime = GetDateTime(dateTimeValue);

            return dateTime.ToString(_format);
        }



        public string Serialize(object value)
        {
            if (this.IsFormated == false)
            {
                TypeConverter typeConverter = TypeDescriptor.GetConverter(typeof(DateTime));
                return typeConverter.ConvertToString(value);
            }

            string serializedValue = "·";

            TupleIndexer tupleIndexer = new TupleIndexer(value);
            int counter = 1;

            if (this.HasYear == true)
            {
                serializedValue += tupleIndexer[counter++];
            }
            serializedValue += ",";


            if (this.HasMonth == true)
            {
                serializedValue += tupleIndexer[counter++];
            }
            serializedValue += ",";


            if (this.HasDay == true)
            {
                serializedValue += tupleIndexer[counter++];
            }
            serializedValue += ",";


            if (this.HasHour == true)
            {
                serializedValue += tupleIndexer[counter++];
            }
            serializedValue += ",";


            if (this.HasMinute == true)
            {
                serializedValue += tupleIndexer[counter++];
            }
            serializedValue += ",";


            if (this.HasSecond == true)
            {
                serializedValue += tupleIndexer[counter++];
            }            


            return serializedValue;
        }



        public string SerializeDateTime(DateTime value)
        {
            string serializedValue = "·";

            if (this.HasYear == true) serializedValue += value.Year.ToString();
            serializedValue += ",";

            if (this.HasMonth == true) serializedValue += value.Month.ToString();
            serializedValue += ",";

            if (this.HasDay == true) serializedValue += value.Day.ToString();
            serializedValue += ",";

            if (this.HasHour == true) serializedValue += value.Hour.ToString();
            serializedValue += ",";

            if (this.HasMinute == true) serializedValue += value.Millisecond.ToString();
            serializedValue += ",";

            if (this.HasSecond == true) serializedValue += value.Second.ToString();

            return serializedValue;
        }



        public static DateTime Deserialize(string serializedValue, DateTime? currentTime = null)
        {
            if (serializedValue.StartsWith("·") == true)
            {
                serializedValue = serializedValue.Remove(1, 0);
            }
            else
            {
                TypeConverter typeConverter = TypeDescriptor.GetConverter(typeof(DateTime));
                return (DateTime)typeConverter.ConvertFromString(serializedValue);
            }

            string[] values = serializedValue.Remove(0, 1).Split(',');
            if (values.Length != 6) throw new InvalidOperationException("DateTimeFormat is of wrong format");

            int year = 2000, month = 1, day = 1, hour = 0, minute = 0, second = 0;
            if (currentTime.HasValue == true)
            {
                year = currentTime.Value.Year;
                month = currentTime.Value.Month;
                day = currentTime.Value.Day;
                hour = currentTime.Value.Hour;
                minute = currentTime.Value.Minute;
                second = currentTime.Value.Second;
            }


            if (values[0] != "") year = int.Parse(values[0]);
            if (values[1] != "") month = int.Parse(values[1]);
            if (values[2] != "") day = int.Parse(values[2]);
            if (values[3] != "") hour = int.Parse(values[3]);
            if (values[4] != "") minute = int.Parse(values[4]);
            if (values[5] != "") second = int.Parse(values[5]);

            return new DateTime(year, month, day, hour, minute, second);
        }



        public DateTime GetDateTime(object value)
        {
            if (this.IsFormated == false)
            {
                return (DateTime)value;
            }

            int year = 2000, month = 1, day = 1, hour = 0, minute = 0, second = 0;

            TupleIndexer tupleIndexer = new TupleIndexer(value);
            int counter = 1;

            if (this.HasYear == true) year = tupleIndexer[counter++];
            if (this.HasMonth == true) month = tupleIndexer[counter++];
            if (this.HasDay == true) day = tupleIndexer[counter++];
            if (this.HasHour == true) hour = tupleIndexer[counter++];
            if (this.HasMinute == true) minute = tupleIndexer[counter++];
            if (this.HasSecond == true) second = tupleIndexer[counter++];

            return new DateTime(year, month, day, hour, minute, second);
        }



        public ConstructorInfo GetTupleConstructor()
        {
            switch (_fieldCount)
            {
                case 1:
                    return TupleConstructorInfo1;

                case 2:
                    return TupleConstructorInfo2;

                case 3:
                    return TupleConstructorInfo3;

                case 4:
                    return TupleConstructorInfo4;

                case 5:
                    return TupleConstructorInfo5;

                case 6:
                    return TupleConstructorInfo6;

                default:
                    throw new NotImplementedException();
            }
        }



        public bool IsFormated
        {
            get { return _format != null; }
        }



        public bool HasYear
        {
            get { return _yearFormat != null; }
        }



        public bool HasMonth
        {
            get { return _monthFormat != null; }
        }



        public bool HasDay
        {
            get { return _dayFormat != null; }
        }



        public bool HasHour
        {
            get { return _hourFormat != null; }
        }



        public bool HasMinute
        {
            get { return _minuteFormat != null; }
        }



        public bool HasSecond
        {
            get { return _secondFormat != null; }
        }



        private void SetFormat(string pattern, ref string format)
        {
            if ((this._format.Contains(pattern) == true) && (format == null))
            {
                format = pattern;
                _fieldCount++;
            }
        }



        public static PropertyInfo DateTime_Year = typeof(DateTime).GetProperty("Year");
        public static PropertyInfo DateTime_Month = typeof(DateTime).GetProperty("Month");
        public static PropertyInfo DateTime_Day = typeof(DateTime).GetProperty("Day");
        public static PropertyInfo DateTime_Hour = typeof(DateTime).GetProperty("Hour");
        public static PropertyInfo DateTime_Minute = typeof(DateTime).GetProperty("Minute");
        public static PropertyInfo DateTime_Second = typeof(DateTime).GetProperty("Second");


        private static ConstructorInfo TupleConstructorInfo1 = typeof(Tuple<int>).GetConstructors().Single();
        private static ConstructorInfo TupleConstructorInfo2 = typeof(Tuple<int, int>).GetConstructors().Single();
        private static ConstructorInfo TupleConstructorInfo3 = typeof(Tuple<int, int, int>).GetConstructors().Single();
        private static ConstructorInfo TupleConstructorInfo4 = typeof(Tuple<int, int, int, int>).GetConstructors().Single();
        private static ConstructorInfo TupleConstructorInfo5 = typeof(Tuple<int, int, int, int, int>).GetConstructors().Single();
        private static ConstructorInfo TupleConstructorInfo6 = typeof(Tuple<int, int, int, int, int, int>).GetConstructors().Single();
    }
}
