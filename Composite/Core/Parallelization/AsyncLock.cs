using System;
using System.Threading;
using System.Threading.Tasks;

namespace Composite.Core.Parallelization
{
    internal sealed class AsyncLock
    {
        private readonly SemaphoreSlim _semaphore = new SemaphoreSlim(1, 1);
        private readonly Task<IDisposable> _releaser;

        public AsyncLock()
        {
            _releaser = Task.FromResult((IDisposable)new Releaser(this));
        }

        public Task<IDisposable> LockAsync()
        {
            var wait = _semaphore.WaitAsync();
            return wait.IsCompleted ?
                        _releaser :
                        wait.ContinueWith((_, state) => (IDisposable)state, 
                            _releaser.Result, CancellationToken.None,
                            TaskContinuationOptions.ExecuteSynchronously, TaskScheduler.Default);
        }

        public IDisposable Lock()
        {
            _semaphore.Wait();

            return new Releaser(this);
        }

        public bool Wait(int millisecondsTimeout)
        {
            return _semaphore.Wait(millisecondsTimeout);
        }

        public Task<bool> WaitAsync(int millisecondsTimeout)
        {
            return _semaphore.WaitAsync(millisecondsTimeout);
        }

        public void Release()
        {
            _semaphore.Release();
        }

        private sealed class Releaser : IDisposable
        {
            private readonly AsyncLock _toRelease;

            internal Releaser(AsyncLock toRelease)
            {
                _toRelease = toRelease;
            }

            public void Dispose()
            {
                _toRelease.Release();
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
            }

#if LeakCheck
            private string stack = Environment.StackTrace;
            /// <exclude />
            ~Releaser()
            {
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            }
#endif
        }
    }
}
