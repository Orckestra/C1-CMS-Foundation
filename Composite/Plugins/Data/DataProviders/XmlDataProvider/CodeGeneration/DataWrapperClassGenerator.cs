using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
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
            var declaration = new CodeTypeDeclaration(_wrapperClassName)
            {
                IsClass = true,
                TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed
            };

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

            var elementMethodInfoField = new CodeMemberField(typeof(MethodInfo), ElementMethodInfoFieldName)
            {
                Attributes = MemberAttributes.Static | MemberAttributes.Private
            };
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

            // CODEGEN:
            // public .ctor(XElement element, DataSourceId dataSourceId) { ... }
            var constructor = new CodeConstructor { Attributes = MemberAttributes.Public };

            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                    new CodeTypeReference(typeof(XElement)),
                    parameterName
                ));

            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                typeof(DataSourceId),
                "dataSourceId"
                ));


            // CODEGEN:
            // this._element = element;

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        WrappedElementFieldName
                        ),
                        new CodeArgumentReferenceExpression(parameterName)
                    ));

            // CODEGEN:
            // this._dataSourceId = dataSourceId;

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        DataSourceIdFieldName
                        ),
                    new CodeArgumentReferenceExpression("dataSourceId")
                    ));


            declaration.Members.Add(constructor);
        }



        private void AddCommitDataMethod(CodeTypeDeclaration declaration)
        {
            // CODEGEN: 
            // public void CommitData(XElement wrappedElement) { ... }

            var method = new CodeMemberMethod
            {
                Name = nameof(IXElementWrapper.CommitData),
                Attributes = MemberAttributes.Public | MemberAttributes.Final,
                ReturnType = new CodeTypeReference(typeof (void))
            };
            
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(XElement), "wrappedElement"));

            // CODEGEN:
            // this._element = wrappedElement;

            method.Statements.Add(new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        WrappedElementFieldName
                    ),
                    new CodeVariableReferenceExpression("wrappedElement")
                ));

            var statments = new List<CodeStatement>();

            foreach (DataFieldDescriptor dataFieldDescriptor in _dataTypeDescriptor.Fields)
            {
                string fieldName = CreateNullableFieldName(dataFieldDescriptor);

                var newStatements = AddCommitDataMethodHelper(
                    "attribute",
                    new CodeFieldReferenceExpression(null, CreateXNameFieldName(dataFieldDescriptor)),
                    new CodePropertyReferenceExpression(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            fieldName
                        ),
                        nameof(ExtendedNullable<string>.Value)
                    ));

                statments.Add(AddCommitDataMethodFinalHelper(dataFieldDescriptor, newStatements));
            }


            method.Statements.AddRange(statments.ToArray());

            declaration.Members.Add(method);
        }



        private static CodeStatement AddCommitDataMethodFinalHelper(DataFieldDescriptor dataFieldDescriptor, IEnumerable<CodeStatement> statements)
        {
            // CODEGEN:
            // if (this._isSet_email && this._emailNullable != null) {
            //     [statements]
            //     _isSet_email = false;
            // }

            string fieldName = CreateNullableFieldName(dataFieldDescriptor);

            // this._isSet_email
            var fieldIsSetFieldReference = 
                new CodeFieldReferenceExpression(
                    new CodeThisReferenceExpression(),
                    IsSetFieldName(dataFieldDescriptor)
                );

            // this._emailNullable != null
            var expression2 = new CodeBinaryOperatorExpression(
                new CodeFieldReferenceExpression(
                    new CodeThisReferenceExpression(),
                    fieldName
                ),
                CodeBinaryOperatorType.IdentityInequality,
                new CodePrimitiveExpression(null)
            );

            return new CodeConditionStatement(
                new CodeBinaryOperatorExpression(
                    fieldIsSetFieldReference, CodeBinaryOperatorType.BooleanAnd, expression2),
                    statements.Concat(new [] {
                        // CODEGEN:
                        // this._isSetEmail = false;
                        new CodeAssignStatement(
                            fieldIsSetFieldReference,
                            new CodePrimitiveExpression(false)
                        )}).ToArray()
                );
        }



        private static CodeStatement[] AddCommitDataMethodHelper(string elementVariableName, CodeExpression attributeNameExpression, CodeExpression valueExpression)
        {
            var elementVariable = new CodeVariableReferenceExpression(elementVariableName);

            return new CodeStatement[] {
                new CodeVariableDeclarationStatement(
                    typeof(XAttribute),
                    elementVariableName,
                    new CodeMethodInvokeExpression(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            WrappedElementFieldName
                        ),
                        "Attribute",
                        attributeNameExpression)
                ),
                new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(
                        valueExpression,
                        CodeBinaryOperatorType.IdentityInequality,
                        new CodePrimitiveExpression(null)
                    ),
                    new CodeStatement[] {
                        new CodeConditionStatement(
                            new CodeBinaryOperatorExpression(
                                elementVariable,
                                CodeBinaryOperatorType.IdentityEquality,
                                new CodePrimitiveExpression(null)
                            ),
                            new CodeStatement[] {
                                new CodeAssignStatement(
                                    elementVariable,
                                    new CodeObjectCreateExpression(
                                        typeof(XAttribute),
                                        attributeNameExpression,
                                        valueExpression
                                    )
                                ),
                                new CodeExpressionStatement(
                                    new CodeMethodInvokeExpression(
                                        new CodeFieldReferenceExpression(
                                            new CodeThisReferenceExpression(),
                                            WrappedElementFieldName
                                        ),
                                        "Add",
                                        elementVariable)
                                )
                            },
                            new CodeStatement[] {
                                new CodeExpressionStatement(
                                    new CodeMethodInvokeExpression(
                                        elementVariable,
                                        "SetValue", 
                                        valueExpression)
                                ),
                            }
                        )
                    },
                    // CODEGEN:
                    // else if (attribute != null)
                    // {
                    //   attribute.Remove();
                    // }
                    new CodeStatement[] {
                        new CodeConditionStatement(
                            new CodeBinaryOperatorExpression(
                                elementVariable,
                                CodeBinaryOperatorType.IdentityInequality,
                                new CodePrimitiveExpression(null)
                            ),
                            new CodeExpressionStatement(
                                new CodeMethodInvokeExpression(
                                    elementVariable,
                                    "Remove"
                                )
                            )
                        )
                    }
                )
            };
        }




        private static void AddIDataSourceProperty(CodeTypeDeclaration declaration)
        {
            PropertyInfo info = typeof(IData).GetProperty("DataSourceId");

            var property = new CodeMemberProperty
            {
                Attributes = MemberAttributes.Public | MemberAttributes.Final,
                Name = info.Name,
                HasGet = true,
                HasSet = false,
                Type = new CodeTypeReference(info.PropertyType)
            };

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
                string nullableFieldName = CreateNullableFieldName(dataFieldDescriptor);

                var nullableFieldReference = new CodeFieldReferenceExpression(
                    new CodeThisReferenceExpression(),
                    nullableFieldName
                );

                var nullableFieldValueReference = new CodePropertyReferenceExpression(
                    nullableFieldReference,
                    nameof(ExtendedNullable<string>.Value)
                );

                // CODEGEN:
                // private ExtendedNullable<string> _emailNullable;

                var nullableType = new CodeTypeReference(
                    typeof(ExtendedNullable<>).FullName,
                    new[] { new CodeTypeReference(dataFieldDescriptor.InstanceType) }
                );

                declaration.Members.Add(new CodeMemberField
                {
                    Name = nullableFieldName,
                    Type = nullableType
                });

                // CODEGEN:
                // private bool _isSet_email;

                declaration.Members.Add(new CodeMemberField
                {
                    Name = IsSetFieldName(dataFieldDescriptor),
                    Type = new CodeTypeReference(typeof(bool))
                });

                // CODEGEN:
                // private static XName _pointsXName = "Points";

                var xNameField = new CodeMemberField
                {
                    Name = CreateXNameFieldName(dataFieldDescriptor),
                    Type = new CodeTypeReference(typeof(XName)),
                    Attributes = MemberAttributes.Static | MemberAttributes.Private,
                    InitExpression = new CodePrimitiveExpression(dataFieldDescriptor.Name)
                };
                declaration.Members.Add(xNameField);

                // CODEGEN: 
                // public string Email { get {...} set { ...} } 

                var property = new CodeMemberProperty
                {
                    Attributes = MemberAttributes.Public | MemberAttributes.Final,
                    Name = dataFieldDescriptor.Name,
                    HasGet = true,
                    HasSet = true,
                    Type = new CodeTypeReference(dataFieldDescriptor.InstanceType)
                };

                // CODEGEN:
                // if(this._emailNullable != null) {
                //     return this._emailNullable.Value;
                // }
                property.GetStatements.Add(
                    new CodeConditionStatement(
                        new CodeBinaryOperatorExpression(
                            nullableFieldReference,
                            CodeBinaryOperatorType.IdentityInequality,
                            new CodePrimitiveExpression(null)
                            ),
                        new CodeMethodReturnStatement(
                            nullableFieldValueReference
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


                // CODEGEN: 
                // if (attribute == null) {
                //    return null; 
                // }
                //
                // or
                //
                // if (attribute == null) {
                //    throw new InvalidOperationException("The element attribute 'Email' is missing from the xml file");
                // }

                CodeStatement noAttributeReturnStatement;
                if (dataFieldDescriptor.InstanceType == typeof(string)
                    || (dataFieldDescriptor.InstanceType.IsGenericType
                        && dataFieldDescriptor.InstanceType.GetGenericTypeDefinition() == typeof(Nullable<>)))
                {
                    noAttributeReturnStatement = new CodeMethodReturnStatement(new CodePrimitiveExpression(null));
                }
                else
                {
                    noAttributeReturnStatement = 
                        new CodeThrowExceptionStatement(
                            new CodeObjectCreateExpression(
                                typeof(InvalidOperationException), 
                                new CodePrimitiveExpression(
                                    $"The element attribute '{dataFieldDescriptor.Name}' is missing from the xml file"
                                ))
                        );
                }

                property.GetStatements.Add(
                    new CodeConditionStatement(
                            new CodeBinaryOperatorExpression(
                                new CodeVariableReferenceExpression("attribute"), 
                                CodeBinaryOperatorType.IdentityEquality,
                                new CodePrimitiveExpression(null)
                            ),
                            
                            noAttributeReturnStatement
                        ));


                CodeExpression valueExpression;


                if (!dataFieldDescriptor.StoreType.IsDecimal)
                {
                    // ({Type}) attribute;
                    valueExpression = new CodeCastExpression(dataFieldDescriptor.InstanceType, 
                                                              new CodeVariableReferenceExpression("attribute"));
                }
                else
                {
                    // FixDecimal(attribute.Value, {decimal precision});
                    valueExpression = new CodeMethodInvokeExpression(
                        new CodeMethodReferenceExpression(
                            new CodeTypeReferenceExpression(typeof(DataProviderHelperBase)),
                            nameof(DataProviderHelperBase.ParseDecimal)), 
                            new CodePropertyReferenceExpression(new CodeVariableReferenceExpression("attribute"), "Value"),
                            new CodePrimitiveExpression(dataFieldDescriptor.StoreType.NumericScale)
                    );
                }

                // CODEGEN:
                // Type value = ({Type}) attribute;
                property.GetStatements.Add(
                    new CodeVariableDeclarationStatement(
                        dataFieldDescriptor.InstanceType, 
                        "value",
                        valueExpression));


                // CODEGEN:
                // this._emailNullable = value; // Using the implicit cast to ExtendedEnumerable<>

                property.GetStatements.Add(
                    new CodeAssignStatement(
                        nullableFieldReference,
                        new CodeVariableReferenceExpression("value")));

                // CODEGEN:
                // return value;
                property.GetStatements.Add(
                    new CodeMethodReturnStatement(
                        new CodeVariableReferenceExpression("value")));


                if (!dataFieldDescriptor.IsReadOnly)
                {
                    // CODEGEN:
                    // if(this.[fieldName] == null) {
                    //   this.[fieldName] = value; 
                    // }
                    // else 
                    // {
                    //    // this._emailNullable.Value = value;
                    // }
                    property.SetStatements.Add(
                       new CodeConditionStatement(
                           new CodeBinaryOperatorExpression(
                               nullableFieldReference,
                               CodeBinaryOperatorType.IdentityEquality,
                               new CodePrimitiveExpression(null)
                               ),
                           new CodeStatement[]
                           {
                               new CodeAssignStatement(
                                   nullableFieldReference,
                                   new CodePropertySetValueReferenceExpression())
                           },
                           new CodeStatement[]
                           {
                               new CodeAssignStatement(
                                   nullableFieldValueReference,
                                   new CodePropertySetValueReferenceExpression()
                               )
                           }));

                    // CODEGEN:
                    // this._isSet_email = true;

                    property.SetStatements.Add(
                        new CodeAssignStatement(
                            new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    IsSetFieldName(dataFieldDescriptor)
                            ),
                            new CodePrimitiveExpression(true)
                        ));
                }

                declaration.Members.Add(property);
            }
        }



        private static string CreateNullableFieldName(DataFieldDescriptor dataFieldDescriptor)
        {
            return $"_{dataFieldDescriptor.Name.ToLowerInvariant()}Nullable";
        }

        private static string CreateXNameFieldName(DataFieldDescriptor dataFieldDescriptor)
        {
            return $"_{dataFieldDescriptor.Name.ToLowerInvariant()}XName";
        }

        private static string IsSetFieldName(DataFieldDescriptor dataFieldDescriptor)
        {
            return $"_isSet_{dataFieldDescriptor.Name.ToLowerInvariant()}";
        }


        private string InterfaceFullName => TypeManager.GetRuntimeFullName(_dataTypeDescriptor.TypeManagerTypeName);


        private string InterfaceName
        {
            get
            {
                if (_interfaceName == null)
                {
                    _interfaceName = InterfaceFullName;
                    int commaOffset = _interfaceName.IndexOf(',');
                    if (commaOffset >= 0)
                    {
                        _interfaceName = _interfaceName.Remove(commaOffset);
                    }
                }

                return _interfaceName;
            }
        }
    }
}
