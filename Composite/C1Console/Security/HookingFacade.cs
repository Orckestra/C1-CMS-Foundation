using System;
using System.Collections.Generic;
using System.ComponentModel;
using Composite.C1Console.Events;
using Composite.Core;



namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public delegate void DirtyHooksCallbackDelegate();


    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public static class HookingFacade
    {
        /// <exclude />
        public delegate void NewElementProviderRootEntitiesDelegate(HookingFacadeEventArgs hookingFacadeEventArgs);


        private static IHookingFacade _hookingFacade = new HookingFacadeImpl();



        static HookingFacade()
        {

            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        /// <exclude />
        public static void EnsureInitialization()
        {
            _hookingFacade.EnsureInitialization();
        }



        /// <exclude />
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
                Log.LogCritical("HookingFacade", ex);

                GlobalInitializerFacade.FatalResetTheSystem();

                throw;
            }
        }



        /// <exclude />
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
                Log.LogCritical("HookingFacade", ex);

                GlobalInitializerFacade.FatalResetTheSystem();

                throw;
            }
        }



        /// <exclude />
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
                Log.LogCritical("HookingFacade", ex);

                GlobalInitializerFacade.FatalResetTheSystem();

                throw;
            }
        }



        /// <exclude />
        public static void RemoveHook(EntityTokenHook entityTokenHook)
        {
            RemoveHooks(new [] { entityTokenHook});
        }



        /// <exclude />
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
                Log.LogCritical("HookingFacade", ex);

                GlobalInitializerFacade.FatalResetTheSystem();

                throw;
            }
        }



        /// <exclude />
        public static void AddHook(EntityTokenHook entityTokenHook)
        {
            AddHooks(new[] {entityTokenHook});
        }




        /// <exclude />
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
                Log.LogCritical("HookingFacade", ex);

                GlobalInitializerFacade.FatalResetTheSystem();

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
        /// <exclude />
        public static void RegisterDirtyCallback(string id, DirtyHooksCallbackDelegate dirtyHooksCallbackDelegate)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _hookingFacade.RegisterDirtyCallback(id, dirtyHooksCallbackDelegate);
            }
        }



        /// <exclude />
        public static void SubscribeToNewElementProviderRootEntitiesEvent(NewElementProviderRootEntitiesDelegate newElementProviderRootEntitiesDelegate)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _hookingFacade.SubscribeToNewElementProviderRootEntitiesEvent(newElementProviderRootEntitiesDelegate);
            }
        }



        /// <exclude />
        public static void UnsubscribeFromNewElementProviderRootEntitiesEvent(NewElementProviderRootEntitiesDelegate newElementProviderRootEntitiesDelegate)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                _hookingFacade.UnsubscribeFromNewElementProviderRootEntitiesEvent(newElementProviderRootEntitiesDelegate);
            }
        }



        /// <exclude />
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
