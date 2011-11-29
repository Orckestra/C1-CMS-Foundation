using System;
using System.Threading;


namespace Composite.Core.Application
{
    public class SystemGlobalEventWaitHandle
    {
        private string _id;
        private EventWaitHandle _eventWaitHandle;


        /// <summary>
        /// </summary>
        /// <param name="id">The system wide id of the mutex</param>
        public SystemGlobalEventWaitHandle(string id)
        {
            _id = id;
            bool createdNew;
            _eventWaitHandle = new EventWaitHandle(false, EventResetMode.AutoReset, id, out createdNew);

            if (createdNew)
            {
                _eventWaitHandle.Set();
            }
        }



        /// <summary>
        /// Enter the mutex. Blocking. Returns false if entering the mutex failed due to timeout.
        /// </summary>
        /// <param name="timeout">Timeout in milliseconds</param>
        /// <param name="throwOnTimeout">If this is true, the method will throw an excepion on timeout</param>
        /// <returns></returns>
        public bool Enter(int timeout, bool throwOnTimeout = false)
        {
            bool entered = _eventWaitHandle.WaitOne(timeout);

            if (!entered && throwOnTimeout) throw new TimeoutException(string.Format("Failed to obtain the system global mutex with id '{0}'", _id));

            return entered;
        }


        /// <summary>
        /// Leave the mutex.
        /// </summary>
        public void Leave()
        {
            _eventWaitHandle.Set();
        }
    }
}
