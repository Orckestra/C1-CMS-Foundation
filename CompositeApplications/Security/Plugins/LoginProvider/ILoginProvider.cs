using System.Collections.Generic;
using Composite.Security.Plugins.LoginProvider.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Security.Plugins.LoginProvider
{
    [CustomFactory(typeof(LoginProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(LoginProviderDefaultNameRetriever))]
    public interface ILoginProvider
    {
        IEnumerable<string> AllUsernames { get; }
        bool CanSetUserPassword { get; }
        bool CanAddNewUser { get; }
        bool UsersExists { get; }
    }
}