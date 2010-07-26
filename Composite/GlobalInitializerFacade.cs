using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Principal;
using System.Threading;
using Composite.Actions;
using Composite.Collections.Generic;
using Composite.ConsoleEventSystem;
using Composite.Data.Caching;
using Composite.Data.Foundation;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.EventSystem;
using Composite.Extensions;
using Composite.Functions.Foundation;
using Composite.GlobalSettings;
using Composite.IO;
using Composite.Logging;
using Composite.PackageSystem;
using Composite.Security;
using Composite.Workflow;
using Composite.Threading;
using Composite.Data;
using Composite.Data.Types;
using Composite.Trees;


namespace Composite
{
    public static class GlobalInitializerFacade
    {
        private static readonly string LogTitle = "RGB(194, 252, 131)GlobalInitializerFacade";

        private static bool _coreInitialized = false;
        private static bool _initializing = false;
        private static bool _typesAutoUpdated = false;
        private static Exception _exceptionThrownDurringInitialization = null;
        private static int _fatalErrorFlushCount = 0;
        private static ReaderWriterLock _readerWriterLock = new ReaderWriterLock();
        private static Thread _hookingFacadeThread = null; // This is used to wait on the the thread if a reinitialize is issued
        private static Exception _hookingFacadeException = null; // This will hold the exception from the before the reinitialize was issued

        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitializeResources);


        private sealed class Resources
        {
            public Dictionary<int, int> WriterLocksPerThreadId { get; set; }
            public Dictionary<int, LockCookie> LockCockiesPreThreadId { get; set; }

            public static void DoInitializeResources(Resources resources)
            {
                resources.WriterLocksPerThreadId = new Dictionary<int, int>();
                resources.LockCockiesPreThreadId = new Dictionary<int, LockCookie>();
            }
        }

        private class TimeMeasurement : IDisposable
        {
            private string _message;
            private int _startTime;

            public TimeMeasurement(string message)
            {
                _message = message;
                _startTime = Environment.TickCount;
                LoggingService.LogVerbose(LogTitle, "Starting: " + _message);
            }


            #region IDisposable Members

            public void Dispose()
            {
                int executionTime = Environment.TickCount - _startTime;
                LoggingService.LogVerbose(LogTitle, "Finished: " + _message + " ({0} ms)".FormatWith(executionTime));
            }

            #endregion
        }


        static GlobalInitializerFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        /// <summary>
        /// This method will initialize the system (if it has not been initialized).
        /// </summary>
        public static void InitializeTheSystem()
        {
            if (_exceptionThrownDurringInitialization != null)
            {
                throw _exceptionThrownDurringInitialization;
            }

            if ((_initializing == false) && (_coreInitialized == false))
            {
                using (GlobalInitializerFacade.CoreLockScope)
                {
                    if ((_initializing == false) && (_coreInitialized == false))
                    {
                        try
                        {
                            _initializing = true;

                            using(ThreadDataManager.EnsureInitialize())
                            {
                                DoInitialize();
                            }

                            _fatalErrorFlushCount = 0;
                        }
                        catch (Exception ex)
                        {
                            _exceptionThrownDurringInitialization = ex;
                            throw;
                        }
                        finally
                        {
                            _coreInitialized = true;
                            _initializing = false;
                        }
                    }
                }
            }
        }



        /// <summary>
        /// Using this in a using-statement will ensure that the code are 
        /// executed AFTER the system has been initialized.
        /// </summary>
        public static IDisposable CoreIsInitializedScope
        {
            get
            {
                // This line ensures that the system is always initialized. 
                // Even if the InitializeTheSystem method is NOT called durring
                // application startup.
                InitializeTheSystem();

                return new LockerToken();
            }
        }



        /// <summary>
        /// Using this in a using-statement will ensure that the code is 
        /// executed AFTER any existing locks has been released.
        /// </summary>
        public static IDisposable CoreNotLockedScope
        {
            get
            {
                return new LockerToken();
            }
        }



        public static void WaitUntilAllIsInitialized()
        {
            using (CoreIsInitializedScope)
            {
                Thread hookingFacadeThread = _hookingFacadeThread;
                if (hookingFacadeThread != null)
                {
                    hookingFacadeThread.Join();
                }
            }
        }



        /// <summary>
        /// Locks the initialization token untill disposed. Use this in a using {} statement. 
        /// </summary>
        internal static IDisposable CoreLockScope
        {
            get
            {
                StackTrace stackTrace = new StackTrace();
                StackFrame stackFrame = stackTrace.GetFrame(1);
                string lockSource = string.Format("{0}.{1}", stackFrame.GetMethod().DeclaringType.Name, stackFrame.GetMethod().Name);
                return new LockerToken(true, lockSource);
            }
        }



