using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Web;
using System.Web.Hosting;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Instrumentation;
using Composite.Core.Logging;
using Composite.Core.PackageSystem;
using Composite.Core.Routing;
using Composite.Core.Threading;
using Composite.Core.Types;
using Composite.Data.Foundation;
using Composite.Data.ProcessControlled;
using Composite.Functions.Foundation;
using Composite.C1Console.Elements.Foundation;
using Composite.Data.Foundation.PluginFacades;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql;


namespace Composite
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class GlobalInitializerFacade
    {
        private static readonly string LogTitle = "RGB(194, 252, 131)GlobalInitializerFacade";
        private static readonly string LogTitleNormal = "GlobalInitializerFacade";

        private static bool _coreInitialized;
        private static bool _initializing;
        private static bool _typesAutoUpdated;
        private static bool _unhandledExceptionLoggingInitialized;
        private static bool _preInitHandlersRunning;
        private static Exception _exceptionThrownDuringInitialization;
        private static DateTime _exceptionThrownDuringInitializationTimeStamp;
        private static int _fatalErrorFlushCount = 0;
        private static readonly ReaderWriterLock _readerWriterLock = new ReaderWriterLock();
        private static Thread _hookingFacadeThread; // This is used to wait on the the thread if a reinitialize is issued
        private static Exception _hookingFacadeException; // This will hold the exception from the before the reinitialize was issued

        private static readonly ThreadLockingInformation _threadLocking = new ThreadLockingInformation();


        /// <exclude />
        public static bool DynamicTypesGenerated { get; private set; }

        /// <exclude />
        public static bool SystemCoreInitializing { get { return _initializing; } }

        /// <exclude />
        public static bool SystemCoreInitialized { get { return _coreInitialized; } }

        /// <summary>
        /// This is true during a total flush of the system (re-initialize).
        /// </summary>
        public static bool IsReinitializingTheSystem { get; private set; }



        static GlobalInitializerFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        /// <summary>
        /// This method will initialize the system (if it has not been initialized).
        /// </summary>
        public static void EnsureSystemIsInitialized()
        {
            InitializeTheSystem();
        }



        /// <summary>
        /// This method will initialize the system (if it has not been initialized).
        /// </summary>
        public static void InitializeTheSystem()
        {
            Verify.That(!_preInitHandlersRunning, "DataFacade related methods should not be called in OnBeforeInitialize() method of a startup handler. Please move the code to OnInitialized() instead.");

            // if (AppDomain.CurrentDomain.Id == 3) SimpleDebug.AddEntry(string.Format("INITIALIZING {0} {1} {2}", Thread.CurrentThread.ManagedThreadId, _initializing, _coreInitialized));
            

            if (_exceptionThrownDuringInitialization != null)
            {
                TimeSpan timeSpan = DateTime.Now - _exceptionThrownDuringInitializationTimeStamp;
                if (timeSpan < TimeSpan.FromMinutes(5.0))
                {
                    Log.LogCritical(LogTitleNormal, "Exception recorded:" + timeSpan + " ago");

                    throw new Exception("Failed to initialize the system", _exceptionThrownDuringInitialization);
                }

                _exceptionThrownDuringInitialization = null;
            }

            if (!_initializing && !_coreInitialized)
            {
                using (GlobalInitializerFacade.CoreLockScope)
                {
                    if (!_initializing && !_coreInitialized)
                    {
                        try
                        {
                            _initializing = true;

                            if (!SystemSetupFacade.IsSystemFirstTimeInitialized && RuntimeInformation.IsDebugBuild)
                            {
                                Log.LogWarning(LogTitleNormal, new InvalidOperationException("System is initializing, yet missing first time initialization"));
                            }

                            using (ThreadDataManager.EnsureInitialize())
                            {
                                DoInitialize();
                            }

                            GC.Collect(); // Collecting generation 2 after initialization

                            _fatalErrorFlushCount = 0;
                        }
                        catch (Exception ex)
                        {
                            _exceptionThrownDuringInitialization = ex;
                            _exceptionThrownDuringInitializationTimeStamp = DateTime.Now;

                            var shutdownReason = HostingEnvironment.ShutdownReason;

                            if (shutdownReason != ApplicationShutdownReason.None)
                            {
                                Log.LogCritical(LogTitleNormal, "Shutdown reason: " + HostingEnvironment.ShutdownReason);
                            }
                            
                            Log.LogCritical(LogTitleNormal, ex);
                            throw;
                        }
                        finally
                        {
                            _coreInitialized = true;
                            _initializing = false;
                        }
                    }

                    EnabledUnhandledExceptionsLogging();
                }
            }
        }

        private static void EnabledUnhandledExceptionsLogging()
        {
            if (_unhandledExceptionLoggingInitialized) return;

            AppDomain.CurrentDomain.UnhandledException += (sender, args) =>
            {
                var ex = (Exception)args.ExceptionObject;

                Log.LogCritical("Unhandled exception", ex);

                LogManager.Flush();
            };

            _unhandledExceptionLoggingInitialized = true;
        }

        private static void DoInitialize()
        {
            int startTime = Environment.TickCount;

            Guid installationId = InstallationInformationFacade.InstallationId;

            Log.LogVerbose(LogTitle, "Initializing the system core - installation id = " +  installationId);

            using (new LogExecutionTime(LogTitle, "Initialization of the static data types"))
            {
                DataProviderRegistry.InitializeDataTypes();
            }


            using (new LogExecutionTime(LogTitle, "Auto update of static data types"))
            {
                bool typesUpdated = AutoUpdateDataTypes();
                if (typesUpdated)
                {
                    using (new LogExecutionTime(LogTitle, "Reinitialization of the static data types"))
                    {
                        SqlTableInformationStore.Flush();
                        DataProviderRegistry.Flush();
                        DataProviderPluginFacade.Flush();
                        
                    
                        DataProviderRegistry.InitializeDataTypes();
                    }

                    CodeGenerationManager.GenerateCompositeGeneratedAssembly(true);                 
                }
            }


            using (new LogExecutionTime(LogTitle, "Ensure data stores"))
            {
                bool dataStoresCreated = DataStoreExistenceVerifier.EnsureDataStores();

                if (dataStoresCreated)
                {
                    Log.LogVerbose(LogTitle, "Initialization of the system was halted, performing a flush");
                    _initializing = false;
                    GlobalEventSystemFacade.FlushTheSystem();
                    return;
                }
            }



            using (new LogExecutionTime(LogTitle, "Initializing data process controllers"))
            {
                ProcessControllerFacade.Initialize_PostDataTypes();
            }


            using (new LogExecutionTime(LogTitle, "Initializing data type references"))
            {
                DataReferenceRegistry.Initialize_PostDataTypes();
            }


            using (new LogExecutionTime(LogTitle, "Initializing data type associations"))
            {
                DataAssociationRegistry.Initialize_PostDataTypes();
            }


            using (new LogExecutionTime(LogTitle, "Initializing internal urls"))
            {
                InternalUrls.Initialize_PostDataTypes();
            }
            

            using (new LogExecutionTime(LogTitle, "Initializing functions"))
            {
                MetaFunctionProviderRegistry.Initialize_PostDataTypes();
            }


            Log.LogVerbose(LogTitle, "Starting initialization of administrative secondaries");


            if (SystemSetupFacade.IsSystemFirstTimeInitialized && !SystemSetupFacade.SetupIsRunning)
            {
                using (new LogExecutionTime(LogTitle, "Initializing workflow runtime"))
                {
                    WorkflowFacade.EnsureInitialization();
                }
            }


            if (!RuntimeInformation.IsUnittest)
            {
                using (new LogExecutionTime(LogTitle, "Initializing flow system"))
                {
                    FlowControllerFacade.Initialize();
                }

                using (new LogExecutionTime(LogTitle, "Initializing console system"))
                {
                    ConsoleFacade.Initialize();
                }
            }


            using (new LogExecutionTime(LogTitle, "Auto installing packages"))
            {
                DoAutoInstallPackages();
            }


            using (new LogExecutionTime(LogTitle, "Loading element providers"))
            {
                ElementProviderLoader.LoadAllProviders();
            }


            int executionTime = Environment.TickCount - startTime;

            Log.LogVerbose(LogTitle, "Done initializing of the system core. ({0} ms)".FormatWith(executionTime));
        }



        private static bool AutoUpdateDataTypes()
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



        /// <exclude />
        public static void ReinitializeTheSystem(RunInWriterLockScopeDelegate runInWriterLockScopeDelegate)
        {
            ReinitializeTheSystem(runInWriterLockScopeDelegate, false);
        }



        internal static void ReinitializeTheSystem(RunInWriterLockScopeDelegate runInWriterLockScopeDelegate, bool initializeHooksInTheSameThread)
        {
            if (_hookingFacadeThread != null)
            {
                _hookingFacadeThread.Join(TimeSpan.FromSeconds(30));
                if (_hookingFacadeException != null)
                {
                    throw new InvalidOperationException("The initialization of the HookingFacade failed before this reinitialization was issued", _hookingFacadeException);
                }
            }

            using (GlobalInitializerFacade.CoreLockScope)
            {
                IsReinitializingTheSystem = true;

                runInWriterLockScopeDelegate();

                _coreInitialized = false;
                _initializing = false;
                _exceptionThrownDuringInitialization = null;

                Verify.That(_fatalErrorFlushCount <= 1, "Failed to reload the system. See the log for the details.");

                InitializeTheSystem();

                if (!SystemSetupFacade.SetupIsRunning)
                {
                    // Updating "hooks" either in the same thread, or in another
                    if (initializeHooksInTheSameThread)
                    {
                        object threadStartParameter = new KeyValuePair<TimeSpan, StackTrace>(TimeSpan.Zero, new StackTrace());
                        EnsureHookingFacade(threadStartParameter);
                    }
                    else
                    {
                        _hookingFacadeThread = new Thread(EnsureHookingFacade) {Name = "EnsureHookingFacade"};
                        _hookingFacadeThread.Start(new KeyValuePair<TimeSpan, StackTrace>(TimeSpan.FromSeconds(1), new StackTrace()));
                    }
                }


                IsReinitializingTheSystem = false;
            }
        }



        private static void EnsureHookingFacade(object timeSpanToDelayStart)
        {
            // NOTE: Condition is  made for unit-testing
            if (System.Web.Hosting.HostingEnvironment.IsHosted)
            {
                var kvp = (KeyValuePair<TimeSpan, StackTrace>)timeSpanToDelayStart;
                _hookingFacadeException = null;

                Thread.Sleep(kvp.Key);

                try
                {
                    using (GlobalInitializerFacade.CoreIsInitializedScope)
                    {
                        using (ThreadDataManager.EnsureInitialize())
                        {
                            HookingFacade.EnsureInitialization();
                        }
                    }
                }
                catch (Exception ex)
                {
                    _hookingFacadeException = ex;
                }
            }

            _hookingFacadeThread = null;
        }



        /// <exclude />
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



        /// <exclude />
        public static void FatalResetTheSystem()
        {
            Log.LogWarning(LogTitle, "Unhandled error occurred, reinitializing the system!");

            ReinitializeTheSystem(delegate() { _fatalErrorFlushCount++; GlobalEventSystemFacade.FlushTheSystem(); });
        }



        /// <exclude />
        public static void UninitializeTheSystem(RunInWriterLockScopeDelegate runInWriterLockScopeDelegate)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                using (new LogExecutionTime(LogTitle, "Uninitializing the system"))
                {
                    runInWriterLockScopeDelegate();
                }

                _coreInitialized = false;
                _initializing = false;
                _exceptionThrownDuringInitialization = null;
            }
        }


        internal static IDisposable GetPreInitHandlersScope()
        {
            return new PreInitHandlersScope();
        }


        private class PreInitHandlersScope : IDisposable
        {
            public PreInitHandlersScope()
            {
                _preInitHandlersRunning = true;
            }

            public void Dispose()
            {
                _preInitHandlersRunning = false;
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
            }

#if LeakCheck
            private string stack = Environment.StackTrace;
            /// <exclude />
            ~PreInitHandlersScope()
            {
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            }
#endif
        }


        #region Package installation

        private class AutoInstallPackageInfo
        {
            public bool ToBeDeleted { get; set; }
            public string FilePath { get; set; }
        }

        private static void DoAutoInstallPackages()
        {
            if (IsReinitializingTheSystem) return;

            try
            {
                // This is not so good, unittests run and normal runs should have same semantic behavior.
                // But if this is not here, some unittests will start failing. /MRJ
                if (RuntimeInformation.IsUnittest) return;

                var zipFiles = new List<AutoInstallPackageInfo>();

                string directory = PathUtil.Resolve(GlobalSettingsFacade.AutoPackageInstallDirectory);
                if (C1Directory.Exists(directory))
                {
                    Log.LogVerbose(LogTitle, string.Format("Installing packages from: {0}", directory));
                    zipFiles.AddRange(C1Directory.GetFiles(directory, "*.zip")
                                      .Select(f => new AutoInstallPackageInfo { FilePath = f, ToBeDeleted = true }));
                }
                else
                {
                    Log.LogVerbose(LogTitle, string.Format("Auto install directory not found: {0}", directory));
                }

                if (RuntimeInformation.IsDebugBuild)
                {
                    string workflowTestDir = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.AutoPackageInstallDirectory), "WorkflowTesting");
                    if (C1Directory.Exists(workflowTestDir))
                    {
                        Log.LogVerbose(LogTitle, string.Format("Installing packages from: {0}", workflowTestDir));
                        zipFiles.AddRange(C1Directory.GetFiles(workflowTestDir, "*.zip")
                                          .OrderBy(f => f)
                                          .Select(f => new AutoInstallPackageInfo { FilePath = f, ToBeDeleted = false }));
                    }
                }


                foreach (var zipFile in zipFiles)
                {
                    try
                    {
                        using (Stream zipFileStream = C1File.OpenRead(zipFile.FilePath))
                        {
                            Log.LogVerbose(LogTitle, "Installing package: " + zipFile.FilePath);

                            PackageManagerInstallProcess packageManagerInstallProcess = PackageManager.Install(zipFileStream, true);

                            if (packageManagerInstallProcess.PreInstallValidationResult.Count > 0)
                            {
                                Log.LogError(LogTitleNormal, "Package installation failed! (Pre install validation error)");
                                LogErrors(packageManagerInstallProcess.PreInstallValidationResult);

                                continue;
                            }


                            List<PackageFragmentValidationResult> validationResults = packageManagerInstallProcess.Validate();
                            if (validationResults.Count > 0)
                            {
                                Log.LogError(LogTitleNormal, "Package installation failed! (Validation error)");
                                LogErrors(validationResults);

                                continue;
                            }


                            List<PackageFragmentValidationResult> installResult = packageManagerInstallProcess.Install();
                            if (installResult.Count > 0)
                            {
                                Log.LogError(LogTitleNormal, "Package installation failed! (Installation error)");
                                LogErrors(installResult);

                                continue;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Log.LogWarning(LogTitleNormal, ex);
                    }

                    if (zipFile.ToBeDeleted)
                    {
                        FileUtils.Delete(zipFile.FilePath);
                    }
                }
            }
            catch (Exception ex)
            {
                Log.LogError(LogTitleNormal, ex);
            }
        }

        #endregion



        #region Utilities


        /// <exclude />
        public static void ValidateIsOnlyCalledFromGlobalInitializerFacade(StackTrace stackTrace)
        {
            MethodBase methodInfo = stackTrace.GetFrame(1).GetMethod();

            if (methodInfo.DeclaringType != typeof(GlobalInitializerFacade))
            {
                throw new SystemException(string.Format("The method {0} may only be called by the {1}", stackTrace.GetFrame(1).GetMethod(), typeof(GlobalInitializerFacade)));
            }
        }



        private static void LogErrors(IEnumerable<PackageFragmentValidationResult> packageErrors)
        {
            foreach (PackageFragmentValidationResult packageFragmentValidationResult in packageErrors)
            {
                Log.LogError(LogTitleNormal, packageFragmentValidationResult.Message);
                if (packageFragmentValidationResult.Exception != null)
                {
                    Log.LogError(LogTitleNormal, "With following exception:");
                    Log.LogError(LogTitleNormal, packageFragmentValidationResult.Exception);
                }
            }
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                _coreInitialized = false;
            }
        }

        #endregion



        #region Locking

        /// <exclude />
        public delegate void RunInWriterLockScopeDelegate();

        /// <exclude />
        public static void RunInWriterLockScope(RunInWriterLockScopeDelegate runInWriterLockScopeDelegate)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                runInWriterLockScopeDelegate();
            }
        }


        /// <summary>
        /// Locks the initialization token until disposed. Use this in a using {} statement. 
        /// </summary>
        internal static IDisposable CoreLockScope
        {
            get
            {
                var stackTrace = new StackTrace();
                StackFrame stackFrame = stackTrace.GetFrame(1);
                string lockSource = string.Format("{0}.{1}", stackFrame.GetMethod().DeclaringType.Name, stackFrame.GetMethod().Name);
                return new LockerToken(true, lockSource);
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
                // Even if the InitializeTheSystem method is NOT called during
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


        private static void AcquireReaderLock()
        {
            _readerWriterLock.AcquireReaderLock(GlobalSettingsFacade.DefaultReaderLockWaitTimeout);
        }



        private static void AcquireWriterLock()
        {
            int threadId = Thread.CurrentThread.ManagedThreadId;

            if (_readerWriterLock.IsReaderLockHeld)
            {
                LockCookie lockCookie = _readerWriterLock.UpgradeToWriterLock(GlobalSettingsFacade.DefaultWriterLockWaitTimeout);

                lock(_threadLocking)
                {
                    _threadLocking.LockCookiesPerThreadId.Add(threadId, lockCookie);
                }
            }
            else
            {
                _readerWriterLock.AcquireWriterLock(GlobalSettingsFacade.DefaultWriterLockWaitTimeout);
            }

            lock (_threadLocking)
            {
                if (_threadLocking.WriterLocksPerThreadId.ContainsKey(threadId))
                {
                    _threadLocking.WriterLocksPerThreadId[threadId] = _threadLocking.WriterLocksPerThreadId[threadId] + 1;
                }
                else
                {
                    _threadLocking.WriterLocksPerThreadId.Add(threadId, 1);
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

            if ((_threadLocking.WriterLocksPerThreadId[threadId] == 1) &&
                (_threadLocking.LockCookiesPerThreadId.ContainsKey(threadId)))
            {
                LockCookie lockCookie = _threadLocking.LockCookiesPerThreadId[threadId];

                lock(_threadLocking)
                {
                    _threadLocking.LockCookiesPerThreadId.Remove(threadId);
                }

                _readerWriterLock.DowngradeFromWriterLock(ref lockCookie);
            }
            else
            {
                _readerWriterLock.ReleaseWriterLock();
            }

            lock (_threadLocking)
            {
                _threadLocking.WriterLocksPerThreadId[threadId] = _threadLocking.WriterLocksPerThreadId[threadId] - 1;

                if (_threadLocking.WriterLocksPerThreadId[threadId] == 0)
                {
                    _threadLocking.WriterLocksPerThreadId.Remove(threadId);
                }
            }
        }


        /// <summary>
        /// Encapsulates calls to [Acquire|Release][Reader|Writer]Lock(), keeps log of writer locks
        /// </summary>
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
                Log.LogVerbose(LogTitle, "Writer Lock Acquired (Managed Thread ID: {0}, Source: {1}{2})".FormatWith(Thread.CurrentThread.ManagedThreadId, lockSource, methodInfo));

                #endregion Logging the action

                AcquireWriterLock();
            }



            public void Dispose()
            {
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
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
                Log.LogVerbose(LogTitle, "Writer Lock Releasing (Managed Thread ID: {0}, Source: {1}{2})".FormatWith(Thread.CurrentThread.ManagedThreadId, _lockSource, methodInfo));

                #endregion

                ReleaseWriterLock();
            }

#if LeakCheck
            private string stack = Environment.StackTrace;
            /// <exclude />
            ~LockerToken()
            {
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            }
#endif
        }
        #endregion


        private sealed class ThreadLockingInformation
        {
            public readonly Hashtable<int, int> WriterLocksPerThreadId = new Hashtable<int, int>();
            public readonly Hashtable<int, LockCookie> LockCookiesPerThreadId = new Hashtable<int, LockCookie>();
        }
    }
}
