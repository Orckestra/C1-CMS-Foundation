using System.Collections.Generic;
using Composite.C1Console.Security.Plugins.LoginProvider.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Security.Plugins.LoginProvider
{
    /// <summary>
    /// Base interface for login providers.
    /// </summary>
    [CustomFactory(typeof(LoginProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(LoginProviderDefaultNameRetriever))]
    public interface ILoginProvider
    {
        /// <summary>
        /// Enumerates all known user names
        /// </summary>
        IEnumerable<string> AllUsernames { get; }

        /// <summary>
        /// When true the provider is capable of changing a users password
        /// </summary>
        bool CanSetUserPassword { get; }

        /// <summary>
        /// When true the provider is capable of creating new users
        /// </summary>
        bool CanAddNewUser { get; }

        /// <summary>
        /// When true users exists in the system, i.e. AllUsernames.Any()
        /// </summary>
        bool UsersExists { get; }
    }
}