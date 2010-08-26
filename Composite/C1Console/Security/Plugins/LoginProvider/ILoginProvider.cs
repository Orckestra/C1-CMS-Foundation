using System.Collections.Generic;
using Composite.C1Console.Security.Plugins.LoginProvider.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.LoginProvider
{
    [CustomFactory(typeof(LoginProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(LoginProviderDefaultNameRetriever))]
    internal interface ILoginProvider
    {
        IEnumerable<string> AllUsernames { get; }
        bool CanSetUserPassword { get; }
        bool CanAddNewUser { get; }
        bool UsersExists { get; }
    }
}