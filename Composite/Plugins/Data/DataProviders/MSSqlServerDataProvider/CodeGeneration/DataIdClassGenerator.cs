using System;
using System.CodeDom;
using System.Reflection;
using Composite.Data;
using Composite.Data.DynamicTypes;


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
                TypeAttributes = (TypeAttributes.Public | TypeAttributes.Sealed)
            };
            codeTypeDeclaration.BaseTypes.Add(typeof(IDataId));

            AddDefaultConstructor(codeTypeDeclaration);
            AddConstructor(codeTypeDeclaration);
            AddProperties(codeTypeDeclaration);            

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



        private static string MakeParamName(string name)
        {
            return string.Format("parm{0}", name);
        }



        private static string MakePropertyFieldName(string name)
        {
            return string.Format("_property{0}", name);
        }
    }    
}
