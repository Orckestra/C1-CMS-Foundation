using System.Collections.Generic;


namespace Composite.Security
{
	internal interface IHookingFacade
	{
        void EnsureInitialization();
        
        IEnumerable<EntityToken> GetHookies(EntityToken hooker);
        IEnumerable<EntityToken> GetParentHookers();
        IEnumerable<EntityToken> GetParentToChildHooks(EntityToken parentEntityToken);
        void RemoveHook(EntityTokenHook entityTokenHook);
        void RemoveHooks(IEnumerable<EntityTokenHook> entityTokenHooks);
        void AddHook(EntityTokenHook entityTokenHook);
        void AddHooks(IEnumerable<EntityTokenHook> entityTokenHooks);

        void RegisterDirtyCallback(string id, DirtyHooksCallbackDelegate dirtyHooksCallbackDelegate);

        void SubscribeToNewElementProviderRootEntitiesEvent(HookingFacade.NewElementProviderRootEntitiesDelegate newElementProviderRootEntitiesDelegate);
        void UnsubscribeFromNewElementProviderRootEntitiesEvent(HookingFacade.NewElementProviderRootEntitiesDelegate newElementProviderRootEntitiesDelegate);
        void FireNewElementProviderRootEntitiesEvent(string providerName);
        
        void Flush();
	}
}
