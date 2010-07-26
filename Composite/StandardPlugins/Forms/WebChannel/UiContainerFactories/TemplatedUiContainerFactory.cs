using System.Configuration;
using Composite.Forms.Flows;
using Composite.Forms.Flows.Plugins.UiContainerFactory;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.StandardPlugins.Forms.WebChannel.UiContainerFactories
{
    [ConfigurationElementType(typeof(TemplatedUiContainerFactoryData))]
    internal sealed class TemplatedUiContainerFactory : Base.BaseTemplatedUiContainerFactory
    {
        private TemplatedUiContainerFactoryData _data;

        public TemplatedUiContainerFactory(TemplatedUiContainerFactoryData data)
            : base(data)
        {
            _data = data;
        }


        public override IUiContainer CreateContainer()
        {
            return new TemplatedUiContainer(this.UserControlType, _data.TemplateFormVirtualPath);
        }
    }


    [Assembler(typeof(TemplatedUiContainerFactoryAssembler))]
    internal sealed class TemplatedUiContainerFactoryData : UiContainerFactoryData, Base.ITemplatedUiContainerFactoryData
    {
        private const string _cacheCompiledUserControlTypePropertyName = "cacheCompiledUserControlType";

        [ConfigurationProperty(_cacheCompiledUserControlTypePropertyName, IsRequired = false, DefaultValue = true)]
        public bool CacheCompiledUserControlType
        {
            get { return (bool)base[_cacheCompiledUserControlTypePropertyName]; }
            set { base[_cacheCompiledUserControlTypePropertyName] = value; }
        }
    }


    internal sealed class TemplatedUiContainerFactoryAssembler : IAssembler<IUiContainerFactory, UiContainerFactoryData>
    {
        public IUiContainerFactory Assemble(IBuilderContext context, UiContainerFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedUiContainerFactory(objectConfiguration as TemplatedUiContainerFactoryData);
        }
    }
}
