using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Linq.Mapping;
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


#warning MRJ: BM: Is this used?
#warning MRJ: BM: Rename this
        public static void AddInterfaceProperty1(string name, string dbName, Type type, string dbType, bool isNullable, bool isId, bool isAutoGen, bool isBaseClass, CodeTypeDeclaration declaration)
        {
            // For the base class we're adding protected fields, and public properties
            // For the entity class we're adding public properties with mapping attributes

            string fieldName = string.Format("_{0}", name);

            if (isBaseClass)
            {
                var field = new CodeMemberField();
                field.Name = fieldName;
                field.Type = new CodeTypeReference(type);
                field.Attributes = MemberAttributes.Family;
                declaration.Members.Add(field);
            }


            CodeMemberProperty property = new CodeMemberProperty();
            property.Name = name;
            property.Type = new CodeTypeReference(type);
            property.Attributes = MemberAttributes.Public;
            property.HasSet = true;
            property.HasGet = true;
            property.GetStatements.Add(new CodeMethodReturnStatement(new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), fieldName)));

            CodeStatement setStatement;
            if(isBaseClass)
            {
                // set 
                // {
                //  if(this._{name} != value)
                //  {
                //      this.OnPropertyChanging("{name}");
                //      this._{name} = value;
                //      this.OnPropertyChanged("{name}");
                //  }
                // }
                setStatement = new CodeConditionStatement(
                    new CodeBinaryOperatorExpression(
                        new CodePropertyReferenceExpression(new CodeThisReferenceExpression(), fieldName),
                        CodeBinaryOperatorType.IdentityInequality,
                        new CodeArgumentReferenceExpression("value")
                        ),
                    new CodeStatement[]
                        {                            
                            new CodeAssignStatement(
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    fieldName
                                    ),
                                new CodeArgumentReferenceExpression("value")
                            )
                            //new CodeExpressionStatement(
                            //    new CodeMethodInvokeExpression(
                            //        new CodeThisReferenceExpression(),
                            //        "OnPropertyChanging",
                            //        new CodeExpression[]
                            //            {
                            //                new CodePrimitiveExpression(name)
                            //            }
                            //        )
                            //    ),
                            //new CodeAssignStatement(
                            //    new CodeFieldReferenceExpression(
                            //        new CodeThisReferenceExpression(),
                            //        fieldName
                            //        ),
                            //    new CodeArgumentReferenceExpression("value")
                            //    ),
                            //new CodeExpressionStatement(
                            //    new CodeMethodInvokeExpression(
                            //        new CodeThisReferenceExpression(),
                            //        "OnPropertyChanged",
                            //        new CodeExpression[]
                            //            {
                            //                new CodePrimitiveExpression(name)
                            //            }
                            //        )
                            //    )
                        }
                    );
            } 
            else
            {
                // set 
                // {
                //   base.{name} = value
                // }
                setStatement = new CodeAssignStatement(
                        new CodePropertyReferenceExpression(
                            new CodeBaseReferenceExpression(), 
                            name
                        ),
                        new CodeArgumentReferenceExpression("value")
                    );
            }
            property.SetStatements.Add(setStatement);

            // Not adding attributes for the base class - we need them only for entity class 
            if (!isBaseClass)
            {
                property.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(DebuggerNonUserCodeAttribute))));

                var codeAttributeArguments = new List<CodeAttributeArgument> {
                    new CodeAttributeArgument("Name", new CodePrimitiveExpression(dbName)),
                    new CodeAttributeArgument("Storage", new CodePrimitiveExpression(fieldName)),
                    new CodeAttributeArgument("DbType", new CodePrimitiveExpression(dbType)),
                    new CodeAttributeArgument("CanBeNull", new CodePrimitiveExpression(isNullable)),
                    new CodeAttributeArgument("IsPrimaryKey", new CodePrimitiveExpression(isId)),
                    new CodeAttributeArgument("IsDbGenerated", new CodePrimitiveExpression(isAutoGen))
                };

                // NOTE: Disabling optimistic cuncurrency check for all fields.
                // if (type == typeof(DateTime))
                {
                    codeAttributeArguments.Add(
                            new CodeAttributeArgument("UpdateCheck",
                                new CodeFieldReferenceExpression(
                                    new CodeTypeReferenceExpression(typeof(UpdateCheck)),
                                    "Never"
                                )
                            )
                        );
                }

                property.CustomAttributes.Add(new CodeAttributeDeclaration(
                        new CodeTypeReference(typeof(ColumnAttribute)),
                        codeAttributeArguments.ToArray()
                    ));

            }
            declaration.Members.Add(property);
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
