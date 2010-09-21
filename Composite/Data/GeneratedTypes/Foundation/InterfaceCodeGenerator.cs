using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core.Collections.Generic;
using Composite.Data.DynamicTypes;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.ProcessControlled.ProcessControllers.GenericVersionProcessController;
using Composite.C1Console.Events;
using Composite.Functions;
using Composite.Core.Types;
using Composite.Data.Validation;
using Composite.Data.Validation.Validators;
using System.Text;
using Composite.Core.Logging;
using Composite.Core.WebClient.Renderings.Data;


namespace Composite.Data.GeneratedTypes.Foundation
{
    internal static class InterfaceCodeGenerator
    {
        private const string _compileUnitId = "Composite.Data.GeneratedInterfaces";


        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static InterfaceCodeGenerator()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static Type CreateType(DataTypeDescriptor dataTypeDescriptor)
        {
            if (dataTypeDescriptor == null) throw new ArgumentNullException("dataTypeDescriptor");

            Type interfaceType;

            using (_resourceLocker.Locker)
            {
                _resourceLocker.Resources.CompiledInterfaces.TryGetValue(dataTypeDescriptor, out interfaceType);
            }

            if (interfaceType == null)
            {
                interfaceType = GenerateType(dataTypeDescriptor);

                using (_resourceLocker.Locker)
                {
                    if (_resourceLocker.Resources.CompiledInterfaces.ContainsKey(dataTypeDescriptor) == false)
                    {
                        _resourceLocker.Resources.CompiledInterfaces.Add(dataTypeDescriptor, interfaceType);
                    }
                }
            }

            return interfaceType;
        }

        public static CompatibilityCheckResult CheckCompatibilityWithAppCodeFolder(DataTypeDescriptor dataTypeDescriptor)
        {
            BuildManagerCompileUnit compileUnit = GenerateCompilationUnit(dataTypeDescriptor);
            return BuildManager.CheckAppCodeCompatibility(compileUnit);
        }

        internal static BuildManagerCompileUnit GenerateCompilationUnit(DataTypeDescriptor dataTypeDescriptor)
        {
            string compileUnitId = CreateCompileUnitId(dataTypeDescriptor);
            string fingerprint = CreateFingerprint(dataTypeDescriptor);

            BuildManagerCompileUnit buildManagerCompileUnit = new BuildManagerCompileUnit(compileUnitId, fingerprint);

            List<Assembly> referencedAssemblies = new List<Assembly>();
            buildManagerCompileUnit.AddType(dataTypeDescriptor.Namespace, new KeyValuePair<string, Func<CodeTypeDeclaration>>(dataTypeDescriptor.Name, () => CreateCodeTypeDeclaration(dataTypeDescriptor, referencedAssemblies)));

            buildManagerCompileUnit.AddAssemblyReference(typeof(ImmutableTypeIdAttribute).Assembly);
            buildManagerCompileUnit.AddAssemblyReference(typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.NotNullValidatorAttribute).Assembly);
            foreach (Assembly referencedAssembly in referencedAssemblies)
            {
                buildManagerCompileUnit.AddAssemblyReference(referencedAssembly);
            }

            return buildManagerCompileUnit;
        }

        private static Type GenerateType(DataTypeDescriptor dataTypeDescriptor)
        {
            BuildManagerCompileUnit compilationUnit = GenerateCompilationUnit(dataTypeDescriptor);

            BuildManager.GetCompiledTypes(compilationUnit);

            return compilationUnit.GetGeneretedTypeByName(dataTypeDescriptor.Name);
        }



