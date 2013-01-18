using System;
using System.IO;
using System.Xml;
using Composite.Core.Extensions;
using Composite.Core.IO;

namespace Composite.Core.WebClient.Captcha
{
    internal static class CaptchaConfiguration
    {
        private static readonly string CaptchaConfigurationFilePath = @"App_Data\Composite\Configuration\Captcha.xml";
        private static readonly object _syncRoot = new object();

        private static string _password;

        public static string Password
        {
            get
            {
                if (_password != null) return _password;

                lock (_syncRoot)
                {
                    if (_password != null) return _password;

                    string configurationFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, CaptchaConfigurationFilePath);

                    if (C1File.Exists(configurationFilePath))
                    {
                        var doc = new XmlDocument();
                        try
                        {
                            using (var sr = new C1StreamReader(configurationFilePath))
                            {
                                doc.Load(sr);
                            }

                            var passwordNode = doc.SelectSingleNode("captcha/password");
                            if (passwordNode != null && !string.IsNullOrEmpty(passwordNode.InnerText))
                            {
                                _password = passwordNode.InnerText;
                            }
                        }
                        catch (Exception)
                        {
                            // Do nothing
                        }

                        if (_password != null) return _password;

                        // Deleting configuration file
                        C1File.Delete(configurationFilePath);
                    }


                    _password = Guid.NewGuid().ToString();

                    string configFile = @"<captcha> <password>{0}</password> </captcha>".FormatWith(_password);

                    C1File.WriteAllText(configurationFilePath, configFile);

                    return _password;
                }
            }
        }
    }
}
