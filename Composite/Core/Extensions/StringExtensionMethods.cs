using System;
using System.Globalization;
using System.IO;
using System.Text;
using JetBrains.Annotations;


namespace Composite.Core.Extensions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class StringExtensionMethods
    {
        /// <exclude />
        [StringFormatMethod("format")]
        public static string FormatWith(this string format, params object[] args)
        {
            Verify.ArgumentNotNull(format, "format");

            return string.Format(CultureInfo.InvariantCulture, format, args);
        }


        /// <exclude />
        public static bool IsNullOrEmpty(this string str)
        {
            return string.IsNullOrEmpty(str);
        }


        /// <exclude />
        public static bool StartsWith(this string str, string value, bool ignoreCase)
        {
            return str.StartsWith(value, ignoreCase, CultureInfo.InvariantCulture);
        }


        /// <exclude />
        public static bool EndsWith(this string str, string value, bool ignoreCase)
        {
            return str.EndsWith(value, ignoreCase, CultureInfo.InvariantCulture);
        }


        /// <exclude />
        public static bool IsCorrectNamespace(this string s, char separator)
        {
            if (s == null) return false;
            if (s == "") return true;

            string[] splits = s.Split(separator);

            foreach (string split in splits)
            {
                if (split == "") return false;
            }

            return true;
        }



        /// <exclude />
        public static string CreateNamespace(string namespaceName, string name, char separator)
        {
            if (string.IsNullOrEmpty(namespaceName))
            {
                return name;
            }
            return string.Format("{0}{1}{2}", namespaceName, separator, name);
        }


        /// <summary>
        /// Default separator is '.'
        /// </summary>
        /// <param name="namespaceName"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static string CreateNamespace(string namespaceName, string name)
        {
            return CreateNamespace(namespaceName, name, '.');
        }



        /// <exclude />
        public static string GetNameFromNamespace(this string s)
        {
            int index = s.LastIndexOf(".", StringComparison.Ordinal);
            if (index < 0)
            {
                return s;
            }
            return s.Substring(index + 1);
        }



        /// <exclude />
        public static string GetNamespace(this string s)
        {
            int index = s.LastIndexOf(".", StringComparison.Ordinal);
            if (index <= 0)
            {
                return string.Empty;
            }

            string result = s.Substring(0, index);
            if (result.EndsWith("."))
            {
                result = result.Substring(0, result.Length);
            }

            return result;
        }



        /// <exclude />
        public static bool IsCorrectFolderName(this string s, char separator)
        {
            if (s == null) return false;
            if (s == "/") return true;
            if (!s.StartsWith("/")) return false;
            if (s.Length > 1 && s.EndsWith("/")) return false;

            string[] splits = s.Split(separator);

            for (int i = 1; i < splits.Length; i++)
            {
                if (splits[i] == "") return false;
            }

            return true;
        }



        /// <exclude />
        public static bool IsDirectChildOf(this string s, string possibleParentPath, char separator)
        {
            if (possibleParentPath.Length > s.Length)
            {
                return false;
            }
            if (s == possibleParentPath)
            {
                return false;
            }

            if (!s.StartsWith(possibleParentPath))
            {
                return false;
            }

            if (possibleParentPath == separator.ToString())
            {
                string remaining = s.Remove(0, possibleParentPath.Length);
                if (!remaining.Contains(separator.ToString()))
                {
                    return true;
                }
            }

            if (s[possibleParentPath.Length] == '/')
            {
                string remaining = s.Remove(0, possibleParentPath.Length + 1);
                if (!remaining.Contains(separator.ToString()))
                {
                    return true;
                }
            }

            return false;
        }



        /// <exclude />
        public static bool IsParentOf(this string s, string possibleChild, char separator)
        {
            return possibleChild.IsDirectChildOf(s, separator);
        }



        /// <exclude />
        public static string GetFolderName(this string s, char separator)
        {
            if (s.Length == 1 && s[0] == separator)
            {
                return null;
            }

            if (!s.Contains(separator.ToString()))
            {
                return "/";
            }

            string[] foldernames = s.Split(separator);

            if (foldernames[foldernames.Length - 1] == "")
            {
                if (foldernames.Length >= 2)
                {
                    return foldernames[foldernames.Length - 2];
                }
                
                throw new System.NotImplementedException();
            }
            
            return foldernames[foldernames.Length - 1];
        }



        /// <exclude />
        public static string GetNameWithoutExtension(this string s)
        {
            string name = Path.GetFileName(s);
            if (Path.HasExtension(name))
            {
                int lastIndex = name.LastIndexOf('.');
                return name.Remove(lastIndex);
            }
            return name;
        }



        /// <exclude />
        public static string GetDirectory(this string s, char separator)
        {
            Verify.ArgumentNotNull(s, "s");

            int lastIndex = s.LastIndexOf(separator);
            if (lastIndex > 0)
            {
                return s.Remove(lastIndex);
            }

            if (lastIndex == 0 && s.Length > 1)
            {
                return "/";
            }
            if (lastIndex == 0 && s.Length == 1)
            {
                return "";
            }

            if (s.IndexOf(separator) == -1)
            {
                return "";
            }

            return s;
        }



        /// <summary>
        /// Combines URL paths using / as seperator
        /// </summary>
        /// <param name="path"></param>
        /// <param name="otherPath"></param>
        /// <param name="separator"></param>
        /// <returns></returns>
        public static string Combine(this string path, string otherPath, char separator)
        {
            Verify.ArgumentNotNull(path, "path");
            Verify.ArgumentNotNull(otherPath, "otherPath");

            string childPath = otherPath;
            if (otherPath.StartsWith("/"))
            {
                childPath = otherPath.Substring(1, otherPath.Length - 1);
            }
            if (childPath.EndsWith("/"))
            {
                childPath = otherPath.Substring(0, otherPath.Length - 1);
            }

            if (path.Length == 1 && path[0] == separator)
            {
                return path + childPath;
            }

            if (otherPath == "/" || otherPath == string.Empty)
            {
                return path;
            }

            return path + "/" + childPath;
        }

        /// <summary>
        /// Replaces old value with new value using the specified string comparison method for searching for the oldValue.
        /// </summary>
        /// <param name="str">The string.</param>
        /// <param name="oldValue">The old subsvalue.</param>
        /// <param name="newValue">The new value.</param>
        /// <param name="comparison">The comparison.</param>
        /// <returns></returns>
        public static string Replace(this string str, string oldValue, string newValue, StringComparison comparison)
        {
            int index = str.IndexOf(oldValue, comparison);

            if (index == -1)
            {
                return str;
            }

            int previousIndex = 0;
            var sb = new StringBuilder();

            while (index != -1)
            {
                sb.Append(str, previousIndex, index - previousIndex);
                sb.Append(newValue);
                index += oldValue.Length;

                previousIndex = index;
                index = str.IndexOf(oldValue, index, comparison);
            }
            sb.Append(str, previousIndex, str.Length - previousIndex);

            return sb.ToString();
        }
    }
}
