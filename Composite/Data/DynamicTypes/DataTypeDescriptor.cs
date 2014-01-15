using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Types;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.ProcessControlled;
using Composite.Data.Types;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// Describes a data type in Composite C1
    /// </summary>
    [DebuggerDisplay("Type name = {Namespace + '.' + Name}")]
    public class DataTypeDescriptor
    {
        private string _name;
        private Guid _dataTypeId;
        private string _namespace;
        private string _labelFieldName;
        private List<Type> _superInterfaces = new List<Type>();
        private List<DataTypeAssociationDescriptor> _dataTypeAssociationDescriptors = new List<DataTypeAssociationDescriptor>();


        /// <summary>
        /// Instanciates an instance of <see cref="DataTypeDescriptor"/> with default settings.
        /// </summary>
        public DataTypeDescriptor()
        {
            this.Fields = new DataFieldDescriptorCollection(this);
            this.KeyPropertyNames = new DataFieldNameCollection(this.Fields, false, false, false);
            this.StoreSortOrderFieldNames = new DataFieldNameCollection(this.Fields, true, false, false);
            this.IsCodeGenerated = false;
            this.DataScopes = new List<DataScopeIdentifier>();
        }


        /// <summary>
        /// Instanciates an instance of <see cref="DataTypeDescriptor"/>.
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
        /// Instanciates an instance of <see cref="DataTypeDescriptor"/> with a custom Type Manager.
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
        /// Instanciates an instance of <see cref="DataTypeDescriptor"/> with a custom Type Manager.
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
        /// Key fields. Note that the order of the fields is important.
        /// </summary>
        internal IEnumerable<DataFieldDescriptor> KeyFields
        {
            get
            {
                return this.KeyPropertyNames.Select(fieldName => this.Fields.Single(field => field.Name == fieldName));
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


        /// <summary>
        /// True if the interface code for this type is created via code generation. False for statically compiled types.
        /// </summary>
        public bool IsCodeGenerated { get; private set; }

        /// <summary>
        /// When true data of this type may be cached.
        /// </summary>
        public bool Cachable { get; internal set; }


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
        public bool Localizeable
        {
            get
            {
                return SuperInterfaces.Contains(typeof(ILocalizedControlled));
            }
        }


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
            if ((_superInterfaces.Contains(interfaceType) == false) && (interfaceType != typeof(IData)))
            {
                _superInterfaces.Add(interfaceType);

                foreach (PropertyInfo propertyInfo in interfaceType.GetProperties())
                {
                    DataFieldDescriptor dataFieldDescriptor = ReflectionBasedDescriptorBuilder.BuildFieldDescriptor(propertyInfo, true);

                    this.Fields.Add(dataFieldDescriptor);
                }


                foreach (string propertyName in interfaceType.GetKeyPropertyNames())
                {
                    if (KeyPropertyNames.Contains(propertyName)) continue;

                    PropertyInfo property = interfaceType.GetProperty(propertyName);
                    if (property == null)
                    {
                        List<Type> superInterfaces = interfaceType.GetInterfacesRecursively(t => typeof(IData).IsAssignableFrom(t) && t != typeof(IData));

                        foreach (Type superInterface in superInterfaces)
                        {
                            property = superInterface.GetProperty(propertyName);
                            if (property != null) break;
                        }
                    }

                    Verify.IsNotNull(property, "Missing property '{0}' on type '{1}' or one of its interfaces".FormatWith(propertyName, interfaceType));

                    if (DynamicTypeReflectionFacade.IsKeyField(property))
                    {
                        this.KeyPropertyNames.Add(propertyName, false);
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
                DataFieldDescriptor dataFieldDescriptor = ReflectionBasedDescriptorBuilder.BuildFieldDescriptor(propertyInfo, true);

                if (this.Fields.Contains(dataFieldDescriptor))
                {
                    this.Fields.Remove(dataFieldDescriptor);
                }

                if ((DynamicTypeReflectionFacade.IsKeyField(propertyInfo)) &&
                    (this.KeyPropertyNames.Contains(propertyInfo.Name)))
                {
                    this.KeyPropertyNames.Remove(propertyInfo.Name);
                }
            }


            foreach (DataScopeIdentifier dataScopeIdentifier in DynamicTypeReflectionFacade.GetDataScopes(interfaceType))
            {
                if (this.DataScopes.Contains(dataScopeIdentifier))
                {
                    this.DataScopes.Remove(dataScopeIdentifier);
                }
            }


            foreach (Type superSuperInterfaceType in interfaceType.GetInterfaces().Where(t => typeof(IData).IsAssignableFrom(t)))
            {
                RemoveSuperInterface(superSuperInterfaceType);
            }
        }



        /// <summary>
        /// All interfaces this data type inherit from
        /// </summary>
        public IEnumerable<Type> SuperInterfaces
        {
            get
            {
                return _superInterfaces;
            }
        }



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
        /// True when the data type is associated to Composite C1 pages as an agregation
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
        /// True when the data type is associated to Composite C1 pages as an composition
        /// </summary>
        public bool IsPageMetaDataType
        {
            get
            {
                return
                    this.DataAssociations.Any(f => f.AssociatedInterfaceType == typeof(IPage) && f.AssociationType == DataAssociationType.Composition);
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

                if (this.DataScopes.Any(f => f.Equals(DataScopeIdentifier.PublicName)))
                {
                    foreach (PropertyInfo propertyInfo in typeof(IPublishControlled).GetProperties())
                    {
                        if (!this.Fields.Any(f => f.Name == propertyInfo.Name))
                        {
                            throw new InvalidOperationException(string.Format("DataScope '{0}' require you to implement '{1}' and a field named '{2} is missing", DataScopeIdentifier.Public, typeof(IPublishControlled), propertyInfo.Name));
                        }
                    }
                }

                this.KeyPropertyNames.ValidateMembers();
                this.StoreSortOrderFieldNames.ValidateMembers();

                if (this.LabelFieldName != null)
                {
                    if (!this.Fields.Any(f => f.Name == this.LabelFieldName))
                    {
                        throw new InvalidOperationException(string.Format("The label field name '{0}' is not an existing field", this.LabelFieldName));
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
                string typeName = (string.IsNullOrEmpty(this.TypeManagerTypeName) ? this.Name : this.TypeManagerTypeName);
                throw new InvalidOperationException(string.Format("Failed to validate data type description for '{0}'. {1}", typeName, ex.Message));
            }
        }



        /// <summary>
        /// Clones the data type descriotion.
        /// </summary>
        /// <returns>A clone</returns>
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
                dataTypeDescriptor.KeyPropertyNames.Add(keyPropertyName, false);
            }

            dataTypeDescriptor.LabelFieldName = this.LabelFieldName;

            foreach (string storeSortOrderFieldNames in this.StoreSortOrderFieldNames)
            {
                dataTypeDescriptor.StoreSortOrderFieldNames.Add(storeSortOrderFieldNames, false);
            }

            foreach (Type superInterface in this.SuperInterfaces)
            {
                dataTypeDescriptor.AddSuperInterface(superInterface);
            }

            dataTypeDescriptor.Title = this.Title;
            dataTypeDescriptor.BuildNewHandlerTypeName = this.BuildNewHandlerTypeName;

            return dataTypeDescriptor;
        }



        /// <summary>
        /// Serialize the data type descriotion to XML
        /// </summary>
        /// <returns>Serialized data type descriptor</returns>
        public XElement ToXml()
        {
            XElement element = new XElement("DataTypeDescriptor",
                new XAttribute("dataTypeId", this.DataTypeId),
                new XAttribute("name", this.Name),
                new XAttribute("namespace", this.Namespace),
                this.Title != null ? new XAttribute("title", this.Title) : null,
                new XAttribute("hasCustomPhysicalSortOrder", this.HasCustomPhysicalSortOrder),
                new XAttribute("isCodeGenerated", this.IsCodeGenerated),
                new XAttribute("cachable", this.Cachable),
                this.LabelFieldName != null ? new XAttribute("labelFieldName", this.LabelFieldName) : null,
                this.TypeManagerTypeName != null ? new XAttribute("typeManagerTypeName", this.TypeManagerTypeName) : null,
                !string.IsNullOrEmpty(this.BuildNewHandlerTypeName) ? new XAttribute("buildNewHandlerTypeName", this.BuildNewHandlerTypeName) : null);


            element.Add(new XElement("DataAssociations",
                                     DataAssociations.Select(da => da.ToXml())));

            element.Add(new XElement("DataScopes", 
                                     DataScopes.Select(dsi => new XElement("DataScopeIdentifier", new XAttribute("name", dsi)))));

            element.Add(new XElement("KeyPropertyNames",
                                     KeyPropertyNames.Select(name => new XElement("KeyPropertyName", new XAttribute("name", name)))));

            element.Add(new XElement("SuperInterfaces", 
                                     SuperInterfaces.Select(su => new XElement("SuperInterface", new XAttribute("type", TypeManager.SerializeType(su))))));


            element.Add(new XElement("Fields",
                                     Fields
                                         .Where(f => f.Inherited == false)
                                         .Select(dataFieldDescriptor => dataFieldDescriptor.ToXml())));

            return element;
        }



        /// <summary>
        /// Deserialized a data type descriptor
        /// </summary>
        /// <param name="element">A serialized (XML) data type descriptor</param>
        /// <returns>De-serialized data type descriptor</returns>
        public static DataTypeDescriptor FromXml(XElement element)
        {
            if (element == null) throw new ArgumentNullException("element");
            if (element.Name != "DataTypeDescriptor") throw new ArgumentException("The xml is not correctly formattet");

            Func<string, XAttribute> requiredAttribute = aName => RequiredAttribute(element, aName);

            Guid dataTypeId = (Guid) requiredAttribute("dataTypeId");
            string name = (string)requiredAttribute("name");
            string @namespace = (string)requiredAttribute("namespace");

            // TODO: check why "hasCustomPhysicalSortOrder"  is not used
            bool hasCustomPhysicalSortOrder = (bool)requiredAttribute("hasCustomPhysicalSortOrder");

            bool isCodeGenerated = (bool)requiredAttribute("isCodeGenerated");
            XAttribute cachableAttribute = element.Attribute("cachable");
            XAttribute buildNewHandlerTypeNameAttribute = element.Attribute("buildNewHandlerTypeName");
            XElement dataAssociationsElement = element.Element("DataAssociations");
            XElement dataScopesElement = element.Element("DataScopes");
            XElement keyPropertyNamesElement = element.Element("KeyPropertyNames");
            // TODO: check why "superInterfaceKeyPropertyNamesElement" is not used
            // XElement superInterfaceKeyPropertyNamesElement = element.Element("SuperInterfaceKeyPropertyNames");
            XElement superInterfacesElement = element.Element("SuperInterfaces");
            XElement fieldsElement = element.Element("Fields");

            if (dataAssociationsElement == null || dataScopesElement == null || keyPropertyNamesElement == null || superInterfacesElement == null || fieldsElement == null) throw new ArgumentException("The xml is not correctly formattet");

            XAttribute titleAttribute = element.Attribute("title");
            XAttribute labelFieldNameAttribute = element.Attribute("labelFieldName");
            string typeManagerTypeName = (string) element.Attribute("typeManagerTypeName");

            bool cachable = cachableAttribute != null && (bool)cachableAttribute;
           

            DataTypeDescriptor dataTypeDescriptor = new DataTypeDescriptor(dataTypeId, @namespace, name, isCodeGenerated);
            dataTypeDescriptor.Cachable = cachable;

            if (titleAttribute != null) dataTypeDescriptor.Title = titleAttribute.Value;
            if (labelFieldNameAttribute != null) dataTypeDescriptor.LabelFieldName = labelFieldNameAttribute.Value;
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
                string dataScopeName = (string)RequiredAttribute(elm, "name");
                if (DataScopeIdentifier.IsLegasyDataScope(dataScopeName))
                {
                    Log.LogWarning("DataTypeDescriptor", "Ignored legacy data scope '{0}' on type '{1}.{2}' while deserializing DataTypeDescriptor. The '{0}' data scope is no longer supported.".FormatWith(dataScopeName, @namespace, name));
                    continue;
                }

                DataScopeIdentifier dataScopeIdentifier = DataScopeIdentifier.Deserialize(dataScopeName);

                dataTypeDescriptor.DataScopes.Add(dataScopeIdentifier);
            }

            foreach (XElement elm in superInterfacesElement.Elements("SuperInterface"))
            {
                string superInterfaceTypeName = (string) RequiredAttribute(elm, "type");

                if (!superInterfaceTypeName.StartsWith("Composite.Data.ProcessControlled.IDeleteControlled"))
                {
                    Type superInterface = TypeManager.GetType(superInterfaceTypeName);

                    dataTypeDescriptor.AddSuperInterface(superInterface);
                }
                else
                {
                    Log.LogWarning("DataTypeDescriptor", string.Format("Ignored legacy super interface '{0}' on type '{1}.{2}' while deserializing DataTypeDescriptor. This super interface is no longer supported.", superInterfaceTypeName, @namespace, name));
                }
            }

            foreach (XElement elm in fieldsElement.Elements())
            {
                DataFieldDescriptor dataFieldDescriptor = DataFieldDescriptor.FromXml(elm);

                dataTypeDescriptor.Fields.Add(dataFieldDescriptor);
            }

            foreach (XElement elm in keyPropertyNamesElement.Elements("KeyPropertyName"))
            {
                var propertyName = (string) RequiredAttribute(elm, "name");

                bool isDefinedOnSuperInterface = dataTypeDescriptor.SuperInterfaces.Any(f => f.GetProperty(propertyName) != null);
                if (!isDefinedOnSuperInterface)
                {
                    dataTypeDescriptor.KeyPropertyNames.Add(propertyName);
                }
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

        private static XAttribute RequiredAttribute(XElement element, XName attributeName)
        {
            var attr = element.Attribute(attributeName);
            Verify.IsNotNull(attr, "Missing required attribute '{0}' on <'{1}'> element", attributeName.LocalName, element.Name.LocalName);

            return attr;
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
            if (dataTypeDescriptor == null) return false;

            return dataTypeDescriptor.DataTypeId == this.DataTypeId;
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
            if (dataType == null) return false;

            return true;
        }
    }
}
