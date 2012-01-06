using System.CodeDom;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    internal static class EntityCodeGeneratorHelper
    {
        public static string GetDbType(SqlDbType dbType, bool isNullable)
        {
            string s = dbType.ToString().ToLower();
            if (s == "varchar") s = "nvarchar";

            return string.Format("{0}{1}", s, isNullable ? "" : " NOT NULL");
        }



        public static void AddPropertyChanging(CodeTypeDeclaration declaration)
        {
            CodeMemberEvent changingEvent = new CodeMemberEvent();
            changingEvent.Name = "PropertyChanging";
            changingEvent.Type = new CodeTypeReference(typeof(PropertyChangingEventHandler));
            changingEvent.Attributes = MemberAttributes.Public;

            declaration.Members.Add(changingEvent);


            CodeMemberMethod changingMethod = new CodeMemberMethod();
            changingMethod.Name = "OnPropertyChanging";
            changingMethod.ReturnType = new CodeTypeReference(typeof(void));
            changingMethod.Attributes = MemberAttributes.Family;
            changingMethod.Parameters.Add(new CodeParameterDeclarationExpression(typeof(string), "propertyName"));
            changingMethod.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(DebuggerNonUserCodeAttribute))));



            changingMethod.Statements.Add(new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(
                        new CodePropertyReferenceExpression(new CodeThisReferenceExpression(), "PropertyChanging"),
                        CodeBinaryOperatorType.IdentityInequality,
                        new CodePrimitiveExpression(null)
                    ),
                    new CodeStatement[] {
                        new CodeExpressionStatement(
                            new CodeMethodInvokeExpression(
                                new CodeThisReferenceExpression(),
                                "PropertyChanging",
                                new CodeExpression[] {
                                    new CodeThisReferenceExpression(),
                                    new CodeObjectCreateExpression(
                                        typeof(PropertyChangingEventArgs),
                                        new CodeExpression[] {
                                            new CodeArgumentReferenceExpression("propertyName")
                                        }
                                    )
                                }
                            )
                        )
                    }
                ));

            declaration.Members.Add(changingMethod);
        }



        public static void AddPropertyChanged(CodeTypeDeclaration declaration)
        {
            CodeMemberEvent changingEvent = new CodeMemberEvent();
            changingEvent.Name = "PropertyChanged";
            changingEvent.Type = new CodeTypeReference(typeof(PropertyChangedEventHandler));
            changingEvent.Attributes = MemberAttributes.Public;

            declaration.Members.Add(changingEvent);


            CodeMemberMethod changingMethod = new CodeMemberMethod();
            changingMethod.Name = "OnPropertyChanged";
            changingMethod.ReturnType = new CodeTypeReference(typeof(void));
            changingMethod.Attributes = MemberAttributes.Family;
            changingMethod.Parameters.Add(new CodeParameterDeclarationExpression(typeof(string), "propertyName"));
            changingMethod.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(DebuggerNonUserCodeAttribute))));


            changingMethod.Statements.Add(new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(
                        new CodePropertyReferenceExpression(new CodeThisReferenceExpression(), "PropertyChanged"),
                        CodeBinaryOperatorType.IdentityInequality,
                        new CodePrimitiveExpression(null)
                    ),
                    new CodeStatement[] {
                        new CodeExpressionStatement(
                            new CodeMethodInvokeExpression(
                                new CodeThisReferenceExpression(),
                                "PropertyChanged",
                                new CodeExpression[] {
                                    new CodeThisReferenceExpression(),
                                    new CodeObjectCreateExpression(
                                        typeof(PropertyChangedEventArgs),
                                        new CodeExpression[] {
                                            new CodeArgumentReferenceExpression("propertyName")
                                        }
                                    )
                                }
                            )
                        )
                    }
                ));


            declaration.Members.Add(changingMethod);
        }
    }
}
