using System;
using System.IO;
using System.Web.WebPages;

namespace Composite.AspNet
{
    /// <summary>
    /// 
    /// </summary>
    public class LegacyC1DisplayMode : DefaultDisplayMode
    {
        public override string DisplayModeId
        {
            get { return base.DisplayModeId + "_c1_legacy"; }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="suffix"></param>
        public LegacyC1DisplayMode(string suffix) : base(suffix) { }

        protected override string TransformPath(string virtualPath, string suffix)
        {
            if (String.IsNullOrEmpty(suffix))
            {
                return virtualPath;
            }

            var directory = Path.GetDirectoryName(virtualPath);
            var extension = Path.GetExtension(virtualPath);
            var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(virtualPath);

            return Path.Combine(directory, fileNameWithoutExtension + "_" + suffix + extension);
        }
    }
}