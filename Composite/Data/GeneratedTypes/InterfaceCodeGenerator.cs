using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;
using Composite.Core.Types;
using Composite.Core.WebClient.Renderings.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Validation.Validators;
using System.Reflection;


namespace Composite.Data.GeneratedTypes
{
    /// <summary>
    /// Will generate data interfaces given <see cref="DataTypeDescriptor"/>.
    /// </summary>
    public static class InterfaceCodeGenerator
    {
        private static readonly ResourceLocker<Resources> ResourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);


        static InterfaceCodeGenerator()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }


        /// <summary>
        /// Adds the assembly references required by the supplied <see cref="DataTypeDescriptor"/> to the supplied  <see cref="CodeGenerationBuilder"/>
        /// </summary>
        /// <param name="codeGenerationBuilder">Assembly refences is added to this builder</param>
        /// <param name="dataTypeDescriptor">Data type descriptor which may contain references to assemblies</param>
        public static void AddAssemblyReferences(CodeGenerationBuilder codeGenerationBuilder, DataTypeDescriptor dataTypeDescriptor)
        {
            foreach (Assembly assembly in GetReferencedAssemblies(dataTypeDescriptor))
            {
                codeGenerationBuilder.AddReference(assembly);
            }
        }


        /// <summary>
        /// Adds the source code defined by <see cref="DataTypeDescriptor"/> to the supplied  <see cref="CodeGenerationBuilder"/>
        /// </summary>
        /// <param name="codeGenerationBuilder">Source code is added to this builder</param>
        /// <param name="dataTypeDescriptor">Data type descriptor to convert into source code</param>
        public static void AddInterfaceTypeCode(CodeGenerationBuilder codeGenerationBuilder, DataTypeDescriptor dataTypeDescriptor)
        {
            var codeTypeDeclaration = CreateCodeTypeDeclaration(dataTypeDescriptor);

            var codeNamespace = new CodeNamespace(dataTypeDescriptor.Namespace);
            codeNamespace.Types.Add(codeTypeDeclaration);
            codeGenerationBuilder.AddNamespace(codeNamespace);
        }



        internal static IEnumerable<Assembly> GetReferencedAssemblies(DataTypeDescriptor dataTypeDescriptor)
        {
            yield return typeof(ImmutableTypeIdAttribute).Assembly;
            yield return  typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.NotNullValidatorAttribute).Assembly;
        }


        /// <summary>
        /// Given a <see cref="DataTypeDescriptor"/> creates a interface declaration inheriting from IData, a valid C1 Datatype.
        /// </summary>
        /// <param name="dataTypeDescriptor">A description of the data type to generate interface for</param>
        /// <returns>The generated interface</returns>
        public static CodeTypeDeclaration CreateCodeTypeDeclaration(DataTypeDescriptor dataTypeDescriptor)
        {
            try
            {
                var codeTypeDeclaration = new CodeTypeDeclaration(dataTypeDescriptor.Name)
                {
                    IsInterface = true
                };

                codeTypeDeclaration.BaseTypes.Add(new CodeTypeReference(typeof(IData)));

                var propertyNamesToSkip = new List<string>();

                foreach (Type superInterface in dataTypeDescriptor.SuperInterfaces)
                {
                    codeTypeDeclaration.BaseTypes.Add(new CodeTypeReference(superInterface));

                    propertyNamesToSkip.AddRange(superInterface.GetAllProperties().Select(p => p.Name));
                }

                AddInterfaceAttributes(codeTypeDeclaration, dataTypeDescriptor);
                AddInterfaceProperties(codeTypeDeclaration, dataTypeDescriptor, propertyNamesToSkip);

                return codeTypeDeclaration;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(string.Format("Failed to generate interface for type '{0}'", dataTypeDescriptor.TypeManagerTypeName), ex);
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
                    new [] { 
                        new CodeAttributeArgument(
                            new CodePrimitiveExpression( DataScopeIdentifier.GetDefault().Name ))
                    }
                ));


            codeTypeDeclaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(RelevantToUserTypeAttribute).FullName,
                    new [] { 
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
                    new [] {
                        new CodeAttributeArgument(
                            new CodeTypeOfExpression(typeof(NoAncestorDataAncestorProvider))
                        )
                    }
                ));

            codeTypeDeclaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(ImmutableTypeIdAttribute).FullName,
                    new [] {
                        new CodeAttributeArgument(new CodePrimitiveExpression(dataTypeDescriptor.DataTypeId.ToString()))
                    }
                ));


            var xhtmlEmbedableEnumRef =
             new CodeFieldReferenceExpression(
             new CodeTypeReferenceExpression(
              typeof(XhtmlRenderingType)
              ),
              XhtmlRenderingType.Embedable.ToString());

            codeTypeDeclaration.CustomAttributes.Add(
                new CodeAttributeDeclaration(
                    typeof(KeyTemplatedXhtmlRendererAttribute).FullName,
                    new [] {
                            new CodeAttributeArgument(xhtmlEmbedableEnumRef),
                            new CodeAttributeArgument(new CodePrimitiveExpression("<span>{label}</span>"))
                        }
                ));



            foreach (string keyFieldName in dataTypeDescriptor.KeyPropertyNames)
            {
                bool isDefinedOnSuperInterface = dataTypeDescriptor.SuperInterfaces.Any(f => f.GetProperty(keyFieldName) != null);

                if (!isDefinedOnSuperInterface)
                {
                    codeTypeDeclaration.CustomAttributes.Add(
                        new CodeAttributeDeclaration(
                            typeof(KeyPropertyNameAttribute).FullName,
                            new [] {
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

            if (!string.IsNullOrEmpty(dataTypeDescriptor.Title))
            {
                codeTypeDeclaration.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(TitleAttribute).FullName,
                        new CodeAttributeArgument(
                            new CodePrimitiveExpression(dataTypeDescriptor.Title)
                        )
                    ));
            }

            if (!string.IsNullOrEmpty(dataTypeDescriptor.LabelFieldName))
            {
                codeTypeDeclaration.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(LabelPropertyNameAttribute).FullName,
                        new CodeAttributeArgument(
                            new CodePrimitiveExpression(dataTypeDescriptor.LabelFieldName)
                        )
                    ));
            }

            if (!string.IsNullOrEmpty(dataTypeDescriptor.InternalUrlPrefix))
            {
                codeTypeDeclaration.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof (InternalUrlAttribute).FullName,
                        new CodeAttributeArgument(
                            new CodePrimitiveExpression(dataTypeDescriptor.InternalUrlPrefix)
                            )
                        ));
            }


            foreach (DataTypeAssociationDescriptor dataTypeAssociationDescriptor in dataTypeDescriptor.DataAssociations)
            {
                codeTypeDeclaration.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(DataAssociationAttribute).FullName,
                        new [] {
                            new CodeAttributeArgument( new CodeTypeOfExpression(dataTypeAssociationDescriptor.AssociatedInterfaceType)),
                            new CodeAttributeArgument(new CodePrimitiveExpression(dataTypeAssociationDescriptor.ForeignKeyPropertyName)),
                            new CodeAttributeArgument(new CodeFieldReferenceExpression(new CodeTypeReferenceExpression(typeof(DataAssociationType)),dataTypeAssociationDescriptor.AssociationType.ToString()))
                        }
                    ));
            }


            if (dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPageMetaData)) == false)
            {
                if (dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)))
                {
                    codeTypeDeclaration.CustomAttributes.Add(
                        new CodeAttributeDeclaration(
                            typeof(PublishProcessControllerTypeAttribute).FullName,
                            new[] {
                            new CodeAttributeArgument(new CodeTypeOfExpression(typeof(GenericPublishProcessController)))
                        }
                        ));
                }
            }


            if (dataTypeDescriptor.Cachable)
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



        private static void AddInterfaceProperties(CodeTypeDeclaration codeTypeDeclaratoin, DataTypeDescriptor dataTypeDescriptor, List<string> propertyNamesToSkip)
        {
            foreach (DataFieldDescriptor dataFieldDescriptor in dataTypeDescriptor.Fields.Where(dfd => dfd.Inherited == false))
            {
                if (propertyNamesToSkip.Contains(dataFieldDescriptor.Name)) continue;

                var codeMemberProperty = new CodeMemberProperty
                {
                    Name = dataFieldDescriptor.Name,
                    Type = new CodeTypeReference(dataFieldDescriptor.InstanceType),
                    HasGet = true,
                    HasSet = true
                };

                AddPropertyAttributes(codeMemberProperty, dataFieldDescriptor, dataTypeDescriptor.KeyPropertyNames.Contains(dataFieldDescriptor.Name));

                codeTypeDeclaratoin.Members.Add(codeMemberProperty);
            }
        }



        private static void AddPropertyAttributes(CodeMemberProperty codeMemberProperty, DataFieldDescriptor dataFieldDescriptor, bool isKeyField)
        {
            codeMemberProperty.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(ImmutableFieldIdAttribute).FullName,
                        new CodeAttributeArgument[] {
                            new CodeAttributeArgument(new CodePrimitiveExpression(dataFieldDescriptor.Id.ToString()))
                        }
                    ));

            if (isKeyField && dataFieldDescriptor.InstanceType == typeof(Guid) && dataFieldDescriptor.NewInstanceDefaultFieldValue == null)
            {
                codeMemberProperty.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(FunctionBasedNewInstanceDefaultFieldValueAttribute).FullName,
                        new CodeAttributeArgument[] {
                            new CodeAttributeArgument(new CodePrimitiveExpression(@"<f:function name=""Composite.Utils.Guid.NewGuid"" xmlns:f=""http://www.composite.net/ns/function/1.0"" />"))
                        }
                    ));
            }
            else if (dataFieldDescriptor.NewInstanceDefaultFieldValue != null)
            {
                codeMemberProperty.CustomAttributes.Add(
                    new CodeAttributeDeclaration(
                        typeof(FunctionBasedNewInstanceDefaultFieldValueAttribute).FullName,
                        new CodeAttributeArgument[] {
                            new CodeAttributeArgument(new CodePrimitiveExpression(dataFieldDescriptor.NewInstanceDefaultFieldValue))
                        }
                    ));
            }


            var arguments = new List<CodeAttributeArgument>
            {
                new CodeAttributeArgument(
                    new CodePropertyReferenceExpression(
                        new CodeTypeReferenceExpression(typeof (PhysicalStoreFieldType)),
                        dataFieldDescriptor.StoreType.PhysicalStoreType.ToString()
                        ))
            };


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


            if (dataFieldDescriptor.IsNullable)
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
                    var codeAttributeDeclaration =
                        new CodeAttributeDeclaration(
                            new CodeTypeReference(typeof(LazyFunctionProviedPropertyAttribute)),
                            new CodeAttributeArgument(
                                new CodePrimitiveExpression(functionMarkup)
                            )
                        );

                    codeMemberProperty.CustomAttributes.Add(codeAttributeDeclaration);
                }
            }

            if (!dataFieldDescriptor.IsNullable)
            {
                if (!dataFieldDescriptor.InstanceType.IsValueType)
                {
                    var notNullAttribute = new CodeAttributeDeclaration(new CodeTypeReference(typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.NotNullValidatorAttribute)));
                    codeMemberProperty.CustomAttributes.Add(notNullAttribute);
                }

                if (dataFieldDescriptor.StoreType.IsDateTime)
                {
                    var dateRangeAttribute = new CodeAttributeDeclaration(new CodeTypeReference(typeof(Microsoft.Practices.EnterpriseLibrary.Validation.Validators.DateTimeRangeValidatorAttribute)));

                    // 1753 is what sql server has as minimum date...
                    dateRangeAttribute.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression("1753-01-01T00:00:00")));
                    dateRangeAttribute.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression("9999-12-31T23:59:59")));
                    codeMemberProperty.CustomAttributes.Add(dateRangeAttribute);
                }
                else if (dataFieldDescriptor.ForeignKeyReferenceTypeName != null && dataFieldDescriptor.InstanceType == typeof(Guid))
                {
                    codeMemberProperty.CustomAttributes.Add(new CodeAttributeDeclaration(new CodeTypeReference(typeof(GuidNotEmptyAttribute))));
                }
            }


            if (dataFieldDescriptor.Position < 1000) // Hmm, 1000 is kinda random
            {
                var fieldPositionAttribute = new CodeAttributeDeclaration(
                    new CodeTypeReference(typeof(FieldPositionAttribute)),
                    new CodeAttributeArgument(new CodePrimitiveExpression(dataFieldDescriptor.Position))
                );

                codeMemberProperty.CustomAttributes.Add(fieldPositionAttribute);
            }


            if (dataFieldDescriptor.StoreType.IsString && !dataFieldDescriptor.StoreType.IsLargeString)
            {
                var attributeType = dataFieldDescriptor.IsNullable
                    ? typeof (NullStringLengthValidatorAttribute)
                    : typeof (StringSizeValidatorAttribute);

                int max = dataFieldDescriptor.StoreType.MaximumLength;

                var stringLengthAttribute = new CodeAttributeDeclaration(new CodeTypeReference(attributeType),
                    new CodeAttributeArgument(new CodePrimitiveExpression(0)),
                    new CodeAttributeArgument(new CodePrimitiveExpression(max)));

                codeMemberProperty.CustomAttributes.Add(stringLengthAttribute);
            }

            if (dataFieldDescriptor.StoreType.PhysicalStoreType == PhysicalStoreFieldType.Integer)
            {
                Type validatorAttributeType = dataFieldDescriptor.IsNullable ? typeof(NullIntegerRangeValidatorAttribute) : typeof(IntegerRangeValidatorAttribute);

                var integerRangeValidatorAttribute = new CodeAttributeDeclaration(new CodeTypeReference(validatorAttributeType), 
                    new CodeAttributeArgument(new CodePrimitiveExpression(Int32.MinValue)),
                    new CodeAttributeArgument(new CodePrimitiveExpression(Int32.MaxValue)));

                codeMemberProperty.CustomAttributes.Add(integerRangeValidatorAttribute);
            }

            if (dataFieldDescriptor.StoreType.IsDecimal)
            {
                var decimalPrecisionAttribute = new CodeAttributeDeclaration(new CodeTypeReference(typeof(DecimalPrecisionValidatorAttribute)));

                int precision = dataFieldDescriptor.StoreType.NumericScale;

                decimalPrecisionAttribute.Arguments.Add(new CodeAttributeArgument(new CodePrimitiveExpression(precision)));
                codeMemberProperty.CustomAttributes.Add(decimalPrecisionAttribute);
            }

            if (dataFieldDescriptor.DefaultValue != null)
            {
                CodeAttributeDeclaration codeAttributeDeclaration = dataFieldDescriptor.DefaultValue.GetCodeAttributeDeclaration();

                if (codeAttributeDeclaration != null)
                {
                    codeMemberProperty.CustomAttributes.Add(codeAttributeDeclaration);
                }
            }

            if (dataFieldDescriptor.ForeignKeyReferenceTypeName != null)
            {
                var codeAttributeArgument = new List<CodeAttributeArgument> 
                {
                    new CodeAttributeArgument(new CodePrimitiveExpression(dataFieldDescriptor.ForeignKeyReferenceTypeName)),
                    new CodeAttributeArgument("AllowCascadeDeletes", new CodePrimitiveExpression(true))
                };

                if (!dataFieldDescriptor.IsNullable)
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


            if (dataFieldDescriptor.TreeOrderingProfile.OrderPriority.HasValue)
            {
                var args = new List<CodeAttributeArgument> {
                    new CodeAttributeArgument(new CodePrimitiveExpression(dataFieldDescriptor.TreeOrderingProfile.OrderPriority))
                };

                if (dataFieldDescriptor.TreeOrderingProfile.OrderDescending)
                {
                    args.Add( new CodeAttributeArgument(new CodePrimitiveExpression(dataFieldDescriptor.TreeOrderingProfile.OrderDescending)));
                }

                codeMemberProperty.CustomAttributes.Add(
                        new CodeAttributeDeclaration(
                            typeof(TreeOrderingAttribute).FullName, 
                            args.ToArray()
                        ));
                
            }


            if (dataFieldDescriptor.DataUrlProfile != null)
            {
                codeMemberProperty.CustomAttributes.Add(dataFieldDescriptor.DataUrlProfile.GetCodeAttributeDeclaration());
            }


            if (dataFieldDescriptor.GroupByPriority != 0)
            {
                codeMemberProperty.CustomAttributes.Add(
                        new CodeAttributeDeclaration(
                            typeof(GroupByPriorityAttribute).FullName,
                                new CodeAttributeArgument( new CodePrimitiveExpression( dataFieldDescriptor.GroupByPriority ) )
                        ));
                
            }

        }



        private static void Flush()
        {
            ResourceLocker.ResetInitialization();
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
