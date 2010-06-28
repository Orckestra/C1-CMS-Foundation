using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;


namespace Composite.Types
{
    internal sealed class CreatedFilenameParser
    {
        public static readonly string PrefixString = "CMS";
        private static readonly string VersionString = "v";
        private static readonly string VersionStringMask = "0000";


        private CreatedFilenameParser()
        {
        }


        public static CreatedFilenameParser Create(string filename)
        {
            return Create(filename, "dll");
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="extension">Ex: dll</param>
        /// <returns></returns>
        public static CreatedFilenameParser Create(string filename, string extension)
        {
            string fn = Path.GetFileName(filename);

            int idx = fn.LastIndexOf(string.Format(".{0}", extension));
            if (idx >= 0)
            {
                fn = fn.Remove(idx);
            }

            string[] s = fn.Split('_');

            if (s.Length != 5) return null;
            if (s[0] != PrefixString) return null;
            if (s[3].StartsWith(VersionString) == false) return null;

            int hashedId;
            if (Int32.TryParse(s[1], NumberStyles.HexNumber, null, out hashedId) == false) return null;

            string versionNumber = s[3].Substring(VersionString.Length, VersionStringMask.Length);
            int version;
            if (Int32.TryParse(versionNumber, out version) == false) return null;

            return new CreatedFilenameParser { Filename = filename, HashedId = hashedId, AssemblyVersion = version };
        }



        public static string CreateFilename(BuildManagerCompileUnit buildManagerCompileUnit)
        {
            return CreateFilename(buildManagerCompileUnit, "dll");
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="buildManagerCompileUnit"></param>
        /// <param name="extension">Ex: dll</param>
        /// <returns></returns>
        public static string CreateFilename(BuildManagerCompileUnit buildManagerCompileUnit, string extension)
        {
            string fingerprint = buildManagerCompileUnit.Fingerprint;
            if (fingerprint == null) fingerprint = "";

            return string.Format("{0}_{1:X8}_{2:X8}_{3}{4}_{5}.{6}", PrefixString, buildManagerCompileUnit.HashedId, fingerprint.GetHashCode(), VersionString, buildManagerCompileUnit.AssemblyVersion.ToString(VersionStringMask), Guid.NewGuid(), extension);
        }



        public static IEnumerable<CreatedFilenameParser> GetParsers(string path)
        {
            return GetParsers(path, "dll");
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="path"></param>
        /// <param name="extension">Ex: dll</param>
        /// <returns></returns>
        public static IEnumerable<CreatedFilenameParser> GetParsers(string path, string extension)
        {
            IEnumerable<string> fileanames =
                from fn in Directory.GetFiles(path, string.Format("{0}*.{1}", PrefixString, extension))
                select fn;

            foreach (string filename in fileanames)
            {
                CreatedFilenameParser createdFilenameParser = CreatedFilenameParser.Create(filename, extension);

                if (createdFilenameParser != null)
                {
                    yield return createdFilenameParser;
                }
            }
        }



        public string Filename { get; private set; }
        public int HashedId { get; private set; }
        public int AssemblyVersion { get; private set; }
    }
}
