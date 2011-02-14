using System.IO;


namespace Composite.Core.IO
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class FileUtils
    {
        /// <exclude />
        public static bool RemoveReadOnly(string filePath)
        {
            if (C1File.Exists(filePath) == false) return false;

            FileAttributes fileAttributes = C1File.GetAttributes(filePath);

            if ((fileAttributes & FileAttributes.ReadOnly) == FileAttributes.ReadOnly)
            {
                fileAttributes ^= FileAttributes.ReadOnly;
                C1File.SetAttributes(filePath, fileAttributes);
            }

            return true;
        }



        /// <exclude />
        public static void Delete(string filePath)
        {
            if (C1File.Exists(filePath) == true)
            {
                RemoveReadOnly(filePath);
                C1File.Delete(filePath);
            }
        }
    }
}
