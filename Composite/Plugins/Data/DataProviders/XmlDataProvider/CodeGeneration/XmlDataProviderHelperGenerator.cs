using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.Plugins.DataProvider.CodeGeneration;
using Composite.Core.Logging;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration.Foundation;
using Composite.Core.Types;
using Composite.Core.Parallelization;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration
{
#warning MRJ: BM: Make a total refac of this!
#warning MRJ: BM: This is does not generated code for DataProviderHelper, but creates XmlDataProviderCodeGeneratorResult. 
    /*internal sealed class XmlDataProviderHelperGenerator
    {
        private const string _namespacePrefix = "GeneratedTypes";

        private IEnumerable<XmlDataProviderCodeGeneratorStore> _stores;

        private string _name;
        private string _namespaceName;


        public XmlDataProviderHelperGenerator(string name, IEnumerable<XmlDataProviderCodeGeneratorStore> stores)
        {
            if (string.IsNullOrEmpty(name) == true) throw new ArgumentNullException("name");
            if (stores == null) throw new ArgumentNullException("stores");

            _stores = stores;

            foreach (XmlDataProviderCodeGeneratorStore store in _stores)
            {
                ValidateStore(store);

                if (store.Validated == true)
                {
                    InitializeStore(store);
                }

                if (store.Validated == false)
                {
                    StringBuilder sb = new StringBuilder();
                    sb.AppendLine(string.Format("The interface '{0}' did not validate with the following errors:", store.InterfaceTypeName));

                    foreach (string error in store.Errors)
                    {
                        sb.AppendLine(error);
                    }

                    LoggingService.LogWarning("XmlDataProvider", sb.ToString());
                }
            }

            _name = name;
            _namespaceName = string.Format("{0}.{1}", _namespacePrefix, _name);
        }



        public XmlDataTypeStoresContainer Generate(bool staticOnly)
        {
            XmlDataTypeStoresContainer result = new XmlDataTypeStoresContainer();

            result.ConfiguredInterfaceTypes = this.ValidatedStores.Select(f => f.InterfaceType).ToList();
            result.AllInterfaceTypes = result.ConfiguredInterfaceTypes.Concat(this.InvalidatedStores.Select(f => f.InterfaceType)).ToList();

            ParallelFacade.ForEach("XmlDataProvider. Creating data storages",
                this.ValidatedStores, store => GenerateStore(staticOnly, result, store));
            
            return result;
        }



        private void GenerateStore(bool staticOnly, XmlDataTypeStoresContainer result, XmlDataProviderCodeGeneratorStore store)
        {
            DataTypeDescriptor dataTypeDescriptor = staticOnly ?
                DynamicTypeManager.BuildNewDataTypeDescriptor(store.InterfaceType) :
                DynamicTypeManager.GetDataTypeDescriptor(store.InterfaceType);

            string compileUnitId = CreateCompileUnitId(dataTypeDescriptor);
            string fingerprint = CreateFingerprint(dataTypeDescriptor, store);

            BuildManagerCompileUnit buildManagerCompileUnit = new BuildManagerCompileUnit(compileUnitId, fingerprint);
            
            buildManagerCompileUnit.AddAssemblyReference(typeof(System.Exception).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(System.Linq.IQueryable).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(System.Xml.Linq.XName).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(System.Xml.XmlReader).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(System.ComponentModel.EditorBrowsableAttribute).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Core.Linq.ExpressionCreator).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Core.Types.ExtendedNullable<>).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Data.DataSourceId).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Data.ProcessControlled.IProcessControlled).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Composite.Plugins.Data.DataProviders.XmlDataProvider.XmlDataProvider).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(store.InterfaceType.Assembly);

            buildManagerCompileUnit.AddType(new BuildManagerCompileType(_namespaceName, new KeyValuePair<string, Func<CodeTypeDeclaration>>(store.DataProviderHelperClassName, () => CreateHelperClass(store))));
            buildManagerCompileUnit.AddType(new BuildManagerCompileType(_namespaceName, new KeyValuePair<string, Func<CodeTypeDeclaration>>(store.DataIdClassName, () => CreateDataIdClass(store))));
            buildManagerCompileUnit.AddType(new BuildManagerCompileType(_namespaceName, new KeyValuePair<string, Func<CodeTypeDeclaration>>(store.WrapperClassName, () => CreateDataClassWrapper(store))));


            BuildManager.GetCompiledTypes(buildManagerCompileUnit);


#warning MRJ: BM: FIX THIS NOW!
            throw new NotImplementedException("FIX THIS!");
            /*XmlDataTypeStore storeResult = new XmlDataTypeStore();

            storeResult.DataProviderHelperType = buildManagerCompileUnit.GetGeneretedTypeByName(store.DataProviderHelperClassName);
            storeResult.DataIdClassType = buildManagerCompileUnit.GetGeneretedTypeByName(store.DataIdClassName);

            storeResult.DataScopesNames = store.DataScopes;

            storeResult.DataScope = new Dictionary<string, Dictionary<string, XmlDataTypeStore.XmlDateTypeStoreDataScopeElement>>();
            foreach (var kvp in store.Stores)
            {
                foreach (var innerKvp in kvp.Value)
                {
                    Dictionary<string, XmlDataTypeStore.XmlDateTypeStoreDataScopeElement> dic;
                    if (storeResult.DataScope.TryGetValue(kvp.Key, out dic) == false)
                    {
                        dic = new Dictionary<string, XmlDataTypeStore.XmlDateTypeStoreDataScopeElement>();
                        storeResult.DataScope.Add(kvp.Key, dic);
                    }

                    dic.Add(innerKvp.Key, new XmlDataTypeStore.XmlDateTypeStoreDataScopeElement { Filename = innerKvp.Value.Filename, ElementName = innerKvp.Value.ElementName });
                }
            }

            lock (result)
            {
                result.AddStoreResult(store.InterfaceType, storeResult);
            }
        }



        private static CodeTypeDeclaration CreateHelperClass(XmlDataProviderCodeGeneratorStore store)
        {
            XmlDataProviderHelperClassGenerator helperClassGenerator =
                new XmlDataProviderHelperClassGenerator(store.DataProviderHelperClassName,
                                                        store.WrapperClassName,
                                                        store.DataIdClassName,
                                                        store.InterfaceType,
                                                        store.PropertyList,
                                                        store.PropertyInitializers);

            return helperClassGenerator.CreateClass();
        }



        private static CodeTypeDeclaration CreateDataIdClass(XmlDataProviderCodeGeneratorStore store)
        {
            XmlDataIdClassGenerator dataIdClassGenerator = new XmlDataIdClassGenerator(
                store.DataIdClassName,
                store.PropertyList);

            return dataIdClassGenerator.CreateClass();
        }



        private static CodeTypeDeclaration CreateDataClassWrapper(XmlDataProviderCodeGeneratorStore store)
        {
            XmlDataWrapperClassGenerator dataWrapperClassGenerator =
                new XmlDataWrapperClassGenerator(
                    store.WrapperClassName,
                    store.InterfaceType,
                    store.PropertyList);

            return dataWrapperClassGenerator.CreateClass();
        }



        private void ValidateStore(XmlDataProviderCodeGeneratorStore store)
        {
            store.Validated = false;

            if (store.InterfaceType == null) { store.Errors.Add(string.Format("The interface type '{0}' could not be found", store.InterfaceTypeName)); return; }
            if (store.InterfaceType.GetProperties().Length == 0) { store.Errors.Add(string.Format("The interface type '{0}' does not contain any properties", store.InterfaceType)); return; }
            if (store.InterfaceType.IsVisible == false) { store.Errors.Add(string.Format("The interface type '{0}' is notvisible to other assemblies", store.InterfaceType)); return; }

            try
            {
                DataInterfaceValidator.Validate(store.InterfaceType);

                store.PropertyList = new PropertyList(store.InterfaceType, store.DataIdProperties, store.PropertyNameMapping);
            }
            catch (Exception ex)
            {
                store.Errors.Add(ex.ToString());
                return;
            }

            foreach (string dataScope in store.DataScopes)
            {
                foreach (var kvp in store.Stores[dataScope])
                {
                    if (string.IsNullOrEmpty(kvp.Value.Filename)) { store.Errors.Add("Filename is null or empty"); return; }
                    if (string.IsNullOrEmpty(kvp.Value.ElementName)) { store.Errors.Add("Element name is null or empty"); return; }
                }

                try
                {
                    PropertyInitializerDictionaryArgumentValidator.Validate(store.PropertyInitializers);
                    PropertyInitializerDictionaryArgumentValidator.ValidateVsPropertyList(store.PropertyInitializers, store.PropertyList);
                }
                catch (Exception ex)
                {
                    store.Errors.Add(ex.ToString());
                    return;
                }
            }

            store.Validated = true;
        }



        private void InitializeStore(XmlDataProviderCodeGeneratorStore store)
        {
            store.WrapperClassName = string.Format("{0}Wrapper", store.InterfaceType.FullName.Replace('.', '_').Replace('+', '_'));
            store.DataIdClassName = string.Format("{0}DataId", store.InterfaceType.FullName.Replace('.', '_').Replace('+', '_'));
            store.DataProviderHelperClassName = string.Format("{0}DataProviderHelper", store.InterfaceType.FullName.Replace('.', '_').Replace('+', '_'));
        }



        private IEnumerable<XmlDataProviderCodeGeneratorStore> ValidatedStores
        {
            get
            {
                foreach (XmlDataProviderCodeGeneratorStore store in _stores)
                {
                    if (store.Validated == true)
                    {
                        yield return store;
                    }
                }
            }
        }



        private IEnumerable<XmlDataProviderCodeGeneratorStore> InvalidatedStores
        {
            get
            {
                foreach (XmlDataProviderCodeGeneratorStore store in _stores)
                {
                    if (store.Validated == false)
                    {
                        yield return store;
                    }
                }
            }
        }



        private string CreateCompileUnitId(DataTypeDescriptor dataTypeDescriptor)
        {
            if (dataTypeDescriptor.Namespace == "")
            {
                return string.Format("{0}.{1}.{2}", _name, _namespacePrefix, dataTypeDescriptor.Name);
            }
            else
            {
                return string.Format("{0}.{1}.{2}.{3}", _name, _namespacePrefix, dataTypeDescriptor.Namespace, dataTypeDescriptor.Name);
            }
        }



        private string CreateFingerprint(DataTypeDescriptor dataTypeDescriptor, XmlDataProviderCodeGeneratorStore xmlDataProviderCodeGeneratorStore)
        {
            StringBuilder sb = new StringBuilder();

            sb.Append(dataTypeDescriptor.DataTypeId);
            sb.Append("·");

            sb.Append(dataTypeDescriptor.Version.ToString());
            sb.Append("·");

            foreach (var kvp in xmlDataProviderCodeGeneratorStore.Stores)
            {
                foreach (var innerKvp in kvp.Value)
                {
                    sb.Append(kvp.Key);
                    sb.Append("·");
                    sb.Append(innerKvp.Key);
                    sb.Append("·");

                    sb.Append(innerKvp.Value.Filename);
                    sb.Append("·");
                    sb.Append(innerKvp.Value.ElementName);
                    sb.Append("·");
                }
            }

            return sb.ToString();
        }
    }*/
}
