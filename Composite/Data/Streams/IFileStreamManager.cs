using System.IO;
using Composite.Data.Types;


namespace Composite.Data.Streams
{
    /// <summary>
    /// Declare what type of change happened to a file.
    /// </summary>
    public enum FileChangeType
    {
        /// <exclude />
        Undefined = 0,

        /// <exclude />
        Modified = 1,

        /// <exclude />
        Renamed = 2,

        /// <exclude />
        Deleted = 3
    }


    /// <summary>
    /// Delegate used to signal changes to a file.
    /// </summary>
    public delegate void OnFileChangedDelegate(string filePath, FileChangeType changeType);


    /// <summary>
    /// Data Providers which expose <see cref="Composite.Data.Types.IFile"/> elements 
    /// (like <see cref="Composite.Data.Types.IMediaFile"/> for a custom Media File Provider) expose access to stream reads/writes by annotating 
    /// the class implementing <see cref="Composite.Data.Types.IFile"/> with the <see cref="FileStreamManagerAttribute"/> attribute, 
    /// passing the type of a <see cref="IFileStreamManager"/> as attribute parameter.
    /// Orckestra CMS will, via the attribute on the <see cref="Composite.Data.Types.IFile"/>, get the type responsible for stream reads/writes.
    /// 
    /// The class implementing this interface is expected to provide read/write access to the file store being introduced by a file oriented File Provider.
    /// </summary>
    /// <example>
    /// Here is an example of how to inform Orckestra CMS about IFileStreamManager
    /// <code>
    /// [FileStreamManager(typeof(MyFileStreamManager))]
    /// public abstract class SomeFile : IFile
    /// {
    ///    /// ....
    /// }
    /// </code>
    /// </example>
    public interface IFileStreamManager
    {
        /// <summary>
        /// Returns the stream for the given file, represented as IFile. The stream is for reading.
        /// </summary>
        /// <param name="file">The data element representing the file for which a read stream is desired.</param>
        /// <returns>Stream for reading</returns>
        Stream GetReadStream(IFile file);

        /// <summary>
        /// Returns the stream for the given file, represented as IFile. This may be a new file, in which case the file stream manager is expected to create the file.
        /// </summary>
        /// <param name="file">The data element representing the file for which a write stream is desired.</param>
        /// <returns>Stream for writing</returns>
        Stream GetNewWriteStream(IFile file);

        /// <summary>
        /// The provided handler should be invoked if the file, represented as IFile, changes in the concrete store this IFileStreamManager represents.
        /// </summary>
        /// <param name="file">The file to monitor for file changes</param>
        /// <param name="handler">The handler to be invoked on changes</param>
        void SubscribeOnFileChanged(IFile file, OnFileChangedDelegate handler);
    }
}
