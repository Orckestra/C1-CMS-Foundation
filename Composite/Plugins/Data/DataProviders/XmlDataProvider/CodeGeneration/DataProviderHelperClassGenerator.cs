using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider.CodeGeneration;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration
{
#warning MRJ: BM: Cleanup
    /// <summary>
    /// Creates a implementation of DataProviderHelperBase
    /// It does NOT depend on the data type to exist
    /// </summary>
    internal sealed class DataProviderHelperClassGenerator
    {
        private const string WrapperClassConstructorFieldName = "_wrapperClassConstructor";
        private const string DataIdClassConstructorFieldName = "_idClassConstructor";

        private readonly string _helperClassName;
        private readonly string _wrapperClassName;
        private readonly string _dataIdClassName;


        private DataTypeDescriptor _dataTypeDescriptor;
        private IEnumerable<string> _idProperyNames;

#warning MRJ: BM: Cleanup here
        private string InterfaceFullName { get { return TypeManager.GetRuntimeFullName(_dataTypeDescriptor.TypeManagerTypeName); } }

#warning MRJ: BM: The InterfaceFullName and InterfaceName is used more than one, refacture this
        private string _interfaceName;
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


        public DataProviderHelperClassGenerator(
                string helperClassName,
                string wrapperClassName,
                string dataIdClassName,
                DataTypeDescriptor dataTypeDescriptor,
                IEnumerable<string> idProperyNames)
        {
            _helperClassName = helperClassName;
            _wrapperClassName = wrapperClassName;
            _dataIdClassName = dataIdClassName;
            _dataTypeDescriptor = dataTypeDescriptor;
            _idProperyNames = idProperyNames;
        }



        public CodeTypeDeclaration CreateClass()
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(_helperClassName);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(typeof(DataProviderHelperBase));
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

            AddConstructor(declaration);
            AddInterfaceTypeProperty(declaration);
            AddDataIdTypeProperty(declaration);
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
                        WrapperClassConstructorFieldName
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
                        DataIdClassConstructorFieldName
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
                    new CodeTypeOfExpression(_dataTypeDescriptor.GetFullInterfaceName())
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


        private static void AddValidateDataTypeMethod(CodeTypeDeclaration declaration)
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
                InterfaceName,
                "xmlData"));


            method.Statements.Add(new CodeTryCatchFinallyStatement(
                    new CodeStatement[] {
                            new CodeAssignStatement(
                                new CodeVariableReferenceExpression("xmlData"),
                                new CodeCastExpression(
                                    InterfaceName,
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
                                                new CodeTypeOfExpression(InterfaceName)
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



            foreach (DataFieldDescriptor field in _dataTypeDescriptor.Fields)
            {
                method.Statements.Add(new CodeCommentStatement(string.Format("Interface Property {0}", field.Name)));

                CodeMethodInvokeExpression codeExpression = new CodeMethodInvokeExpression(
                            new CodeVariableReferenceExpression(newElementVariableName),
                            "Add",
                            new CodeExpression[] {
                                    new CodeObjectCreateExpression(
                                        typeof(XAttribute),
                                        new CodeExpression[] {
#warning MRJ: BM: Handle mapped name
                                            //new CodePrimitiveExpression(field.MappedName),
                                            new CodePrimitiveExpression(field.Name),
                                            new CodePropertyReferenceExpression(
                                                new CodeVariableReferenceExpression("xmlData"),
                                                field.Name
                                            )
                                        }
                                    )
                                }
                        );

                if ((field.InstanceType.IsGenericType == true) &&
                    (field.InstanceType.GetGenericTypeDefinition() == typeof(Nullable<>)))
                {
                    method.Statements.Add(
                        new CodeConditionStatement(
                            new CodeBinaryOperatorExpression(
                                new CodePropertyReferenceExpression(
                                    new CodePropertyReferenceExpression(
                                        new CodeVariableReferenceExpression("xmlData"),
                                        field.Name
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
                else if (field.InstanceType == typeof(string))
                {
                    method.Statements.Add(
                        new CodeConditionStatement(
                            new CodeBinaryOperatorExpression(
                                new CodePropertyReferenceExpression(
                                    new CodeVariableReferenceExpression("xmlData"),
                                    field.Name
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
                /*}
                /*else if (_idProperyNames.Contains(field.Name))
                {
                    string tempVariableName = string.Format("value{0}", field.Name);
                    string tempInitializeName = string.Format("tempInitialize{0}", field.Name);

                    Type initializerType = typeof(Guid);


                    method.Statements.Add(new CodeCommentStatement(string.Format("Property initializeer for property {0}", field.Name)));

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
#warning MRJ: BM: name mapping here                                            
                                            //new CodePrimitiveExpression(field.MappedName),
                                            new CodePrimitiveExpression(field.Name),
                                            new CodeVariableReferenceExpression(tempVariableName)
                                        }
                                    )
                                }
                            ));
                }
                else
                {
                    throw new NotImplementedException();
                }*/
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
                                    new CodeTypeOfExpression(InterfaceName)
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
