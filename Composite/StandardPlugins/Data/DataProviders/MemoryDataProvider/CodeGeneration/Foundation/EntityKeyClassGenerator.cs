using System.CodeDom;
using System;
using System.Linq;
using Composite.Data;
using Composite.StandardPlugins.Data.DataProviders.MemoryDataProvider.Foundation;
using System.Collections.Generic;
using System.Reflection;
using Composite.Data.Plugins.DataProvider.CodeGeneration;


namespace Composite.StandardPlugins.Data.DataProviders.MemoryDataProvider.CodeGeneration.Foundation
{
    internal sealed class EntityKeyClassGenerator
    {
        private const string _entityFieldName = "_entity";
        private const string _dataIdFieldName = "_dataId";

        private MemoryEntityData _memoryEntityData;


        public EntityKeyClassGenerator(MemoryEntityData memoryEntityData)
        {
            _memoryEntityData = memoryEntityData;
        }


        public IEnumerable<KeyValuePair<string, Func<CodeTypeDeclaration>>> CreateClasses()
        {
            yield return new KeyValuePair<string, Func<CodeTypeDeclaration>>(_memoryEntityData.KeyClassName, () => CreateClass());
        }



        private CodeTypeDeclaration CreateClass()
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration(_memoryEntityData.KeyClassName);

            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(typeof(MemoryEntityKeyBase));
            declaration.BaseTypes.Add(typeof(IMemoryEntityKey));

            foreach (Property property in _memoryEntityData.PropertyList.DataIdProperties)
            {
                declaration.Members.Add(new CodeMemberField(property.Type, MakeFieldName(property.Name)));
            }

            AddConstructorEntity(declaration);
            AddConstructorDataId(declaration);
            AddEqualsMethod(declaration);
            AddGetHashCodeMethod(declaration);

            return declaration;
        }



        private void AddConstructorEntity(CodeTypeDeclaration declaration)
        {
            string parameterName = "entity";

            CodeConstructor constructor = new CodeConstructor();

            constructor.Attributes = MemberAttributes.Public;

            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                    new CodeTypeReference(_memoryEntityData.InterfaceType),
                    parameterName
                ));

            foreach (Property property in _memoryEntityData.PropertyList.DataIdProperties)
            {
                constructor.Statements.Add(
                    new CodeAssignStatement(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            MakeFieldName(property.Name)
                        ),
                        new CodePropertyReferenceExpression(
                            new CodeVariableReferenceExpression("entity"),
                            property.Name
                        )
                    ));
            }

            declaration.Members.Add(constructor);
        }



        private void AddConstructorDataId(CodeTypeDeclaration declaration)
        {
            string parameterName = "dataId";

            CodeConstructor constructor = new CodeConstructor();

            constructor.Attributes = MemberAttributes.Public;

            constructor.Parameters.Add(new CodeParameterDeclarationExpression(
                    new CodeTypeReference(_memoryEntityData.DataIdClassName),
                    parameterName
                ));

            foreach (Property property in _memoryEntityData.PropertyList.DataIdProperties)
            {
                constructor.Statements.Add(
                    new CodeAssignStatement(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            MakeFieldName(property.Name)
                        ),
                        new CodePropertyReferenceExpression(
                            new CodeVariableReferenceExpression("dataId"),
                            property.Name
                        )
                    ));
            }

            declaration.Members.Add(constructor);
        }



        private void AddEqualsMethod(CodeTypeDeclaration declaration)
        {
            CodeMemberMethod equalsOverrideMethod = new CodeMemberMethod();
            equalsOverrideMethod.Name = "Equals";
            equalsOverrideMethod.Attributes = MemberAttributes.Public | MemberAttributes.Override;
            equalsOverrideMethod.ReturnType = new CodeTypeReference(typeof(bool));
            equalsOverrideMethod.Parameters.Add(new CodeParameterDeclarationExpression(new CodeTypeReference(typeof(object)), "obj"));

            equalsOverrideMethod.Statements.Add(new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(
                        new CodeVariableReferenceExpression("obj"),
                        CodeBinaryOperatorType.IdentityEquality,
                        new CodePrimitiveExpression(null)
                    ),
                    new CodeStatement[] {
                        new CodeMethodReturnStatement(new CodePrimitiveExpression(false))
                    }
                ));

            CodeTypeReference codeEntityType = new CodeTypeReference(_memoryEntityData.KeyClassName);

            equalsOverrideMethod.Statements.Add(new CodeVariableDeclarationStatement(
                    codeEntityType,
                    "castedKey"
                ));

            equalsOverrideMethod.Statements.Add(new CodeTryCatchFinallyStatement(
                    new CodeStatement[] {
                        new CodeAssignStatement(
                            new CodeVariableReferenceExpression("castedKey"),
                            new CodeCastExpression(
                                codeEntityType,
                                new CodeVariableReferenceExpression("obj")
                            )
                        )
                    },
                    new CodeCatchClause[] {
                        new CodeCatchClause(
                            null, 
                            new CodeTypeReference(typeof(Exception)),
                            new CodeStatement[] {
                                new CodeMethodReturnStatement(new CodePrimitiveExpression(false))
                            }
                        )
                    }
                ));


            CodeExpression currentExpression = null;
            foreach (string dataIdProperyName in _memoryEntityData.PropertyList.DataIdProperties.Select(p => p.Name))
            {
                CodeExpression newExpression = new CodeBinaryOperatorExpression(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        MakeFieldName(dataIdProperyName)
                    ),
                    CodeBinaryOperatorType.IdentityEquality,
                    new CodeFieldReferenceExpression(
                        new CodeVariableReferenceExpression("castedKey"),
                        MakeFieldName(dataIdProperyName)
                    ));

                if (currentExpression == null)
                {
                    currentExpression = newExpression;
                }
                else
                {
                    currentExpression = new CodeBinaryOperatorExpression(
                            currentExpression,
                            CodeBinaryOperatorType.BooleanAnd,
                            newExpression
                        );
                }
            }

            equalsOverrideMethod.Statements.Add(new CodeMethodReturnStatement(currentExpression));

            declaration.Members.Add(equalsOverrideMethod);
        }



        private void AddGetHashCodeMethod(CodeTypeDeclaration declaration)
        {
            CodeMemberMethod codeMethod = new CodeMemberMethod();
            codeMethod.Name = "GetHashCode";
            codeMethod.Attributes = MemberAttributes.Public | MemberAttributes.Override;
            codeMethod.ReturnType = new CodeTypeReference(typeof(int));


            CodeExpression currentExpression = null;
            foreach (string dataIdProperyName in _memoryEntityData.PropertyList.DataIdProperties.Select(p => p.Name))
            {
                CodeExpression newExpression = new CodeMethodInvokeExpression(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            MakeFieldName(dataIdProperyName)
                        ),
                        "GetHashCode",
                        new CodeExpression[] { }
                    );

                if (currentExpression == null)
                {
                    currentExpression = newExpression;
                }
                else
                {
                    currentExpression = new CodeMethodInvokeExpression(
                            new CodeThisReferenceExpression(),
                            "Xor",
                            new CodeExpression[] {
                                currentExpression,
                                newExpression
                            }
                        );
                }
            }

            codeMethod.Statements.Add(new CodeMethodReturnStatement(currentExpression));

            declaration.Members.Add(codeMethod);
        }



        private static string MakeFieldName(string name)
        {
            return string.Format("_{0}", name);
        }
    }
}
