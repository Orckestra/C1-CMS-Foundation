namespace Composite.Core.WebClient.Services.WampRouter
{
    /// <summary>
    /// Wamp Router Facade for registering clients
    /// </summary>
    public static class WampRouterFacade
    {
        /// <summary>
        /// Method for registering callee
        /// </summary>
        /// <param name="realmName"></param>
        /// <param name="instance"></param>
        /// <returns></returns>
        public static bool RegisterCallee(string realmName, IRpcService instance)
        {
            var wampRouter = ServiceLocator.GetRequiredService<WampRouter>();
            if (wampRouter == null)
                return false;
            wampRouter.RegisterCallee(realmName,instance);
            return true;
        }

        /// <summary>
        /// Method for registering callee
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        public static bool RegisterCallee(IRpcService instance)
        {
            var wampRouter = ServiceLocator.GetRequiredService<WampRouter>();
            if (wampRouter == null)
                return false;
            wampRouter.RegisterCallee(instance);
            return true;
        }

        /// <summary>
        /// Method for registering publisher
        /// </summary>
        /// <param name="realmName"></param>
        /// <param name="eventObservable"></param>
        /// <typeparam name="TObservable"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <returns></returns>
        public static bool RegisterPublisher<TObservable,TResult>
            (string realmName, IWampEventHandler<TObservable, TResult> eventObservable)
        {
            var wampRouter = ServiceLocator.GetRequiredService<WampRouter>();
            if (wampRouter == null)
                return false;
            wampRouter.RegisterPublisher(realmName, eventObservable);
            return true;
        }

        /// <summary>
        /// Method for registering publisher
        /// </summary>
        /// <param name="eventObservable"></param>
        /// <typeparam name="TObservable"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <returns></returns>
        public static bool RegisterPublisher<TObservable,TResult>
            (IWampEventHandler<TObservable, TResult> eventObservable)
        {
            var wampRouter = ServiceLocator.GetRequiredService<WampRouter>();
            if (wampRouter == null)
                return false;
            wampRouter.RegisterPublisher(eventObservable);
            return true;
        }
    }
}