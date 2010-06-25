using System;
using System.Collections.Generic;
using Composite.Collections.Generic;
using Composite.EventSystem;
using Composite.Logging;


namespace Composite.Data.Streams
{
    internal static class FileStreamManagerLocator
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static FileStreamManagerLocator()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IFileStreamManager GetFileStreamManager(Type fileType)
        {
            if (fileType == null) throw new ArgumentNullException("fileType");

            IFileStreamManager fileStreamManager;

            if (_resourceLocker.Resources.FileStreamManagerCache.TryGetValue(fileType, out fileStreamManager) == false)
            {
                using (_resourceLocker.ReadLocker)
                {
                    if (_resourceLocker.Resources.FileStreamManagerCache.TryGetValue(fileType, out fileStreamManager) == false)
                    {
                        object[] attributes = fileType.GetCustomAttributes(typeof (FileStreamManagerAttribute), true);

                        if (attributes.Length == 0) throw new InvalidOperationException(string.Format("The type '{0}' is missing the attribute '{1}'", fileType, typeof (FileStreamManagerAttribute)));
                        FileStreamManagerAttribute fileStreamManagerResolverAttribute = (FileStreamManagerAttribute) attributes[0];

                        Type fileStreamManagerType = fileStreamManagerResolverAttribute.FileStreamManagerResolverType;

                        if (fileStreamManagerType == null) throw new InvalidOperationException(string.Format("The constructor argument of '{0}' may not be null", typeof (FileStreamManagerAttribute)));
                        if (typeof (IFileStreamManager).IsAssignableFrom(fileStreamManagerType) == false) throw new InvalidOperationException( string.Format("The type '{0}' does not implement the interface '{1}'", fileStreamManagerType, typeof (IFileStreamManager)));

                        fileStreamManager = (IFileStreamManager) Activator.CreateInstance(fileStreamManagerType);

                        _resourceLocker.Resources.FileStreamManagerCache.Add(fileType, fileStreamManager);
                    }
                }
            }

            return fileStreamManager;
        }



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private sealed class Resources
        {
            public Hashtable<Type, IFileStreamManager> FileStreamManagerCache { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.FileStreamManagerCache = new Hashtable<Type, IFileStreamManager>();
            }
        }
    }
}