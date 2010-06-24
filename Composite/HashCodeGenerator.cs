using System;
using System.Text;
using System.Collections.Generic;
using System.Security.Cryptography;


namespace Composite
{
    public sealed class HashCodeGenerator
    {
        private StringBuilder stringToHash = new StringBuilder();


        public string GetHashValue()
        {
            HashAlgorithm hashAlgorithm = new MD5CryptoServiceProvider();

            byte[] hashValue = hashAlgorithm.ComputeHash(Encoding.UTF8.GetBytes(stringToHash.ToString()));

            StringBuilder sb = new StringBuilder(hashValue.Length * 2);
            foreach (byte b in hashValue)
            {
                sb.AppendFormat("{0:x2}", b);
            }

            return sb.ToString();
        }


        public void Add<T>(T value)
            where T : struct
        {
            stringToHash.Append(value.ToString());
            stringToHash.Append('·');
        }


        public void Add(string value)
        {
            stringToHash.Append(value);
            stringToHash.Append('·');
        }


        public void Add(Type value)
        {
            stringToHash.Append(value.FullName);
            stringToHash.Append('·');
        }


        public void AddEnumerable<T>(IEnumerable<T> values)
            where T : struct
        {
            List<T> list = new List<T>(values);
            list.Sort();

            foreach (T value in values)
            {
                Add(value);
            }
        }


        public void AddEnumerable(IEnumerable<string> values)
        {
            List<string> list = new List<string>(values);
            list.Sort();

            foreach (string value in values)
            {
                Add(value);
            }
        }


        public void AddEnumerable(IEnumerable<Type> values)
        {
            List<Type> list = new List<Type>(values);
            list.Sort(delegate(Type t1, Type t2) { return t1.FullName.CompareTo(t2.FullName); });

            foreach (Type value in values)
            {
                Add(value);
            }
        }
    }
}
