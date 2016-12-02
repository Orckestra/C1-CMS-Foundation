using System;
using System.Text.RegularExpressions;
using WampSharp.Logging;

namespace Composite.Core.WebClient.Services.WampRouter
{
    class WampLogger : ILogProvider
    {
        public Logger GetLogger(string name)
        {
            return new CompositeLoggerWrapper().Log;
        }

        public IDisposable OpenNestedContext(string message)
        {
            return null;
        }

        public IDisposable OpenMappedContext(string key, string value)
        {
            return null;
        }

        internal class CompositeLoggerWrapper
        {
            public bool Log(LogLevel logLevel, Func<string> messageFunc, Exception exception,
                params object[] formatParameters)
            {
                switch (logLevel)
                {
                    case LogLevel.Fatal:
                        Core.Log.LogCritical(nameof(WampLogger), exception);
                        break;
                    case LogLevel.Error:
                        Core.Log.LogError(nameof(WampLogger), FormatMessage(messageFunc, formatParameters));
                        break;
                    case LogLevel.Warn:
                        Core.Log.LogWarning(nameof(WampLogger), FormatMessage(messageFunc, formatParameters));
                        break;
                    case LogLevel.Info:
                        Core.Log.LogInformation(nameof(WampLogger), FormatMessage(messageFunc, formatParameters));
                        break;
                    case LogLevel.Trace:
                        Core.Log.LogVerbose(nameof(WampLogger), FormatMessage(messageFunc, formatParameters));
                        break;
                }
                return true;
            }

            private string FormatMessage(Func<string> messageFunc, params object[] formatParameters)
            {
                var message = messageFunc.Invoke();
                Regex needle = new Regex(@"\{(.*?)\}");
                
                int i = 0;
                while (needle.IsMatch(message))
                {
                    message = needle.Replace(message, "^"+i.ToString()+"#", 1);
                    i++;
                }

                return string.Format(message.Replace('#','}').Replace('^', '{'), formatParameters);
            }

        }
    }
}
