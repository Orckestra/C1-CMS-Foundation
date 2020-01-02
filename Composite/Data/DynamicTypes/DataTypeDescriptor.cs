using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.Types;
using Composite.Data.DynamicTypes.Configuration;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.ProcessControlled;
using Composite.Data.Types;


namespace Composite.Data.DynamicTypes
{
    /// <summary>
    /// Describes a data type in C1 CMS
    /// </summary>
    [DebuggerDisplay("Type name = {Namespace + '.' + Name}")]
    public class DataTypeDescriptor
    {
        private const string LogTitle = nameof(DataTypeDescriptor);

        private string _name;
        private Guid _dataTypeId;
        private string _namespace;
        private List<Type> _superInterfaces = new List<Type>();
        private List<DataTypeAssociationDescriptor> _dataTypeAssociationDescriptors = new List<DataTypeAssociationDescriptor>();
        private IReadOnlyCollection<DataTypeIndex> _indexes = new DataTypeIndex[0];


        /// <summary>
        /// Instantiates an instance of <see cref="DataTypeDescriptor"/> with default settings.
        /// </summary>
        public DataTypeDescriptor()
        {
            this.Fields = new DataFieldDescriptorCollection(this);
            this.KeyPropertyNames = new DataFieldNameCollection(this.Fields, false, false, false);
            this.VersionKeyPropertyNames = new DataFieldNameCollection(this.Fields, false, false, false);
            this.StoreSortOrderFieldNames = new DataFieldNameCollection(this.Fields, true, false, false);
            this.IsCodeGenerated = false;
            this.DataScopes = new List<DataScopeIdentifier>();
        }


        /// <summary>
        /// Instantiates an instance of <see cref="DataTypeDescriptor"/>.
        /// </summary>
        /// <param name="dataTypeId">The permanent Guid which should represent this data type.</param>
        /// <param name="dataTypeNamespace">Namespace of the type.</param>
        /// <param name="dataTypeName">Name of the type.</param>
        /// <param name="isCodeGenerated">True if this type is dynamically compiled.</param>
        public DataTypeDescriptor(Guid dataTypeId, string dataTypeNamespace, string dataTypeName, bool isCodeGenerated)
            : this()
        {
            this.DataTypeId = dataTypeId;
            this.Namespace = dataTypeNamespace;
            this.Name = dataTypeName;
            this.IsCodeGenerated = isCodeGenerated;
        }


        /// <summary>
        /// Instantiates an instance of <see cref="DataTypeDescriptor"/> with a custom Type Manager.
        /// </summary>
        /// <param name="dataTypeId">The permanent Guid which should represent this data type.</param>
        /// <param name="dataTypeNamespace">Namespace of the type.</param>
        /// <param name="dataTypeName">Name of the type.</param>
        /// <param name="typeManagerTypeName">If this data type has a custom type manager</param>
        public DataTypeDescriptor(Guid dataTypeId, string dataTypeNamespace, string dataTypeName, string typeManagerTypeName)
            : this()
        {
            this.DataTypeId = dataTypeId;
            this.Namespace = dataTypeNamespace;
            this.Name = dataTypeName;
            this.TypeManagerTypeName = typeManagerTypeName;
            this.IsCodeGenerated = false;
        }


        /// <summary>
        /// Instantiates an instance of <see cref="DataTypeDescriptor"/> with a custom Type Manager.
        /// </summary>
        /// <param name="dataTypeId">The permanent Guid which should represent this data type.</param>
        /// <param name="dataTypeNamespace">Namespace of the type.</param>
        /// <param name="dataTypeName">Name of the type.</param>
        /// <param name="typeManagerTypeName">If this data type has a custom type manager</param>
        /// <param name="isCodeGenerated">True if this type is dynamically compiled.</param>
        public DataTypeDescriptor(Guid dataTypeId, string dataTypeNamespace, string dataTypeName, string typeManagerTypeName, bool isCodeGenerated)
            : this()
        {
            this.DataTypeId = dataTypeId;
            this.Namespace = dataTypeNamespace;
            this.Name = dataTypeName;
            this.TypeManagerTypeName = typeManagerTypeName;
            this.IsCodeGenerated = isCodeGenerated;
        }


