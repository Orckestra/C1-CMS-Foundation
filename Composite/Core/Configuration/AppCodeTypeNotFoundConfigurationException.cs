using System;

namespace Composite.Core.Configuration
{
    internal class AppCodeTypeNotFoundConfigurationException : Exception
    // Does not inherit ConfigurationErrorsException/ConfigurationException since that would lead to loosing exception type 
    // during rethow by System.Configuration classes
    {
        public AppCodeTypeNotFoundConfigurationException(string message)
            : base(message)
        {
        }
    }
}
