using System.CodeDom;
using Composite.Plugins.Data.DataProviders.MemoryDataProvider.Foundation;
using Composite.Data.Plugins.DataProvider.CodeGeneration;
using System.Reflection;
using System;
using Composite.Data;
using System.Collections.Generic;


namespace Composite.Plugins.Data.DataProviders.MemoryDataProvider.CodeGeneration.Foundation
{
	internal sealed class DataIdClassGenerator
	{
        private MemoryEntityData _memoryEntityData;


        public DataIdClassGenerator(MemoryEntityData memoryEntityData)
        {
            _memoryEntityData = memoryEntityData;
        }

       

        public CodeTypeDeclaration CreateClass()
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(_memoryEntityData.DataIdClassName);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(new CodeTypeReference(typeof(IDataId)));

            AddDefaultConstructor(declaration);
            AddConstructor(declaration);

            foreach (Property property in _memoryEntityData.PropertyList.DataIdProperties)
            {
                AddProperty(declaration, property.Name, property.Type);
            }

            return declaration;
        }



        private static void AddDefaultConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor defaultConstructor = new CodeConstructor();

            defaultConstructor.Attributes = MemberAttributes.Public | MemberAttributes.Final;

            declaration.Members.Add(defaultConstructor);
        }



        private void AddConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes = MemberAttributes.Public | MemberAttributes.Final;

            constructor.Parameters.Add(new CodeParameterDeclarationExpression(_memoryEntityData.InterfaceType, "entity"));

            foreach (Property property in _memoryEntityData.PropertyList.DataIdProperties)
            {
                constructor.Statements.Add(new CodeAssignStatement(
                        new CodePropertyReferenceExpression(
                            new CodeThisReferenceExpression(),
                            MakePropertyFieldName(property.Name)
                        ),
                        new CodePropertyReferenceExpression(
                            new CodeVariableReferenceExpression("entity"),
                            property.Name
                        )
                    ));
            }

            declaration.Members.Add(constructor);
        }



        private void AddProperty(CodeTypeDeclaration declaration, string name, Type type)
        {
            string propertyFieldName = MakePropertyFieldName(name);

            declaration.Members.Add(new CodeMemberField(type, propertyFieldName));

            CodeMemberProperty property = new CodeMemberProperty();
            property.Name = name;
            property.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            property.HasSet = true;
            property.HasGet = true;
            property.Type = new CodeTypeReference(type);
            property.GetStatements.Add(new CodeMethodReturnStatement(new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName)));
            property.SetStatements.Add(new CodeAssignStatement(new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName), new CodeArgumentReferenceExpression("value")));

            declaration.Members.Add(property);
        }



        private static string MakePropertyFieldName(string name)
        {
            return string.Format("_property{0}", name);
        }
	}
}
