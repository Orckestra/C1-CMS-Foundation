using System.IO;

using Composite.Data;
using Composite.Data.Types;


namespace Composite.Data.Streams
{
    public enum FileChangeType
    {
        Undefined = 0,
        Modified,
        Renamed,
        Deleted
    }

    public delegate void OnFileChangedDelegate(string filePath, FileChangeType changeType);

    internal interface IFileStreamManager
    {
        Stream GetReadStream(IFile file);
        Stream GetNewWriteStream(IFile file);
        void SubscribeOnFileChanged(IFile file, OnFileChangedDelegate handler);
    }
}