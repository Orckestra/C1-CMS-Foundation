using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Linq.Mapping;
using System.Linq;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.Serialization.CodeGeneration;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider.CodeGeneration.PropertyInitializer;
using Composite.Data.ProcessControlled;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    internal class SqlDataProviderCodeBuilder
    {
        private readonly CodeGenerationBuilder _codeGenerationBuilder;
        private readonly string _providerName;
        private readonly List<Tuple<string, string>> _entityClassNamesAndDataContextFieldNames = new List<Tuple<string, string>>();
        private readonly string _namespaceName;


        public SqlDataProviderCodeBuilder(string providerName, CodeGenerationBuilder codeGenerationBuilder)
        {
            _codeGenerationBuilder = codeGenerationBuilder;
            _providerName = providerName;

            _namespaceName = NamesCreator.MakeNamespaceName(providerName);

            AddCodeNamespaces();
        }



        internal void AddDataType(DataTypeDescriptor dataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope> sqlDataTypeStoreDataScopes)
        {
            IEnumerable<Tuple<string, string>> names;

            SqlProviderCodeGenerator codeGenerator = new SqlProviderCodeGenerator(_providerName);
            IEnumerable<CodeTypeDeclaration> codeTypeDeclarations = codeGenerator.CreateCodeDOMs(dataTypeDescriptor, sqlDataTypeStoreDataScopes, out names);
            codeTypeDeclarations.ForEach(f => _codeGenerationBuilder.AddType(_namespaceName, f));

            _entityClassNamesAndDataContextFieldNames.AddRange(names);

#warning MRJ: BM: This seems to be needed, but why? Is it also needed for the xml provider?
            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);
            _codeGenerationBuilder.AddReference(interfaceType.Assembly);

            // Property serializer for entity tokens and more
            string dataIdClassFullName = NamesCreator.MakeDataIdClassFullName(dataTypeDescriptor, _providerName);
            Dictionary<string, Type> serializerProperties = dataTypeDescriptor.Fields.Where(f => dataTypeDescriptor.KeyPropertyNames.Contains(f.Name)).ToDictionary(f => f.Name, f => f.InstanceType);
            PropertySerializerTypeCodeGenerator.AddPropertySerializerTypeCode(_codeGenerationBuilder, dataIdClassFullName, serializerProperties);
        }



        /// <summary>
        /// This will not add needed entity class and data context field names if the data entity class does not exist
        /// </summary>
        /// <param name="dataTypeDescriptor"></param>
        /// <param name="sqlDataTypeStoreDataScopes"></param>
        internal void AddExistingDataType(DataTypeDescriptor dataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope> sqlDataTypeStoreDataScopes)
        {
            SqlProviderCodeGenerator codeGenerator = new SqlProviderCodeGenerator(_providerName);

            IEnumerable<Tuple<string, string>> names = codeGenerator.CreateEntityClassNamesAndDataContextFieldNames(dataTypeDescriptor, sqlDataTypeStoreDataScopes);

            foreach (Tuple<string, string> name in names)
            {
                Type type = TypeManager.TryGetType(NamesCreator.MakeNamespaceName(_providerName) + "." + name.Item1);

                if (type != null)
                {
                    _codeGenerationBuilder.AddReference(type.Assembly.Location);
                    _entityClassNamesAndDataContextFieldNames.Add(name);
                }
            }
        }



        internal void AddDataContext()
        {
            SqlProviderCodeGenerator codeGenerator = new SqlProviderCodeGenerator(_providerName);
            IEnumerable<CodeTypeDeclaration> codeTypeDeclarations = codeGenerator.CreateDataContextCodeDOMs(_entityClassNamesAndDataContextFieldNames);
            codeTypeDeclarations.ForEach(f => _codeGenerationBuilder.AddType(_namespaceName, f));
        }



        private void AddCodeNamespaces()
        {
            _codeGenerationBuilder.AddReference(typeof(Exception).Assembly);
            _codeGenerationBuilder.AddReference(typeof(DbType).Assembly);
            _codeGenerationBuilder.AddReference(typeof(IQueryable).Assembly);
            _codeGenerationBuilder.AddReference(typeof(TableAttribute).Assembly);
            _codeGenerationBuilder.AddReference(typeof(IContainer).Assembly);
            _codeGenerationBuilder.AddReference(typeof(ExpressionCreator).Assembly);
            _codeGenerationBuilder.AddReference(typeof(ExtendedNullable<>).Assembly);
            _codeGenerationBuilder.AddReference(typeof(DataSourceId).Assembly);
            _codeGenerationBuilder.AddReference(typeof(IProcessControlled).Assembly);
            _codeGenerationBuilder.AddReference(typeof(SqlDataProvider).Assembly);
            _codeGenerationBuilder.AddReference(typeof(RandomGuidPropertyInitializer).Assembly);
        }
    }
}
