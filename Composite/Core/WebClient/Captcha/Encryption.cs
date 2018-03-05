using System;
using System.Globalization;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Composite.Core.Configuration;
using Composite.Core.IO;


namespace Composite.Core.WebClient.Captcha
{
    internal static class Encryption
    {
        private static readonly byte[] _encryptionKey;
        private static readonly byte[] RijndaelIV = { 1, 84, 22, 19, 154, 221, 4, 30, 56, 4, 114, 59, 90, 2, 5, 10 };

        static Encryption()
        {
            string key = InstallationInformationFacade.InstallationId + CaptchaConfiguration.Password;

            byte[] keyBytes = Encoding.UTF8.GetBytes(key);

            using (var hashAlgorithm = MD5.Create())
            {
                _encryptionKey = hashAlgorithm.ComputeHash(keyBytes);
            }
        }

        public static string Encrypt(string value)
        {
            Verify.ArgumentNotNullOrEmpty(value, nameof(value));

            return ByteToHexString(RijndaelEncrypt(value));
        }

        private static byte[] RijndaelEncrypt(string value)
        {
            // Create a RijndaelManaged object
            // with the specified key and IV.
            using (var rima = new RijndaelManaged())
            {
                rima.Key = _encryptionKey;
                rima.IV = RijndaelIV;

                // Create a decrytor to perform the stream transform.
                ICryptoTransform encryptor = rima.CreateEncryptor();

                // Create the streams used for encryption.
                using (var msEncrypt = new MemoryStream())
                {
                    using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    using (var swEncrypt = new C1StreamWriter(csEncrypt))
                    {
                        //Write all data to the stream.
                        swEncrypt.Write(value);
                    }
                    // Return the encrypted bytes from the memory stream.
                    return msEncrypt.ToArray();
                }
            }
        }

        public static string Decrypt(string encryptedValue)
        {
            Verify.ArgumentNotNullOrEmpty(encryptedValue, nameof(encryptedValue));
            byte[] encodedSequence = HexStringToByteArray(encryptedValue);

            return RijndaelDecrypt(encodedSequence);
        }

        private static string RijndaelDecrypt(byte[] bytes)
        {
            using (var rima = new RijndaelManaged())
            {
                rima.Key = _encryptionKey;
                rima.IV = RijndaelIV;

                // Create a decrytor to perform the stream transform.
                ICryptoTransform decryptor = rima.CreateDecryptor();

                // Create the streams used for decryption.
                using (var msDecrypt = new MemoryStream(bytes))
                using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                using (var srDecrypt = new C1StreamReader(csDecrypt))
                {
                    // Read the decrypted bytes from the decrypting stream
                    // and place them in a string.
                    return srDecrypt.ReadToEnd();
                }
            }
        }

        private static string ByteToHexString(byte[] myArray)
        {
            return BitConverter.ToString(myArray);
        }

        private static byte[] HexStringToByteArray(string myArray)
        {
            string[] hexElements = myArray.Split('-');

            byte[] recreatedByteArray = new byte[hexElements.Length];
            for (int i = 0; i < hexElements.Length; i++)
            {
                recreatedByteArray[i] = byte.Parse(hexElements[i].Trim(), NumberStyles.HexNumber, CultureInfo.InvariantCulture);
            }
            return recreatedByteArray;
        }
    }
}
