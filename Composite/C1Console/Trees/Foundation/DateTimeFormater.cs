using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;


namespace Composite.C1Console.Trees.Foundation
{
    internal sealed class DateTimeFormater
    {
        private readonly string _format;
        private int _fieldCount;

        private readonly string _yearFormat;
        private readonly string _monthFormat;
        private readonly string _dayFormat;
        private readonly string _hourFormat;
        private readonly string _minuteFormat;
        private readonly string _secondFormat;

        private static readonly IList<ConstructorInfo> Tuples_Constructors;
        private static readonly IList<MethodInfo[]> Tuples_Members;

        static DateTimeFormater()
        {
            var tupleTypes = new[]
                {
                    typeof (Tuple<int>),
                    typeof (Tuple<int, int>),
                    typeof (Tuple<int, int, int>),
                    typeof (Tuple<int, int, int, int>),
                    typeof (Tuple<int, int, int, int, int>),
                    typeof (Tuple<int, int, int, int, int, int>)
                };

            Tuples_Constructors = new List<ConstructorInfo>();
            Tuples_Members = new List<MethodInfo[]>();
            for (int i = 0; i < tupleTypes.Length; i++)
            {
                var type = tupleTypes[i];

                Tuples_Constructors.Add(type.GetConstructors().Single());
                Tuples_Members.Add(type.GetProperties().Select(p => p.GetGetMethod()).ToArray());
            }
        }


        public bool IsDateTimeGroupingValue(object value)
        {
            if (value == null)
            {
                return false;
            }

            var type = value.GetType();
            return type.FullName.StartsWith(typeof(Tuple).FullName) 
                && type.IsGenericType
                && type.GetGenericArguments().All(a => a == typeof(int));
        }


        public DateTimeFormater(string format)
        {
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
            if (!this.IsFormated)
            {
                TypeConverter typeConverter = TypeDescriptor.GetConverter(typeof(DateTime));
                return typeConverter.ConvertToString(value);
            }

            string serializedValue = "·";

            TupleIndexer tupleIndexer = new TupleIndexer(value);
            int counter = 1;

            if (this.HasYear)
            {
                serializedValue += tupleIndexer[counter++];
            }
            serializedValue += ",";


            if (this.HasMonth)
            {
                serializedValue += tupleIndexer[counter++];
            }
            serializedValue += ",";


            if (this.HasDay)
            {
                serializedValue += tupleIndexer[counter++];
            }
            serializedValue += ",";


            if (this.HasHour)
            {
                serializedValue += tupleIndexer[counter++];
            }
            serializedValue += ",";


            if (this.HasMinute)
            {
                serializedValue += tupleIndexer[counter++];
            }
            serializedValue += ",";


            if (this.HasSecond)
            {
                serializedValue += tupleIndexer[counter++];
            }            


            return serializedValue;
        }


        
        public string SerializeDateTime(DateTime value)
        {
            string serializedValue = "·";

            if (this.HasYear) serializedValue += value.Year.ToString();
            serializedValue += ",";

            if (this.HasMonth) serializedValue += value.Month.ToString();
            serializedValue += ",";

            if (this.HasDay) serializedValue += value.Day.ToString();
            serializedValue += ",";

            if (this.HasHour) serializedValue += value.Hour.ToString();
            serializedValue += ",";

            if (this.HasMinute) serializedValue += value.Millisecond.ToString();
            serializedValue += ",";

            if (this.HasSecond) serializedValue += value.Second.ToString();

            return serializedValue;
        }



        public static DateTime Deserialize(string serializedValue, DateTime? currentTime = null)
        {
            if (serializedValue.StartsWith("·"))
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
            if (currentTime.HasValue)
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

            if (this.HasYear) year = tupleIndexer[counter++];
            if (this.HasMonth) month = tupleIndexer[counter++];
            if (this.HasDay) day = tupleIndexer[counter++];
            if (this.HasHour) hour = tupleIndexer[counter++];
            if (this.HasMinute) minute = tupleIndexer[counter++];
            if (this.HasSecond) second = tupleIndexer[counter++];

            return new DateTime(year, month, day, hour, minute, second);
        }



        public ConstructorInfo GetTupleConstructor()
        {
            ValidateFieldsCount();

            return Tuples_Constructors[_fieldCount - 1];
        }

        public MethodInfo[] GetTupleMembers()
        {
            ValidateFieldsCount();

            return Tuples_Members[_fieldCount - 1];
        }


        //public ConstructorInfo GetAnonymousTypeConstructor()
        //{
        //    ValidateFieldsCount();

        //    return AnonymousTypes_Constructors[_fieldCount - 1];
        //}

        //public MethodInfo[] GetAnonymousTypeMembers()
        //{
        //    ValidateFieldsCount();

        //    return AnonymousTypes_Members[_fieldCount - 1];
        //}

        private void ValidateFieldsCount()
        {
            Verify.That(_fieldCount > 0, "Amount of fields should be positive");
            Verify.That(_fieldCount < Tuples_Constructors.Count, "To many fields specified: {0}", _fieldCount);
        }

        public bool IsFormated => _format != null;


        public bool HasYear => _yearFormat != null;


        public bool HasMonth => _monthFormat != null;


        public bool HasDay => _dayFormat != null;


        public bool HasHour => _hourFormat != null;


        public bool HasMinute => _minuteFormat != null;


        public bool HasSecond => _secondFormat != null;


        private void SetFormat(string pattern, ref string format)
        {
            if (_format.Contains(pattern) && format == null)
            {
                format = pattern;
                _fieldCount++;
            }
        }

        public static PropertyInfo DateTime_Year = typeof(DateTime).GetProperty(nameof(DateTime.Year));
        public static PropertyInfo DateTime_Month = typeof(DateTime).GetProperty(nameof(DateTime.Month));
        public static PropertyInfo DateTime_Day = typeof(DateTime).GetProperty(nameof(DateTime.Day));
        public static PropertyInfo DateTime_Hour = typeof(DateTime).GetProperty(nameof(DateTime.Hour));
        public static PropertyInfo DateTime_Minute = typeof(DateTime).GetProperty(nameof(DateTime.Minute));
        public static PropertyInfo DateTime_Second = typeof(DateTime).GetProperty(nameof(DateTime.Second));
    }
}
