using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.CodeGeneration;
using Composite.StandardPlugins.Data.DataProviders.XmlDataProvider.CodeGeneration.Foundation.Common;


namespace Composite.StandardPlugins.Data.DataProviders.XmlDataProvider.CodeGeneration.Foundation
{
    internal sealed class XmlDataProviderHelperClassGenerator
    {
        private static readonly string _wrapperClassConstructorFieldName = "_wrapperClassConstructor";
        private static readonly string _dataIdClassConstructorFieldName = "_idClassConstructor";

        private string _helperClassName;
        private string _wrapperClassName;
        private string _dataIdClassName;
        private Type _interfaceType;
        private PropertyList _propertyList;
        private Dictionary<string, Type> _propertyInitializers;


        public XmlDataProviderHelperClassGenerator(string helperClassName,
                                                   string wrapperClassName,
                                                   string dataIdClassName,
                                                   Type interfaceType,
                                                   PropertyList propertyList,
                                                   Dictionary<string, Type> propertyInitializers)
        {
            _helperClassName = helperClassName;
            _wrapperClassName = wrapperClassName;
            _dataIdClassName = dataIdClassName;
            _interfaceType = interfaceType;
            _propertyList = propertyList;
            _propertyInitializers = propertyInitializers;
        }



        public CodeTypeDeclaration CreateClass()
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(_helperClassName);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(typeof(DataProviderHelperBase));

            AddConstructor(declaration);
            AddInterfaceTypeProperty(declaration);
            AddDataIdTypeProperty(declaration);
            // AddCreateWhereFunctionMethod(declaration);
            AddCreateDataIdFunctionMethod(declaration);
            AddValidateDataTypeMethod(declaration);
            AddCreateNewElementMethod(declaration);

            return declaration;
        }



        private void AddConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes = MemberAttributes.Public | MemberAttributes.Final;

