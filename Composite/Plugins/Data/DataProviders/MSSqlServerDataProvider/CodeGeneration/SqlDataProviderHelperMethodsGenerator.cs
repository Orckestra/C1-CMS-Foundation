using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.Plugins.DataProvider.CodeGeneration;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql;
using Composite.Data.DynamicTypes;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
#warning MRJ: BM: Rename this
    internal class SqlDataProviderHelperGenerator_NEW
    {
        private readonly DataTypeDescriptor _dataTypeDescriptor;        
        private readonly string _sqlDataProviderHelperClassName;
        private readonly string _dataIdClassName;
        private readonly string _entityClassName;
        private readonly string _dataContextFieldName;



        public SqlDataProviderHelperGenerator_NEW(DataTypeDescriptor dataTypeDescriptor, string sqlDataProviderHelperClassName, string dataIdClassName, string entityClassName, string dataContextFieldName)
        {
            _dataTypeDescriptor = dataTypeDescriptor;            
            _sqlDataProviderHelperClassName = sqlDataProviderHelperClassName;
            _dataIdClassName = dataIdClassName;
            _entityClassName = entityClassName;
            _dataContextFieldName = dataContextFieldName;
        }



        public CodeTypeDeclaration CreateClass()
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(_sqlDataProviderHelperClassName);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(typeof(ISqlDataProviderHelper));

            foreach (string keyFieldName in _dataTypeDescriptor.KeyPropertyNames)
            {
                string fieldName = CreateDataIdPropertyInfoFieldName(keyFieldName);

                CodeMemberField codeField = new CodeMemberField(new CodeTypeReference(typeof(PropertyInfo)), fieldName);
                codeField.InitExpression =
                    new CodeMethodInvokeExpression(
                        new CodeMethodReferenceExpression(
                            new CodeTypeReferenceExpression(typeof(IDataExtensions)),
                            "GetDataPropertyRecursivly"
                        ),
                        new CodeExpression[] {
                                new CodeTypeOfExpression(_entityClassName),
                                new CodePrimitiveExpression(keyFieldName)
                            }
                    );

                declaration.Members.Add(codeField);
            }

            AddGetDataByIdMethod(declaration);
            AddAddDataMethod(declaration);
            AddRemoveDataMethod(declaration);

            return declaration;
        }



        private void AddGetDataByIdMethod(CodeTypeDeclaration declaration)
        {
            const string queryableVariableName = "queryable";
            const string dataIdVariableName = "dataId";
            const string dataProivderContextVariableName = "dataProivderContext";
            const string castedDataIdVariableName = "castedDataId";
            const string castedQueryableVariableName = "castedQueryable";
            const string paramterExpressionVariableName = "paramter";
            const string whereBodyExpressionVariableName = "whereBody";
            const string whereLambdaExpressionVariableName = "whereLambda";
            const string whereExpressionVariableName = "whereExpression";
            const string resultVariableName = "result";

            CodeMemberMethod codeMethod = new CodeMemberMethod();
            codeMethod.Name = "GetDataById";
            codeMethod.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeMethod.ReturnType = new CodeTypeReference(typeof(IData));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(IQueryable)), queryableVariableName));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(IDataId)), dataIdVariableName));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(DataProviderContext)), dataProivderContextVariableName));


            // casted dataid variable
            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(_dataIdClassName),
                    castedDataIdVariableName,
                    new CodeCastExpression(
                        new CodeTypeReference(_dataIdClassName),
                        new CodeVariableReferenceExpression(dataIdVariableName)
                    )
                ));


            // casted queryable variable
            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(IQueryable<>).FullName, new [] { new CodeTypeReference(_entityClassName) }),
                    castedQueryableVariableName,
                    new CodeCastExpression(
                        new CodeTypeReference(typeof(IQueryable<>).FullName, new [] { new CodeTypeReference(_entityClassName) }),
                        new CodeVariableReferenceExpression(queryableVariableName)
                    )
                ));


            // parameter expression variable
            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(ParameterExpression)),
                    paramterExpressionVariableName,
                    new CodeMethodInvokeExpression(
                        new CodeTypeReferenceExpression(typeof(Expression)),
                        "Parameter",
                        new CodeExpression[] {
                            new CodeTypeOfExpression(new CodeTypeReference(_entityClassName)),
                            new CodePrimitiveExpression("_getDataByIdParameter_")
                        }
                    )
                ));


            // where body variable
            CodeExpression currentExpresion = null;
            foreach (string propertyName in _dataTypeDescriptor.KeyPropertyNames)
            {
                CodeExpression newExpression = new CodeMethodInvokeExpression(
                    new CodeTypeReferenceExpression(typeof(Expression)),
                    "Equal",
                    new CodeExpression[] {
                        new CodeMethodInvokeExpression(
                            new CodeTypeReferenceExpression(typeof(Expression)),
                            "Property",
                            new CodeExpression[] {
                                new CodeVariableReferenceExpression(paramterExpressionVariableName),
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    CreateDataIdPropertyInfoFieldName(propertyName)
                                )
                            }
                        ),
                        new CodeMethodInvokeExpression(
                            new CodeTypeReferenceExpression(typeof(Expression)),
                            "Constant",
                            new CodeExpression[] {
                                new CodePropertyReferenceExpression(
                                    new CodeVariableReferenceExpression(castedDataIdVariableName),
                                    propertyName
                                )
                            }
                        )
                    }
                );

                if (currentExpresion == null)
                {
                    currentExpresion = newExpression;
                }
                else
                {
                    currentExpresion = new CodeMethodInvokeExpression(
                            new CodeTypeReferenceExpression(typeof(Expression)),
                            "And",
                            new [] {
                                currentExpresion,
                                newExpression
                            }
                        );
                }
            }

            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(Expression)),
                    whereBodyExpressionVariableName,
                    currentExpresion
                ));


            // where labmda variable
            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(LambdaExpression)),
                    whereLambdaExpressionVariableName,
                    new CodeMethodInvokeExpression(
                        new CodeTypeReferenceExpression(typeof(Expression)),
                        "Lambda",
                        new CodeExpression[] {
                            new CodeVariableReferenceExpression(whereBodyExpressionVariableName),
                            new CodeArrayCreateExpression(
                                new CodeTypeReference(typeof(ParameterExpression)),
                                new CodeExpression[] {
                                    new CodeVariableReferenceExpression(paramterExpressionVariableName)
                                }
                            )
                        }
                    )
                ));


            // where expression variable
            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(Expression)),
                    whereExpressionVariableName,
                    new CodeMethodInvokeExpression(
                        new CodeTypeReferenceExpression(typeof(ExpressionCreator)),
                        "Where",
                        new CodeExpression[] {
                            new CodePropertyReferenceExpression(
                                new CodeVariableReferenceExpression(castedQueryableVariableName),
                                "Expression"
                            ),
                            new CodeVariableReferenceExpression(whereLambdaExpressionVariableName),
                        }
                    )
                ));


            // get result and store en list variable
            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(List<>).FullName, new [] { new CodeTypeReference(_entityClassName) }),
                    resultVariableName,
                    new CodeMethodInvokeExpression(
                        new CodeTypeReferenceExpression(typeof(Enumerable)),
                        "ToList",
                        new CodeExpression[] {
                            new CodeMethodInvokeExpression(
                                new CodeMethodReferenceExpression(
                                    new CodePropertyReferenceExpression(
                                        new CodeVariableReferenceExpression(castedQueryableVariableName),
                                        "Provider"
                                    ),                                    
                                    "CreateQuery",
                                    new [] { new CodeTypeReference(_entityClassName) }
                                ),
                                new CodeExpression[] { 
                                    new CodeVariableReferenceExpression(whereExpressionVariableName)
                                }
                            )
                        }
                    )
                ));


            // test result and return null on empty, wrappe result and return on one, else except
            codeMethod.Statements.Add(
                new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(
                        new CodePropertyReferenceExpression(
                            new CodeVariableReferenceExpression(resultVariableName),
                            "Count"
                        ),
                        CodeBinaryOperatorType.IdentityEquality,
                        new CodePrimitiveExpression(1)
                    ),
                    new CodeStatement[] {
                        new CodeMethodReturnStatement(                            
                            new CodeArrayIndexerExpression(
                                new CodeVariableReferenceExpression(resultVariableName),
                                new CodeExpression[] {
                                    new CodePrimitiveExpression(0)
                                }
                            )
                        )                        
                    },
                    new CodeStatement[] {
                        new CodeConditionStatement(
                            new CodeBinaryOperatorExpression(
                                new CodePropertyReferenceExpression(
                                    new CodeVariableReferenceExpression(resultVariableName),
                                    "Count"
                                ),
                                CodeBinaryOperatorType.IdentityEquality,
                                new CodePrimitiveExpression(0)
                            ),
                            new CodeStatement[] {
                                new CodeMethodReturnStatement(
                                    new CodePrimitiveExpression(null)
                                )       
                            },
                            new CodeStatement[] {
                            }
                        )
                    }
                ));


            codeMethod.Statements.Add(
                new CodeThrowExceptionStatement(
                    new CodeObjectCreateExpression(
                        new CodeTypeReference(typeof(InvalidOperationException)),
                        new CodePrimitiveExpression("More than one data item matched the given data id")
                    )
                ));

            declaration.Members.Add(codeMethod);
        }



        private void AddAddDataMethod(CodeTypeDeclaration declaration)
        {
            const string dataContextVariableName = "dataContext";
            const string dataToAddVariableName = "dataToAdd";
            const string dataProivderContextVariableName = "dataProivderContext";
            const string castedDataToAddVariableName = "castedDataToAdd";
            const string entityClassVariableName = "entity";


            CodeMemberMethod codeMethod = new CodeMemberMethod();
            codeMethod.Name = "AddData";
            codeMethod.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeMethod.ReturnType = new CodeTypeReference(typeof(IData));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(ISqlDataContext)), dataContextVariableName));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(IData)), dataToAddVariableName));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(DataProviderContext)), dataProivderContextVariableName));


            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(_dataTypeDescriptor.GetFullInterfaceName()),
                    castedDataToAddVariableName,
                    new CodeCastExpression(
                        new CodeTypeReference(_dataTypeDescriptor.GetFullInterfaceName()),
                        new CodeVariableReferenceExpression(dataToAddVariableName)
                    )
                ));


            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(_entityClassName),
                    entityClassVariableName,
                    new CodeObjectCreateExpression(
                        new CodeTypeReference(_entityClassName),
                        new CodeExpression[] { }
                    )
                ));


            //foreach (string propertyName in _dataTypeDescriptor.Fields.Where(f => !_dataTypeDescriptor.KeyPropertyNames.Contains(f.Name)).Select(f => f.Name))
            foreach (string propertyName in _dataTypeDescriptor.Fields.Select(f => f.Name))
            {
                codeMethod.Statements.Add(new CodeCommentStatement(string.Format("Interface property {0}", propertyName)));

                codeMethod.Statements.Add(
                    new CodeAssignStatement(
                        new CodePropertyReferenceExpression(
                            new CodeVariableReferenceExpression(entityClassVariableName),
                            propertyName
                        ),
                        new CodePropertyReferenceExpression(
                            new CodeVariableReferenceExpression(castedDataToAddVariableName),
                            propertyName
                        )
                    ));
            }

