using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Composite.Core.IO.Plugins.IOProvider
{
    internal abstract class IOProviderDirectory
    {
        public abstract System.IO.DirectoryInfo CreateDirectory(string path);
    }

    internal abstract class IOProviderFileStream : System.IO.Stream, IDisposable
    {
    }


    internal interface IIOProvider
    {

        IOProviderFileStream CreateFileStream(string path, System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share);


        // --- Classes/Structs ---
        // static Directory
        // static File
        // FileStream
        // FileSystemWatcher
        // StreamReader
        // StreamWriter
        // WaitForChangedResult
        // Configuration
        // FileConfigurationSource
        // FileConfigurationSourceImplementation??


        // --- Methods ---
        // XDocumentUtils.Load
        // XDocumentUtils.Save
        // XElementUtils.Load
        // XElementUtils.SaveToPath
        // XmlReaderUtils.Create
        // XmlSchemaSetUtils.AddFromPath
        // XmlWriterUtils.Create
        // XslCompiledTransformUtils.LoadFromPath 
    }



    internal static class IOFacade
    {
        public static IOProviderDirectory Directory
        {
            get
            {
                throw new NotImplementedException();
            }
        }



        // Overload
        public static IOProviderFileStream FileStream(string path, System.IO.FileMode mode)
        {
            return FileStream(path, mode, (mode == System.IO.FileMode.Append) ? System.IO.FileAccess.Write : System.IO.FileAccess.ReadWrite, System.IO.FileShare.Read);
        }


        // Overload
        public static IOProviderFileStream FileStream(string path, System.IO.FileMode mode, System.IO.FileAccess access)
        {
            return FileStream(path, mode, access, System.IO.FileShare.Read);
        
        }


        public static IOProviderFileStream FileStream(string path, System.IO.FileMode mode, System.IO.FileAccess access, System.IO.FileShare share)
        {
            throw new NotImplementedException();
        }
    }


#warning MRJ: Delete this class
    internal class MRJTest
    {
        private void Hans()
        {
            IOFacade.Directory.CreateDirectory("lkj");
        }
    }
}
