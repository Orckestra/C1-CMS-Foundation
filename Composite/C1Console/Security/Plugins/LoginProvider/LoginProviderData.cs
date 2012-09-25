using System;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.C1Console.Security.Plugins.LoginProvider
{
    /// <summary>
    /// Base class for login provider configuration. Inherit from this class to declare the configuration a custom provider.
    /// </summary>
    public class LoginProviderData : NameTypeConfigurationElement
    {
        public LoginProviderData() : base("Unnamed", typeof(ILoginProvider)) { }

        public LoginProviderData(string name, Type type) : base(name, type) { }
    }
}
