using System;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;

namespace Composite.C1Console.Security.Foundation
{
    internal static class SecurityAncestorProviderCache
    {
        private static Hashtable<Type, ISecurityAncestorProvider> _securityAncestorProviderCache = new Hashtable<Type, ISecurityAncestorProvider>();
        private static object _lock = new object();


        static SecurityAncestorProviderCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlush);
        }


        public static ISecurityAncestorProvider GetSecurityAncestorProvider(EntityToken entityToken)
        {
            Verify.ArgumentNotNull(entityToken, "entityToken");

            ISecurityAncestorProvider securityAncestorProvider;

            Type entityTokenType = entityToken.GetType();

            if (_securityAncestorProviderCache.TryGetValue(entityTokenType, out securityAncestorProvider) == false)
            {
                lock (_lock)
                {
                    if (_securityAncestorProviderCache.TryGetValue(entityTokenType, out securityAncestorProvider) == false)
                    {
                        object[] attributes = entityTokenType.GetCustomAttributes(typeof(SecurityAncestorProviderAttribute), true);

                        Verify.That(attributes.Length > 0, "Missing {0} attribute on the entity token {1}", typeof(SecurityAncestorProviderAttribute), entityTokenType);

                        var attribute = (SecurityAncestorProviderAttribute)attributes[0];

                        Verify.IsNotNull(attribute.SecurityAncestorProviderType, "Security ancestor provider type can not be null on the entity token {0}", entityTokenType);
                        Verify.That(typeof(ISecurityAncestorProvider).IsAssignableFrom(attribute.SecurityAncestorProviderType), "Security ancestor provider '{0}' should implement the interface '{1}'", attribute.SecurityAncestorProviderType, typeof(ISecurityAncestorProvider));

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
                _securityAncestorProviderCache = new Hashtable<Type, ISecurityAncestorProvider>();
            }
        }



        private static void OnFlush(FlushEventArgs args)
        {
            Flush();
        }
    }
}
