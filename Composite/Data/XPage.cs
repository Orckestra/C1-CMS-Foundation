using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using Composite.Core.Implementation;
using Composite.Core.Implementation.Pages;

namespace Composite.Data
{
#warning MRJ: Delete this file
  /*  /// <summary>
    /// An XElement that represents a page in Composite C1's site map.
    /// </summary>
    public class XPage : XElement
    {
        [SuppressMessage("Microsoft.Security", "CA2104:DoNotDeclareReadOnlyMutableReferenceTypes", Justification = "System.Xml.Linq.XName is immutable")]
        protected static readonly XName ElementName = XName.Get("Page");

        private Guid? _id;
        

        protected internal XPage(params object[] content)
            : base(ElementName)
        {
            this.Add(content);
        }

        /// <summary>
        /// Gets the id.
        /// </summary>
        /// <value>The id.</value>
        public Guid Id
        {
            get
            {
                if(_id == null)
                {
                    _id = new Guid(Attribute("Id").Value);
                }
                return _id.Value;
            }
        }

        /// <summary>
        /// Gets the title.
        /// </summary>
        /// <value>The title.</value>
        public string Title
        {
            get { return Attribute("Title").Value; }
        }

        /// <summary>
        /// Gets the menu title.
        /// </summary>
        /// <value>The menu title.</value>
        public string MenuTitle
        {
            get { return Attribute("Title").Value; }
        }

        /// <summary>
        /// Gets the URL.
        /// </summary>
        /// <value>The URL.</value>
        [SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings")]
        public string Url
        {
            get { return this.Attribute("Url").Value; }
        }

        /// <summary>
        /// Gets the URL title.
        /// </summary>
        /// <value>The URL title.</value>
        [SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings")]
        public string UrlTitle
        {
            get { return Attribute("UrlTitle").Value; }
        }

        /// <summary>
        /// Gets a friendly url. Can be null.
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1056:UriPropertiesShouldNotBeStrings")]
        public string FriendlyUrl
        {
            get
            {
                var attr = Attribute("FriendlyUrl");
                return attr != null ? attr.Value : null;
            }
        }

        /// <summary>
        /// Gets the abstract.
        /// </summary>
        /// <value>The abstract.</value>
        public string Abstract
        {
            get { return Attribute("Abstract").Value; }
        }

        /// <summary>
        /// Gets the page level. Root pages have 0 level, their children 1, ....
        /// </summary>
        /// <value>The page level.</value>
        public int Level
        {
            get
            {
                return int.Parse(this.Attribute("Depth").Value, CultureInfo.InvariantCulture);
            }
        }

        /// <summary>
        /// Gets the parent page.
        /// </summary>
        /// <value>The parent page.</value>
        public XPage ParentPage
        {
            get
            {
                return this.Parent as XPage;
            }
        }

        /// <summary>
        /// Gets the child pages.
        /// </summary>
        /// <value>The child pages.</value>
        public IEnumerable<XPage> ChildPages
        {
            get
            {
                return Elements();
            }
        }

        /// <summary>
        /// Gets the site map root node.
        /// </summary>
        public XSiteMap SiteMap
        {
            get
            {
                XElement pos = this.Parent;
                while(pos.Parent != null)
                {
                    pos = pos.Parent;
                }

                return pos as XSiteMap;
            }
        }

        /// <summary>
        /// Selects the pages.
        /// </summary>
        /// <param name="pageSelection">The page selection.</param>
        /// <returns></returns>
        public IEnumerable<XPage> SelectPages(PageSelection pageSelection)
        {
            return ImplementationContainer.GetImplementation<NavigationBase>().SelectPages(this, pageSelection);
        }

        /// <summary>
        /// Creates a new XElement that will have the same name and the same attributes as the current one.
        /// </summary>
        /// <returns></returns>
        /// <example>
        /// <code>
        /// public XElement GetChildPagesXml()
        /// {
        ///     return new XElement("ChildPages",
        ///                         from page in Navigation.CurrentPage.ChildPages
        ///                         select page.CloneElement());
        /// }
        /// </code>
        /// </example>
        public XElement CloneElement()
        {
            return new XElement(ElementName, this.Attributes().Select(attr => new XAttribute(attr)));
        }

        /// <summary>
        /// Creates a new XElement that will have the same name and the same attributes as the current one.
        /// </summary>
        /// <param name="additionalContent">Attributes and elements to be added to the new element.</param>
        /// <returns></returns>
        public virtual XElement CloneElement(params object[] additionalContent)
        {
            var result = CloneElement();
            result.Add(additionalContent);

            return result;
        }

        #region Hiding XElement methods

        public new IEnumerable<XPage> Elements()
        {
            return base.Elements().Select(element => element as XPage);
        }

        public new IEnumerable<XPage> Descendants()
        {
            return base.Descendants().Select(element => element as XPage);
        }

        public new IEnumerable<XPage> DescendantsAndSelf()
        {
            return base.DescendantsAndSelf().Select(element => element as XPage);
        }

        public new IEnumerable<XPage> ElementsAfterSelf()
        {
            return base.ElementsAfterSelf().Select(element => element as XPage);
        }

        public new IEnumerable<XPage> ElementsBeforeSelf()
        {
            return base.ElementsBeforeSelf().Select(element => element as XPage);
        }

        #endregion Hiding XElement methods
    }*/
}
