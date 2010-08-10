using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;


namespace Composite.Security
{
    internal sealed class DataHookMapper<T>
        where T : class, IData
    {
        private EntityTokenHook _currentEntityTokenHook;

        private EntityToken ParentEntityToken { get; set; }

        public DataHookMapper(EntityToken parentEntityToken)
        {
            if (parentEntityToken == null) throw new ArgumentNullException("parentEntityToken");

            DataEventSystemFacade.SubscribeToDataAfterAdd<T>(OnDataAddedOrDeleted);
            DataEventSystemFacade.SubscribeToDataAfterMove<T>(OnDataAddedOrDeleted);
            DataEventSystemFacade.SubscribeToDataDeleted<T>(OnDataAddedOrDeleted);

            this.ParentEntityToken = parentEntityToken;
        }



        public EntityTokenHook CurrentEntityTokenHook
        {
            get
            {
                if (_currentEntityTokenHook == null)
                {
                    UpdateCurrentEntityTokenHook();
                }

                return _currentEntityTokenHook;
            }
        }



        private void UpdateCurrentEntityTokenHook()
        {
            EntityTokenHook entityTokenHook = new EntityTokenHook(this.ParentEntityToken);

            List<T> datas = DataFacade.GetData<T>().ToList();
            foreach (T data in datas)
            {
                entityTokenHook.AddHookie(data.GetDataEntityToken());
            }

            _currentEntityTokenHook = entityTokenHook;
        }



        private void OnDataAddedOrDeleted(StorageEventArgs dataEventArgs)
        {
            HookingFacade.RemoveHook(this.CurrentEntityTokenHook);

            UpdateCurrentEntityTokenHook();

            HookingFacade.AddHook(this.CurrentEntityTokenHook);
        }
    }
}