        public static void FatalResetTheSytem()
        {
            LoggingService.LogWarning(LogTitle, "Unhandled error occured, reinitializing the system!");

            ReinitializeTheSystem(delegate() { _fatalErrorFlushCount++; GlobalEventSystemFacade.FlushTheSystem(); });
        }

        public static void ReinitializeTheSystem(RunInWriterLockScopeDelegage runInWriterLockScopeDelegage)
        {
            ReinitializeTheSystem(runInWriterLockScopeDelegage, false);
        }


        internal static void ReinitializeTheSystem(RunInWriterLockScopeDelegage runInWriterLockScopeDelegage, bool initializeHooksInTheSameThread)
        {
            if (_hookingFacadeThread != null)
            {
                _hookingFacadeThread.Join(TimeSpan.FromSeconds(30));
                if (_hookingFacadeException != null)
                {
                    //LoggingService.LogCritical("GlobalInitializerFacade", _hookingFacadeException);
                    throw new InvalidOperationException("The initilization of the HookingFacade failed before this reinitialization was issued", _hookingFacadeException);
                }
            }

            using (GlobalInitializerFacade.CoreLockScope)
            {
                runInWriterLockScopeDelegage();

                _coreInitialized = false;
                _initializing = false;
                _exceptionThrownDurringInitialization = null;

                // TODO: Check why 1 flush is acceptable here
                Verify.That(_fatalErrorFlushCount <= 1, "Failed to reload the system. See the log for the details.");

                InitializeTheSystem();

                // Updating "hooks" either in the same thread, or in another
                if (initializeHooksInTheSameThread)
                {
                    object threadStartParameter = new KeyValuePair<TimeSpan, StackTrace>(TimeSpan.Zero, new StackTrace());
                    EnsureHookingFacade(threadStartParameter);
                }
                else
                {
                    _hookingFacadeThread = new Thread(EnsureHookingFacade);
                    _hookingFacadeThread.Start(new KeyValuePair<TimeSpan, StackTrace>(TimeSpan.FromSeconds(1), new StackTrace()));
                }
            }
        }



        public static void UninitializeTheSystem(RunInWriterLockScopeDelegage runInWriterLockScopeDelegage)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                using (new TimeMeasurement("Uninitializing the system"))
                {
                    runInWriterLockScopeDelegage();
                }

