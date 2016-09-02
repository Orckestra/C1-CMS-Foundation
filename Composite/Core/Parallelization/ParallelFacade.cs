using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Security.Principal;
using System.Threading;
using System.Web;
using Composite.Core.Instrumentation;
using Composite.Data;
using Composite.Core.Parallelization.Foundation;
using Composite.Core.Threading;
using Composite.Core.Extensions;
using System.Threading.Tasks;


namespace Composite.Core.Parallelization
{
    /// <summary>
    /// Allows running tasks in parallel while passing C1 data context to created tasks
    /// </summary>
	public static class ParallelFacade
	{
        private static readonly FieldInfo HttpContext_ItemsFieldInfo = typeof(HttpContext).GetField("_items", BindingFlags.NonPublic | BindingFlags.Instance);

        private static bool ParralelizationPointEnabled(string parallelizationPointName)
        {
            return !ParallelizationProviderRegistry.DisabledParallelizationPoints.Any(name => name == parallelizationPointName);
        }

        /// <summary>
        /// Executes a for (For in Visual Basic) loop in which iterations may run in parallel.
        /// </summary>
        /// <param name="fromInclusive">The start index, inclusive.</param>
        /// <param name="toExclusive">The end index, exclusive.</param>
        /// <param name="body">The delegate that is invoked once per iteration.</param>
        public static void For(int fromInclusive, int toExclusive, Action<int> body)
        {
            For(null, fromInclusive, toExclusive, body);
        }

        internal static void For(string parallelizationPointName, int fromInclusive, int toExclusive, Action<int> body)
        {
            int count = toExclusive - fromInclusive;

            if(count <= 0) return;

            if(count == 1)
            {
                body(fromInclusive);
                return;
            }

            if (ParallelizationProviderRegistry.Enabled 
                && (parallelizationPointName.IsNullOrEmpty() || ParralelizationPointEnabled(parallelizationPointName)))
            {
                EnsureHttpContextItemsCollectionIsThreadSafe();

                using (Profiler.Measure(GetPerformanceMeasureTitle(parallelizationPointName)))
                {
                    ThreadDataManagerData parentData = ThreadDataManager.Current;

                    var threadWrapper = new ThreadWrapper<int>(body, parentData);

                    PromoteThreadAbortException(() =>
                    {
                        Parallel.For(fromInclusive, toExclusive, threadWrapper.WrapperAction);
                    });
                }
            }
            else
            {
                for (int i=fromInclusive; i < toExclusive; i++)
                {
                    body(i);
                }
            }
        }

        internal static void ForEach<TSource>(string parallelizationPointName, IEnumerable<TSource> source, Action<TSource> body)
        {
            Verify.ArgumentNotNull(source, "source");

            if (source is TSource[])
            {
                int elementsCount = (source as TSource[]).Length;
                if (elementsCount == 0) return;
                if (elementsCount == 1)
                {
                    body((source as TSource[])[0]);
                    return;
                }
            } else if(source is ICollection<TSource>)
            {
                int elementsCount = (source as ICollection<TSource>).Count;
                if (elementsCount == 0) return;
                if(elementsCount == 1)
                {
                    body((source as ICollection<TSource>).First());
                    return;
                }
            }

            if (ParallelizationProviderRegistry.Enabled  
                && (string.IsNullOrEmpty(parallelizationPointName) || ParralelizationPointEnabled(parallelizationPointName)))
            {
                EnsureHttpContextItemsCollectionIsThreadSafe();

                using (Profiler.Measure(GetPerformanceMeasureTitle(parallelizationPointName)))
                {
                    ThreadDataManagerData parentData = ThreadDataManager.Current;

                    var threadWrapper = new ThreadWrapper<TSource>(body, parentData);

                    PromoteThreadAbortException(() =>
                    {
                        Parallel.ForEach(source, threadWrapper.WrapperAction);
                    });
                }
            }
            else
            {
                foreach (var s in source)
                {
                    body(s);
                }
            }
        }


        private static void EnsureHttpContextItemsCollectionIsThreadSafe()
        {
            var context = HttpContext.Current;
            if (context == null) return;

            var items = context.Items;

            if(items is Hashtable && items.GetType() == typeof(Hashtable))
            {
                object synchronizedCollection = Hashtable.Synchronized((Hashtable) items);

                HttpContext_ItemsFieldInfo?.SetValue(context, synchronizedCollection);
            }
        }

        /// <summary>
        /// Executes a foreach (For Each in Visual Basic) operation on an IEnumerable in which iterations may run in parallel.
        /// </summary>
        /// <typeparam name="TSource">The type of the data in the source.</typeparam>
        /// <param name="source">An enumerable data source.</param>
        /// <param name="body">The delegate that is invoked once per iteration.</param>
        public static void ForEach<TSource>(IEnumerable<TSource> source, Action<TSource> body)
        {
            ForEach(null, source, body);
        }

