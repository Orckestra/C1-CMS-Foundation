using System.Collections.Generic;
using System;
using System.Linq;
using System.Web.Hosting;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Instrumentation;
using Composite.C1Console.Security.Foundation;
using Composite.C1Console.Security.Foundation.PluginFacades;
using Composite.Data;
using Composite.Core.Types;


namespace Composite.C1Console.Security
{
    internal sealed class HookingFacadeImpl : IHookingFacade
    {
        private event HookingFacade.NewElementProviderRootEntitiesDelegate _newElementProviderRootEntitiesEvent;

        private EvaluatedHooks _evaluatedHooks;
        private DateTime _lastFlushDateTime = DateTime.MinValue;

        private bool _isInitializing;
        private Dictionary<string, DirtyHooksCallbackDelegate> _dirtyHooksCallbackDelegates = new Dictionary<string, DirtyHooksCallbackDelegate>();

        private readonly object _lock = new object();

        private readonly object _changesQueueSyncRoot = new object();
        private readonly List<Pair<bool, EntityTokenHook>> _changesQueue = new List<Pair<bool, EntityTokenHook>>();


        private class EvaluatedHooks
        {
            public Dictionary<EntityToken, List<EntityToken>> ParentToChild = new Dictionary<EntityToken, List<EntityToken>>();
            public Dictionary<EntityToken, List<EntityToken>> ChildToParent = new Dictionary<EntityToken, List<EntityToken>>();
        }


        public void EnsureInitialization()
        {
            GetEvaluatedHooks();
        }


        private EvaluatedHooks GetEvaluatedHooks()
        {
            var evaluatedHooks = _evaluatedHooks;
            if (evaluatedHooks != null) return evaluatedHooks;

            lock (_lock)
            {
                evaluatedHooks = _evaluatedHooks;
                if (evaluatedHooks != null) return evaluatedHooks;

                Verify.IsFalse(_isInitializing, "Calling to HookingFacade while it's initializing is not allowed");
                _isInitializing = true;

                DateTime calculationTime = DateTime.Now;

                try
                {
                    ClearChangesQueue();
                    evaluatedHooks = DoInitializeFromRegistrator();


                    var dirtyHooksCallbackDelegates = _dirtyHooksCallbackDelegates;
                    if (dirtyHooksCallbackDelegates.Count > 0)
                    {
                        var delegates = new Dictionary<string, DirtyHooksCallbackDelegate>(dirtyHooksCallbackDelegates);
                        _dirtyHooksCallbackDelegates = new Dictionary<string, DirtyHooksCallbackDelegate>();

                        foreach (DirtyHooksCallbackDelegate dirtyHooksCallbackDelegate in delegates.Values)
                        {
                            try
                            {
                                dirtyHooksCallbackDelegate();
                            }
                            catch (Exception ex)
                            {
                                Log.LogError("HookingFacade", ex);
                            }
                        }
                    }

                    ApplyQueuedChanges(evaluatedHooks);

                    if (calculationTime > _lastFlushDateTime)
                    {
                        _evaluatedHooks = evaluatedHooks;
                    }

                    return evaluatedHooks;
                }
                finally
                {
                    _isInitializing = false;
                }
            }
        }


        public IEnumerable<EntityToken> GetHookies(EntityToken hook)
        {
            Verify.ArgumentNotNull(hook, "hook");
            var evaluatedHooks = GetEvaluatedHooks();

            List<EntityToken> hooks;
            return evaluatedHooks.ChildToParent.TryGetValue(hook, out hooks) ? hooks : null;
        }



        public IEnumerable<EntityToken> GetParentHookers()
        {
            var evaluatedHooks = GetEvaluatedHooks();

            return evaluatedHooks.ParentToChild.Keys;
        }



        public IEnumerable<EntityToken> GetParentToChildHooks(EntityToken parentEntityToken)
        {
            Verify.ArgumentNotNull(parentEntityToken, "parentEntityToken");

            var evaluatedHooks = GetEvaluatedHooks();

            List<EntityToken> hooks;
            return evaluatedHooks.ParentToChild.TryGetValue(parentEntityToken, out hooks) ? hooks : null;
        }



