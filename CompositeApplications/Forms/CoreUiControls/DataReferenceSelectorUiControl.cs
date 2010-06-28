using System.ComponentModel;

using Composite.Data;
using Composite.Forms.Foundation;
using System;


namespace Composite.Forms.CoreUiControls
{
    [DefaultBindingProperty("Selected")]
    internal class DataReferenceSelectorUiControl : UiControl
    {
        private object _selected = null;

        [BindableProperty()]
        [FormsProperty()]
        public object Selected 
        { 
            get
            {
                if (_selected == null)
                    return null;

                if (_selected is IDataReference)
                    return _selected;

                if (this.DataType==null)
                    throw new InvalidOperationException("'DataType' property have on been initialized. Unable to convert to IDataReference");

                return DataReferenceFacade.BuildDataReference(this.DataType, _selected);
            }
            set
            {
                _selected = value;
            }
        }



        [RequiredValue()]
        [FormsProperty()]
        public Type DataType { get; set; }

    }
}
