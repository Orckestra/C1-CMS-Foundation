using System.ComponentModel;
using System.Web.UI;
using System.Web.UI.WebControls;

using Composite.WebClient.UiControlLib.Foundation;


namespace Composite.WebClient.UiControlLib
{
    public enum DataInputType
    {
        Default,
        Integer,
        Decimal,
        Password,
        ProgrammingIdentifier,
        ProgrammingNamespace,
        ReadOnly
    }


    public class DataInput : TextBox
    {
        public DataInput()
            : base()
        {
            this.InputType = DataInputType.Default;
        }

        [Category("Appearance"), DefaultValue(""), Description("The type of data expected in this field")]
        public virtual DataInputType InputType { get; set; }

        [Category("Appearance"), DefaultValue(0), Description("The required minimum length of this field. Default is 0 (no minimum).")]
        public virtual int MinLength { get; set; }

        protected override HtmlTextWriterTag TagKey
        {
            get { return HtmlTextWriterTag.Unknown; }
        }

        protected override string TagName
        {
            get { return "ui:datainput"; }
        }

        protected override void AddAttributesToRender(HtmlTextWriter writer)
        {
            writer.AddAttribute("value", this.Text);
            writer.AddAttribute("name", this.UniqueID);

            if (this.MaxLength > 0)
            {
                writer.AddAttribute("maxlength", this.MaxLength.ToString());
            }

            if (this.MinLength > 0)
            {
                writer.AddAttribute("minlength", this.MinLength.ToString());
            }

            if (this.AutoPostBack == true)
            {
                writer.AddAttribute("callbackid", this.ClientID);
                writer.AddAttribute("onvaluechange", "this.dispatchAction ( PageBinding.ACTION_DOPOSTBACK )");
            }

            if (this.InputType != DataInputType.Default)
            {
                switch (this.InputType)
                {
                    case DataInputType.Integer:
                        writer.AddAttribute("type", "integer");
                        break;
                    case DataInputType.Decimal:
                        writer.AddAttribute("type", "number");
                        break;
                    case DataInputType.Password:
                        writer.AddAttribute("password", "true");
                        break;
                    case DataInputType.ProgrammingIdentifier:
                        writer.AddAttribute("type", "programmingidentifier");
                        break;
                    case DataInputType.ProgrammingNamespace:
                        writer.AddAttribute("type", "programmingnamespace");
                        break;
                    case DataInputType.ReadOnly:
                        writer.AddAttribute("readonly", "true");
                        break;
                    default:
                        break;
                }
            }

            this.AddClientAttributes(writer);
        }


    }
}