        /// <summary>
        /// The data types permant id.
        /// </summary>
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


        /// <summary>
        /// Primary keys.
        /// </summary>
        public DataFieldNameCollection KeyPropertyNames { get; set; }


        /// <summary>
        /// Version keys, appear in the physical order but not included in data references.
        /// </summary>
        public DataFieldNameCollection VersionKeyPropertyNames { get; set; }


        /// <summary>
        /// Version keys, appear in the physical order but not included in data references.
        /// </summary>
        internal IEnumerable<string> PhysicalKeyPropertyNames => KeyPropertyNames.Concat(VersionKeyPropertyNames);

        /// <summary>
        /// Returns the CLT Type for this data type description.
        /// </summary>
        /// <returns></returns>
        public Type GetInterfaceType()
        {
            if (this.TypeManagerTypeName == null)
            {
                throw new InvalidOperationException("The TypeManagerTypeName has not been set");
            }

            return DataTypeTypesManager.GetDataType(this);
        }



        /// <summary>
        /// Type name of the Type Manager responsible for this data type.
        /// </summary>
        public string TypeManagerTypeName { get; set; }



        /// <summary>
        /// A list of field names that the provider should use when physically storing data. 
        /// Select ordering is not (necessarily) influenced by this setting.
        /// </summary>
        public DataFieldNameCollection StoreSortOrderFieldNames { get; set; }


        /// <summary>The fields (aka properties or columns) of the type.</summary>
        public DataFieldDescriptorCollection Fields { get; set; }

        /// <summary>
        /// Physical key fields. Note that the order of the fields is important.
        /// The physical key ensure that storage identity is unique across different versions of data with shared id.
        /// </summary>
        internal IEnumerable<DataFieldDescriptor> PhysicalKeyFields
        {
            get
            {
                Func<string, DataFieldDescriptor> getField = fieldName =>
                    this.Fields.Where(field => field.Name == fieldName)
                        .SingleOrException("Missing a field '{0}'", "Multiple fields with name '{0}'", fieldName);

                return PhysicalKeyPropertyNames.Select(getField);
            }
        }

        /// <summary>
        /// Indexes.
        /// </summary>
        public IReadOnlyCollection<DataTypeIndex> Indexes
        {
            get { return _indexes; }
            set
            {
                Verify.That(value.Count(idx => idx.Clustered) < 2, "It is not allowed to have more than one clustered index");

                _indexes = value;
            }
        }

        internal bool PrimaryKeyIsClusteredIndex
        {
            get
            {
                return !HasCustomPhysicalSortOrder && !Indexes.Any(i => i.Clustered);
            }
        }

        /// <summary>The short name of the type, without namespace and assembly info</summary>
        public string Name
        {
            get { return _name; }
            set { _name = NameValidation.ValidateName(value); }
        }


        /// <summary>
        /// The data types namespace 
        /// </summary>
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


        /// <summary>
        /// The data types title
        /// </summary>
        public string Title { get; set; }


        /// <summary>
        /// The name of field to use when labeling data of this type.
        /// </summary>
        public string LabelFieldName { get; set; }


        /// <summary>
        /// The internal url name
        /// </summary>
        public string InternalUrlPrefix { get; set; }


        /// <summary>
        /// True if the interface code for this type is created via code generation. False for statically compiled types.
        /// </summary>
        public bool IsCodeGenerated { get; private set; }

        /// <summary>
        /// When <value>true</value> data of this type may be cached.
        /// </summary>
        public bool Cachable { get; internal set; }

        /// <summary>
        /// When <value>true</value> the data of this type is searchable.
        /// </summary>
        public bool Searchable { get; internal set; }

        /// <summary>
        /// When true this type has a physical sortorder specified.
        /// </summary>
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


        /// <summary>
        /// The data scopes this data type exist in. Typically always "public". Also "administrated" if this type supports publishing.
        /// </summary>
        public List<DataScopeIdentifier> DataScopes { get; set; }


        /// <summary>
        /// When true data can be localized.
        /// </summary>
        public bool Localizeable => SuperInterfaces.Contains(typeof(ILocalizedControlled));


