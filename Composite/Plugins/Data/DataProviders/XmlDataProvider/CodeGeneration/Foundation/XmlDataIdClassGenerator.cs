using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Reflection;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.Plugins.DataProvider.CodeGeneration;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration.Foundation
{
    internal sealed class XmlDataIdClassGenerator
    {
        private string _className;
        private PropertyList _propertyList;

        
        
        public XmlDataIdClassGenerator(string className, PropertyList propertyList)
        {
            _className = className;
            _propertyList = propertyList;
        }

        

        public CodeTypeDeclaration CreateClass()
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(_className);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(typeof(IDataId));
            
            
            AddDefaultConstructor(declaration);

            AddConstructor(declaration);

            AddEqualsMethod(declaration);

            AddGetHashCodeMethod(declaration);


            foreach (Property property in _propertyList.DataIdProperties)
            {
                AddProperty(declaration, property.Name, property.Type);
            }


            return declaration;
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
         
            foreach (Property property in _propertyList.DataIdProperties)
            {
                string propertyFieldName = MakePropertyFieldName(property.Name);

                constructor.Statements.Add(new CodeConditionStatement(
                        new CodeBinaryOperatorExpression(
                            new CodeMethodInvokeExpression(
                                new CodeVariableReferenceExpression("element"),
                                "Attribute",
                                new CodePrimitiveExpression(property.MappedName)
                            ),
                            CodeBinaryOperatorType.IdentityEquality,
                            new CodePrimitiveExpression(null)
                        ),
                        new CodeStatement[] {
                            new CodeThrowExceptionStatement(
                                new CodeObjectCreateExpression(
                                    typeof(InvalidOperationException),
                                    new CodeExpression[] {
                                        new CodePrimitiveExpression(
                                            string.Format("The element tag {0} is missing from the xml file", property.MappedName)
                                        )
                                    }
                                )
                            )
                        }
                    ));

                constructor.Statements.Add(new CodeAssignStatement(
                        new CodeVariableReferenceExpression(propertyFieldName),
                        new CodeCastExpression(
                            property.Type,
                            new CodeMethodInvokeExpression(
                                new CodeVariableReferenceExpression("element"),
                                "Attribute",
                                new CodePrimitiveExpression(property.MappedName)
                            )
                        )
                    ));
            }
            
            declaration.Members.Add(constructor);
        }



        private void AddProperty(CodeTypeDeclaration declaration, string name, Type type)
        {
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
            method.ReturnType = new CodeTypeReference(typeof (bool));
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof (object), "obj"));

            
            var properties = new List<Property>(_propertyList.DataIdProperties);
            Verify.That(properties.Count > 0, "A dynamic type should have at least one key property");

            CodeExpression condition = null;

            foreach (var property in properties)
            {
                string propertyFieldName = MakePropertyFieldName(property.Name);

                CodeExpression newCondition = 
                    new CodeMethodInvokeExpression(
                    new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName),
                    "Equals", new CodeFieldReferenceExpression(
                                  new CodeCastExpression(this._className, new CodeArgumentReferenceExpression("obj")),
                                  propertyFieldName));

                if(condition == null)
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

            var hashcodeField = new CodeMemberField(typeof (int?), "_hashcode");

            var method = new CodeMemberMethod();
            method.Attributes = MemberAttributes.Public | MemberAttributes.Override;
            method.Name = "GetHashCode";
            method.ReturnType = new CodeTypeReference(typeof(int));

            var properties = new List<Property>(_propertyList.DataIdProperties);
            Verify.That(properties.Count > 0, "A dynamic type should have at least one key property");

            CodeExpression hashCodeExpression = null;

            foreach (var property in properties)
            {
                string propertyFieldName = MakePropertyFieldName(property.Name);

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
    }
}
