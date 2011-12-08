using System;
using System.Threading;
using Composite.Core.Logging;
using Composite.Core.Types;
using System.Diagnostics;
using System.IO;
using Composite.Core.IO;


namespace Composite.Core.Application
{
#warning MRJ: REMOVE THIS CODE
    //internal static class DaMonkeyLogger
    //{
    //    static string _logFilePath;

    //    static DaMonkeyLogger()
    //    {
    //        _logFilePath = Path.Combine(PathUtil.BaseDirectory, "log.txt");
    //    }


    //    public static void AddEntry(string entry)
    //    {
    //        for (int i = 0; i < 100; i++)
    //        {
    //            try
    //            {
    //                File.AppendAllLines(_logFilePath, new[] { DateTime.Now.ToString("HH:mm:ss:ff") + ": " + entry });
    //                return;
    //            }
    //            catch (Exception)
    //            {
    //                Thread.Sleep(10);
    //            }
    //        }
    //    }
    //}

    /// <summary>
    /// This class provides system wide locking throughout all app domains for the given C1 installation. 
    /// It does lock lock between C1 installations if more than one runs on the same machine.
    /// </summary>
    internal static class AppDomainLocker
    {
        private static readonly SystemGlobalSemaphore _systemGlobalEventWaitHandle = new SystemGlobalSemaphore(EventWaitHandleId);
        private static int _numberOfLocksAquried = 0;
        private static readonly object _numberOfLocksAquriedLock = new object();


        private const string _verboseLogEntryTitle = "RGB(205, 92, 92)AppDomainLocker";
        private const string _warningLogEntryTitle = "AppDomainLocker";



        /// <summary>
        /// Returns an IDisposalbe and requires the lock. Disposing the IDisposable releases the lock.
        /// </summary>
        /// <param name="verbose">If this is true, verbose logging is done. Default is false</param>
        /// <example>
        /// <code>
        /// using (AppDomainLocker.NewLock)
        /// {
        ///     /* This code will only run in one app domain at any time */
        /// }
        /// </code>
        /// </example>
        public static IDisposable NewLock(bool verbose = false)
        {
            return new DisposableLock(verbose);
        }



        /// <summary>
        /// Returns true if the calling app domain has the lock.
        /// </summary>
        public static bool CurrentAppDomainHasLock
        {
            get
            {
                return IsCurrentAppDomainLockingAppDomain();
            }
        }



        /// <summary>
        /// Aquires a system wide lock accross all app domains for the current C1 installation. 
        /// This call be called multiple times from the same thread.
        /// To release the lock, call <see cref="ReleaseLock"/>
        /// </summary>
        /// <param name="timeout">Aquire lock timeout in milliseconds.</param>
        /// <param name="verbose">If this is false, no logging will be done.</param>
        public static void AquireLock(int timeout = 30000, bool verbose = true)
        {
            if (RuntimeInformation.AppDomainLockingDisabled) return;            

            lock (_numberOfLocksAquriedLock)
            {
                if (!IsCurrentAppDomainLockingAppDomain())
                {
                    if (verbose) Log.LogVerbose(_verboseLogEntryTitle, string.Format("The AppDomain '{0}', Process '{1}': Are going to aquire the system wide lock with the key '{2}'...", AppDomain.CurrentDomain.Id, Process.GetCurrentProcess().Id, _systemGlobalEventWaitHandle.Id));

                    bool entered = _systemGlobalEventWaitHandle.Enter(timeout);
                    
                    if (!entered)
                    {
                        string message = string.Format("The AppDomain '{0}', Process '{1}': Failed to aqruie the system wide lock with the key '{2}' within the timeout period of {3} ms!!!", AppDomain.CurrentDomain.Id, Process.GetCurrentProcess().Id, _systemGlobalEventWaitHandle.Id, timeout);
                        Log.LogWarning(_warningLogEntryTitle, message);
                        throw new WaitHandleCannotBeOpenedException(message);
                    }


                    if (verbose) Log.LogVerbose(_verboseLogEntryTitle, string.Format("The AppDomain '{0}', Process '{1}': Aquired the system wide lock with the key '{2}'!", AppDomain.CurrentDomain.Id, Process.GetCurrentProcess().Id, _systemGlobalEventWaitHandle.Id));
                }
                else
                {
                    if (verbose) Log.LogVerbose(_verboseLogEntryTitle, string.Format("The AppDomain '{0}', Process '{1}': Aquiring the lock that it is allready holding the system wide lock with the key '{2}' (Number of inner locks {3})", AppDomain.CurrentDomain.Id, Process.GetCurrentProcess().Id, _systemGlobalEventWaitHandle.Id, _numberOfLocksAquried + 1));
                }

                _numberOfLocksAquried++;
            }            
        }



