using System.Linq;
using System.CodeDom;
using Composite.Plugins.Data.DataProviders.MemoryDataProvider.Foundation;
using System.Reflection;
using Composite.Data;
using Composite.Core.Types;
using System.Collections.Generic;


namespace Composite.Plugins.Data.DataProviders.MemoryDataProvider.CodeGeneration.Foundation
{
    internal sealed class EntityClassGenerator
    {
        private MemoryEntityData _memoryEntityData;


        public EntityClassGenerator(MemoryEntityData memoryEntityData)
        {
            _memoryEntityData = memoryEntityData;
        }


        public CodeTypeDeclaration CreateClass()
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(_memoryEntityData.EntityClassName);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;

            AddConstructor(declaration);
            AddInterfaceProperties(declaration);

            return declaration;
        }



        private void AddConstructor(CodeTypeDeclaration declaration)
        {
            string parameterName = "entity";

            CodeConstructor constructor = new CodeConstructor();

            constructor.Attributes = MemberAttributes.Public;

            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                    new CodeTypeReference(_memoryEntityData.InterfaceType),
                    parameterName
                ));


            List<PropertyInfo> properties =
                _memoryEntityData.InterfaceType.GetPropertiesRecursively(prop => typeof(IData).IsAssignableFrom(prop.DeclaringType)).
                                                Where(p => p.Name != "DataSourceId").ToList();

            foreach (PropertyInfo propertyInfo in properties)
            {
                constructor.Statements.Add(new CodeAssignStatement(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            CreateFieldName(propertyInfo)
                        ),
                        new CodePropertyReferenceExpression(
                            new CodeVariableReferenceExpression(parameterName),
                            propertyInfo.Name
                        )
                    ));
            }

            declaration.Members.Add(constructor);
        }



        private void AddInterfaceProperties(CodeTypeDeclaration declaration)
        {
            List<PropertyInfo> properties =
                _memoryEntityData.InterfaceType.GetPropertiesRecursively(prop => typeof(IData).IsAssignableFrom(prop.DeclaringType)).
                                                Where(p => p.Name != "DataSourceId").ToList();

            foreach (PropertyInfo propertyInfo in properties)
            {
                string fieldName = CreateFieldName(propertyInfo);

                CodeMemberField codeField = new CodeMemberField(new CodeTypeReference(propertyInfo.PropertyType), fieldName);                

                declaration.Members.Add(codeField);

                CodeMemberProperty property = new CodeMemberProperty();
                property.Attributes = MemberAttributes.Public | MemberAttributes.Final;
                property.Name = propertyInfo.Name;
                property.HasGet = true;
                property.HasSet = propertyInfo.CanWrite;
                property.Type = new CodeTypeReference(propertyInfo.PropertyType);


                property.GetStatements.Add(
                        new CodeMethodReturnStatement(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                fieldName
                            )
                        )
                    );


                property.SetStatements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        fieldName
                    ),
                    new CodePropertySetValueReferenceExpression()
                ));

                declaration.Members.Add(property);
            }            
        }

        private static string CreateFieldName(PropertyInfo property)
        {
            return string.Format("_{0}", property.Name.ToLower());
        }
    }
}
