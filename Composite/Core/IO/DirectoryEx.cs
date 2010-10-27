using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Core.NewIO;


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
            foreach (string file in Directory.GetFiles(directoryPath))
            {
                FileEx.RemoveReadOnly(file);
            }


            foreach (string directory in Directory.GetDirectories(directoryPath))
            {
                RemoveReadOnlyRecursively(directory);
            }
        }
	}
}
