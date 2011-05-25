using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.UI;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Composite.Plugins.Forms.WebChannel.Foundation;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;
using Composite.C1Console.Forms.Foundation;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public abstract class TemplatedDoubleKeySelectorUserControlBase : UserControl
    {
        private List<KeyLabelPair> _options = null;


        /// <exclude />
        public object FirstKey { get; set; }

        /// <exclude />
        public object SecondKey { get; set; }

        /// <exclude />
        public IEnumerable<Tuple<object, object, string>> Options { get; set; }

        /// <exclude />
        public bool Required { get; set; }


        /// <exclude />
        protected abstract void BindStateToProperties();

        /// <exclude />
        protected abstract void InitializeViewState();

        /// <exclude />
        public abstract string GetDataFieldClientName();


        internal void InitializeWebViewState()
        {
            this.InitializeViewState();
        }



        internal void BindStateToControlProperties()
        {
            this.BindStateToProperties();
        }

        /// <exclude />
        protected List<KeyLabelPair> GetOptions()
        {
            if (_options == null)
            {
                _options = new List<KeyLabelPair>();

                foreach (var tuple in Options)
                {
                    _options.Add(new KeyLabelPair(GetKey(tuple), tuple.Item3));
                }
            }

            return _options;
        }

        /// <exclude />
        protected string GetKey(Tuple<object, object, string> tuple)
        {
            return GetKey(tuple.Item1, tuple.Item2);
        }

        /// <exclude />
        protected string GetKey(object firstKey, object secondKey)
        {
            return (firstKey ?? "null") + "|" + (secondKey ?? "null");
        }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class TemplatedDoubleKeySelectorUiControl : UiControl, IWebUiControl
    {
        private Type _userControlType;
        private TemplatedDoubleKeySelectorUserControlBase _userControl;


        /// <exclude />
        [BindableProperty]
        public object FirstKey { get; set; }

        /// <exclude />
        [BindableProperty]
        public object SecondKey { get; set; }

        /// <exclude />
        [FormsProperty]
        public IEnumerable<Tuple<object, object, string>> Options { get; set; }


        /// <exclude />
        [FormsProperty]
        public bool Required { get; set; }

        /*[BindableProperty()]
        [FormsProperty()]
        public object Selected { get; set; }*/



        /// <exclude />
        public TemplatedDoubleKeySelectorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }


        /// <exclude />
        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();

            FirstKey = _userControl.FirstKey;
            SecondKey = _userControl.SecondKey;
        }


        /// <exclude />
        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        /// <exclude />
        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<TemplatedDoubleKeySelectorUserControlBase>(this.UiControlID);

            _userControl.FirstKey = this.FirstKey;
            _userControl.SecondKey = this.SecondKey;
            _userControl.Options = this.Options;
            _userControl.Required = this.Required;

            return _userControl;
        }


        /// <exclude />
        public bool IsFullWidthControl { get { return false; } }


        /// <exclude />
        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }




    [ConfigurationElementType(typeof(TemplatedDoubleKeySelectorUiControlFactoryData))]
    internal sealed class TemplatedDoubleKeySelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {                     
        private TemplatedDoubleKeySelectorUiControlFactoryData _data;

        public TemplatedDoubleKeySelectorUiControlFactory(TemplatedDoubleKeySelectorUiControlFactoryData data)
            : base(data)
        {
            _data = data;
        }

        public override IUiControl CreateControl()
        {
            return new TemplatedDoubleKeySelectorUiControl(this.UserControlType);
        }
    }




    [Assembler(typeof(TemplatedDoubleKeySelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedDoubleKeySelectorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
    {
        private const string _userControlVirtualPathPropertyName = "userControlVirtualPath";
        [ConfigurationProperty(_userControlVirtualPathPropertyName, IsRequired = true)]
        public string UserControlVirtualPath
        {
            get { return (string)base[_userControlVirtualPathPropertyName]; }
            set { base[_userControlVirtualPathPropertyName] = value; }
        }



        private const string _cacheCompiledUserControlTypePropertyName = "cacheCompiledUserControlType";
        [ConfigurationProperty(_cacheCompiledUserControlTypePropertyName, IsRequired = false, DefaultValue = true)]
        public bool CacheCompiledUserControlType
        {
            get { return (bool)base[_cacheCompiledUserControlTypePropertyName]; }
            set { base[_cacheCompiledUserControlTypePropertyName] = value; }
        }
    }



    internal sealed class TemplatedDoubleKeySelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedDoubleKeySelectorUiControlFactory(objectConfiguration as TemplatedDoubleKeySelectorUiControlFactoryData);
        }
    }
}