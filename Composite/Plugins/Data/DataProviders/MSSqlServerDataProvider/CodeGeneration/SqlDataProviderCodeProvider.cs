using System.ComponentModel;
using Composite.Core.Types;
using Composite.Data.Foundation.PluginFacades;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    internal class SqlDataProviderCodeProvider : ICodeProvider
    {
        public string ProviderName { get; private set; }

        public SqlDataProviderCodeProvider(string providerName)
        {
            ProviderName = providerName;
        }


        public void GetCodeToCompile(CodeGenerationBuilder builder)
        {
            var sqlDataProvider = (SqlDataProvider)DataProviderPluginFacade.GetDataProvider(ProviderName);

            sqlDataProvider.BuildAllCode(builder);
        }
    }
}
