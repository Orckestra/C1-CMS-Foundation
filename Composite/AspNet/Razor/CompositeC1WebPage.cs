using System;
using System.Web.WebPages;
using Composite.Data;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Defines a composite C1 razor function
    /// </summary>
	public abstract class CompositeC1WebPage : WebPage, IDisposable
	{
		private bool _disposed;
		private DataConnection _data;

        /// <summary>
        /// Gets a <see cref="DataConnection"/> object.
        /// </summary>
		public DataConnection Data
		{
			get { return _data ?? (_data = new DataConnection()); }
		}

        /// <summary>
        /// Gets a <see cref="SitemapNavigator"/> object.
        /// </summary>
		public SitemapNavigator Sitemap
		{
			get { return Data.SitemapNavigator; }
		}

        /// <summary>
        /// Gets the home page node.
        /// </summary>
		public PageNode HomePageNode
		{
			get { return Sitemap.CurrentHomePageNode; }
		}

        /// <summary>
        /// Gets the current page node.
        /// </summary>
		public PageNode CurrentPageNode
		{
			get { return Sitemap.CurrentPageNode; }
		}

        /// <exclude />
		public void Dispose()
		{
			Dispose(true);

			GC.SuppressFinalize(this);
		}

        /// <exclude />
		protected virtual void Dispose(bool disposing)
		{
			if (!_disposed)
			{
				if (disposing)
				{
					_data.Dispose();
				}

				_disposed = true;
			}
		}

        /// <exclude />
		~CompositeC1WebPage()
		{
			Dispose(false);
		}
	}
}
