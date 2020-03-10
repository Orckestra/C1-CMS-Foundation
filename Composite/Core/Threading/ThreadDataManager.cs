using System;
using System.Threading;
using System.Web;
using Composite.C1Console.Security.Foundation.PluginFacades;


namespace Composite.Core.Threading
{
    /// <summary>    
    /// This class coordinates data connections and ensures that multiple requests to SQL Server will reuse the same sql connection, allowing transactions to run without the use of MSDTC
    /// </summary>
    public static class ThreadDataManager
    {
        private static readonly string LogTitle = nameof(ThreadDataManager);

        private const string HttpContextItemsKey_InitializedKey = "ThreadDataManager_initialized";
        private const string HttpContextItemsKey_SavedData = "ThreadDataManager_saved";

        private static AsyncLocal<ThreadDataManagerData> _threadDataManagerData = new AsyncLocal<ThreadDataManagerData>();

        /// <summary>
        /// Gets <see cref="Composite.Core.Threading.ThreadDataManagerData" /> object for the current thread
        /// </summary>
        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
        public static ThreadDataManagerData Current
        {
            get
            {
                return _threadDataManagerData?.Value;
            }
            internal set
            {
                _threadDataManagerData.Value = value;
            }
        }

        /// <summary>
        /// Gets the current thread data, in the case of <see cref="Composite.Core.Threading.ThreadDataManager" /> not being initialized it'll throw an exception
        /// </summary>
        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
        public static ThreadDataManagerData GetCurrentNotNull()
        {
            ThreadDataManagerData current = Current;
            Verify.That(current != null, 
@"ThreadDataManager hasn't been initialized in the current thread. You probably have forgotten to use Composite.Core.Threading.ThreadDataManager.EnsureInitialize() call on a custom created thread.
Example of usage:
using(Composite.Core.Threading.ThreadDataManager.EnsureInitialize())
{
  // Code that works with C1 data layer goes here
  .....
}");
            current.CheckNotDisposed();

            return current;
        }


        /// <summary>
        /// Creates  a new instance of <see cref="Composite.Core.Threading.ThreadDataManagerData" /> object
        /// </summary>
        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
        public static ThreadDataManagerData CreateNew()
        {
            var current = Current;
            current?.CheckNotDisposed();

            return new ThreadDataManagerData(current);
        }



        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
        public static IDisposable Initialize()
        {
            return new ThreadDataManagerScope(new ThreadDataManagerData(), true);
        }



        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
        public static IDisposable Initialize(ThreadDataManagerData parentThreadData)
        {
            parentThreadData?.CheckNotDisposed();

            return new ThreadDataManagerScope(new ThreadDataManagerData(parentThreadData), true);
        }



        /// <summary>
        /// Returns an <see cref="System.IDisposable" /> scope, checks that ThreadDataManager is initialized for the current thread, if not - does the initialization.
        /// Should be called in all non ASP.NET threads, that are using C1 data API.
        /// </summary>
        /// <example>
        /// <code>
        /// using (Composite.Core.Threading.ThreadDataManager.EnsureInitialize())
        /// using (var conn = new DataConnection(PublicationScope.Published, new CultureInfo("en-US")))
        /// {
        ///   var pages = conn.Get&lt;Composite.Data.Types.IPage&gt;();	
        ///   // ...
        /// }
        /// </code>
        /// </example>
        /// <returns>An <see cref="System.IDisposable" /> scope</returns>
        public static IDisposable EnsureInitialize()
        {
            if (Current != null) return EmptyDisposable.Instance;

            return Initialize();
        }


        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
        public static void InitializeThroughHttpContext()
        {
            var httpContext = HttpContext.Current;
            Verify.IsNotNull(httpContext, "This can only be called from a thread started with a current http context");

            if (httpContext.Items[HttpContextItemsKey_InitializedKey] == null)
            {
                if (_threadDataManagerData.Value != null)
                {
                    Log.LogCritical(LogTitle, "ThreadData has already been initialized for the current thread. It's been reset to NULL value, resource leaks are possible.");
                    _threadDataManagerData.Value = null;
                }

                var threadData = new ThreadDataManagerData();

                _threadDataManagerData.Value = threadData;
                httpContext.Items[HttpContextItemsKey_InitializedKey] = threadData;
            }
        }


        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
        [Obsolete("Use the overload taking no parameters instead")]
        public static void InitializeThroughHttpContext(bool forceUserValidation)
        {
            InitializeThroughHttpContext();

            if (forceUserValidation)
            {
                string username = LoginSessionStorePluginFacade.StoredUsername;
            }
        }


        
        /// <summary>
        /// To be used only in Global.asax
        /// </summary>
        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
        public static void FinalizeThroughHttpContext()
        {

            var context = HttpContext.Current;
            var valueFromContext = context?.Items[HttpContextItemsKey_InitializedKey] as ThreadDataManagerData;

            var value = _threadDataManagerData.Value ?? valueFromContext;
            if (value == null)
            {
                Log.LogError(LogTitle, "Thread data was already disposed after request execution.");
                return;
            }

            if (!ReferenceEquals(valueFromContext, value))
            {
                Log.LogError(LogTitle, "Thread data preserved in context items and AsyncLocal differ.");
            }

            if (context != null)
            {
                context.Items[HttpContextItemsKey_InitializedKey] = null;
            }

            _threadDataManagerData.Value = null;

            value.Dispose();
        }


        private sealed class ThreadDataManagerScope : IDisposable
        {
            private bool _disposed;
            private readonly bool _disposeData;
            private readonly ThreadDataManagerData _threadData;
            private readonly ThreadDataManagerData _threadDataValueToBeRestored;


            public ThreadDataManagerScope(ThreadDataManagerData newCurrentData, bool disposeData)
            {
                Verify.ArgumentNotNull(newCurrentData, "newCurrentData");
                newCurrentData.CheckNotDisposed();

                _threadData = newCurrentData;

                // NOTE: We shouldn't take value from 'Current' property, since it may return it from HttpContext
                _threadDataValueToBeRestored = _threadDataManagerData.Value;
                _threadDataManagerData.Value = newCurrentData;

                _disposeData = disposeData;
            }


            public void Dispose()
            {
                Dispose(true);
                GC.SuppressFinalize(this);
            }


            public void Dispose(bool disposing)
            {
                if (disposing)
                {
                    try
                    {
                        if (_disposed) throw new ObjectDisposedException(typeof(ThreadDataManagerData).FullName);

                        _disposed = true;

                        if (_disposeData)
                        {
                            try
                            {
                                _threadData.Dispose();
                            }
                            catch (Exception e)
                            {
                                Log.LogError(LogTitle, e);
                            }

                            Verify.IsTrue(Current == _threadData,
                                "ThreadDataManager.Current points to a different thread data object!!!");
                        }
                    }
                    finally
                    {
                        _threadDataManagerData.Value = _threadDataValueToBeRestored;
                    }
                }
                else
                {
                    if (!_disposed && _disposeData)
                    {
                        try
                        {
                            _threadData.Dispose();
                        }
                        catch (Exception)
                        {
                            // silent...
                        }
                    }
                }
            }


#if LeakCheck
            private string stack = Environment.StackTrace;
#endif
            ~ThreadDataManagerScope()
            {
#if LeakCheck
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
#endif
                Dispose(false);
            }
        }

        internal static void RestoreContext(HttpContextBase ctx)
        {
            _threadDataManagerData.Value = ctx.Items[HttpContextItemsKey_SavedData] as ThreadDataManagerData;
            ctx.Items.Remove(HttpContextItemsKey_SavedData);
        }

        internal static void SaveContext(HttpContextBase ctx)
        {
            ctx.Items[HttpContextItemsKey_SavedData] = _threadDataManagerData.Value;
            _threadDataManagerData.Value = null;
        }
    }
}
