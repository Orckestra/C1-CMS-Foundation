using System;
using System.Web;
using System.Web.WebPages;
using System.Xml.Linq;
using Composite.Data;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Extensions;
using Composite.Functions;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Defines a C1 CMS razor control
    /// </summary>
	public abstract class CompositeC1WebPage : WebPage, IDisposable
	{
		private bool _disposed;
		private DataConnection _data;

        private List<IDisposable> _childPages = new List<IDisposable>();

        /// <summary>
        /// Initializes a new instance of the <see cref="CompositeC1WebPage"/> class.
        /// </summary>
        protected CompositeC1WebPage()
        {
            _data = new DataConnection();
        }

        /// <summary>
        /// Gets a <see cref="DataConnection"/> object.
        /// </summary>
        public DataConnection Data
        {
            get
            {
                var result = _data ?? (WebPageContext.Current?.Page as CompositeC1WebPage)?.Data;

                Verify.IsNotNull(result, nameof(DataConnection) + " instance has already been disposed");

                return result;
            }
        }

        /// <summary>
        /// Gets a <see cref="SitemapNavigator"/> object.
        /// </summary>
        public SitemapNavigator Sitemap => Data.SitemapNavigator;


        /// <summary>
        /// Gets the home page node.
        /// </summary>
		public PageNode HomePageNode => Sitemap.CurrentHomePageNode;


        /// <summary>
        /// Gets the current page node.
        /// </summary>
		public PageNode CurrentPageNode => Sitemap.CurrentPageNode;


        /// <summary>
        /// Includes a named Page Template Feature. Page Template Feature are managed in '~/App_Data/PageTemplateFeatures' 
        /// or via the C1 Console's Layout perspective. They contain html and functional snippets.
        /// </summary>
        /// <param name="featureName">Name of the Page Template Feature to include. Names do not include an extension.</param>
        /// <returns></returns>
        public IHtmlString PageTemplateFeature(string featureName)
        {
            return Html.C1().GetPageTemplateFeature(featureName);
        }


        /// <summary>
        /// Renders the specified XNode.
        /// </summary>
        /// <param name="xNode">The <see cref="XNode">XNode</see>.</param>
        /// <returns></returns>
        public IHtmlString Markup(XNode xNode)
        {
            return Html.C1().Markup(xNode);
        }


        /// <summary>
        /// Gets to letter ISO Language Name representing the pages language - use this like &lt;html lang="@Lang" /&gt;
        /// </summary>
        public string Lang => Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName;


	    /// <summary>
        /// Gets the function context container.
        /// </summary>
        public FunctionContextContainer FunctionContextContainer => GetFunctionContext();


	    /// <summary>
		/// Executes a C1 Function.
		/// </summary>
		/// <param name="name">Function name.</param>
		/// <returns></returns>
		public IHtmlString Function(string name)
		{
			return Function(name, null);
		}

		/// <summary>
		/// Executes a C1 Function.
		/// </summary>
		/// <param name="name">Function name.</param>
		/// <param name="parameters">The parameters.</param>
		/// <returns></returns>
		public IHtmlString Function(string name, object parameters)
		{
            return Function(name, Functions.ObjectToDictionary(parameters));
		}

		/// <summary>
		/// Executes a C1 Function.
		/// </summary>
		/// <param name="name">Function name.</param>
		/// <param name="parameters">The parameters.</param>
		/// <returns></returns>
		public IHtmlString Function(string name, IDictionary<string, object> parameters)
		{
            return Function(name, parameters, GetFunctionContext());
		}

        /// <summary>
        /// Executes a C1 Function.
        /// </summary>
        /// <param name="name">Function name.</param>
        /// <param name="parameters">The parameters.</param>
        /// <param name="functionContextContainer">The FunctionContextContainer used to execute the function.</param>
        /// <returns></returns>
        public IHtmlString Function(string name, IDictionary<string, object> parameters, FunctionContextContainer functionContextContainer)
        {
            return Html.C1().Function(name, parameters, functionContextContainer);
        }

        private FunctionContextContainer GetFunctionContext()
        {
            if (!PageData.ContainsKey(RazorHelper.PageContext_FunctionContextContainer))
            {
                return null;
            }

            return PageData[RazorHelper.PageContext_FunctionContextContainer];
        }

	    /// <exclude />
	    protected override void ConfigurePage(WebPageBase parentPage)
	    {
	        base.ConfigurePage(parentPage);

	        if (parentPage is CompositeC1WebPage parentC1Page)
	        {
	            if (parentC1Page._childPages == null)
	            {
	                parentC1Page._childPages = new List<IDisposable>();
	            }

	            parentC1Page._childPages.Add(this);
            }
	    }

	    /// <exclude />
        public override void ExecutePageHierarchy()
        {
            base.ExecutePageHierarchy();

            _data.Dispose();
            _data = null;
        }

        /// <exclude />
		public void Dispose()
		{
			Dispose(true);

#if LeakCheck
                GC.SuppressFinalize(this);
#endif
        }

        /// <exclude />
		protected virtual void Dispose(bool disposing)
		{
            if (_disposed) return;

            if (disposing)
            {
                (_childPages as IEnumerable<IDisposable>)?.Reverse().ForEach(c => c.Dispose());

                _data?.Dispose();
            }

            _disposed = true;
		}

#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~CompositeC1WebPage()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            Dispose(false);
        }
#endif
	}
}
