using System;
using System.CodeDom;
using System.ComponentModel;
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
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(_className);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
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


            foreach (DataFieldDescriptor field in _dataTypeDescriptor.KeyFields)
            {
                AddProperty(declaration, field.Name, field.InstanceType);
            }


            return declaration;
        }



        internal Dictionary<string, Type> Properties
        {
            get
            {
                Dictionary<string, Type> result = new Dictionary<string, Type>();

                foreach (DataFieldDescriptor field in _dataTypeDescriptor.KeyFields)
                {
                    result.Add(field.Name, field.InstanceType);
                }

                return result;
            }
        }



        private static void AddDefaultConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor defaultConstructor = new CodeConstructor();
            defaultConstructor.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            declaration.Members.Add(defaultConstructor);
        }



        private void AddConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes = MemberAttributes.Public | MemberAttributes.Final;

            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                    typeof(XElement),
                    "element"
                ));



            foreach (string keyPropertyName in _dataTypeDescriptor.KeyPropertyNames)
            {
                DataFieldDescriptor keyProperty = _dataTypeDescriptor.Fields[keyPropertyName];

                string propertyFieldName = MakePropertyFieldName(keyProperty.Name);
                string attributeVariableName = "attr" + keyProperty.Name;

                // CODEGEN:
                // XAttribute attr{fieldName} = element.Attribute(_{fieldName}XName);

                constructor.Statements.Add(
                    new CodeVariableDeclarationStatement(
                        typeof(XAttribute), attributeVariableName,
                        new CodeMethodInvokeExpression(
                            new CodeVariableReferenceExpression("element"),
                            "Attribute",
                            new CodeFieldReferenceExpression(null, MakeXNameFieldName(keyPropertyName))
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
                        new CodeStatement[] {
                            new CodeThrowExceptionStatement(
                                new CodeObjectCreateExpression(
                                    typeof(InvalidOperationException),
                                    new CodeExpression[] {
                                        new CodePrimitiveExpression(
                                            string.Format("Missing '{0}' attribute in a data store file.", keyProperty.Name)
                                        )
                                    }
                                )
                            )
                        }
                    ));

                // CODEGEN: 
                // _propertyId = (Guid) attrId;

                constructor.Statements.Add(new CodeAssignStatement(
                        new CodeVariableReferenceExpression(propertyFieldName),
                        new CodeCastExpression(
                            keyProperty.InstanceType,
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

            CodeMemberProperty property = new CodeMemberProperty();
            property.Name = name;
            property.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            property.HasSet = true;
            property.HasGet = true;
            property.Type = new CodeTypeReference(type);
            property.GetStatements.Add(new CodeMethodReturnStatement(new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName)));
            property.SetStatements.Add(new CodeAssignStatement(new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName), new CodeArgumentReferenceExpression("value")));

            declaration.Members.Add(property);

            // CODEGEN:
            // private static readonly XName _EmailXName = "Email";

            var xNameField = new CodeMemberField();
            xNameField.Name = MakeXNameFieldName(name);
            xNameField.Type = new CodeTypeReference(typeof(XName));
            xNameField.Attributes = MemberAttributes.Static | MemberAttributes.Private;
            xNameField.InitExpression = new CodePrimitiveExpression(name);
            declaration.Members.Add(xNameField);
        }


        private void AddEqualsMethod(CodeTypeDeclaration declaration)
        {
            //Generates code like

            // public override bool Equals(object obj)
            // {
            //     return object.Equals(this.FullPath, (obj as FileSystemFileDataId1).FullPath) && .....;
            // }

            var method = new CodeMemberMethod();
            method.Attributes = MemberAttributes.Public | MemberAttributes.Override;
            method.Name = "Equals";
            method.ReturnType = new CodeTypeReference(typeof(bool));
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(object), "obj"));


            Verify.That(_dataTypeDescriptor.KeyPropertyNames.Count > 0, "A dynamic type should have at least one key property");

            CodeExpression condition = null;

            foreach (string keyPropertyName in _dataTypeDescriptor.KeyPropertyNames)
            {
                string propertyFieldName = MakePropertyFieldName(_dataTypeDescriptor.Fields[keyPropertyName].Name);

                CodeExpression newCondition =
                    new CodeMethodInvokeExpression(
                    new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName),
                    "Equals", new CodeFieldReferenceExpression(
                                  new CodeCastExpression(this._className, new CodeArgumentReferenceExpression("obj")),
                                  propertyFieldName));

                if (condition == null)
                {
                    condition = newCondition;
                }
                else
                {
                    condition = new CodeBinaryOperatorExpression(condition, CodeBinaryOperatorType.BooleanAnd, newCondition);
                }
            }

            method.Statements.Add(new CodeMethodReturnStatement(condition));

            declaration.Members.Add(method);
        }

        private void AddGetHashCodeMethod(CodeTypeDeclaration declaration)
        {
            // Generates code like like

            // private int? _hashcode; 
            //
            // public override int GetHashCode()
            // {
            //     if(_hashcode == null)
            //     {
            //         _hashcode = _fullPath.GetHashCode() ^ ....;
            //     }
            //
            //     return _hashcode.Value;
            // }

            var hashcodeField = new CodeMemberField(typeof(int?), "_hashcode");

            var method = new CodeMemberMethod();
            method.Attributes = MemberAttributes.Public | MemberAttributes.Override;
            method.Name = "GetHashCode";
            method.ReturnType = new CodeTypeReference(typeof(int));

            Verify.That(_dataTypeDescriptor.KeyPropertyNames.Count > 0, "A dynamic type should have at least one key property");

            CodeExpression hashCodeExpression = null;

            foreach (string keyPropertyName in _dataTypeDescriptor.KeyPropertyNames)
            {
                string propertyFieldName = MakePropertyFieldName(_dataTypeDescriptor.Fields[keyPropertyName].Name);

                CodeExpression hashCodePart =
                    new CodeMethodInvokeExpression(
                    new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName),
                    "GetHashCode");

                if (hashCodeExpression == null)
                {
                    hashCodeExpression = hashCodePart;
                }
                else
                {
                    hashCodeExpression = new CodeMethodInvokeExpression(
                        new CodeMethodReferenceExpression(new CodeTypeReferenceExpression(typeof(DataProviderHelperBase)),
                        "Xor"),
                        hashCodeExpression, hashCodePart);
                }
            }

            // "this.__hashcode"
            CodeFieldReferenceExpression hashCodeFieldReference =
                new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "_hashcode");

            method.Statements.Add(new CodeConditionStatement(
                new CodeBinaryOperatorExpression(hashCodeFieldReference,
                                                 CodeBinaryOperatorType.ValueEquality,
                                                 new CodePrimitiveExpression(null)),
                    new CodeAssignStatement(hashCodeFieldReference, hashCodeExpression)));

            // "return __hashcode.Value;"
            method.Statements.Add(new CodeMethodReturnStatement(new CodePropertyReferenceExpression(hashCodeFieldReference, "Value")));

            declaration.Members.Add(hashcodeField);
            declaration.Members.Add(method);
        }


        private static string MakePropertyFieldName(string name)
        {
            return string.Format("_property{0}", name);
        }

        private static string MakeXNameFieldName(string name)
        {
            return string.Format("_{0}XName", name);
        }
    }    
}
