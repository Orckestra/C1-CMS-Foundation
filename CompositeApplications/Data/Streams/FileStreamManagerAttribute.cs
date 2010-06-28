using System;


namespace Composite.Data.Streams
{
    [AttributeUsage(AttributeTargets.Class, Inherited = true, AllowMultiple = false)]
    internal class FileStreamManagerAttribute : Attribute
    {
        private Type _fileStreamManagerType;


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