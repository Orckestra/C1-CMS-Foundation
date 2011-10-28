using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Reflection;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
#warning MRJ: BM: Rename
    internal class DataContextClassGenerator_NEW
    {
        private const string SqlDataContextHelperClassName = "_sqlDataContextHelperClass";

        private readonly string _dataContextClassName;
        private readonly IEnumerable<Tuple<string, string>> _entityClassNamesAndDataContextFieldNames;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dataContextClassName"></param>
        /// <param name="entityClassNamesAndDataContextFieldNames">For all datatypes datacopes. (EntityClassName, DataContextFieldName)</param>
        public DataContextClassGenerator_NEW(string dataContextClassName, IEnumerable<Tuple<string, string>> entityClassNamesAndDataContextFieldNames)
        {
            _dataContextClassName = dataContextClassName;
            _entityClassNamesAndDataContextFieldNames = entityClassNamesAndDataContextFieldNames;
        }



        public CodeTypeDeclaration CreateClass()
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration();
            declaration.Name = _dataContextClassName;
            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(typeof(DataContextBase));
            declaration.BaseTypes.Add(typeof(ISqlDataContext));

            CodeMemberField codeMemberField = new CodeMemberField(typeof(SqlDataContextHelperClass), SqlDataContextHelperClassName);
            declaration.Members.Add(codeMemberField);

            AddConstructor(declaration);
            AddEntityFields(declaration);
            AddSqlDataContextMethods(declaration);

            return declaration;
        }



        private static void AddConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes = MemberAttributes.Public;

            constructor.Parameters.Add(
                new CodeParameterDeclarationExpression(
                    typeof(IDbConnection), "connection"));

            constructor.BaseConstructorArgs.Add(new CodeVariableReferenceExpression("connection"));

            constructor.CustomAttributes.Add(new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(DebuggerNonUserCodeAttribute))
                ));


            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeVariableReferenceExpression(SqlDataContextHelperClassName),
                    new CodeObjectCreateExpression(
                        typeof(SqlDataContextHelperClass),
                        new CodeExpression[] {
                            new CodeThisReferenceExpression()
                        }
                    )
                ));

            declaration.Members.Add(constructor);
        }



        private void AddEntityFields(CodeTypeDeclaration declaration)
        {
            foreach (Tuple<string, string> value in _entityClassNamesAndDataContextFieldNames)
            {
                string entityClassName = value.Item1;
                string dataContextFieldName = value.Item2;

                CodeMemberField codeMemberField = new CodeMemberField(new CodeTypeReference(entityClassName), dataContextFieldName);
                codeMemberField.Attributes = MemberAttributes.Public;

                declaration.Members.Add(codeMemberField);
            }
        }



        private static void AddSqlDataContextMethods(CodeTypeDeclaration declaration)
        {
            CodeMemberMethod codeMemberMethodAdd = new CodeMemberMethod();
            codeMemberMethodAdd.Name = "Add";
            codeMemberMethodAdd.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeMemberMethodAdd.Parameters.Add(new CodeParameterDeclarationExpression(typeof(object), "entity"));
            codeMemberMethodAdd.Parameters.Add(new CodeParameterDeclarationExpression(typeof(string), "fieldName"));

            codeMemberMethodAdd.Statements.Add(
                new CodeMethodInvokeExpression(
                    new CodeVariableReferenceExpression(SqlDataContextHelperClassName),
                    "Add",
                    new CodeExpression[] {
                        new CodeVariableReferenceExpression("entity"),
                        new CodeVariableReferenceExpression("fieldName")
                    }
                ));

            declaration.Members.Add(codeMemberMethodAdd);



            CodeMemberMethod codeMemberMethodRemove = new CodeMemberMethod();
            codeMemberMethodRemove.Name = "Remove";
            codeMemberMethodRemove.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeMemberMethodRemove.Parameters.Add(new CodeParameterDeclarationExpression(typeof(object), "entity"));
            codeMemberMethodRemove.Parameters.Add(new CodeParameterDeclarationExpression(typeof(string), "fieldName"));

            codeMemberMethodRemove.Statements.Add(
                new CodeMethodInvokeExpression(
                    new CodeVariableReferenceExpression(SqlDataContextHelperClassName),
                    "Remove",
                    new CodeExpression[] {
                        new CodeVariableReferenceExpression("entity"),
                        new CodeVariableReferenceExpression("fieldName")
                    }
                ));

            declaration.Members.Add(codeMemberMethodRemove);
        }
    }




