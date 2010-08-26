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


        public DataFieldDescriptor(Guid id, string name, StoreFieldType storeType, Type instanceType)
            : this(id, name, storeType, instanceType, false)
        {
            _id = id;
            _name = NameValidation.ValidateName(name);
            this.StoreType = storeType;
            this.InstanceType = instanceType;
            this.FormRenderingProfile = new DataFieldFormRenderingProfile();
        }


        public DataFieldDescriptor(Guid id, string name, StoreFieldType storeType, Type instanceType, bool inherited)
        {
            _id = id;
            _name = NameValidation.ValidateName(name);
            this.StoreType = storeType;
            this.InstanceType = instanceType;
            this.FormRenderingProfile = new DataFieldFormRenderingProfile();
            this.Inherited = inherited;
        }


        public int Position { get; set; }

        public int GroupByPriority { get; set; }

        public DataFieldFormRenderingProfile FormRenderingProfile { get; set; }


        /// <summary>
        /// Specify the TypeManager type name for the type this field references. Null if this is not a reference field.
        /// </summary>
        public string ForeignKeyReferenceTypeName { get; set; }

        public Type InstanceType { get; set; }


        public string Name
        {
            get { return _name; }
            set { _name = NameValidation.ValidateName(value); }
        }


        public Guid Id
        {
            get { return _id; }
        }


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


        public bool IsNullable
        {
            get { return _isNullable; }
            set
            {
                if (value == true)
                {
                    if (this.InstanceType.IsEnum == true) throw new InvalidOperationException("The associated instance type is an enum, which is not nullable");
                    if (this.InstanceType.IsValueType == true)
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


        public bool Inherited
        {
            get;
            private set;
        }



        public List<string> ValidationFunctionMarkup
        {
            get;
            set;
        }



        public string NewInstanceDefaultFieldValue
        {
            get;
            set;
        }



        public DataFieldDescriptor Clone()
        {
            DataFieldDescriptor dataFieldDescriptor = new DataFieldDescriptor(this.Id, this.Name, this.StoreType, this.InstanceType);

            if (this.DefaultValue != null)
            {
                dataFieldDescriptor.DefaultValue = this.DefaultValue.Clone();
            }
            dataFieldDescriptor.ForeignKeyReferenceTypeName = this.ForeignKeyReferenceTypeName;
            dataFieldDescriptor.FormRenderingProfile = new DataFieldFormRenderingProfile { HelpText = this.FormRenderingProfile.HelpText, Label = this.FormRenderingProfile.Label, WidgetFunctionMarkup = this.FormRenderingProfile.WidgetFunctionMarkup };
            dataFieldDescriptor.GroupByPriority = this.GroupByPriority;
            dataFieldDescriptor.Inherited = this.Inherited;
            dataFieldDescriptor.IsNullable = this.IsNullable;
            dataFieldDescriptor.Position = this.Position;
            dataFieldDescriptor.ValidationFunctionMarkup = new List<string>(this.ValidationFunctionMarkup);
            dataFieldDescriptor.NewInstanceDefaultFieldValue = this.NewInstanceDefaultFieldValue;

            return dataFieldDescriptor;
        }



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
            XAttribute newInstanceDefaultFieldValueAttribute = element.Attribute("newInstanceDefaultFieldValue");

            if (groupByPriorityAttribute==null) groupByPriorityAttribute = new XAttribute("groupByPriority", "0" );

            if ((idAttribute == null) || (nameAttribute == null) || (isNullableAttribute == null) || (positionAttribute == null) || (inheritedAttribute == null) || (instanceTypeAttribute == null) || (storeTypeAttribute == null)) throw new ArgumentException("The xml is not correctly formattet");

            XAttribute defaultValueAttribute = element.Attribute("defaultValue");
            XAttribute foreignKeyReferenceTypeNameAttribute = element.Attribute("foreignKeyReferenceTypeName");
            XElement formRenderingProfileElement = element.Element("FormRenderingProfile");
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
                dataFieldDescriptor.ForeignKeyReferenceTypeName = foreignKeyReferenceTypeNameAttribute.Value;
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


        public override bool Equals(object obj)
        {
            return Equals(obj as DataFieldDescriptor);
        }


        public bool Equals(DataFieldDescriptor dataFieldDescriptor)
        {
            if (dataFieldDescriptor == null) return false;

            return dataFieldDescriptor.Id == this.Id;
        }


        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }
    }
}
