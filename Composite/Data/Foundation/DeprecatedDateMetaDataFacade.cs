using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Data.Transactions;
using Composite.Core.Types;


namespace Composite.Data.Foundation
{
    /// <summary>
    /// This class can be used in a upgrade scenario, but should not be a part of the core in the
    /// long run. The MigrateMetaData() method will migrate all meta data to the new store model.
    /// </summary>
    [Obsolete]
    internal static class DeprecatedDateMetaDataFacade
    {
        private static Dictionary<Guid, DataTypeDescriptor> _dataTypeDescriptorCache = new Dictionary<Guid, DataTypeDescriptor>();
        private static readonly object _lock = new object();



        public static void MigrateMetaData()
        {
            List<Guid> ids = DataFacade.GetData<IDataTypeDescriptor>().Select(f => f.Id).ToList();
            foreach (Guid id in ids)
            {
                DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor(id);

                DataMetaDataFacade.PersistMetaData(dataTypeDescriptor);
            }
        }




        public static void PersistMetaData(DataTypeDescriptor dataTypeDescriptor)
        {
            Guid dataTypeId = dataTypeDescriptor.DataTypeId;

            IDataTypeDescriptor existingTypeDescriptorMetaData =
                (from dataType in DataFacade.GetData<IDataTypeDescriptor>()
                 where dataType.Id == dataTypeId
                 select dataType).FirstOrDefault();

            IDataTypeDescriptor typeDescriptorMetaData;
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                if (existingTypeDescriptorMetaData != null)
                {
                    DeleteMetaData(existingTypeDescriptorMetaData.Id);
                }

                typeDescriptorMetaData = DataFacade.BuildNew<IDataTypeDescriptor>();
                typeDescriptorMetaData.Id = dataTypeDescriptor.DataTypeId;
                typeDescriptorMetaData.Name = dataTypeDescriptor.Name;
                typeDescriptorMetaData.Namespace = dataTypeDescriptor.Namespace;
                typeDescriptorMetaData.Title = dataTypeDescriptor.Title ?? "";
                typeDescriptorMetaData.LabelFieldName = dataTypeDescriptor.LabelFieldName;
                typeDescriptorMetaData.Version = dataTypeDescriptor.Version;
                typeDescriptorMetaData.CodeGenerated = dataTypeDescriptor.IsCodeGenerated;
                typeDescriptorMetaData.TypeManagerTypeName = dataTypeDescriptor.TypeManagerTypeName;
                DataFacade.AddNew<IDataTypeDescriptor>(typeDescriptorMetaData);

                foreach (string keyFieldName in dataTypeDescriptor.KeyPropertyNames)
                {
                    IDataTypeDescriptor_KeyFieldName dataTypeDescriptorKeyFieldNameMetaData = DataFacade.BuildNew<IDataTypeDescriptor_KeyFieldName>();
                    dataTypeDescriptorKeyFieldNameMetaData.TypeDescriptorId = dataTypeDescriptor.DataTypeId;
                    dataTypeDescriptorKeyFieldNameMetaData.Name = keyFieldName;
                    DataFacade.AddNew<IDataTypeDescriptor_KeyFieldName>(dataTypeDescriptorKeyFieldNameMetaData);
                }

                foreach (DataScopeIdentifier dataScopeIdentifier in dataTypeDescriptor.DataScopes)
                {
                    IDataTypeDescriptor_DataScope dataTypeDescriptorDataScopeMetaData = DataFacade.BuildNew<IDataTypeDescriptor_DataScope>();
                    dataTypeDescriptorDataScopeMetaData.TypeDescriptorId = dataTypeDescriptor.DataTypeId;
                    dataTypeDescriptorDataScopeMetaData.SerializedDataScopeIdentifier = dataScopeIdentifier.Serialize();
                    DataFacade.AddNew<IDataTypeDescriptor_DataScope>(dataTypeDescriptorDataScopeMetaData);
                }

                foreach (Type interfaceType in dataTypeDescriptor.SuperInterfaces)
                {
                    IDataTypeDescriptor_SuperInterface dataTypeDescriptorSuperInterfaceMetaData = DataFacade.BuildNew<IDataTypeDescriptor_SuperInterface>();
                    dataTypeDescriptorSuperInterfaceMetaData.TypeDescriptorId = dataTypeDescriptor.DataTypeId;
                    dataTypeDescriptorSuperInterfaceMetaData.InterfaceTypeName = TypeManager.SerializeType(interfaceType);
                    DataFacade.AddNew<IDataTypeDescriptor_SuperInterface>(dataTypeDescriptorSuperInterfaceMetaData);
                }

                foreach (DataTypeAssociationDescriptor dataTypeAssociationDescriptor in dataTypeDescriptor.DataAssociations)
                {
                    IDataTypeAssociationDescriptor dataTypeAssociationDescriptorMetaData = DataFacade.BuildNew<IDataTypeAssociationDescriptor>();
                    dataTypeAssociationDescriptorMetaData.Id = Guid.NewGuid();
                    dataTypeAssociationDescriptorMetaData.TypeDescriptorId = dataTypeDescriptor.DataTypeId;
                    dataTypeAssociationDescriptorMetaData.AssociatedInterfaceType = TypeManager.SerializeType(dataTypeAssociationDescriptor.AssociatedInterfaceType);
                    dataTypeAssociationDescriptorMetaData.ForeignKeyPropertyName = dataTypeAssociationDescriptor.ForeignKeyPropertyName;
                    dataTypeAssociationDescriptorMetaData.AssociationType = dataTypeAssociationDescriptor.AssociationType.ToString();
                    DataFacade.AddNew<IDataTypeAssociationDescriptor>(dataTypeAssociationDescriptorMetaData);
                }

                foreach (DataFieldDescriptor dataFieldDescriptor in dataTypeDescriptor.Fields)
                {
                    IDataFieldDescriptor dataFieldDescriptorMetaData = DataFacade.BuildNew<IDataFieldDescriptor>();

                    dataFieldDescriptorMetaData.Id = dataFieldDescriptor.Id;
                    dataFieldDescriptorMetaData.TypeDescriptorId = dataTypeDescriptor.DataTypeId;
                    dataFieldDescriptorMetaData.Name = dataFieldDescriptor.Name;
                    dataFieldDescriptorMetaData.StoreType = dataFieldDescriptor.StoreType.Serialize();
                    dataFieldDescriptorMetaData.InstanceType = TypeManager.SerializeType(dataFieldDescriptor.InstanceType);
                    dataFieldDescriptorMetaData.Position = dataFieldDescriptor.Position;
                    dataFieldDescriptorMetaData.GroupByPriority = dataFieldDescriptor.GroupByPriority;
                    dataFieldDescriptorMetaData.Inherited = dataFieldDescriptor.Inherited;
                    dataFieldDescriptorMetaData.ForeignKeyReferenceTypeName = dataFieldDescriptor.ForeignKeyReferenceTypeName;
                    dataFieldDescriptorMetaData.NewInstanceDefaultFieldValue = dataFieldDescriptor.NewInstanceDefaultFieldValue;

                    if (dataFieldDescriptor.DefaultValue != null)
                    {
                        dataFieldDescriptorMetaData.DefaultValue = dataFieldDescriptor.DefaultValue.Serialize();
                    }

                    dataFieldDescriptorMetaData.IsNullable = dataFieldDescriptor.IsNullable;
                    DataFacade.AddNew<IDataFieldDescriptor>(dataFieldDescriptorMetaData);

                    if (dataFieldDescriptor.FormRenderingProfile.WidgetFunctionMarkup != null)
                    {
                        IDataFieldDescriptor_FormRenderingProfile dataFieldFormRenderingProfileMetaData = DataFacade.BuildNew<IDataFieldDescriptor_FormRenderingProfile>();
                        dataFieldFormRenderingProfileMetaData.FieldDescriptorId = dataFieldDescriptorMetaData.Id;
                        dataFieldFormRenderingProfileMetaData.TypeDescriptorId = dataFieldDescriptorMetaData.TypeDescriptorId;
                        dataFieldFormRenderingProfileMetaData.Label = dataFieldDescriptor.FormRenderingProfile.Label;
                        dataFieldFormRenderingProfileMetaData.HelpText = dataFieldDescriptor.FormRenderingProfile.HelpText;
                        dataFieldFormRenderingProfileMetaData.WidgetFunctionMarkup = dataFieldDescriptor.FormRenderingProfile.WidgetFunctionMarkup;

                        DataFacade.AddNew<IDataFieldDescriptor_FormRenderingProfile>(dataFieldFormRenderingProfileMetaData);
                    }

                    if (dataFieldDescriptor.ValidationFunctionMarkup != null)
                    {
                        foreach (string validtorFunctionMarkup in dataFieldDescriptor.ValidationFunctionMarkup)
                        {
                            IDataFieldDescriptor_ValidatorFunctionMarkup dataFieldDescriptor_ValidatorFunctionMarkup = DataFacade.BuildNew<IDataFieldDescriptor_ValidatorFunctionMarkup>();

                            dataFieldDescriptor_ValidatorFunctionMarkup.Id = Guid.NewGuid();
                            dataFieldDescriptor_ValidatorFunctionMarkup.TypeDescriptorId = dataTypeDescriptor.DataTypeId;
                            dataFieldDescriptor_ValidatorFunctionMarkup.FieldDescriptorId = dataFieldDescriptor.Id;
                            dataFieldDescriptor_ValidatorFunctionMarkup.ValidatorFunctionMarkup = validtorFunctionMarkup;

                            DataFacade.AddNew<IDataFieldDescriptor_ValidatorFunctionMarkup>(dataFieldDescriptor_ValidatorFunctionMarkup);
                        }
                    }
                }

                transactionScope.Complete();
            }
        }



