using System;
using System.Web;
using Composite.Core.Extensions;
using Composite.Core.WebClient.UiControlLib.Foundation;

namespace Composite.Core.WebClient.UiControlLib
{
    /// <summary>
    /// Generates a tag like
    /// &lt;ui:postbackdialog id="uniqueID" callbackid="uniqueCallbackID" label="Hello" tooltip="Hello Master!" handle="Composite.Management.PageSelectorDialog" value="DEFAULT VALUE!" /&gt;
    /// and persists "value" attribute.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PostBackDialog : BaseControl
    {
        private static readonly string ZipPrefix = "ZIP_";

        /// <exclude />
        protected const string DefaultSelectorTagName = "ui:postbackdialog";

        /// <exclude />
        protected const string NullableSelectorTagName = "ui:nullpostbackdialog";


        /// <exclude />
        public PostBackDialog(string emptyParameter) : base(DefaultSelectorTagName)
        {
        }


        /// <exclude />
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);

            // Persisting value from postback
            string formKey = this.Attributes["callbackid"];
            if (formKey.IsNullOrEmpty())
            {
                formKey = this.ClientID;
            }

            if (Page.IsPostBack 
                && Page.Request.Form["__EVENTTARGET"] == formKey
                || !Page.Request.Form[formKey].IsNullOrEmpty())
            {
                string postedValue = Page.Request.Form[formKey];

                Value = EncodeValue && postedValue.StartsWith(ZipPrefix)
                    ? UrlUtils.UnZipContent(postedValue.Substring(ZipPrefix.Length))
                    : HttpContext.Current.Server.UrlDecode(postedValue);
            }
        }

        /// <summary>
        /// Setting to true leads to inserting "ui:nullpostbackdatadialog" tag 
        /// </summary>
        public bool Nullable 
        {   
            get
            {
                return TagName == NullableSelectorTagName;
            } 
            set
            {
                TagName = value ? NullableSelectorTagName : DefaultSelectorTagName;
            }
        }


        /// <exclude />
        public string Value { get; set; }

        /// <exclude />
        public string DefaultValue { get; set; }

        
        /// <summary>
        /// When <value>true</value>, the values are encoded in a way it is safe to use them in url's query string
        /// </summary>
        public bool EncodeValue { get; set; }


        /// <exclude />
        protected override void RenderAttributes(System.Web.UI.HtmlTextWriter writer)
        {
        	// added for error balloons to fixitup good
        	Attributes["name"] = ClientID;
        
            if(Attributes["callbackid"].IsNullOrEmpty())
            {
                Attributes["callbackid"] = ClientID;
                Attributes["name"] = ClientID;
            }

            if (Value != null)
            {
                Attributes["value"] = EncodeValue ? (ZipPrefix + UrlUtils.ZipContent(Value)) : Value;
            }

            if (DefaultValue != null)
            {
                Attributes["defaultValue"] = EncodeValue ? (ZipPrefix + UrlUtils.ZipContent(DefaultValue)) : DefaultValue;
            }

            base.RenderAttributes(writer);
        }
    }
}
