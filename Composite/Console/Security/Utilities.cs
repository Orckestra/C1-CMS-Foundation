using System;

namespace Composite.C1Console.Security
{
    internal static class Utilities
    {
        public static void ParseUserLoginString(string windowsAuthenticatedFullName, out string userName, out string domainName)
        {
            ParseUserLoginString(windowsAuthenticatedFullName, out userName, out domainName, true);
        }


        public static bool TryParseUserLoginString(string windowsAuthenticatedFullName, out string userName, out string domainName)
        {
            return ParseUserLoginString(windowsAuthenticatedFullName, out userName, out domainName, false);
        }


        private static bool ParseUserLoginString(string windowsAuthenticatedFullName, out string userName, out string domainName, bool throwException)
        {
            // Format: [domain]\[username] or [username]
            if (string.IsNullOrEmpty(windowsAuthenticatedFullName))
            {
                userName = null;
                domainName = null;
                return HandleError("Authenticated user name can not be null or empty", "windowsAuthenticatedFullName", throwException);
            }

            if (windowsAuthenticatedFullName.IndexOf(@"\") == -1)
            {
                domainName = "";
                userName = windowsAuthenticatedFullName;
            }
            else
            {
                char[] userLoginSeparator = { '\\' };
                string[] userLoginParts = windowsAuthenticatedFullName.Split(userLoginSeparator);

                if (2 == userLoginParts.Length && string.IsNullOrEmpty(userLoginParts[0]) == false && string.IsNullOrEmpty(userLoginParts[1]) == false)
                {
                    domainName = userLoginParts[0];
                    userName = userLoginParts[1];
                }
                else
                {
                    userName = null;
                    domainName = null;
                    return HandleError("Unexpected user login format", "windowsAuthenticatedFullName", throwException);
                }
            }

            return true;
        }


        private static bool HandleError(string message, string paramName, bool throwException)
        {
            if (true == throwException)
            {
                throw new ArgumentException(message, paramName);
            }

            return false;
        }        
    }
}
