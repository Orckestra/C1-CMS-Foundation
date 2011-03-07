using System.Collections.Generic;
using System;
using System.Linq;
using Composite.Core.Logging;
using Composite.C1Console.Security.Foundation;
using Composite.C1Console.Security.Foundation.PluginFacades;
using Composite.Data;
using Composite.Core.Types;


namespace Composite.C1Console.Security
{
    internal sealed class HookingFacadeImpl : IHookingFacade
    {
        private event HookingFacade.NewElementProviderRootEntitiesDelegate _newElementProviderRootEntitiesEvent;

        private Dictionary<EntityToken, List<EntityToken>> _parentToChildHooks = null;
        private Dictionary<EntityToken, List<EntityToken>> _childToParentHooks = null;
        private bool _isInitialized = false;
        private bool _isInitializing = false;
        private Dictionary<string, DirtyHooksCallbackDelegate> _dirtyHooksCallbackDelegates = new Dictionary<string, DirtyHooksCallbackDelegate>();

        private object _lock = new object();

        private object _changesQueueSyncRoot = new object();
        private List<Pair<bool, EntityTokenHook>> _changesQueue = new List<Pair<bool, EntityTokenHook>>();


        public void EnsureInitialization()
        {
            if (_isInitialized == false)
            {
                lock (_lock)
                {
                    if (_isInitialized == false)
                    {
                        Verify.IsFalse(_isInitializing, "Calling to HookingFacade while it's initialalizing is not allowed");
                        _isInitializing = true;

                        try
                        {
                            if (_parentToChildHooks == null || _childToParentHooks == null)
                            {
                                ClearChangesQueue();
                                DoInitialize();
                            }

                            if (_dirtyHooksCallbackDelegates.Count > 0)
                            {
                                Dictionary<string, DirtyHooksCallbackDelegate> delegates = new Dictionary<string, DirtyHooksCallbackDelegate>(_dirtyHooksCallbackDelegates);
                                _dirtyHooksCallbackDelegates = new Dictionary<string, DirtyHooksCallbackDelegate>();

                                foreach (DirtyHooksCallbackDelegate dirtyHooksCallbackDelegate in delegates.Values)
                                {
                                    try
                                    {
                                        dirtyHooksCallbackDelegate();
                                    }
                                    catch (Exception ex)
                                    {
                                        LoggingService.LogError("HookingFacade", ex);
                                    }
                                }
                            }

                            ApplyQueuedChanges();

                            _isInitialized = true;
                        }
                        finally
                        {
                            _isInitializing = false;
                        }
                    }
                }
            }
        }



        public IEnumerable<EntityToken> GetHookies(EntityToken hooker)
        {
            if (hooker == null) throw new ArgumentNullException("hooker");

            lock (_lock)
            {
                EnsureInitialization();

                List<EntityToken> hookies;
                if (_childToParentHooks.TryGetValue(hooker, out hookies) == false)
                {
                    return null;
                }

                return hookies;
            }
        }



        public IEnumerable<EntityToken> GetParentHookers()
        {
            lock (_lock)
            {
                EnsureInitialization();

                return _parentToChildHooks.Keys.ToList();
            }
        }



        public IEnumerable<EntityToken> GetParentToChildHooks(EntityToken parentEntityToken)
        {
            if (parentEntityToken == null) throw new ArgumentNullException("parentEntityToken");

            lock (_lock)
            {
                EnsureInitialization();

                List<EntityToken> hooks;
                if (_parentToChildHooks.TryGetValue(parentEntityToken, out hooks) == false)
                {
                    return null;
                }

                return hooks;
            }
        }


        public void RemoveHook(EntityTokenHook entityTokenHook)
        {
            Verify.ArgumentNotNull(entityTokenHook, "entityTokenHook");

            lock (_changesQueueSyncRoot)
            {
                _changesQueue.Add(new Pair<bool, EntityTokenHook>(false, entityTokenHook));
            }
        }


        public void RemoveHookInternal(EntityTokenHook entityTokenHook)
        {
            Verify.ArgumentNotNull(entityTokenHook, "entityTokenHook");

            if (_parentToChildHooks.ContainsKey(entityTokenHook.Hooker) == true)
            {
                List<EntityToken> hookies = _parentToChildHooks[entityTokenHook.Hooker];

                foreach (EntityToken hookie in hookies)
                {
                    _childToParentHooks[hookie].Remove(entityTokenHook.Hooker);

                    if (_childToParentHooks[hookie].Count == 0)
                    {
                        _childToParentHooks.Remove(hookie);
                    }
                }

                _parentToChildHooks.Remove(entityTokenHook.Hooker);
            }
        }



        public void RemoveHooks(IEnumerable<EntityTokenHook> entityTokenHooks)
        {
            Verify.ArgumentNotNull(entityTokenHooks, "entityTokenHooks");

            lock (_changesQueueSyncRoot)
            {
                foreach (EntityTokenHook entityTokenHook in entityTokenHooks)
                {
                    RemoveHook(entityTokenHook);
                }
            }
        }


        public void AddHook(EntityTokenHook entityTokenHook)
        {
            Verify.ArgumentNotNull(entityTokenHook, "entityTokenHook");

            lock (_changesQueueSyncRoot)
            {
                _changesQueue.Add(new Pair<bool, EntityTokenHook>(true, entityTokenHook));
            }
        }


