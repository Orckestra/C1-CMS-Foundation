using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.Core.IO;


namespace Composite.Data.Types
{
    /// <summary>    
    /// Reference to a folder to be shown in the 'Layout' perspective.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{b831fee3-fb55-44be-b00d-034bbd83574f}")]
    [KeyPropertyName(0, "KeyName")]
    [KeyPropertyName(1, "TildeBasedPath")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.AdministratedName)]
    public interface IFolderWhiteList : IData
    {
        /// <exclude />
        [ImmutableFieldId("{cb0bb5a7-c1fe-47a1-bfb4-6565bc9ffd4d}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        string KeyName { get; set; }


        /// <exclude />
        [ImmutableFieldId("{d03415bd-ec41-4a57-8072-59e0a761f113}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        string TildeBasedPath { get; set; }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class IFolderWhiteListExtensions
    {
        /// <exclude />
        public static string GetTildePath(string fullPath)
        {
            try
            {
                if (PathUtil.BaseDirectory.StartsWith(fullPath))
                {
                    return "~\\";
                }

                string withoutBase = fullPath.Substring(PathUtil.BaseDirectory.Length);
                if (withoutBase.StartsWith("\\") == false)
                {
                    withoutBase = "\\" + withoutBase;
                }

                return "~" + withoutBase;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(string.Format("Failed to get tilde based path from '{0}'", fullPath), ex);
            }
        }


        /// <exclude />
        public static string GetFullPath(this IFolderWhiteList folderWhiteList)
        {
            return PathUtil.Resolve(folderWhiteList.TildeBasedPath);
        }
    }
}