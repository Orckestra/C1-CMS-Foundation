using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Web.UI;
using Composite.Forms;
using Composite.Forms.CoreUiControls;
using Composite.Forms.Plugins.UiControlFactory;
using Composite.Forms.WebChannel;
using Composite.StandardPlugins.Forms.WebChannel.Foundation;
using Composite.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;



namespace Composite.StandardPlugins.Forms.WebChannel.UiControlFactories
{
    public abstract class SelectorTemplateUserControlBase : UserControl
    {
        private Dictionary<string, object> _selectorObjects = null;
        private List<KeyLabelPair> _keyLabelPairList = null;
        private List<string> _selectedAsStrings = null;
        private List<object> _selectedObjects = null;
        private EventHandler _changeEventHandler;

        private const string _noneSelectionKey = "***C1.NONE***";

        protected abstract void BindStateToProperties();
        protected abstract void InitializeViewState();

        public abstract string GetDataFieldClientName();

        public string FormControlLabel { get; set; }
        public bool Required { get; set; }
        public bool MultiSelector { get; set; }
        public bool CompactMode { get; set; }

        internal string OptionsKeyField { get; set; }
        internal string OptionsLabelField { get; set; }
        internal IEnumerable Options { get; set; }
        internal SelectorBindingType BindingType { get; set; }


        public EventHandler SelectedIndexChangedEventHandler
        {
            get { return _changeEventHandler; }
            set { _changeEventHandler = value; }
        }


        internal void BindStateToControlProperties()
        {
            InitializeSelectorElements();

            this.BindStateToProperties();

            if (_selectedAsStrings != null)
            {
                SetSelectedObjectsFromStringList(_selectedAsStrings);
            }
            else
            {
                this.SelectedObjects = new List<object>(); ;
            }
        }



        internal void SetSelectedObjectsFromStringList(IEnumerable<string> selectedAsStrings)
        {
            InitializeSelectorElements();

            foreach (string selectedAsString in selectedAsStrings)
            {
                if (selectedAsString == null)
                {
                    throw new InvalidOperationException("Selected key is null");
                }
            }

            this.SelectedObjects = new List<object>();

            switch (this.BindingType)
            {
                case SelectorBindingType.BindToObject:
                    foreach (string selectedAsString in selectedAsStrings)
                    {
                        if (selectedAsString != _noneSelectionKey && _selectorObjects.ContainsKey(selectedAsString) == true)
                        {
                            this.SelectedObjects.Add(_selectorObjects[selectedAsString]);
                        }
                    }
                    break;
                case SelectorBindingType.BindToKeyFieldValue:
                    if (this.OptionsKeyField == "." || this.OptionsKeyField == "")
                    {
                        foreach (string selectedAsString in selectedAsStrings)
                        {
                            if (selectedAsString != _noneSelectionKey && _selectorObjects.ContainsKey(selectedAsString) == true)
                            {
                                this.SelectedObjects.Add(_selectorObjects[selectedAsString]);
                            }
                        }
                    }
                    else
                    {
                        foreach (string selectedAsString in selectedAsStrings)
                        {
                            if (selectedAsString != _noneSelectionKey)
                            {
                                if (_selectorObjects.ContainsKey(selectedAsString) == true)
                                {
                                    PropertyInfo keyPropertyInfo = _selectorObjects[selectedAsString].GetType().GetProperty(this.OptionsKeyField);
                                    this.SelectedObjects.Add(keyPropertyInfo.GetValue(_selectorObjects[selectedAsString], null));
                                }
                            }
                        }
                    }
                    break;
                default:
                    throw new InvalidOperationException("Unknown binding type");
            }
        }



        internal void InitializeWebViewState()
        {
            this.InitializeViewState();
        }



