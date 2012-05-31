using System.Web.UI;

namespace Composite.Plugins.PageTemplates.MasterPages.Controls.F
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ParamControlBuilder : ControlBuilder
    {
        /// <exclude />
        public override bool AllowWhitespaceLiterals()
        {
            return false;
        }

        /// <exclude />
        public override bool HtmlDecodeLiterals()
        {
            return true;
        }
    }
}
