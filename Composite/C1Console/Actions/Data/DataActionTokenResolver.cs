using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Security;
using Composite.Data;

namespace Composite.C1Console.Actions.Data
{
    /// <exclude />
    public class DataActionTokenResolver 
    {
        static List<DataActionTokenRegisterHandler> _defaultActions;
        static List<DataActionTokenRegisterHandler> _conditionalActions;

        /// <summary>
        /// Use this to assign a deafult action to a certain data type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="actionIdentifier"></param>
        /// <param name="dataActionToken"></param>
        public void RegisterDefault<T>(ActionIdentifier actionIdentifier, Func<T, ActionToken> dataActionToken) where T : IData
        {
            Verify.ArgumentNotNull(actionIdentifier, nameof(actionIdentifier));
            Verify.ArgumentNotNull(dataActionToken, nameof(dataActionToken));

            if (_defaultActions == null)
            {
                _defaultActions = new List<DataActionTokenRegisterHandler>();
            }

            _defaultActions.Add(new DataActionTokenRegisterHandler<T>(actionIdentifier, dataActionToken));
        }
        /// <summary>
        /// Use this to assaign an action to a certain data type if a certain condition met
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="actionIdentifier"></param>
        /// <param name="actionValidPredicate"></param>
        /// <param name="dataActionToken"></param>
        public void RegisterConditional<T>(ActionIdentifier actionIdentifier, Func<T, bool> actionValidPredicate, Func<T, ActionToken> dataActionToken) where T : IData
        {
            Verify.ArgumentNotNull(actionIdentifier, nameof(actionIdentifier));
            Verify.ArgumentNotNull(actionValidPredicate, nameof(actionValidPredicate));
            Verify.ArgumentNotNull(dataActionToken, nameof(dataActionToken));

            if (_conditionalActions == null)
            {
                _conditionalActions = new List<DataActionTokenRegisterHandler>();
            }

            _conditionalActions.Add(new DataActionTokenRegisterHandler<T>(actionIdentifier, dataActionToken, actionValidPredicate));
        }

        /// <exclude />
        public ActionToken Resolve(IData data, ActionIdentifier actionIdentifier)
        {
            var interfaces = GetOrderedInterfaces(data.DataSourceId.InterfaceType);

            foreach (var type in interfaces)
            {
                var conditionalAction = _conditionalActions?.FirstOrDefault(f => f.Check(type, data, actionIdentifier));
                if (conditionalAction != null)
                {
                    var actionToken = conditionalAction.GetActionToken(data);
                    if (actionToken == null)
                    {
                        throw new InvalidOperationException($"Conditional action token is null. Type: '{type.FullName}', action type: '{conditionalAction.GetType().FullName}'");
                    }

                    return actionToken;
                }
            }

            return ResolveDefault(data, actionIdentifier);
        }

        /// <summary>
        /// Resolves a default action of the given type for a given data item
        /// </summary>
        /// <param name="data">The data item</param>
        /// <param name="actionIdentifier">The action identifier</param>
        /// <returns></returns>
        public ActionToken ResolveDefault(IData data, ActionIdentifier actionIdentifier)
        {
            var interfaceType = data.DataSourceId.InterfaceType;

            var interfaces = GetOrderedInterfaces(interfaceType);

            foreach (var type in interfaces)
            {
                var defaultAction = _defaultActions?.LastOrDefault(f => f.Check(type, data, actionIdentifier));
                if (defaultAction != null)
                {
                    var actionToken = defaultAction.GetActionToken(data);
                    if (actionToken == null)
                    {
                        throw new InvalidOperationException($"Default action token is null. Type: '{type.FullName}', default action type: '{defaultAction.GetType().FullName}'");
                    }

                    return actionToken;
                }
            }

            throw new InvalidOperationException($"No default action token is found. Searched for type: '{interfaceType}', Registered types: '{string.Join(", ",interfaces.Select(_ => _.FullName))}'");
        }

        private static List<Type> GetOrderedInterfaces(Type dataType)
        {
            var result = new List<Type> { dataType };

            result.AddRange(dataType.GetInterfaces().OrderByDescending(f => f.GetInterfaces().Length));

            return result;
        }
    }
}