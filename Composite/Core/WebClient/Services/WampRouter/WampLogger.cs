using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WampSharp.Logging;

namespace Composite.Core.WebClient.Services.WampRouter
{
    class WampLogger : ILogProvider
    {
        public WampLogger()
        {
        }

        public Logger GetLogger(string name)
        {
            return new CompositeLogger().Log;
        }

        public IDisposable OpenNestedContext(string message)
        {
            return null; //LogContext.PushProperty("NDC", message);
        }

        public IDisposable OpenMappedContext(string key, string value)
        {
            return null;//LogContext.PushProperty(key, value, false);
        }

        internal class CompositeLogger
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
                    default:
                        //Core.Log.LogVerbose(nameof(WampLogger), messageFunc.Invoke(), formatParameters);
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
