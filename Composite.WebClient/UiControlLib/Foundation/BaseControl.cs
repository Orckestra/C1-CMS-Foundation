using System;
using System.Web.UI.HtmlControls;
using Composite.Extensions;


namespace Composite.WebClient.UiControlLib.Foundation
{
    /// <summary>
    /// A generic control with support for client identifiers.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class BaseControl : HtmlGenericControl
    {
        private string _clientID;

        public BaseControl(string tagName) : base(tagName)
        {
        }

        protected override void OnInit(EventArgs e)
        {
            string clientID = this.Attributes["ClientID"];
            if(clientID.IsNullOrEmpty())
            {
                clientID = Attributes["clientid"];

                if (clientID.IsNullOrEmpty())
                {
                    clientID = null;
                }
            }
            _clientID = clientID;

            base.OnInit(e);
        }

        public override string  ClientID
        {
        	get 
        	{ 
                if(_clientID != null)
                {
                    return _clientID;
                }

                if(this.ID != null)
                {
                    return base.UniqueID;
                }

        	    return null;
        	}
        }
    }
}
