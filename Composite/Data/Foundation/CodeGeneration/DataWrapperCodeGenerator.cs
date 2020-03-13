using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;
using Composite.Data.DynamicTypes.Foundation;


namespace Composite.Data.Foundation.CodeGeneration
{
    /// <summary>
    /// This class genereated code for data wrapper classes.
    /// </summary>
    internal static class DataWrapperCodeGenerator
    {
        private const string NamespaceName = "CompositeGenerated.DataWrappers";
        private const string WrappedObjectName = "_wrappedData";



        internal static void AddDataWrapperClassCode(CodeGenerationBuilder codeGenerationBuilder, Type interfaceType)
        {
            codeGenerationBuilder.AddReference(interfaceType.Assembly);

            DataTypeDescriptor dataTypeDescriptor = ReflectionBasedDescriptorBuilder.Build(interfaceType);

            AddDataWrapperClassCode(codeGenerationBuilder, dataTypeDescriptor);
        }



        internal static void AddDataWrapperClassCode(CodeGenerationBuilder codeGenerationBuilder, DataTypeDescriptor dataTypeDescriptor)
        {
            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);
            if (interfaceType == null) return;

            codeGenerationBuilder.AddReference(typeof(IDataWrapper).Assembly);
            codeGenerationBuilder.AddReference(typeof(EditorBrowsableAttribute).Assembly);

            CodeTypeDeclaration codeTypeDeclaration = CreateCodeTypeDeclaration(dataTypeDescriptor);

            codeGenerationBuilder.AddType(NamespaceName, codeTypeDeclaration);
        }



        internal static string CreateWrapperClassFullName(string interfaceTypeFullName)
        {
            return NamespaceName + "." + CreateWrapperClassName(interfaceTypeFullName);
        }



        private static string CreateWrapperClassName(string interfaceTypeFullName)
        {
            return string.Format("{0}Wrapper", interfaceTypeFullName.Replace('.', '_').Replace('+', '_'));
        }



