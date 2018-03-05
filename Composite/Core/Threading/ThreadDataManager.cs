using System;
using System.Web;
using Composite.C1Console.Security.Foundation.PluginFacades;


namespace Composite.Core.Threading
{
    /// <summary>    
    /// This class coordinates data connections and ensures that multiple requests to SQL Server will reuse the same sql connection, allowing transactions to run without the use of MSDTC
    /// </summary>
    public static class ThreadDataManager
    {
        private static readonly string LogTitle = typeof(ThreadDataManager).Name;
        private const string c_HttpContextItemsId = "ThreadDataManager";

        [ThreadStatic]
        private static ThreadDataManagerData _threadDataManagerData;

        /// <summary>
        /// Gets <see cref="Composite.Core.Threading.ThreadDataManagerData" /> object for the current thread
        /// </summary>
        /// <exclude />
        [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
        public static ThreadDataManagerData Current
        {
            get
            {
                var currentContext = _threadDataManagerData;

                if(currentContext != null)
                {
                    return currentContext;
                }

                var httpContext = HttpContext.Current;

                if (httpContext != null)
                {
                    var data = httpContext.Items[c_HttpContextItemsId] as ThreadDataManagerData;

                    if (data == null)
                    {
                        InitializeThroughHttpContext();

                        data = httpContext.Items[c_HttpContextItemsId] as ThreadDataManagerData;

                        Verify.That(data != null, "Failed to initialize data through http context");
                    }

                    return data;
                }

                return null;
            }
            internal set
            {
                _threadDataManagerData = value;
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

            if (httpContext.Items[c_HttpContextItemsId] == null)
            {
                if (_threadDataManagerData != null)
                {
                    Log.LogCritical(LogTitle, "ThreadData has already been initialized in the current thread. It's been reset to NULL value, resource leaks are possible.");
                    _threadDataManagerData = null;
                }

                var threadData = new ThreadDataManagerData();
                httpContext.Items[c_HttpContextItemsId] = threadData;
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
            if(_threadDataManagerData != null)
            {
                _threadDataManagerData = null;
                Log.LogError(LogTitle, "Thread data hasn't been disposed after request execution. Resource leaks are possible.");
            }


            var httpContext = HttpContext.Current;

            // Checking if ThreadData was initialized though HttpContext
            var currentData = httpContext.Items[c_HttpContextItemsId] as IDisposable;
            if (currentData != null)
            {
                httpContext.Items[c_HttpContextItemsId] = null;
                try
                {
                    currentData.Dispose();
                }
                catch(Exception e)
                {
                    Log.LogError(LogTitle, e);
                }
            }
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
                _threadDataValueToBeRestored = _threadDataManagerData;
                _threadDataManagerData = newCurrentData;

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
                        _threadDataManagerData = _threadDataValueToBeRestored;
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
    }
}
