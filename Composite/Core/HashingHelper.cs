using System;
using System.Security.Cryptography;
using System.Text;

namespace Composite.Core
{
    internal static class HashingHelper
    {
        [ThreadStatic]
        private static MD5 _md5;

        /// <summary>
        /// Gets a cached instance of an MD5 algorithm
        /// </summary>
        private static MD5 MD5
        {
            get
            {
                var value = _md5;
                if (value == null)
                {
                    _md5 = value = MD5.Create();
                }

                return value;
            }
        }

        public static Guid ComputeMD5Hash(string str, Encoding textEncoding)
        {
            var bytes = textEncoding.GetBytes(str);
            var hash = MD5.ComputeHash(bytes);
            return new Guid(hash);
        }

    }
}
