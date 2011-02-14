using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Transactions;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.Transactions;
using Composite.Data.Types;
using ICSharpCode.SharpZipLib.Zip;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ZipMediaFileExtractor
    {
        private static readonly TimeSpan extrationTimeout = TimeSpan.FromMinutes(15);


        /// <exclude />
        public static void AddZip(string providerName, string parentPath, Stream compressedStream, bool recreateDirStructure, bool overwrite)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (string.IsNullOrEmpty(parentPath) == true) throw new ArgumentNullException("parentPath");

            IList<IMediaFile> files;
            IList<IMediaFileFolder> folders;

            Extract(parentPath, compressedStream, out folders, out files);

            if (recreateDirStructure)
            {
                FolderComparer folderComparer = new FolderComparer();
                IEnumerable<IMediaFileFolder> currentDirs = DataFacade.GetData<IMediaFileFolder>().Where(x => x.Path.StartsWith(parentPath));
                IEnumerable<IMediaFileFolder> intersection = currentDirs.Intersect(folders, folderComparer);
                folders = folders.Except(intersection, folderComparer).ToList();

                DataFacade.AddNew<IMediaFileFolder>(folders, providerName);
                AddFiles(providerName, files, overwrite);
            }
            else
            {
                foreach (IMediaFile file in files)
                {
                    file.FolderPath = parentPath;
                }
                AddFiles(providerName, files, overwrite);
            }
        }



        private static bool Exists(IMediaFile file)
        {
            return (DataFacade.GetData<IMediaFile>().Where(x => x.FolderPath == file.FolderPath && x.FileName == file.FileName).FirstOrDefault() != null);
        }



        private static void AddFiles(string providerName, IEnumerable<IMediaFile> files, bool overwrite)
        {
            foreach (IMediaFile file in files)
            {
                using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope(extrationTimeout))
                {
                    EnsureFolderExistence(file.FolderPath);

                    if (overwrite)
                    {
                        if (Exists(file))
                        {
                            IMediaFile currentFile = DataFacade.GetData<IMediaFile>().Where(x => x.FolderPath == file.FolderPath && x.FileName == file.FileName).First();
                            using (Stream readStream = file.GetReadStream())
                            {
                                using (Stream writeStream = currentFile.GetNewWriteStream())
                                {
                                    readStream.CopyTo(writeStream);
                                }
                            }
                            DataFacade.Update(currentFile);
                        }
                        else
                        {
                            DataFacade.AddNew<IMediaFile>(file, providerName);
                        }
                    }
                    else
                    {
                        int counter = 0;
                        string extension = Path.GetExtension(file.FileName);
                        string name = file.FileName.GetNameWithoutExtension();
                        while (Exists(file))
                        {
                            counter++;
                            file.FileName = name + counter.ToString() + extension;
                        }
                        DataFacade.AddNew<IMediaFile>(file, providerName);
                    }

                    transactionScope.Complete();
                }
            }
        }



        private static void EnsureFolderExistence(string folderPath)
        {
            // TODO: Implement
        }



        private static void Extract(string parentPath, Stream compressedStream,
            out IList<IMediaFileFolder> folders, out IList<IMediaFile> files)
        {
            folders = new List<IMediaFileFolder>();
            files = new List<IMediaFile>();

            using (ZipInputStream zipInputStream = new ZipInputStream(compressedStream))
            {
                ZipEntry theEntry;
                while ((theEntry = zipInputStream.GetNextEntry()) != null)
                {
                    if (theEntry.IsDirectory)
                    {
                        IMediaFileFolder folder = DataFacade.BuildNew<IMediaFileFolder>();
                        folder.Title = theEntry.Name.GetFolderName('/');
                        folder.Path = parentPath.Combine(theEntry.Name, '/');
                        folders.Add(folder);
                    }
                    else
                    {
                        WorkflowMediaFile mediaFile = new WorkflowMediaFile();
                        int length = CopyZipData(zipInputStream, mediaFile);

                        mediaFile.FileName = Path.GetFileName(theEntry.Name);
                        mediaFile.Title = mediaFile.FileName.GetNameWithoutExtension();
                        mediaFile.FolderPath = parentPath.Combine(theEntry.Name.GetDirectory('/'), '/');

                        mediaFile.CreationTime = DateTime.Now;
                        mediaFile.Culture = C1Console.Users.UserSettings.CultureInfo.Name;
                        mediaFile.LastWriteTime = DateTime.Now;
                        mediaFile.Length = length;
                        mediaFile.MimeType = MimeTypeInfo.GetCanonicalFromExtension(Path.GetExtension(theEntry.Name));

                        files.Add(mediaFile);

                        if (theEntry.Name.GetDirectory('/') != "")
                        {
                            IMediaFileFolder folder = DataFacade.BuildNew<IMediaFileFolder>();
                            folder.Title = theEntry.Name.GetDirectory('/');
                            folder.Path = parentPath.Combine(theEntry.Name.GetDirectory('/'), '/');
                            folders.Add(folder);
                        }
                    }
                }
            }

            folders = folders.Distinct(new FolderComparer()).Where(x => x.Path != string.Empty).OrderBy(x => x.Path.Length).ToList();
        }



        private static int CopyZipData(Stream from, WorkflowMediaFile mediaFile)
        {
            int fileSize = 0;

            using (Stream streamWriter = mediaFile.GetNewWriteStream())
            {
                int size = 2048;
                byte[] data = new byte[2048];
                while (true)
                {
                    size = from.Read(data, 0, data.Length);
                    if (size > 0)
                    {
                        streamWriter.Write(data, 0, size);
                        fileSize += size;
                    }
                    else
                    {
                        break;
                    }
                }
            }

            return fileSize;
        }



        private class FolderComparer : IEqualityComparer<IMediaFileFolder>
        {
            public bool Equals(IMediaFileFolder x, IMediaFileFolder y)
            {
                return x.Path == y.Path;
            }

            public int GetHashCode(IMediaFileFolder obj)
            {
                return obj.Path.GetHashCode();
            }
        }
    }
}
