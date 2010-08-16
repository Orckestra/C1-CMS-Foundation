using System;
using System.Web.UI;
using Composite.WebClient;

using CaptchaUtil = Composite.WebClient.Captcha.Captcha;

namespace Composite.Frontend.Controls
{
    public partial class Captcha : UserControl, IValidator
    {
        private string _encryptedValue;
        private bool _controlSubmitted;
        private bool _isValid;
        private string _errorMessage;

        public bool IsValid
        {
            get
            {
                (this as IValidator).Validate();
                return (this as IValidator).IsValid;
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            if(IsPostBack)
            {
                string oldValue = hdnEncryptedValue.Value;

                _controlSubmitted = !string.IsNullOrEmpty(oldValue);

                if (_controlSubmitted && CaptchaUtil.IsValid(oldValue))
                {
                    _encryptedValue = oldValue;
                }
            }

            if(_encryptedValue == null)
            {
                _encryptedValue = CaptchaUtil.CreateEncryptedValue();
            }
        }

        public void Validate()
        {
            _isValid = CaptchaUtil.IsValid(txtValue.Value, _encryptedValue);
        }

        public void ResetValue()
        {
            CaptchaUtil.RegisterUsage(_encryptedValue);
            _encryptedValue = CaptchaUtil.CreateEncryptedValue();
        }

        protected override void OnPreRender(EventArgs e)
        {
            hdnEncryptedValue.Value = _encryptedValue;

            var imageUrl = new UrlBuilder("/Renderers/Captcha.ashx");
            imageUrl["value"] = _encryptedValue;
            imgCaptcha.Src = imageUrl.ToString();

            lblInvalidValue.Attributes["style"] = (_controlSubmitted && !_isValid) ?
                "color:red" : "display: none";

            base.OnPreRender(e);
        }

        #region IValidator Members

        public string ErrorMessage
        {
            get { return _errorMessage; }
            set { _errorMessage = value; }
        }

        bool IValidator.IsValid
        {
            get { return _isValid; }
            set { _isValid = value; }
        }

        #endregion
    }
}