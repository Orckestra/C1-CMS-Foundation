using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.CodeGeneration;
using Composite.Plugins.Data.DataProviders.MemoryDataProvider.Foundation;
using Composite.Core.Types;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.ProcessControlled;


namespace Composite.Plugins.Data.DataProviders.MemoryDataProvider.CodeGeneration.Foundation
{
    internal sealed class WrapperClassGenerator
    {
        private MemoryEntityData _memoryEntityData;

        private const string _wrappedEntityFieldName = "_entity";
        private const string _dataSourceIdFieldName = "_dataSourceId";


        public WrapperClassGenerator(MemoryEntityData memoryEntityData)
        {
            _memoryEntityData = memoryEntityData;            
        }



        public CodeTypeDeclaration CreateClass()
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(_memoryEntityData.WrapperClassName);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(_memoryEntityData.InterfaceType);
            declaration.BaseTypes.Add(typeof(IEntityWrapper));

            declaration.Members.Add(new CodeMemberField(new CodeTypeReference(_memoryEntityData.EntityClassName), _wrappedEntityFieldName));
            declaration.Members.Add(new CodeMemberField(typeof(DataSourceId), _dataSourceIdFieldName));

            AddConstructor(declaration);
            AddIDataSourceProperty(declaration);
            AddInterfaceProperties(declaration);
            AddCommitDataMethod(declaration);

            return declaration;
        }