        /// <summary>
        /// Type name for custom handler to use when building new instances of the data type.
        /// </summary>
        public string BuildNewHandlerTypeName
        {
            get;
            set;
        }

        /// <summary>
        /// Adds an interface the data type should inherit from
        /// </summary>
        /// <param name="interfaceType"></param>
        public void AddSuperInterface(Type interfaceType)
        {
            AddSuperInterface(interfaceType, true);
        }

        /// <summary>
        /// Adds an interface the data type should inherit from
        /// </summary>
        /// <param name="interfaceType"></param>
        /// <param name="addInheritedFields"></param>
        internal void AddSuperInterface(Type interfaceType, bool addInheritedFields)
        {
            if (_superInterfaces.Contains(interfaceType) || interfaceType == typeof (IData))
            {
                return;
            }

            _superInterfaces.Add(interfaceType);

            if (addInheritedFields)
            {
                foreach (PropertyInfo propertyInfo in interfaceType.GetProperties())
                {
                    if (propertyInfo.Name == nameof(IPageData.PageId) && interfaceType == typeof (IPageData))
                    {
                        continue;
                    }

                    DataFieldDescriptor dataFieldDescriptor = ReflectionBasedDescriptorBuilder.BuildFieldDescriptor(propertyInfo, true);

                    this.Fields.Add(dataFieldDescriptor);
                }
            }

            foreach (string propertyName in interfaceType.GetKeyPropertyNames())
            {
                if (KeyPropertyNames.Contains(propertyName)) continue;

                PropertyInfo property = ReflectionBasedDescriptorBuilder.FindProperty(interfaceType, propertyName);

                if (DynamicTypeReflectionFacade.IsKeyField(property))
                {
                    this.KeyPropertyNames.Add(propertyName, false);
                }
            }

            foreach (var dataScopeIdentifier in DynamicTypeReflectionFacade.GetDataScopes(interfaceType))
            {
                if (!this.DataScopes.Contains(dataScopeIdentifier))
                {
                    this.DataScopes.Add(dataScopeIdentifier);
                }
            }

            var superInterfaces = interfaceType.GetInterfaces().Where(t => typeof (IData).IsAssignableFrom(t));
            foreach (Type superSuperInterfaceType in superInterfaces)
            {
                AddSuperInterface(superSuperInterfaceType, addInheritedFields);
            }
        }





        /// <summary>
        /// Removes a super interface
        /// </summary>
        /// <param name="interfaceType">Type to remove</param>
        public void RemoveSuperInterface(Type interfaceType)
        {
            if (interfaceType == typeof(IData))
            {
                return;
            }

            if (_superInterfaces.Contains(interfaceType))
            {
                _superInterfaces.Remove(interfaceType);
            }

            foreach (PropertyInfo propertyInfo in interfaceType.GetProperties())
            {
                var dataFieldDescriptor = ReflectionBasedDescriptorBuilder.BuildFieldDescriptor(propertyInfo, true);

                if (this.Fields.Contains(dataFieldDescriptor))
                {
                    this.Fields.Remove(dataFieldDescriptor);
                }

                if (DynamicTypeReflectionFacade.IsKeyField(propertyInfo) &&
                    this.KeyPropertyNames.Contains(propertyInfo.Name))
                {
                    this.KeyPropertyNames.Remove(propertyInfo.Name);
                }
            }


            foreach (var dataScopeIdentifier in DynamicTypeReflectionFacade.GetDataScopes(interfaceType))
            {
                if (this.DataScopes.Contains(dataScopeIdentifier))
                {
                    this.DataScopes.Remove(dataScopeIdentifier);
                }
            }

            var superInterfaces = interfaceType.GetInterfaces().Where(t => typeof (IData).IsAssignableFrom(t));
            foreach (Type superInterfaceType in superInterfaces)
            {
                RemoveSuperInterface(superInterfaceType);
            }
        }



        /// <summary>
        /// All interfaces this data type inherit from
        /// </summary>
        public IEnumerable<Type> SuperInterfaces => _superInterfaces;


        /// <summary>
        /// Attached a associated to another data type, like page meta data or page folder data.
        /// </summary>
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


