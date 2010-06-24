using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Collections.Generic;
using Composite.EventSystem;
using Composite.Types;
using Composite.Data.DynamicTypes;


namespace Composite.Data.Foundation.CodeGeneration
{
    internal static class DataWrapperGenerator
    {
        internal static readonly string NamespaceName = "Composite.Data.GeneratedTypes";
        private const string _compileUnitIdPrefix = "Composite.Data.DataWrappers";
        private const string _wrappedObjectName = "_wrappedData";


        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);

        static DataWrapperGenerator()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }

        public static Type CreateType(Type interfaceType)
        {
            Type dataWrapperType;

			var cache = _resourceLocker.Resources.DataWrappers;

			if (!cache.TryGetValue(interfaceType, out dataWrapperType))
			{
				using (_resourceLocker.Locker)
				{
					if (!cache.TryGetValue(interfaceType, out dataWrapperType))
					{
						dataWrapperType = GenerateType(interfaceType);

						_resourceLocker.Resources.DataWrappers.Add(interfaceType, dataWrapperType);
					}
				}
			}


            return dataWrapperType;
        }


        internal static void AddDataWrapperType(Type interfaceType, Type emptyClassType)
        {
        	var cache = _resourceLocker.Resources.DataWrappers;
        	
			if (cache.ContainsKey(interfaceType))
				return;

            using (_resourceLocker.Locker)
            {
				if (cache.ContainsKey(interfaceType))
					return;

                _resourceLocker.Resources.DataWrappers.Add(interfaceType, emptyClassType);
            }
        }

        private static Type GenerateType(Type interfaceType)
        {
            string codeCompileUnitId = CreateCompileUnitId(interfaceType);

            string codeCompileUnitFingerprint = "";
            if (interfaceType.GetCustomAttributesRecursively<CodeGeneratedAttribute>().Any() == false)
            {
                codeCompileUnitFingerprint = interfaceType.Assembly.FullName;
            }
            else
            {
                DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);
                codeCompileUnitFingerprint = dataTypeDescriptor.Version.ToString();
            }

            BuildManagerCompileUnit buildManagerCompileUnit = new BuildManagerCompileUnit(codeCompileUnitId, codeCompileUnitFingerprint);

            buildManagerCompileUnit.AddType(new BuildManagerCompileType(
                NamespaceName,
                new KeyValuePair<string, Func<CodeTypeDeclaration>>(
                    CreateWrapperClassName(interfaceType.FullName),
                    () => CreateCodeTypeDeclaration(interfaceType))));

            buildManagerCompileUnit.AddAssemblyReference(typeof(IDataWrapper).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(interfaceType.Assembly);

            BuildManager.GetCompiledTypes(buildManagerCompileUnit);

            string className = CreateWrapperClassName(interfaceType.FullName);

            return buildManagerCompileUnit.GetGeneretedTypeByName(className);
        }



        private static CodeTypeDeclaration CreateCodeTypeDeclaration(Type interfaceType)
        {
            List<BuildManagerPropertyInfo> buildManagerPropertyInfos =
                (from pi in interfaceType.GetPropertiesRecursively(prop => typeof(IData).IsAssignableFrom(prop.DeclaringType))
                 select new BuildManagerPropertyInfo(pi)).ToList();

            return CreateCodeTypeDeclaration(
                interfaceType.FullName,
                buildManagerPropertyInfos,
                interfaceType.GetInterfaces());
        }



        internal static CodeTypeDeclaration CreateCodeTypeDeclaration(BuildManagerSiloData buildManagerSiloData)
        {
            List<BuildManagerPropertyInfo> buildManagerPropertyInfos =
                (from bmpi in buildManagerSiloData.TargetTypeRecursiveInterfaceProperties
                 where (bmpi.DeclaringType == null || (bmpi.DeclaringType != null && typeof(IData).IsAssignableFrom(bmpi.DeclaringType)))
                 select bmpi).ToList();

            return CreateCodeTypeDeclaration(
                buildManagerSiloData.TargetTypeFullName,
                buildManagerPropertyInfos,
                buildManagerSiloData.TargetTypeBaseTypes);
        }


        private static CodeTypeDeclaration CreateCodeTypeDeclaration(string interfaceTypeFullName, IEnumerable<BuildManagerPropertyInfo> buildManagerPropertyInfos, IEnumerable<Type> interfaceTypeBaseTypes)
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration();
            declaration.Name = CreateWrapperClassName(interfaceTypeFullName);
            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.BaseTypes.Add(interfaceTypeFullName);
            declaration.BaseTypes.Add(typeof(IDataWrapper));

            declaration.Members.Add(new CodeMemberField(interfaceTypeFullName, _wrappedObjectName));

            AddConstructor(declaration, interfaceTypeFullName);
            AddInterfaceProperties(declaration, buildManagerPropertyInfos);

            AddMethods(declaration, buildManagerPropertyInfos);

            return declaration;
        }



        private static void AddConstructor(CodeTypeDeclaration declaration, string interfaceTypeFullName)
        {
            string parameterName = "data";

            CodeConstructor codeConstructor = new CodeConstructor();
            codeConstructor.Attributes = MemberAttributes.Public;
            codeConstructor.Parameters.Add(new CodeParameterDeclarationExpression(interfaceTypeFullName, parameterName));

            codeConstructor.Statements.Add(
                new CodeAssignStatement(
                    new CodeFieldReferenceExpression(new CodeThisReferenceExpression(), _wrappedObjectName),
                    new CodeVariableReferenceExpression(parameterName)
                ));

            declaration.Members.Add(codeConstructor);
        }



        private static void AddInterfaceProperties(CodeTypeDeclaration declaration, IEnumerable<BuildManagerPropertyInfo> buildManagerPropertyInfos)
        {
            foreach (BuildManagerPropertyInfo propertyInfo in buildManagerPropertyInfos)
            {
                string fieldName = CreateFieldName(propertyInfo);
                CodeTypeReference nullableType = new CodeTypeReference(
                        typeof(ExtendedNullable<>).FullName,
                        new CodeTypeReference[] { new CodeTypeReference(propertyInfo.PropertyType) }
                    );

                CodeMemberField codeField = new CodeMemberField();
                codeField.Name = fieldName;
                codeField.Type = nullableType;
                codeField.InitExpression = new CodeObjectCreateExpression(nullableType, new CodeExpression[] { });

                declaration.Members.Add(codeField);

                CodeMemberProperty codeProperty = new CodeMemberProperty();
                codeProperty.Attributes = MemberAttributes.Public | MemberAttributes.Final;
                codeProperty.Name = propertyInfo.Name;
                codeProperty.HasGet = true;
                codeProperty.HasSet = propertyInfo.CanWrite;
                codeProperty.Type = new CodeTypeReference(propertyInfo.PropertyType);


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
                                        _wrappedObjectName
                                    ),
                                    propertyInfo.Name
                                )
                            )
                        }
                    ));


                if (propertyInfo.CanWrite == true)
                {
                    IEnumerable<Type> beforeSetHandlerTypes =
                        from attribute in propertyInfo.GetCustomAttributes<BeforeSetAttribute>()
                        select attribute.BeforeSetHandlerType;

                    if (beforeSetHandlerTypes.Count() > 0)
                    {
                    }

                    foreach (Type type in beforeSetHandlerTypes)
                    {
                        codeProperty.SetStatements.Add(
                            new CodeMethodInvokeExpression(
                                new CodeMethodReferenceExpression(
                                    new CodeTypeReferenceExpression(typeof(DataPropertyHandlerFacade)),
                                    "HandleSet"
                                ),
                                new CodeExpression[] {
                                    new CodeTypeOfExpression(type),
                                    new CodeThisReferenceExpression(),
                                    new CodePropertySetValueReferenceExpression()
                                }
                            ));
                    }

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

        private static void AddMethods(CodeTypeDeclaration declaration, IEnumerable<BuildManagerPropertyInfo> buildManagerPropertyInfos)
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
                        _wrappedObjectName
                    )
                ));

            declaration.Members.Add(codeMemberProperty);


            CodeMemberMethod codeMemberMethod = new CodeMemberMethod();
            codeMemberMethod.Name = "CommitData";
            codeMemberMethod.ReturnType = new CodeTypeReference(typeof(void));
            codeMemberMethod.Attributes = MemberAttributes.Public | MemberAttributes.Final;


            foreach (BuildManagerPropertyInfo propertyInfo in buildManagerPropertyInfos)
            {
                if (propertyInfo.CanWrite == false) continue;

                string fieldName = CreateFieldName(propertyInfo);

                List<CodeStatement> statements = new List<CodeStatement>();

                statements.Add(new CodeAssignStatement(
                        new CodePropertyReferenceExpression(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                _wrappedObjectName
                            ),
                            propertyInfo.Name
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



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private static string CreateCompileUnitId(Type interfaceType)
        {
            return string.Format("{0}.{1}", _compileUnitIdPrefix, interfaceType.FullName.Replace('.', '_').Replace('+', '_'));
        }



        private static string CreateWrapperClassName(string interfaceTypeFullName)
        {
            return string.Format("{0}Wrapper", interfaceTypeFullName.Replace('.', '_').Replace('+', '_'));
        }



        private static string CreateFieldName(BuildManagerPropertyInfo propertyInfo)
        {
            return string.Format("_{0}Nullable", propertyInfo.Name.ToLower());
        }



        private sealed class Resources
        {
            public Hashtable<Type, Type> DataWrappers { get; private set; }

            public static void Initialize(Resources resources)
            {
                resources.DataWrappers = new Hashtable<Type, Type>();
            }
        }
    }
}
