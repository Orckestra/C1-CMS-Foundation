using System;
using Composite.Core.Implementation;

namespace Composite
{
    public static class Log
    {

        static Log()
        {
            ImplementationContainer.SetImplementation<LogBase>(new LogDefaultImplementation());
        }


        public static void Information(string title, string messageFormat, params object[] args) 
        {
            ImplementationContainer.GetImplementation<LogBase>().LogInformation(title, messageFormat, args);
        }



        public static void Verbose(string title, string messageFormat, params object[] args) 
        {
            ImplementationContainer.GetImplementation<LogBase>().LogInformation(title, messageFormat, args);
        }



        public static void Warning(string title, string messageFormat, params object[] args)
        {
            ImplementationContainer.GetImplementation<LogBase>().LogInformation(title, messageFormat, args);
        }



        public static void Error(string title, string messageFormat, params object[] args)
        {
            ImplementationContainer.GetImplementation<LogBase>().LogInformation(title, messageFormat, args);
        }



        public static void Critical(string title, string messageFormat, params object[] args)
        {
            ImplementationContainer.GetImplementation<LogBase>().LogInformation(title, messageFormat, args);
        }


        // These could have been added in a later version
        public static void Warning(string title, Exception exception)
        {
            ImplementationContainer.GetImplementation<LogBase>().LogWarning(title, exception);
        }



        public static void Error(string title, Exception exception)
        {
            ImplementationContainer.GetImplementation<LogBase>().LogError(title, exception);
        }



        public static void Critical(string title, Exception exception)
        {
            ImplementationContainer.GetImplementation<LogBase>().LogCritical(title, exception);
        }
    }
}
