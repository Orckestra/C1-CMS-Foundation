using Composite.Data.Types;


namespace Composite.Data.Plugins.DataProvider
{
    /// <summary>    
    /// This should be implemented by DataProviders that provies IFile data items.    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public interface IFileSystemDataProvider : IDataProvider
    {
        /// <summary>
        /// This method is called when the absolute file path needs validation.
        /// Only the data provider knows the base path, so its responsible for 
        /// creating the full absolute path from an IFile.
        /// </summary>
        /// <typeparam name="TFile">An IFile or an sub interface</typeparam>
        /// <param name="file">The IFile instance</param>
        /// <param name="errorMessage">Will contain the error message, if any</param>
        /// <returns>Returns false if something is wrong with the path and <paramref name="errorMessage"/> will contain the error message. Otherwice true.</returns>
        bool ValidatePath<TFile>(TFile file, out string errorMessage) where TFile : IFile;
    }
}