#warning MRJ: Is this code even used??
          /*  foreach (string propertyName in _dataTypeDescriptor.KeyPropertyNames)
            {
                SqlColumnInformation columnInformation = _dataTypeDescriptor.CreateSqlColumnInformation(propertyName);

                codeMethod.Statements.Add(new CodeCommentStatement(string.Format("DataId property {0}", property.Name)));

                Type initializerType = _table.PropertyInitializers[property.Name];

                string tempVariableName = string.Format("value{0}", property.Name);
                string tempInitializeName = string.Format("valueInitialize{0}", property.Name);

                codeMethod.Statements.Add(new CodeVariableDeclarationStatement(
                        typeof(object),
                        tempVariableName
                    ));

                codeMethod.Statements.Add(new CodeVariableDeclarationStatement(
                        initializerType,
                        tempInitializeName,
                        new CodeObjectCreateExpression(
                            initializerType,
                            new CodeExpression[] { }
                        )
                    ));


                codeMethod.Statements.Add(new CodeExpressionStatement(
                        new CodeMethodInvokeExpression(
                            new CodeVariableReferenceExpression(tempInitializeName),
                            "GetValue",
                            new CodeExpression[] {
                                        new CodeDirectionExpression(
                                            FieldDirection.Out,                                            
                                            new CodeVariableReferenceExpression(tempVariableName)                                            
                                        )
                                    }
                        )
                    ));


                codeMethod.Statements.Add(new CodeAssignStatement(
                        new CodePropertyReferenceExpression(
                            new CodeVariableReferenceExpression(entityClassVariableName),
                            property.Name
                            ),
                        new CodeCastExpression(
                            property.Type,
                            new CodeVariableReferenceExpression(tempVariableName)
                        )
                    ));
            }*/


            codeMethod.Statements.Add(new CodeCommentStatement("Done with properties"));

            codeMethod.Statements.Add(
                new CodeExpressionStatement(
                    new CodeMethodInvokeExpression(
                        new CodeVariableReferenceExpression(dataContextVariableName),
                        "Add",
                        new CodeExpression[] {
                            new CodeVariableReferenceExpression(entityClassVariableName),
                            new CodePrimitiveExpression(_dataContextFieldName)
                        }
                    )
                ));


            codeMethod.Statements.Add(
                new CodeMethodReturnStatement(
                    new CodeVariableReferenceExpression(entityClassVariableName)
                ));

            declaration.Members.Add(codeMethod);
        }



        private void AddRemoveDataMethod(CodeTypeDeclaration declaration)
        {
            const string dataContextVariableName = "dataContext";
            const string dataToRemoveVariableName = "dataToRemove";

            CodeMemberMethod codeMethod = new CodeMemberMethod();
            codeMethod.Name = "RemoveData";
            codeMethod.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeMethod.ReturnType = new CodeTypeReference(typeof(void));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(ISqlDataContext)), dataContextVariableName));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(IData)), dataToRemoveVariableName));

            codeMethod.Statements.Add(
                new CodeExpressionStatement(
                    new CodeMethodInvokeExpression(
                        new CodeVariableReferenceExpression(dataContextVariableName),
                        "Remove",
                        new CodeExpression[] {                            
                            new CodeVariableReferenceExpression(dataToRemoveVariableName),
                            new CodePrimitiveExpression(_dataContextFieldName)
                        }
                    )
                ));




            declaration.Members.Add(codeMethod);
        }



        private static string CreateDataIdPropertyInfoFieldName(string propertyName)
        {
            return string.Format("_dataIdEntityPropertyInfo{0}", propertyName);
        }
    }