                _coreInitialized = false;
                _initializing = false;
                _exceptionThrownDurringInitialization = null;
            }
        }



        public delegate void RunInWriterLockScopeDelegage();
        public static void RunInWriterLockScope(RunInWriterLockScopeDelegage runInWriterLockScopeDelegage)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                runInWriterLockScopeDelegage();
            }
        }



        public static void ValidateIsOnlyCalledFromGlobalInitializerFacade(StackTrace stackTrace)
        {
            MethodBase methodInfo = stackTrace.GetFrame(1).GetMethod();

            if (methodInfo.DeclaringType != typeof(GlobalInitializerFacade))
            {
                throw new SystemException(string.Format("The method {0} may only be called by the {1}", stackTrace.GetFrame(1).GetMethod(), typeof(GlobalInitializerFacade)));
            }
        }



        public static bool DynamicTypesGenerated { get; private set; }
        public static bool SystemCoreInitialized { get { return _coreInitialized; } }



        private static void DoAutoInstallPackages()
        {
            try
            {
                // This is not so good, unittests run and normal runs should have same semantic behavior.
                // But if this is not here, some unittests will start failing. /MRJ
                if (RuntimeInformation.IsUnittest == true) return;

                List<KeyValuePair<bool, string>> zipFilenames = new List<KeyValuePair<bool, string>>();

                string directory = PathUtil.Resolve(GlobalSettingsFacade.AutoPackageInstallDirectory);
                if (Directory.Exists(directory) == true)
                {
                    LoggingService.LogVerbose("GlobalInitializerFacade", string.Format("Installing packages from: {0}", directory));
                    zipFilenames.AddRange(Directory.GetFiles(directory, "*.zip").Select(f => new KeyValuePair<bool, string>(true, f)));
                }
                else
                {
                    LoggingService.LogVerbose("GlobalInitializerFacade", string.Format("Auto install directory not found: {0}", directory));
                }

                if (RuntimeInformation.IsDebugBuild == true)
                {
                    string workflowTestDir = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.AutoPackageInstallDirectory), "WorkflowTesting");
                    if (Directory.Exists(workflowTestDir))
                    {
                        LoggingService.LogVerbose("GlobalInitializerFacade", string.Format("Installing packages from: {0}", workflowTestDir));
                        zipFilenames.AddRange(Directory.GetFiles(workflowTestDir, "*.zip").OrderBy(f => f).Select(f => new KeyValuePair<bool, string>(false, f)));                        
                    }                    
                }


                foreach (var kvp in zipFilenames)
                {
                    try
                    {
                        using (Stream zipFileStream = File.OpenRead(kvp.Value))
                        {
                            // TODO: Log validation messages
                            PackageManagerInstallProcess packageManagerInstallProcess = PackageManager.Install(zipFileStream, true);


                            if (packageManagerInstallProcess.PreInstallValidationResult.Count > 0)
                            {
                                LoggingService.LogError("GlobalInitializerFacade", "Package installation failed!");

                                foreach (PackageFragmentValidationResult preValidationResult in packageManagerInstallProcess.PreInstallValidationResult)
                                {
                                    LoggingService.LogError("GlobalInitializerFacade", preValidationResult.Message);
                                    if (preValidationResult.Exception != null)
                                    {
                                        LoggingService.LogError("GlobalInitializerFacade", "With following exception:");
                                        LoggingService.LogError("GlobalInitializerFacade", preValidationResult.Exception);
                                    }
                                }
                                continue;
                            }


                            List<PackageFragmentValidationResult> validationResults = packageManagerInstallProcess.Validate();
                            if (validationResults.Count > 0)
                            {
                                LoggingService.LogError("GlobalInitializerFacade", "Package installation failed!");

                                foreach (PackageFragmentValidationResult validationResult in validationResults)
                                {
                                    LoggingService.LogError("GlobalInitializerFacade", validationResult.Message);
                                    if (validationResult.Exception != null)
                                    {
                                        LoggingService.LogError("GlobalInitializerFacade", "With following exception:");
                                        LoggingService.LogError("GlobalInitializerFacade", validationResult.Exception);
                                    }
                                }
                                continue;
                            }

                            
                            List<PackageFragmentValidationResult> installResult = packageManagerInstallProcess.Install();
                            if (installResult.Count > 0)
                            {
                                LoggingService.LogError("GlobalInitializerFacade", "Package installation failed!");

                                foreach (PackageFragmentValidationResult packageFragmentValidationResult in installResult)
                                {
                                    LoggingService.LogError("GlobalInitializerFacade", packageFragmentValidationResult.Message);
                                    if (packageFragmentValidationResult.Exception != null)
                                    {
                                        LoggingService.LogError("GlobalInitializerFacade", "With following exception:");
                                        LoggingService.LogError("GlobalInitializerFacade", packageFragmentValidationResult.Exception);
                                    }
                                }

                                continue;
                            }                            
                        }
                    }
                    catch (Exception ex)
                    {
                        LoggingService.LogWarning("GlobalInitializerFacade", ex);
                    }

                    if (kvp.Key == true)
                    {
                        FileEx.Delete(kvp.Value);
                    }
                }
            }
            catch (Exception ex)
            {
                LoggingService.LogError("GlobalInitializerFacade", ex);
            }
        }



        private static void DoInitialize()
        {
            bool flushNeeded;

            int startTime = Environment.TickCount;

            LoggingService.LogVerbose(LogTitle, "Initializing the system core");

            using (new TimeMeasurement("Initialization of the static data types"))
            {
                DataProviderRegistry.Initialize_StaticTypes();
            }

            using (new TimeMeasurement("Auto update of static data types"))
            {
                flushNeeded = AutoUpdateStaticDataTypes();
            }

            if (flushNeeded)
            {
                LoggingService.LogVerbose(LogTitle, "Initialization of the system was halted, performing a flush");
                _initializing = false;
                GlobalEventSystemFacade.FlushTheSystem();
                return;
            }

            using (new TimeMeasurement("Ensure data stores"))
            {
                flushNeeded = DataStoreExistenceVerifier.EnsureDataStores();
            }

            if (flushNeeded)
            {
                LoggingService.LogVerbose(LogTitle, "Initialization of the system was halted, performing a flush");
                _initializing = false;
                GlobalEventSystemFacade.FlushTheSystem();
                return;
            }

            using (new TimeMeasurement("Compilation of the dynamic data types"))
            {
                GeneratedTypesFacade.GenerateTypes();
            }

            DynamicTypesGenerated = true;

            using (new TimeMeasurement("Initialization of the dynamic data types"))
            {
                DataProviderRegistry.Initialize_DynamicTypes();
            }

            using (new TimeMeasurement("Initializing functions"))
            {
                MetaFunctionProviderRegistry.Initialize_PostStaticTypes();
            }

            Initialize_PostDynamicTypes();


            LoggingService.LogVerbose(LogTitle, "Starting initialization of administrative secondaries");

            using (new TimeMeasurement("Initializing workflow runtime"))
            {
                WorkflowFacade.EnsureInitialization();
            }

            if (!RuntimeInformation.IsUnittest)
            {
                using (new TimeMeasurement("Initializing flow system"))
                {
                    FlowControllerFacade.Initialize();
                }

                using (new TimeMeasurement("Initializing console system"))
                {
                    ConsoleFacade.Initialize();
                }
            }


            using (new TimeMeasurement("Initializing tree system"))
            {
                TreeFacade.Initialize();
            }


            using (new TimeMeasurement("Auto installing packages"))
            {
                DoAutoInstallPackages();
            }


            //MRJ: DevelopConfig: This should be moved to a develop config file
            /*if ((RuntimeInformation.IsDebugBuild == true) && (DataFacade.GetData<IWhiteListedLocale>().Count() == 0))
            {
                IWhiteListedLocale whiteListedLocale = DataFacade.BuildNew<IWhiteListedLocale>();
                whiteListedLocale.CultureName = "en-AU";
                DataFacade.AddNew<IWhiteListedLocale>(whiteListedLocale);
            }*/


            int executionTime = Environment.TickCount - startTime;

            LoggingService.LogVerbose(LogTitle, "Done initializing of the system core. ({0} ms)".FormatWith(executionTime));
        }



        private static void EnsureHookingFacade(object timeSpanToDelayStart)
        {
            // NOTE: Condition is  made for unit-testing
            if (System.Web.Hosting.HostingEnvironment.IsHosted)
            {
                var kvp = (KeyValuePair<TimeSpan, StackTrace>) timeSpanToDelayStart;
                _hookingFacadeException = null;

                Thread.Sleep(kvp.Key);

                try
                {
                    using(ThreadDataManager.EnsureInitialize())
                    {
                        HookingFacade.EnsureInitialization();
                    }
                }
                catch (Exception ex)
                {
                    _hookingFacadeException = ex;
                }
            }

            _hookingFacadeThread = null;
        }



        //private static void EnsureWorkflowFacade(object timeSpanToDelayStart)
        //{
        //    Thread.Sleep((TimeSpan)timeSpanToDelayStart);
        //    WorkflowFacade.EnsureInitialization();
        //}



        private static bool AutoUpdateStaticDataTypes()
        {
            if (!GlobalSettingsFacade.EnableDataTypesAutoUpdate)
            {
                return false;
            }

            if (_typesAutoUpdated)
            {
                // This is here to catch update -> failed -> update -> failed -> ... loop
                DataInterfaceAutoUpdater.TestEnsureUpdateAllInterfaces();
                return false;
            }

            bool flushTheSystem = DataInterfaceAutoUpdater.EnsureUpdateAllInterfaces();

            _typesAutoUpdated = true;

            return flushTheSystem;
        }

        private static void Initialize_PostDynamicTypes()
        {
            // Flush the system, so no old generated types exists in the cache
            DataCachingFacade.Flush();

            using (new TimeMeasurement("Initializing data process controllers"))
            {
                ProcessControllerFacade.Initialize_PostDynamic();
            }

            using (new TimeMeasurement("Initializing data type references"))
            {
                DataReferenceRegistry.Initialize_PostDynamic();
            }

            using (new TimeMeasurement("Initializing data type associations"))
            {
                DataAssociationRegistry.Initialize_PostDynamic();
            }

            using (new TimeMeasurement("Initializing functions (dynamic data type only)"))
            {
                MetaFunctionProviderRegistry.Initialize_PostDynamicTypes();
            }
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                _coreInitialized = false;
            }
        }



        private static void AcquireReaderLock()
        {
            _readerWriterLock.AcquireReaderLock(GlobalSettingsFacade.DefaultReaderLockWaitTimeout);
        }



        private static void AcquireWriterLock()
        {
            int threadId = Thread.CurrentThread.ManagedThreadId;


            using (_resourceLocker.Locker)
            {
                AppDomainLocker.EnsureLock(GlobalSettingsFacade.DefaultWriterLockWaitTimeout);

                if (_readerWriterLock.IsReaderLockHeld == true)
                {
                    LockCookie lockCookie = _readerWriterLock.UpgradeToWriterLock(GlobalSettingsFacade.DefaultWriterLockWaitTimeout);

                    _resourceLocker.Resources.LockCockiesPreThreadId.Add(threadId, lockCookie);
                }
                else
                {
                    _readerWriterLock.AcquireWriterLock(GlobalSettingsFacade.DefaultWriterLockWaitTimeout);
                }

                if (_resourceLocker.Resources.WriterLocksPerThreadId.ContainsKey(threadId) == true)
                {
                    _resourceLocker.Resources.WriterLocksPerThreadId[threadId] = _resourceLocker.Resources.WriterLocksPerThreadId[threadId] + 1;
                }
                else
                {
                    _resourceLocker.Resources.WriterLocksPerThreadId.Add(threadId, 1);
                }
            }
        }


        private static void ReleaseReaderLock()
        {
            _readerWriterLock.ReleaseReaderLock();
        }


        private static void ReleaseWriterLock()
        {
            int threadId = Thread.CurrentThread.ManagedThreadId;

            using (_resourceLocker.Locker)
            {
                if ((_resourceLocker.Resources.WriterLocksPerThreadId[threadId] == 1) &&
                    (_resourceLocker.Resources.LockCockiesPreThreadId.ContainsKey(threadId) == true))
                {
                    LockCookie lockCookie = _resourceLocker.Resources.LockCockiesPreThreadId[threadId];

                    _resourceLocker.Resources.LockCockiesPreThreadId.Remove(threadId);

                    _readerWriterLock.DowngradeFromWriterLock(ref lockCookie);
                }
                else
                {
                    _readerWriterLock.ReleaseWriterLock();
                }


                _resourceLocker.Resources.WriterLocksPerThreadId[threadId] = _resourceLocker.Resources.WriterLocksPerThreadId[threadId] - 1;

                if (_resourceLocker.Resources.WriterLocksPerThreadId[threadId] == 0)
                {
                    AppDomainLocker.ReleaseAnyLock();
                    _resourceLocker.Resources.WriterLocksPerThreadId.Remove(threadId);
                }
            }
        }


        private sealed class LockerToken : IDisposable
        {
            private readonly bool _isWriterLock;
            private readonly string _lockSource;

            /// <summary>
            /// Creates a read lock
            /// </summary>
            internal LockerToken()
                : this(false, null)
            {
            }

            internal LockerToken(bool writerLock, string lockSource)
            {
                _isWriterLock = writerLock;
                _lockSource = lockSource;

                if (!writerLock)
                {
                    AcquireReaderLock();
                    return;
                }

                Verify.ArgumentCondition(!lockSource.IsNullOrEmpty(), "lockSource", "Write locks must be obtained with a string identifying the source");

                #region Logging the action

                string methodInfo = string.Empty;
                if (RuntimeInformation.IsUnittest)
                {
                    var stackTrace = new StackTrace();

                    StackFrame stackFrame =
                        (from sf in stackTrace.AsQueryable()
                         where sf.GetMethod().DeclaringType.Assembly.FullName.Contains("Composite.Test")
                         select sf).FirstOrDefault();

                    if (stackFrame != null)
                    {
                        methodInfo = ", Method:" + stackFrame.GetMethod().Name;
                    }
                }
                LoggingService.LogVerbose(LogTitle, "Writer Lock Acquired (Managed Thread ID: {0}, Source: {1}{2})".FormatWith(Thread.CurrentThread.ManagedThreadId, lockSource, methodInfo));

                #endregion Logging the action

                AcquireWriterLock();
            }



            public void Dispose()
            {
                if (!_isWriterLock)
                {
                    ReleaseReaderLock();
                    return;
                }

                #region Logging the action

                string methodInfo = string.Empty;
                if (RuntimeInformation.IsUnittest)
                {
                    var stackTrace = new StackTrace();

                    StackFrame stackFrame =
                        (from sf in stackTrace.AsQueryable()
                         where sf.GetMethod().DeclaringType.Assembly.FullName.Contains("Composite.Test")
                         select sf).FirstOrDefault();


                    if (stackFrame != null)
                    {
                        methodInfo = ", Method: " + stackFrame.GetMethod().Name;
                    }
                }
                LoggingService.LogVerbose(LogTitle, "Writer Lock Releasing (Managed Thread ID: {0}, Source: {1}{2})".FormatWith(Thread.CurrentThread.ManagedThreadId, _lockSource, methodInfo));

                #endregion

                ReleaseWriterLock();
            }
        }
    }
}
