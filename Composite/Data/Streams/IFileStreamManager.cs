using System.IO;
using Composite.Data.Types;


namespace Composite.Data.Streams
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum FileChangeType
    {
        Undefined = 0,
        Modified,
        Renamed,
        Deleted
    }


    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public delegate void OnFileChangedDelegate(string filePath, FileChangeType changeType);



    internal interface IFileStreamManager
    {
        Stream GetReadStream(IFile file);
        Stream GetNewWriteStream(IFile file);
        void SubscribeOnFileChanged(IFile file, OnFileChangedDelegate handler);
    }
}