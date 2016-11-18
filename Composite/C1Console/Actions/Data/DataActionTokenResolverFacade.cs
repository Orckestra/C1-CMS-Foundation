using System;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Data;
using Microsoft.Extensions.DependencyInjection;

namespace Composite.C1Console.Actions.Data
{
    /// <summary>
    /// Use this to access the service that has DataActionTokenResolver to register your actions
    /// </summary>
    public static class DataActionTokenResolverFacade
    {
        /// <exclude />
        public static ActionToken Resolve(IData data, ActionIdentifier actionIdentifier)
        {
            return GetDataActionTokenResolverService().Resolve(data, actionIdentifier);
        }

        /// <exclude />
        public static ActionToken ResolveDefault(IData data, ActionIdentifier actionIdentifier)
        {
            return GetDataActionTokenResolverService().ResolveDefault(data, actionIdentifier);
        }

        /// <summary>
        /// Use this to assign a deafult action to a certain data type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="actionIdentifier"></param>
        /// <param name="dataActionToken"></param>
        public static void RegisterDefault<T>(ActionIdentifier actionIdentifier, Func<T, ActionToken> dataActionToken) where T : IData
        {
                GetDataActionTokenResolverService().RegisterDefault<T>(actionIdentifier, dataActionToken);
        }
        /// <summary>
        /// Use this to assaign an action to a certain data type if a certain condition met
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="actionIdentifier"></param>
        /// <param name="actionValidPredicate"></param>
        /// <param name="dataActionToken"></param>
        public static void RegisterConditional<T>(ActionIdentifier actionIdentifier, Func<T, bool> actionValidPredicate, Func<T, ActionToken> dataActionToken) where T : IData
        {
            GetDataActionTokenResolverService().RegisterConditional<T>(actionIdentifier, actionValidPredicate, dataActionToken);
        }

        private static DataActionTokenResolver GetDataActionTokenResolverService()
        {
            return ServiceLocator.GetService<DataActionTokenResolver>();
        }
    }
}
