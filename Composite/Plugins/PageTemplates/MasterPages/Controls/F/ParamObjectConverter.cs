namespace Composite.Plugins.PageTemplates.MasterPages.Controls.F
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ParamObjectConverter
    {
        /// <exclude />
        public object Value { get; set; }

        /// <exclude />
        public ParamObjectConverter() { }

        /// <exclude />
        public ParamObjectConverter(string oValue)
            : this()
        {
            this.Value = oValue;
        }

        /// <exclude />
        public override string ToString()
        {
            return Value == null ? string.Empty : Value.ToString();
        }
    }
}