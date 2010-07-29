using System.Transactions;
using System;

namespace Composite.Transactions
{
    /// <summary>
    /// Ensures C1 compiant System.Transactions.TransactionScope services.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class TransactionsFacade
	{
        public static TimeSpan DefaultTransactionTimeout { get { return TimeSpan.FromMinutes(3); } }
        public static IsolationLevel DefaultTransactionIsolationLevel { get { return IsolationLevel.RepeatableRead; } }


        public static TransactionScope CreateNewScope()
        {
            return Create(false, DefaultTransactionTimeout);
        }

        public static TransactionScope Create(bool requiresNew)
        {
            return Create(requiresNew, DefaultTransactionTimeout);
        }

        public static TransactionScope Create(bool requiresNew, TimeSpan timeSpan)
        {
            IsolationLevel isolationLevel = (Transaction.Current != null ? Transaction.Current.IsolationLevel : DefaultTransactionIsolationLevel);
            
            var transOptions = new TransactionOptions
            {
                IsolationLevel = isolationLevel,
                Timeout = timeSpan
            };


            return new TransactionScope(requiresNew ? TransactionScopeOption.RequiresNew : TransactionScopeOption.Required, transOptions);
        }



        public static TransactionScope CreateNewScope(TimeSpan timeSpan)
        {
            return Create(false, timeSpan);
        }



        public static TransactionScope SuppressTransactionScope()
        {
            return new TransactionScope(TransactionScopeOption.Suppress);
        }
    }
}
