using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Reflection;

namespace Composite.Types
{
    internal class GenericComparer<T> : IComparer, IComparer<T> 
    {
        public static GenericComparer<T> Build(Type type, string propertyName)
        {
            return new GenericComparer<T>(type, propertyName, true);
        }



        public static GenericComparer<T> Build(Type type, string propertyName, bool ascDesc)
        {
            return new GenericComparer<T>(type, propertyName, ascDesc);
        }



        private MemberInfo _field;
        private bool _ascDesc;

        public GenericComparer(Type type, string propertyName, bool ascDesc)
        {
            this._field = type.GetPropertiesRecursively(f => f.Name == propertyName)[0];
            this._ascDesc = ascDesc;
        }



        object GetValue(object obj)
        {

            if (_field is FieldInfo)

                return ((FieldInfo)_field).GetValue(obj);

            else

                return ((PropertyInfo)_field).GetValue(obj, new object[0]);

        }



        int IComparer.Compare(object obj1, object obj2)
        {
            IComparable comparer = (IComparable)GetValue(obj1);

            return comparer.CompareTo(GetValue(obj2)) * (_ascDesc ? 1 : -1);

        }


        public int Compare(T obj1, T obj2)
        {
            IComparable comparer = (IComparable)GetValue(obj1);
            object value = GetValue(obj2);

            if ((comparer == null) && (value == null)) return 0;

            if (comparer == null) return (_ascDesc ? 1 : -1);
            if (value == null) return (_ascDesc ? -1 : 1);

            return comparer.CompareTo(value) * (_ascDesc ? 1 : -1);
        }
    }
}
