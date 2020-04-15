using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Data.Linq.Mapping;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Reflection;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    /// <summary>
    /// There exists an entity class per { datacope, locale } mutation and only one base entity class.
    /// <example>
    /// The data type is publishable and localized and there exists two locales (EN, DK).
    /// This would result in 4 entity classes:
    /// unpublished+en, enpublished+dk, published+en, published+dk
    /// </example>
    /// </summary>
    internal sealed class EntityClassGenerator
    {
        private readonly DataTypeDescriptor _dataTypeDescriptor;
        private readonly string _entityClassName;
        private readonly string _entityBaseClassName;
        private readonly string _tableName;
        private readonly string _dataScopeIdentifierName;
        private readonly string _localeCultureName;


        public EntityClassGenerator(DataTypeDescriptor dataTypeDescriptor, string entityClassName, string entityBaseClassName, string tableName, string dataScopeIdentifierName, string localeCultureName)
        {
            _dataTypeDescriptor = dataTypeDescriptor;
            _entityClassName = entityClassName;
            _entityBaseClassName = entityBaseClassName;
            _tableName = tableName;
            _dataScopeIdentifierName = dataScopeIdentifierName;
            _localeCultureName = localeCultureName;
        }



        public CodeTypeDeclaration CreateClass()
        {
            var debugDisplayText = $"SQL entity for '{_dataTypeDescriptor.GetFullInterfaceName()}', culture = '{_localeCultureName}', scope = '{_dataScopeIdentifierName}'";
            foreach (var keyPropertyName in _dataTypeDescriptor.KeyPropertyNames)
            {
                debugDisplayText += $", {keyPropertyName} = {{{keyPropertyName}}}";
            }

            var labelFieldName = _dataTypeDescriptor.LabelFieldName;
            if (!string.IsNullOrEmpty(labelFieldName) && !_dataTypeDescriptor.KeyPropertyNames.Contains(labelFieldName))
            {
                debugDisplayText += $", {labelFieldName} = {{{labelFieldName}}}";
            }

            var codeTypeDeclaration = new CodeTypeDeclaration(_entityClassName)
            {
                IsClass = true,
                TypeAttributes = TypeAttributes.Public
            };

            codeTypeDeclaration.BaseTypes.Add(new CodeTypeReference(_entityBaseClassName));
            codeTypeDeclaration.CustomAttributes.AddRange(new []
            {
                new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(TableAttribute)),
                    new CodeAttributeArgument("Name", new CodePrimitiveExpression(_tableName))
                ),
                new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(DebuggerDisplayAttribute)),
                    new CodeAttributeArgument(
                        new CodePrimitiveExpression(debugDisplayText)
                    )
                )
            });


            string propertyName =
                typeof(DataScopeIdentifier).GetProperties(BindingFlags.Static | BindingFlags.Public).
                Where(f => f.Name.Equals(_dataScopeIdentifierName, StringComparison.OrdinalIgnoreCase)).
                Select(f => f.Name).
                Single();


            CodeMemberField constDataSourceIdCodeMemberField = new CodeMemberField(
                    new CodeTypeReference(typeof(DataScopeIdentifier).FullName),
                    EntityClassesFieldNames.DataSourceIdScopeConstFieldName
                );
            constDataSourceIdCodeMemberField.Attributes = MemberAttributes.Static;
            constDataSourceIdCodeMemberField.InitExpression =
                new CodePropertyReferenceExpression(
                    new CodeTypeReferenceExpression(typeof(DataScopeIdentifier)),
                    propertyName
                );
            codeTypeDeclaration.Members.Add(constDataSourceIdCodeMemberField);
            
            

            CodeMemberField constCultureCodeMemberField = new CodeMemberField(
                new CodeTypeReference(typeof(CultureInfo).FullName), 
                EntityClassesFieldNames.DataSourceIdCultureConstFieldName
                );
            constCultureCodeMemberField.Attributes = MemberAttributes.Static;
            constCultureCodeMemberField.InitExpression =
                new CodeObjectCreateExpression(
                        new CodeTypeReference(typeof(CultureInfo)),
                        new CodePrimitiveExpression(_localeCultureName)
                    );

            codeTypeDeclaration.Members.Add(constCultureCodeMemberField);

            AddEntityClassConstructor(codeTypeDeclaration);
            AddProperties(codeTypeDeclaration);

            return codeTypeDeclaration;
        }




        private static void AddEntityClassConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes = MemberAttributes.Public;

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        EntityClassesFieldNames.DataSourceIdScopeFieldName
                    ),
                    new CodeFieldReferenceExpression(
                        null,
                        EntityClassesFieldNames.DataSourceIdScopeConstFieldName
                    )
                )
            );

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        EntityClassesFieldNames.DataSourceIdCultureFieldName
                    ),
                    new CodeFieldReferenceExpression(
                        null,
                        EntityClassesFieldNames.DataSourceIdCultureConstFieldName
                    )
                )
            );

            declaration.Members.Add(constructor);
        }



        private void AddProperties(CodeTypeDeclaration declaration)
        {
            foreach (DataFieldDescriptor dataFieldDescriptor in _dataTypeDescriptor.Fields)
            {
                string propertyName = dataFieldDescriptor.Name;
                Type propertyType = dataFieldDescriptor.InstanceType;

                string fieldName = string.Format("_{0}", propertyName);
                string nullableFieldName = string.Format("_{0}Nullable", propertyName);

                AddPropertiesAddProperty(declaration, propertyName, propertyType, fieldName, nullableFieldName);
            }            
        }



        private void AddPropertiesAddProperty(CodeTypeDeclaration declaration, string propertyName, Type propertyType, string fieldName, string nullableFieldName)
        {
            SqlColumnInformation columnInformation = _dataTypeDescriptor.CreateSqlColumnInformation(propertyName);

            string name = propertyName;
            Type type = propertyType;
            string dbName = propertyName; 
            string dbType = EntityCodeGeneratorHelper.GetDbType(columnInformation.SqlDbType, columnInformation.IsNullable);
            bool isNullable = columnInformation.IsNullable;
            bool isId = columnInformation.IsPrimaryKey;
            bool isAutoGen = columnInformation.IsIdentity;


            CodeMemberProperty propertyMember = new CodeMemberProperty();
            propertyMember.Name = name;
            propertyMember.Type = new CodeTypeReference(type);
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
                new CodeAssignStatement(
                    new CodePropertyReferenceExpression(
                        new CodeBaseReferenceExpression(),
                        name
                    ),
                    new CodeArgumentReferenceExpression("value")
                )
            );



            propertyMember.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(DebuggerNonUserCodeAttribute))));

            var codeAttributeArguments = new List<CodeAttributeArgument>
            {
                new CodeAttributeArgument("Name", new CodePrimitiveExpression(dbName)),
                new CodeAttributeArgument("Storage", new CodePrimitiveExpression(fieldName)),
                new CodeAttributeArgument("DbType", new CodePrimitiveExpression(dbType)),
                new CodeAttributeArgument("CanBeNull", new CodePrimitiveExpression(isNullable)),
                new CodeAttributeArgument("IsPrimaryKey", new CodePrimitiveExpression(isId)),
                new CodeAttributeArgument("IsDbGenerated", new CodePrimitiveExpression(isAutoGen)),
                new CodeAttributeArgument("UpdateCheck",
                    new CodeFieldReferenceExpression(
                        new CodeTypeReferenceExpression(typeof (UpdateCheck)), nameof(UpdateCheck.Never))
                    )
            };



            propertyMember.CustomAttributes.Add(new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(ColumnAttribute)),
                    codeAttributeArguments.ToArray()
                ));


            declaration.Members.Add(propertyMember);
        }
    }
}
