using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Data;
using Composite.Core.Types;
using Composite.Data.Plugins.DataProvider.CodeGeneration;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration.Foundation
{
    internal sealed class XmlDataWrapperClassGenerator
    {
        private string _wrapperClassName;
        private Type _interfaceType;
        private PropertyList _propertyList;


        private static readonly string _wrappedElementFieldName = "_element";
        private static readonly string _dataSourceIdFieldName = "_dataSourceId";
        private static readonly string _elementMethodInfoFieldName = "_elementMethodInfo";        

        public XmlDataWrapperClassGenerator(string wrapperClassName,
                                            Type interfaceType,
                                            PropertyList propertyList)
        {
            _wrapperClassName = wrapperClassName;
            _interfaceType = interfaceType;
            _propertyList = propertyList;
        }



        public CodeTypeDeclaration CreateClass()
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(_wrapperClassName);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(_interfaceType);
            declaration.BaseTypes.Add(typeof(IXElementWrapper));
            declaration.Members.Add(new CodeMemberField(new CodeTypeReference(typeof(XElement)), _wrappedElementFieldName));
            declaration.Members.Add(new CodeMemberField(typeof(DataSourceId), _dataSourceIdFieldName));

            CodeMemberField elementMethodInfoField = new CodeMemberField(typeof(MethodInfo), _elementMethodInfoFieldName);
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



        private void AddConstructor(CodeTypeDeclaration declaration)
        {
            string parameterName = "element";

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
                        _wrappedElementFieldName
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
                        _wrappedElementFieldName
                    ),
                    new CodeVariableReferenceExpression("wrappedElement")
                ));


            List<CodeStatement> statments = new List<CodeStatement>();

            foreach (Property property in _propertyList.InterfaceProperties)
            {
                string fieldName = CreateNullableFieldName(property);

                List<CodeStatement> newStatements = AddCommitDataMethodHelper(
                    "attribute",
                    new CodePrimitiveExpression(property.MappedName),
                    property.Type,
                    new CodePropertyReferenceExpression(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            fieldName
                        ),
                        "Value"
                    ),
                    new CodePropertyReferenceExpression(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            fieldName
                        ),
                        "Value"
                    ));

                statments.Add(AddCommitDataMethodFinalHelper(property, newStatements));
            }            


            method.Statements.AddRange(statments.ToArray());

            declaration.Members.Add(method);
        }



        private CodeStatement AddCommitDataMethodFinalHelper(Property property, List<CodeStatement> statements)
        {
            string fieldName = CreateNullableFieldName(property);

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



        private List<CodeStatement> AddCommitDataMethodHelper(string elementVariableName, CodeExpression tagNameExpression, Type propertyType, CodeExpression valueExpression, CodeExpression nullableExpression)
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
                                                    _wrappedElementFieldName
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
                                    _wrappedElementFieldName
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




        private void AddIDataSourceProperty(CodeTypeDeclaration declaration)
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
            foreach (Property prop in _propertyList.InterfaceProperties)
            {
                string fieldName = CreateNullableFieldName(prop);

                CodeMemberField field = new CodeMemberField();
                CodeTypeReference nullableType = new CodeTypeReference(
                        typeof(ExtendedNullable<>).FullName,
                        new CodeTypeReference[] { new CodeTypeReference(prop.Type) }
                    );
                field.Name = fieldName;
                field.Type = nullableType;
                field.InitExpression = new CodeObjectCreateExpression(nullableType, new CodeExpression[] { });

                declaration.Members.Add(field);



                CodeMemberProperty property = new CodeMemberProperty();
                property.Attributes = MemberAttributes.Public | MemberAttributes.Final;
                property.Name = prop.Name;
                property.HasGet = true;
                property.HasSet = true;
                property.Type = new CodeTypeReference(prop.Type);

                CodeStatement statement;
                if ((prop.Type == typeof(string)) ||
                    ((prop.Type.IsGenericType == true) && (prop.Type.GetGenericTypeDefinition() == typeof(Nullable<>))))
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
                                                    string.Format("The element tag {0} is missing from the xml file", prop.MappedName)
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
                            new CodeConditionStatement(
                                new CodeBinaryOperatorExpression(
                                    new CodeMethodInvokeExpression(
                                        new CodeFieldReferenceExpression(
                                            new CodeThisReferenceExpression(),
                                            _wrappedElementFieldName
                                        ),
                                        "Attribute",
                                        new CodePrimitiveExpression(prop.MappedName)
                                    ),
                                    CodeBinaryOperatorType.IdentityEquality,
                                    new CodePrimitiveExpression(null)
                                ),
                                new CodeStatement[] {
                                    statement
                                }
                            ) } ));

                CodeExpression resultExpression;


                //  this._element.Attribute("{field name}");
                CodeExpression getAttributeValueExpression = new CodeMethodInvokeExpression(
                    new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), _wrappedElementFieldName),
                    "Attribute", 
                    new CodeExpression[] { new CodePrimitiveExpression(prop.MappedName) }
                );


                if((prop.DecimalPrecision) == 0)
                {
                     // ({Type}) this._element.Attribute("{field name}");
                    resultExpression = new CodeCastExpression(prop.Type, getAttributeValueExpression);
                }
                else
                {
                    // FixDecimal(this._element.Attribute("{field name}").Value, {decimal precision});
                    resultExpression = new CodeMethodInvokeExpression(
                        new CodeMethodReferenceExpression(
                            new CodeTypeReferenceExpression(typeof(DataProviderHelperBase)),
                            "ParseDecimal"),
                            new CodePropertyReferenceExpression(getAttributeValueExpression, "Value"),
                            new CodePrimitiveExpression(prop.DecimalPrecision)
                    );
                }

                property.GetStatements.Add(new CodeMethodReturnStatement(resultExpression));


                if (false == prop.ReadOnly)
                {
                    foreach (Type type in prop.BeforeSetHandlerTypes)
                    {
                        property.SetStatements.Add(
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

        private static string CreateNullableFieldName(Property property)
        {
            return string.Format("_{0}Nullable", property.Name.ToLower());
        }
    }
}
