using System;
using System.Linq;
using Composite.Core.IO;
using System.Reflection;
using Composite.Core;
using Composite.Core.Configuration;


namespace Composite
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class RuntimeInformation
	{
        private static bool? _isUnitTest;
        private static string _uniqueInstanceName;
        private static string _uniqueInstanceNameSafe;
        private static readonly Lazy<Version> _brandedAssemblyName = new Lazy<Version>(GetBrandedProductVersion);

        /// <exclude />
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


        /// <exclude />
	    public static bool AppDomainLockingDisabled => IsUnittest;


        /// <exclude />
        public static bool IsUnittest
        {
            get
            {
                if (!_isUnitTest.HasValue)
                {
                    _isUnitTest = IsUnittestEnvironment();
                }

                return _isUnitTest.Value;
            }
        }


        private static bool IsUnittestEnvironment()
        {
            var domain = AppDomain.CurrentDomain;
            string applicationName = domain.SetupInformation.ApplicationName;

            return domain.FriendlyName.StartsWith("NUnit ")
                || applicationName == null || applicationName == "vstesthost.exe";
        }

        internal static bool TestAutomationEnabled => true;


        /// <exclude />
        public static Version ProductVersion
        {
            get
            {
                return typeof(RuntimeInformation).Assembly.GetName().Version;
            }
        }


        /// <summary>
        /// A version number to be shown in UI.
        /// </summary>
        public static Version BrandedProductVersion
        {
            get
            {
                return _brandedAssemblyName.Value ?? ProductVersion;
            }
        }


        private static Version GetBrandedProductVersion()
        {
            try
            {
                string assemblyName = GlobalSettingsFacade.BrandedVersionAssemblySource;
                if (assemblyName == null)
                {
                    return null;
                }

                var asm = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(a => a.GetName().Name == assemblyName);
                if (asm == null)
                {
                    Log.LogWarning(nameof(RuntimeInformation),
                        $"Failed to find branded product version source assembly by name '{assemblyName}'");
                    return null;
                }

                return asm.GetName().Version;
            }
            catch (Exception ex)
            {
                Log.LogError(nameof(RuntimeInformation),  ex);
                return null;
            }
        }


        /// <exclude />
        public static string ProductTitle
        {
            get
            {
                Assembly asm = typeof(RuntimeInformation).Assembly;
                string assemblyTitle = ((AssemblyTitleAttribute)asm.GetCustomAttributes(typeof(AssemblyTitleAttribute), false)[0]).Title;

                return assemblyTitle;
            }
        }



        /// <exclude />
        public static string UniqueInstanceName
        {
            get
            {
                if (_uniqueInstanceName == null)
                {
                    string baseString = PathUtil.BaseDirectory.ToLowerInvariant();
                    _uniqueInstanceName = $"C1@{PathUtil.CleanFileName(baseString)}";
                }

                return _uniqueInstanceName;
            }
        }



        /// <exclude />
        public static string UniqueInstanceNameSafe
        {
            get
            {
                if (_uniqueInstanceNameSafe == null)
                {
                    string baseString = PathUtil.BaseDirectory.ToLowerInvariant().Replace(@"\", "-").Replace("/", "-");
                    _uniqueInstanceNameSafe = $"C1@{PathUtil.CleanFileName(baseString)}";
                }

                return _uniqueInstanceNameSafe;
            }
        }
	}
}