        private sealed class ThreadWrapper<TSource>
        {
            private readonly Action<TSource> _body;
            private readonly ThreadDataManagerData _parentData;
            private readonly CultureInfo _parentThreadLocale;
            private readonly DataScopeIdentifier _parentThreadDataScope;
            private readonly HttpContext _parentThreadHttpContext;
            private readonly IPrincipal _parentThreadPrincipal;

            private readonly CultureInfo _parentThreadCulture;
            private readonly CultureInfo _parentThreadUiCulture;

            public ThreadWrapper(Action<TSource> body, ThreadDataManagerData parentData)
            {
                _body = body;
                _parentData = parentData;

                _parentThreadLocale = LocalizationScopeManager.CurrentLocalizationScope;
                _parentThreadDataScope = DataScopeManager.CurrentDataScope;
                _parentThreadHttpContext = HttpContext.Current;
                _parentThreadPrincipal = Thread.CurrentPrincipal;

                var currentThread = System.Threading.Thread.CurrentThread;

                _parentThreadCulture = currentThread.CurrentCulture;
                _parentThreadUiCulture = currentThread.CurrentUICulture;
            }

            public void WrapperAction(TSource source)
            {
                var originalHttpContext = HttpContext.Current;

                bool dataScopePushed = false;
                bool languageScopePushed = false;

                var currentThread = System.Threading.Thread.CurrentThread;

                CultureInfo originalCulture = currentThread.CurrentCulture;
                CultureInfo originalUiCulture = currentThread.CurrentUICulture;
                var originalPrincipal = Thread.CurrentPrincipal;
                
                using (ThreadDataManager.Initialize(_parentData))
                {
                    try
                    {
                        DataScopeManager.EnterThreadLocal();

                        if (DataScopeManager.CurrentDataScope != _parentThreadDataScope)
                        {
                            DataScopeManager.PushDataScope(_parentThreadDataScope);
                            dataScopePushed = true;
                        }

                        LocalizationScopeManager.EnterThreadLocal();

                        if (LocalizationScopeManager.CurrentLocalizationScope != _parentThreadLocale)
                        {
                            LocalizationScopeManager.PushLocalizationScope(_parentThreadLocale);
                            languageScopePushed = true;
                        }

                        DataServiceScopeManager.EnterThreadLocal();

                        HttpContext.Current = _parentThreadHttpContext;

                        currentThread.CurrentCulture = _parentThreadCulture;
                        currentThread.CurrentUICulture = _parentThreadUiCulture;
                        Thread.CurrentPrincipal = _parentThreadPrincipal;

                        try
                        {
                            _body(source);
                        }
                        catch(ThreadAbortException threadAbort)
                        {
                            object state = threadAbort.ExceptionState;
                        
                            if(state != null)
                            {
                                Thread.ResetAbort();

                                // Throwing another exception because Thread.ResetAbort clears ThreadAbortException.ExceptionState
                                throw new RethrowableThreadAbortException(state);
                            }
                        }

                    }
                    finally
                    {
                        currentThread.CurrentCulture = originalCulture;
                        currentThread.CurrentUICulture = originalUiCulture;
                        Thread.CurrentPrincipal = originalPrincipal;

                        HttpContext.Current = originalHttpContext;

                        if (dataScopePushed)
                        {
                            DataScopeManager.PopDataScope();
                        }
                        if (languageScopePushed)
                        {
                            LocalizationScopeManager.PopLocalizationScope();
                        }

                        DataScopeManager.ExitThreadLocal();
                        LocalizationScopeManager.ExitThreadLocal();
                        DataServiceScopeManager.ExitThreadLocal();
                    }
                }
            }
        }

        private static void PromoteThreadAbortException(ThreadStart action)
        {
            try
            {
                action();
            }
            catch (AggregateException aggregateException)
            {
                var evaluatedListOfExceptions = aggregateException.Flatten().InnerExceptions.ToList();

                foreach (var innerException in evaluatedListOfExceptions)
                {
                    var threadAbort = innerException as RethrowableThreadAbortException;

                    if (threadAbort != null)
                    {
                        // ToString will mark aggregateException as handled, so TPL will not tear down the whole application
                        aggregateException.ToString();

                        threadAbort.Rethrow();
                    }
                }

                throw;
            }
        }

        private class RethrowableThreadAbortException : Exception
        {
            private object _exceptionState { get; set; }

            public RethrowableThreadAbortException(object exceptionState)
            {
                _exceptionState = exceptionState;
            }

            public void Rethrow()
            {
                Thread.CurrentThread.Abort(_exceptionState);
            }
        }

        private static string GetPerformanceMeasureTitle(string parallelizationPointName)
        {
            return (parallelizationPointName ?? "<unnamed node>") + " [parallelization point]";
        }
	}

}