        /// <summary>
        /// True when the data type is associated to C1 CMS pages as an agregation
        /// </summary>
        public bool IsPageFolderDataType
        {
            get
            {
                return
                    this.DataAssociations.Any(f => f.AssociatedInterfaceType == typeof(IPage) && f.AssociationType == DataAssociationType.Aggregation);
            }
        }


        /// <summary>
        /// True when the data type is associated to C1 CMS pages as an composition
        /// </summary>
        public bool IsPageMetaDataType
        {
            get
            {
                return this.DataAssociations.Any(f => f.AssociatedInterfaceType == typeof(IPage) 
                                                   && f.AssociationType == DataAssociationType.Composition);
            }
        }


        /// <summary>
        /// Resets the list of interfaces this data type inherit from
        /// </summary>
        /// <param name="superInterfaces"></param>
        internal void SetSuperInterfaces(List<Type> superInterfaces)
        {
            _superInterfaces = superInterfaces;
        }


        /// <summary>
        /// Validate the data type description or throw an exception.
        /// </summary>
        public void Validate()
        {
            try
            {
                if (this.DataTypeId == Guid.Empty) throw new InvalidOperationException("The type descriptor property DataTypeId can not be empty");
                if (string.IsNullOrEmpty(this.Namespace)) throw new InvalidOperationException("The type descriptor property Namespace can not be empty");
                if (string.IsNullOrEmpty(this.Name)) throw new InvalidOperationException("The type descriptor property Name can not be empty");
                if (string.IsNullOrEmpty(this.TypeManagerTypeName)) throw new InvalidOperationException("The type descriptor property TypeManagerTypeName can not be empty");
                if (this.Fields.Count == 0) throw new InvalidOperationException("The type descriptors Fields collection may not be empty");
                if (this.KeyPropertyNames.Count == 0) throw new InvalidOperationException("The type descriptors KeyFieldNames collection may not be empty");
                if (this.DataScopes.Count == 0) throw new InvalidOperationException("The DataScopes list containing the list of data scopes this type must support can not be empty. Please provide at least one data scopes.");
                if (this.DataScopes.Select(f => f.Name).Distinct().Count() != this.DataScopes.Count) throw new InvalidOperationException("The DataScopes list contains redundant data scopes");

                this.KeyPropertyNames.ValidateMembers();
                this.StoreSortOrderFieldNames.ValidateMembers();

                if (this.LabelFieldName != null)
                {
                    if (!this.Fields.Any(f => f.Name == this.LabelFieldName))
                    {
                        throw new InvalidOperationException($"The label field name '{this.LabelFieldName}' is not an existing field");
                    }
                }

                int distinctForeignKeyPropertyNames =
                    (from assDec in this.DataAssociations
                     select assDec.ForeignKeyPropertyName).Distinct().Count();

                if (distinctForeignKeyPropertyNames != this.DataAssociations.Count)
                {
                    throw new InvalidOperationException("Two or more data associations are using the same foreign key field");
                }

                int distinctAssociatedInterfaceType =
                    (from assDec in this.DataAssociations
                     select assDec.AssociatedInterfaceType).Distinct().Count();

                if (distinctAssociatedInterfaceType != this.DataAssociations.Count)
                {
                    throw new InvalidOperationException("Two or more data associations are associated to the same interface type");
                }
            }
            catch (Exception ex)
            {
                string typeName = string.IsNullOrEmpty(this.TypeManagerTypeName) ? this.Name : this.TypeManagerTypeName;
                throw new InvalidOperationException($"Failed to validate data type description for '{typeName}'.", ex);
            }
        }



