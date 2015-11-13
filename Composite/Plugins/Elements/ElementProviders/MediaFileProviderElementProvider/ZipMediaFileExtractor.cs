using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Transactions;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Data;
using Composite.Data.Transactions;
using Composite.Data.Types;


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
            if (string.IsNullOrEmpty(providerName)) throw new ArgumentNullException("providerName");
            if (string.IsNullOrEmpty(parentPath)) throw new ArgumentNullException("parentPath");

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
            return DataFacade.GetData<IMediaFile>().Any(x => x.FolderPath == file.FolderPath && x.FileName == file.FileName);
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
                            IMediaFile currentFile = DataFacade.GetData<IMediaFile>()
                                                    .First(x => x.FolderPath == file.FolderPath && x.FileName == file.FileName);
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

            using (var zipArchive = new ZipArchive(compressedStream))
            {
                foreach (var entry in zipArchive.Entries)
                {
                    if (entry.FullName.EndsWith("/"))
                    {
                        CreateFoldersRec(folders, parentPath, entry.Name);
                    }
                    else
                    {
                        var directory = entry.Name.GetDirectory('/');

                        var mediaFile = new WorkflowMediaFile();
                        int length = CopyZipData(entry.Open(), mediaFile);

                        mediaFile.FileName = Path.GetFileName(entry.Name);
                        mediaFile.Title = mediaFile.FileName.GetNameWithoutExtension();
                        mediaFile.FolderPath = parentPath.Combine(directory, '/');

                        mediaFile.CreationTime = DateTime.Now;
                        mediaFile.Culture = C1Console.Users.UserSettings.ActiveLocaleCultureInfo.Name;
                        mediaFile.LastWriteTime = DateTime.Now;
                        mediaFile.Length = length;
                        mediaFile.MimeType = MimeTypeInfo.GetCanonicalFromExtension(Path.GetExtension(entry.Name));

                        files.Add(mediaFile);

                        if (directory != "")
                        {
                            CreateFoldersRec(folders, parentPath, directory);
                        }
                    }
                }
            }

            folders = folders.Distinct(new FolderComparer()).Where(x => x.Path != string.Empty).OrderBy(x => x.Path.Length).ToList();
        }

        private static void CreateFoldersRec(IList<IMediaFileFolder> folders, string parentPath, string directoryEntryName)
        {
            do
            {
                CreateFolder(folders, parentPath, directoryEntryName);

                directoryEntryName = ReduceFolderPath(directoryEntryName);
            }
            while (directoryEntryName != null);
        }

        private static void CreateFolder(IList<IMediaFileFolder> folders, string parentPath, string directoryEntryName)
        {
            IMediaFileFolder folder = DataFacade.BuildNew<IMediaFileFolder>();
            folder.Title = directoryEntryName.GetFolderName('/');
            folder.Path = parentPath.Combine(directoryEntryName, '/');

            folders.Add(folder);
        }

        private static string ReduceFolderPath(string folderPath)
        {
            var offset = folderPath.LastIndexOf("/", folderPath.Length - 2, StringComparison.Ordinal);

            return (offset > 0) ? folderPath.Substring(0, offset) : null;
        }

        private static int CopyZipData(Stream from, WorkflowMediaFile mediaFile)
        {
            var fileSize = 0;

            using (var streamWriter = mediaFile.GetNewWriteStream())
            {
                var data = new byte[2048];
                while (true)
                {
                    var size = @from.Read(data, 0, data.Length);
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
