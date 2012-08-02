using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data.Types;

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

            if(_stack == null)
            {
                _stack = new Stack<SiteMapContext>();
            }
            _stack.Push(this);
        }

        [ThreadStatic]
        private static Stack<SiteMapContext> _stack;

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
                var currentStack = _stack;

                return currentStack == null ? null : _stack.Peek();
            }
        }

        /// <exclude />
        public void Dispose()
        {
            var top = _stack.Pop();
            Verify.That(object.ReferenceEquals(top, this), "SiteMapContext weren't disposed properly");

            // Releasing the stack reference if it is empty
            if(!_stack.Any())
            {
                _stack = null;
            }
        }
    }
}
