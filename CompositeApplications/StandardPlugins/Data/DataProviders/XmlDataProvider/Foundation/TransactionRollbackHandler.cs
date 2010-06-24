using System.Threading;
using System.Transactions;
using Composite.Logging;

namespace Composite.StandardPlugins.Data.DataProviders.XmlDataProvider.Foundation
{
    internal class TransactionRollbackHandler : IEnlistmentNotification
    {
        private ThreadStart _onRollback;

        public TransactionRollbackHandler(ThreadStart onRollback)
        {
            _onRollback = onRollback;
        }

        public void Commit(Enlistment enlistment)
        {
            enlistment.Done();
        }


        public void InDoubt(Enlistment enlistment)
        {
            enlistment.Done();
        }


        public void Prepare(PreparingEnlistment preparingEnlistment)
        {
            preparingEnlistment.Prepared();
        }


        public void Rollback(Enlistment enlistment)
        {
            _onRollback();

            enlistment.Done();
        }
    }
}
