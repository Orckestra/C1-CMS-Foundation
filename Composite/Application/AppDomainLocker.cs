using System;
using System.Threading;
using Composite.Logging;


namespace Composite.Application
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class AppDomainLocker
    {
        private static EventWaitHandle _eventWaitHandle = null;
        private static string _appDomainLockKey;
        private static bool _gotSignaled = false;
        private static object _lock = new object();

        private const string _verboseLogEntryTitle = "RGB(205, 92, 92)AppDomainLocker";
        private const string _warningLogEntryTitle = "AppDomainLocker";



        /// <summary>
        /// Releases the OS wide lock on the applications file directory if it were aquired.
        /// </summary>
        public static void ReleaseAnyLock()
        {
            if (RuntimeInformation.AppDomainLockingDisabled) return;

            lock (_lock)
            {
                if (_gotSignaled == true)
                {
                    _eventWaitHandle.Set();
                    _eventWaitHandle.Close();
                    LoggingService.LogVerbose(_verboseLogEntryTitle, string.Format("The AppDomain ({0}) has unlocked for other AppDomains on key '{1}'", AppDomain.CurrentDomain.Id, _appDomainLockKey));
                }
                _eventWaitHandle = null;
                _gotSignaled = false;
            }
        }



        /// <summary>
        /// Returns true if a valid lock has been aquired
        /// </summary>
        public static bool HasValidLock
        {
            get
            {
                if (RuntimeInformation.AppDomainLockingDisabled) return true;

                lock (_lock)
                {
                    return _gotSignaled == true;
                }
            }
        }


        /// <summary>
        /// Ensures that a valid lock has been aquired. 
        /// If a lock could not be aqquired within the specified timeout period, WaitHandleCannotBeOpenedException is thrown. 
        /// </summary>
        /// <param name="timeoutPeriod">maximum time to wait</param>
        public static void EnsureLock(TimeSpan timeoutPeriod)
        {
            if (RuntimeInformation.AppDomainLockingDisabled) return;

            lock (_lock)
            {
                if (AppDomainLocker.HasValidLock == false)
                {
                    if (AppDomainLocker.TryLock(timeoutPeriod) == false)
                    {
                        LoggingService.LogWarning(_warningLogEntryTitle, string.Format("The AppDomain ({0}) failed to obtain a mandatory lock on other AppDomains on key '{1}'", AppDomain.CurrentDomain.Id, _appDomainLockKey));
                        throw new WaitHandleCannotBeOpenedException("Could not ensure a global resource lock within the specified timeout period.");
                    }
                }
            }
        }





        /// <summary>
        /// Tries to aquire a OS wide lock on the applications file directory. 
        /// </summary>
        /// <param name="maxWaitTime">Maximum period of time to wait for a lock</param>
        /// <returns>True if the lock was aquired</returns>
        private static bool TryLock(TimeSpan maxWaitTime)
        {
            if (RuntimeInformation.AppDomainLockingDisabled) return true;

            lock (_lock)
            {
                if (AppDomainLocker.HasValidLock == true) return true;

                bool isNewHandle;

                _appDomainLockKey = RuntimeInformation.UniqueInstanceNameSafe;
                _eventWaitHandle = new EventWaitHandle(false, EventResetMode.AutoReset, _appDomainLockKey, out isNewHandle);

                if (isNewHandle == true)
                {
                    _eventWaitHandle.Set();
                }
                else
                {
                    LoggingService.LogVerbose(_verboseLogEntryTitle, string.Format("The AppDomain ({0}) detected existing handle will now wait ({1}ms max) for other AppDomains to unlock on key '{2}'", AppDomain.CurrentDomain.Id, maxWaitTime.TotalMilliseconds, _appDomainLockKey));
                }

                _gotSignaled = _eventWaitHandle.WaitOne(maxWaitTime, false);

                if (_gotSignaled == false)
                {
                    LoggingService.LogWarning(_warningLogEntryTitle, string.Format("The AppDomain ({0}) has stopped waiting for signal on key '{1}'. Continuing without syncronization...", AppDomain.CurrentDomain.Id, _appDomainLockKey));
                }
                else
                {
                    LoggingService.LogVerbose(_verboseLogEntryTitle, string.Format("The AppDomain ({0}) has locked for other AppDomains on key '{1}'", AppDomain.CurrentDomain.Id, _appDomainLockKey));
                }

                return _gotSignaled;
            }
        }



       /* private static string LockKey
        {
            get
            {
                string baseString = PathUtil.BaseDirectory.ToLower().Replace(@"\", "-").Replace("/", "-");
                return string.Format("C1@{0}", PathUtil.CleanFileName(baseString));
            }
        }*/




    }
}
