using System;
using System.CodeDom;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using System.Collections.Generic;
using Composite.Data;
using Composite.Data.DynamicTypes;



namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration
{
    internal sealed class DataIdClassGenerator
    {
        private readonly string _className;
        private readonly DataTypeDescriptor _dataTypeDescriptor;



        public DataIdClassGenerator(string className, DataTypeDescriptor dataTypeDescriptor)
        {
            _className = className;
            _dataTypeDescriptor = dataTypeDescriptor;
        }



        public CodeTypeDeclaration CreateClass()
        {
            var declaration = new CodeTypeDeclaration(_className)
            {
                IsClass = true,
                TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed
            };

            declaration.BaseTypes.Add(typeof(IDataId));
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


            AddDefaultConstructor(declaration);

            AddConstructor(declaration);

            AddEqualsMethod(declaration);

            AddGetHashCodeMethod(declaration);


            foreach (DataFieldDescriptor field in _dataTypeDescriptor.PhysicalKeyFields)
            {
                AddProperty(declaration, field.Name, field.InstanceType);
            }


            return declaration;
        }



        internal Dictionary<string, Type> Properties
        {
            get
            {
                return _dataTypeDescriptor.PhysicalKeyFields.ToDictionary(field => field.Name, field => field.InstanceType);
            }
        }



        private static void AddDefaultConstructor(CodeTypeDeclaration declaration)
        {
            var defaultConstructor = new CodeConstructor {Attributes = MemberAttributes.Public | MemberAttributes.Final};
            declaration.Members.Add(defaultConstructor);
        }



        private void AddConstructor(CodeTypeDeclaration declaration)
        {
            var constructor = new CodeConstructor {Attributes = MemberAttributes.Public | MemberAttributes.Final};

            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                    typeof(XElement),
                    "element"
                ));



            foreach (var keyField in _dataTypeDescriptor.PhysicalKeyFields)
            {
                string propertyFieldName = MakePropertyFieldName(keyField.Name);
                string attributeVariableName = "attr" + keyField.Name;

                // CODEGEN:
                // XAttribute attr{fieldName} = element.Attribute(_{fieldName}XName);

                constructor.Statements.Add(
                    new CodeVariableDeclarationStatement(
                        typeof(XAttribute), attributeVariableName,
                        new CodeMethodInvokeExpression(
                            new CodeVariableReferenceExpression("element"),
                            "Attribute",
                            new CodeFieldReferenceExpression(null, MakeXNameFieldName(keyField.Name))
                            )));


                // CODEGEN:
                // if(attr{fieldName} == null) {
                //   throw new InvalidOperationException("Missing '{fieldName}' attribute in a data store file.");
                // }

                constructor.Statements.Add(new CodeConditionStatement(
                        new CodeBinaryOperatorExpression(
                            new CodeVariableReferenceExpression(attributeVariableName),
                            CodeBinaryOperatorType.IdentityEquality,
                            new CodePrimitiveExpression(null)
                        ), 
                        new CodeThrowExceptionStatement(
                            new CodeObjectCreateExpression(
                                typeof(InvalidOperationException), 
                                new CodePrimitiveExpression(
                                    $"Missing '{keyField.Name}' attribute in a data store file."
                                ))
                        )));

                // CODEGEN: 
                // _propertyId = (Guid) attrId;

                constructor.Statements.Add(new CodeAssignStatement(
                        new CodeVariableReferenceExpression(propertyFieldName),
                        new CodeCastExpression(
                            keyField.InstanceType,
                            new CodeVariableReferenceExpression(attributeVariableName)
                        )
                    ));
            }

            declaration.Members.Add(constructor);
        }



        private static void AddProperty(CodeTypeDeclaration declaration, string name, Type type)
        {
            // CODEGEN:
            // public Guid Email
            // {
            //     get {  return this._propertyEmail;  }
            //     set {  this._propertyEmail = value; }
            // }
            
            string propertyFieldName = MakePropertyFieldName(name);

            declaration.Members.Add(new CodeMemberField(type, propertyFieldName));

            var property = new CodeMemberProperty
            {
                Name = name,
                Attributes = MemberAttributes.Public | MemberAttributes.Final,
                HasSet = true,
                HasGet = true,
                Type = new CodeTypeReference(type)
            };
            property.GetStatements.Add(new CodeMethodReturnStatement(new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName)));
            property.SetStatements.Add(new CodeAssignStatement(new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName), new CodeArgumentReferenceExpression("value")));

            declaration.Members.Add(property);

            // CODEGEN:
            // private static readonly XName _EmailXName = "Email";

            var xNameField = new CodeMemberField
            {
                Name = MakeXNameFieldName(name),
                Type = new CodeTypeReference(typeof (XName)),
                Attributes = MemberAttributes.Static | MemberAttributes.Private,
                InitExpression = new CodePrimitiveExpression(name)
            };
            declaration.Members.Add(xNameField);
        }


        private void AddEqualsMethod(CodeTypeDeclaration declaration)
        {
            //Generates code like

            // public override bool Equals(object obj)
            // {
            //     return obj != null 
            //            && typeof(TestDataId).IsAssignableFrom(obj.GetType())
            //            && obj.Equals(this.FullPath, (obj as FileSystemFileDataId1).FullPath) && .....;
            // }

            const string argumentName = "obj";
            var argument = new CodeArgumentReferenceExpression(argumentName);

            var method = new CodeMemberMethod
            {
                Attributes = MemberAttributes.Public | MemberAttributes.Override,
                Name = nameof(object.Equals),
                ReturnType = new CodeTypeReference(typeof (bool))
            };
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(object), argumentName));


            Verify.That(_dataTypeDescriptor.KeyPropertyNames.Count > 0, "A dynamic type should have at least one key property");

            // CODEGEN: obj != null && typeof(TestDataId).IsAssignableFrom(obj.GetType())

            CodeExpression condition =
                new CodeBinaryOperatorExpression(
                    new CodeBinaryOperatorExpression(
                        argument,
                        CodeBinaryOperatorType.IdentityInequality,
                        new CodePrimitiveExpression(null)),
                    CodeBinaryOperatorType.BooleanAnd,
                    new CodeMethodInvokeExpression(
                        new CodeTypeOfExpression(new CodeTypeReference(_className)),
                        nameof(Type.IsAssignableFrom),
                        new CodeMethodInvokeExpression(argument, nameof(GetType))));

            foreach (string keyPropertyName in _dataTypeDescriptor.PhysicalKeyFields.Select(f => f.Name))
            {
                string propertyFieldName = MakePropertyFieldName(_dataTypeDescriptor.Fields[keyPropertyName].Name);

                CodeExpression newCondition =
                    new CodeMethodInvokeExpression(
                    new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName),
                    nameof(object.Equals), new CodeFieldReferenceExpression(
                                  new CodeCastExpression(this._className, argument),
                                  propertyFieldName));

                condition = new CodeBinaryOperatorExpression(
                    condition, 
                    CodeBinaryOperatorType.BooleanAnd, 
                    newCondition);
            }

            method.Statements.Add(new CodeMethodReturnStatement(condition));

            declaration.Members.Add(method);
        }

        private void AddGetHashCodeMethod(CodeTypeDeclaration declaration)
        {
            // Generates code like like

            // private int _hashcode; 
            //
            // public override int GetHashCode()
            // {
            //     if(_hashcode == 0)
            //     {
            //         _hashcode = _fullPath.GetHashCode() ^ ....;
            //         if(_hashcode == 0)
            //         {
            //              _hashcode == -1;
            //         }
            //
            //     return _hashcode;
            // }

            const string HashCodeFieldName = "_hashcode";
            declaration.Members.Add(new CodeMemberField(typeof(int), HashCodeFieldName));

            var method = new CodeMemberMethod
            {
                Attributes = MemberAttributes.Public | MemberAttributes.Override,
                Name = nameof(GetHashCode),
                ReturnType = new CodeTypeReference(typeof (int))
            };

            Verify.That(_dataTypeDescriptor.KeyPropertyNames.Count > 0, "A dynamic type should have at least one key property");

            CodeExpression hashCodeExpression = null;

            foreach (string keyPropertyName in _dataTypeDescriptor.PhysicalKeyFields.Select(f=>f.Name))
            {
                string propertyFieldName = MakePropertyFieldName(_dataTypeDescriptor.Fields[keyPropertyName].Name);

                CodeExpression hashCodePart =
                    new CodeMethodInvokeExpression(
                    new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName),
                    nameof(GetHashCode));

                if (hashCodeExpression == null)
                {
                    hashCodeExpression = hashCodePart;
                }
                else
                {
                    hashCodeExpression = new CodeMethodInvokeExpression(
                        new CodeMethodReferenceExpression(new CodeTypeReferenceExpression(typeof(DataProviderHelperBase)),
                        nameof(DataProviderHelperBase.Xor)),
                        hashCodeExpression, hashCodePart);
                }
            }

            // "this.__hashcode"
            var hashCodeFieldReference =
                new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), HashCodeFieldName);

            method.Statements.Add(
                new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(hashCodeFieldReference,
                                                 CodeBinaryOperatorType.ValueEquality,
                                                 new CodePrimitiveExpression(0)),
                    new CodeAssignStatement(hashCodeFieldReference, hashCodeExpression),
                    new CodeConditionStatement(
                        new CodeBinaryOperatorExpression(hashCodeFieldReference,
                            CodeBinaryOperatorType.ValueEquality,
                            new CodePrimitiveExpression(0)),
                        new CodeAssignStatement(
                            hashCodeFieldReference,
                            new CodePrimitiveExpression(-1)))));

            // "return __hashcode;"
            method.Statements.Add(new CodeMethodReturnStatement(hashCodeFieldReference));

            declaration.Members.Add(method);
        }


        private static string MakePropertyFieldName(string name) => $"_property{name}";

        private static string MakeXNameFieldName(string name) => $"_{name}XName";
    }    
}
