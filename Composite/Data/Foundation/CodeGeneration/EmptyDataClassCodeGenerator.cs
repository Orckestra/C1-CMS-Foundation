using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;


namespace Composite.Data.Foundation.CodeGeneration
{



    internal static class EmptyDataClassCodeGenerator
    {
        public static readonly string NamespaceName = "Composite.Data.GeneratedTypes";



#warning MRJ: Move this method and refact it with CreateClassName
        internal static string GetEmptyClassTypeFullName(DataTypeDescriptor dataTypeDescriptor)
        {
            return NamespaceName + "." + CreateClassName(dataTypeDescriptor.GetFullInterfaceName());
        }



        internal static void AddEmptyDataClassTypeCode(CodeGenerationBuilder codeGenerationBuilder, DataTypeDescriptor dataTypeDescriptor, Type baseClassType = null, CodeAttributeDeclaration codeAttributeDeclaration = null)
        {
            if (baseClassType == null) baseClassType = typeof(EmptyDataClassBase);

            CodeTypeDeclaration codeTypeDeclaration = CreateCodeTypeDeclaration(dataTypeDescriptor, baseClassType, codeAttributeDeclaration);
            
            codeGenerationBuilder.AddType(NamespaceName, codeTypeDeclaration);
        }



        internal static void AddAssemblyReferences(CodeGenerationBuilder codeGenerationBuilder, DataTypeDescriptor dataTypeDescriptor)
        {
            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

            codeGenerationBuilder.AddReference(typeof(EmptyDataClassBase).Assembly);
            codeGenerationBuilder.AddReference(typeof(EditorBrowsableAttribute).Assembly);
            codeGenerationBuilder.AddReference(interfaceType.Assembly);

            if (!string.IsNullOrEmpty(dataTypeDescriptor.BuildNewHandlerTypeName))
            {
                Type buildeNewHandlerType = TypeManager.GetType(dataTypeDescriptor.BuildNewHandlerTypeName);
                codeGenerationBuilder.AddReference(buildeNewHandlerType.Assembly);
            }
        }



