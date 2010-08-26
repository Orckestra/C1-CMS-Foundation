using System;
using System.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Core.Logging;


namespace Composite.C1Console.Security.Foundation
{
    internal static class SecurityAncestorProviderCache
    {
        private static Dictionary<Type, ISecurityAncestorProvider> _securityAncestorProviderCache = new Dictionary<Type, ISecurityAncestorProvider>();

        private static object _lock = new object();



        static SecurityAncestorProviderCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
        }



        public static ISecurityAncestorProvider GetSecurityAncestorProvider(EntityToken entityToken)
        {
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            ISecurityAncestorProvider securityAncestorProvider;

            Type entityTokenType = entityToken.GetType();

            if (_securityAncestorProviderCache.TryGetValue(entityTokenType, out securityAncestorProvider) == false)
            {
                lock (_lock)
                {
                    if (_securityAncestorProviderCache.TryGetValue(entityTokenType, out securityAncestorProvider) == false)
                    {
                        object[] attributes = entityTokenType.GetCustomAttributes(typeof(SecurityAncestorProviderAttribute), true);

                        if (attributes.Length == 0) throw new InvalidOperationException(string.Format("Missing {0} attribute on the entity token {1}", typeof(SecurityAncestorProviderAttribute), entityTokenType));

                        SecurityAncestorProviderAttribute attribute = (SecurityAncestorProviderAttribute)attributes[0];

                        if (attribute.SecurityAncestorProviderType == null) throw new InvalidOperationException(string.Format("Security ancestor provider type can not be null on the entity token {0}", entityTokenType));
                        if (typeof(ISecurityAncestorProvider).IsAssignableFrom(attribute.SecurityAncestorProviderType) == false) throw new InvalidOperationException(string.Format("Security ancestor provider {0} should implement the interface {1}", attribute.SecurityAncestorProviderType, typeof(ISecurityAncestorProvider)));

                        securityAncestorProvider = (ISecurityAncestorProvider)Activator.CreateInstance(attribute.SecurityAncestorProviderType);

                        _securityAncestorProviderCache.Add(entityTokenType, securityAncestorProvider);
                    }
                }
            }


            return securityAncestorProvider;
        }



        private static void Flush()
        {
            lock (_lock)
            {
                _securityAncestorProviderCache = new Dictionary<Type, ISecurityAncestorProvider>();
            }
        }



        private static void OnFlush(FlushEventArgs args)
        {
            Flush();
        }
    }
}
