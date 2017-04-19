using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Reflection;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    internal class EntityBaseClassGenerator
    {
        private readonly string _entityBaseClassName;
        private readonly string _dataIdClassName;
        private readonly DataTypeDescriptor _dataTypeDescriptor;
        private readonly string _providerName;

        public EntityBaseClassGenerator(DataTypeDescriptor dataTypeDescriptor, string entityBaseClassName, string dataIdClassName, string providerName)
        {
            _entityBaseClassName = entityBaseClassName;
            _dataIdClassName = dataIdClassName;
            _dataTypeDescriptor = dataTypeDescriptor;
            _providerName = providerName;
        }


        public CodeTypeDeclaration CreateClass()
        {
            var codeTypeDeclaration = new CodeTypeDeclaration(_entityBaseClassName)
            {
                IsClass = true,
                TypeAttributes = TypeAttributes.Public | TypeAttributes.Abstract
            };

            codeTypeDeclaration.BaseTypes.Add(typeof(INotifyPropertyChanged));
            codeTypeDeclaration.BaseTypes.Add(typeof(INotifyPropertyChanging));
            codeTypeDeclaration.BaseTypes.Add(typeof(IEntity));
            codeTypeDeclaration.BaseTypes.Add(_dataTypeDescriptor.GetFullInterfaceName());

            codeTypeDeclaration.Members.Add(new CodeMemberField(new CodeTypeReference(typeof(DataSourceId).FullName), EntityClassesFieldNames.DataSourceIdFieldName));
            codeTypeDeclaration.Members.Add(new CodeMemberField(new CodeTypeReference(typeof(DataScopeIdentifier).FullName), EntityClassesFieldNames.DataSourceIdScopeFieldName) { Attributes = MemberAttributes.Family });
            codeTypeDeclaration.Members.Add(new CodeMemberField(new CodeTypeReference(typeof(CultureInfo).FullName), EntityClassesFieldNames.DataSourceIdCultureFieldName) { Attributes = MemberAttributes.Family });

            AddConstructor(codeTypeDeclaration);
            AddIEntityImplementation(codeTypeDeclaration);
            AddIDataSourceProperty(codeTypeDeclaration);

            AddProperties(codeTypeDeclaration);

            EntityCodeGeneratorHelper.AddPropertyChanging(codeTypeDeclaration);
            EntityCodeGeneratorHelper.AddPropertyChanged(codeTypeDeclaration);

            return codeTypeDeclaration;
        }



        private static void AddConstructor(CodeTypeDeclaration declaration)
        {
            var constructor = new CodeConstructor
            {
                Attributes = MemberAttributes.Public
            };

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        EntityClassesFieldNames.DataSourceIdFieldName
                    ),
                    new CodePrimitiveExpression(null)
                )
            );

            declaration.Members.Add(constructor);
        }



        private void AddIEntityImplementation(CodeTypeDeclaration declaration)
        {
            var method = new CodeMemberMethod
            {
                Name = "Commit",
                Attributes = MemberAttributes.Public | MemberAttributes.Final
            };

            foreach (DataFieldDescriptor dataFieldDescriptor in _dataTypeDescriptor.Fields)
            {
                string propertyName = dataFieldDescriptor.Name;

                string fieldName = $"_{propertyName}";
                string nullableFieldName = $"_{propertyName}Nullable";

                method.Statements.Add(
                    new CodeConditionStatement(
                        new CodeBinaryOperatorExpression(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                nullableFieldName
                            ),
                            CodeBinaryOperatorType.IdentityInequality,
                            new CodePrimitiveExpression(null)
                        ),
                        new CodeExpressionStatement(
                            new CodeMethodInvokeExpression(
                                new CodeThisReferenceExpression(),
                                "OnPropertyChanging",
                                new CodePrimitiveExpression(propertyName)
                            )
                        ),
                        new CodeAssignStatement(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                fieldName
                            ),
                            new CodePropertyReferenceExpression(
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    nullableFieldName
                                ),
                                "Value"
                            )
                        ),
                        new CodeExpressionStatement(
                            new CodeMethodInvokeExpression(
                                new CodeThisReferenceExpression(),
                                "OnPropertyChanged",
                                new CodePrimitiveExpression(propertyName)
                            )
                        ),
                        new CodeAssignStatement(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                nullableFieldName
                            ),
                            new CodePrimitiveExpression(null)
                        )
                    )
                );
            }

            declaration.Members.Add(method);
        }



        private void AddIDataSourceProperty(CodeTypeDeclaration declaration)
        {
            PropertyInfo propertyInfo = typeof(IData).GetProperty(nameof(IData.DataSourceId));

            var codeProperty = new CodeMemberProperty
            {
                Attributes = MemberAttributes.Public | MemberAttributes.Final,
                Name = propertyInfo.Name,
                HasGet = true,
                HasSet = false,
                Type = new CodeTypeReference(propertyInfo.PropertyType)
            };

            var dataIdConstructorParms = new List<CodeExpression>();
            foreach (string propertyName in _dataTypeDescriptor.PhysicalKeyFields.Select(f=>f.Name))
            {
                dataIdConstructorParms.Add(
                    new CodePropertyReferenceExpression(
                        new CodeThisReferenceExpression(),
                        propertyName
                    ));
            }

            codeProperty.GetStatements.Add(
                new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            EntityClassesFieldNames.DataSourceIdFieldName
                        ),
                        CodeBinaryOperatorType.IdentityEquality,
                        new CodePrimitiveExpression(null)
                    ),
                    new CodeAssignStatement(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            EntityClassesFieldNames.DataSourceIdFieldName
                        ),
                        new CodeObjectCreateExpression(
                            new CodeTypeReference(typeof(DataSourceId)),
                            new CodeObjectCreateExpression(
                                new CodeTypeReference(_dataIdClassName),
                                dataIdConstructorParms.ToArray()
                            ),
                            new CodePrimitiveExpression(_providerName),
                            new CodeTypeOfExpression(_dataTypeDescriptor.GetFullInterfaceName()),
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                EntityClassesFieldNames.DataSourceIdScopeFieldName
                            ),
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                EntityClassesFieldNames.DataSourceIdCultureFieldName
                            )
                        )
                    )
                )
            );



            codeProperty.GetStatements.Add(
                new CodeMethodReturnStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                            EntityClassesFieldNames.DataSourceIdFieldName
                        )
                    ));

            declaration.Members.Add(codeProperty);
        }



        private void AddProperties(CodeTypeDeclaration declaration)
        {
            foreach (DataFieldDescriptor dataFieldDescriptor in _dataTypeDescriptor.Fields)
            {
                string propertyName = dataFieldDescriptor.Name;
                Type propertyType = dataFieldDescriptor.InstanceType;

                string fieldName = $"_{propertyName}";
                string nullableFieldName = $"_{propertyName}Nullable";

                AddPropertiesAddField(declaration, propertyType, fieldName);
                AddPropertiesAddNullableField(declaration, propertyType, nullableFieldName);
                AddPropertiesAddProperty(declaration, propertyName, propertyType, fieldName, nullableFieldName);
            }
        }



        private static void AddPropertiesAddField(CodeTypeDeclaration declaration, Type propertyType, string fieldName)
        {
            var fieldMember = new CodeMemberField
            {
                Name = fieldName,
                Type = new CodeTypeReference(propertyType),
                Attributes = MemberAttributes.Family
            };

            declaration.Members.Add(fieldMember);
        }



        private static void AddPropertiesAddNullableField(CodeTypeDeclaration declaration, Type propertyType, string fieldName)
        {
            var fieldMember = new CodeMemberField
            {
                Name = fieldName,
                Type = new CodeTypeReference(typeof (ExtendedNullable<>).FullName, new CodeTypeReference(propertyType)),
                Attributes = MemberAttributes.Family,
                InitExpression = new CodePrimitiveExpression(null)
            };


            declaration.Members.Add(fieldMember);
        }



        private static void AddPropertiesAddProperty(CodeTypeDeclaration declaration, string propertyName, Type propertyType, string fieldName, string nullableFieldName)
        {
            var propertyMember = new CodeMemberProperty
            {
                Name = propertyName,
                Type = new CodeTypeReference(propertyType),
                Attributes = MemberAttributes.Public,
                HasSet = true,
                HasGet = true
            };


            propertyMember.GetStatements.Add(
                new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            nullableFieldName
                        ),
                        CodeBinaryOperatorType.IdentityInequality,
                        new CodePrimitiveExpression(null)
                    ),
                    new CodeStatement[] {
                        new CodeMethodReturnStatement(
                            new CodePropertyReferenceExpression(
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(), 
                                    nullableFieldName
                                ), 
                                "Value"
                            )
                        )
                    },
                    new CodeStatement[] {
                        new CodeMethodReturnStatement(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(), 
                                fieldName
                            )
                        )
                    }
                )
            );


            propertyMember.SetStatements.Add(
                new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            nullableFieldName
                        ),
                        CodeBinaryOperatorType.IdentityEquality,
                        new CodePrimitiveExpression(null)
                    ),
                    new CodeAssignStatement(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            nullableFieldName
                        ),
                        new CodeObjectCreateExpression(
                            new CodeTypeReference(typeof(ExtendedNullable<>).FullName, new CodeTypeReference(propertyType))
                        )
                    )
                )
            );

            propertyMember.SetStatements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        nullableFieldName
                    ),
                    new CodeArgumentReferenceExpression("value")
                )
            );


            declaration.Members.Add(propertyMember);
        }
    }
}
