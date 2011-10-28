using System;
using System.CodeDom;
using System.Collections.Generic;
using Composite.Data.DynamicTypes;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Foundation;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    internal class SqlProviderCodeGenerator
    {
        private readonly string _providerName;


        public SqlProviderCodeGenerator(string providerName)
        {
            _providerName = providerName;
        }



        public IEnumerable<CodeTypeDeclaration> CreateCodeDOMs(DataTypeDescriptor dataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope> sqlDataTypeStoreDataScopes, out IEnumerable<Tuple<string, string>> entityClassNamesAndDataContextFieldNames)
        {
            List<CodeTypeDeclaration> result = new List<CodeTypeDeclaration>();

            string dataIdClassName = NamesCreator.MakeDataIdClassName(dataTypeDescriptor);
            string entityBaseClassName = NamesCreator.MakeEntityBaseClassName(dataTypeDescriptor);            

            DataIdClassGenerator_NEW dataIdClassGenerator = new DataIdClassGenerator_NEW(dataTypeDescriptor, dataIdClassName);
            CodeTypeDeclaration dataIdClassCodeTypeDeclaration = dataIdClassGenerator.CreateClass();
            result.Add(dataIdClassCodeTypeDeclaration);


            EntityBaseClassGenerator_NEW entityBaseClassGenerator = new EntityBaseClassGenerator_NEW(dataTypeDescriptor, entityBaseClassName, dataIdClassName, _providerName);
            CodeTypeDeclaration entityBaseClassCodeTypeDeclaration = entityBaseClassGenerator.CreateClass();
            result.Add(entityBaseClassCodeTypeDeclaration);

            List<Tuple<string, string>> outResult = new List<Tuple<string, string>>();
            foreach (SqlDataTypeStoreDataScope dataScope in sqlDataTypeStoreDataScopes)
            {
                string entityClassName = NamesCreator.MakeEntityClassName(dataTypeDescriptor, dataScope.DataScopeName, dataScope.CultureName);

                EntityClassGenerator_NEW entityClassGenerator = new EntityClassGenerator_NEW(dataTypeDescriptor, entityClassName, entityBaseClassName, dataScope.TableName, dataScope.DataScopeName, dataScope.CultureName);
                CodeTypeDeclaration entityClassCodeTypeDeclaration = entityClassGenerator.CreateClass();
                result.Add(entityClassCodeTypeDeclaration);

                string sqlDataProviderHelperClassName = NamesCreator.MakeSqlDataProviderHelperClassName(dataTypeDescriptor, dataScope.DataScopeName, dataScope.CultureName);
                string dataContextFieldName = NamesCreator.MakeDataContextFieldName(dataScope.TableName);

                SqlDataProviderHelperGenerator_NEW sqlDataProviderHelperGenerator = new SqlDataProviderHelperGenerator_NEW(dataTypeDescriptor, sqlDataProviderHelperClassName, dataIdClassName, entityClassName, dataContextFieldName);
                CodeTypeDeclaration sqlDataProviderHelperTypeDeclaration = sqlDataProviderHelperGenerator.CreateClass();
                result.Add(sqlDataProviderHelperTypeDeclaration);

                outResult.Add(new Tuple<string, string>(entityClassName, dataContextFieldName));
            }

            entityClassNamesAndDataContextFieldNames = outResult;

            return result;
        }



        public IEnumerable<Tuple<string, string>> CreateEntityClassNamesAndDataContextFieldNames(DataTypeDescriptor dataTypeDescriptor, IEnumerable<SqlDataTypeStoreDataScope> sqlDataTypeStoreDataScopes)
        {
            List<Tuple<string, string>> entityClassNamesAndDataContextFieldNames = new List<Tuple<string, string>>();

#warning MRJ: BM: Duplicate code, see above method
            foreach (SqlDataTypeStoreDataScope dataScope in sqlDataTypeStoreDataScopes)
            {
                string entityClassName = NamesCreator.MakeEntityClassName(dataTypeDescriptor, dataScope.DataScopeName, dataScope.CultureName);
                string dataContextFieldName = NamesCreator.MakeDataContextFieldName(dataScope.TableName);

                entityClassNamesAndDataContextFieldNames.Add(new Tuple<string, string>(entityClassName, dataContextFieldName));
            }

            return entityClassNamesAndDataContextFieldNames;
        }



        public IEnumerable<CodeTypeDeclaration> CreateDataContextCodeDOMs(IEnumerable<Tuple<string, string>> entityClassNamesAndDataContextFieldNames)
        {
            string dataContextClassName = NamesCreator.MakeDataContextClassName(_providerName);

            DataContextClassGenerator_NEW dataContextClassGenerator = new DataContextClassGenerator_NEW(dataContextClassName, entityClassNamesAndDataContextFieldNames);
            CodeTypeDeclaration dataContextTypeDeclaration = dataContextClassGenerator.CreateClass();
            yield return dataContextTypeDeclaration;
        }
    }
}
