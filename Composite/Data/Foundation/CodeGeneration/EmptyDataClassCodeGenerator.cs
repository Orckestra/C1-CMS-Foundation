using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;


namespace Composite.Data.Foundation.CodeGeneration
{
    internal static class EmptyDataClassCodeGenerator
    {
        public static readonly string NamespaceName = "Composite.Data.GeneratedTypes";



        internal static void AddEmptyDataClassTypeCode(CodeGenerationBuilder codeGenerationBuilder, DataTypeDescriptor dataTypeDescriptor, Type baseClassType = null, CodeAttributeDeclaration codeAttributeDeclaration = null)
        {
            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);
            if (interfaceType == null) return;

            if (baseClassType == null) baseClassType = typeof(EmptyDataClassBase);

            CodeTypeDeclaration codeTypeDeclaration = CreateCodeTypeDeclaration(dataTypeDescriptor, baseClassType, codeAttributeDeclaration);

            codeGenerationBuilder.AddType(NamespaceName, codeTypeDeclaration);
        }



        internal static void AddAssemblyReferences(CodeGenerationBuilder codeGenerationBuilder, DataTypeDescriptor dataTypeDescriptor)
        {
            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);
            if (interfaceType == null) return;

            codeGenerationBuilder.AddReference(typeof(EmptyDataClassBase).Assembly);
            codeGenerationBuilder.AddReference(typeof(EditorBrowsableAttribute).Assembly);
            codeGenerationBuilder.AddReference(interfaceType.Assembly);

            if (!string.IsNullOrEmpty(dataTypeDescriptor.BuildNewHandlerTypeName))
            {
                Type buildeNewHandlerType = TypeManager.GetType(dataTypeDescriptor.BuildNewHandlerTypeName);
                codeGenerationBuilder.AddReference(buildeNewHandlerType.Assembly);
            }
        }



        internal static CodeTypeDeclaration CreateCodeTypeDeclaration(DataTypeDescriptor dataTypeDescriptor, Type baseClass, CodeAttributeDeclaration codeAttributeDeclaration)
        {
            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

            string interfaceTypeFullName = interfaceType.FullName;
            CodeTypeDeclaration declaration = new CodeTypeDeclaration();

            declaration.Name = CreateClassName(interfaceTypeFullName);
            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(SerializableAttribute))));
            declaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(EditorBrowsableAttribute)),
                    new CodeAttributeArgument(
                        new CodeFieldReferenceExpression(
                            new CodeTypeReferenceExpression(typeof(EditorBrowsableState)),
                            EditorBrowsableState.Never.ToString()
                        )
                    )
                )
            );

            if (baseClass != null)
            {
                declaration.BaseTypes.Add(baseClass);
            }
            declaration.BaseTypes.Add(interfaceType);


            if (codeAttributeDeclaration != null)
            {
                declaration.CustomAttributes.Add(codeAttributeDeclaration);
            }


            AddConstructor(declaration);
            AddInterfaceProperties(declaration, dataTypeDescriptor.Fields);

            AddInterfaceTypeProperty(declaration, interfaceTypeFullName);

            return declaration;
        }



        private static void AddConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor codeConstructor = new CodeConstructor();

            codeConstructor.Attributes = MemberAttributes.Public;

            declaration.Members.Add(codeConstructor);
        }



        private static void AddInterfaceProperties(CodeTypeDeclaration declaration, IEnumerable<DataFieldDescriptor> dataFieldDescriptors)
        {
            foreach (DataFieldDescriptor dataFieldDescriptor in dataFieldDescriptors)
            {
                string fieldName = CreateFieldName(dataFieldDescriptor);

                CodeMemberField codeField = new CodeMemberField(new CodeTypeReference(dataFieldDescriptor.InstanceType), fieldName);

                declaration.Members.Add(codeField);

                CodeMemberProperty property = new CodeMemberProperty();
                property.Attributes = MemberAttributes.Public | MemberAttributes.Final;
                property.Name = dataFieldDescriptor.Name;
                property.HasGet = true;
                property.HasSet = !dataFieldDescriptor.IsReadOnly;
                property.Type = new CodeTypeReference(dataFieldDescriptor.InstanceType);

                property.GetStatements.Add(
                        new CodeMethodReturnStatement(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                fieldName
                            )
                        )
                    );


                if (!dataFieldDescriptor.IsReadOnly)
                {
                    property.SetStatements.Add(
                    new CodeAssignStatement(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            fieldName
                        ),
                        new CodePropertySetValueReferenceExpression()
                    ));
                }

                declaration.Members.Add(property);
            }
        }


        private static void AddInterfaceTypeProperty(CodeTypeDeclaration declaration, string interfaceTypeFullName)
        {
            CodeMemberProperty codeMemberProperty = new CodeMemberProperty();
            codeMemberProperty.Name = "_InterfaceType";

            codeMemberProperty.Type = new CodeTypeReference(typeof(Type));
            codeMemberProperty.Attributes = MemberAttributes.Family | MemberAttributes.Override;
            codeMemberProperty.HasSet = false;
            codeMemberProperty.HasGet = true;
            codeMemberProperty.GetStatements.Add(
                    new CodeMethodReturnStatement(
                        new CodeTypeOfExpression(interfaceTypeFullName)
                    )
                );

            declaration.Members.Add(codeMemberProperty);
        }



        internal static string GetEmptyClassTypeFullName(DataTypeDescriptor dataTypeDescriptor)
        {
            return NamespaceName + "." + CreateClassName(dataTypeDescriptor.GetFullInterfaceName());
        }



        private static string CreateClassName(string fullname)
        {
            return string.Format("{0}EmptyClass", fullname.Replace('.', '_').Replace('+', '_'));
        }



        private static string CreateFieldName(DataFieldDescriptor dataFieldDescriptor)
        {
            return string.Format("_{0}", dataFieldDescriptor.Name.ToLower());
        }
    }    
}
