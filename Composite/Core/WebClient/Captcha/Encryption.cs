using System;
using System.Globalization;
using System.IO;
using System.Management;
using System.Security.Cryptography;
using System.Text;
using System.Web.Hosting;
using Composite.Core.IO;


namespace Composite.Core.WebClient.Captcha
{
	internal static class Encryption
	{
        private static readonly byte[] _encryptionKey;
        private static readonly byte[] RijndaelIV = { 1, 84, 22, 19, 154, 221, 4, 30, 56, 4, 114, 59, 90, 2, 5, 10 };

        static Encryption()
	    {
            var md5 = MD5.Create();

            string key = Environment.MachineName + GetCpuId() + HostingEnvironment.ApplicationPhysicalPath;

            byte[] keyBytes = Encoding.UTF8.GetBytes(key);

            _encryptionKey = md5.ComputeHash(keyBytes);
	    }

        public static string Encrypt(string value)
        {
            Verify.ArgumentNotNullOrEmpty(value, "value");

            // Declare the streams used
            // to encrypt to an in memory
            // array of bytes.
            MemoryStream msEncrypt = null;
            CryptoStream csEncrypt = null;
            C1StreamWriter swEncrypt = null;

            // Declare the RijndaelManaged object
            // used to encrypt the data.
            RijndaelManaged rima = null;

            try
            {
                // Create a RijndaelManaged object
                // with the specified key and IV.
                rima = new RijndaelManaged();
                rima.Key = _encryptionKey;
                rima.IV = RijndaelIV;

                // Create a decrytor to perform the stream transform.
                ICryptoTransform encryptor = rima.CreateEncryptor();

                // Create the streams used for encryption.
                msEncrypt = new MemoryStream();
                csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write);
                swEncrypt = new C1StreamWriter(csEncrypt);

                //Write all data to the stream.
                swEncrypt.Write(value);
            }
            finally
            {
                if (swEncrypt != null) swEncrypt.Close();
                if (csEncrypt != null) csEncrypt.Close();
                if (msEncrypt != null) msEncrypt.Close();
                if (rima != null) rima.Clear();
            }

            // Return the encrypted bytes from the memory stream.
            return ByteToHexString(msEncrypt.ToArray());
        }

        public static string Decrypt(string encryptedValue)
        {
            Verify.ArgumentNotNullOrEmpty(encryptedValue, "encryptedValue");
            byte[] encodedSequence = HexStringToByteArray(encryptedValue);

            // TDeclare the streams used
            // to decrypt to an in memory
            // array of bytes.
            MemoryStream msDecrypt = null;
            CryptoStream csDecrypt = null;
            C1StreamReader srDecrypt = null;

            // Declare the RijndaelManaged object
            // used to decrypt the data.
            RijndaelManaged rima = null;

            try
            {
                // Create a RijndaelManaged object
                // with the specified key and IV.
                rima = new RijndaelManaged();
                rima.Key = _encryptionKey;
                rima.IV = RijndaelIV;

                // Create a decrytor to perform the stream transform.
                ICryptoTransform decryptor = rima.CreateDecryptor();

                // Create the streams used for decryption.
                msDecrypt = new MemoryStream(encodedSequence);
                csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read);
                srDecrypt = new C1StreamReader(csDecrypt);

                // Read the decrypted bytes from the decrypting stream
                // and place them in a string.
                return srDecrypt.ReadToEnd();
            }
            finally
            {
                if (srDecrypt != null) srDecrypt.Close();
                if (csDecrypt != null) csDecrypt.Close();
                if (msDecrypt != null) msDecrypt.Close();
                if (rima != null) rima.Clear();
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

        private static string GetCpuId()
        {
            var managementClass = new ManagementClass("Win32_Processor");
            ManagementObjectCollection managementObjCol = managementClass.GetInstances();

            foreach (ManagementObject managementObj in managementObjCol)
            {
                return managementObj.Properties["ProcessorId"].Value.ToString();
            }
            return string.Empty;
        }
	}
}
