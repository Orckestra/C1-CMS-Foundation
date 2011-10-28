using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using Composite.Core.Extensions;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;


namespace Composite.Data.Foundation.CodeGeneration
{
#warning MRJ: BM: Locking in other managers??
#warning MJR: BM: Move this class
    /// <summary>
    /// This class handles data wrapper types and cashing.
    /// It will through <see cref="DataWrapperCodeGenerator"/> genereated
    /// data wrapper class types if needed.
    /// </summary>
    internal static class DataWrapperTypeManager
    {
        private static readonly object _lock = new object();


        public static Type GetDataWrapperType(Type interfaceType)
        {
            Type wrapperType = TryGetWrapperType(interfaceType.FullName);
            if (wrapperType != null) return wrapperType;

            lock (_lock)
            {
                wrapperType = TryGetWrapperType(interfaceType.FullName);
                if (wrapperType != null) return wrapperType;

                CodeGenerationBuilder codeGenerationBuilder = new CodeGenerationBuilder("DataWrapper:" + interfaceType.FullName);

                DataWrapperCodeGenerator.AddDataWrapperClassCode(codeGenerationBuilder, interfaceType);

                IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);

                return types.Single();
            }
        }



        public static Type GetDataWrapperType(DataTypeDescriptor dataTypeDescriptor)
        {
            Type wrapperType = TryGetWrapperType(dataTypeDescriptor.GetFullInterfaceName());
            if (wrapperType != null) return wrapperType;

            CodeGenerationBuilder codeGenerationBuilder = new CodeGenerationBuilder("DataWrapper:" + dataTypeDescriptor.GetFullInterfaceName());

            DataWrapperCodeGenerator.AddDataWrapperClassCode(codeGenerationBuilder, dataTypeDescriptor);

            IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);

            return types.Single();
        }



        private static Type TryGetWrapperType(string fullName)
        {
            string dataWrapperFullName = DataWrapperCodeGenerator.CreateWrapperClassFullName(fullName);

            Type wrapperType = TypeManager.TryGetType(dataWrapperFullName);

            return wrapperType;
        }
    }


#warning MRJ: BM: Rename this file
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

            DataTypeDescriptor dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(interfaceType.GetImmutableTypeId());

            AddDataWrapperClassCode(codeGenerationBuilder, dataTypeDescriptor);
        }



        internal static void AddDataWrapperClassCode(CodeGenerationBuilder codeGenerationBuilder, DataTypeDescriptor dataTypeDescriptor)
        {
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
            string fullName = dataTypeDescriptor.GetFullInterfaceName();

#warning MRJ: BM: Handle readonly (Datatype descriptor)
            IEnumerable<Tuple<string, Type, bool>> properties =
                dataTypeDescriptor.Fields.
                Select(f => new Tuple<string, Type, bool>(f.Name, f.InstanceType, false)).
                Concat(new[] { new Tuple<string, Type, bool>("DataSourceId", typeof(DataSourceId), true)});

            return CreateCodeTypeDeclaration(fullName,properties);
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="interfaceTypeFullName"></param>
        /// <param name="properties">Tuple(string propertyName, Type propertyType, bool readOnly)</param>
        /// <returns></returns>
        private static CodeTypeDeclaration CreateCodeTypeDeclaration(string interfaceTypeFullName, IEnumerable<Tuple<string, Type, bool>> properties)
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration();
            declaration.Name = CreateWrapperClassName(interfaceTypeFullName);
            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(interfaceTypeFullName);
            declaration.BaseTypes.Add(typeof(IDataWrapper));
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
                        new CodeTypeReference[] { new CodeTypeReference(propertyType) }
                    );

                CodeMemberField codeField = new CodeMemberField();
                codeField.Name = fieldName;
                codeField.Type = nullableType;
                codeField.InitExpression = new CodeObjectCreateExpression(nullableType, new CodeExpression[] { });

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
                            new CodePropertyReferenceExpression(
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    fieldName
                                ),
                                "HasValue"
                            ),
                            CodeBinaryOperatorType.IdentityEquality,
                            new CodePrimitiveExpression(true)
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
#warning MRJ: BM: Handle before set handles (datatype descriptor??)
                    //IEnumerable<Type> beforeSetHandlerTypes =
                    //    from attribute in propertyInfo.GetCustomAttributes<BeforeSetAttribute>()
                    //    select attribute.BeforeSetHandlerType;

                    //if (beforeSetHandlerTypes.Count() > 0)
                    //{
                    //}

                    //foreach (Type type in beforeSetHandlerTypes)
                    //{
                    //    codeProperty.SetStatements.Add(
                    //        new CodeMethodInvokeExpression(
                    //            new CodeMethodReferenceExpression(
                    //                new CodeTypeReferenceExpression(typeof(DataPropertyHandlerFacade)),
                    //                "HandleSet"
                    //            ),
                    //            new CodeExpression[] {
                    //                new CodeTypeOfExpression(type),
                    //                new CodeThisReferenceExpression(),
                    //                new CodePropertySetValueReferenceExpression()
                    //            }
                    //        ));
                    //}

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
                            new CodePropertyReferenceExpression(
                                new CodeFieldReferenceExpression(
                                    new CodeThisReferenceExpression(),
                                    fieldName
                                ),
                                "HasValue"
                            ),
                            CodeBinaryOperatorType.IdentityEquality,
                            new CodePrimitiveExpression(true)
                        ),
                        statements.ToArray()
                    ));
            }

            declaration.Members.Add(codeMemberMethod);
        }




        private static string CreateFieldName(string propertyName)
        {
            return string.Format("_{0}Nullable", propertyName.ToLower());
        }
    }
}
