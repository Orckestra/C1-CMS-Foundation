using System;
using Composite.Core;
using Composite.Core.WebClient.Captcha;
using Composite.Plugins.Functions.XslExtensionsProviders.ConfigBasedXslExtensionsProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Functions.XslExtensionsProviders
{
    [ConfigurationElementType(typeof(ConfigBasedXslExtensionInfo))]
    internal class CaptchaXslExtension
    {
        public string GetEncryptedValue(string oldValue)
        {
            if(EncryptedValueIsValid(oldValue))
            {
                return oldValue;
            }
            return CreateEncryptedValue();
        }

        public string CreateEncryptedValue()
        {
            return Captcha.CreateEncryptedValue();
        }

        public string GetImageUrl(string encryptedCaptchaValue)
        {
            var url = new UrlBuilder("/Renderers/Captcha.ashx");
            url["value"] = encryptedCaptchaValue;
            return url.ToString();
        }

        public bool IsValid(string value, string encryptedValue)
        {
            return Captcha.IsValid(value, encryptedValue);
        }

        public bool EncryptedValueIsValid(string encryptedValue)
        {
            return Captcha.IsValid(encryptedValue);
        }

        public void RegisterUsage(string encryptedValue)
        {
            Captcha.RegisterUsage(encryptedValue);
        }

        public bool IsAlreadyUsed(string encryptedValue)
        {
            return Captcha.IsAlreadyUsed(encryptedValue);
        }

        public static bool Decrypt(string encryptedValue, out DateTime timestamp, out string value)
        {
            return Captcha.Decrypt(encryptedValue, out timestamp, out value);
        }
    }
}