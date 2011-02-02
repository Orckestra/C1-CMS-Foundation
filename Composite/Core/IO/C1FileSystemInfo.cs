using System;
using System.IO;
using System.Runtime.Serialization;


namespace Composite.Core.IO
{
    public abstract class C1FileSystemInfo
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract string FullName { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract string Extension { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract bool Exists { get; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract FileAttributes Attributes { get; set; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract void Delete();



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract DateTime CreationTime { get; set; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract DateTime CreationTimeUtc { get; set; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract DateTime LastAccessTime { get; set; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract DateTime LastAccessTimeUtc { get; set; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract DateTime LastWriteTime { get; set; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract DateTime LastWriteTimeUtc { get; set; }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract void GetObjectData(SerializationInfo info, StreamingContext context);



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public abstract void Refresh();
    }
}
