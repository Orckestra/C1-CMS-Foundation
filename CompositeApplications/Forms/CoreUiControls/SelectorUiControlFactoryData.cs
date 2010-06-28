using System;
using System.Configuration;

using Composite.Forms.Plugins.UiControlFactory;

namespace Composite.Forms.CoreUiControls
{
    internal class SelectorUiControlFactoryData : UiControlFactoryData
    {
        private const string _bindingTypePropertyName = "BindingType";
        [ConfigurationProperty(_bindingTypePropertyName, DefaultValue=SelectorBindingType.BindToObject, IsRequired=true)]
        [FormsProperty()]
        public SelectorBindingType BindingType
        {
            get { return (SelectorBindingType)base[_bindingTypePropertyName]; }
            set { base[_bindingTypePropertyName] = value; }
        }

    }
}

