using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.Types;
using Composite.Functions;
using Microsoft.CSharp;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_GeneratedTypes;

namespace Composite.Data.GeneratedTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class GeneratedTypesHelper
    {
        private static readonly string[] ReservedNamespaces = new[] { "System", "Composite.Data.GeneratedTypes", "GeneratedTypes" };
        private static readonly string CompositeNamespace = "Composite";

        private Type _associatedType = null;
        private Type _oldType = null;
        private readonly DataTypeDescriptor _oldDataTypeDescriptor;
        private DataTypeDescriptor _newDataTypeDescriptor;

        private string _newTypeName = null;
        private string _newTypeNamespace = null;
        private string _newTypeTitle = null;
        private bool _cachable;
        private bool _publishControlled = false;
        private bool _localizedControlled = false;

        private IEnumerable<DataFieldDescriptor> _newDataFieldDescriptors = null;
        private string _newLabelFieldName = null;

        private DataAssociationType _dataAssociationType = DataAssociationType.None;
        private DataFieldDescriptor _foreignKeyDataFieldDescriptor = null;
        private DataFieldDescriptor _pageMetaDataDescriptionForeignKeyDataFieldDescriptor = null;
        private DataTypeAssociationDescriptor _dataTypeAssociationDescriptor = null;

        private bool _typeCreated = false;

        private static readonly string IdFieldName = "Id";
        private static readonly string PageReferenceFieldName = "PageId";
        private static readonly string CompositionDescriptionFieldName = "FieldName";


        /// <exclude />
        public GeneratedTypesHelper()
        {
        }



        /// <exclude />
        public GeneratedTypesHelper(Type oldType)
        {
            Verify.ArgumentNotNull(oldType, "oldType");

            _oldType = oldType;
            _oldDataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(oldType);

            Initialize();
        }



        /// <exclude />
        public GeneratedTypesHelper(DataTypeDescriptor oldDataTypeDescriptor)
        {
            Verify.ArgumentNotNull(oldDataTypeDescriptor, "oldDataTypeDescriptor");

            _oldType = oldDataTypeDescriptor.GetInterfaceType();
            _oldDataTypeDescriptor = oldDataTypeDescriptor;

            Initialize();
        }



        /// <exclude />
        public bool AllowForiegnKeyEditing
        {
            get;
            set;
        }



        /// <exclude />
        [Obsolete("Use EditableOwnDataFieldDesciptors which does not return inherited fields", true)]
        public IEnumerable<DataFieldDescriptor> EditableDataFieldDescriptors
        {
            get
            {
                Verify.IsNotNull(_oldDataTypeDescriptor, "No old data type specified");

                var fields = _oldDataTypeDescriptor.Fields;

                return fields.Where(field => IsDataFieldBindable(_oldDataTypeDescriptor, field));
            }
        }

        /// <exclude />
        public IEnumerable<DataFieldDescriptor> EditableOwnDataFields
        {
            get
            {
                Verify.IsNotNull(_oldDataTypeDescriptor, "No old data type specified");

                var fields = _oldDataTypeDescriptor.Fields;

                return fields.Where(field => IsDataFieldBindable(_oldDataTypeDescriptor, field) && !field.Inherited);
            }
        }


        /// <exclude />
        public IEnumerable<string> NotEditableDataFieldDescriptorNames
        {
            get
            {
                Verify.IsNotNull(_oldDataTypeDescriptor, "No old data type specified");

                return from field in _oldDataTypeDescriptor.Fields
                       where !IsDataFieldBindable(_oldDataTypeDescriptor, field)
                       select field.Name;
            }
        }



        /// <exclude />
        public bool IsCachable
        {
            get
            {
                Verify.IsNotNull(_oldDataTypeDescriptor, "No old data type specified");

                return _oldDataTypeDescriptor.Cachable;
            }
        }



        /// <exclude />
        public bool IsPublishControlled
        {
            get
            {
                Verify.IsNotNull(_oldDataTypeDescriptor, "No old data type specified");

                return _oldDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled));
            }
        }



        /// <exclude />
        public bool IsLocalizedControlled
        {
            get
            {
                Verify.IsNotNull(_oldDataTypeDescriptor, "No old data type specified");

                return _oldDataTypeDescriptor.SuperInterfaces.Contains(typeof(ILocalizedControlled));
            }
        }



        /// <exclude />
        public bool IsEditProcessControlledAllowed
        {
            get
            {
                return _pageMetaDataDescriptionForeignKeyDataFieldDescriptor == null;
            }
        }



        /// <exclude />
        public bool ValidateNewTypeName(string typeName, out string message)
        {
            Verify.ArgumentNotNullOrEmpty(typeName, "typeName");

            return NameValidation.TryValidateName(typeName, out message);
        }



        /// <exclude />
        public bool ValidateNewTypeNamespace(string typeNamespace, out string message)
        {
            Verify.ArgumentNotNullOrEmpty(typeNamespace, "typeNamespace");

            return NameValidation.TryValidateNamespace(typeNamespace, out message);
        }



        /// <exclude />
        public bool ValidateNewTypeFullName(string typeName, string typeNamespace, out string message)
        {
            Verify.ArgumentNotNullOrEmpty(typeName, "typeName");
            Verify.ArgumentNotNullOrEmpty(typeNamespace, "typeNamespace");

            message = null;

            if (typeNamespace.Split('.').Contains(typeName))
            {
                message = Texts.TypeNameInNamespace(typeName, typeNamespace);
                return false;
            }



            if (_oldDataTypeDescriptor != null)
            {
                if (_oldDataTypeDescriptor.Name == typeName &&
                    _oldDataTypeDescriptor.Namespace == typeNamespace)
                {
                    return true;
                }

                Type interfaceType = _oldDataTypeDescriptor.GetInterfaceType();

                if (interfaceType.GetRefereeTypes().Count > 0)
                {
                    message = Texts.TypesAreReferencing;
                    return false;
                }
            }

            string typeFullname = StringExtensionMethods.CreateNamespace(typeNamespace, typeName, '.');
            foreach (DataTypeDescriptor dtd in DataMetaDataFacade.GeneratedTypeDataTypeDescriptors)
            {
                string fullname = StringExtensionMethods.CreateNamespace(dtd.Namespace, dtd.Name, '.');

                if (typeFullname == fullname)
                {
                    message = Texts.TypesNameClash;
                    return false;
                }
            }


            string[] partNames = typeFullname.Split('.');
            StringBuilder sb = new StringBuilder(partNames[0]);
            for (int i = 1; i < partNames.Length; i++)
            {
                bool exists = TypeManager.HasTypeWithName(sb.ToString());
                if (exists)
                {
                    message = Texts.NameSpaceIsTypeTypeName(sb.ToString());
                    return false;
                }

                sb.Append(".");
                sb.Append(partNames[i]);
            }

            return true;
        }



        /// <exclude />
        public bool ValidateByCompile(out string errorMessage)
        {
            var dataTypeDescriptor = _oldDataTypeDescriptor == null ? CreateNewDataTypeDescriptor() : CreateUpdatedDataTypeDescriptor();

            string classFullName = (dataTypeDescriptor.Namespace + "." + dataTypeDescriptor.Name).Replace(" ", string.Empty);
            string classFullNameWithDot = classFullName + ".";
            foreach (var reservedNamespace in ReservedNamespaces)
            {
                if (classFullNameWithDot.StartsWith(reservedNamespace + ".", StringComparison.InvariantCultureIgnoreCase))
                {
                    errorMessage = Texts.NamespaceIsReserved;
                    return false;
                }
            }

            foreach (string namePart in classFullName.Split(new[] { '.' }, StringSplitOptions.RemoveEmptyEntries))
            {
                if (!IsCSharpValidIdentifier(namePart))
                {
                    errorMessage = Texts.TypeNameIsInvalidIdentifier(classFullName);
                    return false;
                }
            }

            foreach (DataFieldDescriptor dataField in dataTypeDescriptor.Fields)
            {
                if (!IsCSharpValidIdentifier(dataField.Name))
                {
                    errorMessage = Texts.FieldNameCannotBeUsed(dataField.Name);
                    return false;
                }
            }

            // Checking for name collisions with Composite.dll
            if (classFullName.StartsWith(CompositeNamespace + ".", StringComparison.InvariantCultureIgnoreCase))
            {
                foreach (var type in typeof(IData).Assembly.GetTypes())
                {
                    string typeNameWithDot = type.FullName + ".";

                    if (classFullNameWithDot.StartsWith(typeNameWithDot, StringComparison.InvariantCultureIgnoreCase)
                       || typeNameWithDot.StartsWith(classFullNameWithDot, StringComparison.InvariantCultureIgnoreCase))
                    {
                        errorMessage = Texts.CompileErrorWhileAddingType;
                        return false;
                    }
                }
            }


            CompatibilityCheckResult compatibilityCheckResult = CodeCompatibilityChecker.CheckCompatibilityWithAppCodeFolder(dataTypeDescriptor);

            if (!compatibilityCheckResult.Successful)
            {
                errorMessage = _oldDataTypeDescriptor == null ? Texts.CompileErrorWhileAddingType : Texts.CompileErrorWhileChangingType;

                errorMessage += compatibilityCheckResult.ErrorMessage;
                return false;
            }

            errorMessage = string.Empty;
            return true;
        }



        /// <exclude />
        public bool ValidateNewFieldDescriptors(IEnumerable<DataFieldDescriptor> newDataFieldDescriptors, out string message)
        {
            Verify.ArgumentNotNull(newDataFieldDescriptors, "newDataFieldDescriptors");

            message = null;

            if (!newDataFieldDescriptors.Any())
            {
                message = GetString("MissingFields");
                return false;
            }

            int count =
                (from dfd in newDataFieldDescriptors
                 where dfd.Name == IdFieldName
                 select dfd).Count();

            if (count != 0)
            {
                message = GetString("FieldNameCannotBeUsed").FormatWith(IdFieldName);
                return false;
            }

            return true;
        }



        private static string GetString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.GeneratedTypes", key);
        }



        /// <exclude />
        public static string GetCompositionDescriptionPropertyName(Type compositionType)
        {
            return CompositionDescriptionFieldName;
        }



        /// <exclude />
        public static PropertyInfo GetCompositionDescriptionPropertyInfo(Type compositionType)
        {
            return compositionType.GetPropertiesRecursively().Single(f => f.Name == CompositionDescriptionFieldName);
        }



        /// <exclude />
        public static PropertyInfo GetPageReferencePropertyInfo(Type compositionType)
        {
            return compositionType.GetPropertiesRecursively().Single(f => f.Name == PageReferenceFieldName);
        }



        /// <exclude />
        public void SetNewTypeFullName(string typeName, string typeNamespace)
        {
            if (string.IsNullOrEmpty(typeName)) throw new ArgumentNullException("typeName");
            if (string.IsNullOrEmpty(typeNamespace)) throw new ArgumentNullException("typeNamespace");

            _newTypeName = typeName;
            _newTypeNamespace = typeNamespace;
        }



        /// <exclude />
        public void SetNewTypeTitle(string typeTitle)
        {
            if (string.IsNullOrEmpty(typeTitle)) throw new ArgumentNullException("typeTitle");

            _newTypeTitle = typeTitle;
        }



        /// <exclude />
        public void SetCachable(bool cachable)
        {
            _cachable = cachable;
        }



        /// <exclude />
        public void SetPublishControlled(bool isPublishControlled)
        {
            if (this.IsEditProcessControlledAllowed == false) throw new InvalidOperationException("Not allowed to change this value");

            _publishControlled = isPublishControlled;
        }



        /// <exclude />
        public void SetLocalizedControlled(bool isLocalizedControlled)
        {
            if (this.IsEditProcessControlledAllowed == false) throw new InvalidOperationException("Not allowed to change this value");

            _localizedControlled = isLocalizedControlled;
        }



        /// <exclude />
        public void SetNewFieldDescriptors(IEnumerable<DataFieldDescriptor> newDataFieldDescriptors, string labelFieldName)
        {
            if (newDataFieldDescriptors == null) throw new ArgumentNullException("newDataFieldDescriptors");

            _newDataFieldDescriptors = newDataFieldDescriptors;
            _newLabelFieldName = labelFieldName;

            if (_newLabelFieldName == "")
            {
                _newLabelFieldName = null;
            }
        }



        /// <exclude />
        public void SetForeignKeyReference(Type targetDataType, DataAssociationType dataAssociationType)
        {
            if (dataAssociationType == DataAssociationType.None) throw new ArgumentException("dataAssociationType");

            DataTypeDescriptor targetDataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(targetDataType);

            SetForeignKeyReference(targetDataTypeDescriptor, dataAssociationType);
        }



        /// <exclude />
        public void SetForeignKeyReference(DataTypeDescriptor targetDataTypeDescriptor, DataAssociationType dataAssociationType)
        {
            if (dataAssociationType == DataAssociationType.None) throw new ArgumentException("dataAssociationType");
            if (dataAssociationType == DataAssociationType.Aggregation && _pageMetaDataDescriptionForeignKeyDataFieldDescriptor != null) throw new InvalidOperationException("The type already have a foreign key reference");
            if (dataAssociationType == DataAssociationType.Composition && _pageMetaDataDescriptionForeignKeyDataFieldDescriptor != null) throw new InvalidOperationException("The type already have a foreign key reference");


            Type targetType = TypeManager.GetType(targetDataTypeDescriptor.TypeManagerTypeName);
            string fieldName = null;
            if (targetType == typeof(IPage))
            {
                fieldName = PageReferenceFieldName;
                _dataAssociationType = dataAssociationType;
            }

            string foreignKeyFieldName;
            _foreignKeyDataFieldDescriptor = CreateReferenceDataFieldDescriptor(targetDataTypeDescriptor, out foreignKeyFieldName, fieldName);

            if (dataAssociationType != DataAssociationType.None)
            {
                _dataTypeAssociationDescriptor = new DataTypeAssociationDescriptor(
                        targetType,
                        foreignKeyFieldName,
                        dataAssociationType
                    );
            }

            if (dataAssociationType == DataAssociationType.Composition)
            {
                DataTypeDescriptor compositionRuleDataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeof(IPageMetaDataDefinition));

                _pageMetaDataDescriptionForeignKeyDataFieldDescriptor = CreateWeakReferenceDataFieldDescriptor(compositionRuleDataTypeDescriptor, compositionRuleDataTypeDescriptor.Fields["Name"], CompositionDescriptionFieldName);
            }
        }



        /// <exclude />
        public bool TryValidateUpdate(bool originalTypeDataExists, out string errorMessage)
        {
            if (_oldDataTypeDescriptor != null)
            {

                if (_newLabelFieldName == null)
                {
                    _newLabelFieldName = IdFieldName;
                }

                if (_newTypeTitle == null)
                {
                    _newTypeTitle = _newTypeName;
                }

                if (!UpdateOldType(true, originalTypeDataExists, out errorMessage))
                {
                    return false;
                }
            }

            return ValidateByCompile(out errorMessage);
        }



        /// <exclude />
        public void CreateType(bool originalTypeHasData)
        {
            if (_typeCreated) throw new InvalidOperationException("The type can only be created once");

            try
            {
                if (_newLabelFieldName == null)
                {
                    _newLabelFieldName = IdFieldName;
                }

                if (_newTypeTitle == null)
                {
                    _newTypeTitle = _newTypeName;
                }

                if (_oldDataTypeDescriptor == null)
                {
                    Verify.IsNotNull(_newTypeName, "Type name not set");
                    Verify.IsNotNull(_newTypeNamespace, "Type namespace not set");
                    Verify.IsNotNull(_newDataFieldDescriptors, "Type field descritpros not set");

                    CreateNewType();
                }
                else
                {
                    string errorMessage;


                    UpdateOldType(false, originalTypeHasData, out errorMessage);
                }
            }
            finally
            {
                _typeCreated = true;
            }
        }



        /// <exclude />
        public Type InterfaceType
        {
            get
            {
                if (_typeCreated == false) throw new InvalidOperationException("The type has to be created first");

                return _newDataTypeDescriptor.GetInterfaceType();
            }
        }


        /// <exclude />
        public static void SetNewIdFieldValue(IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            var keyProperties = data.GetType().GetKeyProperties();

            foreach (var keyProperty in keyProperties)
            {
                bool hasDefaultFieldValueAttribute = keyProperty.GetCustomAttributesRecursively<DefaultFieldValueAttribute>().Any();
                bool hasNewInstanceDefaultFieldValueAtteibute = keyProperty.GetCustomAttributesRecursively<NewInstanceDefaultFieldValueAttribute>().Any();

                if (!hasDefaultFieldValueAttribute && !hasNewInstanceDefaultFieldValueAtteibute)
                {
                    if (keyProperty.PropertyType == typeof(Guid))
                    {
                        // Assigning a guid key a value because its not part of the genereted UI
                        keyProperty.SetValue(data, Guid.NewGuid(), null);
                    }
                    else
                    {
                        // For now, do nothing. This would fix auto increament issue for int key properties
                        // throw new InvalidOperationException(string.Format("The property '{0}' on the data interface '{1}' does not a DefaultFieldValueAttribute or NewInstanceDefaultFieldValueAttribute and no default value could be created", propertyInfo.Name, data.GetType());
                    }
                }
            }
        }



        private void Initialize()
        {
            if (_oldDataTypeDescriptor.DataAssociations.Count > 0)
            {
                DataTypeAssociationDescriptor dataTypeAssociationDescriptor = _oldDataTypeDescriptor.DataAssociations.Single();

                _associatedType = dataTypeAssociationDescriptor.AssociatedInterfaceType;
            }


            foreach (DataFieldDescriptor dataFieldDescriptor in _oldDataTypeDescriptor.Fields)
            {
                if (dataFieldDescriptor.ForeignKeyReferenceTypeName != null)
                {
                    if (_associatedType != null)
                    {
                        string associatedTypeTypeName = TypeManager.SerializeType(_associatedType);

                        if (dataFieldDescriptor.ForeignKeyReferenceTypeName == associatedTypeTypeName)
                        {
                            _foreignKeyDataFieldDescriptor = dataFieldDescriptor;
                        }
                    }
                }


                if (dataFieldDescriptor.Name == CompositionDescriptionFieldName)
                {
                    _pageMetaDataDescriptionForeignKeyDataFieldDescriptor = dataFieldDescriptor;
                }
            }

            _publishControlled = this.IsPublishControlled;
            _localizedControlled = this.IsLocalizedControlled;
        }



        private void CreateNewType()
        {
            _newDataTypeDescriptor = CreateNewDataTypeDescriptor();

            GeneratedTypesFacade.GenerateNewType(_newDataTypeDescriptor);
        }

        private bool IsCSharpValidIdentifier(string name)
        {
            return new CSharpCodeProvider().IsValidIdentifier(name);
        }


        private bool UpdateOldType(bool validateOnly, bool originalTypeDataExists, out string errorMessage)
        {
            errorMessage = "";
            _newDataTypeDescriptor = CreateUpdatedDataTypeDescriptor();

            try
            {
                new DataTypeChangeDescriptor(_oldDataTypeDescriptor, _newDataTypeDescriptor, originalTypeDataExists);
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                return false;
            }

            if (validateOnly)
            {
                return true;
            }

            GeneratedTypesFacade.UpdateType(new UpdateDataTypeDescriptor(_oldDataTypeDescriptor, _newDataTypeDescriptor, originalTypeDataExists));

            return true;   
        }



        private DataTypeDescriptor CreateNewDataTypeDescriptor()
        {
            return CreateNewDataTypeDescriptor(
                _newTypeNamespace,
                _newTypeName,
                _newTypeTitle,
                _newLabelFieldName,
                _cachable,
                _publishControlled,
                _localizedControlled,
                _newDataFieldDescriptors,
                _foreignKeyDataFieldDescriptor,
                _dataTypeAssociationDescriptor,
                _pageMetaDataDescriptionForeignKeyDataFieldDescriptor);
        }



        private DataTypeDescriptor CreateNewDataTypeDescriptor(
            string typeNamespace,
            string typeName,
            string typeTitle,
            string labelFieldName,
            bool cachable,
            bool publishControlled,
            bool localizedControlled,
            IEnumerable<DataFieldDescriptor> dataFieldDescriptors,
            DataFieldDescriptor foreignKeyDataFieldDescriptor,
            DataTypeAssociationDescriptor dataTypeAssociationDescriptor,
            DataFieldDescriptor compositionRuleForeignKeyDataFieldDescriptor)
        {
            Guid id = Guid.NewGuid();
            DataTypeDescriptor dataTypeDescriptor = new DataTypeDescriptor(id, typeNamespace, typeName, true);
            dataTypeDescriptor.Cachable = cachable;
            dataTypeDescriptor.Title = typeTitle;

            dataTypeDescriptor.DataScopes.Add(DataScopeIdentifier.Public);

            if ((publishControlled) && (_dataAssociationType != DataAssociationType.Composition))
            {
                dataTypeDescriptor.AddSuperInterface(typeof(IPublishControlled));
            }

            if (localizedControlled)
            {
                dataTypeDescriptor.AddSuperInterface(typeof(ILocalizedControlled));
            }

            if (_dataAssociationType == DataAssociationType.Aggregation)
            {
                dataTypeDescriptor.AddSuperInterface(typeof(IPageData));
                dataTypeDescriptor.AddSuperInterface(typeof(IPageFolderData));
            }
            else if (_dataAssociationType == DataAssociationType.Composition)
            {
                dataTypeDescriptor.AddSuperInterface(typeof(IPageData));
                dataTypeDescriptor.AddSuperInterface(typeof(IPageMetaData));
            }
            else
            {
                DataFieldDescriptor idDataFieldDescriptor = new DataFieldDescriptor(Guid.NewGuid(), IdFieldName, StoreFieldType.Guid, typeof(Guid));
                idDataFieldDescriptor.Position = -1;
                dataTypeDescriptor.Fields.Add(idDataFieldDescriptor);
                dataTypeDescriptor.KeyPropertyNames.Add(IdFieldName);
            }

            dataTypeDescriptor.LabelFieldName = labelFieldName;

            foreach (DataFieldDescriptor dataFieldDescriptor in dataFieldDescriptors)
            {
                dataTypeDescriptor.Fields.Add(dataFieldDescriptor);
            }

            int position = 100;
            if (_foreignKeyDataFieldDescriptor != null)
            {
                _foreignKeyDataFieldDescriptor.Position = position++;

                if (foreignKeyDataFieldDescriptor.Name != PageReferenceFieldName)
                {
                    dataTypeDescriptor.Fields.Add(foreignKeyDataFieldDescriptor);
                    dataTypeDescriptor.DataAssociations.Add(dataTypeAssociationDescriptor);
                }
            }


            return dataTypeDescriptor;
        }



        private DataTypeDescriptor CreateUpdatedDataTypeDescriptor()
        {
            DataTypeDescriptor dataTypeDescriptor = new DataTypeDescriptor(_oldDataTypeDescriptor.DataTypeId, _newTypeNamespace, _newTypeName, true);

            dataTypeDescriptor.DataScopes.Add(DataScopeIdentifier.Public);

            dataTypeDescriptor.Cachable = _cachable;


            Type[] indirectlyInheritedInterfaces = new[] { typeof(IPublishControlled), typeof(ILocalizedControlled), typeof(IPageData), typeof(IPageFolderData), typeof(IPageMetaData) };

            // Foreign interfaces should stay inherited
            foreach (var superInterface in _oldDataTypeDescriptor.SuperInterfaces)
            {
                if (!indirectlyInheritedInterfaces.Contains(superInterface))
                {
                    dataTypeDescriptor.AddSuperInterface(superInterface);
                }
            }


            if ((_publishControlled) && (_dataAssociationType != DataAssociationType.Composition))
            {
                dataTypeDescriptor.AddSuperInterface(typeof(IPublishControlled));
            }

            if ((_localizedControlled) && (_dataAssociationType != DataAssociationType.Composition))
            {
                dataTypeDescriptor.AddSuperInterface(typeof(ILocalizedControlled));
            }


            if (_oldDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPageFolderData)))
            {
                dataTypeDescriptor.AddSuperInterface(typeof(IPageData));
                dataTypeDescriptor.AddSuperInterface(typeof(IPageFolderData));
            }
            else if (_oldDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPageMetaData)))
            {
                dataTypeDescriptor.AddSuperInterface(typeof(IPageData));
                dataTypeDescriptor.AddSuperInterface(typeof(IPageMetaData));
            }
            else
            {
                DataFieldDescriptor idDataFieldDescriptor =
                    (from dfd in _oldDataTypeDescriptor.Fields
                     where dfd.Name == IdFieldName
                     select dfd).Single();

                dataTypeDescriptor.Fields.Add(idDataFieldDescriptor);

                dataTypeDescriptor.KeyPropertyNames.Add(IdFieldName);
            }

            dataTypeDescriptor.Title = _newTypeTitle;



            if (_dataAssociationType == DataAssociationType.None && dataTypeDescriptor.KeyPropertyNames.Count == 0)
            {
                dataTypeDescriptor.KeyPropertyNames.Add(IdFieldName);
            }

            dataTypeDescriptor.LabelFieldName = _newLabelFieldName;

            foreach (DataFieldDescriptor dataFieldDescriptor in _newDataFieldDescriptors)
            {
                dataTypeDescriptor.Fields.Add(dataFieldDescriptor);
            }

            dataTypeDescriptor.DataAssociations.AddRange(_oldDataTypeDescriptor.DataAssociations);

            int position = 100;
            if (_foreignKeyDataFieldDescriptor != null)
            {
                _foreignKeyDataFieldDescriptor.Position = position++;

                if (_foreignKeyDataFieldDescriptor.Name != PageReferenceFieldName)
                {
                    dataTypeDescriptor.Fields.Add(_foreignKeyDataFieldDescriptor);
                }
            }

            return dataTypeDescriptor;
        }



        private DataFieldDescriptor CreateWeakReferenceDataFieldDescriptor(DataTypeDescriptor targetDataTypeDescriptor, DataFieldDescriptor targetDataFieldDescriptor, string fieldName)
        {
            TypeManager.GetType(targetDataTypeDescriptor.TypeManagerTypeName);

            DataFieldDescriptor dataFieldDescriptor = new DataFieldDescriptor(
                            Guid.NewGuid(),
                            fieldName,
                            targetDataFieldDescriptor.StoreType,
                            targetDataFieldDescriptor.InstanceType
                        );
            dataFieldDescriptor.IsNullable = targetDataFieldDescriptor.IsNullable;
            dataFieldDescriptor.DefaultValue = targetDataFieldDescriptor.DefaultValue;
            dataFieldDescriptor.ValidationFunctionMarkup = targetDataFieldDescriptor.ValidationFunctionMarkup;

            WidgetFunctionProvider widgetFunctionProvider = StandardWidgetFunctions.TextBoxWidget;

            DataFieldFormRenderingProfile dataFieldFormRenderingProfile = new DataFieldFormRenderingProfile
            {
                Label = dataFieldDescriptor.Name,
                HelpText = dataFieldDescriptor.Name,
                WidgetFunctionMarkup = widgetFunctionProvider.SerializedWidgetFunction.ToString(SaveOptions.DisableFormatting)
            };

            dataFieldDescriptor.FormRenderingProfile = dataFieldFormRenderingProfile;

            return dataFieldDescriptor;
        }



        private DataFieldDescriptor CreateReferenceDataFieldDescriptor(DataTypeDescriptor targetDataTypeDescriptor, out string foreignKeyFieldName, string fieldName = null)
        {
            Type targetType = TypeManager.GetType(targetDataTypeDescriptor.TypeManagerTypeName);
            string targetKeyFieldName = targetDataTypeDescriptor.KeyPropertyNames.First();

            DataFieldDescriptor targetKeyDataFieldDescriptor = targetDataTypeDescriptor.Fields[targetKeyFieldName];

            if (fieldName == null)
            {
                foreignKeyFieldName = string.Format("{0}{1}ForeignKey", targetDataTypeDescriptor.Name, targetKeyFieldName);
            }
            else
            {
                foreignKeyFieldName = fieldName;
            }

            DataFieldDescriptor dataFieldDescriptor = new DataFieldDescriptor(
                            Guid.NewGuid(),
                            foreignKeyFieldName,
                            targetKeyDataFieldDescriptor.StoreType,
                            targetKeyDataFieldDescriptor.InstanceType
                        );
            dataFieldDescriptor.IsNullable = targetKeyDataFieldDescriptor.IsNullable;
            dataFieldDescriptor.DefaultValue = targetKeyDataFieldDescriptor.DefaultValue;
            dataFieldDescriptor.ValidationFunctionMarkup = targetKeyDataFieldDescriptor.ValidationFunctionMarkup;
            dataFieldDescriptor.ForeignKeyReferenceTypeName = targetDataTypeDescriptor.TypeManagerTypeName;

            WidgetFunctionProvider widgetFunctionProvider = StandardWidgetFunctions.GetDataReferenceWidget(targetType);

            DataFieldFormRenderingProfile dataFieldFormRenderingProfile = new DataFieldFormRenderingProfile
            {
                Label = dataFieldDescriptor.Name,
                HelpText = dataFieldDescriptor.Name,
                WidgetFunctionMarkup = widgetFunctionProvider.SerializedWidgetFunction.ToString(SaveOptions.DisableFormatting)
            };

            dataFieldDescriptor.FormRenderingProfile = dataFieldFormRenderingProfile;

            return dataFieldDescriptor;
        }



        private bool IsDataFieldBindable(DataTypeDescriptor dataTypeDescriptor, DataFieldDescriptor dataFieldDescriptor)
        {
            if (dataFieldDescriptor.Inherited)
            {
                Type superInterface =  dataTypeDescriptor.SuperInterfaces.FirstOrDefault(type => type.GetProperty(dataFieldDescriptor.Name) != null);
                
                if(superInterface != null && superInterface.Assembly == typeof(IData).Assembly)
                {
                    return false;
                }
            }

            if (dataFieldDescriptor.Name == IdFieldName)
            {
                return false;
            }

            if (dataFieldDescriptor.Name == CompositionDescriptionFieldName && dataTypeDescriptor.IsPageMetaDataType)
            {
                return false;
            }

            if (PageFolderFacade.GetAllFolderTypes().Contains(this._oldType) && dataFieldDescriptor.Name == PageReferenceFieldName)
            {
                return false;
            }

            if (dataFieldDescriptor.ForeignKeyReferenceTypeName != null)
            {
                DataTypeAssociationDescriptor dataTypeAssociationDescriptor = dataTypeDescriptor.DataAssociations.FirstOrDefault();

                if (dataTypeAssociationDescriptor != null)
                {
                    if (!this.AllowForiegnKeyEditing)
                    {
                        if (dataFieldDescriptor.Name == dataTypeAssociationDescriptor.ForeignKeyPropertyName)
                        {
                            return false;
                        }
                    }

                    if (dataFieldDescriptor.Name == CompositionDescriptionFieldName && dataTypeDescriptor.IsPageMetaDataType)
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
