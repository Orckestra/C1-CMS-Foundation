using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Linq.Mapping;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Reflection;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider.CodeGeneration;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
#warning MRJ: BM: Move to another file
    internal static class EntityClassesFieldNames
    {
        public const string DataSourceIdFieldName = "_dataSourceId";
        public const string DataSourceIdScopeFieldName = "_dataScopeIdentifier";
        public const string DataSourceIdCultureFieldName = "_locale";

        public const string DataSourceIdScopeConstFieldName = "DataScope";
        public const string DataSourceIdCultureConstFieldName = "Locale";
    }



#warning MRJ: BM: Rename and move this to another file
    internal class EntityBaseClassGenerator_NEW
    {


        private readonly string _entityBaseClassName;
        private readonly string _dataIdClassName;
        private readonly DataTypeDescriptor _dataTypeDescriptor;
        private readonly string _providerName;

        public EntityBaseClassGenerator_NEW(DataTypeDescriptor dataTypeDescriptor, string entityBaseClassName, string dataIdClassName, string providerName)
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

#warning MRJ: BM: Cleanup
                //if ((property.IsDataId == false) && (property.IsInterface == false)) throw new NotImplementedException();

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














#warning MRJ: BM: Rename 
    /// <summary>
    /// There exists an entity class per { datacope, locale } mutation and only one base entity class.
    /// <example>
    /// The data type is publishable and localized and there exists two locales (EN, DK).
    /// This would result in 4 entity classes:
    /// unpublished+en, enpublished+dk, published+en, published+dk
    /// </example>
    /// </summary>
    internal sealed class EntityClassGenerator_NEW
    {
        private readonly DataTypeDescriptor _dataTypeDescriptor;
        private readonly string _entityClassName;
        private readonly string _entityBaseClassName;
        private readonly string _tableName;
        private readonly string _dataScopeIdentifierName;
        private readonly string _localeCultureName;


        public EntityClassGenerator_NEW(DataTypeDescriptor dataTypeDescriptor, string entityClassName, string entityBaseClassName, string tableName, string dataScopeIdentifierName, string localeCultureName)
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
            CodeTypeDeclaration codeTypeDeclaration = new CodeTypeDeclaration(_entityClassName);

            codeTypeDeclaration.IsClass = true;
            codeTypeDeclaration.TypeAttributes = TypeAttributes.Public;
            codeTypeDeclaration.BaseTypes.Add(new CodeTypeReference(_entityBaseClassName));

            codeTypeDeclaration.CustomAttributes.Add(new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(TableAttribute)),
                    new CodeAttributeArgument("Name", new CodePrimitiveExpression(_tableName))
                ));


            
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

#warning MRJ: BM: Cleanup
                //if ((property.IsDataId == false) && (property.IsInterface == false)) throw new NotImplementedException();

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
#warning MRJ: BM: Handle mapped name
            string dbName = propertyName; // property.MappedName;
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

            var codeAttributeArguments = new List<CodeAttributeArgument> {
                    new CodeAttributeArgument("Name", new CodePrimitiveExpression(dbName)),
                    new CodeAttributeArgument("Storage", new CodePrimitiveExpression(fieldName)),
                    new CodeAttributeArgument("DbType", new CodePrimitiveExpression(dbType)),
                    new CodeAttributeArgument("CanBeNull", new CodePrimitiveExpression(isNullable)),
                    new CodeAttributeArgument("IsPrimaryKey", new CodePrimitiveExpression(isId)),
                    new CodeAttributeArgument("IsDbGenerated", new CodePrimitiveExpression(isAutoGen))
                };


            codeAttributeArguments.Add(
                    new CodeAttributeArgument("UpdateCheck",
                        new CodeFieldReferenceExpression(
                            new CodeTypeReferenceExpression(typeof(UpdateCheck)),
                            "Never"
                        )
                    )
                );

            propertyMember.CustomAttributes.Add(new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(ColumnAttribute)),
                    codeAttributeArguments.ToArray()
                ));


            declaration.Members.Add(propertyMember);
        }
    }











