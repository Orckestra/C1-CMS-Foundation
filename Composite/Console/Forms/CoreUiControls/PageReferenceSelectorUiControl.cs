using System.ComponentModel;

using Composite.Data;
using Composite.C1Console.Forms.Foundation;
using System;
using Composite.Data.Types;


namespace Composite.C1Console.Forms.CoreUiControls
{
    [DefaultBindingProperty("Selected")]
    internal class PageReferenceSelectorUiControl : UiControl
    {
        private DataReference<IPage> _selected = null;

        [BindableProperty()]
        [FormsProperty()]
        public DataReference<IPage> Selected 
        { 
            get
            {
                return _selected;
            }
            set
            {
                _selected = value;
            }
        }
    }
}
