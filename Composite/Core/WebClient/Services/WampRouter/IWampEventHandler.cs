using System;

namespace Composite.Core.WebClient.Services.WampRouter
{
    /// <summary>
    /// This class should be implemented when a publisher is going to be registered on Wamp Router
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IWampEventHandler<out T>
    {

        /// <summary>
        /// Observable event
        /// </summary>
        IObservable<long> Event { get; }

        /// <summary>
        /// Data to be published from the observable event
        /// </summary>
        /// <returns></returns>
        T GetNewData();
    }
}