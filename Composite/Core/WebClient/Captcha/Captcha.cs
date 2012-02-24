using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;


namespace Composite.Core.WebClient.Captcha
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class Captcha
    {
        private static readonly string DateTimeFormat = "yyyyMMddHHmmss";
        private static readonly string CaptchaCharacters = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        private static readonly string CaptchaServiceUrl = UrlUtils.PublicRootPath + "/Renderers/Captcha.ashx";
        private static readonly int CaptchaLength = 4;
        private static readonly int CaptchaExpiration = 30; // In minutes
        private static int _counter = 0;

        private static readonly Random _random = new Random();

        // munute offset -> set of used records
        private static readonly Hashtable<int, Hashset<string>> _alreadyUsedRecords = new Hashtable<int, Hashset<string>>();


        /// <exclude />
        public static string CreateEncryptedValue()
        {
            DateTime now = DateTime.Now;
            string value = now.ToString(DateTimeFormat);
            value += "|" + GenerateText();

            return Encryption.Encrypt(value);
        }


        /// <exclude />
        public static bool IsValid(string encryptedValue)
        {
            string value;

            DateTime now = DateTime.Now;
            DateTime timeStamp;
            return !string.IsNullOrEmpty(encryptedValue)
                   && Decrypt(encryptedValue, out timeStamp, out value)
                   && timeStamp.AddMinutes(CaptchaExpiration) > now
                   && now >= timeStamp
                   && !IsAlreadyUsed(encryptedValue);
        }


        /// <exclude />
        public static bool IsValid(string value, string encryptedValue)
        {
            string correctValue;

            DateTime now = DateTime.Now;
            DateTime timeStamp;
            return Decrypt(encryptedValue, out timeStamp, out correctValue)
                   && string.Compare(value, correctValue, true) == 0
                   && timeStamp.AddMinutes(CaptchaExpiration) > now
                   && now >= timeStamp
                   && !IsAlreadyUsed(encryptedValue);
        }


        /// <exclude />
        public static void RegisterUsage(string encryptedValue)
        {
            string value;
            DateTime dateTime;
            Decrypt(encryptedValue, out dateTime, out value);

            int minute = GetMinute(dateTime);

            Hashset<string> usedRecords = _alreadyUsedRecords[minute];
            if (usedRecords == null)
            {
                lock(_alreadyUsedRecords)
                {
                    usedRecords = _alreadyUsedRecords[minute];
                    if (usedRecords == null)
                    {
                        usedRecords = new Hashset<string>();
                        _alreadyUsedRecords.Add(minute, usedRecords);
                    }
                }
            }

            lock(usedRecords)
            {
                if(!usedRecords.Contains(encryptedValue))
                {
                    usedRecords.Add(encryptedValue);
                }
            }

            // Periodic clean-up
            _counter++;
            if(_counter % 1000 == 0)
            {
                lock(_alreadyUsedRecords)
                {
                    int currentMinute = GetMinute(DateTime.Now);

                    ICollection<int> keys = _alreadyUsedRecords.GetKeys();
                    foreach(int key in keys)
                    {
                        if (key < currentMinute - CaptchaExpiration || key > currentMinute + 10)
                        {
                            _alreadyUsedRecords.Remove(key);
                        }
                    }
                }
            }
        }


        /// <exclude />
        public static bool IsAlreadyUsed(string encryptedValue)
        {
            string value;
            DateTime dateTime;
            Decrypt(encryptedValue, out dateTime, out value);

            int offset = GetMinute(dateTime);

            var records = _alreadyUsedRecords[offset];

            return records != null && records.Contains(encryptedValue);
        }


        private static int GetMinute(DateTime dateTime)
        {
            return dateTime.Hour * 60 + dateTime.Minute;
        }


        /// <exclude />
        public static bool Decrypt(string encryptedValue, out DateTime timestamp, out string value)
        {
            timestamp = DateTime.MinValue;
            value = null;

            string decrypted = Encryption.Decrypt(encryptedValue);
            if (decrypted.IsNullOrEmpty())
            {
                return false;
            }

            int separatorIndex = decrypted.IndexOf("|");
            if (separatorIndex <= 0 || separatorIndex == decrypted.Length - 1)
            {
                return false;
            }

            string datePart = decrypted.Substring(0, separatorIndex);
            string captchaPart = decrypted.Substring(separatorIndex + 1);

            if (!DateTime.TryParseExact(datePart, DateTimeFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out timestamp))
            {
                return false;
            }

            value = captchaPart;
            return true;
        }

        /// <exclude />
        public static string GetImageUrl(string encryptedCaptchaValue)
        {
            var url = new UrlBuilder(CaptchaServiceUrl);
            url["value"] = encryptedCaptchaValue;
            return url.ToString();
        }

        private static string GenerateText()
        {
            StringBuilder sb = new StringBuilder(CaptchaLength);
            for (int i = 0; i < CaptchaLength; i++)
            {
                sb.Append(CaptchaCharacters[_random.Next(0, CaptchaCharacters.Length)]);
            }
            return sb.ToString();
        }
    }
}