        public IEnumerable<string> SelectedKeys
        {
            get
            {
                if (this.SelectedObjects != null && this.SelectedObjects.Count > 0)
                {
                    _selectedAsStrings = new List<string>();

                    switch (this.BindingType)
                    {
                        case SelectorBindingType.BindToObject:
                            if (this.OptionsKeyField == "." || this.OptionsKeyField == "")
                            {
                                foreach (object selectedObject in this.SelectedObjects)
                                {
                                    _selectedAsStrings.Add(selectedObject.ToString());
                                }
                            }
                            else
                            {
                                PropertyInfo keyPropertyInfo = this.SelectedObjects.First().GetType().GetProperty(this.OptionsKeyField);
                                if (keyPropertyInfo == null) throw new InvalidOperationException(string.Format("Malformed Selection configuration. The Selected binding type '{0}' does not have a property named '{1}'", this.SelectedObjects.First().GetType(), this.OptionsKeyField));

                                foreach (object selectedObject in this.SelectedObjects)
                                {
                                    string selectedObjectKey = keyPropertyInfo.GetValue(selectedObject, null).ToString();

                                    if (_selectorObjects.ContainsKey(selectedObjectKey))
                                    {
                                        _selectedAsStrings.Add(selectedObject.ToString());
                                    }
                                }
                            }
                            break;
                        case SelectorBindingType.BindToKeyFieldValue:
                            foreach (object selectedObject in this.SelectedObjects)
                            {
                                if (selectedObject != null)
                                    _selectedAsStrings.Add(selectedObject.ToString());
                            }
                            break;
                        default:
                            throw new NotImplementedException("Unknown SelectorBindingType");
                    }

                    return _selectedAsStrings;
                }

                return new List<string>();
            }

            set
            {
                _selectedAsStrings = new List<string>(value);
            }
        }



        internal List<object> SelectedObjects
        {
            get
            {
                return _selectedObjects;
            }
            set
            {
                _selectedObjects = value;
            }
        }

        protected List<KeyLabelPair> GetOptions()
        {
            InitializeSelectorElements();

            return _keyLabelPairList;
        }


        private void InitializeSelectorElements()
        {
            if (_selectorObjects == null)
            {
                _selectorObjects = new Dictionary<string, object>();
                _keyLabelPairList = new List<KeyLabelPair>();

                IEnumerator optionsEnumerator = Options.GetEnumerator();

                PropertyInfo labelPropertyInfo = null;
                PropertyInfo keyPropertyInfo = null;

                Type lastOptionObjectType = null;

                if (this.Required == false && this.MultiSelector == false)
                {
                    _keyLabelPairList.Add(new KeyLabelPair(_noneSelectionKey, "<NONE>"));
                }

                while (optionsEnumerator.MoveNext())
                {
                    object optionObject = optionsEnumerator.Current;

                    string label = "";
                    string uniqueKey = "";

                    if (this.OptionsLabelField == "." || this.OptionsLabelField == "")
                    {
                        label = optionObject.ToString();
                    }
                    else
                    {
                        if (optionObject.GetType() != lastOptionObjectType)
                        {
                            labelPropertyInfo = optionObject.GetType().GetProperty(this.OptionsLabelField);
                            if (labelPropertyInfo == null) throw new InvalidOperationException("Malformed Selection configuration. The Selected binding type " + optionObject.GetType().FullName + " does not have a property named " + this.OptionsLabelField);
                        }

                        label = labelPropertyInfo.GetValue(optionObject, null).ToString();
                    }

                    if (this.OptionsKeyField == "." || this.OptionsKeyField == "")
                    {
                        uniqueKey = optionObject.ToString();
                    }
                    else
                    {
                        if (optionObject.GetType() != lastOptionObjectType)
                        {
                            keyPropertyInfo = optionObject.GetType().GetProperty(this.OptionsKeyField);
                            if (keyPropertyInfo == null) throw new InvalidOperationException("Malformed Selection configuration. The Selected binding type " + optionObject.GetType().FullName + " does not have a property named " + this.OptionsKeyField);
                        }

                        object keyObject = keyPropertyInfo.GetValue(optionObject, null);

                        // TODO: ValueTypeConverter.Convert<string>(keyObject) should be used
                        if(keyObject is Type)
                        {
                            uniqueKey = TypeManager.SerializeType((Type) keyObject);
                        }
                        else
                        {
                            uniqueKey = keyObject.ToString();
                        }
                    }

                    _selectorObjects.Add(uniqueKey, optionObject);
                    _keyLabelPairList.Add(new KeyLabelPair(uniqueKey, label));

                    lastOptionObjectType = optionObject.GetType();
                }
            }
        }

        public class KeyLabelPair
        {
            public KeyLabelPair(string key, string label)
            {
                this.Key = key;
                this.Label = label;
            }

            public string Key { get; set; }
            public string Label { get; set; }
        }
    }


    internal sealed class TemplatedSelectorUiControl : SelectorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private SelectorTemplateUserControlBase _userControl;


