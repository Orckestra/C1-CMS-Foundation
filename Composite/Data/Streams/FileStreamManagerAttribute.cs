using System;


namespace Composite.Data.Streams
{
    /// <summary>
    /// Expected on <see cref="Composite.Data.Types.IFile"/> classes to identify what <see cref="IFileStreamManager"/> can provide read/write and monitoring access to files.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    public class FileStreamManagerAttribute : Attribute
    {
        private Type _fileStreamManagerType;


        /// <summary>
        /// Identify the <see cref="IFileStreamManager"/> that provide read/write and monitoring access to the file represented by the <see cref="Composite.Data.Types.IFile"/> this 
        /// <see cref="FileStreamManagerAttribute"/> is attached to.
        /// </summary>
        /// <param name="fileStreamManagerType">the type of the class implementing <see cref="IFileStreamManager"/> for this file.</param>
        public FileStreamManagerAttribute(Type fileStreamManagerType)
        {
            _fileStreamManagerType = fileStreamManagerType;
        }


        internal Type FileStreamManagerResolverType
        {
            get { return _fileStreamManagerType; }
        }
    }
}