using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Collections.Generic;
using Composite.EventSystem;
using Composite.Types;
using Composite.ResourceSystem;
using Composite.Logging;


namespace Composite.Data.ProcessControlled
{
    internal static class ProcessControllerAttributesFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitialize);


        static ProcessControllerAttributesFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static bool IsActionIgnored(Type elementProviderType, string actionTypeName)
        {
            List<string> ignoredActionTypes;

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.IgnoreActionCache.TryGetValue(elementProviderType, out ignoredActionTypes) == false)
                {
                    ignoredActionTypes =
                        (from t in elementProviderType.GetCustomAttributesRecursively<IgnoreActionAttribute>()
                         select t.ActionTypeName).Distinct().ToList();

                    _resourceLocker.Resources.IgnoreActionCache.Add(elementProviderType, ignoredActionTypes);
                }
            }

            return ignoredActionTypes.Contains(actionTypeName);
        }



        public static IActionTokenProvider GetActionTokenProvider(Type elementProviderType, string actionTypeName)
        {
            Dictionary<string, IActionTokenProvider> actionTokenProviders;

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.ActionTokenProviderCache.TryGetValue(elementProviderType, out actionTokenProviders) == false)
                {
                    actionTokenProviders = new Dictionary<string, IActionTokenProvider>();

                    var pairs =
                        (from t in elementProviderType.GetCustomAttributesRecursively<ActionTokenProviderAttribute>()
                         select new { ActionTypeName = t.ActionTypeName, ActionTokenProviderType = t.ActionTokenProviderType });

                    foreach (var pair in pairs)
                    {
                        if (actionTokenProviders.ContainsKey(pair.ActionTypeName) == false)
                        {
                            IActionTokenProvider newActionTokenProvider = (IActionTokenProvider)Activator.CreateInstance(pair.ActionTokenProviderType);

                            actionTokenProviders.Add(pair.ActionTypeName, newActionTokenProvider);
                        }
                    }

                    _resourceLocker.Resources.ActionTokenProviderCache.Add(elementProviderType, actionTokenProviders);
                }

                IActionTokenProvider actionTokenProvider;

                actionTokenProviders.TryGetValue(actionTypeName, out actionTokenProvider);

                return actionTokenProvider;
            }
        }



        public static ResourceHandle GetActionResourceHandle(Type elementProviderType, string actionTypeName)
        {
            Dictionary<string, ResourceHandle> actionResourceHandles;

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.ActionResourceHandleCache.TryGetValue(elementProviderType, out actionResourceHandles) == false)
                {
                    actionResourceHandles = new Dictionary<string, ResourceHandle>();

                    var pairs =
                        (from t in elementProviderType.GetCustomAttributesRecursively<ActionResourceHandleAttribute>()
                         select new { ActionTypeName = t.ActionTypeName, ActionResourceHandle = t.ActionResourceHandle });

                    foreach (var pair in pairs)
                    {
                        if (actionResourceHandles.ContainsKey(pair.ActionTypeName) == false)
                        {
                            actionResourceHandles.Add(pair.ActionTypeName, pair.ActionResourceHandle);
                        }
                    }

                    _resourceLocker.Resources.ActionResourceHandleCache.Add(elementProviderType, actionResourceHandles);
                }

                ResourceHandle actionResourceHandle;

                actionResourceHandles.TryGetValue(actionTypeName, out actionResourceHandle);

                return actionResourceHandle;
            }
        }



        public static IActionPermissionTypeProvider GetActionPermissionTypeProvider(Type elementProviderType, string actionTypeName)
        {
            Dictionary<string, IActionPermissionTypeProvider> actionPermissionTypeProviders;

            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.ActionPermissionTypeProviderCache.TryGetValue(elementProviderType, out actionPermissionTypeProviders) == false)
                {
                    actionPermissionTypeProviders = new Dictionary<string, IActionPermissionTypeProvider>();

                    var pairs =
                        (from t in elementProviderType.GetCustomAttributesRecursively<ActionPermissionTypeProviderAttribute>()
                         select new { ActionTypeName = t.ActionTypeName, ActionPermissionProviderType = t.ActionPermissionTypeProviderType });

                    foreach (var pair in pairs)
                    {
                        if (actionPermissionTypeProviders.ContainsKey(pair.ActionTypeName) == false)
                        {
                            IActionPermissionTypeProvider newActionPermissionTypeProvider = (IActionPermissionTypeProvider)Activator.CreateInstance(pair.ActionPermissionProviderType);

                            actionPermissionTypeProviders.Add(pair.ActionTypeName, newActionPermissionTypeProvider);
                        }
                    }

                    _resourceLocker.Resources.ActionPermissionTypeProviderCache.Add(elementProviderType, actionPermissionTypeProviders);
                }

                IActionPermissionTypeProvider actionPermissionTypeProvider;

                actionPermissionTypeProviders.TryGetValue(actionTypeName, out actionPermissionTypeProvider);

                return actionPermissionTypeProvider;
            }
        }



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private sealed class Resources
        {
            public Dictionary<Type, List<string>> IgnoreActionCache;
            public Dictionary<Type, Dictionary<string, IActionTokenProvider>> ActionTokenProviderCache;
            public Dictionary<Type, Dictionary<string, IActionPermissionTypeProvider>> ActionPermissionTypeProviderCache;
            public Dictionary<Type, Dictionary<string, ResourceHandle>> ActionResourceHandleCache;


            public static void DoInitialize(Resources resources)
            {
                resources.IgnoreActionCache = new Dictionary<Type, List<string>>();
                resources.ActionTokenProviderCache = new Dictionary<Type, Dictionary<string, IActionTokenProvider>>();
                resources.ActionPermissionTypeProviderCache = new Dictionary<Type, Dictionary<string, IActionPermissionTypeProvider>>();
                resources.ActionResourceHandleCache = new Dictionary<Type, Dictionary<string, ResourceHandle>>();
            }
        }
    }
}