            constructor.Statements.Add(new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        _wrapperClassConstructorFieldName
                    ),
                    new CodeArrayIndexerExpression(
                        new CodeMethodInvokeExpression(
                            new CodeTypeOfExpression(
                                _wrapperClassName
                            ),
                            "GetConstructors",
                            new CodeExpression[] {
                                new CodeBinaryOperatorExpression(
                                    new CodeFieldReferenceExpression(
                                        new CodeTypeReferenceExpression(typeof(BindingFlags)),
                                        "Instance"
                                    ),
                                    CodeBinaryOperatorType.BitwiseOr,
                                    new CodeFieldReferenceExpression(
                                        new CodeTypeReferenceExpression(typeof(BindingFlags)),
                                        "Public"
                                    )
                                )        
                            }
                        ),
                        new CodeExpression[] { new CodePrimitiveExpression(0) }
                    )
                ));


            constructor.Statements.Add(new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        _dataIdClassConstructorFieldName
                    ),
                    new CodeArrayIndexerExpression(
                        new CodeMethodInvokeExpression(
                            new CodeTypeOfExpression(
                                _dataIdClassName
                            ),
                            "GetConstructors",
                            new CodeExpression[] {
                                new CodeBinaryOperatorExpression(
                                    new CodeFieldReferenceExpression(
                                        new CodeTypeReferenceExpression(typeof(BindingFlags)),
                                        "Instance"
                                    ),
                                    CodeBinaryOperatorType.BitwiseOr,
                                    new CodeFieldReferenceExpression(
                                        new CodeTypeReferenceExpression(typeof(BindingFlags)),
                                        "Public"
                                    )
                                )        
                            }
                        ),
                        new CodeExpression[] { new CodePrimitiveExpression(1) }
                    )
                ));


            declaration.Members.Add(constructor);
        }



        private void AddInterfaceTypeProperty(CodeTypeDeclaration declaration)
        {
            CodeMemberProperty property = new CodeMemberProperty();
            property.Name = "_InterfaceType";
            property.HasGet = true;
            property.HasSet = false;
            property.Type = new CodeTypeReference(typeof(Type));
            property.Attributes = MemberAttributes.Public | MemberAttributes.Override;

            property.GetStatements.Add(new CodeMethodReturnStatement(
                    new CodeTypeOfExpression(_interfaceType)
                ));


            declaration.Members.Add(property);
        }



        private void AddDataIdTypeProperty(CodeTypeDeclaration declaration)
        {
            CodeMemberProperty property = new CodeMemberProperty();
            property.Name = "_DataIdType";
            property.HasGet = true;
            property.HasSet = false;
            property.Type = new CodeTypeReference(typeof(Type));
            property.Attributes = MemberAttributes.Public | MemberAttributes.Override;

            property.GetStatements.Add(new CodeMethodReturnStatement(
                    new CodeTypeOfExpression(_dataIdClassName)
                ));


            declaration.Members.Add(property);
        }


        //private void AddCreateWhereFunctionMethod(CodeTypeDeclaration declaration)
        //{
        //    CodeMemberMethod method = new CodeMemberMethod();
        //    method.Name = "CreateWhereFunction";

        //    CodeTypeReference funcType = new CodeTypeReference(
        //            typeof(Func<,>).FullName,
        //            new CodeTypeReference[] {
        //                new CodeTypeReference(typeof(XElement)),
        //                new CodeTypeReference(typeof(bool))
        //        });

        //    method.ReturnType = funcType;

        //    method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(IDataId), "id"));
        //    method.Attributes = MemberAttributes.Public | MemberAttributes.Override;

        //    method.Statements.Add(new CodeVariableDeclarationStatement(
        //        _dataIdClassName,
        //        "dataId"));


        //    method.Statements.Add(new CodeTryCatchFinallyStatement(
        //            new CodeStatement[] {
        //                    new CodeAssignStatement(
        //                        new CodeVariableReferenceExpression("dataId"),
        //                        new CodeCastExpression(
        //                            _dataIdClassName,
        //                            new CodeVariableReferenceExpression("id"))
        //                    )
        //            },
        //            new CodeCatchClause[] {
        //                 new CodeCatchClause("e", new CodeTypeReference(typeof(Exception)), new CodeStatement[] {
        //                    new CodeThrowExceptionStatement(
        //                        new CodeObjectCreateExpression(
        //                            new CodeTypeReference(typeof(ArgumentException)),
        //                            new CodeExpression[] {
        //                                new CodeMethodInvokeExpression(
        //                                    new CodeTypeReferenceExpression(typeof(string)), 
        //                                    "Format",
        //                                    new CodeExpression[] {
        //                                        new CodePrimitiveExpression("The type ({0}) of the given data id parameter does not match the type {1}"),
        //                                        new CodeMethodInvokeExpression(
        //                                            new CodeVariableReferenceExpression("id"),
        //                                            "GetType",
        //                                            new CodeExpression[] {}
        //                                        ),
        //                                        new CodeTypeOfExpression(_dataIdClassName)
        //                                    }
        //                                ),
        //                                new CodeVariableReferenceExpression("e")
        //                            }                                    
        //                        )
        //                    )
        //                })
        //            }
        //        ));


        //    method.Statements.Add(
        //        new CodeVariableDeclarationStatement(typeof(ParameterExpression), "parameter",
        //            new CodeMethodInvokeExpression(
        //                new CodeTypeReferenceExpression(typeof(Expression)),
        //                "Parameter",
        //                new CodeExpression[] {
        //                    new CodeTypeOfExpression(typeof(XElement)),
        //                    new CodePrimitiveExpression("parameter")
        //                }
        //            )
        //        ));


        //    CodeExpression currentExpression = CodeExpressionHelper.CreateDataIdCompareExpression(_propertyList, "parameter", "dataId");


        //    method.Statements.Add(new CodeVariableDeclarationStatement(
        //            typeof(LambdaExpression),
        //            "lambda",
        //            new CodeMethodInvokeExpression(
        //                new CodeMethodReferenceExpression(
        //                    new CodeTypeReferenceExpression(typeof(Expression)),
        //                    "Lambda",
        //                    new CodeTypeReference[] {
        //                        new CodeTypeReference(typeof(Func<XElement, bool>)),                                 
        //                    }
        //                ),
        //                new CodeExpression[] {
        //                    currentExpression,
        //                    new CodeVariableReferenceExpression("parameter")
        //                }
        //            )
        //        ));


        //    method.Statements.Add(new CodeMethodReturnStatement(
        //            new CodeCastExpression(
        //                typeof(Func<XElement, bool>),
        //                new CodeMethodInvokeExpression(
        //                    new CodeVariableReferenceExpression("lambda"),
        //                    "Compile",
        //                    new CodeExpression[] { }
        //                )
        //            )
        //        ));


        //    declaration.Members.Add(method);
        //}


        private void AddCreateDataIdFunctionMethod(CodeTypeDeclaration declaration)
        {
            CodeMemberMethod method = new CodeMemberMethod();
            method.Name = "CreateDataId";
            method.ReturnType = new CodeTypeReference(typeof(IDataId));
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(XElement), "xElement"));
            method.Attributes = MemberAttributes.Public | MemberAttributes.Override;

            method.Statements.Add(new CodeMethodReturnStatement(
                new CodeObjectCreateExpression(this._dataIdClassName, 
                new CodeArgumentReferenceExpression("xElement"))));

            declaration.Members.Add(method);
        }


        private void AddValidateDataTypeMethod(CodeTypeDeclaration declaration)
        {
            CodeMemberMethod method = new CodeMemberMethod();
            method.Name = "ValidateDataType";
            method.ReturnType = new CodeTypeReference(typeof(void));
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(IData), "data"));
            method.Attributes = MemberAttributes.Public | MemberAttributes.Override;



            declaration.Members.Add(method);
        }



        private void AddCreateNewElementMethod(CodeTypeDeclaration declaration)
        {
            CodeMemberMethod method = new CodeMemberMethod();
            method.Name = "CreateNewElement";

            CodeTypeParameter genericParameter = new CodeTypeParameter("T");
            genericParameter.HasConstructorConstraint = false;

            method.TypeParameters.Add(genericParameter);

            method.ReturnType = new CodeTypeReference(genericParameter);
            method.ImplementationTypes.Add(typeof(IXmlDataProviderHelper));

            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(IData), "data"));
            CodeParameterDeclarationExpression parameter = new CodeParameterDeclarationExpression(typeof(XElement), "newElement");
            parameter.Direction = FieldDirection.Out;
            method.Parameters.Add(parameter);
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(string), "elementName"));
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(string), "providerName"));

            method.Attributes = MemberAttributes.Public | MemberAttributes.Override;


            method.Statements.Add(new CodeVariableDeclarationStatement(
                _interfaceType,
                "xmlData"));


            method.Statements.Add(new CodeTryCatchFinallyStatement(
                    new CodeStatement[] {
                            new CodeAssignStatement(
                                new CodeVariableReferenceExpression("xmlData"),
                                new CodeCastExpression(
                                    _interfaceType,
                                    new CodeVariableReferenceExpression("data"))
                            )
                    },
                    new CodeCatchClause[] {
                         new CodeCatchClause("e", new CodeTypeReference(typeof(Exception)), new CodeStatement[] {
                            new CodeThrowExceptionStatement(
                                new CodeObjectCreateExpression(
                                    new CodeTypeReference(typeof(ArgumentException)),
                                    new CodeExpression[] {
                                        new CodeMethodInvokeExpression(
                                            new CodeTypeReferenceExpression(typeof(string)), 
                                            "Format",
                                            new CodeExpression[] {
                                                new CodePrimitiveExpression("The type ({0}) of the given data parameter does not match the type {1}"),
                                                new CodeMethodInvokeExpression(
                                                    new CodeVariableReferenceExpression("data"),
                                                    "GetType",
                                                    new CodeExpression[] {}
                                                ),
                                                new CodeTypeOfExpression(_interfaceType)
                                            }
                                        ),
                                        new CodeVariableReferenceExpression("e")
                                    }                                    
                                )
                            )
                        })
                    }
                ));


            const string newElementVariableName = "newElement";

            method.Statements.Add(new CodeAssignStatement(
                new CodeVariableReferenceExpression(newElementVariableName),
                new CodeObjectCreateExpression(
                        typeof(XElement),
                        new CodeVariableReferenceExpression("elementName")
                    )
            ));



            foreach (Property property in _propertyList.Properties)
            {
                if (property.IsInterface == true)
                {
                    method.Statements.Add(new CodeCommentStatement(string.Format("Interface Property {0}", property.Name)));

                    CodeMethodInvokeExpression codeExpression = new CodeMethodInvokeExpression(
                                new CodeVariableReferenceExpression(newElementVariableName),
                                "Add",
                                new CodeExpression[] {
                                    new CodeObjectCreateExpression(
                                        typeof(XAttribute),
                                        new CodeExpression[] {
                                            new CodePrimitiveExpression(property.MappedName),
                                            new CodePropertyReferenceExpression(
                                                new CodeVariableReferenceExpression("xmlData"),
                                                property.Name
                                            )
                                        }
                                    )
                                }
                            );

                    if ((property.Type.IsGenericType == true) &&
                        (property.Type.GetGenericTypeDefinition() == typeof(Nullable<>)))
                    {
                        method.Statements.Add(
                            new CodeConditionStatement(
                                new CodeBinaryOperatorExpression(
                                    new CodePropertyReferenceExpression(
                                        new CodePropertyReferenceExpression(
                                            new CodeVariableReferenceExpression("xmlData"),
                                            property.Name
                                        ),
                                        "HasValue"
                                    ),
                                    CodeBinaryOperatorType.IdentityEquality,
                                    new CodePrimitiveExpression(true)
                                ),
                                new CodeStatement[] {
                                    new CodeExpressionStatement(
                                        codeExpression
                                    )
                                }
                            ));
                    }
                    else if (property.Type == typeof(string))
                    {
                        method.Statements.Add(
                            new CodeConditionStatement(
                                new CodeBinaryOperatorExpression(
                                    new CodePropertyReferenceExpression(
                                        new CodeVariableReferenceExpression("xmlData"),
                                        property.Name
                                    ),
                                    CodeBinaryOperatorType.IdentityInequality,
                                    new CodePrimitiveExpression(null)
                                ),
                                new CodeStatement[] {
                                    new CodeExpressionStatement(
                                        codeExpression
                                    )
                                }
                            ));
                    }
                    else
                    {
                        method.Statements.Add(codeExpression);
                    }
                }
                else if ((property.IsDataId == true) && (property.IsInterface == false))
                {
                    string tempVariableName = string.Format("value{0}", property.Name);
                    string tempInitializeName = string.Format("tempInitialize{0}", property.Name);

                    Type initializerType = _propertyInitializers[property.Name];


                    method.Statements.Add(new CodeCommentStatement(string.Format("Property initializeer for property {0}", property.Name)));

                    method.Statements.Add(new CodeVariableDeclarationStatement(
                            typeof(object),
                            tempVariableName
                        ));

                    method.Statements.Add(new CodeVariableDeclarationStatement(
                            initializerType,
                            tempInitializeName,
                            new CodeObjectCreateExpression(
                                initializerType,
                                new CodeExpression[] { }
                            )
                        ));

                    method.Statements.Add(new CodeExpressionStatement(
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

                    method.Statements.Add(
                            new CodeMethodInvokeExpression(
                                new CodeVariableReferenceExpression(newElementVariableName),
                                "Add",
                                new CodeExpression[] {
                                    new CodeObjectCreateExpression(
                                        typeof(XAttribute),
                                        new CodeExpression[] {
                                            new CodePrimitiveExpression(property.MappedName),
                                            new CodeVariableReferenceExpression(tempVariableName)
                                        }
                                    )
                                }
                            ));
                }
                else
                {
                    throw new NotImplementedException();
                }
            }


            method.Statements.Add(new CodeCommentStatement("Done with properties"));


            method.Statements.Add(new CodeVariableDeclarationStatement(
                    typeof(IData),
                    "newData",
                    new CodeObjectCreateExpression(
                        _wrapperClassName,
                        new CodeExpression[] {
                            new CodeVariableReferenceExpression("newElement"),
                            new CodeObjectCreateExpression(
                                typeof(DataSourceId),
                                new CodeExpression[] {
                                    new CodeObjectCreateExpression(
                                        _dataIdClassName,
                                        new CodeVariableReferenceExpression("newElement")
                                    ),
                                    new CodeVariableReferenceExpression("providerName"),
                                    new CodeTypeOfExpression(_interfaceType)
                                }
                            )
                        }
                    )
                ));


            method.Statements.Add(new CodeMethodReturnStatement(
                    new CodeCastExpression(
                        new CodeTypeReference(genericParameter),
                        new CodeVariableReferenceExpression("newData")
                    )
                ));


            declaration.Members.Add(method);
        }
    }
}
