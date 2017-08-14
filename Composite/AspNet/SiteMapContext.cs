using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data.Types;
using Composite.Core.Caching;

namespace Composite.AspNet
{
    /// <summary>
    /// Allows switching context of SiteMap
    /// </summary>
    public class SiteMapContext: IDisposable
    {
        /// <summary>
        /// Gets the root page.
        /// </summary>
        public IPage RootPage { get; private set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="SiteMapContext"/> class.
        /// </summary>
        /// <param name="rootPage">The root page.</param>
        public SiteMapContext(IPage rootPage)
        {
            RootPage = rootPage;

            SiteMapStack.Push(this);
        }

        /// <summary>
        /// Gets the current SiteMapContext. Can be null.
        /// </summary>
        /// <value>
        /// The current context.
        /// </value>
        public static SiteMapContext Current
        {
            get
            {
                var currentStack = SiteMapStack;

                return currentStack.Any() ? currentStack.Peek() : null;
            }
        }

        /// <exclude />
        public void Dispose()
        {
            var top = SiteMapStack.Pop();
            Verify.That(object.ReferenceEquals(top, this), "SiteMapContext weren't disposed properly");
#if LeakCheck
            GC.SuppressFinalize(this);
#endif
        }

#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~SiteMapContext()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
        }
#endif


        private static Stack<SiteMapContext> SiteMapStack
        {
            get
            {
                return RequestLifetimeCache.GetCachedOrNew<Stack<SiteMapContext>>("SiteMapContext:Stack");
            }
        }

    }
}
