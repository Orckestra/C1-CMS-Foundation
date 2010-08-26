using System;
using System.Web;
using Composite.C1Console.Security.Foundation.PluginFacades;


namespace Composite.Core.Threading
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ThreadDataManager
    {
        private static readonly string LogTitle = "ThreadDataManager";
        private const string c_HttpContextItemsId = "ThreadDataManager";

        [ThreadStatic]
        private static ThreadDataManagerData _threadDataManagerData = null;


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
        /// Gets the current thread data, in the case of ThreadDataManager not being initialized it'll throw an exception
        /// </summary>
        /// <returns></returns>
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

        public static ThreadDataManagerData CreateNew()
        {
            var current = Current;
            if(current != null)
            {
                current.CheckNotDisposed();
            }

            return new ThreadDataManagerData(current);
        }



        public static IDisposable Initialize()
        {
            return new ThreadDataManagerScope(new ThreadDataManagerData(), true);
        }



        public static IDisposable Initialize(ThreadDataManagerData parentThreadData)
        {
            if(parentThreadData != null)
            {
                parentThreadData.CheckNotDisposed();
            }

            return new ThreadDataManagerScope(new ThreadDataManagerData(parentThreadData), true);
        }

        public static IDisposable EnsureInitialize()
        {
            if (Current != null) return new EmptyDisposableObj();

            return Initialize();
        }


        public static void InitializeThroughHttpContext()
        {
            InitializeThroughHttpContext(false);
        }


        public static void InitializeThroughHttpContext(bool forceUserValidation)
        {
            var httpContext = HttpContext.Current;
            Verify.IsNotNull(httpContext, "This can only be called from a thread started with a current http context");

            if (httpContext.Items[c_HttpContextItemsId] == null)
            {
                if (_threadDataManagerData != null)
                {
                    Core.Logging.LoggingService.LogCritical(LogTitle, "ThreadData has already been initialized in the current thread. It's been reset to NULL value, resource leaks are possible.");
                    _threadDataManagerData = null;
                }

                var threadData = new ThreadDataManagerData();
                httpContext.Items[c_HttpContextItemsId] = threadData;
            }

            if (forceUserValidation == true)
            {
                string username = LoginSessionStorePluginFacade.StoredUsername;
            }
        }

        /// <summary>
        /// To be used only in Global.asax
        /// </summary>
        public static void FinalizeThroughHttpContext()
        {
            if(_threadDataManagerData != null)
            {
                _threadDataManagerData = null;
                Core.Logging.LoggingService.LogError(LogTitle, "Thread data hasn't been disposed after request execution. Resource leaks are possible.");
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
                    Core.Logging.LoggingService.LogError(LogTitle, e);
                }
            }
        }


        private sealed class EmptyDisposableObj : IDisposable
        {
            public void Dispose()
            {
                // Do nothing here...
            }

        }

        private sealed class ThreadDataManagerScope : IDisposable
        {
            private bool _disposed = false;
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
                        catch(Exception e)
                        {
                            Core.Logging.LoggingService.LogError(LogTitle, e);
                        }

                        Verify.IsTrue(Current == _threadData, "ThreadDataManager.Current points to a different thread data object!!!");
                    }
                }
                finally 
                {
                    _threadDataManagerData = _threadDataValueToBeRestored;
                }
            }


            ~ThreadDataManagerScope()
            {
                if (_disposed || !_disposeData)
                {
                    return;
                }


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
}
