using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Xml.Linq;
using Composite.Core.Types;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable()]
    [DebuggerDisplay("Name = {Name}, Inherited = {Inherited}")]
    public sealed class DataFieldDescriptor
    {
        private bool _isNullable = false;
        private StoreFieldType _storeType;
        private DefaultValue _defaultValue;
        private string _name;

        private Guid _id;


        /// <exclude />
        public DataFieldDescriptor(Guid id, string name, StoreFieldType storeType, Type instanceType)
            : this(id, name, storeType, instanceType, false)
        {
            _id = id;
            _name = NameValidation.ValidateName(name);
            this.StoreType = storeType;
            this.InstanceType = instanceType;            
            this.FormRenderingProfile = new DataFieldFormRenderingProfile();
            this.TreeOrderingProfile = new DataFieldTreeOrderingProfile();
            this.IsReadOnly = false;
        }



        /// <exclude />
        public DataFieldDescriptor(Guid id, string name, StoreFieldType storeType, Type instanceType, bool inherited)
        {
            _id = id;
            _name = NameValidation.ValidateName(name);
            this.StoreType = storeType;
            this.InstanceType = instanceType;
            this.FormRenderingProfile = new DataFieldFormRenderingProfile();
            this.TreeOrderingProfile = new DataFieldTreeOrderingProfile();
            this.Inherited = inherited;
            this.IsReadOnly = false;
        }


        /// <exclude />
        public int Position { get; set; }


        /// <exclude />
        public int GroupByPriority { get; set; }


        /// <exclude />
        public DataFieldFormRenderingProfile FormRenderingProfile { get; set; }


        /// <exclude />
        public DataFieldTreeOrderingProfile TreeOrderingProfile { get; set; }


        /// <summary>
        /// Specify the TypeManager type name for the type this field references. Null if this is not a reference field.
        /// </summary>
        public string ForeignKeyReferenceTypeName { get; set; }


        /// <exclude />
        public Type InstanceType { get; set; }


        /// <exclude />
        public string Name
        {
            get { return _name; }
            set { _name = NameValidation.ValidateName(value); }
        }


        /// <exclude />
        public Guid Id
        {
            get { return _id; }
        }


        /// <exclude />
        public StoreFieldType StoreType
        {
            get { return _storeType; }
            set
            {
                _storeType = value;
                if (_defaultValue != null && _defaultValue.IsAssignableTo(_storeType) == false)
                    _defaultValue = null;
            }
        }


        /// <exclude />
        public DefaultValue DefaultValue
        {
            get
            {
                return _defaultValue;
            }
            set
            {
                if ((value != null) && (value.IsAssignableTo(_storeType) == false)) throw new InvalidOperationException("The DefaultValue must be assignable to the StoreType");

                _defaultValue = value;
            }
        }


        /// <exclude />
        public bool IsNullable
        {
            get { return _isNullable; }
            set
            {
                if (value)
                {
                    if (this.InstanceType.IsEnum) throw new InvalidOperationException("The associated instance type is an enum, which is not nullable");
                    if (this.InstanceType.IsValueType)
                    {
                        if (this.InstanceType.IsGenericType == false || this.InstanceType.GetGenericTypeDefinition() != typeof(Nullable<>))
                        {
                            throw new InvalidOperationException(string.Format("The associated instante type '{0}' is a value type, which is not nullable", this.InstanceType.Name));
                        }
                    }
                }
                _isNullable = value;
            }
        }


        /// <exclude />
        public bool Inherited
        {
            get;
            private set;
        }



        /// <exclude />
        public bool IsReadOnly
        {
            get;
            set;
        }



        /// <exclude />
        public List<string> ValidationFunctionMarkup
        {
            get;
            set;
        }



        /// <exclude />
        public string NewInstanceDefaultFieldValue
        {
            get;
            set;
        }



        /// <exclude />
        public DataFieldDescriptor Clone()
        {
            DataFieldDescriptor dataFieldDescriptor = new DataFieldDescriptor(this.Id, this.Name, this.StoreType, this.InstanceType);

            if (this.DefaultValue != null)
            {
                dataFieldDescriptor.DefaultValue = this.DefaultValue.Clone();
            }
            dataFieldDescriptor.ForeignKeyReferenceTypeName = this.ForeignKeyReferenceTypeName;
            dataFieldDescriptor.FormRenderingProfile = new DataFieldFormRenderingProfile { HelpText = this.FormRenderingProfile.HelpText, Label = this.FormRenderingProfile.Label, WidgetFunctionMarkup = this.FormRenderingProfile.WidgetFunctionMarkup };
            dataFieldDescriptor.TreeOrderingProfile = new DataFieldTreeOrderingProfile { OrderPriority = this.TreeOrderingProfile.OrderPriority, OrderDescending = this.TreeOrderingProfile.OrderDescending };
            dataFieldDescriptor.GroupByPriority = this.GroupByPriority;
            dataFieldDescriptor.Inherited = this.Inherited;
            dataFieldDescriptor.IsNullable = this.IsNullable;
            dataFieldDescriptor.Position = this.Position;
            dataFieldDescriptor.ValidationFunctionMarkup = this.ValidationFunctionMarkup != null ? new List<string>(this.ValidationFunctionMarkup) : null;
            dataFieldDescriptor.NewInstanceDefaultFieldValue = this.NewInstanceDefaultFieldValue;

            return dataFieldDescriptor;
        }



        /// <exclude />
        public XElement ToXml()
        {
            XElement element = new XElement("DataFieldDescriptor");

            element.Add(new XAttribute("id", this.Id));
            element.Add(new XAttribute("name", this.Name));
            element.Add(new XAttribute("isNullable", this.IsNullable));
            element.Add(new XAttribute("position", this.Position));
            element.Add(new XAttribute("groupByPriority", this.GroupByPriority));
            element.Add(new XAttribute("inherited", this.Inherited));
            element.Add(new XAttribute("instanceType", TypeManager.SerializeType(this.InstanceType)));
            element.Add(new XAttribute("storeType", this.StoreType.Serialize()));
            element.Add(new XAttribute("isReadOnly", this.IsReadOnly));
            
            if (this.NewInstanceDefaultFieldValue != null)
            {
                element.Add(new XAttribute("newInstanceDefaultFieldValue", this.NewInstanceDefaultFieldValue));
            }

            if (this.DefaultValue != null)
            {
                element.Add(new XAttribute("defaultValue", this.DefaultValue.Serialize()));
            }

            if (this.ForeignKeyReferenceTypeName != null)
            {
                element.Add(new XAttribute("foreignKeyReferenceTypeName", this.ForeignKeyReferenceTypeName));
            }

            if (this.FormRenderingProfile != null)
            {
                XElement formRenderingProfileElement = new XElement("FormRenderingProfile");
                if (this.FormRenderingProfile.Label != null)
                {
                    formRenderingProfileElement.Add(new XAttribute("label", this.FormRenderingProfile.Label));
                }
                if (this.FormRenderingProfile.HelpText != null)
                {
                    formRenderingProfileElement.Add(new XAttribute("helpText", this.FormRenderingProfile.HelpText));
                }
                if (this.FormRenderingProfile.WidgetFunctionMarkup != null)
                {
                    formRenderingProfileElement.Add(new XAttribute("widgetFunctionMarkup", this.FormRenderingProfile.WidgetFunctionMarkup));
                }
                element.Add(formRenderingProfileElement);
            }

            if (this.TreeOrderingProfile != null && this.TreeOrderingProfile.OrderPriority.HasValue)
            {
                XElement treeOrderingProfileElement = new XElement("TreeOrderingProfile");
                treeOrderingProfileElement.Add(new XAttribute("orderPriority", this.TreeOrderingProfile.OrderPriority));
                treeOrderingProfileElement.Add(new XAttribute("orderDescending", this.TreeOrderingProfile.OrderDescending));
                element.Add(treeOrderingProfileElement);
            }

            if (this.ValidationFunctionMarkup != null)
            {
                XElement elementValidationFunctionMarkup = new XElement("ValidationFunctionMarkups");
                foreach (string validationFunctionMarkup in this.ValidationFunctionMarkup)
                {
                    elementValidationFunctionMarkup.Add(new XElement("ValidationFunctionMarkup", new XAttribute("markup", validationFunctionMarkup)));
                }
                element.Add(elementValidationFunctionMarkup);
            }


            return element;
        }



        /// <exclude />
        public static DataFieldDescriptor FromXml(XElement element)
        {
            if (element.Name != "DataFieldDescriptor") throw new ArgumentException("The xml is not correctly formattet");

            XAttribute idAttribute = element.Attribute("id");
            XAttribute nameAttribute = element.Attribute("name");
            XAttribute isNullableAttribute = element.Attribute("isNullable");
            XAttribute positionAttribute = element.Attribute("position");
            XAttribute groupByPriorityAttribute = element.Attribute("groupByPriority");
            XAttribute inheritedAttribute = element.Attribute("inherited");
            XAttribute instanceTypeAttribute = element.Attribute("instanceType");
            XAttribute storeTypeAttribute = element.Attribute("storeType");
            XAttribute isReadOnlyAttribute = element.Attribute("isReadOnly");
            XAttribute newInstanceDefaultFieldValueAttribute = element.Attribute("newInstanceDefaultFieldValue");

            if (groupByPriorityAttribute==null) groupByPriorityAttribute = new XAttribute("groupByPriority", "0" );

            if ((idAttribute == null) || (nameAttribute == null) || (isNullableAttribute == null) || (positionAttribute == null) || (inheritedAttribute == null) || (instanceTypeAttribute == null) || (storeTypeAttribute == null)) throw new ArgumentException("The xml is not correctly formattet");

            if (isReadOnlyAttribute == null)
            {
                // For 3.0 backward compatibility. Future packages should contain this
                isReadOnlyAttribute = new XAttribute("isReadOnly", false);
            }

            XAttribute defaultValueAttribute = element.Attribute("defaultValue");
            XAttribute foreignKeyReferenceTypeNameAttribute = element.Attribute("foreignKeyReferenceTypeName");
            XElement formRenderingProfileElement = element.Element("FormRenderingProfile");
            XElement treeOrderingProfileElement = element.Element("TreeOrderingProfile");
            XElement validationFunctionMarkupsElement = element.Element("ValidationFunctionMarkups");

            Guid id = (Guid)idAttribute;
            string name = nameAttribute.Value;
            bool isNullable = (bool)isNullableAttribute;
            int position = (int)positionAttribute;
            int groupByPriority = (int)groupByPriorityAttribute;
            bool inherited = (bool)inheritedAttribute;
            Type instanceType = TypeManager.GetType(instanceTypeAttribute.Value);
            StoreFieldType storeType = StoreFieldType.Deserialize(storeTypeAttribute.Value);

            DataFieldDescriptor dataFieldDescriptor = new DataFieldDescriptor(id, name, storeType, instanceType, inherited);
            dataFieldDescriptor.IsNullable = isNullable;
            dataFieldDescriptor.Position = position;
            dataFieldDescriptor.GroupByPriority = groupByPriority;
            dataFieldDescriptor.IsReadOnly = (bool)isReadOnlyAttribute;

            if (newInstanceDefaultFieldValueAttribute != null)
            {
                dataFieldDescriptor.NewInstanceDefaultFieldValue = newInstanceDefaultFieldValueAttribute.Value;
            }

            if (defaultValueAttribute != null)
            {
                DefaultValue defaultValue = DefaultValue.Deserialize(defaultValueAttribute.Value);
                dataFieldDescriptor.DefaultValue = defaultValue;
            }

            if (foreignKeyReferenceTypeNameAttribute != null)
            {
                string typeName = foreignKeyReferenceTypeNameAttribute.Value;

                typeName = TypeManager.FixLegasyTypeName(typeName);

                dataFieldDescriptor.ForeignKeyReferenceTypeName = typeName;
            }

            if (formRenderingProfileElement != null)
            {
                XAttribute labelAttribute = formRenderingProfileElement.Attribute("label");
                XAttribute helpTextAttribute = formRenderingProfileElement.Attribute("helpText");
                XAttribute widgetFunctionMarkupAttribute = formRenderingProfileElement.Attribute("widgetFunctionMarkup");

                DataFieldFormRenderingProfile dataFieldFormRenderingProfile = new DataFieldFormRenderingProfile();

                if (labelAttribute != null)
                {
                    dataFieldFormRenderingProfile.Label = labelAttribute.Value;
                }

                if (helpTextAttribute != null)
                {
                    dataFieldFormRenderingProfile.HelpText = helpTextAttribute.Value;
                }

                if (widgetFunctionMarkupAttribute != null)
                {

                    dataFieldFormRenderingProfile.WidgetFunctionMarkup = widgetFunctionMarkupAttribute.Value;
                }

                dataFieldDescriptor.FormRenderingProfile = dataFieldFormRenderingProfile;
            }

            if (treeOrderingProfileElement != null)
            {
                int? orderPriority = (int?)treeOrderingProfileElement.Attribute("orderPriority");
                bool orderDescending = (bool)treeOrderingProfileElement.Attribute("orderDescending");

                DataFieldTreeOrderingProfile dataFieldTreeOrderingProfile = new DataFieldTreeOrderingProfile { OrderPriority = orderPriority, OrderDescending = orderDescending };

                dataFieldDescriptor.TreeOrderingProfile = dataFieldTreeOrderingProfile;
            }

            dataFieldDescriptor.ValidationFunctionMarkup = new List<string>();
            if (validationFunctionMarkupsElement != null)
            {                
                foreach (XElement validationFunctionMarkupElement in validationFunctionMarkupsElement.Elements("ValidationFunctionMarkup"))
                {
                    XAttribute markupAttribute = validationFunctionMarkupElement.Attribute("markup");

                    if (markupAttribute == null) throw new ArgumentException("The xml is not correctly formattet");

                    dataFieldDescriptor.ValidationFunctionMarkup.Add(markupAttribute.Value);
                }
            }

            return dataFieldDescriptor;
        }


        /// <exclude />
        public override bool Equals(object obj)
        {
            return Equals(obj as DataFieldDescriptor);
        }


        /// <exclude />
        public bool Equals(DataFieldDescriptor dataFieldDescriptor)
        {
            if (dataFieldDescriptor == null) return false;

            return dataFieldDescriptor.Id == this.Id;
        }


        /// <exclude />
        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }
    }
}
