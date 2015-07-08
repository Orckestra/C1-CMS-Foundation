using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Web.UI;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core.Extensions;
using Composite.Plugins.Forms.WebChannel.Foundation;
using Composite.Core.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;
using System.Xml.Linq;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{

    /// <exclude />
    public class KeyLabelPair
    {
        /// <exclude />
        public KeyLabelPair(string key, string label)
        {
            this.Key = key;
            this.Label = label;
        }

        /// <exclude />
        public string Key { get; set; }

        /// <exclude />
        public string Label { get; set; }
    }



    /////////////////////////////////


    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public abstract class SelectorTemplateUserControlBase : UserControl
    {
        private Dictionary<string, object> _selectorObjects = null;
        private List<KeyLabelPair> _keyLabelPairList = null;
        private List<string> _selectedAsStrings = null;
        private List<object> _selectedObjects = null;
        private EventHandler _changeEventHandler;

        private const string _noneSelectionKey = "***C1.NONE***";

        /// <exclude />
        protected abstract void BindStateToProperties();

        /// <exclude />
        protected abstract void InitializeViewState();


        /// <exclude />
        public abstract string GetDataFieldClientName();


        /// <exclude />
        public string FormControlLabel { get; set; }

        /// <exclude />
        public bool Required { get; set; }

        /// <exclude />
        public bool MultiSelector { get; set; }

        /// <exclude />
        public bool CompactMode { get; set; }

        /// <exclude />
        public bool ReadOnly { get; set; }


        internal string OptionsKeyField { get; set; }
        internal string OptionsLabelField { get; set; }
        internal IEnumerable Options { get; set; }
        internal SelectorBindingType BindingType { get; set; }


        /// <exclude />
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
            Verify.IsFalse(selectedAsStrings.Any(s => s == null), "One of the selected keys is null");

            InitializeSelectorElements();


            this.SelectedObjects = new List<object>();


            bool bindToObject = (this.BindingType == SelectorBindingType.BindToObject)
                                || (this.BindingType == SelectorBindingType.BindToKeyFieldValue 
                                    && (this.OptionsKeyField == "." || this.OptionsKeyField == ""));

            if (bindToObject)
            {
                foreach (string selectedAsString in selectedAsStrings.Where(_selectorObjects.ContainsKey))
                {
                    this.SelectedObjects.Add(_selectorObjects[selectedAsString]);
                }
                return;
            }

            if (this.BindingType == SelectorBindingType.BindToKeyFieldValue)
            {
                foreach (string selectedAsString in selectedAsStrings)
                {
                    if (selectedAsString != _noneSelectionKey)
                    {
                        if (_selectorObjects.ContainsKey(selectedAsString))
                        {
                            object key;

                            var @object = _selectorObjects[selectedAsString];

                            if (@object is XElement)
                            {
                                key = (@object as XElement).Attribute(this.OptionsKeyField).Value;
                            }
                            else
                            {
                                PropertyInfo keyPropertyInfo = @object.GetType().GetProperty(this.OptionsKeyField);
                                key = keyPropertyInfo.GetValue(@object, null);
                            }

                            this.SelectedObjects.Add(key);
                        }
                    }
                }

                return;
            }

            throw new InvalidOperationException("Unknown binding type");
        }

        
        internal void InitializeWebViewState()
        {
            this.InitializeViewState();
        }



        /// <exclude />
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


        /// <exclude />
        protected List<KeyLabelPair> GetOptions()
        {
            InitializeSelectorElements();

            return _keyLabelPairList;
        }


        private void InitializeSelectorElements()
        {
            if (_selectorObjects != null) return;

            if (Options is IEnumerable<XElement>)
            {
                Verify.That(OptionsKeyField != "" && OptionsKeyField != ".", "Key attribute name is not defined");
                Verify.That(OptionsLabelField != "" && OptionsLabelField != ".", "Label attribute name is not defined");
            }

            _selectorObjects = new Dictionary<string, object>();
            _keyLabelPairList = new List<KeyLabelPair>();

            if (!Required && !MultiSelector)
            {
                _keyLabelPairList.Add(new KeyLabelPair(_noneSelectionKey, "<NONE>"));
            }

            PropertyInfo keyPropertyInfo = null;
            PropertyInfo labelPropertyInfo = null;

            Type lastOptionObjectType = null;

            IEnumerator optionsEnumerator = Options.GetEnumerator();
            while (optionsEnumerator.MoveNext())
            {
                object optionObject = optionsEnumerator.Current;

                string label, uniqueKey;

                if (Options is IEnumerable<XElement>)
                {
                    XElement element = (XElement) optionObject;

                    var keyAttr = element.Attribute(this.OptionsKeyField);
                    var labelAttr = element.Attribute(this.OptionsLabelField);

                    Verify.IsNotNull(keyAttr, "XElement missing attribute '{0}'", this.OptionsKeyField);
                    Verify.IsNotNull(labelAttr, "XElement missing attribute '{0}'", this.OptionsLabelField);

                    uniqueKey = keyAttr.Value;
                    label = labelAttr.Value;
                }
                else
                {
                    object keyObject = GetPropertyValue(optionObject, this.OptionsKeyField, ref lastOptionObjectType, ref keyPropertyInfo);
                    object labelObject = GetPropertyValue(optionObject, this.OptionsLabelField, ref lastOptionObjectType, ref labelPropertyInfo);
                    
                    // TODO: ValueTypeConverter.Convert<string>(keyObject) should be used
                    uniqueKey = (keyObject is Type) ? TypeManager.SerializeType((Type)keyObject) : keyObject.ToString();
                    label = labelObject.ToString();
                }

                _keyLabelPairList.Add(new KeyLabelPair(uniqueKey, label));

                Verify.IsFalse(_selectorObjects.ContainsKey(uniqueKey), "Key '{0}' appears more than one time".FormatWith(uniqueKey ?? string.Empty));

                _selectorObjects.Add(uniqueKey, optionObject);
            }
        }

        private object GetPropertyValue(object @object, string propertyName, ref Type lastOptionObjectType, ref PropertyInfo lastUsedPropertyInfo)
        {
            if (propertyName == "." || propertyName == "")
            {
                return @object;
            }

            if (@object.GetType() != lastOptionObjectType)
            {
                lastOptionObjectType = @object.GetType();
                lastUsedPropertyInfo = null;
            }

            if (lastUsedPropertyInfo == null)
            {
                lastUsedPropertyInfo = lastOptionObjectType.GetProperty(propertyName);
                Verify.IsNotNull(lastUsedPropertyInfo, "Malformed Selection configuration. The Selected binding type '{0}' does not have a property named '{1}", @object.GetType().FullName, propertyName);
            }

            return lastUsedPropertyInfo.GetValue(@object, null).ToString();
        }

        /// <exclude />
        public class KeyLabelPair
        {
            /// <exclude />
            public KeyLabelPair(string key, string label)
            {
                this.Key = key;
                this.Label = label;
            }

            /// <exclude />
            public string Key { get; set; }

            /// <exclude />
            public string Label { get; set; }
        }
    }


    internal sealed class TemplatedSelectorUiControl : SelectorUiControl, IWebUiControl
    {
        private readonly Type _userControlType;
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
            _userControl.ReadOnly = this.ReadOnly;
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
                if (string.IsNullOrEmpty(this.SelectedAsString) == false)
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