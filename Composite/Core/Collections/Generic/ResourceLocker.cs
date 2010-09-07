using System;
using System.Threading;


namespace Composite.Core.Collections.Generic
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ResourceLocker<T>
        where T : class
    {
        public delegate void InitializerDelegate(T resources);

        private readonly T _resources;
        private InitializerDelegate _initializerDelegate;

        private bool _initialized = false;
        private bool _initializing = false;
        private bool _requireCoreReaderLock;
        private readonly object _lock = new object();


        public ResourceLocker(T resources, InitializerDelegate initializerDelegate, bool requireCoreReaderLock)
        {
            _resources = resources;
            _initializerDelegate = initializerDelegate;
            _requireCoreReaderLock = requireCoreReaderLock;
        }

        public ResourceLocker(T resources, InitializerDelegate initializerDelegate): this(resources, initializerDelegate, true)
        {
        }


        public T Resources
        {
            get
            {
                if (!_initialized)
                {
                  Initialize();
                }

                return _resources;
            }
        }


        public bool IsInitialized
        {
            get
            {
                return _initialized;
            }
        }


        public void Initialize()
        {
            if (_initialized)
            	return;


            IDisposable globalReaderLock = null;

            try
            {
                if(_requireCoreReaderLock)
                {
                    globalReaderLock = GlobalInitializerFacade.CoreNotLockedScope;
                }
                
                lock (_lock)
				{
					Verify.IsFalse(_initializing, "Initialize is already being executed on this thread! Please examine the stack!");

					if (_initialized)
						return;

					_initializing = true;

					try
					{
						_initializerDelegate(_resources);
					}
					finally
					{
						_initialized = true;
						_initializing = false;
					}
				}

            }
            finally
            {
                if(globalReaderLock != null)
                {
                    globalReaderLock.Dispose();
                }
            }
		}


        public IDisposable Locker
        {
            get
            {
                return new ResourceLockerToken(this);
            }
        }


        public IDisposable ReadLocker
        {
            get
            {
                return new ResourceLockerToken(this);
            }
        }


        public void ResetInitialization()
        {
            lock (_lock)
            {
                _initialized = false;
            }
        }


        private void TryEnterLock(int timeoutInMilliseconds, ref bool success)
        {
            Monitor.TryEnter(_lock, timeoutInMilliseconds, ref success);
        }


        private void Exit()
        {
            Monitor.Exit(_lock);
        }


        private sealed class ResourceLockerToken : IDisposable
        {
            private ResourceLocker<T> _resourceLocker;

            internal ResourceLockerToken(ResourceLocker<T> resourceLocker)
            {
                if (resourceLocker == null) throw new ArgumentNullException("resourceLocker");

                _resourceLocker = resourceLocker;

                int tires = 120;

                bool success = false;
                while (!success && tires-- > 0)
                {
                    IDisposable coreLock = null;

                    try
                    {
                        if (_resourceLocker._requireCoreReaderLock)
                        {
                            coreLock = GlobalInitializerFacade.CoreNotLockedScope;
                        }

                        _resourceLocker.TryEnterLock(500, ref success);
                    }
                    finally
                    {
                        if (coreLock != null)
                        {
                            coreLock.Dispose();
                        }
                    }

                    if (!success)
                    {
                        Thread.Sleep(1);
                    }
                }

                if (!success)
                {
                    throw new TimeoutException("Failed to obtain a required resource lock. Aborting to avoid system deadlocks.");
                }
            }

            public void Dispose()
            {
                _resourceLocker.Exit();
            }
        }
    }
}
