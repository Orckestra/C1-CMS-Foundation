using System;
using System.Configuration;

using Composite.C1Console.Forms.Plugins.UiControlFactory;

namespace Composite.C1Console.Forms.CoreUiControls
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

