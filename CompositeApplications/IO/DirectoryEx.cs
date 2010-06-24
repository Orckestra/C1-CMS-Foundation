using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;


namespace Composite.IO
{
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