        private static CodeTypeDeclaration CreateCodeTypeDeclaration(DataTypeDescriptor dataTypeDescriptor)
        {
            string interfaceTypeFullName = dataTypeDescriptor.GetFullInterfaceName();

            var debugDisplayText = $"Data wrapper for '{interfaceTypeFullName}'";
            foreach (var keyPropertyName in dataTypeDescriptor.KeyPropertyNames)
            {
                debugDisplayText += $", {keyPropertyName} = {{{keyPropertyName}}}";
            }

            var labelFieldName = dataTypeDescriptor.LabelFieldName;
            if (!string.IsNullOrEmpty(labelFieldName) && !dataTypeDescriptor.KeyPropertyNames.Contains(labelFieldName))
            {
                debugDisplayText += $", {labelFieldName} = {{{labelFieldName}}}";
            }

            IEnumerable<Tuple<string, Type, bool>> properties =
                dataTypeDescriptor.Fields.
                    Select(f => new Tuple<string, Type, bool>(f.Name, f.InstanceType, f.IsReadOnly)).
                    Concat(new[] { new Tuple<string, Type, bool>("DataSourceId", typeof(DataSourceId), true) });

            var declaration = new CodeTypeDeclaration
            {
                Name = CreateWrapperClassName(interfaceTypeFullName),
                IsClass = true,
                TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed
            };
            declaration.BaseTypes.Add(interfaceTypeFullName);
            declaration.BaseTypes.Add(typeof(IDataWrapper));
            declaration.CustomAttributes.AddRange(new[]
            {
                new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(EditorBrowsableAttribute)),
                    new CodeAttributeArgument(
                        new CodeFieldReferenceExpression(
                            new CodeTypeReferenceExpression(typeof(EditorBrowsableState)),
                            EditorBrowsableState.Never.ToString()
                        )
                    )
                ),
                new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(DebuggerDisplayAttribute)),
                    new CodeAttributeArgument(
                        new CodePrimitiveExpression(debugDisplayText)
                    )
                )
            });

            declaration.Members.Add(new CodeMemberField(interfaceTypeFullName, WrappedObjectName));

            AddConstructor(declaration, interfaceTypeFullName);
            AddInterfaceProperties(declaration, properties);

            AddMethods(declaration, properties);

            return declaration;
        }



        private static void AddConstructor(CodeTypeDeclaration declaration, string interfaceTypeFullName)
        {
            const string parameterName = "data";

            CodeConstructor codeConstructor = new CodeConstructor();
            codeConstructor.Attributes = MemberAttributes.Public;
            codeConstructor.Parameters.Add(new CodeParameterDeclarationExpression(interfaceTypeFullName, parameterName));

            codeConstructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), WrappedObjectName),
                    new CodeVariableReferenceExpression(parameterName)
                ));

            declaration.Members.Add(codeConstructor);
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="declaration"></param>
        /// <param name="properties">Tuple(string propertyName, Type propertyType, bool readOnly)</param>
        private static void AddInterfaceProperties(CodeTypeDeclaration declaration, IEnumerable<Tuple<string, Type, bool>> properties)
        {
            foreach (var property in properties)
            {
                string propertyName = property.Item1;
                Type propertyType = property.Item2;
                bool readOnly = property.Item3;

                string fieldName = CreateFieldName(propertyName);

                CodeTypeReference nullableType = new CodeTypeReference(
                        typeof(ExtendedNullable<>).FullName,
                        new [] { new CodeTypeReference(propertyType) }
                    );

                CodeMemberField codeField = new CodeMemberField();
                codeField.Name = fieldName;
                codeField.Type = nullableType;

                declaration.Members.Add(codeField);

                CodeMemberProperty codeProperty = new CodeMemberProperty();
                codeProperty.Attributes = MemberAttributes.Public | MemberAttributes.Final;
                codeProperty.Name = propertyName;
                codeProperty.HasGet = true;
                codeProperty.HasSet = !readOnly;
                codeProperty.Type = new CodeTypeReference(propertyType);


                codeProperty.GetStatements.Add(
                    new CodeConditionStatement(
                        new CodeBinaryOperatorExpression(
                            new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    fieldName
                                ),
                            CodeBinaryOperatorType.IdentityInequality,
                            new CodePrimitiveExpression(null)
                        ),
                        new CodeStatement[] {
                            new CodeMethodReturnStatement(
                                new CodePropertyReferenceExpression(
                                    new CodeFieldReferenceExpression(
                                        new CodeThisReferenceExpression(),
                                        fieldName
                                    ),
                                    "Value"
                                )
                            )
                        },
                        new CodeStatement[] {
                            new CodeMethodReturnStatement(
                                new CodePropertyReferenceExpression(
                                    new CodeFieldReferenceExpression(
                                        new CodeThisReferenceExpression(),
                                        WrappedObjectName
                                    ),
                                    propertyName
                                )
                            )
                        }
                    ));


                if (!readOnly)
                {

                    // CODEGEN:
                    // if(this.[fieldName] == null) {
                    //   this.[fieldName] = new ExtendedNullable<...>(); 
                    // }

                    codeProperty.SetStatements.Add(
                        new CodeConditionStatement(
                            new CodeBinaryOperatorExpression(
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    fieldName
                                    ),
                                CodeBinaryOperatorType.IdentityEquality,
                                new CodePrimitiveExpression(null)
                                ),
                            new CodeAssignStatement(
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    fieldName
                                    ),
                                new CodeObjectCreateExpression(nullableType, new CodeExpression[] {}))));

                    // CODEGEN:
                    // this.[fieldName] = value;
                    codeProperty.SetStatements.Add(
                    new CodeAssignStatement(
                        new CodePropertyReferenceExpression(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                fieldName
                            ),
                            "Value"
                        ),
                        new CodePropertySetValueReferenceExpression()
                    ));
                }

                declaration.Members.Add(codeProperty);
            }
        }




        /// <summary>
        /// 
        /// </summary>
        /// <param name="declaration"></param>
        /// <param name="properties">Tuple(string propertyName, Type propertyType, bool readOnly)</param>
        private static void AddMethods(CodeTypeDeclaration declaration, IEnumerable<Tuple<string, Type, bool>> properties)
        {
            CodeMemberProperty codeMemberProperty = new CodeMemberProperty();

            codeMemberProperty.Name = "WrappedData";
            codeMemberProperty.HasGet = true;
            codeMemberProperty.HasSet = false;
            codeMemberProperty.Type = new CodeTypeReference(typeof(IData));
            codeMemberProperty.Attributes = MemberAttributes.Public | MemberAttributes.Final;


            codeMemberProperty.GetStatements.Add(
                new CodeMethodReturnStatement(
                    new CodeFieldReferenceExpression(
                        new CodeThisReferenceExpression(),
                        WrappedObjectName
                    )
                ));

            declaration.Members.Add(codeMemberProperty);


            CodeMemberMethod codeMemberMethod = new CodeMemberMethod();
            codeMemberMethod.Name = "CommitData";
            codeMemberMethod.ReturnType = new CodeTypeReference(typeof(void));
            codeMemberMethod.Attributes = MemberAttributes.Public | MemberAttributes.Final;


            foreach (var property in properties)
            {
                string propertyName = property.Item1;
                bool readOnly = property.Item3;

                if (readOnly) continue;

                string fieldName = CreateFieldName(propertyName);

                List<CodeStatement> statements = new List<CodeStatement>();

                statements.Add(new CodeAssignStatement(
                        new CodePropertyReferenceExpression(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                WrappedObjectName
                            ),
                            propertyName
                        ),
                        new CodePropertyReferenceExpression(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                fieldName
                            ),
                            "Value"
                        )
                    ));


                codeMemberMethod.Statements.Add(new CodeConditionStatement(
                        new CodeBinaryOperatorExpression(
                            new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    fieldName
                                ),
                            CodeBinaryOperatorType.IdentityInequality,
                            new CodePrimitiveExpression(null)
                        ),
                        statements.ToArray()
                    ));
            }

            declaration.Members.Add(codeMemberMethod);
        }




        private static string CreateFieldName(string propertyName)
        {
            return string.Format("_{0}Nullable", propertyName.ToLowerInvariant());
        }
    }
}
