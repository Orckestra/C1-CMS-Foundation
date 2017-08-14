using System;
using System.Diagnostics;


namespace Composite.Core.Application
{
    /// <summary>
    /// This class provides system wide locking throughout all app domains for the given C1 installation. 
    /// It does lock lock between C1 installations if more than one runs on the same machine.
    /// </summary>
    internal static class AppDomainLocker
    {
        private static readonly SystemGlobalSemaphore _semaphore = new SystemGlobalSemaphore(EventWaitHandleId);
        private static int _numberOfLocksAcquired;
        private static readonly object _numberOfLocksAcquiredLock = new object();


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
        public static bool CurrentAppDomainHasLock => IsCurrentAppDomainLockingAppDomain();


        /// <summary>
        /// Acquires a system wide lock accross all app domains for the current C1 installation. 
        /// This call be called multiple times from the same thread.
        /// To release the lock, call <see cref="ReleaseLock"/>
        /// </summary>
        /// <param name="timeout">Acquire lock timeout in milliseconds.</param>
        /// <param name="verbose">If this is false, no logging will be done.</param>
        /// <returns>True if the lock was acquired.</returns>
        public static bool AcquireLock(int timeout = 30000, bool verbose = true)
        {
            if (RuntimeInformation.AppDomainLockingDisabled) return true;


            var appDomainId = AppDomain.CurrentDomain.Id;
            var processId = Process.GetCurrentProcess().Id;

            lock (_numberOfLocksAcquiredLock)
            {
                if (!IsCurrentAppDomainLockingAppDomain())
                {
                    if (verbose) Log.LogVerbose(_verboseLogEntryTitle,
                        $"The AppDomain '{appDomainId}', Process '{processId}': Are going to acquire the system wide lock with the key '{_semaphore.Id}'...");

                    bool entered = _semaphore.Enter(timeout);
                    
                    if (!entered)
                    {
                        string message = $"The AppDomain '{appDomainId}', Process '{processId}': Failed to acquire the system wide lock with the key '{_semaphore.Id}' within the timeout period of {timeout} ms!!!";
                        Log.LogWarning(_warningLogEntryTitle, message);
                        //throw new WaitHandleCannotBeOpenedException(message);
                        return false;
                    }


                    if (verbose) Log.LogVerbose(_verboseLogEntryTitle,
                        $"The AppDomain '{appDomainId}', Process '{processId}': Acquired the system wide lock with the key '{_semaphore.Id}'!");
                }
                else
                {
                    if (verbose) Log.LogVerbose(_verboseLogEntryTitle,
                        $"The AppDomain '{appDomainId}', Process '{processId}': Acquiring the lock that it is already holding the system wide lock with the key '{_semaphore.Id}' (Number of inner locks {_numberOfLocksAcquired + 1})");
                }

                _numberOfLocksAcquired++;

                return true;
            }
        }



        /// <summary>
        /// Releases the acquired system wide lock. 
        /// If the same thread has acquired the lock more than once, only the last call to this method
        /// from that thread will release the lock.         
        /// </summary>
        /// <param name="verbose"></param>
        /// <param name="forceRelease">If this is true, the lock will be released regardless if the current app domain has it or not.</param>
        /// <returns>If the lock was released</returns>
        public static bool ReleaseLock(bool verbose = true, bool forceRelease = false)
        {
            if (RuntimeInformation.AppDomainLockingDisabled) return true;

            var appDomainId = AppDomain.CurrentDomain.Id;
            var processId = Process.GetCurrentProcess().Id;

            lock (_numberOfLocksAcquiredLock)
            {
                if (!forceRelease && IsAllReleased())
                {
                    Log.LogWarning(_warningLogEntryTitle,
                        $"The AppDomain '{appDomainId}', Process '{processId}': Is trying to release a system wide lock with the key '{_semaphore.Id}' that it does not hold! Release ignored!");
                    return true;
                }

                if (forceRelease || IsLastReleaseForLockHoldingAppDomain())
                {
                    if (verbose) Log.LogVerbose(_verboseLogEntryTitle,
                        $"The AppDomain '{appDomainId}', Process '{processId}': Are going to release the system wide lock with the key '{_semaphore.Id}' (force: {forceRelease})...");

                    try
                    {
                        _semaphore.Leave();
                    }
                    catch(Exception)
                    {
                        return false;
                    }

                    if (verbose) Log.LogVerbose(_verboseLogEntryTitle,
                        $"The AppDomain '{appDomainId}', Process '{processId}': Released the system wide lock with the key '{_semaphore.Id}' (force: {forceRelease})...");
                }
                else
                {
                    if (verbose) Log.LogVerbose(_verboseLogEntryTitle,
                        $"The AppDomain '{appDomainId}', Process '{processId}': Releasing a lock it has aqruired more than once with the key '{_semaphore.Id}'. Lock not released. (Number of inner locks {_numberOfLocksAcquired - 1})");
                }

                if (!forceRelease) _numberOfLocksAcquired--;

                return true;
            }
        }
        



        /// <summary>
        /// Used to name the EventWaitHandle, making it a system wide EventWaitHandle
        /// </summary>
        private static string EventWaitHandleId => RuntimeInformation.UniqueInstanceName;


        /// <summary>
        /// Returns true if the current thread is the thread holding the lock
        /// </summary>
        /// <returns></returns>
        private static bool IsCurrentAppDomainLockingAppDomain() => _numberOfLocksAcquired > 0;



        /// <summary>
        /// Returns true if there will be no more releases for the lock holding thread.
        /// </summary>
        /// <returns></returns>
        private static bool IsLastReleaseForLockHoldingAppDomain() => _numberOfLocksAcquired == 1;



        /// <summary>
        /// Returns true if all locks have been released.
        /// </summary>
        /// <returns></returns>
        private static bool IsAllReleased() => _numberOfLocksAcquired == 0;



        /// <summary>
        /// Used for implementing the disposable pattern for <see cref="AppDomainLocker"/>
        /// </summary>
        private class DisposableLock : IDisposable
        {
            private bool _disposed;
            private readonly bool _verbose;

            public DisposableLock(bool verbose = true)
            {
                _verbose = verbose;
                AppDomainLocker.AcquireLock(verbose: _verbose);
            }


            public void Dispose()
            {
                Dispose(true);
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
            }



            void Dispose(bool disposing)
            {
                if (!disposing || _disposed) return;

                _disposed = true;

                AppDomainLocker.ReleaseLock(verbose: _verbose);
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
