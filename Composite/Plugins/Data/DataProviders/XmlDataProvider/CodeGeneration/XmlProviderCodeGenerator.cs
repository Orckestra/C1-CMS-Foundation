using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using Composite.Data.DynamicTypes;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.Foundation;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    internal class XmlProviderCodeGenerator
    {
        private readonly DataTypeDescriptor _dataTypeDescriptor;

        public string DataProviderHelperClassFullName { get; private set; }
        public string WrapperClassFullName { get; private set; }
        public string DataIdClassFullName { get; private set; }


        public XmlProviderCodeGenerator(DataTypeDescriptor dataTypeDescriptor, string namespaceName)
        {
            _dataTypeDescriptor = dataTypeDescriptor;

            DataProviderHelperClassFullName = namespaceName + "." + NamesCreator.MakeDataProviderHelperClassName(dataTypeDescriptor);
            WrapperClassFullName = namespaceName + "." + NamesCreator.MakeWrapperClassName(dataTypeDescriptor);
            DataIdClassFullName = namespaceName + "." + NamesCreator.MakeDataIdClassName(dataTypeDescriptor);
        }



        public IEnumerable<CodeTypeDeclaration> CreateCodeDOMs()
        {
            string dataProviderHelperClassName = NamesCreator.MakeDataProviderHelperClassName(_dataTypeDescriptor);
            string wrapperClassName = NamesCreator.MakeWrapperClassName(_dataTypeDescriptor);
            string dataIdClassName = NamesCreator.MakeDataIdClassName(_dataTypeDescriptor);


            DataProviderHelperClassGenerator classGenerator = new DataProviderHelperClassGenerator(
                dataProviderHelperClassName,
                wrapperClassName,
                dataIdClassName,
                _dataTypeDescriptor                
            );
            CodeTypeDeclaration dataHelperClassCodeTypeDeclaration = classGenerator.CreateClass();
            yield return dataHelperClassCodeTypeDeclaration;


            DataIdClassGenerator dataIdClassGenerator = new DataIdClassGenerator(dataIdClassName, _dataTypeDescriptor);
            CodeTypeDeclaration dataIdClassCodeTypeDeclaration = dataIdClassGenerator.CreateClass();
            yield return dataIdClassCodeTypeDeclaration;


            DataWrapperClassGenerator dataWrapperClassGenerator = new DataWrapperClassGenerator(wrapperClassName, _dataTypeDescriptor);
            CodeTypeDeclaration dataWrapperClassCodeTypeDeclaration = dataWrapperClassGenerator.CreateClass();
            yield return dataWrapperClassCodeTypeDeclaration;
        }
    }
}
