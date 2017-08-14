using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.UI;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Composite.Plugins.Forms.WebChannel.Foundation;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class HierarchicalSelectorTemplateUserControlBase : UserControl
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
        public IEnumerable<object> SelectedKeys { get; set; }

        /// <exclude />
        public IEnumerable<SelectionTreeNode> TreeNodes { get; set; }

        /// <exclude />
        public bool AutoSelectChildren { get; set; }

        /// <exclude />
        public bool AutoSelectParents { get; set; }

        /// <exclude />
        public bool Required { get; set; }
    }



    internal sealed class TemplatedHierarchicalSelectorUiControl : HierarchicalSelectorUiControl, IWebUiControl
    {
        private readonly Type _userControlType;
        private HierarchicalSelectorTemplateUserControlBase _userControl;

        internal TemplatedHierarchicalSelectorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();

            this.SelectedKeys = _userControl.SelectedKeys;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<HierarchicalSelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.SelectedKeys = this.SelectedKeys;
            _userControl.TreeNodes = this.TreeNodes;
            _userControl.AutoSelectChildren = this.AutoSelectChildren;
            _userControl.AutoSelectParents = this.AutoSelectParents;
            _userControl.Required = this.Required;

            return _userControl;
        }

        public bool IsFullWidthControl => false;

        public string ClientName => _userControl.GetDataFieldClientName();
    }



    [ConfigurationElementType(typeof(TemplatedHierarchicalSelectorUiControlFactoryData))]
    internal sealed class TemplatedHierarchicalSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedHierarchicalSelectorUiControlFactory(TemplatedHierarchicalSelectorUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            var control = new TemplatedHierarchicalSelectorUiControl(this.UserControlType);

            return control;
        }
    }



    [Assembler(typeof(TemplatedHierarchicalSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedHierarchicalSelectorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
    {
        private const string _userControlVirtualPathPropertyName = "userControlVirtualPath";
        private const string _cacheCompiledUserControlTypePropertyName = "cacheCompiledUserControlType";

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



    internal sealed class TemplatedHierarchicalSelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedHierarchicalSelectorUiControlFactory(
                objectConfiguration as TemplatedHierarchicalSelectorUiControlFactoryData);
        }
    }
}