#warning MRJ: BM: Remove this
    internal sealed class DataContextClassGenerator
    {
        private string _dataContextClassName;
        IEnumerable<SqlDataProviderCodeGeneratorTable> _tables;

        private const string _sqlDataContextHelperClassName = "_sqlDataContextHelperClass";

        public DataContextClassGenerator(string dataContextClassName,
                                         IEnumerable<SqlDataProviderCodeGeneratorTable> tables
                                    )
        {
            _dataContextClassName = dataContextClassName;
            _tables = tables;
        }



        public CodeTypeDeclaration CreateClass()
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration();
            declaration.Name = _dataContextClassName;
            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(typeof(DataContextBase));
            declaration.BaseTypes.Add(typeof(ISqlDataContext));

            CodeMemberField codeMemberField = new CodeMemberField(typeof(SqlDataContextHelperClass), _sqlDataContextHelperClassName);
            declaration.Members.Add(codeMemberField);

            AddConstructor(declaration);
            AddEntityFields(declaration);
            AddSqlDataContextMethods(declaration);

            return declaration;
        }



        private void AddConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor constructor = new CodeConstructor();
            constructor.Attributes = MemberAttributes.Public;

            constructor.Parameters.Add(
                new CodeParameterDeclarationExpression(
                    typeof(IDbConnection), "connection"));

            constructor.BaseConstructorArgs.Add(new CodeVariableReferenceExpression("connection"));

            constructor.CustomAttributes.Add(new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(DebuggerNonUserCodeAttribute))
                ));


            constructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeVariableReferenceExpression(_sqlDataContextHelperClassName),
                    new CodeObjectCreateExpression(
                        typeof(SqlDataContextHelperClass),
                        new CodeExpression[] {
                            new CodeThisReferenceExpression()
                        }
                    )
                ));

            declaration.Members.Add(constructor);
        }



        private void AddEntityFields(CodeTypeDeclaration declaration)
        {
            foreach (SqlDataProviderCodeGeneratorTable table in _tables)
            {
                if (table.Validated == true)
                {
                    foreach (var kvp in table.Stores)
                    {
                        var storage = kvp.Value;

                        var reference = new CodeTypeReference(storage.EntityClassName);

                        var field = new CodeMemberField(reference, storage.DataContextFieldName);
                        field.Attributes = MemberAttributes.Public;

                        declaration.Members.Add(field);
                    }
                }
            }
        }



        private void AddSqlDataContextMethods(CodeTypeDeclaration declaration)
        {
            CodeMemberMethod codeMemberMethodAdd = new CodeMemberMethod();
            codeMemberMethodAdd.Name = "Add";
            codeMemberMethodAdd.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeMemberMethodAdd.Parameters.Add(new CodeParameterDeclarationExpression(typeof(object), "entity"));
            codeMemberMethodAdd.Parameters.Add(new CodeParameterDeclarationExpression(typeof(string), "fieldName"));

            codeMemberMethodAdd.Statements.Add(
                new CodeMethodInvokeExpression(
                    new CodeVariableReferenceExpression(_sqlDataContextHelperClassName),
                    "Add",
                    new CodeExpression[] {
                        new CodeVariableReferenceExpression("entity"),
                        new CodeVariableReferenceExpression("fieldName")
                    }
                ));

            declaration.Members.Add(codeMemberMethodAdd);



            CodeMemberMethod codeMemberMethodRemove = new CodeMemberMethod();
            codeMemberMethodRemove.Name = "Remove";
            codeMemberMethodRemove.Attributes = MemberAttributes.Public | MemberAttributes.Final;
            codeMemberMethodRemove.Parameters.Add(new CodeParameterDeclarationExpression(typeof(object), "entity"));
            codeMemberMethodRemove.Parameters.Add(new CodeParameterDeclarationExpression(typeof(string), "fieldName"));

            codeMemberMethodRemove.Statements.Add(
                new CodeMethodInvokeExpression(
                    new CodeVariableReferenceExpression(_sqlDataContextHelperClassName),
                    "Remove",
                    new CodeExpression[] {
                        new CodeVariableReferenceExpression("entity"),
                        new CodeVariableReferenceExpression("fieldName")
                    }
                ));

            declaration.Members.Add(codeMemberMethodRemove);
        }
    }
}