#warning MRJ: BM: Remove this
    internal sealed class SqlDataProviderHelperMethodsGenerator
    {
        private SqlDataProviderCodeGeneratorTable _table;
        private string _dataContextClassName;


        public SqlDataProviderHelperMethodsGenerator(SqlDataProviderCodeGeneratorTable table, string dataContextClassName)
        {
            _table = table;
            _dataContextClassName = dataContextClassName;
        }



        public IEnumerable<KeyValuePair<string, Func<CodeTypeDeclaration>>> CreateClasses()
        {
            foreach (var kvp in _table.Stores)
            {
                string storageKey = kvp.Key;
                yield return new KeyValuePair<string, Func<CodeTypeDeclaration>>(kvp.Value.SqlDataProviderHelperMethodsClassName, () => CreateClass(storageKey));
            }
        }



        private CodeTypeDeclaration CreateClass(string storageKey)
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(_table.Stores[storageKey].SqlDataProviderHelperMethodsClassName);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(typeof(ISqlDataProviderHelper));

            foreach (Property property in _table.PropertyList.DataIdProperties)
            {
                string fieldName = CreateDataIdPropertyInfoFieldName(property.Name);

                CodeMemberField codeField = new CodeMemberField(new CodeTypeReference(typeof(PropertyInfo)), fieldName);
                codeField.InitExpression =
                    new CodeMethodInvokeExpression(
                        new CodeMethodReferenceExpression(
                            new CodeTypeReferenceExpression(typeof(IDataExtensions)),
                            "GetDataPropertyRecursivly"
                        ),
                        new CodeExpression[] {
                                new CodeTypeOfExpression(_table.Stores[storageKey].EntityClassName),
                                new CodePrimitiveExpression(property.Name)
                            }
                    );

                declaration.Members.Add(codeField);
            }

            AddGetDataByIdMethod(declaration, storageKey);
            AddAddDataMethod(declaration, storageKey);
            AddRemoveDataMethod(declaration, storageKey);

            return declaration;
        }



        private void AddGetDataByIdMethod(CodeTypeDeclaration declaration, string dataScope)
        {
            const string queryableVariableName = "queryable";
            const string dataIdVariableName = "dataId";
            const string dataProivderContextVariableName = "dataProivderContext";
            const string castedDataIdVariableName = "castedDataId";
            const string castedQueryableVariableName = "castedQueryable";
            const string paramterExpressionVariableName = "paramter";
            const string whereBodyExpressionVariableName = "whereBody";
            const string whereLambdaExpressionVariableName = "whereLambda";
            const string whereExpressionVariableName = "whereExpression";
            const string resultVariableName = "result";

            CodeMemberMethod codeMethod = new CodeMemberMethod();
            codeMethod.Name = "GetDataById";
            codeMethod.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeMethod.ReturnType = new CodeTypeReference(typeof(IData));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(IQueryable)), queryableVariableName));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(IDataId)), dataIdVariableName));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(DataProviderContext)), dataProivderContextVariableName));


            // casted dataid variable
            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(_table.Stores[dataScope].DataIdClassName),
                    castedDataIdVariableName,
                    new CodeCastExpression(
                        new CodeTypeReference(_table.Stores[dataScope].DataIdClassName),
                        new CodeVariableReferenceExpression(dataIdVariableName)
                    )
                ));


            // casted queryable variable
            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(IQueryable<>).FullName, new CodeTypeReference[] { new CodeTypeReference(_table.Stores[dataScope].EntityClassName) }),
                    castedQueryableVariableName,
                    new CodeCastExpression(
                        new CodeTypeReference(typeof(IQueryable<>).FullName, new CodeTypeReference[] { new CodeTypeReference(_table.Stores[dataScope].EntityClassName) }),
                        new CodeVariableReferenceExpression(queryableVariableName)
                    )
                ));


            // parameter expression variable
            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(ParameterExpression)),
                    paramterExpressionVariableName,
                    new CodeMethodInvokeExpression(
                        new CodeTypeReferenceExpression(typeof(Expression)),
                        "Parameter",
                        new CodeExpression[] {
                            new CodeTypeOfExpression(new CodeTypeReference(_table.Stores[dataScope].EntityClassName)),
                            new CodePrimitiveExpression("_getDataByIdParameter_")
                        }
                    )
                ));


            // where body variable
            CodeExpression currentExpresion = null;
            foreach (Property property in _table.PropertyList.DataIdProperties)
            {
                CodeExpression newExpression = new CodeMethodInvokeExpression(
                    new CodeTypeReferenceExpression(typeof(Expression)),
                    "Equal",
                    new CodeExpression[] {
                        new CodeMethodInvokeExpression(
                            new CodeTypeReferenceExpression(typeof(Expression)),
                            "Property",
                            new CodeExpression[] {
                                new CodeVariableReferenceExpression(paramterExpressionVariableName),
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    CreateDataIdPropertyInfoFieldName(property.Name)
                                )
                            }
                        ),
                        new CodeMethodInvokeExpression(
                            new CodeTypeReferenceExpression(typeof(Expression)),
                            "Constant",
                            new CodeExpression[] {
                                new CodePropertyReferenceExpression(
                                    new CodeVariableReferenceExpression(castedDataIdVariableName),
                                    property.Name
                                )
                            }
                        )
                    }
                );

                if (currentExpresion == null)
                {
                    currentExpresion = newExpression;
                }
                else
                {
                    currentExpresion = new CodeMethodInvokeExpression(
                            new CodeTypeReferenceExpression(typeof(Expression)),
                            "And",
                            new CodeExpression[] {
                                currentExpresion,
                                newExpression
                            }
                        );
                }
            }

            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(Expression)),
                    whereBodyExpressionVariableName,
                    currentExpresion
                ));


            // where labmda variable
            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(LambdaExpression)),
                    whereLambdaExpressionVariableName,
                    new CodeMethodInvokeExpression(
                        new CodeTypeReferenceExpression(typeof(Expression)),
                        "Lambda",
                        new CodeExpression[] {
                            new CodeVariableReferenceExpression(whereBodyExpressionVariableName),
                            new CodeArrayCreateExpression(
                                new CodeTypeReference(typeof(ParameterExpression)),
                                new CodeExpression[] {
                                    new CodeVariableReferenceExpression(paramterExpressionVariableName)
                                }
                            )
                        }
                    )
                ));


            // where expression variable
            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(Expression)),
                    whereExpressionVariableName,
                    new CodeMethodInvokeExpression(
                        new CodeTypeReferenceExpression(typeof(ExpressionCreator)),
                        "Where",
                        new CodeExpression[] {
                            new CodePropertyReferenceExpression(
                                new CodeVariableReferenceExpression(castedQueryableVariableName),
                                "Expression"
                            ),
                            new CodeVariableReferenceExpression(whereLambdaExpressionVariableName),
                        }
                    )
                ));


            // get result and store en list variable
            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(List<>).FullName, new CodeTypeReference[] { new CodeTypeReference(_table.Stores[dataScope].EntityClassName) }),
                    resultVariableName,
                    new CodeMethodInvokeExpression(
                        new CodeTypeReferenceExpression(typeof(Enumerable)),
                        "ToList",
                        new CodeExpression[] {
                            new CodeMethodInvokeExpression(
                                new CodeMethodReferenceExpression(
                                    new CodePropertyReferenceExpression(
                                        new CodeVariableReferenceExpression(castedQueryableVariableName),
                                        "Provider"
                                    ),                                    
                                    "CreateQuery",
                                    new CodeTypeReference[] { new CodeTypeReference(_table.Stores[dataScope].EntityClassName) }
                                ),
                                new CodeExpression[] { 
                                    new CodeVariableReferenceExpression(whereExpressionVariableName)
                                }
                            )
                        }
                    )
                ));


            // test result and return null on empty, wrappe result and return on one, else except
            codeMethod.Statements.Add(
                new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(
                        new CodePropertyReferenceExpression(
                            new CodeVariableReferenceExpression(resultVariableName),
                            "Count"
                        ),
                        CodeBinaryOperatorType.IdentityEquality,
                        new CodePrimitiveExpression(1)
                    ),
                    new CodeStatement[] {
                        new CodeMethodReturnStatement(                            
                            new CodeArrayIndexerExpression(
                                new CodeVariableReferenceExpression(resultVariableName),
                                new CodeExpression[] {
                                    new CodePrimitiveExpression(0)
                                }
                            )
                        )                        
                    },
                    new CodeStatement[] {
                        new CodeConditionStatement(
                            new CodeBinaryOperatorExpression(
                                new CodePropertyReferenceExpression(
                                    new CodeVariableReferenceExpression(resultVariableName),
                                    "Count"
                                ),
                                CodeBinaryOperatorType.IdentityEquality,
                                new CodePrimitiveExpression(0)
                            ),
                            new CodeStatement[] {
                                new CodeMethodReturnStatement(
                                    new CodePrimitiveExpression(null)
                                )       
                            },
                            new CodeStatement[] {
                            }
                        )
                    }
                ));


            codeMethod.Statements.Add(
                new CodeThrowExceptionStatement(
                    new CodeObjectCreateExpression(
                        new CodeTypeReference(typeof(InvalidOperationException)),
                        new CodePrimitiveExpression("More than one data item matched the given data id")
                    )
                ));

            declaration.Members.Add(codeMethod);
        }



        private void AddAddDataMethod(CodeTypeDeclaration declaration, string dataScope)
        {
            const string dataContextVariableName = "dataContext";
            const string dataToAddVariableName = "dataToAdd";
            const string dataProivderContextVariableName = "dataProivderContext";
            const string castedDataToAddVariableName = "castedDataToAdd";
            const string entityClassVariableName = "entity";


            CodeMemberMethod codeMethod = new CodeMemberMethod();
            codeMethod.Name = "AddData";
            codeMethod.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeMethod.ReturnType = new CodeTypeReference(typeof(IData));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(ISqlDataContext)), dataContextVariableName));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(IData)), dataToAddVariableName));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(DataProviderContext)), dataProivderContextVariableName));


            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(_table.InterfaceTypeAlias),
                    castedDataToAddVariableName,
                    new CodeCastExpression(
                        new CodeTypeReference(_table.InterfaceTypeAlias),
                        new CodeVariableReferenceExpression(dataToAddVariableName)
                    )
                ));


            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(_table.Stores[dataScope].EntityClassName),
                    entityClassVariableName,
                    new CodeObjectCreateExpression(
                        new CodeTypeReference(_table.Stores[dataScope].EntityClassName),
                        new CodeExpression[] { }
                    )
                ));


            foreach (Property property in _table.PropertyList.InterfaceProperties)
            {
                codeMethod.Statements.Add(new CodeCommentStatement(string.Format("Interface property {0}", property.Name)));

                codeMethod.Statements.Add(
                    new CodeAssignStatement(
                        new CodePropertyReferenceExpression(
                            new CodeVariableReferenceExpression(entityClassVariableName),
                            property.Name
                        ),
                        new CodePropertyReferenceExpression(
                            new CodeVariableReferenceExpression(castedDataToAddVariableName),
                            property.Name
                        )
                    ));
            }


            foreach (Property property in _table.PropertyList.DataIdProperties)
            {
                if (property.IsInterface == false)
                {
                    SqlColumnInformation columnInformation = _table.Stores[dataScope].SqlTableInformation[property.MappedName];

                    if ((columnInformation.IsIdentity == false) &&
                        (columnInformation.IsComputed == false))
                    {
                        codeMethod.Statements.Add(new CodeCommentStatement(string.Format("DataId property {0}", property.Name)));

                        Type initializerType = _table.PropertyInitializers[property.Name];

                        string tempVariableName = string.Format("value{0}", property.Name);
                        string tempInitializeName = string.Format("valueInitialize{0}", property.Name);

                        codeMethod.Statements.Add(new CodeVariableDeclarationStatement(
                                typeof(object),
                                tempVariableName
                            ));

                        codeMethod.Statements.Add(new CodeVariableDeclarationStatement(
                                initializerType,
                                tempInitializeName,
                                new CodeObjectCreateExpression(
                                    initializerType,
                                    new CodeExpression[] { }
                                )
                            ));


                        codeMethod.Statements.Add(new CodeExpressionStatement(
                                new CodeMethodInvokeExpression(
                                    new CodeVariableReferenceExpression(tempInitializeName),
                                    "GetValue",
                                    new CodeExpression[] {
                                        new CodeDirectionExpression(
                                            FieldDirection.Out,                                            
                                            new CodeVariableReferenceExpression(tempVariableName)                                            
                                        )
                                    }
                                )
                            ));


                        codeMethod.Statements.Add(new CodeAssignStatement(
                                new CodePropertyReferenceExpression(
                                    new CodeVariableReferenceExpression(entityClassVariableName),
                                    property.Name
                                    ),
                                new CodeCastExpression(
                                    property.Type,
                                    new CodeVariableReferenceExpression(tempVariableName)
                                )
                            ));
                    }
                }
            }


            codeMethod.Statements.Add(new CodeCommentStatement("Done with properties"));

            codeMethod.Statements.Add(
                new CodeExpressionStatement(
                    new CodeMethodInvokeExpression(
                        new CodeVariableReferenceExpression(dataContextVariableName),
                        "Add",
                        new CodeExpression[] {
                            new CodeVariableReferenceExpression(entityClassVariableName),
                            new CodePrimitiveExpression(_table.Stores[dataScope].DataContextFieldName)
                        }
                    )
                ));


            codeMethod.Statements.Add(
                new CodeMethodReturnStatement(
                    new CodeVariableReferenceExpression(entityClassVariableName)
                ));

            declaration.Members.Add(codeMethod);
        }



        private void AddRemoveDataMethod(CodeTypeDeclaration declaration, string dataScope)
        {
            const string dataContextVariableName = "dataContext";
            const string dataToRemoveVariableName = "dataToRemove";

            CodeMemberMethod codeMethod = new CodeMemberMethod();
            codeMethod.Name = "RemoveData";
            codeMethod.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeMethod.ReturnType = new CodeTypeReference(typeof(void));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(ISqlDataContext)), dataContextVariableName));
            codeMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(IData)), dataToRemoveVariableName));

            codeMethod.Statements.Add(
                new CodeExpressionStatement(
                    new CodeMethodInvokeExpression(
                        new CodeVariableReferenceExpression(dataContextVariableName),
                        "Remove",
                        new CodeExpression[] {                            
                            new CodeVariableReferenceExpression(dataToRemoveVariableName),
                            new CodePrimitiveExpression(_table.Stores[dataScope].DataContextFieldName)
                        }
                    )
                ));




            declaration.Members.Add(codeMethod);
        }



        private static string CreateDataIdPropertyInfoFieldName(string propertyName)
        {
            return string.Format("_dataIdEntityPropertyInfo{0}", propertyName);
        }
    }
}