        /// <summary>
        /// Clones the data type description.
        /// </summary>
        /// <returns>A clone</returns>
        public DataTypeDescriptor Clone()
        {
            var dataTypeDescriptor = new DataTypeDescriptor(this.DataTypeId, this.Namespace, this.Name, this.TypeManagerTypeName, this.IsCodeGenerated)
            {
                Title = this.Title,
                BuildNewHandlerTypeName = this.BuildNewHandlerTypeName,
                LabelFieldName = this.LabelFieldName,
                InternalUrlPrefix = this.InternalUrlPrefix,
                Searchable = this.Searchable
            };

            foreach (DataTypeAssociationDescriptor dataTypeAssociationDescriptor in this.DataAssociations)
            {
                dataTypeDescriptor.DataAssociations.Add(dataTypeAssociationDescriptor.Clone());
            }

            dataTypeDescriptor.DataScopes = new List<DataScopeIdentifier>(this.DataScopes);

            foreach (DataFieldDescriptor dataFieldDescriptor in this.Fields)
            {
                if (!dataFieldDescriptor.Inherited)
                {
                    dataTypeDescriptor.Fields.Add(dataFieldDescriptor.Clone());
                }
            }


            foreach (string keyPropertyName in this.KeyPropertyNames)
            {
                dataTypeDescriptor.KeyPropertyNames.Add(keyPropertyName, false);
            }

            foreach (string storeSortOrderFieldNames in this.StoreSortOrderFieldNames)
            {
                dataTypeDescriptor.StoreSortOrderFieldNames.Add(storeSortOrderFieldNames, false);
            }

            foreach (Type superInterface in this.SuperInterfaces)
            {
                dataTypeDescriptor.AddSuperInterface(superInterface);
            }

            return dataTypeDescriptor;
        }



        /// <summary>
        /// Serialize the data type description to XML
        /// </summary>
        /// <returns>Serialized data type descriptor</returns>
        public XElement ToXml()
        {
            var element = new XElement("DataTypeDescriptor",
                new XAttribute("dataTypeId", this.DataTypeId),
                new XAttribute("name", this.Name),
                new XAttribute("namespace", this.Namespace),
                this.Title != null ? new XAttribute("title", this.Title) : null,
                new XAttribute("isCodeGenerated", this.IsCodeGenerated),
                new XAttribute("cachable", this.Cachable),
                new XAttribute("searchable", this.Searchable),
                this.LabelFieldName != null ? new XAttribute("labelFieldName", this.LabelFieldName) : null,
                !string.IsNullOrEmpty(this.InternalUrlPrefix) ? new XAttribute("internalUrlPrefix", this.InternalUrlPrefix) : null,
                this.TypeManagerTypeName != null ? new XAttribute("typeManagerTypeName", this.TypeManagerTypeName) : null,
                !string.IsNullOrEmpty(this.BuildNewHandlerTypeName) ? new XAttribute("buildNewHandlerTypeName", this.BuildNewHandlerTypeName) : null);


            element.Add(new[]
            {
                new XElement("DataAssociations",
                              DataAssociations.Select(da => da.ToXml())),
                new XElement("DataScopes", 
                              DataScopes.Select(dsi => new XElement("DataScopeIdentifier", new XAttribute("name", dsi)))),
                new XElement("KeyPropertyNames",
                              KeyPropertyNames.Select(name => new XElement("KeyPropertyName", new XAttribute("name", name)))),
                VersionKeyPropertyNames.Any() 
                    ? new XElement("VersionKeyPropertyNames",
                            VersionKeyPropertyNames.Select(name => new XElement("VersionKeyPropertyName", new XAttribute("name", name))))
                    : null,
                new XElement("SuperInterfaces", 
                              SuperInterfaces.Select(su => new XElement("SuperInterface", new XAttribute("type", TypeManager.SerializeType(su))))),
                new XElement("Fields", Fields.Select(f => f.ToXml()))
            });
            
            if (Indexes.Any())
            {
                element.Add(new XElement("Indexes", Indexes.Select(i => i.ToXml())));   
            }

            return element;
        }


        /// <summary>
        /// Deserializes a data type descriptor
        /// </summary>
        /// <param name="element">A serialized (XML) data type descriptor</param>
        /// <returns>De-serialized data type descriptor</returns>
        public static DataTypeDescriptor FromXml(XElement element)
        {
            return FromXml(element, true);
        }

