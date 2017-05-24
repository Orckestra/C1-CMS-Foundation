using System;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Threading;
using Composite.Core.Configuration;
using Composite.Core.IO;


namespace Composite.Core.Application
{
    /// <summary>
    /// This class enables cross app domain/process locking using a file.
    /// </summary>
    [EditorBrowsable(EditorBrowsableState.Never)] 
    internal class GlobalFileLocker
    {
        private string Id { get; set; }
        private string GlobalLockFileName { get; set; }



        /// <summary>
        /// </summary>
        /// <param name="id">The id is used as part of a filename, so it should only contain file name valid chars.</param>
        /// <param name="folderPath">Default is temp directory.</param>
        public GlobalFileLocker(string id, string folderPath = null)
        {
            LockTimeOut = 5;

            if (folderPath == null)
            {
                folderPath = PathUtil.Resolve(GlobalSettingsFacade.TempDirectory);
            }

            Id = id;
            GlobalLockFileName = Path.Combine(folderPath, id + ".lock");
        }



        /// <summary>
        /// Time out in seconds. Default is 5 secounds.
        /// </summary>
        public int LockTimeOut { get; set; }



        /// <summary>
        /// </summary>
        public IDisposable Lock
        {
            get
            {
                return new DisposableLock(this);
            }
        }



        /// <summary>
        /// Consider using the <see cref="Lock"/> for better code safty
        /// </summary>
        /// <param name="retryCount"></param>
        /// <param name="thrownOnFail"></param>
        /// <returns></returns>
        public bool AquireLock(int retryCount = 50, bool thrownOnFail = false)
        {
            for (int i = 0; i < retryCount; i++)
            {
                bool lockObtained = TryAquireLock();
                if (lockObtained) return true;
                Thread.Sleep(0); // Context switch
            }

            string message = string.Format("Failed to obtain global file lock with id '{0}'", Id);
            Log.LogWarning("GlobalFileLocker", message);

            if (thrownOnFail) throw new InvalidOperationException(message);

            return false;
        }



        /// <summary>
        /// Consider using the <see cref="Lock"/> for better code safty
        /// </summary>
        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        public void ReleaseLock()
        {
            if (File.Exists(GlobalLockFileName))
            {
                try
                {
                    File.Delete(GlobalLockFileName);
                }
                catch (Exception ex)
                {
                    throw new InvalidOperationException("Two or more threads tried to release at the same time. Check AquireLock and ReleaseLock usage.", ex);
                }
            }
        }



        [SuppressMessage("Composite.IO", "Composite.DoNotUseFileClass:DoNotUseFileClass")]
        private bool TryAquireLock()
        {
            double existingLockFileAgeSeconds =
                File.Exists(GlobalLockFileName) ?
                (DateTime.Now - File.GetLastWriteTime(GlobalLockFileName)).TotalSeconds :
                -1; // Does not exist

            if (existingLockFileAgeSeconds > LockTimeOut)
            {
                File.Delete(GlobalLockFileName);
            }

            string tmpFileName = GlobalLockFileName + "." + Path.GetRandomFileName();
            File.WriteAllText(tmpFileName, "LOCK");

            try
            {
                // Assumption: This is a system wide atomar action. If one already has the lock, the Move will fail.
                File.Move(tmpFileName, GlobalLockFileName);
                return true;
            }
            catch (IOException)
            {
                File.Delete(tmpFileName);
            }

            return false;
        }



        /// <summary>
        /// Used for implementing the disposable pattern for <see cref="GlobalFileLocker"/>
        /// </summary>
        private class DisposableLock : IDisposable
        {
            private bool disposed = false;
            private GlobalFileLocker _globalFileLocker;


            public DisposableLock(GlobalFileLocker globalFileLocker)
            {
                _globalFileLocker = globalFileLocker;
                _globalFileLocker.AquireLock(thrownOnFail: true);
            }


            public void Dispose()
            {
                Dispose(true);
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
            }



            protected virtual void Dispose(bool disposing)
            {
                if (!disposing || disposed) return;

                disposed = true;

                _globalFileLocker.ReleaseLock();
            }


#if LeakCheck
            private string stack = Environment.StackTrace;
            ~DisposableLock()
            {
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
                Dispose(false);
            }
#endif
        }
    }
}
