using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using Composite.Data;
using Composite.Core.Parallelization.Foundation;
using Composite.Core.Threading;
using Composite.Core.Extensions;
using System.Threading.Tasks;


namespace Composite.Core.Parallelization
{
	internal static class ParallelFacade
	{
        private static bool ParralelizationPointEnabled(string parallelizationPointName)
        {
            return !ParallelizationProviderRegistry.DisabledParallelizationPoints.Any(name => name == parallelizationPointName);
        }

        public static void For(int fromInclusive, int toExclusive, Action<int> body)
        {
            For(null, fromInclusive, toExclusive, body);
        }

        public static void For(string parallelizationPointName, int fromInclusive, int toExclusive, Action<int> body)
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
                ThreadDataManagerData parentData = ThreadDataManager.Current;

                var threadWrapper = new ThreadWrapper<int>(body, parentData);

                Parallel.For(fromInclusive, toExclusive, threadWrapper.WrapperAction);
            }
            else
            {
                for (int i=fromInclusive; i < toExclusive; i++)
                {
                    body(i);
                }
            }
        }

        public static void ForEach<TSource>(string parallelizationPointName, IEnumerable<TSource> source, Action<TSource> body)
        {
            Verify.ArgumentNotNull(source, "source");

            //if (source is IndexEnumerator)
            //{
            //    int elementsCount = (source as IndexEnumerator).Count;
            //    if (elementsCount == 0) return;
            //    if (elementsCount == 1)
            //    {
            //        body(default(TSource)); // that will be 0, since IndexEnumerator is IEnumerable<int>
            //        return;
            //    }
            //} else 
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
                ThreadDataManagerData parentData = ThreadDataManager.Current;

                var threadWrapper = new ThreadWrapper<TSource>(body, parentData);

                Parallel.ForEach(source, threadWrapper.WrapperAction);
            }
            else
            {
                foreach (var s in source)
                {
                    body(s);
                }
            }
        }


        public static void ForEach<TSource>(IEnumerable<TSource> source, Action<TSource> body)
        {
            ForEach(null, source, body);
        }

        private sealed class ThreadWrapper<TSource>
        {
            private Action<TSource> _body;
            private ThreadDataManagerData _parentData;
            private CultureInfo _parentThreadLocale;
            private DataScopeIdentifier _parentThreadDataScope;
            private HttpContext _parentThreadHttpContext;

            public ThreadWrapper(Action<TSource> body, ThreadDataManagerData parentData)
            {
                _body = body;
                _parentData = parentData;

                _parentThreadLocale = LocalizationScopeManager.CurrentLocalizationScope;
                _parentThreadDataScope = DataScopeManager.CurrentDataScope;
                _parentThreadHttpContext = HttpContext.Current;
            }

            public void WrapperAction(TSource source)
            {
                var originalHttpContext = HttpContext.Current;

                bool dataScopePushed = false;
                bool languageScopePushed = false;

                using (ThreadDataManager.Initialize(_parentData))
                {
                    try
                    {
                        if (DataScopeManager.CurrentDataScope != _parentThreadDataScope)
                        {
                            DataScopeManager.PushDataScope(_parentThreadDataScope);
                            dataScopePushed = true;
                        }

                        if (LocalizationScopeManager.CurrentLocalizationScope != _parentThreadLocale)
                        {
                            LocalizationScopeManager.PushLocalizationScope(_parentThreadLocale);
                            languageScopePushed = true;
                        }

                        HttpContext.Current = _parentThreadHttpContext;

                        _body(source);
                    }
                    finally
                    {
                        HttpContext.Current = originalHttpContext;

                        if (dataScopePushed)
                        {
                            DataScopeManager.PopDataScope();
                        }
                        if (languageScopePushed)
                        {
                            LocalizationScopeManager.PopLocalizationScope();
                        }
                    }
                }
            }
        }
	}

}
