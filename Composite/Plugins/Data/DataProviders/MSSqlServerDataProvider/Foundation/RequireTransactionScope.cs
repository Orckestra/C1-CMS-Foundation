using System;
using System.ComponentModel;
using System.Transactions;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    internal class RequireTransactionScope : IDisposable
    {
        private TransactionScope _scope;

        public RequireTransactionScope()
        {
            if (Transaction.Current == null)
            {
                _scope = new TransactionScope();
            }
        }

        public void Complete()
        {
            if (_scope != null)
            {
                _scope.Complete();
            }
        }

        public void Dispose()
        {
            if (_scope != null)
            {
                _scope.Dispose();
            }

#if LeakCheck
            GC.SuppressFinalize(this);
#endif
        }

#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~RequireTransactionScope()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
        }
#endif
    }
}
