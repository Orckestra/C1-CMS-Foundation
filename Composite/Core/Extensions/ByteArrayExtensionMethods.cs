using System;
using System.Collections.Generic;


namespace Composite.Core.Extensions
{
	internal static class ByteArrayExtensionMethods
	{
        public static IEnumerable<byte[]> Split(this byte[] bytes, byte splitByte)
        {
            int lastIndex = 0;

            int index = IndexOf(bytes, splitByte, lastIndex);
            while (index != -1)
            {
                int size = index - lastIndex;
                byte[] subBytes = new byte[size];

                Array.Copy(bytes, lastIndex, subBytes, 0, size);

                lastIndex = index + 1;
                index = IndexOf(bytes, splitByte, lastIndex);

                yield return subBytes;
            }

            if (lastIndex < bytes.Length)
            {
                int size = bytes.Length - lastIndex;
                byte[] subBytes = new byte[size];

                Array.Copy(bytes, lastIndex, subBytes, 0, size);

                yield return subBytes;
            }
        }



        public static int IndexOf(this byte[] bytes, byte byteToFind)
        {
            return IndexOf(bytes, byteToFind, 0);
        }



        public static int IndexOf(this byte[] bytes, byte byteToFind, int startIndex)
        {
            if (bytes == null) throw new ArgumentNullException("bytes");
            if (startIndex > bytes.Length) throw new ArgumentNullException("startIndex exceeds the length of the bytes");

            for (int i = startIndex; i < bytes.Length; i++)
            {
                if (bytes[i] == byteToFind) return i;
            }

            return -1;
        }
	}
}
