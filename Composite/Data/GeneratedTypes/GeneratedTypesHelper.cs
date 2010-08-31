using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Transactions;
using System.Xml.Linq;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes.Foundation;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Core.Extensions;
using Composite.Functions;
using Composite.Core.ResourceSystem;
using Composite.Data.Transactions;
using Composite.Core.Types;
using Microsoft.CSharp;


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
        private DataTypeDescriptor _oldDataTypeDescriptor;
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


        public GeneratedTypesHelper()
        {
        }



        public GeneratedTypesHelper(Type oldType)
        {
            if (oldType == null) throw new ArgumentNullException("oldType");

            _oldType = oldType;
            _oldDataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(oldType);

            Initialize();
        }



        public GeneratedTypesHelper(DataTypeDescriptor oldDataTypeDescriptor)
        {
            if (oldDataTypeDescriptor == null) throw new ArgumentNullException("oldDataTypeDescriptor");

            _oldType = oldDataTypeDescriptor.GetInterfaceType();
            _oldDataTypeDescriptor = oldDataTypeDescriptor;

            Initialize();
        }



        public bool AllowForiegnKeyEditing
        {
            get;
            set;
        }



        public IEnumerable<DataFieldDescriptor> EditableDataFieldDescriptors
        {
            get
            {
                if (_oldDataTypeDescriptor == null) throw new InvalidOperationException("No old data type specified");

                foreach (DataFieldDescriptor dataFieldDescriptor in _oldDataTypeDescriptor.Fields)
                {
                    if (IsDataFieldEditable(_oldDataTypeDescriptor, dataFieldDescriptor) == true)
                    {
                        yield return dataFieldDescriptor;
                    }
                }
            }
        }



        public IEnumerable<string> NotEditableDataFieldDescriptorNames
        {
            get
            {
                if (_oldDataTypeDescriptor == null) throw new InvalidOperationException("No old data type specified");

                foreach (DataFieldDescriptor dataFieldDescriptor in _oldDataTypeDescriptor.Fields)
                {
                    if (IsDataFieldEditable(_oldDataTypeDescriptor, dataFieldDescriptor) == false)
                    {
                        yield return dataFieldDescriptor.Name;
                    }
                }
            }
        }



        public bool IsCachable
        {
            get
            {
                if (_oldDataTypeDescriptor == null) throw new InvalidOperationException("No old data type specified");

                return _oldDataTypeDescriptor.Cachable;
            }
        }



        public bool IsPublishControlled
        {
            get
            {
                if (_oldDataTypeDescriptor == null) throw new InvalidOperationException("No old data type specified");

                return _oldDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled));
            }
        }



        public bool IsLocalizedControlled
        {
            get
            {
                if (_oldDataTypeDescriptor == null) throw new InvalidOperationException("No old data type specified");

                return _oldDataTypeDescriptor.SuperInterfaces.Contains(typeof(ILocalizedControlled));
            }
        }



        public bool IsEditProcessControlledAllowed
        {
            get
            {
                return _pageMetaDataDescriptionForeignKeyDataFieldDescriptor == null;
            }
        }



        public bool ValidateNewTypeName(string typeName, out string message)
        {
            if (string.IsNullOrEmpty(typeName) == true) throw new ArgumentNullException("typeName");

            return NameValidation.TryValidateName(typeName, out message);
        }



        public bool ValidateNewTypeNamespace(string typeNamespace, out string message)
        {
            if (string.IsNullOrEmpty(typeNamespace) == true) throw new ArgumentNullException("typeNamespace");

            return NameValidation.TryValidateNamespace(typeNamespace, out message);
        }



        public bool ValidateNewTypeFullName(string typeName, string typeNamespace, out string message)
        {
            if (string.IsNullOrEmpty(typeName) == true) throw new ArgumentNullException("typeName");
            if (string.IsNullOrEmpty(typeNamespace) == true) throw new ArgumentNullException("typeNamespace");

            message = null;

            if (typeNamespace.Split('.').Contains(typeName) == true)
            {
                message = string.Format(StringResourceSystemFacade.GetString("Composite.GeneratedTypes", "TypeNameInNamespace"), typeName, typeNamespace);
                return false;
            }



            if (_oldDataTypeDescriptor != null)
            {
                if ((_oldDataTypeDescriptor.Name == typeName) &&
                    (_oldDataTypeDescriptor.Namespace == typeNamespace))
                {
                    return true;
                }
                else
                {
                    Type interfaceType = _oldDataTypeDescriptor.GetInterfaceType();

                    if (interfaceType.GetRefereeTypes().Count > 0)
                    {
                        message = StringResourceSystemFacade.GetString("Composite.GeneratedTypes", "TypesAreReferencing");
                        return false;
                    }
                }
            }

            string typeFullname = StringExtensionMethods.CreateNamespace(typeNamespace, typeName, '.');
            foreach (DataTypeDescriptor dtd in DataMetaDataFacade.GeneratedTypeDataTypeDescriptors)
            {
                string fullname = StringExtensionMethods.CreateNamespace(dtd.Namespace, dtd.Name, '.');

                if (typeFullname == fullname)
                {
                    message = StringResourceSystemFacade.GetString("Composite.GeneratedTypes", "TypesNameClash");
                    return false;
                }
            }


            string[] partNames = typeFullname.Split('.');
            StringBuilder sb = new StringBuilder(partNames[0]);
            for (int i = 1; i < partNames.Length; i++)
            {
                bool exists = TypeManager.HasTypeWithName(sb.ToString());
                if (exists == true)
                {
                    message = string.Format(StringResourceSystemFacade.GetString("Composite.GeneratedTypes", "NameSpaceIsTypeTypeName"), sb.ToString());
                    return false;
                }

                sb.Append(".");
                sb.Append(partNames[i]);
            }

            return true;
        }



        public bool ValidateByCompile(out string errorMessage)
        {
            var dataTypeDescriptor = _oldDataTypeDescriptor == null ? CreateNewDataTypeDescriptor() : CreateUpdatedDataTypeDescriptor();

            string classFullName = (dataTypeDescriptor.Namespace + "." + dataTypeDescriptor.Name).Replace(" ", string.Empty);
            string classFullNameWithDot = classFullName + ".";
            foreach (var reservedNamespace in ReservedNamespaces)
            {
                if (classFullNameWithDot.StartsWith(reservedNamespace + ".", StringComparison.InvariantCultureIgnoreCase))
                {
                    errorMessage = StringResourceSystemFacade.GetString("Composite.GeneratedTypes", "NamespaceIsReserved");
                    return false;
                }
            }

            foreach (string namePart in classFullName.Split(new[] { '.' }, StringSplitOptions.RemoveEmptyEntries))
            {
                if (!IsCSharpValidIdentifier(namePart))
                {
                    errorMessage = StringResourceSystemFacade.GetString("Composite.GeneratedTypes", "TypeNameIsInvalidIdentifier")
                                   .FormatWith(classFullName);
                    return false;
                }
            }

            foreach (DataFieldDescriptor dataField in dataTypeDescriptor.Fields)
            {
                if (!IsCSharpValidIdentifier(dataField.Name))
                {
                    errorMessage = StringResourceSystemFacade.GetString("Composite.GeneratedTypes", "FieldNameCannotBeUsed")
                                   .FormatWith(dataField.Name);
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
                        errorMessage = StringResourceSystemFacade.GetString("Composite.GeneratedTypes", "CompileErrorWhileAddingType");
                        return false;
                    }
                }
            }


            CompatibilityCheckResult compatibilityCheckResult = InterfaceCodeGenerator.CheckCompatibilityWithAppCodeFolder(dataTypeDescriptor);

            if (!compatibilityCheckResult.Successful)
            {
                string messageKey = _oldDataTypeDescriptor == null ? "CompileErrorWhileAddingType" : "CompileErrorWhileChangingType";

                errorMessage = StringResourceSystemFacade.GetString("Composite.GeneratedTypes", messageKey);

                errorMessage += compatibilityCheckResult.ErrorMessage;
                return false;
            }

            errorMessage = string.Empty;
            return true;
        }



        public bool ValidateNewFieldDescriptors(IEnumerable<DataFieldDescriptor> newDataFieldDescriptors, out string message)
        {
            Verify.ArgumentNotNull(newDataFieldDescriptors, "newDataFieldDescriptors");

            message = null;

            if (newDataFieldDescriptors.Count() == 0)
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

            foreach (var fieldDescriptor in newDataFieldDescriptors)
            {
                if (fieldDescriptor.FormRenderingProfile == null ||
                   fieldDescriptor.FormRenderingProfile.WidgetFunctionMarkup.IsNullOrEmpty())
                {
                    message = GetString("FieldDoesNotHaveWidget").FormatWith(fieldDescriptor.Name);
                    return false;
                }
            }

            return true;
        }

        private static string GetString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.GeneratedTypes", key);
        }



        public static string GetCompositionDescriptionPropertyName(Type compositionType)
        {
            return CompositionDescriptionFieldName;
        }



        public static PropertyInfo GetCompositionDescriptionPropertyInfo(Type compositionType)
        {
            return compositionType.GetPropertiesRecursively().Where(f => f.Name == CompositionDescriptionFieldName).Single();
        }



        public static PropertyInfo GetPageReferencePropertyInfo(Type compositionType)
        {
            return compositionType.GetPropertiesRecursively().Where(f => f.Name == PageReferenceFieldName).Single();
        }



        public void SetNewTypeFullName(string typeName, string typeNamespace)
        {
            if (string.IsNullOrEmpty(typeName) == true) throw new ArgumentNullException("typeName");
            if (string.IsNullOrEmpty(typeNamespace) == true) throw new ArgumentNullException("typeNamespace");

            _newTypeName = typeName;
            _newTypeNamespace = typeNamespace;
        }



        public void SetNewTypeTitle(string typeTitle)
        {
            if (string.IsNullOrEmpty(typeTitle) == true) throw new ArgumentNullException("typeTitle");

            _newTypeTitle = typeTitle;
        }



        public void SetCachable(bool cachable)
        {
            if (this.IsEditProcessControlledAllowed == false) throw new InvalidOperationException("Not allowed to change this value");

            _cachable = cachable;
        }



        public void SetPublishControlled(bool isPublishControlled)
        {
            if (this.IsEditProcessControlledAllowed == false) throw new InvalidOperationException("Not allowed to change this value");

            _publishControlled = isPublishControlled;
        }


        public void SetLocalizedControlled(bool isLocalizedControlled)
        {
            if (this.IsEditProcessControlledAllowed == false) throw new InvalidOperationException("Not allowed to change this value");

            _localizedControlled = isLocalizedControlled;
        }



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



        public void SetForeignKeyReference(Type targetDataType, DataAssociationType dataAssociationType)
        {
            if (dataAssociationType == DataAssociationType.None) throw new ArgumentException("dataAssociationType");

            DataTypeDescriptor targetDataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(targetDataType);

            SetForeignKeyReference(targetDataTypeDescriptor, dataAssociationType);
        }



        public void SetForeignKeyReference(DataTypeDescriptor targetDataTypeDescriptor, DataAssociationType dataAssociationType)
        {
            if (dataAssociationType == DataAssociationType.None) throw new ArgumentException("dataAssociationType");
            else if ((dataAssociationType == DataAssociationType.Aggregation) && (_pageMetaDataDescriptionForeignKeyDataFieldDescriptor != null)) throw new InvalidOperationException("The type already have an foreign key reference");
            else if ((dataAssociationType == DataAssociationType.Composition) && (_pageMetaDataDescriptionForeignKeyDataFieldDescriptor != null)) throw new InvalidOperationException("The type already have an foreign key reference");


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

                _pageMetaDataDescriptionForeignKeyDataFieldDescriptor = CreateWeekReferenceDataFieldDescriptor(compositionRuleDataTypeDescriptor, compositionRuleDataTypeDescriptor.Fields["Name"], CompositionDescriptionFieldName);
            }
        }



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



        public void CreateType(bool originalTypeHasData)
        {
            if (_typeCreated == true) throw new InvalidOperationException("The type can only be created once");

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
                    if (_newTypeName == null) throw new InvalidOperationException("Type name not set");
                    if (_newTypeNamespace == null) throw new InvalidOperationException("Type namespace not set");
                    if (_newDataFieldDescriptors == null) throw new InvalidOperationException("Type field descritpros not set");

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



        public Type InterfaceType
        {
            get
            {
                if (_typeCreated == false) throw new InvalidOperationException("The type has to be created first");

                return _newDataTypeDescriptor.GetInterfaceType();
            }
        }



        [Obsolete]
        public PropertyInfo GetAssociationForiegnKeyPropertyInfo()
        {
            if (_oldDataTypeDescriptor == null) throw new InvalidOperationException("No old data type specified");

            DataTypeAssociationDescriptor dataTypeAssociationDescriptor = _oldDataTypeDescriptor.DataAssociations.FirstOrDefault();

            if (dataTypeAssociationDescriptor == null) throw new InvalidOperationException("The type has no associations");

            return _oldType.GetProperty(dataTypeAssociationDescriptor.ForeignKeyPropertyName);
        }



        [Obsolete]
        public PropertyInfo GetCompositionDescriptionForiegnKeyPropertyInfo()
        {
            if (_oldDataTypeDescriptor == null) throw new InvalidOperationException("No old data type specified");

            string compositionRuleTypeName = TypeManager.SerializeType(typeof(ICompositionDescription));

            DataFieldDescriptor dataFieldDescriptor =
                (from dfd in _oldDataTypeDescriptor.Fields
                 where dfd.Name == CompositionDescriptionFieldName
                 select dfd).SingleOrDefault();

            if (dataFieldDescriptor == null) throw new InvalidOperationException("The type has no composition rule foreign keys");

            return _oldType.GetProperty(dataFieldDescriptor.Name);
        }



        [Obsolete]
        public PropertyInfo GetAggregationDescriptionForiegnKeyPropertyInfo()
        {
            if (_oldDataTypeDescriptor == null) throw new InvalidOperationException("No old data type specified");

            string aggregationDescriptionTypeName = TypeManager.SerializeType(typeof(IAggregationDescription));

            DataFieldDescriptor dataFieldDescriptor =
                (from dfd in _oldDataTypeDescriptor.Fields
                 where dfd.ForeignKeyReferenceTypeName == aggregationDescriptionTypeName
                 select dfd).SingleOrDefault();

            if (dataFieldDescriptor == null) throw new InvalidOperationException("The type has no composition rule foreign keys");

            return _oldType.GetProperty(dataFieldDescriptor.Name);
        }



        public static void SetNewIdFieldValue(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            PropertyInfo propertyInfo = data.GetType().GetProperty(IdFieldName);
            if (propertyInfo == null) throw new ArgumentException(string.Format("The type '{0}' does not have a property named '{1}'", data.GetType(), IdFieldName));

            MethodInfo methodInfo = propertyInfo.GetSetMethod();
            if (methodInfo == null) throw new ArgumentException(string.Format("The type '{0}' does not have a setter property named '{1}'", data.GetType(), IdFieldName));

            methodInfo.Invoke(data, new object[] { Guid.NewGuid() });
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

            DataTypeChangeDescriptor dataTypeChangeDescriptor;
            try
            {
                dataTypeChangeDescriptor = new DataTypeChangeDescriptor(_oldDataTypeDescriptor, _newDataTypeDescriptor, originalTypeDataExists);
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
                return false;
            }

            if (validateOnly == false)
            {
                // Unpublishable -> Publishble: Change type, copy data from public to admin WITHOUT: Eventing, Cascade and validation
                // Publishble -> Unpublishable: Copy data from admin to public WITHOUT: Eventing, Cascade and validation

                if ((_oldDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == false) &&
                    (_newDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == true))
                {
                    // Unpublishable -> Publishable

                    using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                    {
                        GeneratedTypesFacade.UpdateType(_oldDataTypeDescriptor, _newDataTypeDescriptor, originalTypeDataExists);
                        Type newInterfaceType = _newDataTypeDescriptor.GetInterfaceType();

                        IEnumerable<IData> datas;
                        using (DataScope dataScope = new DataScope(DataScopeIdentifier.Public))
                        {
                            datas = DataFacade.GetData(newInterfaceType).ToDataList();

                            foreach (IData data in datas)
                            {
                                IPublishControlled publishControlled = data as IPublishControlled;
                                publishControlled.PublicationStatus = GenericPublishProcessController.Published;
                            }

                            DataFacade.Update(datas, true, false, false);
                        }

                        using (DataScope dataScope = new DataScope(DataScopeIdentifier.Administrated))
                        {
                            foreach (IData data in datas)
                            {
                                IData newData = DataFacade.BuildNew(newInterfaceType);

                                data.ProjectedCopyTo(newData);

                                IPublishControlled publishControlled = newData as IPublishControlled;
                                publishControlled.PublicationStatus = GenericPublishProcessController.Published;

                                DataFacade.AddNew(newData, true, false, false);
                            }
                        }

                        transactionScope.Complete();
                    }
                }
                else if ((_oldDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == true) &&
                    (_newDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == false))
                {
                    // Publishable -> Unpublishable
                    using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                    {
                        IEnumerable<IData> datas;
                        using (DataScope dataScope = new DataScope(DataScopeIdentifier.Administrated))
                        {
                            datas = DataFacade.GetData(_oldType).ToDataList();
                        }

                        using (DataScope dataScope = new DataScope(DataScopeIdentifier.Public))
                        {
                            DataFacade.Delete(DataFacade.GetData(_oldType).ToDataEnumerable(), true, CascadeDeleteType.Disable);

                            foreach (IData data in datas)
                            {
                                IData newData = DataFacade.BuildNew(_oldType);

                                data.ProjectedCopyTo(newData);

                                IPublishControlled publishControlled = newData as IPublishControlled;
                                if (publishControlled != null)
                                {
                                    publishControlled.PublicationStatus = GenericPublishProcessController.Draft;
                                }

                                DataFacade.AddNew(newData, true, false, false);
                            }
                        }

                        transactionScope.Complete();
                    }

                    GeneratedTypesFacade.UpdateType(_oldDataTypeDescriptor, _newDataTypeDescriptor, originalTypeDataExists);
                }
                else
                {
                    GeneratedTypesFacade.UpdateType(_oldDataTypeDescriptor, _newDataTypeDescriptor, originalTypeDataExists);
                }
            }

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

            if (publishControlled == true)
            {
                dataTypeDescriptor.AddSuperInterface(typeof(IPublishControlled));
            }

            if (localizedControlled == true)
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

            if (_publishControlled == true)
            {
                dataTypeDescriptor.AddSuperInterface(typeof(IPublishControlled));
            }

            if (_localizedControlled == true)
            {
                dataTypeDescriptor.AddSuperInterface(typeof(ILocalizedControlled));
            }


            DataFieldDescriptor idDataFieldDescriptor =
                (from dfd in _oldDataTypeDescriptor.Fields
                 where dfd.Name == IdFieldName
                 select dfd).Single();

            dataTypeDescriptor.Title = _newTypeTitle;
            dataTypeDescriptor.Fields.Add(idDataFieldDescriptor);


            if (_dataAssociationType == DataAssociationType.None)
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



        private DataFieldDescriptor CreateWeekReferenceDataFieldDescriptor(DataTypeDescriptor targetDataTypeDescriptor, DataFieldDescriptor targetDataFieldDescriptor, string fieldName)
        {
            Type targetType = TypeManager.GetType(targetDataTypeDescriptor.TypeManagerTypeName);

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



        private DataFieldDescriptor CreateReferenceDataFieldDescriptor(DataTypeDescriptor targetDataTypeDescriptor, string fieldName = null)
        {
            string foreignKeyFieldName;

            return CreateReferenceDataFieldDescriptor(targetDataTypeDescriptor, out foreignKeyFieldName, fieldName);
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



        private bool IsDataFieldEditable(DataTypeDescriptor dataTypeDescriptor, DataFieldDescriptor dataFieldDescriptor)
        {
            if (dataFieldDescriptor.Inherited == true)
            {
                return false;
            }

            if (dataFieldDescriptor.Name == IdFieldName)
            {
                return false;
            }

            if ((dataFieldDescriptor.Name == CompositionDescriptionFieldName) && (dataTypeDescriptor.IsPageMetaDataType == true))
            {
                return false;
            }

            if ((PageFolderFacade.GetAllFolderTypes().Contains(this._oldType) == true) && (dataFieldDescriptor.Name == PageReferenceFieldName))
            {
                return false;
            }

            if (dataFieldDescriptor.ForeignKeyReferenceTypeName != null)
            {
                DataTypeAssociationDescriptor dataTypeAssociationDescriptor = dataTypeDescriptor.DataAssociations.FirstOrDefault();

                if (dataTypeAssociationDescriptor != null)
                {
                    if (this.AllowForiegnKeyEditing == false)
                    {
                        if (dataFieldDescriptor.Name == dataTypeAssociationDescriptor.ForeignKeyPropertyName)
                        {
                            return false;
                        }
                    }

                    if ((dataFieldDescriptor.Name == CompositionDescriptionFieldName) && (dataTypeDescriptor.IsPageMetaDataType == true))
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
