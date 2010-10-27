using System;
using Composite.Core.NewIO;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;


namespace Composite.C1Console.Security.Cryptography
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class Cryptographer
	{
        private static string _secretKey;
        private static Encoding _encoding = Encoding.Unicode;

        static Cryptographer()
        {
            _secretKey = "u?Ccr?";
            GCHandle gch = GCHandle.Alloc(_secretKey, GCHandleType.Pinned);
            
            //ZeroMemory(gch.AddrOfPinnedObject(), _secretKey.Length * 2);
            //gch.Free();
        }



        public static string Encrypt(this string data)
        {
            byte[] byteData = _encoding.GetBytes(data);
            byte[] encrypted = Cryptographer.EncryptBytes(byteData);
            return Convert.ToBase64String(encrypted);
        }



        public static string Decrypt(this string data)
        {
            byte[] byteData = _encoding.GetBytes(data);
            byte[] decrypted = Cryptographer.DecryptBytes(Convert.FromBase64String(data));
            return _encoding.GetString(decrypted);
        }



        public static byte[] EncryptBytes(byte[] toEncrypt)
        {
            DESCryptoServiceProvider DES = new DESCryptoServiceProvider();
            DES.Key = ASCIIEncoding.ASCII.GetBytes(_secretKey);
            DES.IV = ASCIIEncoding.ASCII.GetBytes(_secretKey);
            ICryptoTransform desencrypt = DES.CreateEncryptor();

            byte[] result;
            using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
            {
                using (CryptoStream cryptostream = new CryptoStream(ms, desencrypt, CryptoStreamMode.Write))
                {
                    cryptostream.Write(toEncrypt, 0, toEncrypt.Length);
                    cryptostream.Close();
                }
                result = ms.ToArray();
            }
            return result;
        }



        public static byte[] DecryptBytes(byte[] toDecrypt)
        {
            DESCryptoServiceProvider DES = new DESCryptoServiceProvider();
            DES.Key = ASCIIEncoding.ASCII.GetBytes(_secretKey);
            DES.IV = ASCIIEncoding.ASCII.GetBytes(_secretKey);
            ICryptoTransform desdecrypt = DES.CreateDecryptor();

            byte[] result;
            using (System.IO.MemoryStream memoryWriteStream = new System.IO.MemoryStream())
            {
                memoryWriteStream.Write(toDecrypt, 0, toDecrypt.Length);
                memoryWriteStream.Position = 0;

                using (CryptoStream cryptostreamDecr = new CryptoStream(memoryWriteStream, desdecrypt, CryptoStreamMode.Read))
                {
                    using (System.IO.Stream memoryReadStream = new System.IO.MemoryStream())
                    {
                        int size = 2048;
                        byte[] data = new byte[2048];
                        while (true)
                        {
                            size = cryptostreamDecr.Read(data, 0, data.Length);
                            if (size > 0)
                            {
                                memoryReadStream.Write(data, 0, size);
                            }
                            else
                            {
                                break;
                            }
                        }

                        result = new byte[memoryReadStream.Length];
                        memoryReadStream.Position = 0;
                        memoryReadStream.Read(result, 0, (int)memoryReadStream.Length);
                    }
                }
            }
            return result;
        }
	}
}
