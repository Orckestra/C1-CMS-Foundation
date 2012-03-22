using System.Web.UI;
using System;
using System.Web;


namespace Composite.Plugins.Forms.WebChannel.Foundation
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class UserControlUtils
    {
        /// <exclude />
        public static TBase ActivateAsUserControl<TBase>(this Type userControlType, string uniqueUserControlId)
            where TBase : UserControl
        {
            if (userControlType == null) throw new ArgumentNullException("userControlType");
            if (typeof(TBase).IsAssignableFrom(userControlType) == false) throw new ArgumentException("The specified type '" + userControlType.FullName + "' must inherit from generic argument " + typeof(TBase).FullName, "userControlType");

            Page currentPage = HttpContext.Current.Handler as Page;
            if (currentPage == null) throw new InvalidOperationException("The Current HttpContext Handler must be a System.Web.Ui.Page");

            Control templateControl = currentPage.LoadControl(userControlType, null);

            templateControl.ID = uniqueUserControlId;

            return (TBase)templateControl;
        }
    }

}