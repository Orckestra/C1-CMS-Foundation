using System.Transactions;
using System;

namespace Composite.Data.Transactions
{
    /// <summary>
    /// Ensures C1 compiant System.Transactions.TransactionScope services.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class TransactionsFacade
	{
        /// <exclude />
        public static TimeSpan DefaultTransactionTimeout { get { return TimeSpan.FromMinutes(3); } }

        /// <exclude />
        public static IsolationLevel DefaultTransactionIsolationLevel { get { return IsolationLevel.RepeatableRead; } }


        /// <exclude />
        public static TransactionScope CreateNewScope()
        {
            return Create(false, DefaultTransactionTimeout);
        }


        /// <exclude />
        public static TransactionScope Create(bool requiresNew)
        {
            return Create(requiresNew, DefaultTransactionTimeout);
        }


        /// <exclude />
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



        /// <exclude />
        public static TransactionScope CreateNewScope(TimeSpan timeSpan)
        {
            return Create(false, timeSpan);
        }



        /// <exclude />
        public static TransactionScope SuppressTransactionScope()
        {
            return new TransactionScope(TransactionScopeOption.Suppress);
        }
    }
}
