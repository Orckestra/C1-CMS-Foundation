using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    internal class SqlDataProviderHelperGenerator
    {
        private readonly DataTypeDescriptor _dataTypeDescriptor;        
        private readonly string _sqlDataProviderHelperClassName;
        private readonly string _dataIdClassName;
        private readonly string _entityClassName;
        private readonly string _dataContextFieldName;



        public SqlDataProviderHelperGenerator(DataTypeDescriptor dataTypeDescriptor, string sqlDataProviderHelperClassName, string dataIdClassName, string entityClassName, string dataContextFieldName)
        {
            _dataTypeDescriptor = dataTypeDescriptor;            
            _sqlDataProviderHelperClassName = sqlDataProviderHelperClassName;
            _dataIdClassName = dataIdClassName;
            _entityClassName = entityClassName;
            _dataContextFieldName = dataContextFieldName;
        }



        public CodeTypeDeclaration CreateClass()
        {
            var declaration = new CodeTypeDeclaration(_sqlDataProviderHelperClassName)
            {
                IsClass = true,
                TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed
            };

            declaration.BaseTypes.Add(typeof(ISqlDataProviderHelper));

            foreach (string keyFieldName in _dataTypeDescriptor.PhysicalKeyPropertyNames)
            {
                string fieldName = CreateDataIdPropertyInfoFieldName(keyFieldName);

                CodeMemberField codeField = new CodeMemberField(new CodeTypeReference(typeof (PropertyInfo)), fieldName)
                {
                    InitExpression = new CodeMethodInvokeExpression(
                        new CodeMethodReferenceExpression(
                            new CodeTypeReferenceExpression(typeof (IDataExtensions)),
                            nameof(IDataExtensions.GetDataPropertyRecursively)
                        ),
                        new CodeExpression[]
                        {
                            new CodeTypeOfExpression(_entityClassName),
                            new CodePrimitiveExpression(keyFieldName)
                        }
                    )
                };

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
            CodeExpression currentExpression = null;
            foreach (string propertyName in _dataTypeDescriptor.PhysicalKeyPropertyNames)
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

                if (currentExpression == null)
                {
                    currentExpression = newExpression;
                }
                else
                {
                    currentExpression = new CodeMethodInvokeExpression(
                            new CodeTypeReferenceExpression(typeof(Expression)),
                            "And",
                            new [] {
                                currentExpression,
                                newExpression
                            }
                        );
                }
            }

            codeMethod.Statements.Add(
                new CodeVariableDeclarationStatement(
                    new CodeTypeReference(typeof(Expression)),
                    whereBodyExpressionVariableName,
                    currentExpression
                ));


            // where lambda variable
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
            return $"_dataIdEntityPropertyInfo{propertyName}";
        }
    }
}