        private static CodeTypeDeclaration CreateCodeTypeDeclaration(DataTypeDescriptor dataTypeDescriptor, List<Assembly> referencedAssemblies)
        {
            try
            {
                CodeTypeDeclaration codeTypeDeclaration = new CodeTypeDeclaration(dataTypeDescriptor.Name);

                codeTypeDeclaration.IsInterface = true;

                codeTypeDeclaration.BaseTypes.Add(new CodeTypeReference(typeof(IData)));

                List<string> propertyNamesToSkrip = new List<string>();

                foreach (Type superInterface in dataTypeDescriptor.SuperInterfaces)
                {
                    codeTypeDeclaration.BaseTypes.Add(new CodeTypeReference(superInterface));

                    propertyNamesToSkrip.AddRange(superInterface.GetAllProperties().Select(p => p.Name));
                }

                AddInterfaceAttributes(codeTypeDeclaration, dataTypeDescriptor);
                AddInterfaceProperties(codeTypeDeclaration, dataTypeDescriptor, referencedAssemblies, propertyNamesToSkrip);

                return codeTypeDeclaration;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(
                    string.Format("Failed to generate interface for type '{0}'", dataTypeDescriptor.TypeManagerTypeName),
                    ex);
            }
        }



        private static void AddInterfaceAttributes(CodeTypeDeclaration codeTypeDeclaration, DataTypeDescriptor dataTypeDescriptor)
        {
            codeTypeDeclaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(AutoUpdatebleAttribute).FullName,
                    new CodeAttributeArgument[] {
                    }
                ));


            codeTypeDeclaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(DataScopeAttribute).FullName,
                    new CodeAttributeArgument[] { 
                        new CodeAttributeArgument(
                            new CodePrimitiveExpression( DataScopeIdentifier.GetDefault().Name ))
                    }
                ));


            codeTypeDeclaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(RelevantToUserTypeAttribute).FullName,
                    new CodeAttributeArgument[] { 
                        new CodeAttributeArgument(
                            new CodePrimitiveExpression( UserType.Developer.ToString() ))
                    }
                ));


            codeTypeDeclaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(CodeGeneratedAttribute).FullName,
                    new CodeAttributeArgument[] {
                    }
                ));


            codeTypeDeclaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(DataAncestorProviderAttribute).FullName,
                    new CodeAttributeArgument[] {
                        new CodeAttributeArgument(
                            new CodeTypeOfExpression(typeof(NoAncestorDataAncestorProvider))
                        )
                    }
                ));

            codeTypeDeclaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(ImmutableTypeIdAttribute).FullName,
                    new CodeAttributeArgument[] {
                        new CodeAttributeArgument(new CodePrimitiveExpression(dataTypeDescriptor.DataTypeId.ToString()))
                    }
                ));


            CodeFieldReferenceExpression xhtmlEmbedableEnumRef =
             new CodeFieldReferenceExpression(
             new CodeTypeReferenceExpression(
              typeof(XhtmlRenderingType)
              ),
              XhtmlRenderingType.Embedable.ToString());

            codeTypeDeclaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(KeyTemplatedXhtmlRendererAttribute).FullName,
                    new CodeAttributeArgument[] {
                            new CodeAttributeArgument(xhtmlEmbedableEnumRef),
                            new CodeAttributeArgument(new CodePrimitiveExpression("<span>{label}</span>"))
                        }
                ));

            

            foreach (string keyFieldName in dataTypeDescriptor.KeyPropertyNames)
            {
                bool isDefinedOnSuperInterface = dataTypeDescriptor.SuperInterfaces.Where(f => f.GetProperty(keyFieldName) != null).Any();

                if (!isDefinedOnSuperInterface)
                {
                    codeTypeDeclaration.CustomAttributes.Add(
                        new CodeAttributeDeclaration(
                            typeof(KeyPropertyNameAttribute).FullName,
                            new CodeAttributeArgument[] {
                            new CodeAttributeArgument(new CodePrimitiveExpression(keyFieldName))
                        }
                        ));
                }
            }

            if (dataTypeDescriptor.StoreSortOrderFieldNames.Count > 0)
            {
                codeTypeDeclaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(StoreSortOrderAttribute).FullName,
                    dataTypeDescriptor.StoreSortOrderFieldNames.Select(name => new CodeAttributeArgument(new CodePrimitiveExpression(name))).ToArray()
                ));
            }

            if (string.IsNullOrEmpty(dataTypeDescriptor.Title) == false)
            {
                codeTypeDeclaration.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(TitleAttribute).FullName,
                        new CodeAttributeArgument(
                            new CodePrimitiveExpression(dataTypeDescriptor.Title)
                        )
                    ));
            }

            if (string.IsNullOrEmpty(dataTypeDescriptor.LabelFieldName) == false)
            {
                codeTypeDeclaration.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(LabelPropertyNameAttribute).FullName,
                        new CodeAttributeArgument(
                            new CodePrimitiveExpression(dataTypeDescriptor.LabelFieldName)
                        )
                    ));
            }


            foreach (DataTypeAssociationDescriptor dataTypeAssociationDescriptor in dataTypeDescriptor.DataAssociations)
            {
                codeTypeDeclaration.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(DataAssociationAttribute).FullName,
                        new CodeAttributeArgument[] {
                            new CodeAttributeArgument( new CodeTypeOfExpression(dataTypeAssociationDescriptor.AssociatedInterfaceType)),
                            new CodeAttributeArgument(new CodePrimitiveExpression(dataTypeAssociationDescriptor.ForeignKeyPropertyName)),
                            new CodeAttributeArgument(new CodeFieldReferenceExpression(new CodeTypeReferenceExpression(typeof(DataAssociationType)),dataTypeAssociationDescriptor.AssociationType.ToString()))
                        }
                    ));
            }
            

            if (dataTypeDescriptor.Cachable == true)
            {
                // [CachingAttribute(CachingType.Full)]
                codeTypeDeclaration.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(CachingAttribute).FullName,
                        new CodeAttributeArgument[] {
                            new CodeAttributeArgument(
                                new CodeFieldReferenceExpression(
                                    new CodeTypeReferenceExpression(typeof(CachingType)),
                                    "Full"
                                )
                            )
                        }
                    ));
            }
        }



        private static void AddInterfaceProperties(CodeTypeDeclaration codeTypeDeclaratoin, DataTypeDescriptor dataTypeDescriptor, List<Assembly> referencedAssemblies, List<string> propertyNamesToSkip)
        {
            foreach (DataFieldDescriptor dataFieldDescriptor in dataTypeDescriptor.Fields.Where(dfd => dfd.Inherited == false))
            {
                if (propertyNamesToSkip.Contains(dataFieldDescriptor.Name) == true) continue;

                CodeMemberProperty codeMemberProperty = new CodeMemberProperty();
                codeMemberProperty.Name = dataFieldDescriptor.Name;
                codeMemberProperty.Type = new CodeTypeReference(dataFieldDescriptor.InstanceType);
                codeMemberProperty.HasGet = true;
                codeMemberProperty.HasSet = true;

                AddPropertyAttributes(codeMemberProperty, dataFieldDescriptor, referencedAssemblies);

                codeTypeDeclaratoin.Members.Add(codeMemberProperty);
            }
        }



        private static void AddPropertyAttributes(CodeMemberProperty codeMemberProperty, DataFieldDescriptor dataFieldDescriptor, List<Assembly> referencedAssemblies)
        {
            codeMemberProperty.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(ImmutableFieldIdAttribute).FullName,
                        new CodeAttributeArgument[] {
                            new CodeAttributeArgument(new CodePrimitiveExpression(dataFieldDescriptor.Id.ToString()))
                        }
                    ));

            List<CodeAttributeArgument> arguments = new List<CodeAttributeArgument>();

            arguments.Add(new CodeAttributeArgument(
                new CodePropertyReferenceExpression(
                    new CodeTypeReferenceExpression(typeof(PhysicalStoreFieldType)),
                    dataFieldDescriptor.StoreType.PhysicalStoreType.ToString()
                )));


            switch (dataFieldDescriptor.StoreType.PhysicalStoreType)
            {
                case PhysicalStoreFieldType.String:
                    arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(dataFieldDescriptor.StoreType.MaximumLength)));
                    break;

                case PhysicalStoreFieldType.Decimal:
                    arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(dataFieldDescriptor.StoreType.NumericPrecision)));
                    arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(dataFieldDescriptor.StoreType.NumericScale)));
                    break;
            }


            if (dataFieldDescriptor.IsNullable == true)
            {
                arguments.Add(new CodeAttributeArgument("IsNullable", new CodePrimitiveExpression(true)));
            }


            codeMemberProperty.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(StoreFieldTypeAttribute).FullName,
                    arguments.ToArray()
                ));


            if (dataFieldDescriptor.ValidationFunctionMarkup != null)
            {
                foreach (string functionMarkup in dataFieldDescriptor.ValidationFunctionMarkup)
                {
                    IPropertyValidatorBuilder propertyValidatorBuilder = null;

//MRJ: Data module refac: This is eager, make it lazy
                    try
                    {
                        BaseRuntimeTreeNode node = FunctionFacade.BuildTree(XElement.Parse(functionMarkup));
                        propertyValidatorBuilder = node.GetValue<IPropertyValidatorBuilder>();
                    }
                    catch (Exception ex)
                    {
                        string errMsg = string.Format("Validator function markup parse / execution failed with the following error: '{0}'. The validator attribute is dropped.", ex.Message);
                        Core.Logging.LoggingService.LogError("InterfaceCodeGenerator", errMsg);
                    }

                    if (propertyValidatorBuilder != null)
                    {
                        CodeAttributeDeclaration codeAttributeDeclaration = propertyValidatorBuilder.GetCodeAttributeDeclaration();

                        Assembly assembly = propertyValidatorBuilder.GetAttribute().GetType().Assembly;
                        referencedAssemblies.Add(assembly);

                        codeMemberProperty.CustomAttributes.Add(codeAttributeDeclaration);
                    }
                }
            }

            if (dataFieldDescriptor.IsNullable == false)
            {
                Assembly assembly = typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.NotNullValidatorAttribute).Assembly;
                referencedAssemblies.Add(assembly);
                CodeAttributeDeclaration notNullAttribute = new CodeAttributeDeclaration(new CodeTypeReference(typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.NotNullValidatorAttribute)));
                codeMemberProperty.CustomAttributes.Add(notNullAttribute);

                if (dataFieldDescriptor.StoreType.IsDateTime == true)
                {
                    referencedAssemblies.Add(typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.DateTimeRangeValidator).Assembly);

                    CodeAttributeDeclaration dateRangeAttribute = new CodeAttributeDeclaration(new CodeTypeReference(typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.DateTimeRangeValidatorAttribute)));

                    // 1753 is what sql server has as minimum date...
                    dateRangeAttribute.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression("1753-01-01T00:00:00")));
                    dateRangeAttribute.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression("9999-12-31T23:59:59")));
                    codeMemberProperty.CustomAttributes.Add(dateRangeAttribute);
                }
                else if (dataFieldDescriptor.ForeignKeyReferenceTypeName != null && dataFieldDescriptor.InstanceType == typeof(Guid))
                {
                    referencedAssemblies.Add(typeof(GuidNotEmptyAttribute).Assembly);

                    codeMemberProperty.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(GuidNotEmptyAttribute))));
                }
            }






            if (dataFieldDescriptor.StoreType.IsString == true && dataFieldDescriptor.StoreType.IsLargeString == false)
            {
                CodeAttributeDeclaration stringLengthAttribute;
                if (dataFieldDescriptor.IsNullable == false)
                {
                    stringLengthAttribute = new CodeAttributeDeclaration(new CodeTypeReference(typeof(Composite.Data.Validation.Validators.StringSizeValidatorAttribute)));
                }
                else
                {
                    stringLengthAttribute = new CodeAttributeDeclaration(new CodeTypeReference(typeof(NullStringLengthValidatorAttribute)));
                }

                int max = dataFieldDescriptor.StoreType.MaximumLength;

                stringLengthAttribute.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(0)));
                stringLengthAttribute.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(max)));
                codeMemberProperty.CustomAttributes.Add(stringLengthAttribute);
            }

            if (dataFieldDescriptor.StoreType.PhysicalStoreType == PhysicalStoreFieldType.Integer)
            {
                CodeAttributeDeclaration integerRangeValidatorAttribute = new CodeAttributeDeclaration(new CodeTypeReference(typeof(IntegerRangeValidatorAttribute)));
                integerRangeValidatorAttribute.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(Int32.MinValue)));
                integerRangeValidatorAttribute.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(Int32.MaxValue)));

                codeMemberProperty.CustomAttributes.Add(integerRangeValidatorAttribute);
            }

            if (dataFieldDescriptor.StoreType.IsDecimal == true)
            {
                CodeAttributeDeclaration decimalPrecisionAttribute = new CodeAttributeDeclaration(new CodeTypeReference(typeof(DecimalPrecisionValidatorAttribute)));

                int precision = dataFieldDescriptor.StoreType.NumericScale;

                decimalPrecisionAttribute.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(precision)));
                codeMemberProperty.CustomAttributes.Add(decimalPrecisionAttribute);
            }

            if (!dataFieldDescriptor.IsNullable && dataFieldDescriptor.DefaultValue != null)
            {
                CodeAttributeDeclaration codeAttributeDeclaration = dataFieldDescriptor.DefaultValue.GetCodeAttributeDeclaration();

                if (codeAttributeDeclaration != null)
                {
                    codeMemberProperty.CustomAttributes.Add(codeAttributeDeclaration);
                }
            }

            if (dataFieldDescriptor.ForeignKeyReferenceTypeName != null)
            {
                List<CodeAttributeArgument> codeAttributeArgument = new List<CodeAttributeArgument> 
                {
                    new CodeAttributeArgument(new CodePrimitiveExpression(dataFieldDescriptor.ForeignKeyReferenceTypeName)),
                    new CodeAttributeArgument("AllowCascadeDeletes", new CodePrimitiveExpression(true))
                };

                if (dataFieldDescriptor.IsNullable == false)
                {
                    if (dataFieldDescriptor.InstanceType == typeof(Guid))
                    {
                        codeAttributeArgument.Add(new CodeAttributeArgument("NullReferenceValue", new CodePrimitiveExpression("{00000000-0000-0000-0000-000000000000}")));
                    }
                    else if (dataFieldDescriptor.InstanceType == typeof(string))
                    {
                        codeAttributeArgument.Add(new CodeAttributeArgument("NullReferenceValue", new CodePrimitiveExpression(null)));
                    }
                    else if (dataFieldDescriptor.InstanceType == typeof(int))
                    {
                        codeAttributeArgument.Add(new CodeAttributeArgument("NullReferenceValue", new CodePrimitiveExpression(0)));
                    }
                    else
                    {
                        throw new NotImplementedException();
                    }
                }
                else if (dataFieldDescriptor.InstanceType == typeof(string))
                {
                    codeAttributeArgument.Add(new CodeAttributeArgument("NullableString", new CodePrimitiveExpression(true)));
                }

                codeMemberProperty.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(ForeignKeyAttribute).FullName,
                        codeAttributeArgument.ToArray()
                    ));
            }

            if (dataFieldDescriptor.NewInstanceDefaultFieldValue != null)
            {
                codeMemberProperty.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(FunctionBasedNewInstanceDefaultFieldValueAttribute).FullName,
                        new CodeAttributeArgument[] {
                            new CodeAttributeArgument(new CodePrimitiveExpression(dataFieldDescriptor.NewInstanceDefaultFieldValue))
                        }
                    ));
            }
        }



        private static string CreateCompileUnitId(DataTypeDescriptor dataTypeDescriptor)
        {
            if (dataTypeDescriptor.Namespace == "")
            {
                return string.Format("{0}.{1}", _compileUnitId, dataTypeDescriptor.Name);
            }
            else
            {
                return string.Format("{0}.{1}.{2}", _compileUnitId, dataTypeDescriptor.Namespace, dataTypeDescriptor.Name);
            }
        }



        private static string CreateFingerprint(DataTypeDescriptor dataTypeDescriptor)
        {
            StringBuilder sb = new StringBuilder();

            sb.Append(dataTypeDescriptor.DataTypeId);
            sb.Append("·");

            sb.Append(dataTypeDescriptor.Version);
            sb.Append("·");

            return sb.ToString();
        }



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private sealed class Resources
        {
            public Dictionary<DataTypeDescriptor, Type> CompiledInterfaces { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.CompiledInterfaces = new Dictionary<DataTypeDescriptor, Type>();
            }
        }
    }
}