        public static DataTypeDescriptor GetDataTypeDescriptor(Guid id)
        {
            DataTypeDescriptor dataTypeDescriptor;
            if (_dataTypeDescriptorCache.TryGetValue(id, out dataTypeDescriptor) == false)
            {
                lock (_lock)
                {
                    if (_dataTypeDescriptorCache.TryGetValue(id, out dataTypeDescriptor) == false)
                    {
                        IDataTypeDescriptor typeDescriptor = null;
                        foreach (var data in DataFacade.GetData<IDataTypeDescriptor>())
                        {
                            if (data.Id == id)
                            {
                                typeDescriptor = data;
                                break;
                            }
                        }

                        if (typeDescriptor == null)
                        {
                            dataTypeDescriptor = null;
                        }
                        else
                        {
                            dataTypeDescriptor = BuildDescriptorFromMetaData(typeDescriptor);
                        }

                        _dataTypeDescriptorCache.Add(id, dataTypeDescriptor);
                    }
                }
            }

            return dataTypeDescriptor;
        }



        public static DataTypeDescriptor BuildDescriptorFromMetaData(IDataTypeDescriptor typeDescriptorMetaData)
        {
            Verify.ArgumentNotNull(typeDescriptorMetaData, "typeDescriptorMetaData");

            var fieldMetaDatas = new List<IDataFieldDescriptor>();
            foreach (var field in DataFacade.GetData<IDataFieldDescriptor>())
            {
                if (field.TypeDescriptorId == typeDescriptorMetaData.Id)
                    fieldMetaDatas.Add(field);
            }
            // Sorting by position
            fieldMetaDatas.Sort((a, b) => a.Position.CompareTo(b.Position));


            var keyFieldNames = new List<string>();
            foreach (var name in DataFacade.GetData<IDataTypeDescriptor_KeyFieldName>())
            {
                if (name.TypeDescriptorId == typeDescriptorMetaData.Id)
                    keyFieldNames.Add(name.Name);
            }

            var dataScopeNames = new List<string>();
            foreach (var dataScopeMetaData in DataFacade.GetData<IDataTypeDescriptor_DataScope>())
            {
                if (dataScopeMetaData.TypeDescriptorId == typeDescriptorMetaData.Id)
                    dataScopeNames.Add(dataScopeMetaData.SerializedDataScopeIdentifier);
            }

            var storeSortOrder = new List<Pair<string, int>>();
            foreach (var sortOrder in DataFacade.GetData<IDataTypeDescriptor_StoreSortOrderFieldName>())
            {
                if (sortOrder.TypeDescriptorId == typeDescriptorMetaData.Id)
                    storeSortOrder.Add(new Pair<string, int>(sortOrder.FieldName, sortOrder.SortOrder));
            }
            // Sorting by "SortOrder" field
            storeSortOrder.Sort((a, b) => (a.Second.CompareTo(b.Second)));

            var superInterfaces = new List<Type>();
            foreach (var superInterface in DataFacade.GetData<IDataTypeDescriptor_SuperInterface>())
            {
                // TODO: to be removed after release of C1 1.2 SP2
                if (superInterface.InterfaceTypeName == "Composite.Data.ProcessControlled.IChangeHistory,Composite")
                {
                    continue;
                }
                // end of todo

                if (superInterface.TypeDescriptorId == typeDescriptorMetaData.Id)
                    superInterfaces.Add(TypeManager.GetType(superInterface.InterfaceTypeName));
            }


            var associationDatas = new List<IDataTypeAssociationDescriptor>();
            foreach (var association in DataFacade.GetData<IDataTypeAssociationDescriptor>())
            {
                if (association.TypeDescriptorId == typeDescriptorMetaData.Id)
                    associationDatas.Add(association);
            }


            var formRenderingProfiles = new List<IDataFieldDescriptor_FormRenderingProfile>();
            foreach (var frm in DataFacade.GetData<IDataFieldDescriptor_FormRenderingProfile>())
            {
                if (frm.TypeDescriptorId == typeDescriptorMetaData.Id)
                    formRenderingProfiles.Add(frm);
            }

            DataTypeDescriptor dataTypeDescriptor = new DataTypeDescriptor(typeDescriptorMetaData.Id, typeDescriptorMetaData.Namespace, typeDescriptorMetaData.Name, typeDescriptorMetaData.CodeGenerated);
            dataTypeDescriptor.Title = typeDescriptorMetaData.Title;
            dataTypeDescriptor.LabelFieldName = typeDescriptorMetaData.LabelFieldName;
            dataTypeDescriptor.TypeManagerTypeName = typeDescriptorMetaData.TypeManagerTypeName;
            dataTypeDescriptor.Version = typeDescriptorMetaData.Version;

            foreach (IDataFieldDescriptor fieldDescriptorMetaData in fieldMetaDatas)
            {
                DataFieldDescriptor dataFieldDescriptor = BuildDescriptorFromMeteData(dataTypeDescriptor, fieldDescriptorMetaData, formRenderingProfiles);

                dataTypeDescriptor.Fields.Add(dataFieldDescriptor);
            }

            foreach (string keyFieldName in keyFieldNames)
            {
                dataTypeDescriptor.KeyPropertyNames.Add(keyFieldName);
            }

            foreach (string dataScopeName in dataScopeNames)
            {
                // NOTE: To be removed
                if (dataScopeName == "versioned")
                {
                    continue;
                }

                dataTypeDescriptor.DataScopes.Add(DataScopeIdentifier.Deserialize(dataScopeName));
            }

            foreach (var pair in storeSortOrder)
            {
                string fieldName = pair.First;
                dataTypeDescriptor.StoreSortOrderFieldNames.Add(fieldName);
            }

            dataTypeDescriptor.SetSuperInterfaces(superInterfaces);

            foreach (IDataTypeAssociationDescriptor dataTypeAssociationDescriptorMetaData in associationDatas)
            {
                Type associatedInterfaceType = TypeManager.TryGetType(dataTypeAssociationDescriptorMetaData.AssociatedInterfaceType);

                if (associatedInterfaceType != null)
                {
                    DataTypeAssociationDescriptor dataTypeAssociationDescriptor = new DataTypeAssociationDescriptor(
                        associatedInterfaceType,
                        dataTypeAssociationDescriptorMetaData.ForeignKeyPropertyName,
                        (DataAssociationType)Enum.Parse(typeof(DataAssociationType), dataTypeAssociationDescriptorMetaData.AssociationType)
                        );

                    dataTypeDescriptor.DataAssociations.Add(dataTypeAssociationDescriptor);
                }
            }

            return dataTypeDescriptor;
        }

