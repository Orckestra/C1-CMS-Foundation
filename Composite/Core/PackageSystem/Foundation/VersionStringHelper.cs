using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Composite.Core.PackageSystem.Foundation
{
	internal static class VersionStringHelper
	{
        public static bool ValidateVersion(string version, out string newVersion)
        {
            Regex shotVersionRegex = new Regex(@"[0-9]+");
            Match shotVersionMatch = shotVersionRegex.Match(version);
            if ((shotVersionMatch.Success == true) && (shotVersionMatch.Value == version))
            {
                newVersion = string.Format("{0}.0.0.0", version);
                return true;
            }

            Regex versionRegex = new Regex(@"[0-9]+\.[0-9]+\.*[0-9]*\.*[0-9]*");
            Match versionMatch = versionRegex.Match(version);
            if ((versionMatch.Success == true) && (versionMatch.Groups[0].Value.Length == version.Length))
            {
                newVersion = version;
                return true;
            }

            newVersion = null;
            return false;
        }
	}
}