        internal static DataTypeDescriptor FromXml(XElement element, bool inheritedFieldsIncluded)
        {
            Verify.ArgumentNotNull(element, "element");
            if (element.Name != "DataTypeDescriptor") throw new ArgumentException("The xml is not correctly formatted.");


            Guid dataTypeId = (Guid) element.GetRequiredAttribute("dataTypeId");
            string name = element.GetRequiredAttributeValue("name");
            string @namespace = element.GetRequiredAttributeValue("namespace");

            bool isCodeGenerated = (bool) element.GetRequiredAttribute("isCodeGenerated");
            XAttribute cachableAttribute = element.Attribute("cachable");
            XAttribute searchableAttribute = element.Attribute("searchable");
            XAttribute buildNewHandlerTypeNameAttribute = element.Attribute("buildNewHandlerTypeName");
            XElement dataAssociationsElement = element.GetRequiredElement("DataAssociations");
            XElement dataScopesElement = element.GetRequiredElement("DataScopes");
            XElement keyPropertyNamesElement = element.GetRequiredElement("KeyPropertyNames");
            XElement versionKeyPropertyNamesElement = element.Element("VersionKeyPropertyNames");
            XElement superInterfacesElement = element.GetRequiredElement("SuperInterfaces");
            XElement fieldsElement = element.GetRequiredElement("Fields");
            XElement indexesElement = element.Element("Indexes");

            XAttribute titleAttribute = element.Attribute("title");
            XAttribute labelFieldNameAttribute = element.Attribute("labelFieldName");
            XAttribute internalUrlPrefixAttribute = element.Attribute("internalUrlPrefix");
            string typeManagerTypeName = (string) element.Attribute("typeManagerTypeName");

            bool cachable = cachableAttribute != null && (bool)cachableAttribute;
            bool searchable = searchableAttribute != null && (bool)searchableAttribute;
            

            var dataTypeDescriptor = new DataTypeDescriptor(dataTypeId, @namespace, name, isCodeGenerated)
            {
                Cachable = cachable,
                Searchable = searchable
            };

            if (titleAttribute != null) dataTypeDescriptor.Title = titleAttribute.Value;
            if (labelFieldNameAttribute != null) dataTypeDescriptor.LabelFieldName = labelFieldNameAttribute.Value;
            if (internalUrlPrefixAttribute != null) dataTypeDescriptor.InternalUrlPrefix = internalUrlPrefixAttribute.Value;
            if (typeManagerTypeName != null)
            {
                typeManagerTypeName = TypeManager.FixLegasyTypeName(typeManagerTypeName);
                dataTypeDescriptor.TypeManagerTypeName = typeManagerTypeName;
            }
            if (buildNewHandlerTypeNameAttribute != null) dataTypeDescriptor.BuildNewHandlerTypeName = buildNewHandlerTypeNameAttribute.Value;


            foreach (XElement elm in dataAssociationsElement.Elements())
            {
                var dataTypeAssociationDescriptor = DataTypeAssociationDescriptor.FromXml(elm);

                dataTypeDescriptor.DataAssociations.Add(dataTypeAssociationDescriptor);
            }

            foreach (XElement elm in dataScopesElement.Elements("DataScopeIdentifier"))
            {
                string dataScopeName = elm.GetRequiredAttributeValue("name");
                if (DataScopeIdentifier.IsLegasyDataScope(dataScopeName))
                {
                    Log.LogWarning(LogTitle, "Ignored legacy data scope '{0}' on type '{1}.{2}' while deserializing DataTypeDescriptor. The '{0}' data scope is no longer supported.".FormatWith(dataScopeName, @namespace, name));
                    continue;
                }

                DataScopeIdentifier dataScopeIdentifier = DataScopeIdentifier.Deserialize(dataScopeName);

                dataTypeDescriptor.DataScopes.Add(dataScopeIdentifier);
            }

            foreach (XElement elm in superInterfacesElement.Elements("SuperInterface"))
            {
                string superInterfaceTypeName = elm.GetRequiredAttributeValue("type");

                if (superInterfaceTypeName.StartsWith("Composite.Data.ProcessControlled.IDeleteControlled"))
                {
                    Log.LogWarning(LogTitle, $"Ignored legacy super interface '{superInterfaceTypeName}' on type '{@namespace}.{name}' while deserializing DataTypeDescriptor. This super interface is no longer supported.");
                    continue;
                }
                
                Type superInterface;

                try
                {
                    superInterface = TypeManager.GetType(superInterfaceTypeName);
                }
                catch (Exception ex)
                {
                    throw XmlConfigurationExtensionMethods.GetConfigurationException($"Failed to load super interface '{superInterfaceTypeName}'", ex, elm);
                }

                dataTypeDescriptor.AddSuperInterface(superInterface, !inheritedFieldsIncluded);
            }

            foreach (XElement elm in fieldsElement.Elements())
            {
                var dataFieldDescriptor = DataFieldDescriptor.FromXml(elm);

                try
                {
                    dataTypeDescriptor.Fields.Add(dataFieldDescriptor);
                }
                catch (Exception ex)
                {
                    throw XmlConfigurationExtensionMethods.GetConfigurationException("Failed to add a data field: " + ex.Message, ex, elm);
                }
            }

            foreach (XElement elm in keyPropertyNamesElement.Elements("KeyPropertyName"))
            {
                var propertyName = elm.GetRequiredAttributeValue("name");

                bool isDefinedOnSuperInterface = dataTypeDescriptor.SuperInterfaces.Any(f => f.GetProperty(propertyName) != null);
                if (!isDefinedOnSuperInterface)
                {
                    dataTypeDescriptor.KeyPropertyNames.Add(propertyName);
                }
            }

            if (versionKeyPropertyNamesElement != null)
            {
                foreach (XElement elm in versionKeyPropertyNamesElement.Elements("VersionKeyPropertyName"))
                {
                    var propertyName = elm.GetRequiredAttributeValue("name");

                    dataTypeDescriptor.VersionKeyPropertyNames.Add(propertyName);
                }
            }

            if (indexesElement != null)
            {
                dataTypeDescriptor.Indexes = indexesElement.Elements("Index").Select(DataTypeIndex.FromXml).ToList();
            }

            // Loading field rendering profiles for static data types
            if (!isCodeGenerated && typeManagerTypeName != null)
            {
                Type type = Type.GetType(typeManagerTypeName);
                if (type != null)
                {
                    foreach (var fieldDescriptor in dataTypeDescriptor.Fields)
                    {
                        var property = type.GetProperty(fieldDescriptor.Name);

                        if (property != null)
                        {
                            var formRenderingProfile = DynamicTypeReflectionFacade.GetFormRenderingProfile(property);
                            if (formRenderingProfile != null)
                            {
                                fieldDescriptor.FormRenderingProfile = formRenderingProfile;
                            }
                        }
                    }
                }
            }
            

            return dataTypeDescriptor;
        }

