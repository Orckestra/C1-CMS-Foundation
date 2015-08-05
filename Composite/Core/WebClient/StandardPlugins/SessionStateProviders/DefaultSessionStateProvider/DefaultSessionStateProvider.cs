using System;
using System.Linq;
using System.Threading;
using Composite.Data;
using Composite.Core.Logging;
using Composite.Core.WebClient.State;
using Composite.Core.Extensions;
using Composite.Core.WebClient.State.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.WebClient.SessionStateProviders.DefaultSessionStateProvider
{
    [ConfigurationElementType(typeof(SessionStateProviderData))]
    internal class DefaultSessionStateProvider : ISessionStateProvider
    {
        private static int _counter = 0;

        public void AddState<T>(Guid stateId, T value, DateTime exirationDate)
        {
            PerformCleanUpIfNeeded();

            var sessionStateEntry = DataFacade.BuildNew<ISessionStateEntry>();
            sessionStateEntry.Id = stateId;
            sessionStateEntry.ExpirationDate = exirationDate;
            sessionStateEntry.SerializedValue = SerializationUtil.Serialize(value);

            using(new DataScope(PublicationScope.Unpublished)) 
            using (Composite.Data.Transactions.TransactionsFacade.SuppressTransactionScope())
            {
                DataFacade.AddNew(sessionStateEntry);
            }
        }

        public bool TryGetState<T>(Guid stateId, out T state)
        {
            ISessionStateEntry entry = GetSessionStateEntry(stateId);

            if (entry == null)
            {
                state = default(T);
                return false;
            }

            state = SerializationUtil.Deserialize<T>(entry.SerializedValue);
            return true;
        }

        public void SetState<T>(Guid stateId, T value, DateTime expirationDate)
        {
            Verify.ArgumentNotNull(value, "value");
            Verify.ArgumentCondition(expirationDate != DateTime.MaxValue, "expirationDate", "Expiration date has to be achievable");
            Verify.ArgumentCondition(stateId != Guid.Empty, "stateId", "Guid.Empty isn't an exceptable value.");

            ISessionStateEntry entry = GetSessionStateEntry(stateId);

            if (entry == null)
            {
                AddState(stateId, value, expirationDate);
                return;
            }

            entry.SerializedValue = SerializationUtil.Serialize(value);
            entry.ExpirationDate = expirationDate;

            using (new DataScope(PublicationScope.Unpublished)) 
            using (Composite.Data.Transactions.TransactionsFacade.SuppressTransactionScope())
            {
                DataFacade.Update(entry);
            }
        }

        public void RemoveState(Guid stateId)
        {
            ISessionStateEntry entry = GetSessionStateEntry(stateId);

            if (entry == null)
            {
                return;
            }

            using (Composite.Data.Transactions.TransactionsFacade.SuppressTransactionScope())
            {
                DataFacade.Delete(entry);
            }
        }

        private static ISessionStateEntry GetSessionStateEntry(Guid stateId)
        {
            using (new DataScope(PublicationScope.Unpublished))
            {
                var queryable = DataFacade.GetData<ISessionStateEntry>();

                ISessionStateEntry entry;
                if (queryable.IsEnumerableQuery())
                {
                    entry = queryable.AsEnumerable().FirstOrDefault(row => row.Id == stateId);
                }
                else
                {
                    entry = queryable.FirstOrDefault(row => row.Id == stateId);
                }

                return entry;
            }
        }

        private static void PerformCleanUpIfNeeded()
        {
            // Performingc cleaning-up at the first time with probability 20%, and on once per every 100 calls
            int counter = Interlocked.Increment(ref _counter);
            if (counter == 1)
            {
                if(DateTime.Now.Second % 5 != 3)
                {
                    return;
                }
            }
            else if (counter % 100 != 1)
            {
                return;
            }

            CleanUpData();
        }

        private static void CleanUpData()
        {
            var now = DateTime.Now;
            try
            {
                using (new DataScope(PublicationScope.Unpublished)) 
                using (Composite.Data.Transactions.TransactionsFacade.SuppressTransactionScope())
                {
                    DataFacade.Delete<ISessionStateEntry>(entry => entry.ExpirationDate < now);
                }
            }
            catch(Exception e)
            {
                LoggingService.LogWarning(typeof(DefaultSessionStateProvider).Name, new InvalidOperationException("Failed to perform clean-up", e));
            }
        }
    }
}
