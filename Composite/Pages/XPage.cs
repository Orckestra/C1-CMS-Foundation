using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;
using Composite.Implementation;

namespace Composite.Pages
{
    public class XPage : XElement
    {
        protected static readonly XName ElementName = XName.Get("Page");
        protected Guid? _id;
        

        protected internal XPage(params object[] content)
            : base(ElementName)
        {
            this.Add(content);
        }

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

        public string Title
        {
            get { return Attribute("Title").Value; }
        }

        public string MenuTitle
        {
            get { return Attribute("Title").Value; }
        }

        public string URL
        {
            get { return this.Attribute("URL").Value; }
        }

        public string UrlTitle
        {
            get { return Attribute("UrlTitle").Value; }
        }

        public string FriendlyUrl
        {
            get { return Attribute("UrlTitle").Value; }
        }

        public string Abstract
        {
            get { return Attribute("Abstract").Value; }
        }

        public int Level
        {
            get
            {
                return int.Parse(this.Attribute("Depth").Value);
            }
        }

        public XPage ParentPage
        {
            get
            {
                XElement parent = this.Parent;
                return parent is XPage ? parent as XPage : null;
            }
        }

        public IEnumerable<XPage> ChildPages
        {
            get
            {
                return Elements();
            }
        }

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

        public XElement ElementClone()
        {
            return new XElement(ElementName, this.Attributes().Select(attr => new XAttribute(attr)));
        }

        public virtual XElement ElementClone(params object[] additionalContent)
        {
            var result = ElementClone();
            result.Add(additionalContent);

            return result;
        }

        public virtual TMetaData GetMeta<TMetaData>(string groupName) where TMetaData : class, IFAKEData
        {
            return ImplementationContainer.GetImplementation<NavigationBase>().GetMeta<TMetaData>(this, groupName);
        }

        public virtual IEnumerable<TPageData> GetData<TPageData>() where TPageData : class, IFAKEData
        {
            return ImplementationContainer.GetImplementation<NavigationBase>().GetData<TPageData>(this);
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
    }
}
