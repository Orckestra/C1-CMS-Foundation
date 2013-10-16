using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration
{
    internal sealed class DataWrapperClassGenerator
    {
        private readonly string _wrapperClassName;
        private readonly DataTypeDescriptor _dataTypeDescriptor;
        private string _interfaceName;

        private const string WrappedElementFieldName = "_element";
        private const string DataSourceIdFieldName = "_dataSourceId";
        private const string ElementMethodInfoFieldName = "_elementMethodInfo";

        public DataWrapperClassGenerator(string wrapperClassName, DataTypeDescriptor dataTypeDescriptor)
        {
            _wrapperClassName = wrapperClassName;
            _dataTypeDescriptor = dataTypeDescriptor;
        }



        public CodeTypeDeclaration CreateClass()
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(_wrapperClassName);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(InterfaceName);
            declaration.BaseTypes.Add(typeof(IXElementWrapper));
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
            declaration.Members.Add(new CodeMemberField(new CodeTypeReference(typeof(XElement)), WrappedElementFieldName));
            declaration.Members.Add(new CodeMemberField(typeof(DataSourceId), DataSourceIdFieldName));

            CodeMemberField elementMethodInfoField = new CodeMemberField(typeof(MethodInfo), ElementMethodInfoFieldName);
            elementMethodInfoField.Attributes = MemberAttributes.Static | MemberAttributes.Private;
            declaration.Members.Add(elementMethodInfoField);
            elementMethodInfoField.InitExpression = new CodeMethodInvokeExpression(
                    new CodeTypeOfExpression(typeof(XElement)),
                    "GetMethod",
                    new CodeExpression[] {
                        new CodePrimitiveExpression("Element")
                    }
                );



            AddConstructor(declaration);
            AddCommitDataMethod(declaration);
            AddIDataSourceProperty(declaration);
            AddInterfaceProperties(declaration);

            return declaration;
        }



        private static void AddConstructor(CodeTypeDeclaration declaration)
        {
            const string parameterName = "element";

            CodeConstructor constructor = new CodeConstructor();

            constructor.Attributes = MemberAttributes.Public;

            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                    new CodeTypeReference(typeof(XElement)),
                    parameterName
                ));

            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                typeof(DataSourceId),
                "dataSourceId"
                ));

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        WrappedElementFieldName
                        ),
                        new CodeArgumentReferenceExpression(parameterName)
                    ));

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        "_dataSourceId"
                        ),
                    new CodeArgumentReferenceExpression("dataSourceId")
                    ));


            declaration.Members.Add(constructor);
        }



        private void AddCommitDataMethod(CodeTypeDeclaration declaration)
        {
            CodeMemberMethod method = new CodeMemberMethod();

            method.Name = "CommitData";
            method.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            method.ReturnType = new CodeTypeReference(typeof(void));
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(XElement), "wrappedElement"));

            method.Statements.Add(new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        WrappedElementFieldName
                    ),
                    new CodeVariableReferenceExpression("wrappedElement")
                ));


            List<CodeStatement> statments = new List<CodeStatement>();

            foreach (DataFieldDescriptor dataFieldDescriptor in _dataTypeDescriptor.Fields)
            {
                string fieldName = CreateNullableFieldName(dataFieldDescriptor);

                List<CodeStatement> newStatements = AddCommitDataMethodHelper(
                    "attribute",
                    new CodePrimitiveExpression(dataFieldDescriptor.Name),
                    new CodePropertyReferenceExpression(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            fieldName
                        ),
                        "Value"
                    ));

                statments.Add(AddCommitDataMethodFinalHelper(dataFieldDescriptor, newStatements));
            }


            method.Statements.AddRange(statments.ToArray());

            declaration.Members.Add(method);
        }



        private static CodeStatement AddCommitDataMethodFinalHelper(DataFieldDescriptor dataFieldDescriptor, List<CodeStatement> statements)
        {
            string fieldName = CreateNullableFieldName(dataFieldDescriptor);

            return new CodeConditionStatement(
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
                );
        }



        private static List<CodeStatement> AddCommitDataMethodHelper(string elementVariableName, CodeExpression tagNameExpression, CodeExpression valueExpression)
        {
            CodeStatement[] innerStatements = new CodeStatement[] {
                        new CodeConditionStatement(
                            new CodeBinaryOperatorExpression(
                                valueExpression,
                                CodeBinaryOperatorType.IdentityInequality,
                                new CodePrimitiveExpression(null)
                            ),
                            new CodeStatement[] {
                                new CodeConditionStatement(
                                    new CodeBinaryOperatorExpression(
                                        new CodeVariableReferenceExpression(elementVariableName),
                                        CodeBinaryOperatorType.IdentityEquality,
                                        new CodePrimitiveExpression(null)
                                    ),
                                    new CodeStatement[] {
                                        new CodeAssignStatement(
                                            new CodeVariableReferenceExpression(elementVariableName),
                                            new CodeObjectCreateExpression(
                                                typeof(XAttribute),
                                                new CodeExpression[] {
                                                    tagNameExpression,
                                                    valueExpression
                                                }
                                            )
                                        ),
                                        new CodeExpressionStatement(
                                            new CodeMethodInvokeExpression(
                                                new CodeFieldReferenceExpression(
                                                    new CodeThisReferenceExpression(),
                                                    WrappedElementFieldName
                                                ),
                                                "Add",
                                                new CodeExpression[] {
                                                    new CodeVariableReferenceExpression(elementVariableName)                                                    
                                                }
                                            )
                                        )
                                    },
                                    new CodeStatement[] {
                                        new CodeExpressionStatement(
                                            new CodeMethodInvokeExpression(
                                                new CodeVariableReferenceExpression(elementVariableName),
                                                "SetValue",
                                                new CodeExpression[] {
                                                    valueExpression
                                                }
                                            )
                                        ),
                                    }
                                )
                            },
                            new CodeStatement[] {
                                new CodeConditionStatement(
                                    new CodeBinaryOperatorExpression(
                                        new CodeVariableReferenceExpression(elementVariableName),
                                        CodeBinaryOperatorType.IdentityInequality,
                                        new CodePrimitiveExpression(null)
                                    ),
                                    new CodeStatement[] {
                                        new CodeExpressionStatement(
                                            new CodeMethodInvokeExpression(
                                                new CodeVariableReferenceExpression(elementVariableName),
                                                "Remove",
                                                new CodeExpression[] {}
                                            )
                                        )
                                    }
                                )
                            }
                        )
                    };


            List<CodeStatement> statements = new List<CodeStatement>();

            statements.Add(new CodeVariableDeclarationStatement(
                            typeof(XAttribute),
                            elementVariableName,
                            new CodeMethodInvokeExpression(
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    WrappedElementFieldName
                                ),
                                "Attribute",
                                new CodeExpression[] {
                                    tagNameExpression
                                }
                            )
                        ));

            statements.AddRange(innerStatements);


            return statements;
        }




        private static void AddIDataSourceProperty(CodeTypeDeclaration declaration)
        {
            PropertyInfo info = typeof(IData).GetProperty("DataSourceId");

            CodeMemberProperty property = new CodeMemberProperty();
            property.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            property.Name = info.Name;
            property.HasGet = true;
            property.HasSet = false;
            property.Type = new CodeTypeReference(info.PropertyType);

            property.GetStatements.Add(
                new CodeMethodReturnStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        "_dataSourceId"
                        )
                    ));


            declaration.Members.Add(property);
        }



        private void AddInterfaceProperties(CodeTypeDeclaration declaration)
        {
            foreach (DataFieldDescriptor dataFieldDescriptor in _dataTypeDescriptor.Fields)
            {
                string fieldName = CreateNullableFieldName(dataFieldDescriptor);

                CodeMemberField field = new CodeMemberField();
                CodeTypeReference nullableType = new CodeTypeReference(
                        typeof(ExtendedNullable<>).FullName,
                        new [] { new CodeTypeReference(dataFieldDescriptor.InstanceType) }
                    );
                field.Name = fieldName;
                field.Type = nullableType;
                field.InitExpression = new CodeObjectCreateExpression(nullableType, new CodeExpression[] { });

                declaration.Members.Add(field);

                var xNameField = new CodeMemberField();
                xNameField.Name = CreateXNameFieldName(dataFieldDescriptor);
                xNameField.Type = new CodeTypeReference(typeof(XName));
                xNameField.Attributes = MemberAttributes.Static | MemberAttributes.Private;
                xNameField.InitExpression = new CodePrimitiveExpression(dataFieldDescriptor.Name);
                declaration.Members.Add(xNameField);

                CodeMemberProperty property = new CodeMemberProperty();
                property.Attributes = MemberAttributes.Public | MemberAttributes.Final;
                property.Name = dataFieldDescriptor.Name;
                property.HasGet = true;
                property.HasSet = true;
                property.Type = new CodeTypeReference(dataFieldDescriptor.InstanceType);

                CodeStatement statement;
                if ((dataFieldDescriptor.InstanceType == typeof(string)) ||
                    ((dataFieldDescriptor.InstanceType.IsGenericType) && (dataFieldDescriptor.InstanceType.GetGenericTypeDefinition() == typeof(Nullable<>))))
                {
                    statement = new CodeMethodReturnStatement(new CodePrimitiveExpression(null));
                }
                else
                {
                    statement = new CodeThrowExceptionStatement(
                                        new CodeObjectCreateExpression(
                                            typeof(InvalidOperationException),
                                            new CodeExpression[] {
                                                new CodePrimitiveExpression(
                                                    string.Format("The element attribute {0} is missing from the xml file", dataFieldDescriptor.Name)
                                                )
                                            }
                                        )
                                    );
                }

                property.GetStatements.Add(
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
                        new CodeMethodReturnStatement(
                            new CodePropertyReferenceExpression(
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    fieldName
                                    ),
                                "Value"
                                )
                            )
                        ));

                // XAttribute attribute = _element.Attribute(_{fieldName}XName);
                property.GetStatements.Add(
                    new CodeVariableDeclarationStatement(
                        typeof (XAttribute), "attribute",
                        new CodeMethodInvokeExpression(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                WrappedElementFieldName
                                ),
                            "Attribute",
                            new CodeFieldReferenceExpression(null, CreateXNameFieldName(dataFieldDescriptor))
                            )));

                // GEN: if (attribute == null) ...
                property.GetStatements.Add(
                    new CodeConditionStatement(
                            new CodeBinaryOperatorExpression(
                                new CodeVariableReferenceExpression("attribute"), 
                                CodeBinaryOperatorType.IdentityEquality,
                                new CodePrimitiveExpression(null)
                            ),
                            new CodeStatement[] {
                                statement
                            }
                        ));

                CodeExpression resultExpression;


                if (!dataFieldDescriptor.StoreType.IsDecimal)
                {
                    // ({Type}) attribute;
                    resultExpression = new CodeCastExpression(dataFieldDescriptor.InstanceType, 
                                                              new CodeVariableReferenceExpression("attribute"));
                }
                else
                {
                    // FixDecimal(attribute.Value, {decimal precision});
                    resultExpression = new CodeMethodInvokeExpression(
                        new CodeMethodReferenceExpression(
                            new CodeTypeReferenceExpression(typeof(DataProviderHelperBase)),
                            "ParseDecimal"),
                            new CodePropertyReferenceExpression(new CodeVariableReferenceExpression("attribute"), "Value"),
                            new CodePrimitiveExpression(dataFieldDescriptor.StoreType.NumericScale)
                    );
                }

                property.GetStatements.Add(new CodeMethodReturnStatement(resultExpression));


                if (!dataFieldDescriptor.IsReadOnly)
                {
                    property.SetStatements.Add(
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

                declaration.Members.Add(property);
            }
        }



        private static string CreateNullableFieldName(DataFieldDescriptor dataFieldDescriptor)
        {
            return string.Format("_{0}Nullable", dataFieldDescriptor.Name.ToLowerInvariant());
        }

        private static string CreateXNameFieldName(DataFieldDescriptor dataFieldDescriptor)
        {
            return string.Format("_{0}XName", dataFieldDescriptor.Name.ToLowerInvariant());
        }


        private string InterfaceFullName { get { return TypeManager.GetRuntimeFullName(_dataTypeDescriptor.TypeManagerTypeName); } }


        private string InterfaceName
        {
            get
            {
                if (_interfaceName == null)
                {
                    _interfaceName = InterfaceFullName;
                    if (_interfaceName.IndexOf(',') >= 0)
                    {
                        _interfaceName = _interfaceName.Remove(_interfaceName.IndexOf(','));
                    }
                }

                return _interfaceName;
            }
        }
    }
}
