using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Reflection;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Plugins.DataProvider.CodeGeneration;


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
            CodeTypeDeclaration codeTypeDeclaration = new CodeTypeDeclaration(_dataIdClassName);
            codeTypeDeclaration.IsClass = true;
            codeTypeDeclaration.TypeAttributes = (TypeAttributes.Public | TypeAttributes.Sealed);
            codeTypeDeclaration.BaseTypes.Add(typeof(IDataId));

            AddDefaultConstructor(codeTypeDeclaration);
            AddConstructor(codeTypeDeclaration);
            AddProperties(codeTypeDeclaration);            

            return codeTypeDeclaration;
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

            foreach (string keyPropertyName in _dataTypeDescriptor.KeyPropertyNames)
            {
                Type keyPropertyType = _dataTypeDescriptor.Fields[keyPropertyName].InstanceType;

                constructor.Parameters.Add(new CodeParameterDeclarationExpression(keyPropertyType, MakeParamName(keyPropertyName)));

                AddAsignment(constructor, keyPropertyName);
            }

            declaration.Members.Add(constructor);
        }



        private void AddProperties(CodeTypeDeclaration declaration)
        {
            foreach (string keyPropertyName in _dataTypeDescriptor.KeyPropertyNames)
            {
                Type keyPropertyType = _dataTypeDescriptor.Fields[keyPropertyName].InstanceType;
                string propertyFieldName = MakePropertyFieldName(keyPropertyName);

                declaration.Members.Add(new CodeMemberField(keyPropertyType, propertyFieldName));

                CodeMemberProperty property = new CodeMemberProperty();
                property.Name = keyPropertyName;
                property.Attributes = MemberAttributes.Public | MemberAttributes.Final;
                property.HasSet = true;
                property.HasGet = true;
                property.Type = new CodeTypeReference(keyPropertyType);
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