        /// <summary>
        /// Releases the aquired system wide lock. 
        /// If the same thread has aqired the lock more than once, only the last call to this method
        /// from that thread will release the lock.         
        /// </summary>
        public static void ReleaseLock(bool verbose = true)
        {
            if (RuntimeInformation.AppDomainLockingDisabled) return;

            lock (_numberOfLocksAquriedLock)
            {
                if (IsAllReleased())
                {
                    Log.LogWarning(_warningLogEntryTitle, string.Format("The AppDomain '{0}', Process '{1}': Is trying to release a system wide lock with the key '{2}' that it does not hold! Release ignored!", AppDomain.CurrentDomain.Id, Process.GetCurrentProcess().Id, _systemGlobalEventWaitHandle.Id));
                    return;
                }
                else if (IsLastReleaseForLockHoldingAppDomain())
                {
                    if (verbose) Log.LogVerbose(_verboseLogEntryTitle, string.Format("The AppDomain '{0}', Process '{1}': Are going to release the system wide lock with the key '{2}'...", AppDomain.CurrentDomain.Id, Process.GetCurrentProcess().Id, _systemGlobalEventWaitHandle.Id));

                    _systemGlobalEventWaitHandle.Leave();

                    if (verbose) Log.LogVerbose(_verboseLogEntryTitle, string.Format("The AppDomain '{0}', Process '{1}': Released the system wide lock with the key '{2}'...", AppDomain.CurrentDomain.Id, Process.GetCurrentProcess().Id, _systemGlobalEventWaitHandle.Id));
                }
                else
                {
                    if (verbose) Log.LogVerbose(_verboseLogEntryTitle, string.Format("The AppDomain '{0}', Process '{1}': Releasing a lock it has aqruired more than once with the key '{2}'. Lock not released. (Number of inner locks {3})", AppDomain.CurrentDomain.Id, Process.GetCurrentProcess().Id, _systemGlobalEventWaitHandle.Id, _numberOfLocksAquried - 1));
                }

                _numberOfLocksAquried--;
            }
        }



        /// <summary>
        /// Used to name the EventWaitHandle, making it a system wide EventWaitHandle
        /// </summary>
        private static string EventWaitHandleId
        {
            get
            {
                return RuntimeInformation.UniqueInstanceName;
            }
        }



        /// <summary>
        /// Returns true if the current thread is the thread holding the lock
        /// </summary>
        /// <returns></returns>
        private static bool IsCurrentAppDomainLockingAppDomain()
        {
            return _numberOfLocksAquried > 0;
        }




        /// <summary>
        /// Returns true if there will be no more releases for the lock holding thread.
        /// </summary>
        /// <returns></returns>
        private static bool IsLastReleaseForLockHoldingAppDomain()
        {
            return _numberOfLocksAquried == 1;
        }



        /// <summary>
        /// Returns true if all locks have been released.
        /// </summary>
        /// <returns></returns>
        private static bool IsAllReleased()
        {
            return _numberOfLocksAquried == 0;
        }


        /// <summary>
        /// Used for implementing the disposable pattern for <see cref="AppDomainLocker"/>
        /// </summary>
        private class DisposableLock : IDisposable
        {
            private bool _disposed = false;
            private readonly bool _verbose;

            public DisposableLock(bool verbose = true)
            {
                _verbose = verbose;
                AppDomainLocker.AquireLock(verbose: _verbose);
            }


            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }



            protected virtual void Dispose(bool disposing)
            {
                if (!disposing || _disposed) return;

                _disposed = true;

                AppDomainLocker.ReleaseLock(verbose: _verbose);
            }



            ~DisposableLock()
            {
                Dispose(false);
            }
        }
    }
}