        private void AddHookInternal(EntityTokenHook entityTokenHook)
        {
            Verify.ArgumentNotNull(entityTokenHook, "entityTokenHook");

            List<EntityToken> hookies;
            if (_parentToChildHooks.TryGetValue(entityTokenHook.Hooker, out hookies) == false)
            {
                _parentToChildHooks.Add(entityTokenHook.Hooker, entityTokenHook.Hookies.ToList());
            }
            else
            {
                foreach (var entityToken in entityTokenHook.Hookies)
                {
                    if (!hookies.Contains(entityToken))
                    {
                        hookies.Add(entityToken);
                    }
                }
            }


            foreach (EntityToken hookie in entityTokenHook.Hookies)
            {
                List<EntityToken> hookers;

                if (_childToParentHooks.TryGetValue(hookie, out hookers) == false)
                {
                    hookers = new List<EntityToken>();

                    _childToParentHooks.Add(hookie, hookers);
                }
                else if (hookers.Contains(entityTokenHook.Hooker))
                {
                    continue;
                }

                hookers.Add(entityTokenHook.Hooker);
            }
        }



        public void AddHooks(IEnumerable<EntityTokenHook> entityTokenHooks)
        {
            Verify.ArgumentNotNull(entityTokenHooks, "entityTokenHooks");

            lock (_changesQueueSyncRoot)
            {
                foreach (EntityTokenHook entityTokenHook in entityTokenHooks)
                {
                    AddHook(entityTokenHook);
                }
            }
        }



        public void RegisterDirtyCallback(string id, DirtyHooksCallbackDelegate dirtyHooksCallbackDelegate)
        {
            if (dirtyHooksCallbackDelegate == null) throw new ArgumentNullException("dirtyHooksCallbackDelegate");

            lock (_lock)
            {
                if (_dirtyHooksCallbackDelegates.ContainsKey(id) == false)
                {
                    _dirtyHooksCallbackDelegates.Add(id, dirtyHooksCallbackDelegate);
                }
            }
        }



        public void SubscribeToNewElementProviderRootEntitiesEvent(HookingFacade.NewElementProviderRootEntitiesDelegate newElementProviderRootEntitiesDelegate)
        {
            lock (_lock)
            {
                _newElementProviderRootEntitiesEvent += newElementProviderRootEntitiesDelegate;
            }
        }



        public void UnsubscribeFromNewElementProviderRootEntitiesEvent(HookingFacade.NewElementProviderRootEntitiesDelegate newElementProviderRootEntitiesDelegate)
        {
            lock (_lock)
            {
                _newElementProviderRootEntitiesEvent -= newElementProviderRootEntitiesDelegate;
            }
        }



        public void FireNewElementProviderRootEntitiesEvent(string providerName)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            lock (_lock)
            {
                EnsureInitialization();

                HookingFacade.NewElementProviderRootEntitiesDelegate del = _newElementProviderRootEntitiesEvent;

                if (del != null)
                {
                    del(new HookingFacadeEventArgs(providerName));
                }
            }
        }



        public void Flush()
        {
            _isInitialized = false;
            _parentToChildHooks = null;
            _childToParentHooks = null;
            _dirtyHooksCallbackDelegates = new Dictionary<string, DirtyHooksCallbackDelegate>();
        }



        private void DoInitialize()
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                using (new DataScope(DataScopeIdentifier.Administrated))
                {
                    LoggingService.LogVerbose("RGB(194, 252, 131)HookingFacade", "----------========== Initializing Entity Hooks ==========----------");
                    int startTime = Environment.TickCount;

                    if (GlobalInitializerFacade.SystemCoreInitialized == false) throw new InvalidOperationException("Expected system core to be initialized");

                    _parentToChildHooks = new Dictionary<EntityToken, List<EntityToken>>();

                    foreach (string name in HookRegistratorRegistry.HookRegistratorPluginNames)
                    {
                        
                        IEnumerable<EntityTokenHook> entityTokenHooks = HookRegistratorPluginFacade.GetHooks(name);
                        

                        

                        foreach (EntityTokenHook entityTokenHook in entityTokenHooks)
                        {
                            List<EntityToken> hookies;

                            if (_parentToChildHooks.TryGetValue(entityTokenHook.Hooker, out hookies) == false)
                            {
                                hookies = new List<EntityToken>();

                                _parentToChildHooks.Add(entityTokenHook.Hooker, hookies);
                            }

                            hookies.AddRange(entityTokenHook.Hookies);
                        }
                    }


                    _childToParentHooks = new Dictionary<EntityToken, List<EntityToken>>();

                    foreach (KeyValuePair<EntityToken, List<EntityToken>> kvp in _parentToChildHooks)
                    {
                        foreach (EntityToken hookie in kvp.Value)
                        {
                            List<EntityToken> hookers;

                            if (_childToParentHooks.TryGetValue(hookie, out hookers) == false)
                            {
                                hookers = new List<EntityToken>();

                                _childToParentHooks.Add(hookie, hookers);
                            }

                            hookers.Add(kvp.Key);
                        }
                    }
                    int endTime = Environment.TickCount;
                    LoggingService.LogVerbose("RGB(194, 252, 131)HookingFacade", string.Format("----------========== Done initializing Entity Hooks ({0} ms ) ==========----------", endTime - startTime));
                }
            }
        }



        private void ClearChangesQueue()
        {
            lock (_changesQueueSyncRoot)
            {
                _changesQueue.Clear();
            }
        }



        private void ApplyQueuedChanges()
        {
            lock (_changesQueueSyncRoot)
            {
                foreach (Pair<bool, EntityTokenHook> change in _changesQueue)
                {
                    if (change.First)
                    {
                        AddHookInternal(change.Second);
                    }
                    else
                    {
                        RemoveHookInternal(change.Second);
                    }
                }

                _changesQueue.Clear();
            }
        }
    }
}
