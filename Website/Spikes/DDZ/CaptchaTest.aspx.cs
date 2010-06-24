using System;

namespace Composite.Spikes.DDZ
{
    public partial class CaptchaTest : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
            {
                mlvMain.SetActiveView(viewInput);
            }
        }

        protected void OnSubmit(object sender, EventArgs e)
        {
            if(Captcha1.IsValid)
            {
                Captcha1.ResetValue();

                mlvMain.SetActiveView(viewSumbitted);
            }
        }
    }
}
