using System.ComponentModel;
using Composite.Core.Types;
using Composite.Data.Foundation.PluginFacades;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    internal class XmlDataProviderCodeProvider : ICodeProvider
    {
        public string ProviderName { get; private set; }

        public XmlDataProviderCodeProvider(string providerName)
        {
            ProviderName = providerName;
        }


        public void GetCodeToCompile(CodeGenerationBuilder builder)
        {
            XmlDataProvider xmlDataProvider = (XmlDataProvider)DataProviderPluginFacade.GetDataProvider(ProviderName);

            xmlDataProvider.BuildAllCode(builder);
        }
    }
}
