using System.ComponentModel;
using System.Web.UI;

namespace Composite.Plugins.PageTemplates.MasterPages.Controls.F
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [ControlBuilder(typeof(ParamControlBuilder))]
    public class Param : Control, IParserAccessor
    {
        private object _value;

        /// <exclude />
        [TypeConverter(typeof(StringToObjectConverter))]
        public object Value
        {
            get { return _value; }

            set
            {
                if (value is ParamObjectConverter)
                {
                    _value = ((ParamObjectConverter)value).Value;
                }
                else
                {
                    _value = value;
                }
            }

        }

        /// <exclude />
        public string Name { get; set; }


        /// <exclude />
        public Param() { }

        /// <exclude />
        public Param(string name, object value)
        {
            Name = name;
            Value = value;
        }

        /// <exclude />
        protected override void AddParsedSubObject(object obj)
        {
            if (!HasControls() && (obj is LiteralControl))
            {
                this.Value = ((LiteralControl)obj).Text;
                return;
            }
            
            base.AddParsedSubObject(obj);
        }

        /// <exclude />
        protected override void DataBindChildren()
        {
            base.DataBindChildren();

            if (Value == null)
            {
                if (Controls.Count > 0)
                {
                    var child = Controls[0];
                    if (child is DataBoundLiteralControl)
                    {
                        Value = ((DataBoundLiteralControl)child).Text;
                    }
                }
            }
        }
    }
}
