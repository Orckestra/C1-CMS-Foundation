using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.UI;
using System.Xml.Linq;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core;
using Composite.Core.IO;
using Composite.Plugins.Forms.WebChannel.Foundation;
using Composite.Data.Validation.ClientValidationRules;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class SvgIconSelectorTemplateUserControlBase : UserControl
    {
        /// <exclude />
        protected abstract void BindStateToProperties();

        /// <exclude />
        protected abstract void InitializeViewState();

        /// <exclude />
        public abstract string GetDataFieldClientName();

        internal void BindStateToControlProperties()
        {
            this.BindStateToProperties();
        }

        internal void InitializeWebViewState()
        {
            this.InitializeViewState();
        }

        /// <exclude />
        public string Selected { get; set; }

        /// <exclude />
        public Dictionary<string,string> SvgIdsOptions { get; set; }

        /// <exclude />
        public string SvgSpritePath { get; set; }

        /// <exclude />
        public string FormControlLabel { get; set; }

        /// <exclude />
        public bool Required { get; set; }

        /// <exclude />
        public List<ClientValidationRule> ClientValidationRules { get; set; }
    }



    internal sealed class TemplatedSvgIconSelectorUiControl : SvgIconSelectorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private SvgIconSelectorTemplateUserControlBase _userControl;

        internal TemplatedSvgIconSelectorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.Selected = _userControl.Selected;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<SvgIconSelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Selected = this.Selected;
            _userControl.ClientValidationRules = this.ClientValidationRules;
            _userControl.SvgSpritePath = this.SvgSpritePath;
            _userControl.Required = this.Required;
            _userControl.SvgIdsOptions = new Dictionary<string, string>();

            var pathToSvg = System.Web.HttpContext.Current.Server.MapPath(this.SvgSpritePath);
            if (C1File.Exists(pathToSvg))
            {
                var xd = XDocument.Load(pathToSvg);
                XNamespace ns = "http://www.w3.org/2000/svg";
                if (xd.Root != null)
                {
                    foreach (var el in xd.Root.Element(ns+ "defs").Elements(ns + "g"))
                    {
                        var idAttr = el.Attribute("id");
                        if (idAttr != null)
                        {
                            if (!_userControl.SvgIdsOptions.ContainsKey(idAttr.Value))
                            {
                                _userControl.SvgIdsOptions.Add(idAttr.Value, idAttr.Value);
                            }
                        }
                    }
                }
            }

            return _userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }



    [ConfigurationElementType(typeof(TemplatedSvgIconSelectorUiControlFactoryData))]
    internal sealed class TemplatedSvgIconSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        private string _configuredSvgSpritePath;

        public TemplatedSvgIconSelectorUiControlFactory(TemplatedSvgIconSelectorUiControlFactoryData data)
            : base(data)
        {
            _configuredSvgSpritePath = data.SvgSpritePath;
        }

        public override IUiControl CreateControl()
        {
            TemplatedSvgIconSelectorUiControl control = new TemplatedSvgIconSelectorUiControl(this.UserControlType);

            control.SvgSpritePath = _configuredSvgSpritePath;

            return control;
        }
    }



    [Assembler(typeof(TemplatedSvgIconSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedSvgIconSelectorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
    {
        private const string _svgSpritePathPropertyName = "svgSpritePath";
        private const string _userControlVirtualPathPropertyName = "userControlVirtualPath";
        private const string _cacheCompiledUserControlTypePropertyName = "cacheCompiledUserControlType";

        [ConfigurationProperty(_svgSpritePathPropertyName, IsRequired = false)]
        public string SvgSpritePath
        {
            get { return (string)base[_svgSpritePathPropertyName]; }
            set { base[_svgSpritePathPropertyName] = value; }
        }

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
    }



    internal sealed class TemplatedSvgIconSelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedSvgIconSelectorUiControlFactory(objectConfiguration as TemplatedSvgIconSelectorUiControlFactoryData);
        }
    }
}
