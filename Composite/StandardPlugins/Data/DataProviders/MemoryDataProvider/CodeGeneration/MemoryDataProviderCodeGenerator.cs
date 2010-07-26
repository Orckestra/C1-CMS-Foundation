using System;
using System.CodeDom;
using System.Collections.Generic;
using Composite.StandardPlugins.Data.DataProviders.MemoryDataProvider.CodeGeneration.Foundation;
using Composite.StandardPlugins.Data.DataProviders.MemoryDataProvider.Foundation;
using Composite.Types;


namespace Composite.StandardPlugins.Data.DataProviders.MemoryDataProvider.CodeGeneration
{
    internal sealed class MemoryDataProviderCodeGenerator
    {
        private static readonly string _namespaceNamePrefix = "Composite.Data.GeneratedTypes.MemoryDataProviderHelpers";

        private string _providerName;
        private IEnumerable<MemoryEntityData> _memoryEntityDatas;

        private string _namespaceName;


        public MemoryDataProviderCodeGenerator(string providerName, IEnumerable<MemoryEntityData> memoryEntityDatas)
        {
            _providerName = providerName;
            _memoryEntityDatas = memoryEntityDatas;

            _namespaceName = string.Format("{0}{1}", _namespaceNamePrefix, _providerName);
        }



        public void Generate()
        {
            foreach (MemoryEntityData memoryEntityData in _memoryEntityDatas)
            {
                memoryEntityData.KeyClassName = string.Format("{0}Key", memoryEntityData.InterfaceType.Name);
                memoryEntityData.WrapperClassName = string.Format("{0}Wrapper", memoryEntityData.InterfaceType.Name);
                memoryEntityData.EntityClassName = string.Format("{0}Entity", memoryEntityData.InterfaceType.Name);
                memoryEntityData.DataIdClassName = string.Format("{0}DataId", memoryEntityData.InterfaceType.Name);
            }


            BuildManagerCompileUnit buildManagerCompileUnit = new BuildManagerCompileUnit(_providerName, "");
            buildManagerCompileUnit.IsCacheble = true;


            buildManagerCompileUnit.AddTypes(_namespaceName, CreateKeyClasses());
            buildManagerCompileUnit.AddTypes(_namespaceName, CreateWrapperClasses());
            buildManagerCompileUnit.AddTypes(_namespaceName, CreateEntityClasses());
            buildManagerCompileUnit.AddTypes(_namespaceName, CreateDataIdClasses());

            buildManagerCompileUnit.AddAssemblyReference(typeof(System.Linq.IQueryable).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Linq.ExpressionCreator).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Types.ExtendedNullable<>).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Data.DataSourceId).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Data.ProcessControlled.IProcessControlled).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.StandardPlugins.Data.DataProviders.MemoryDataProvider.MemoryDataProvider).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.StandardPlugins.Data.DataProviders.MemoryDataProvider.Foundation.IMemoryEntityKey).Assembly);


            foreach (MemoryEntityData memoryEntityData in _memoryEntityDatas)
            {
                buildManagerCompileUnit.AddAssemblyReference(memoryEntityData.InterfaceType.Assembly);

                foreach (Type interfaceSuperType in memoryEntityData.InterfaceType.GetInterfaces())
                {
                    buildManagerCompileUnit.AddAssemblyReference(interfaceSuperType.Assembly);
                }
            }

            BuildManager.GetCompiledTypes(buildManagerCompileUnit);


            foreach (MemoryEntityData memoryEntityData in _memoryEntityDatas)
            {
                memoryEntityData.KeyClassType = buildManagerCompileUnit.GetGeneretedTypeByName(memoryEntityData.KeyClassName);

                memoryEntityData.WrapperClassType = buildManagerCompileUnit.GetGeneretedTypeByName(memoryEntityData.WrapperClassName);

                memoryEntityData.EntityClassType = buildManagerCompileUnit.GetGeneretedTypeByName(memoryEntityData.EntityClassName);

                memoryEntityData.DataIdClassType = buildManagerCompileUnit.GetGeneretedTypeByName(memoryEntityData.DataIdClassName);
            }
        }



        private IEnumerable<KeyValuePair<string, Func<CodeTypeDeclaration>>> CreateKeyClasses()
        {
            foreach (MemoryEntityData memoryEntityData in _memoryEntityDatas)
            {
                EntityKeyClassGenerator entityKeyClassGenerator = new EntityKeyClassGenerator(memoryEntityData);

                IEnumerable<KeyValuePair<string, Func<CodeTypeDeclaration>>> generatedClasses = entityKeyClassGenerator.CreateClasses();

                foreach (KeyValuePair<string, Func<CodeTypeDeclaration>> codeTypeDeclarationFunc in generatedClasses)
                {
                    yield return codeTypeDeclarationFunc;
                }
            }
        }



        private IEnumerable<KeyValuePair<string, Func<CodeTypeDeclaration>>> CreateWrapperClasses()
        {
            foreach (MemoryEntityData memoryEntityData in _memoryEntityDatas)
            {
                WrapperClassGenerator wrapperClassGenerator = new WrapperClassGenerator(memoryEntityData);

                yield return new KeyValuePair<string, Func<CodeTypeDeclaration>>(memoryEntityData.WrapperClassName, () => wrapperClassGenerator.CreateClass());
            }
        }



        private IEnumerable<KeyValuePair<string, Func<CodeTypeDeclaration>>> CreateEntityClasses()
        {
            foreach (MemoryEntityData memoryEntityData in _memoryEntityDatas)
            {
                EntityClassGenerator entityClassGenerator = new EntityClassGenerator(memoryEntityData);

                yield return new KeyValuePair<string, Func<CodeTypeDeclaration>>(memoryEntityData.EntityClassName, () => entityClassGenerator.CreateClass());
            }
        }



        private IEnumerable<KeyValuePair<string, Func<CodeTypeDeclaration>>> CreateDataIdClasses()
        {
            foreach (MemoryEntityData memoryEntityData in _memoryEntityDatas)
            {
                DataIdClassGenerator dataIdClassGenerator = new DataIdClassGenerator(memoryEntityData);

                yield return new KeyValuePair<string, Func<CodeTypeDeclaration>>(memoryEntityData.DataIdClassName, () => dataIdClassGenerator.CreateClass());
            }
        }
    }
}