        private void RemoveHookInternal(EvaluatedHooks hooks, EntityTokenHook entityTokenHook)
        {
            Verify.ArgumentNotNull(entityTokenHook, "entityTokenHook");

            if (hooks.ParentToChild.ContainsKey(entityTokenHook.Hooker))
            {
                List<EntityToken> hookies = hooks.ParentToChild[entityTokenHook.Hooker];

                foreach (EntityToken hookie in hookies)
                {
                    hooks.ChildToParent[hookie].Remove(entityTokenHook.Hooker);

                    if (hooks.ChildToParent[hookie].Count == 0)
                    {
                        hooks.ChildToParent.Remove(hookie);
                    }
                }

                hooks.ParentToChild.Remove(entityTokenHook.Hooker);
            }
        }



        public void RemoveHooks(IEnumerable<EntityTokenHook> entityTokenHooks)
        {
            Verify.ArgumentNotNull(entityTokenHooks, "entityTokenHooks");

            lock (_changesQueueSyncRoot)
            {
                _changesQueue.AddRange(entityTokenHooks.Select(hook => new Pair<bool, EntityTokenHook>(false, hook)));
            }
        }


        private void AddHookInternal(EvaluatedHooks hooks, EntityTokenHook entityTokenHook)
        {
            Verify.ArgumentNotNull(entityTokenHook, "entityTokenHook");

            List<EntityToken> hookies;
            if (!hooks.ParentToChild.TryGetValue(entityTokenHook.Hooker, out hookies))
            {
                hooks.ParentToChild.Add(entityTokenHook.Hooker, entityTokenHook.Hookies.ToList());
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

                if (!hooks.ChildToParent.TryGetValue(hookie, out hookers))
                {
                    hookers = new List<EntityToken>();

                    hooks.ChildToParent.Add(hookie, hookers);
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
                _changesQueue.AddRange(entityTokenHooks.Select(hook => new Pair<bool, EntityTokenHook>(true, hook)));
            }
        }



        public void RegisterDirtyCallback(string id, DirtyHooksCallbackDelegate dirtyHooksCallbackDelegate)
        {
            Verify.ArgumentNotNull(dirtyHooksCallbackDelegate, "dirtyHooksCallbackDelegate");

            lock (_lock)
            {
                if (!_dirtyHooksCallbackDelegates.ContainsKey(id))
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
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

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
            _lastFlushDateTime = DateTime.Now;
            _evaluatedHooks = null;
            _dirtyHooksCallbackDelegates = new Dictionary<string, DirtyHooksCallbackDelegate>();
        }



        private EvaluatedHooks DoInitializeFromRegistrator()
        {
            var result = new EvaluatedHooks();

            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                if (HostingEnvironment.ApplicationHost.ShutdownInitiated())
                {
                    return result;
                }

                using(new LogExecutionTime("RGB(194, 252, 131)HookingFacade", "Initializing Entity Hooks"))
                using (new DataScope(DataScopeIdentifier.Administrated))
                {
                    Verify.That(GlobalInitializerFacade.SystemCoreInitialized, "Expected system core to be initialized");


                    foreach (string name in HookRegistratorRegistry.HookRegistratorPluginNames)
                    {
                        var entityTokenHooks = HookRegistratorPluginFacade.GetHooks(name);
                        
                        foreach (EntityTokenHook entityTokenHook in entityTokenHooks)
                        {
                            List<EntityToken> hookies = result.ParentToChild.GetOrAdd(entityTokenHook.Hooker, () => new List<EntityToken>());

                            hookies.AddRange(entityTokenHook.Hookies);
                        }
                    }

                    foreach (KeyValuePair<EntityToken, List<EntityToken>> kvp in result.ParentToChild)
                    {
                        foreach (EntityToken hookie in kvp.Value)
                        {
                            List<EntityToken> hookers = result.ChildToParent.GetOrAdd(hookie, () => new List<EntityToken>());

                            hookers.Add(kvp.Key);
                        }
                    }
                }
            }

            return result;
        }



        private void ClearChangesQueue()
        {
            lock (_changesQueueSyncRoot)
            {
                _changesQueue.Clear();
            }
        }



        private void ApplyQueuedChanges(EvaluatedHooks evaluatedHooks)
        {
            lock (_changesQueueSyncRoot)
            {
                foreach (Pair<bool, EntityTokenHook> change in _changesQueue)
                {
                    if (change.First)
                    {
                        AddHookInternal(evaluatedHooks, change.Second);
                    }
                    else
                    {
                        RemoveHookInternal(evaluatedHooks, change.Second);
                    }
                }

                _changesQueue.Clear();
            }
        }
    }
}
