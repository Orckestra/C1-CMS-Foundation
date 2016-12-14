using System;

namespace Composite.Core.WebClient.Services.WampRouter
{
    /// <summary>
    /// This class should be implemented when a publisher is going to be registered on Wamp Router
    /// </summary>
    /// <typeparam name="T1"></typeparam>
    /// <typeparam name="T2"></typeparam>
    public interface IWampEventHandler<out T1,out T2>
    {
        /// <summary>
        /// Topic uri
        /// </summary>
        string Topic { get; }
        /// <summary>
        /// Observable event
        /// </summary>
        IObservable<T1> Event { get; }

        /// <summary>
        /// Data to be published from the observable event
        /// </summary>
        /// <returns></returns>
        T2 GetNewData();
    }
}