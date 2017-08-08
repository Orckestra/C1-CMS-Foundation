using System;
using System.CodeDom;
using System.Linq;
using System.Reflection;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    internal sealed class DataIdClassGenerator
    {
        private readonly string _dataIdClassName;
        private readonly DataTypeDescriptor _dataTypeDescriptor;


        public DataIdClassGenerator(DataTypeDescriptor dataTypeDescriptor, string dataIdClassName)
        {
            _dataTypeDescriptor = dataTypeDescriptor;
            _dataIdClassName = dataIdClassName;
        }


        public CodeTypeDeclaration CreateClass()
        {
            var codeTypeDeclaration = new CodeTypeDeclaration(_dataIdClassName)
            {
                IsClass = true,
                TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed
            };
            codeTypeDeclaration.BaseTypes.Add(typeof(IDataId));

            AddDefaultConstructor(codeTypeDeclaration);
            AddConstructor(codeTypeDeclaration);
            AddProperties(codeTypeDeclaration);
            AddEqualsMethod(codeTypeDeclaration);
            AddGetHashCodeMethod(codeTypeDeclaration);

            return codeTypeDeclaration;
        }



        private static void AddDefaultConstructor(CodeTypeDeclaration declaration)
        {
            var defaultConstructor = new CodeConstructor {Attributes = MemberAttributes.Public | MemberAttributes.Final};

            declaration.Members.Add(defaultConstructor);
        }



        private void AddConstructor(CodeTypeDeclaration declaration)
        {
            var constructor = new CodeConstructor { Attributes = MemberAttributes.Public | MemberAttributes.Final };

            foreach (var keyField in _dataTypeDescriptor.PhysicalKeyFields)
            {
                Type keyPropertyType = keyField.InstanceType;

                constructor.Parameters.Add(new CodeParameterDeclarationExpression(keyPropertyType, MakeParamName(keyField.Name)));

                AddAsignment(constructor, keyField.Name);
            }

            declaration.Members.Add(constructor);
        }



        private void AddProperties(CodeTypeDeclaration declaration)
        {
            foreach (var keyProperty in _dataTypeDescriptor.PhysicalKeyFields)
            {
                string keyPropertyName = keyProperty.Name;
                Type keyPropertyType = keyProperty.InstanceType;
                string propertyFieldName = MakePropertyFieldName(keyPropertyName);

                declaration.Members.Add(new CodeMemberField(keyPropertyType, propertyFieldName));

                var property = new CodeMemberProperty
                {
                    Name = keyPropertyName,
                    Attributes = MemberAttributes.Public | MemberAttributes.Final,
                    HasSet = true,
                    HasGet = true,
                    Type = new CodeTypeReference(keyPropertyType)
                };
                property.GetStatements.Add(new CodeMethodReturnStatement(new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName)));
                property.SetStatements.Add(new CodeAssignStatement(new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName), new CodeArgumentReferenceExpression("value")));

                declaration.Members.Add(property);
            }
        }



        private static void AddAsignment(CodeConstructor constructor, string name)
        {
            string paramName = MakeParamName(name);
            string propertyFieldName = MakePropertyFieldName(name);

            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        propertyFieldName
                    ),
                    new CodeArgumentReferenceExpression(paramName)
                )
            );
        }


        private void AddEqualsMethod(CodeTypeDeclaration declaration)
        {
            Verify.That(_dataTypeDescriptor.KeyPropertyNames.Count > 0, "A dynamic type should have at least one key property");

            //Generates code like

            // public override bool Equals(object obj)
            // {
            //     return obj != null && typeof(TestDataId).IsAssignableFrom(obj.GetType())
            //            && object.Equals(this.Id, (obj as TestDataId).Id) && .....;
            // }

            const string argumentName = "obj";

            var method = new CodeMemberMethod
            {
                Attributes = MemberAttributes.Public | MemberAttributes.Override,
                Name = nameof(object.Equals),
                ReturnType = new CodeTypeReference(typeof(bool))
            };
            method.Parameters.Add(new CodeParameterDeclarationExpression(typeof(object), argumentName));


            var argument = new CodeArgumentReferenceExpression(argumentName);

            // CODEGEN: obj != null && typeof(TestDataId).IsAssignableFrom(obj.GetType())

            CodeExpression condition =
                new CodeBinaryOperatorExpression(
                    new CodeBinaryOperatorExpression(
                        argument,
                        CodeBinaryOperatorType.IdentityInequality,
                        new CodePrimitiveExpression(null)),
                    CodeBinaryOperatorType.BooleanAnd,
                    new CodeMethodInvokeExpression(
                        new CodeTypeOfExpression(new CodeTypeReference(_dataIdClassName)),
                            nameof(Type.IsAssignableFrom),
                            new CodeMethodInvokeExpression(argument, nameof(GetType))));


            foreach (string keyPropertyName in _dataTypeDescriptor.PhysicalKeyPropertyNames)
            {
                string propertyFieldName = MakePropertyFieldName(_dataTypeDescriptor.Fields[keyPropertyName].Name);

                CodeExpression newCondition =
                    new CodeMethodInvokeExpression(
                        new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), propertyFieldName),
                        nameof(object.Equals), new CodeFieldReferenceExpression(
                            new CodeCastExpression(this._dataIdClassName, argument),
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
            // CODEGEN: private int _hashcode; 
            var hashcodeField = new CodeMemberField(typeof(int), "_hashcode");

            // CODEGEN:
            // public override int GetHashCode()
            // {
            //     if(_hashcode == 0)
            //     {
            //         _hashcode = _fullPath.GetHashCode() ^ ....;
            //         if(_hashcode == 0)
            //         {
            //              _hashCode = -1;
            //         }
            //     }
            //
            //     return _hashcode;
            // }

            var method = new CodeMemberMethod
            {
                Attributes = MemberAttributes.Public | MemberAttributes.Override,
                Name = nameof(GetHashCode),
                ReturnType = new CodeTypeReference(typeof(int))
            };

            Verify.That(_dataTypeDescriptor.KeyPropertyNames.Count > 0, "A dynamic type should have at least one key property");

            CodeExpression hashCodeExpression = null;

#warning We DO want IDataId classes to reflect both id and VersionId for data, right?
            foreach (string keyPropertyName in _dataTypeDescriptor.PhysicalKeyFields.Select(f => f.Name))
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
                new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), "_hashcode");

            method.Statements.Add(new CodeConditionStatement(
                new CodeBinaryOperatorExpression(
                    hashCodeFieldReference,
                    CodeBinaryOperatorType.ValueEquality,
                    new CodePrimitiveExpression(0)),
                new CodeAssignStatement(hashCodeFieldReference, hashCodeExpression),
                new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(
                        hashCodeFieldReference,
                        CodeBinaryOperatorType.ValueEquality,
                        new CodePrimitiveExpression(0)),
                    new CodeAssignStatement(hashCodeFieldReference, new CodePrimitiveExpression(-1)))));

            // "return __hashcode"
            method.Statements.Add(new CodeMethodReturnStatement(hashCodeFieldReference));

            declaration.Members.Add(hashcodeField);
            declaration.Members.Add(method);
        }


        private static string MakeParamName(string name) => $"parm{name}";


        private static string MakePropertyFieldName(string name) => $"_property{name}";
    }    
}
