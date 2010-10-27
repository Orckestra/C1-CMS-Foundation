using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.IO;
using Composite.Core.NewIO;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;
using ICSharpCode.SharpZipLib.Zip;


namespace Composite.Plugins.ResourceSystem.FileSystemBasedIconResourceProvider.Foundation
{
    internal sealed class FileSystemBasedIconResourceProviderHelper
    {
        private string _resolvedBaseDirectoryPath;
        private string _mappingsFileFullPath;
        private XElement _mappings;
        private DateTime _lastMappingsFileTimeStamp;

        private object _lock = new object();



        public FileSystemBasedIconResourceProviderHelper(string baseDirectoryPath, string iconMappingsFileName)
        {
            _resolvedBaseDirectoryPath = PathUtil.Resolve(baseDirectoryPath);

            _mappingsFileFullPath = System.IO.Path.Combine(_resolvedBaseDirectoryPath, iconMappingsFileName);

        }

        public IEnumerable<string> GetIconNames()
        {
            EnsureMappings();

            return
                from iconElement in _mappings.Elements("Icon")
                select iconElement.Attribute("name").Value;
        }



        public Bitmap GetIcon(string name, IconSize iconSize, CultureInfo cultureInfo)
        {
            EnsureMappings();

            XElement iconElement = _mappings.Elements("Icon").Where(f => f.Attribute("name").Value.ToLower() == name.ToLower()).FirstOrDefault();

            if (iconElement == null) throw new InvalidOperationException(string.Format("No icon with name '{0}' found.", name));

            XElement iconFileElement = GetIconFileBySize(iconElement, iconSize);

            if (iconFileElement == null)
            {
                if (iconSize == IconSize.Normal) throw new InvalidOperationException(string.Format("The icon named '{0}' does not have a file with size='normal'", name));

                // Resizing the 'Normal' one..
                iconFileElement = GetIconFileBySize(iconElement, IconSize.Normal);

                Bitmap malSizedIcon = GetIconBitmap(iconFileElement);

                if (malSizedIcon == null) throw new InvalidOperationException(string.Format("The icon named '{0}' does not have a file with size='normal'", name));

                int length = (iconSize == IconSize.Large ? 24 : 32);
                Bitmap resizedIcon = new Bitmap(length, length);
                using (Graphics g = Graphics.FromImage((Image)resizedIcon))
                {
                    g.DrawImage(malSizedIcon, 0, 0, length, length);
                }

                return resizedIcon;
            }
            else
            {
                return GetIconBitmap(iconFileElement);
            }

        }



        private void EnsureMappings()
        {
            if (File.GetLastWriteTime(_mappingsFileFullPath) > _lastMappingsFileTimeStamp)
            {
                lock (_lock)
                {
                    if (File.GetLastWriteTime(_mappingsFileFullPath) > _lastMappingsFileTimeStamp)
                    {
                        if (File.Exists(_mappingsFileFullPath) == false) throw new InvalidOperationException(string.Format("Icon mapping file '{0}' not found.", _mappingsFileFullPath));

                        try
                        {
                            _mappings = XElementUtils.Load(_mappingsFileFullPath);
                        }
                        catch (Exception ex)
                        {
                            throw new InvalidOperationException(string.Format("Failed to load icon mapping file '{0}'", _mappingsFileFullPath), ex);
                        }

                        _lastMappingsFileTimeStamp = File.GetLastWriteTime(_mappingsFileFullPath);
                    }
                }
            }
        }



        private XElement GetIconFileBySize(XElement iconElement, IconSize iconSize)
        {
            return iconElement.Elements("IconFile").Where(f => f.Attribute("size").Value.ToLower() == iconSize.ToString().ToLower()).FirstOrDefault();
        }



        private Bitmap GetIconBitmap(XElement iconFile)
        {
            string fileRelativePath = iconFile.Attribute("path").Value;

            if (this.ZipFileMode==false)
            {
                string fullPath = System.IO.Path.Combine(_resolvedBaseDirectoryPath, fileRelativePath);

                return (Bitmap)Bitmap.FromFile(fullPath);
            }
            else
            {
                ZipFile zf = new ZipFile(this.ZipFilePath);
                ZipEntry ze = zf.GetEntry(fileRelativePath.Replace('\\','/'));

                if (ze != null)
                {
                    using (System.IO.Stream fileStream = zf.GetInputStream(ze))
                    {
                        return (Bitmap)Bitmap.FromStream(fileStream);
                    }
                }
                else
                {
                    throw new System.IO.FileNotFoundException(string.Format("Icon '{0}' not found in ZIP archive.", fileRelativePath));
                }
            }
        }



        private string ZipFilePath
        {
            get
            {
                if (_mappings.Attribute("zipfilepath") == null)
                {
                    return null;
                }
                else
                {
                    return System.IO.Path.Combine(_resolvedBaseDirectoryPath, _mappings.Attribute("zipfilepath").Value);
                }
            }
        }


        private bool ZipFileMode
        {
            get
            {
                if (this.ZipFilePath == null) return false;

                return File.Exists(this.ZipFilePath);
            }
        }
    }
}
