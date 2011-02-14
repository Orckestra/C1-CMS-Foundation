using System;


namespace Composite.Data.Streams
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    public class FileStreamManagerAttribute : Attribute
    {
        private Type _fileStreamManagerType;


        /// <exclude />
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