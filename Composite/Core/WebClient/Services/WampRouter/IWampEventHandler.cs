using System;

namespace Composite.Core.WebClient.Services.WampRouter
{
    /// <summary>
    /// This class should be implemented when a publisher is going to be registered on Wamp Router
    /// </summary>
    /// <typeparam name="TObservable"></typeparam>
    /// <typeparam name="TResult"></typeparam>
    public interface IWampEventHandler<out TObservable,out TResult>
    {
        /// <summary>
        /// Topic uri
        /// </summary>
        string Topic { get; }
        /// <summary>
        /// Observable event
        /// </summary>
        IObservable<TObservable> Event { get; }

        /// <summary>
        /// Data to be published from the observable event
        /// </summary>
        /// <returns></returns>
        TResult GetNewData();
    }
}