        internal TemplatedSelectorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }


        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            if (_userControl.SelectedObjects.Any())
            {
                if (_userControl.SelectedObjects.Count() > 1) throw new InvalidOperationException("Multiple elements selected. This was not expedted.");
                this.Selected = _userControl.SelectedObjects.First();
            }
            else
            {
                this.Selected = null;
            }
        }


        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<SelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.SelectedIndexChangedEventHandler += this.SelectedIndexChangedEventHandler;
            _userControl.SelectedObjects = new List<object> { this.Selected };
            _userControl.Options = this.Options;
            _userControl.OptionsLabelField = this.OptionsLabelField;
            _userControl.OptionsKeyField = this.OptionsKeyField;
            _userControl.BindingType = this.BindingType;
            _userControl.Required = this.Required;
            _userControl.MultiSelector = false;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }


    internal sealed class TemplatedMultiSelectorUiControl : MultiSelectorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private SelectorTemplateUserControlBase _userControl;


        internal TemplatedMultiSelectorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }


        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();

            if (this.Selected is IList)
            {
                IList listCopy = (IList)Activator.CreateInstance(this.Selected.GetType());
                foreach (object selectedElement in _userControl.SelectedObjects)
                {
                    listCopy.Add(selectedElement);
                }
                this.Selected = listCopy;
            }
            else
            {
                this.Selected = _userControl.SelectedObjects;
                this.SelectedAsString = string.Join(",", _userControl.SelectedKeys.ToArray());
                // add code here that populate SelectedAsString 
            }
        }


        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<SelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Options = this.Options;
            _userControl.OptionsLabelField = this.OptionsLabelField;
            _userControl.OptionsKeyField = this.OptionsKeyField;
            _userControl.BindingType = this.BindingType;
            _userControl.Required = this.Required;
            _userControl.MultiSelector = true;
            _userControl.CompactMode = this.CompactMode;

            _userControl.SelectedObjects = new List<object>();

            if (this.Selected != null)
            {
                if (string.IsNullOrEmpty(this.SelectedAsString) == false)
                {
                    throw new InvalidOperationException("Binding properties 'Selected' and 'SelectedAsString' can not be set at the same time.");
                }

                foreach (object obj in this.Selected)
                {
                    _userControl.SelectedObjects.Add(obj);
                }
            }
            else
            {
                if (string.IsNullOrEmpty(this.SelectedAsString)==false)
                {
                    _userControl.SetSelectedObjectsFromStringList(this.SelectedAsString.Split(','));
                }
            }

            return _userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }



    [ConfigurationElementType(typeof(TemplatedSelectorUiControlFactoryData))]
    internal sealed class TemplatedSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        private TemplatedSelectorUiControlFactoryData _data;

        public TemplatedSelectorUiControlFactory(TemplatedSelectorUiControlFactoryData data)
            : base(data)
        {
            _data = data;
        }

        public override IUiControl CreateControl()
        {
            if (_data.MultiSelector == false)
            {
                TemplatedSelectorUiControl control = new TemplatedSelectorUiControl(this.UserControlType);
                control.BindingType = _data.BindingType;
                return control;
            }
            else
            {
                TemplatedMultiSelectorUiControl control = new TemplatedMultiSelectorUiControl(this.UserControlType);
                control.BindingType = _data.BindingType;
                return control;
            }
        }
    }

    [Assembler(typeof(TemplatedSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedSelectorUiControlFactoryData : SelectorUiControlFactoryData, Base.ITemplatedUiControlFactoryData
    {
        private const string _userControlVirtualPathPropertyName = "userControlVirtualPath";
        private const string _cacheCompiledUserControlTypePropertyName = "cacheCompiledUserControlType";
        private const string _multiSelectorPropertyName = "MultiSelector";

        [ConfigurationProperty(_userControlVirtualPathPropertyName, IsRequired = true)]
        public string UserControlVirtualPath
        {
            get { return (string)base[_userControlVirtualPathPropertyName]; }
            set { base[_userControlVirtualPathPropertyName] = value; }
        }

        [ConfigurationProperty(_cacheCompiledUserControlTypePropertyName, IsRequired = false, DefaultValue = true)]
        public bool CacheCompiledUserControlType
        {
            get { return (bool)base[_cacheCompiledUserControlTypePropertyName]; }
            set { base[_cacheCompiledUserControlTypePropertyName] = value; }
        }

        [ConfigurationProperty(_multiSelectorPropertyName, IsRequired = false, DefaultValue = false)]
        public bool MultiSelector
        {
            get { return (bool)base[_multiSelectorPropertyName]; }
            set { base[_multiSelectorPropertyName] = value; }
        }
    }

    internal sealed class TemplatedSelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedSelectorUiControlFactory(objectConfiguration as TemplatedSelectorUiControlFactoryData);
        }
    }


}