        private static DataFieldDescriptor BuildDescriptorFromMeteData(DataTypeDescriptor dataTypeDescriptor, IDataFieldDescriptor fieldDescriptorMetaData, List<IDataFieldDescriptor_FormRenderingProfile> formRenderingProfiles)
        {
            DataFieldDescriptor dataFieldDescriptor;
            Verify.ArgumentNotNull(dataTypeDescriptor, "dataTypeDescriptor");
            Verify.ArgumentNotNull(fieldDescriptorMetaData, "fieldDescriptorMetaData");

            StoreFieldType storeFieldType = StoreFieldType.Deserialize(fieldDescriptorMetaData.StoreType);
            Type instanceType = TypeManager.GetType(fieldDescriptorMetaData.InstanceType);

            dataFieldDescriptor = new DataFieldDescriptor(fieldDescriptorMetaData.Id, fieldDescriptorMetaData.Name, storeFieldType, instanceType, fieldDescriptorMetaData.Inherited);

            dataFieldDescriptor.Position = fieldDescriptorMetaData.Position;
            dataFieldDescriptor.GroupByPriority = fieldDescriptorMetaData.GroupByPriority;
            dataFieldDescriptor.IsNullable = fieldDescriptorMetaData.IsNullable;
            dataFieldDescriptor.ForeignKeyReferenceTypeName = fieldDescriptorMetaData.ForeignKeyReferenceTypeName;
            dataFieldDescriptor.NewInstanceDefaultFieldValue = fieldDescriptorMetaData.NewInstanceDefaultFieldValue;

            if (fieldDescriptorMetaData.DefaultValue != null)
            {
                DefaultValue defaultValue = DefaultValue.Deserialize(fieldDescriptorMetaData.DefaultValue);
                dataFieldDescriptor.DefaultValue = defaultValue;
            }

            IDataFieldDescriptor_FormRenderingProfile fieldFormRenderingProfileMetaData = null;
            foreach (var profileMetaData in formRenderingProfiles)
            {
                if (profileMetaData.FieldDescriptorId == fieldDescriptorMetaData.Id)
                {
                    fieldFormRenderingProfileMetaData = profileMetaData;
                    break;
                }
            }

            if (fieldFormRenderingProfileMetaData != null)
            {
                dataFieldDescriptor.FormRenderingProfile.Label = fieldFormRenderingProfileMetaData.Label;
                dataFieldDescriptor.FormRenderingProfile.HelpText = fieldFormRenderingProfileMetaData.HelpText;
                dataFieldDescriptor.FormRenderingProfile.WidgetFunctionMarkup = fieldFormRenderingProfileMetaData.WidgetFunctionMarkup;
            }

            Guid fieldDescriptorId = dataFieldDescriptor.Id;
            var dataFieldDescriptor_ValidatorFunctionMarkups = new List<IDataFieldDescriptor_ValidatorFunctionMarkup>();
            foreach (var markup in DataFacade.GetData<IDataFieldDescriptor_ValidatorFunctionMarkup>())
            {
                if (markup.FieldDescriptorId == fieldDescriptorId)
                    dataFieldDescriptor_ValidatorFunctionMarkups.Add(markup);
            }

            dataFieldDescriptor.ValidationFunctionMarkup = new List<string>();

            foreach (IDataFieldDescriptor_ValidatorFunctionMarkup functionMarkup in dataFieldDescriptor_ValidatorFunctionMarkups)
            {
                dataFieldDescriptor.ValidationFunctionMarkup.Add(functionMarkup.ValidatorFunctionMarkup);
            }

            return dataFieldDescriptor;
        }



