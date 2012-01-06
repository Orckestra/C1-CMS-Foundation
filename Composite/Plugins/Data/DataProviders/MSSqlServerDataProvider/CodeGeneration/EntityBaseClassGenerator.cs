using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
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
            CodeTypeDeclaration codeTypeDeclaration = new CodeTypeDeclaration(_entityBaseClassName);

            codeTypeDeclaration.IsClass = true;
            codeTypeDeclaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Abstract;
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
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes = MemberAttributes.Public;

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
            CodeMemberMethod method = new CodeMemberMethod();
            method.Name = "Commit";
            method.Attributes = MemberAttributes.Public | MemberAttributes.Final;

            foreach (DataFieldDescriptor dataFieldDescriptor in _dataTypeDescriptor.Fields)
            {
                string propertyName = dataFieldDescriptor.Name;

                string fieldName = string.Format("_{0}", propertyName);
                string nullableFieldName = string.Format("_{0}Nullable", propertyName);

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
            PropertyInfo propertyInfo = typeof(IData).GetProperty("DataSourceId");

            CodeMemberProperty codeProperty = new CodeMemberProperty();
            codeProperty.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeProperty.Name = propertyInfo.Name;
            codeProperty.HasGet = true;
            codeProperty.HasSet = false;
            codeProperty.Type = new CodeTypeReference(propertyInfo.PropertyType);

            List<CodeExpression> dataIdConstructorParms = new List<CodeExpression>();
            foreach (string propertyName in _dataTypeDescriptor.KeyPropertyNames)
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

                string fieldName = string.Format("_{0}", propertyName);
                string nullableFieldName = string.Format("_{0}Nullable", propertyName);

                AddPropertiesAddField(declaration, propertyType, fieldName);
                AddPropertiesAddNullableField(declaration, propertyType, nullableFieldName);
                AddPropertiesAddProperty(declaration, propertyName, propertyType, fieldName, nullableFieldName);
            }
        }



        private static void AddPropertiesAddField(CodeTypeDeclaration declaration, Type propertyType, string fieldName)
        {
            CodeMemberField fieldMember = new CodeMemberField();
            fieldMember.Name = fieldName;
            fieldMember.Type = new CodeTypeReference(propertyType);
            fieldMember.Attributes = MemberAttributes.Family;

            declaration.Members.Add(fieldMember);
        }



        private static void AddPropertiesAddNullableField(CodeTypeDeclaration declaration, Type propertyType, string fieldName)
        {
            CodeMemberField fieldMember = new CodeMemberField();
            fieldMember.Name = fieldName;
            fieldMember.Type = new CodeTypeReference(typeof(ExtendedNullable<>).FullName, new CodeTypeReference(propertyType));
            fieldMember.Attributes = MemberAttributes.Family;

            fieldMember.InitExpression = new CodePrimitiveExpression(null);

            declaration.Members.Add(fieldMember);
        }



        private static void AddPropertiesAddProperty(CodeTypeDeclaration declaration, string propertyName, Type propertyType, string fieldName, string nullableFieldName)
        {
            CodeMemberProperty propertyMember = new CodeMemberProperty();
            propertyMember.Name = propertyName;
            propertyMember.Type = new CodeTypeReference(propertyType);
            propertyMember.Attributes = MemberAttributes.Public;
            propertyMember.HasSet = true;
            propertyMember.HasGet = true;


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
