using System.Collections.Generic;


namespace Composite.C1Console.Security
{
	internal interface IHookingFacade
	{
        void EnsureInitialization();
        
        IEnumerable<EntityToken> GetHookies(EntityToken hooker);
        IEnumerable<EntityToken> GetParentHookers();
        IEnumerable<EntityToken> GetParentToChildHooks(EntityToken parentEntityToken);

        void RemoveHooks(IEnumerable<EntityTokenHook> entityTokenHooks);
        void AddHooks(IEnumerable<EntityTokenHook> entityTokenHooks);

        void RegisterDirtyCallback(string id, DirtyHooksCallbackDelegate dirtyHooksCallbackDelegate);

        void SubscribeToNewElementProviderRootEntitiesEvent(HookingFacade.NewElementProviderRootEntitiesDelegate newElementProviderRootEntitiesDelegate);
        void UnsubscribeFromNewElementProviderRootEntitiesEvent(HookingFacade.NewElementProviderRootEntitiesDelegate newElementProviderRootEntitiesDelegate);
        void FireNewElementProviderRootEntitiesEvent(string providerName);
        
        void Flush();
	}
}
