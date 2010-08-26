using System.Collections.Generic;
using System.Management;
using Composite.C1Console.Security.Plugins.LoginProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Security.LoginProviderPlugins.ValidateAllWindowsLoginProvider
{
    [Assembler(typeof(NonConfigurableLoginProviderAssembler))]
    internal sealed class ValidateAllWindowsLoginProviderData : LoginProviderData
    {
    }


    [ConfigurationElementType(typeof(ValidateAllWindowsLoginProviderData))]
    internal class ValidateAllWindowsLoginProvider : IWindowsLoginProvider
    {
        private List<string> _usernames = null;

        public IEnumerable<string> AllUsernames
        {
            get
            {
                if (_usernames == null)
                {
                    SelectQuery selectQuery = new SelectQuery("Win32_UserAccount");
                    ManagementObjectSearcher managementObjectSearcher = new ManagementObjectSearcher(selectQuery);
                    foreach (ManagementObject managementObject in managementObjectSearcher.Get())
                    {
                        _usernames.Add(managementObject["Name"].ToString());
                    }
                }

                return _usernames;
            }
        }



        public bool CanSetUserPassword
        {
            get { return false; }
        }



        public bool CanAddNewUser
        {
            get { return false; }
        }



        bool IWindowsLoginProvider.Validate(string username, string domainName)
        {
            return true;
        }


        public bool UsersExists
        {
            get { return true; }
        }
    }
}
