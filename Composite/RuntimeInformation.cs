using System;
using Composite.IO;
using System.Reflection;


namespace Composite
{
	public static class RuntimeInformation
	{
        private static bool _isUnitTestDetermined = false;
        private static bool _isUnitTest = false;
        private static string _uniqueInstanceName = null;
        private static string _uniqueInstanceNameSafe = null;

        public static bool IsDebugBuild
        {
            get
            {
#if DEBUG
                return true;
#else
                return false;
#endif
            }
        }

	    public static bool AppDomainLockingDisabled
	    {
            get
            {
                return IsUnittest;
            }
	    }

        public static bool IsUnittest
        {
            get
            {
                if (_isUnitTestDetermined==false)
                {
                    _isUnitTest = RuntimeInformation.IsUnittestImpl;
                    _isUnitTestDetermined = true;
                }

                return _isUnitTest;
            }
        }


        private static bool IsUnittestImpl
        {
            get
            {
                if (AppDomain.CurrentDomain.SetupInformation.ApplicationName == null)
                {
                    return true;
                }

                if (AppDomain.CurrentDomain.SetupInformation.ApplicationName == "vstesthost.exe")
                {
                    return true;
                }

                return false;
            }
        }



        public static Version ProductVersion
        {
            get
            {
                return typeof(RuntimeInformation).Assembly.GetName().Version;
            }
        }



        public static string ProductTitle
        {
            get
            {
                Assembly asm = typeof(RuntimeInformation).Assembly;
                return ((AssemblyTitleAttribute)asm.GetCustomAttributes(typeof(AssemblyTitleAttribute), false)[0]).Title;
            }
        }



        public static string UniqueInstanceName
        {
            get
            {
                if (_uniqueInstanceName == null)
                {
                    string baseString = PathUtil.BaseDirectory.ToLower();
                    _uniqueInstanceName = string.Format("C1@{0}", PathUtil.CleanFileName(baseString));
                }

                return _uniqueInstanceName;
            }
        }



        public static string UniqueInstanceNameSafe
        {
            get
            {
                if (_uniqueInstanceNameSafe == null)
                {
                    string baseString = PathUtil.BaseDirectory.ToLower().Replace(@"\", "-").Replace("/", "-");
                    _uniqueInstanceNameSafe = string.Format("C1@{0}", PathUtil.CleanFileName(baseString));
                }

                return _uniqueInstanceNameSafe;
            }
        }
	}
}
