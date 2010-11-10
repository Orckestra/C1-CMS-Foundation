

namespace Composite.Core.IO
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class DirectoryEx
	{
        public static void RemoveReadOnlyRecursively(string directoryPath)
        {
            foreach (string file in C1Directory.GetFiles(directoryPath))
            {
                FileEx.RemoveReadOnly(file);
            }


            foreach (string directory in C1Directory.GetDirectories(directoryPath))
            {
                RemoveReadOnlyRecursively(directory);
            }
        }
	}
}
