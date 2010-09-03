using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core.Collections.Generic;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.ProcessControlled;
using Composite.Data.Types;
using Composite.Core.Logging;
using Composite.Core.Extensions;
using Composite.Core.Types;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("Name = {Name}")]
    public class DataTypeDescriptor
    {
        private string _name;
        private Guid _dataTypeId;
        private string _namespace;
        private string _labelFieldName;
        private List<Type> _superInterfaces = new List<Type>();
        private List<DataTypeAssociationDescriptor> _dataTypeAssociationDescriptors = new List<DataTypeAssociationDescriptor>();


        public DataTypeDescriptor()
        {
            this.Fields = new DataFieldDescriptorCollection(this);
            this.KeyPropertyNames = new DataFieldNameCollection(this.Fields, false, false, false);
            this.StoreSortOrderFieldNames = new DataFieldNameCollection(this.Fields, true, false, false);
            this.IsCodeGenerated = false;
            this.DataScopes = new List<DataScopeIdentifier>();
        }


        public DataTypeDescriptor(Guid dataTypeId, string dataTypeNamespace, string dataTypeName, bool isCodeGenerated)
            : this()
        {
            this.DataTypeId = dataTypeId;
            this.Namespace = dataTypeNamespace;
            this.Name = dataTypeName;
            this.Version = 1;
            this.IsCodeGenerated = isCodeGenerated;
        }


        public DataTypeDescriptor(Guid dataTypeId, string dataTypeNamespace, string dataTypeName, string typeManagerTypeName)
            : this()
        {
            this.DataTypeId = dataTypeId;
            this.Namespace = dataTypeNamespace;
            this.Name = dataTypeName;
            this.TypeManagerTypeName = typeManagerTypeName;
            this.Version = 1;
            this.IsCodeGenerated = false;
        }


        public DataTypeDescriptor(Guid dataTypeId, string dataTypeNamespace, string dataTypeName, string typeManagerTypeName, bool isCodeGenerated)
            : this()
        {
            this.DataTypeId = dataTypeId;
            this.Namespace = dataTypeNamespace;
            this.Name = dataTypeName;
            this.TypeManagerTypeName = typeManagerTypeName;
            this.Version = 1;
            this.IsCodeGenerated = isCodeGenerated;
        }


        public Guid DataTypeId
        {
            get
            {
                return _dataTypeId;
            }
            set
            {
                if (value == Guid.Empty) throw new ArgumentException("DataTypeId must be a non-empty Guid");

                _dataTypeId = value;
            }
        }


        public DataFieldNameCollection KeyPropertyNames { get; set; }


        public Type GetInterfaceType()
        {
            if (this.TypeManagerTypeName == null)
            {
                throw new InvalidOperationException("The TypeManagerTypeName has not been set");
            }

            return TypeManager.GetType(this.TypeManagerTypeName);
        }

        public string TypeManagerTypeName { get; set; }

        /// <summary>
        /// A list of field names that the provider should use when physically storing data. 
        /// Select ordering is not (necessarily) influenced by this setting.
        /// </summary>
        public DataFieldNameCollection StoreSortOrderFieldNames { get; set; }


        /// <summary>The fields (aka properties or columns) of the type.</summary>
        public DataFieldDescriptorCollection Fields { get; set; }


        /// <summary>The short name of the type, without namespace and assembly info</summary>
        public string Name
        {
            get { return _name; }
            set { _name = NameValidation.ValidateName(value); }
        }

        public string Namespace
        {
            get
            {
                return _namespace;
            }
            set
            {
                _namespace = NameValidation.ValidateNamespace(value);
            }
        }



        public string Title { get; set; }

        public string LabelFieldName
        {
            get
            {
                return _labelFieldName;
            }
            set
            {
                _labelFieldName = value;
            }
        }

        public int Version { get; internal set; }

        public bool IsCodeGenerated { get; private set; }
        public bool Cachable { get; internal set; }

        public bool HasCustomPhysicalSortOrder
        {
            get
            {
                if (this.StoreSortOrderFieldNames.Count == 0) return false;
                if (this.StoreSortOrderFieldNames.Count != this.KeyPropertyNames.Count) return true;
                for (int i = 0; i < this.StoreSortOrderFieldNames.Count; i++)
                {
                    if (this.StoreSortOrderFieldNames[i] != this.KeyPropertyNames[i]) return true;
                }
                return false;
            }
        }

        public List<DataScopeIdentifier> DataScopes { get; set; }

        public bool Localizeable
        {
            get
            {
                return SuperInterfaces.Contains(typeof(ILocalizedControlled));
            }
        }

        public void AddSuperInterface(Type interfaceType)
        {
            if ((_superInterfaces.Contains(interfaceType) == false) && (interfaceType != typeof(IData)))
            {
                _superInterfaces.Add(interfaceType);

                foreach (PropertyInfo propertyInfo in interfaceType.GetProperties())
                {
                    DataFieldDescriptor dataFieldDescriptor = ReflectionBasedDescriptorBuilder.BuildFieldDescriptor(propertyInfo, true);

                    this.Fields.Add(dataFieldDescriptor);

                    if (DynamicTypeReflectionFacade.IsKeyField(propertyInfo) == true)
                    {
                        this.KeyPropertyNames.Add(propertyInfo.Name);
                    }
                }


                foreach (DataScopeIdentifier dataScopeIdentifier in DynamicTypeReflectionFacade.GetDataScopes(interfaceType))
                {
                    if (this.DataScopes.Contains(dataScopeIdentifier) == false)
                    {
                        this.DataScopes.Add(dataScopeIdentifier);
                    }
                }


                foreach (Type superSuperInterfaceType in interfaceType.GetInterfaces().Where(t => typeof(IData).IsAssignableFrom(t)))
                {
                    AddSuperInterface(superSuperInterfaceType);
                }
            }
        }



        public void RemoveSuperInterface(Type interfaceType)
        {
            if (interfaceType == typeof (IData))
            {
                return;
            }

            if (_superInterfaces.Contains(interfaceType) == true)
            {
                _superInterfaces.Remove(interfaceType);
            }

            foreach (PropertyInfo propertyInfo in interfaceType.GetProperties())
            {
                DataFieldDescriptor dataFieldDescriptor = ReflectionBasedDescriptorBuilder.BuildFieldDescriptor(propertyInfo, true);

                if (this.Fields.Contains(dataFieldDescriptor) == true)
                {
                    this.Fields.Remove(dataFieldDescriptor);
                }

                if ((DynamicTypeReflectionFacade.IsKeyField(propertyInfo) == true) &&
                    (this.KeyPropertyNames.Contains(propertyInfo.Name) == true))
                {
                    this.KeyPropertyNames.Remove(propertyInfo.Name);
                }
            }


            foreach (DataScopeIdentifier dataScopeIdentifier in DynamicTypeReflectionFacade.GetDataScopes(interfaceType))
            {
                if (this.DataScopes.Contains(dataScopeIdentifier) == true)
                {
                    this.DataScopes.Remove(dataScopeIdentifier);
                }
            }


            foreach (Type superSuperInterfaceType in interfaceType.GetInterfaces().Where(t => typeof(IData).IsAssignableFrom(t)))
            {
                RemoveSuperInterface(superSuperInterfaceType);
            }
        }



        public IEnumerable<Type> SuperInterfaces
        {
            get
            {
                return new ReadOnlyList<Type>(_superInterfaces);
            }
        }



        public List<DataTypeAssociationDescriptor> DataAssociations
        {
            get
            {
                return _dataTypeAssociationDescriptors;
            }
            set
            {
                if (value == null) throw new ArgumentNullException();

                _dataTypeAssociationDescriptors = value;
            }
        }


        public bool IsPageFolderDataType
        {
            get
            {
                return
                    this.DataAssociations.
                    Where(f => f.AssociatedInterfaceType == typeof(IPage) && f.AssociationType == DataAssociationType.Aggregation).
                    Any();
            }
        }


        public bool IsPageMetaDataType
        {
            get
            {
                return
                    this.DataAssociations.
                    Where(f => f.AssociatedInterfaceType == typeof(IPage) && f.AssociationType == DataAssociationType.Composition).
                    Any();
            }
        }


        internal void SetSuperInterfaces(List<Type> superInterfaces)
        {
            _superInterfaces = superInterfaces;
        }



        internal void Validate()
        {
            try
            {
                if (this.DataTypeId == Guid.Empty) throw new InvalidOperationException("The type descriptor property DataTypeId can not be empty");
                if (string.IsNullOrEmpty(this.Namespace) == true) throw new InvalidOperationException("The type descriptor property Namespace can not be empty");
                if (string.IsNullOrEmpty(this.Name) == true) throw new InvalidOperationException("The type descriptor property Name can not be empty");
                if (string.IsNullOrEmpty(this.TypeManagerTypeName) == true) throw new InvalidOperationException("The type descriptor property TypeManagerTypeName can not be empty");
                if (this.Fields.Count == 0) throw new InvalidOperationException("The type descriptors Fields collection may not be empty");
                if (this.KeyPropertyNames.Count == 0) throw new InvalidOperationException("The type descriptors KeyFieldNames collection may not be empty");
                if (this.DataScopes.Count == 0) throw new InvalidOperationException("The DataScopes list containing the list of data scopes this type must support can not be empty. Please provide at least one data scopes.");
                if (this.DataScopes.Select(f => f.Name).Distinct().Count() != this.DataScopes.Count) throw new InvalidOperationException("The DataScopes list contains redundant data scopes");

                if (this.DataScopes.Where(f => f.Equals(DataScopeIdentifier.PublicName)).Count() > 0)
                {
                    foreach (PropertyInfo propertyInfo in typeof(IPublishControlled).GetProperties())
                    {
                        if (this.Fields.Where(f => f.Name == propertyInfo.Name).Count() == 0)
                        {
                            throw new InvalidOperationException(string.Format("DataScope '{0}' require you to implement '{1}' and a field named '{2} is missing", DataScopeIdentifier.Public, typeof(IPublishControlled), propertyInfo.Name));
                        }
                    }
                }

                this.KeyPropertyNames.ValidateMembers();
                this.StoreSortOrderFieldNames.ValidateMembers();

                if (this.LabelFieldName != null)
                {
                    if (this.Fields.Where(f => f.Name == this.LabelFieldName).Count() == 0)
                    {
                        throw new InvalidOperationException(string.Format("The label field name '{0}' is not an existing field", this.LabelFieldName));
                    }
                }

                int distinctForeignKeyPropertyNames =
                    (from assDec in this.DataAssociations
                     select assDec.ForeignKeyPropertyName).Distinct().Count();

                if (distinctForeignKeyPropertyNames != this.DataAssociations.Count)
                {
                    throw new InvalidOperationException(string.Format("Two or more data associations are using the same foreign key field"));
                }

                int distinctAssociatedInterfaceType =
                    (from assDec in this.DataAssociations
                     select assDec.AssociatedInterfaceType).Distinct().Count();

                if (distinctAssociatedInterfaceType != this.DataAssociations.Count)
                {
                    throw new InvalidOperationException(string.Format("Two or more data associations are associated to the same interface type"));
                }
            }
            catch (Exception ex)
            {
                string typeName = (string.IsNullOrEmpty(this.TypeManagerTypeName) ? this.Name : this.TypeManagerTypeName);
                throw new InvalidOperationException(string.Format("Failed to validate data type description for '{0}'. {1}", typeName, ex.Message));
            }
        }



        public DataTypeDescriptor Clone()
        {
            DataTypeDescriptor dataTypeDescriptor = new DataTypeDescriptor(this.DataTypeId, this.Namespace, this.Name, this.TypeManagerTypeName, this.IsCodeGenerated);

            foreach (DataTypeAssociationDescriptor dataTypeAssociationDescriptor in this.DataAssociations)
            {
                dataTypeDescriptor.DataAssociations.Add(
                    new DataTypeAssociationDescriptor(
                        dataTypeAssociationDescriptor.AssociatedInterfaceType, 
                        dataTypeAssociationDescriptor.ForeignKeyPropertyName, 
                        dataTypeAssociationDescriptor.AssociationType
                    ));
            }
            
            dataTypeDescriptor.DataScopes = new List<DataScopeIdentifier>(this.DataScopes);
            
            foreach (DataFieldDescriptor dataFieldDescriptor in this.Fields)
            {
                if (dataFieldDescriptor.Inherited == false)
                {
                    dataTypeDescriptor.Fields.Add(dataFieldDescriptor.Clone());
                }
            }

            foreach (string keyPropertyName in this.KeyPropertyNames)
            {
                dataTypeDescriptor.KeyPropertyNames.Add(keyPropertyName);
            }

            dataTypeDescriptor.LabelFieldName = this.LabelFieldName;

            foreach (string storeSortOrderFieldNames in this.StoreSortOrderFieldNames)
            {
                dataTypeDescriptor.StoreSortOrderFieldNames.Add(storeSortOrderFieldNames);
            }

            foreach (Type superInterface in this.SuperInterfaces)
            {
                dataTypeDescriptor.AddSuperInterface(superInterface);
            }

            dataTypeDescriptor.Title = this.Title;
            dataTypeDescriptor.Version = this.Version;

            return dataTypeDescriptor;
        }


        public XElement ToXml()
        {
            XElement element = new XElement("DataTypeDescriptor");

            element.Add(new XAttribute("dataTypeId", this.DataTypeId));
            element.Add(new XAttribute("name", this.Name));
            element.Add(new XAttribute("namespace", this.Namespace));
            if (this.Title != null)
            {
                element.Add(new XAttribute("title", this.Title));
            }
            element.Add(new XAttribute("hasCustomPhysicalSortOrder", this.HasCustomPhysicalSortOrder));
            element.Add(new XAttribute("isCodeGenerated", this.IsCodeGenerated));
            element.Add(new XAttribute("cachable", this.Cachable));
            if (this.LabelFieldName != null)
            {
                element.Add(new XAttribute("labelFieldName", this.LabelFieldName));
            }
            if (this.TypeManagerTypeName != null)
            {
                element.Add(new XAttribute("typeManagerTypeName", this.TypeManagerTypeName));
            }
            element.Add(new XAttribute("version", this.Version));

            XElement dataAssociationsElement = new XElement("DataAssociations");
            foreach (DataTypeAssociationDescriptor dataTypeAssociationDescriptor in this.DataAssociations)
            {
                dataAssociationsElement.Add(dataTypeAssociationDescriptor.ToXml());
            }
            element.Add(dataAssociationsElement);

            XElement dataScopesElement = new XElement("DataScopes");
            foreach (DataScopeIdentifier dataScopeIdentifier in this.DataScopes)
            {
                dataScopesElement.Add(new XElement("DataScopeIdentifier", new XAttribute("name", dataScopeIdentifier)));
            }
            element.Add(dataScopesElement);

            XElement keyPropertyNamesElement = new XElement("KeyPropertyNames");
            foreach (string keyPropertyName in this.KeyPropertyNames)
            {
                keyPropertyNamesElement.Add(new XElement("KeyPropertyName", new XAttribute("name", keyPropertyName)));
            }
            element.Add(keyPropertyNamesElement);            

            XElement superInterfacesElement = new XElement("SuperInterfaces");
            foreach (Type superInterface in this.SuperInterfaces)
            {
                superInterfacesElement.Add(new XElement("SuperInterface", new XAttribute("type", TypeManager.SerializeType(superInterface))));
            }
            element.Add(superInterfacesElement);

            XElement fieldsElement = new XElement("Fields");
            foreach (DataFieldDescriptor dataFieldDescriptor in this.Fields.Where(f => f.Inherited == false))
            {
                fieldsElement.Add(dataFieldDescriptor.ToXml());
            }
            element.Add(fieldsElement);

            return element;
        }



        public static DataTypeDescriptor FromXml(XElement element)
        {
            if (element == null) throw new ArgumentNullException("element");
            if (element.Name != "DataTypeDescriptor") throw new ArgumentException("The xml is not correctly formattet");

            XAttribute dataTypeIdAttribute = element.Attribute("dataTypeId");
            XAttribute nameAttribute = element.Attribute("name");
            XAttribute namespaceAttribute = element.Attribute("namespace");
            XAttribute hasCustomPhysicalSortOrderAttribute = element.Attribute("hasCustomPhysicalSortOrder");
            XAttribute isCodeGeneratedAttribute = element.Attribute("isCodeGenerated");
            XAttribute cachableAttribute = element.Attribute("cachable");            
            XAttribute versionAttribute = element.Attribute("version");
            XElement dataAssociationsElement = element.Element("DataAssociations");
            XElement dataScopesElement = element.Element("DataScopes");
            XElement keyPropertyNamesElement = element.Element("KeyPropertyNames");
            XElement superInterfaceKeyPropertyNamesElement = element.Element("SuperInterfaceKeyPropertyNames");
            XElement superInterfacesElement = element.Element("SuperInterfaces");
            XElement fieldsElement = element.Element("Fields");

            if ((dataTypeIdAttribute == null) || (nameAttribute == null) || (namespaceAttribute == null) || (hasCustomPhysicalSortOrderAttribute == null) || (isCodeGeneratedAttribute == null) || (versionAttribute == null) ||
                (dataAssociationsElement == null) || (dataScopesElement == null) || (keyPropertyNamesElement == null) || (superInterfacesElement == null) || (fieldsElement == null)) throw new ArgumentException("The xml is not correctly formattet");

            XAttribute titleAttribute = element.Attribute("title");
            XAttribute labelFieldNameAttribute = element.Attribute("labelFieldName");
            XAttribute typeManagerTypeNameAttribute = element.Attribute("typeManagerTypeName");

            Guid dataTypeId = (Guid)dataTypeIdAttribute;
            string name = nameAttribute.Value;
            string namespaceName = namespaceAttribute.Value;
            bool isCodeGeneretaed = (bool)isCodeGeneratedAttribute;
            bool cachable = false;
            if(cachableAttribute != null)
            {
                cachable = (bool) cachableAttribute;
            }

            // TODO: check why "hasCustomPhysicalSortOrder" and "version" isn't used
            bool hasCustomPhysicalSortOrder = (bool)hasCustomPhysicalSortOrderAttribute;
            int version = (int)versionAttribute;

            DataTypeDescriptor dataTypeDescriptor = new DataTypeDescriptor(dataTypeId, namespaceName, name, isCodeGeneretaed);
            dataTypeDescriptor.Cachable = cachable;
            dataTypeDescriptor.Version = version;

            if (titleAttribute != null)
            {
                dataTypeDescriptor.Title = titleAttribute.Value;
            }

            if (labelFieldNameAttribute != null)
            {
                dataTypeDescriptor.LabelFieldName = labelFieldNameAttribute.Value;
            }

            if (typeManagerTypeNameAttribute != null)
            {
                dataTypeDescriptor.TypeManagerTypeName = typeManagerTypeNameAttribute.Value;
            }

            foreach (XElement elm in dataAssociationsElement.Elements())
            {
                DataTypeAssociationDescriptor dataTypeAssociationDescriptor = DataTypeAssociationDescriptor.FromXml(elm);

                dataTypeDescriptor.DataAssociations.Add(dataTypeAssociationDescriptor);
            }

            foreach (XElement elm in dataScopesElement.Elements("DataScopeIdentifier"))
            {
                XAttribute dataScopeIdentifierNameAttribute = elm.Attribute("name");

                if (dataScopeIdentifierNameAttribute == null) throw new ArgumentException("The xml is not correctly formattet");

                string dataScopeName = dataScopeIdentifierNameAttribute.Value;

                if (DataScopeIdentifier.IsLegasyDataScope(dataScopeName))
                {
                    LoggingService.LogWarning("DataTypeDescriptor", "Ignored legacy data scope '{0}' on type '{1}.{2}' while deserializing DataTypeDescriptor. The '{0}' data scope is no longer supported.".FormatWith(dataScopeName, namespaceName, name));
                    continue;
                }

                DataScopeIdentifier dataScopeIdentifier = DataScopeIdentifier.Deserialize(dataScopeName);

                dataTypeDescriptor.DataScopes.Add(dataScopeIdentifier);
            }

            foreach (XElement elm in superInterfacesElement.Elements("SuperInterface"))
            {
                XAttribute superInterfaceTypeAttribute = elm.Attribute("type");

                if (superInterfaceTypeAttribute == null) throw new ArgumentException("The xml is not correctly formattet");
                
                if (superInterfaceTypeAttribute.Value.StartsWith("Composite.Data.ProcessControlled.IDeleteControlled") == false)
                {
                    Type type = TypeManager.GetType(superInterfaceTypeAttribute.Value);

                    dataTypeDescriptor.AddSuperInterface(type);
                }
                else
                {
                    LoggingService.LogWarning("DataTypeDescriptor", string.Format("Ignored legacy super interface '{0}' on type '{1}.{2}' while deserializing DataTypeDescriptor. This super interface is no longer supported.", superInterfaceTypeAttribute.Value, namespaceName, name));
                }
            }

            foreach (XElement elm in fieldsElement.Elements())
            {
                DataFieldDescriptor dataFieldDescriptor = DataFieldDescriptor.FromXml(elm);

                dataTypeDescriptor.Fields.Add(dataFieldDescriptor);
            }

            foreach (XElement elm in keyPropertyNamesElement.Elements("KeyPropertyName"))
            {
                XAttribute keyPropertyNameAttribute = elm.Attribute("name");

                if (keyPropertyNameAttribute == null) throw new ArgumentException("The xml is not correctly formattet");

                string propertyName = keyPropertyNameAttribute.Value;

                bool isDefinedOnSuperInterface = dataTypeDescriptor.SuperInterfaces.Where(f => f.GetProperty(propertyName) != null).Any();
                if (!isDefinedOnSuperInterface)
                {
                    dataTypeDescriptor.KeyPropertyNames.Add(propertyName);
                }
            }            

            return dataTypeDescriptor;
        }


        public override int GetHashCode()
        {
            return this.DataTypeId.GetHashCode() ^ this.Version.GetHashCode();
        }



        public override bool Equals(object obj)
        {
            return Equals(obj as DataTypeDescriptor);
        }



        public bool Equals(DataTypeDescriptor dataTypeDescriptor)
        {
            if (dataTypeDescriptor == null) return false;

            return
                dataTypeDescriptor.DataTypeId == this.DataTypeId &&
                dataTypeDescriptor.Version == this.Version;
        }



        public override string ToString()
        {
            if (this.Namespace == "")
            {
                return this.Name;
            }
            else
            {
                return string.Format("{0}.{1}", this.Namespace, this.Name);
            }
        }
    }
}