#warning MRJ: BM: Remove this
    /// <summary>
    /// Entiry class generator. A generaded entity class will have the same properties as related interface 
    /// and will be used in linq 2 sql translation as a wrapper for a sequel table.
    /// </summary>
    internal sealed class EntityClassGenerator
    {
        private const string _dataSourceIdFieldName = "_dataSourceId";
        private const string _dataSourceIdScopeFieldName = "_dataSourceId_Scope";
        private const string _dataSourceIdScopeStaticFieldName = "_dataSourceId_Scope_static";
        private const string _dataSourceIdCultureFieldName = "_dataSourceId_Culture";
        private const string _dataSourceIdCultureStaticFieldName = "_dataSourceId_Culture_static";



        private readonly SqlDataProviderCodeGeneratorTable _table;
        private readonly string _providerName;



        public EntityClassGenerator(SqlDataProviderCodeGeneratorTable table, string providerName)
        {
            _table = table;
            _providerName = providerName;
        }




        public IEnumerable<KeyValuePair<string, Func<CodeTypeDeclaration>>> CreateClasses()
        {
            var createdBaseClasses = new List<string>();
            foreach (var kvp in _table.Stores)
            {
                var storageInfo = kvp.Value;

                if (!createdBaseClasses.Contains(storageInfo.EntityBaseClassName))
                {
                    // Checking if an entity type has already been generated and is in Composite.Generated.dll
                    if (Type.GetType(storageInfo.EntityBaseClassName) == null)
                    {
                        yield return new KeyValuePair<string, Func<CodeTypeDeclaration>>(storageInfo.EntityBaseClassName, () => CreateBaseClass(storageInfo));
                    }
                    createdBaseClasses.Add(storageInfo.EntityBaseClassName);
                }

                yield return new KeyValuePair<string, Func<CodeTypeDeclaration>>(storageInfo.EntityClassName, () => CreateClass(storageInfo));
            }
        }



        private CodeTypeDeclaration CreateBaseClass(SqlDataProviderCodeGeneratorTable.StoreInformation storageInformation)
        {
            var declaration = new CodeTypeDeclaration(storageInformation.EntityBaseClassName);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Abstract;
            declaration.BaseTypes.Add(typeof(INotifyPropertyChanged));
            declaration.BaseTypes.Add(typeof(INotifyPropertyChanging));
            declaration.BaseTypes.Add(typeof(IEntity));
            declaration.BaseTypes.Add(_table.InterfaceTypeAlias);

            declaration.Members.Add(new CodeMemberField(new CodeTypeReference(typeof(DataSourceId).FullName), _dataSourceIdFieldName));
            declaration.Members.Add(new CodeMemberField(new CodeTypeReference(typeof(DataScopeIdentifier).FullName), _dataSourceIdScopeFieldName) { Attributes = MemberAttributes.Family });
            declaration.Members.Add(new CodeMemberField(new CodeTypeReference(typeof(CultureInfo).FullName), _dataSourceIdCultureFieldName) { Attributes = MemberAttributes.Family });

            AddBaseClassConstructor(declaration);
            AddIEntityImplementation(declaration, storageInformation.SqlTableInformation);
            AddIDataSourceProperty(declaration);

            AddProperties(declaration, storageInformation.SqlTableInformation, true);

            EntityCodeGeneratorHelper.AddPropertyChanging(declaration);
            EntityCodeGeneratorHelper.AddPropertyChanged(declaration);

            return declaration;
        }


        private static void AddEntityClassStaticConstructor(CodeTypeDeclaration declaration, SqlDataProviderCodeGeneratorTable.StoreInformation storageInformation)
        {
            var constructor = new CodeTypeConstructor();

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        null,
                        _dataSourceIdScopeStaticFieldName
                    ),
                    new CodeFieldReferenceExpression(
                        new CodeTypeReferenceExpression(typeof(DataScopeIdentifier)),
                        storageInformation.DataScope == "public" ? "Public" : "Administrated"
                    )
                )
            );

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        null,
                        _dataSourceIdCultureStaticFieldName
                    ),
                // new CultureInfo("...")
                    new CodeObjectCreateExpression(
                        new CodeTypeReference(typeof(CultureInfo)),
                        new CodePrimitiveExpression(storageInformation.CultureName)
                    )
                )
            );

            declaration.Members.Add(constructor);
        }


        private static void AddEntityClassConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes = MemberAttributes.Public;

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        _dataSourceIdScopeFieldName
                    ),
                    new CodeFieldReferenceExpression(
                        null,
                        _dataSourceIdScopeStaticFieldName
                    )
                )
            );

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        _dataSourceIdCultureFieldName
                    ),
                    new CodeFieldReferenceExpression(
                        null,
                        _dataSourceIdCultureStaticFieldName
                    )
                )
            );

            declaration.Members.Add(constructor);
        }


        private void AddBaseClassConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes = MemberAttributes.Public;

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        _dataSourceIdFieldName
                    ),
                    new CodePrimitiveExpression(null)
                )
            );

            declaration.Members.Add(constructor);
        }



        private void AddIEntityImplementation(CodeTypeDeclaration declaration, ISqlTableInformation sqlTableInformation)
        {
            CodeMemberMethod method = new CodeMemberMethod();
            method.Name = "Commit";
            method.Attributes = MemberAttributes.Public | MemberAttributes.Final;

            foreach (Property property in _table.PropertyList.Properties)
            {
                string fieldName = string.Format("_{0}", property.Name);
                string nullableFieldName = string.Format("_{0}Nullable", property.Name);

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
                                new CodePrimitiveExpression(property.Name)
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
                                new CodePrimitiveExpression(property.Name)

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
            foreach (Property property in _table.PropertyList.DataIdProperties)
            {
                dataIdConstructorParms.Add(
                    new CodePropertyReferenceExpression(
                        new CodeThisReferenceExpression(),
                        property.Name
                    ));
            }

            codeProperty.GetStatements.Add(
                new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            _dataSourceIdFieldName
                        ),
                        CodeBinaryOperatorType.IdentityEquality,
                        new CodePrimitiveExpression(null)
                    ),
                    new CodeAssignStatement(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            _dataSourceIdFieldName
                        ),
                        new CodeObjectCreateExpression(
                            new CodeTypeReference(typeof(DataSourceId)),
                            new CodeObjectCreateExpression(
                                new CodeTypeReference(_table.Stores.First().Value.DataIdClassName), // All have the same DataId class
                                dataIdConstructorParms.ToArray()
                            ),
                            new CodePrimitiveExpression(_providerName),
                            new CodeTypeOfExpression(_table.InterfaceTypeAlias),
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                _dataSourceIdScopeFieldName
                            ),
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                _dataSourceIdCultureFieldName
                            )
                        )
                    )
                )
            );



            codeProperty.GetStatements.Add(
                new CodeMethodReturnStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                            _dataSourceIdFieldName
                        )
                    ));

            declaration.Members.Add(codeProperty);
        }



        private CodeTypeDeclaration CreateClass(SqlDataProviderCodeGeneratorTable.StoreInformation storageInformation)
        {
            var declaration = new CodeTypeDeclaration(storageInformation.EntityClassName);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public;
            declaration.BaseTypes.Add(new CodeTypeReference(storageInformation.EntityBaseClassName));

            declaration.CustomAttributes.Add(new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(TableAttribute)),
                    new CodeAttributeArgument("Name", new CodePrimitiveExpression(storageInformation.SqlTableInformation.TableName))
                ));

            declaration.Members.Add(new CodeMemberField(new CodeTypeReference(typeof(DataScopeIdentifier).FullName), _dataSourceIdScopeStaticFieldName) { Attributes = MemberAttributes.Static });
            declaration.Members.Add(new CodeMemberField(new CodeTypeReference(typeof(CultureInfo).FullName), _dataSourceIdCultureStaticFieldName) { Attributes = MemberAttributes.Static });

            AddEntityClassStaticConstructor(declaration, storageInformation);
            AddEntityClassConstructor(declaration);
            AddProperties(declaration, storageInformation.SqlTableInformation, false);

            return declaration;
        }



        private void AddProperties(CodeTypeDeclaration declaration, ISqlTableInformation sqlTableInformation, bool isBaseClass)
        {
            List<SqlColumnInformation> columns =
                new List<SqlColumnInformation>(sqlTableInformation.ColumnInformations);



            foreach (Property property in _table.PropertyList.Properties)
            {
                if ((property.IsDataId == false) && (property.IsInterface == false)) throw new NotImplementedException();

                string fieldName = string.Format("_{0}", property.Name);
                string nullableFieldName = string.Format("_{0}Nullable", property.Name);

                AddProperties_AddField(declaration, isBaseClass, property, fieldName);
                AddProperties_AddNullableField(declaration, isBaseClass, property, nullableFieldName);
                AddProperties_AddProperty(declaration, isBaseClass, property, columns, fieldName, nullableFieldName);
            }
        }



        private void AddProperties_AddField(CodeTypeDeclaration declaration, bool isBaseClass, Property property, string fieldName)
        {
            if (isBaseClass == false) return;

            Type type = property.Type;

            CodeMemberField fieldMember = new CodeMemberField();
            fieldMember.Name = fieldName;
            fieldMember.Type = new CodeTypeReference(type);
            fieldMember.Attributes = MemberAttributes.Family;
            declaration.Members.Add(fieldMember);
        }



        private void AddProperties_AddNullableField(CodeTypeDeclaration declaration, bool isBaseClass, Property property, string fieldName)
        {
            if (isBaseClass == false) return;

            CodeMemberField fieldMember = new CodeMemberField();
            fieldMember.Name = fieldName;
            fieldMember.Type = new CodeTypeReference(typeof(ExtendedNullable<>).FullName, new CodeTypeReference(property.Type));
            fieldMember.Attributes = MemberAttributes.Family;

            fieldMember.InitExpression = new CodePrimitiveExpression(null);

            declaration.Members.Add(fieldMember);
        }



        private void AddProperties_AddProperty(CodeTypeDeclaration declaration, bool isBaseClass, Property property, List<SqlColumnInformation> columns, string fieldName, string nullableFieldName)
        {
            SqlColumnInformation column = columns.Find(col => col.ColumnName == property.MappedName);

            string name = property.Name;
            Type type = property.Type;
            string dbName = property.MappedName;
            string dbType = EntityCodeGeneratorHelper.GetDbType(column.SqlDbType, column.IsNullable);
            bool isNullable = column.IsNullable;
            bool isId = column.IsPrimaryKey;
            bool isAutoGen = column.IsIdentity;


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



            if (isBaseClass == true)
            {
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
                                new CodeTypeReference(typeof(ExtendedNullable<>).FullName, new CodeTypeReference(property.Type))
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
            }
            else
            {
                propertyMember.SetStatements.Add(
                    new CodeAssignStatement(
                        new CodePropertyReferenceExpression(
                            new CodeBaseReferenceExpression(),
                            name
                        ),
                        new CodeArgumentReferenceExpression("value")
                    )
                );
            }


            if (isBaseClass == false)
            {
                propertyMember.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(DebuggerNonUserCodeAttribute))));

                var codeAttributeArguments = new List<CodeAttributeArgument> {
                    new CodeAttributeArgument("Name", new CodePrimitiveExpression(dbName)),
                    new CodeAttributeArgument("Storage", new CodePrimitiveExpression(fieldName)),
                    new CodeAttributeArgument("DbType", new CodePrimitiveExpression(dbType)),
                    new CodeAttributeArgument("CanBeNull", new CodePrimitiveExpression(isNullable)),
                    new CodeAttributeArgument("IsPrimaryKey", new CodePrimitiveExpression(isId)),
                    new CodeAttributeArgument("IsDbGenerated", new CodePrimitiveExpression(isAutoGen))
                };


                codeAttributeArguments.Add(
                        new CodeAttributeArgument("UpdateCheck",
                            new CodeFieldReferenceExpression(
                                new CodeTypeReferenceExpression(typeof(UpdateCheck)),
                                "Never"
                            )
                        )
                    );

                propertyMember.CustomAttributes.Add(new CodeAttributeDeclaration(
                        new CodeTypeReference(typeof(ColumnAttribute)),
                        codeAttributeArguments.ToArray()
                    ));
            }

            declaration.Members.Add(propertyMember);
        }
    }
}