        /// <exclude />
        public override int GetHashCode()
        {
            return this.DataTypeId.GetHashCode();
        }



        /// <exclude />
        public override bool Equals(object obj)
        {
            return Equals(obj as DataTypeDescriptor);
        }



        /// <exclude />
        public bool Equals(DataTypeDescriptor dataTypeDescriptor)
        {
            return dataTypeDescriptor != null && dataTypeDescriptor.DataTypeId == this.DataTypeId;
        }


        /// <exclude />
        public override string ToString()
        {
            if (this.Namespace == "")
            {
                return this.Name;
            }

            return this.Namespace + "." + this.Name;
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class DataTypeDescriptorExtensions
    {
        /// <summary>
        /// This method returns the full interface name. F.e. "Composite.Data.Types.IPage"
        /// </summary>
        /// <param name="dataTypeDescriptor"></param>
        /// <returns></returns>
        public static string GetFullInterfaceName(this DataTypeDescriptor dataTypeDescriptor)
        {
            return dataTypeDescriptor.Namespace + "." + dataTypeDescriptor.Name;
        }


        /// <summary>
        /// This method will return false if the type is not code generated and does exists
        /// </summary>
        /// <param name="dataTypeDescriptor"></param>
        /// <returns></returns>
        public static bool ValidateRuntimeType(this DataTypeDescriptor dataTypeDescriptor)
        {
            Verify.ArgumentNotNull(dataTypeDescriptor, "dataTypeDescriptor");

            if (dataTypeDescriptor.IsCodeGenerated) return true;

            Type dataType = TypeManager.TryGetType(dataTypeDescriptor.TypeManagerTypeName);
            return dataType != null;
        }
    }
}
