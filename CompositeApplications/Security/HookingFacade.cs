using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Composite.Collections.Generic;
using Composite.EventSystem;
using Composite.Security.Foundation;
using Composite.Security.Foundation.PluginFacades;
using Composite.Logging;


namespace Composite.Security
{
    public delegate void DirtyHooksCallbackDelegate();


    internal static class HookingFacade
    {
        public delegate void NewElementProviderRootEntitiesDelegate(HookingFacadeEventArgs hookingFacadeEventArgs);


        private static IHookingFacade _hookingFacade = new HookingFacadeImpl();



        static HookingFacade()
        {

            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static void EnsureInitialization()
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _hookingFacade.EnsureInitialization();
            }
        }



        public static IEnumerable<EntityToken> GetHookies(EntityToken hooker)
        {
            try
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    return _hookingFacade.GetHookies(hooker);
                }
            }
            catch (Exception ex)
            {
                LoggingService.LogCritical("HookingFacade", ex);

                GlobalInitializerFacade.FatalResetTheSytem();

                throw;
            }
        }



        public static IEnumerable<EntityToken> GetParentHookers()
        {
            try
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    return _hookingFacade.GetParentHookers();
                }
            }
            catch (Exception ex)
            {
                LoggingService.LogCritical("HookingFacade", ex);

                GlobalInitializerFacade.FatalResetTheSytem();

                throw;
            }
        }



        public static IEnumerable<EntityToken> GetParentToChildHooks(EntityToken parentEntityToken)
        {
            try
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    return _hookingFacade.GetParentToChildHooks(parentEntityToken);
                }
            }
            catch (Exception ex)
            {
                LoggingService.LogCritical("HookingFacade", ex);

                GlobalInitializerFacade.FatalResetTheSytem();

                throw;
            }
        }



        public static void RemoveHook(EntityTokenHook entityTokenHook)
        {
            try
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    _hookingFacade.RemoveHook(entityTokenHook);
                }
            }
            catch (Exception ex)
            {
                LoggingService.LogCritical("HookingFacade", ex);

                GlobalInitializerFacade.FatalResetTheSytem();

                throw;
            }

        }


        public static void RemoveHooks(IEnumerable<EntityTokenHook> entityTokenHooks)
        {
            try
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    _hookingFacade.RemoveHooks(entityTokenHooks);
                }
            }
            catch (Exception ex)
            {
                LoggingService.LogCritical("HookingFacade", ex);

                GlobalInitializerFacade.FatalResetTheSytem();

                throw;
            }
        }



        public static void AddHook(EntityTokenHook entityTokenHook)
        {
            try
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    _hookingFacade.AddHook(entityTokenHook);
                }
            }
            catch (Exception ex)
            {
                LoggingService.LogCritical("HookingFacade", ex);

                GlobalInitializerFacade.FatalResetTheSytem();

                throw;
            }
        }



        public static void AddHooks(IEnumerable<EntityTokenHook> entityTokenHooks)
        {
            try
            {
                using (GlobalInitializerFacade.CoreIsInitializedScope)
                {
                    _hookingFacade.AddHooks(entityTokenHooks);
                }
            }
            catch (Exception ex)
            {
                LoggingService.LogCritical("HookingFacade", ex);

                GlobalInitializerFacade.FatalResetTheSytem();

                throw;
            }
        }


        /// <summary>
        /// Use this method to register a callback method that will be called when fully updated hooks are needed.
        /// </summary>
        /// <param name="id">
        /// The id of the callback method. This ensures that only one callback is registered
        /// for each id.
        /// </param>
        /// <param name="dirtyHooksCallbackDelegate"></param>
        public static void RegisterDirtyCallback(string id, DirtyHooksCallbackDelegate dirtyHooksCallbackDelegate)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _hookingFacade.RegisterDirtyCallback(id, dirtyHooksCallbackDelegate);
            }
        }



        public static void SubscribeToNewElementProviderRootEntitiesEvent(NewElementProviderRootEntitiesDelegate newElementProviderRootEntitiesDelegate)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _hookingFacade.SubscribeToNewElementProviderRootEntitiesEvent(newElementProviderRootEntitiesDelegate);
            }
        }



        public static void UnsubscribeFromNewElementProviderRootEntitiesEvent(NewElementProviderRootEntitiesDelegate newElementProviderRootEntitiesDelegate)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _hookingFacade.UnsubscribeFromNewElementProviderRootEntitiesEvent(newElementProviderRootEntitiesDelegate);
            }
        }



        public static void FireNewElementProviderRootEntitiesEvent(string providerName)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _hookingFacade.FireNewElementProviderRootEntitiesEvent(providerName);
            }
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _hookingFacade.Flush();
        }
    }
}