        public static void DeleteMetaData(Guid dataTypeId)
        {
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                DataFacade.Delete<IDataTypeDescriptor>(md => md.Id == dataTypeId);
                DataFacade.Delete<IDataTypeDescriptor_KeyFieldName>(md => md.TypeDescriptorId == dataTypeId);
                DataFacade.Delete<IDataTypeDescriptor_DataScope>(md => md.TypeDescriptorId == dataTypeId);
                DataFacade.Delete<IDataTypeDescriptor_StoreSortOrderFieldName>(md => md.TypeDescriptorId == dataTypeId);
                DataFacade.Delete<IDataTypeDescriptor_SuperInterface>(md => md.TypeDescriptorId == dataTypeId);
                DataFacade.Delete<IDataTypeAssociationDescriptor>(md => md.TypeDescriptorId == dataTypeId);
                DataFacade.Delete<IDataFieldDescriptor>(md => md.TypeDescriptorId == dataTypeId);
                DataFacade.Delete<IDataFieldDescriptor_FormRenderingProfile>(md => md.TypeDescriptorId == dataTypeId);
                DataFacade.Delete<IDataFieldDescriptor_ValidatorFunctionMarkup>(md => md.TypeDescriptorId == dataTypeId);

                transactionScope.Complete();
            }
        }
    }
}
