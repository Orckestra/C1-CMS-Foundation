using System;
using System.Threading;
using System.ComponentModel;


namespace Composite.Core.Application
{
    /// <summary>
    /// This is a OS system wide named semaphore.
    /// </summary>
    [EditorBrowsable(EditorBrowsableState.Never)]
    internal class SystemGlobalSemaphore
    {
        private readonly string _id;
        private readonly Semaphore _eventWaitHandle;


        /// <summary>
        /// </summary>
        /// <param name="id">The system wide id of the semaphore</param>
        public SystemGlobalSemaphore(string id)
        {
            _id = id;
            if (!_id.StartsWith(@"Global\", StringComparison.InvariantCultureIgnoreCase))
            {
                _id = @"Global\" + _id;
            }

            _eventWaitHandle = new Semaphore(1, 1, _id);
        }



        /// <summary>
        /// Enter the semaphore. Blocking. Returns false if entering the semaphore failed due to timeout.
        /// </summary>
        /// <param name="timeout">Timeout in milliseconds</param>
        /// <param name="throwOnTimeout">If this is true, the method will throw an excepion on timeout</param>
        /// <returns>True if entering successed. False if entering timed out.</returns>
        public bool Enter(int timeout, bool throwOnTimeout = false)
        {
            bool entered = _eventWaitHandle.WaitOne(timeout);

            if (!entered && throwOnTimeout) throw new TimeoutException(
                $"Failed to obtain the system global semaphore with id '{_id}'");

            return entered;
        }


        /// <summary>
        /// Leave the semaphore.
        /// </summary>
        public void Leave()
        {
            _eventWaitHandle.Release();
        }



        /// <summary>
        /// The used id used for naming the semaphore.
        /// </summary>
        public string Id => _id;
    }
}