        private void AddConstructor(CodeTypeDeclaration declaration)
        {
            string parameterName = "entity";
            string dataContextParameterName = "dataContext";

            CodeConstructor constructor = new CodeConstructor();

            constructor.Attributes = MemberAttributes.Public;

            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                    new CodeTypeReference(_memoryEntityData.InterfaceType),
                    parameterName
                ));

            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                    new CodeTypeReference(typeof(DataProviderContext)),
                    dataContextParameterName
                ));


            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        _wrappedEntityFieldName
                        ),
                        new CodeObjectCreateExpression(
                            new CodeTypeReference(_memoryEntityData.EntityClassName),
                            new CodeExpression[] {
                                new CodeVariableReferenceExpression(parameterName)
                            }
                        )
                    ));

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        _dataSourceIdFieldName
                    ),
                    new CodeMethodInvokeExpression(
                        new CodeVariableReferenceExpression(dataContextParameterName),
                        "CreateDataSourceId",
                        new CodeExpression[] {
                            new CodeObjectCreateExpression(
                                new CodeTypeReference(_memoryEntityData.DataIdClassName),
                                new CodeExpression[] {
                                    new CodeVariableReferenceExpression(parameterName)
                                }
                            ),
                            new CodeTypeOfExpression(_memoryEntityData.InterfaceType)
                        }
                    )
                ));

            declaration.Members.Add(constructor);
        }



        private void AddIDataSourceProperty(CodeTypeDeclaration declaration)
        {
            PropertyInfo propertyInfo = typeof(IData).GetProperty("DataSourceId");

            CodeMemberProperty codeProperty = new CodeMemberProperty();
            codeProperty.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeProperty.Name = propertyInfo.Name;
            codeProperty.HasGet = true;
            codeProperty.HasSet = false;
            codeProperty.Type = new CodeTypeReference(propertyInfo.PropertyType);

            codeProperty.GetStatements.Add(
                new CodeMethodReturnStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                            _dataSourceIdFieldName
                        )
                    ));

            declaration.Members.Add(codeProperty);
        }



        private void AddInterfaceProperties(CodeTypeDeclaration declaration)
        {
            foreach (Property property in _memoryEntityData.PropertyList.InterfaceProperties)
            {
                string fieldName = CreateNullableFieldName(property);

                CodeMemberField field = new CodeMemberField();
                CodeTypeReference nullableType = new CodeTypeReference(
                        typeof(ExtendedNullable<>).FullName,
                        new CodeTypeReference[] { new CodeTypeReference(property.Type) }
                    );
                field.Name = fieldName;
                field.Type = nullableType;
                field.InitExpression = new CodeObjectCreateExpression(nullableType, new CodeExpression[] { });

                declaration.Members.Add(field);



                CodeMemberProperty codeProperty = new CodeMemberProperty();
                codeProperty.Attributes = MemberAttributes.Public | MemberAttributes.Final;
                codeProperty.Name = property.Name;
                codeProperty.HasGet = true;
                codeProperty.HasSet = false == property.ReadOnly;
                codeProperty.Type = new CodeTypeReference(property.Type);


                codeProperty.GetStatements.Add(
                    new CodeConditionStatement(
                        new CodeBinaryOperatorExpression(
                            new CodePropertyReferenceExpression(
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    fieldName
                                ),
                                "HasValue"
                            ),
                            CodeBinaryOperatorType.IdentityEquality,
                            new CodePrimitiveExpression(true)
                        ),
                        new CodeStatement[] {
                            new CodeMethodReturnStatement(
                                new CodePropertyReferenceExpression(
                                    new CodeFieldReferenceExpression(
                                        new CodeThisReferenceExpression(),
                                        fieldName
                                    ),
                                    "Value"
                                )
                            )
                        },
                        new CodeStatement[] {
                            new CodeMethodReturnStatement(
                                new CodePropertyReferenceExpression(
                                    new CodeFieldReferenceExpression(
                                        new CodeThisReferenceExpression(),
                                        _wrappedEntityFieldName
                                    ),
                                    property.Name
                                )
                            )
                        }
                    ));


                if (false == property.ReadOnly)
                {
                    foreach (Type type in property.BeforeSetHandlerTypes)
                    {
                        codeProperty.SetStatements.Add(
                            new CodeMethodInvokeExpression(
                                new CodeMethodReferenceExpression(
                                    new CodeTypeReferenceExpression(typeof(DataPropertyHandlerFacade)),
                                    "HandleSet"
                                ),
                                new CodeExpression[] {
                                    new CodeTypeOfExpression(type),
                                    new CodeThisReferenceExpression(),
                                    new CodePropertySetValueReferenceExpression()
                                }
                            ));
                    }

                    codeProperty.SetStatements.Add(
                    new CodeAssignStatement(
                        new CodePropertyReferenceExpression(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                fieldName
                            ),
                            "Value"
                        ),
                        new CodePropertySetValueReferenceExpression()
                    ));
                }

                declaration.Members.Add(codeProperty);
            }
        }        


        private void AddCommitDataMethod(CodeTypeDeclaration declaration)
        {
            CodeMemberMethod codeMethod = new CodeMemberMethod();
            codeMethod.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeMethod.Name = "CommitData";
            codeMethod.ReturnType = new CodeTypeReference(typeof(void));


            foreach (Property property in _memoryEntityData.PropertyList.InterfaceProperties)
            {
                string fieldName = CreateNullableFieldName(property);

                List<CodeStatement> statements = new List<CodeStatement>();


                statements.Add(new CodeAssignStatement(
                        new CodePropertyReferenceExpression(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                _wrappedEntityFieldName
                            ),
                            property.Name
                        ),
                        new CodePropertyReferenceExpression(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                fieldName
                            ),
                            "Value"
                        )
                    ));


                codeMethod.Statements.Add(new CodeConditionStatement(
                        new CodeBinaryOperatorExpression(
                            new CodePropertyReferenceExpression(
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    fieldName
                                ),
                                "HasValue"
                            ),
                            CodeBinaryOperatorType.IdentityEquality,
                            new CodePrimitiveExpression(true)
                        ),
                        statements.ToArray()
                    ));
            }


            declaration.Members.Add(codeMethod);
        }



        private static string CreateNullableFieldName(Property property)
        {
            return string.Format("_{0}Nullable", property.Name.ToLower());
        }
    }
}