        internal static CodeTypeDeclaration CreateCodeTypeDeclaration(DataTypeDescriptor dataTypeDescriptor, Type baseClass, CodeAttributeDeclaration codeAttributeDeclaration)
        {
            Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

            string interfaceTypeFullName = interfaceType.FullName;
            CodeTypeDeclaration declaration = new CodeTypeDeclaration();

            declaration.Name = CreateClassName(interfaceTypeFullName);
            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(SerializableAttribute))));
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

            if (baseClass != null)
            {
                declaration.BaseTypes.Add(baseClass);
            }
            declaration.BaseTypes.Add(interfaceType);


            if (codeAttributeDeclaration != null)
            {
                declaration.CustomAttributes.Add(codeAttributeDeclaration);
            }


            AddConstructor(declaration);
            AddInterfaceProperties(declaration, dataTypeDescriptor.Fields);

            AddInterfaceTypeProperty(declaration, interfaceTypeFullName);

            return declaration;
        }



        private static void AddConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor codeConstructor = new CodeConstructor();

            codeConstructor.Attributes = MemberAttributes.Public;

            declaration.Members.Add(codeConstructor);
        }



        private static void AddInterfaceProperties(CodeTypeDeclaration declaration, IEnumerable<DataFieldDescriptor> dataFieldDescriptors)
        {
            foreach (DataFieldDescriptor dataFieldDescriptor in dataFieldDescriptors)
            {
                string fieldName = CreateFieldName(dataFieldDescriptor);

                CodeMemberField codeField = new CodeMemberField(new CodeTypeReference(dataFieldDescriptor.InstanceType), fieldName);

                declaration.Members.Add(codeField);

                CodeMemberProperty property = new CodeMemberProperty();
                property.Attributes = MemberAttributes.Public | MemberAttributes.Final;
                property.Name = dataFieldDescriptor.Name;
                property.HasGet = true;
                // property.HasSet = dataFieldDescriptor.CanWrite;
#warning MRJ: BM: Handle readonly here
                property.HasSet = true;
                property.Type = new CodeTypeReference(dataFieldDescriptor.InstanceType);


                property.GetStatements.Add(
                        new CodeMethodReturnStatement(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                fieldName
                            )
                        )
                    );


#warning MRJ: BM: Handle readonly here
                // if (dataFieldDescriptor.CanWrite == true)
                {
                    property.SetStatements.Add(
                    new CodeAssignStatement(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            fieldName
                        ),
                        new CodePropertySetValueReferenceExpression()
                    ));
                }

                declaration.Members.Add(property);
            }
        }


        private static void AddInterfaceTypeProperty(CodeTypeDeclaration declaration, string interfaceTypeFullName)
        {
            CodeMemberProperty codeMemberProperty = new CodeMemberProperty();
            codeMemberProperty.Name = "_InterfaceType";

            codeMemberProperty.Type = new CodeTypeReference(typeof(Type));
            codeMemberProperty.Attributes = MemberAttributes.Family | MemberAttributes.Override;
            codeMemberProperty.HasSet = false;
            codeMemberProperty.HasGet = true;
            codeMemberProperty.GetStatements.Add(
                    new CodeMethodReturnStatement(
                        new CodeTypeOfExpression(interfaceTypeFullName)
                    )
                );

            declaration.Members.Add(codeMemberProperty);
        }



        private static string CreateClassName(string fullname)
        {
            return string.Format("{0}EmptyClass", fullname.Replace('.', '_').Replace('+', '_'));
        }



        private static string CreateFieldName(DataFieldDescriptor dataFieldDescriptor)
        {
            return string.Format("_{0}", dataFieldDescriptor.Name.ToLower());
        }
    }





    internal static class EmptyDataClassGenerator
    {
        public static readonly string NamespaceName = "Composite.Data.GeneratedTypes";
        private const string _compileUnitIdPrefix = "Composite.Data.EmptyClasses";

        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static EmptyDataClassGenerator()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static Type CreateType(Type interfaceType)
        {
            return CreateType(interfaceType, typeof(EmptyDataClassBase), null);
        }



        public static Type CreateType(Type interfaceType, Type baseClass, CodeAttributeDeclaration codeAttributeDeclaration)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (typeof(IData).IsAssignableFrom(interfaceType) == false) throw new ArgumentException(string.Format("The type '{0}' must implement '{1}'", interfaceType, typeof(IData)));
            if (baseClass == null) throw new ArgumentNullException("baseClass");

            Type emptyClassType;
            if (_resourceLocker.Resources.CreatedTypes.TryGetValue(interfaceType, out emptyClassType) == false)
            {
                emptyClassType = GenerateType(interfaceType, baseClass, codeAttributeDeclaration);

                using (_resourceLocker.Locker)
                {
                    if (_resourceLocker.Resources.CreatedTypes.ContainsKey(interfaceType) == false)
                        _resourceLocker.Resources.CreatedTypes.Add(interfaceType, emptyClassType);
                }
            }

            return emptyClassType;
        }



        private static Type GenerateType(Type interfaceType, Type baseClass, CodeAttributeDeclaration codeAttributeDeclaration)
        {
            string codeCompileUnitId = CreateCompileUnitId(interfaceType);
            string codeCompileUnitFingerprint = interfaceType.Assembly.FullName;

            using (_resourceLocker.Locker)
            {
                BuildManagerCompileUnit buildManagerCompileUnit = new BuildManagerCompileUnit(codeCompileUnitId, codeCompileUnitFingerprint);
                buildManagerCompileUnit.AllowSiloing = false;

                buildManagerCompileUnit.AddType(NamespaceName, new KeyValuePair<string, Func<CodeTypeDeclaration>>(CreateClassName(interfaceType.FullName), () => CreateCodeTypeDeclaration(interfaceType, baseClass, codeAttributeDeclaration)));

                buildManagerCompileUnit.AddAssemblyReference(typeof(EditorBrowsableAttribute).Assembly);
                buildManagerCompileUnit.AddAssemblyReference(interfaceType.Assembly);
                if (baseClass != null)
                {
                    buildManagerCompileUnit.AddAssemblyReference(baseClass.Assembly);
                }

                BuildManager.GetCompiledTypes(buildManagerCompileUnit);

                string className = CreateClassName(interfaceType.FullName);

                return buildManagerCompileUnit.GetGeneretedTypeByName(className);
            }
        }



        internal static void AddSerializerType(Type interfaceType, Type emptyClassType)
        {
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.CreatedTypes.ContainsKey(interfaceType) == false)
                {
                    _resourceLocker.Resources.CreatedTypes.Add(interfaceType, emptyClassType);
                }
            }
        }


        internal static CodeTypeDeclaration CreateCodeTypeDeclaration(Type interfaceType, Type baseClass, CodeAttributeDeclaration codeAttributeDeclaration)
        {
            List<BuildManagerPropertyInfo> buildManagerPropertyInfos =
                (from pi in interfaceType.GetPropertiesRecursively(prop => typeof(IData).IsAssignableFrom(prop.DeclaringType))
                 where pi.Name != "DataSourceId"
                 select new BuildManagerPropertyInfo(pi)).ToList();

            return CreateCodeTypeDeclaration(
                interfaceType.FullName,
                buildManagerPropertyInfos,
                interfaceType.GetInterfaces(),
                baseClass,
                codeAttributeDeclaration);
        }



        internal static CodeTypeDeclaration CreateCodeTypeDeclaration(BuildManagerSiloData buildManagerSiloData)
        {
            List<BuildManagerPropertyInfo> buildManagerPropertyInfos =
                (from bmpi in buildManagerSiloData.TargetTypeRecursiveInterfaceProperties
                 where bmpi.Name != "DataSourceId" &&
                       (bmpi.DeclaringType == null || (bmpi.DeclaringType != null && typeof(IData).IsAssignableFrom(bmpi.DeclaringType)))
                 select bmpi).ToList();

            return CreateCodeTypeDeclaration(
                buildManagerSiloData.TargetTypeFullName,
                buildManagerPropertyInfos,
                buildManagerSiloData.TargetTypeBaseTypes,
                typeof(EmptyDataClassBase),
                null);
        }



        private static CodeTypeDeclaration CreateCodeTypeDeclaration(string interfaceTypeFullName, IEnumerable<BuildManagerPropertyInfo> buildManagerPropertyInfos, IEnumerable<Type> interfaceTypeBaseTypes, Type baseClass, CodeAttributeDeclaration codeAttributeDeclaration)
        {
            CodeTypeDeclaration declaration = new CodeTypeDeclaration();

            declaration.Name = CreateClassName(interfaceTypeFullName);
            declaration.IsClass = true;
            declaration.TypeAttributes = TypeAttributes.Public | TypeAttributes.Sealed;
            declaration.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(SerializableAttribute))));
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

            if (baseClass != null)
            {
                declaration.BaseTypes.Add(baseClass);
            }
            declaration.BaseTypes.Add(interfaceTypeFullName);


            if (codeAttributeDeclaration != null)
            {
                declaration.CustomAttributes.Add(codeAttributeDeclaration);
            }


            AddConstructor(declaration);
            AddInterfaceProperties(declaration, buildManagerPropertyInfos);

            AddInterfaceTypeProperty(declaration, interfaceTypeFullName);

            return declaration;
        }



        private static void AddConstructor(CodeTypeDeclaration declaration)
        {
            CodeConstructor codeConstructor = new CodeConstructor();

            codeConstructor.Attributes = MemberAttributes.Public;

            declaration.Members.Add(codeConstructor);
        }



        private static void AddInterfaceProperties(CodeTypeDeclaration declaration, IEnumerable<BuildManagerPropertyInfo> buildManagerPropertyInfos)
        {
            foreach (BuildManagerPropertyInfo propertyInfo in buildManagerPropertyInfos)
            {
                string fieldName = CreateFieldName(propertyInfo);

                CodeMemberField codeField = new CodeMemberField(new CodeTypeReference(propertyInfo.PropertyType), fieldName);

                declaration.Members.Add(codeField);

                CodeMemberProperty property = new CodeMemberProperty();
                property.Attributes = MemberAttributes.Public | MemberAttributes.Final;
                property.Name = propertyInfo.Name;
                property.HasGet = true;
                property.HasSet = propertyInfo.CanWrite;
                property.Type = new CodeTypeReference(propertyInfo.PropertyType);


                property.GetStatements.Add(
                        new CodeMethodReturnStatement(
                            new CodeFieldReferenceExpression(
                                new CodeThisReferenceExpression(),
                                fieldName
                            )
                        )
                    );


                if (propertyInfo.CanWrite == true)
                {
                    property.SetStatements.Add(
                    new CodeAssignStatement(
                        new CodeFieldReferenceExpression(
                            new CodeThisReferenceExpression(),
                            fieldName
                        ),
                        new CodePropertySetValueReferenceExpression()
                    ));
                }

                declaration.Members.Add(property);
            }
        }


        private static void AddInterfaceTypeProperty(CodeTypeDeclaration declaration, string interfaceTypeFullName)
        {
            CodeMemberProperty codeMemberProperty = new CodeMemberProperty();
            codeMemberProperty.Name = "_InterfaceType";

            codeMemberProperty.Type = new CodeTypeReference(typeof(Type));
            codeMemberProperty.Attributes = MemberAttributes.Family | MemberAttributes.Override;
            codeMemberProperty.HasSet = false;
            codeMemberProperty.HasGet = true;
            codeMemberProperty.GetStatements.Add(
                    new CodeMethodReturnStatement(
                        new CodeTypeOfExpression(interfaceTypeFullName)
                    )
                );

            declaration.Members.Add(codeMemberProperty);
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


        private static string CreateClassName(string fullname)
        {
            return string.Format("{0}EmptyClass", fullname.Replace('.', '_').Replace('+', '_'));
        }


        private static string CreateFieldName(BuildManagerPropertyInfo property)
        {
            return string.Format("_{0}", property.Name.ToLower());
        }


        private sealed class Resources
        {
            public Dictionary<Type, Type> CreatedTypes { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.CreatedTypes = new Dictionary<Type, Type>();
            }
        }
    }
}
