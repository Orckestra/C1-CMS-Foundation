using System;
using System.Collections.Generic;

using Composite.Forms.Foundation;


namespace Composite.Forms.CoreUiControls
{
    [ControlValueProperty("UiControl")]
    internal abstract class DebugUiControl : UiControl
    {
        private IUiControl _uiControl;
        private string _tagName;
        private List<BindingInformation> _bindings = new List<BindingInformation>();
        private string _sourceElementXPath;


        public IUiControl UiControl
        {
            get { return _uiControl; }
            set { _uiControl = value; }
        }

        public string TagName
        {
            get { return _tagName; }
            set { _tagName = value; }
        }

        [FormsProperty()]
        public override string Label
        {
            get
            {
                return _uiControl.Label;
            }
            set
            {
                throw new InvalidOperationException( "Debug.Label may not be assigned" );
            }
        }

        public List<BindingInformation> Bindings
        {
            get { return _bindings; }
        }

        public string SourceElementXPath
        {
            get { return _sourceElementXPath; }
            set { _sourceElementXPath = value; }
        }


        internal class BindingInformation
        {
            private string _bindingObjectName;
            private Type _bindingObjectType;
            private string _bindingPropertyName;

            public BindingInformation(string bindingObjectName, Type bindingObjectType, string bindingPropertyName)
            {
                _bindingObjectName = bindingObjectName;
                _bindingObjectType = bindingObjectType;
                _bindingPropertyName = bindingPropertyName;
            }

            public string BindingObjectName
            {
                get { return _bindingObjectName; }
            }

            public Type BindingObjectType
            {
                get { return _bindingObjectType; }
            }

            public string BindingPropertyName
            {
                get { return _bindingPropertyName; }
            }
        }
    }
}
