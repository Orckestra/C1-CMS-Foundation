using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Xml.Linq;
using Composite.Core.Types;
using Composite.Data.DynamicTypes.Configuration;


namespace Composite.Data.DynamicTypes
{
    /// <summary>
    /// Describe a field on a <see cref="DataTypeDescriptor"/>.
    /// </summary>
    [Serializable]
    [DebuggerDisplay("Name = {Name}, Inherited = {Inherited}")]
    public sealed class DataFieldDescriptor
    {
        private bool _isNullable;
        private StoreFieldType _storeType;
        private DefaultValue _defaultValue;
        private string _name;

        private readonly Guid _id;


        /// <summary>
        /// Constructs a new instance.
        /// </summary>
        /// <param name="id">Permanent unique id for this field. This should never change.</param>
        /// <param name="name">Name (programmatic) of field.</param>
        /// <param name="storeType">Type to use when storing field.</param>
        /// <param name="instanceType">Type to use when field is exposed to .NET.</param>
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



        /// <summary>
        /// Constructs a new instance.
        /// </summary>
        /// <param name="id">Permanent unique id for this field. This should never change.</param>
        /// <param name="name">Name (programmatic) of field </param>
        /// <param name="storeType">Type to use when storing field</param>
        /// <param name="instanceType">Type to use when field is exposed to .NET</param>
        /// <param name="inherited">True when this field is inherited from a super interface.</param>
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


        /// <summary>
        /// Position, relative to other fields.
        /// </summary>
        public int Position { get; set; }


        /// <summary>
        /// For grouping (ex. tree views), the priority of this field, relative to other fields. Lowest number gets grouped first. 
        /// 0 means no grouping on this field.
        /// </summary>
        public int GroupByPriority { get; set; }


        /// <summary>
        /// Describe how this field should be edited in a form view
        /// </summary>
        public DataFieldFormRenderingProfile FormRenderingProfile { get; set; }


        /// <summary>
        /// Describe how this field should be part of a URL
        /// </summary>
        public DataUrlProfile DataUrlProfile { get; set; }

        /// <summary>
        /// Describe how this field should influence ordering of items in a tree view
        /// </summary>
        public DataFieldTreeOrderingProfile TreeOrderingProfile { get; set; }


        /// <summary>
        /// Specify the TypeManager type name for the type this field references. Null if this is not a reference field.
        /// </summary>
        public string ForeignKeyReferenceTypeName { get; set; }


        /// <summary>
        /// The CLR type of the field.
        /// </summary>
        public Type InstanceType { get; set; }


        /// <summary>
        /// Programmatic name of the field.
        /// </summary>
        public string Name
        {
            get { return _name; }
            set { _name = NameValidation.ValidateName(value); }
        }


        /// <summary>
        /// Permanent unique id for the field. This should never change.
        /// </summary>
        public Guid Id
        {
            get { return _id; }
        }


        /// <summary>
        /// Describe how this field should be sored physically.
        /// </summary>
        public StoreFieldType StoreType
        {
            get { return _storeType; }
            set
            {
                _storeType = value;
                if (_defaultValue != null && !_defaultValue.IsAssignableTo(_storeType))
                {
                    _defaultValue = null;
                }
            }
        }


        /// <summary>
        /// Default value for the field, to be used for the physical store. See also <see cref="NewInstanceDefaultFieldValue"/>
        /// </summary>
        public DefaultValue DefaultValue
        {
            get
            {
                return _defaultValue;
            }
            set
            {
                if (value != null && !value.IsAssignableTo(_storeType))
                {
                    throw new InvalidOperationException("The DefaultValue must be assignable to the StoreType");
                }

                _defaultValue = value;
            }
        }


        /// <summary>
        /// True when this field can be NULL
        /// </summary>
        public bool IsNullable
        {
            get { return _isNullable; }
            set
            {
                if (value)
                {
                    var type = InstanceType;

                    if (type.IsEnum) throw new InvalidOperationException("The associated instance type is an enum, which is not nullable");
                    if (type.IsValueType && (!type.IsGenericType || type.GetGenericTypeDefinition() != typeof(Nullable<>)))
                    {
                        throw new InvalidOperationException(string.Format("The associated instante type '{0}' is a value type, which is not nullable", type.Name));
                    }
                }
                _isNullable = value;
            }
        }


        /// <summary>
        /// True when this field is inherited from a super interface.
        /// </summary>
        public bool Inherited
        {
            get;
            private set;
        }



        /// <summary>
        /// True when data in this field can not be changed.
        /// </summary>
        public bool IsReadOnly
        {
            get;
            set;
        }



        /// <summary>
        /// Function markup that can deliver validators for this field. They will execute and validate if values set on this field is valid.
        /// </summary>
        public List<string> ValidationFunctionMarkup
        {
            get;
            set;
        }



        /// <summary>
        /// Default value to set on new instances of this field.
        /// </summary>
        public string NewInstanceDefaultFieldValue
        {
            get;
            set;
        }



        /// <summary>
        /// Create a clone of this field.
        /// </summary>
        /// <returns>The clone.</returns>
        public DataFieldDescriptor Clone()
        {
            return new DataFieldDescriptor(this.Id, this.Name, this.StoreType, this.InstanceType)
            {
                ForeignKeyReferenceTypeName = this.ForeignKeyReferenceTypeName,
                FormRenderingProfile = new DataFieldFormRenderingProfile
                {
                    HelpText = this.FormRenderingProfile.HelpText,
                    Label = this.FormRenderingProfile.Label,
                    WidgetFunctionMarkup = this.FormRenderingProfile.WidgetFunctionMarkup
                },
                TreeOrderingProfile = new DataFieldTreeOrderingProfile
                {
                    OrderPriority = this.TreeOrderingProfile.OrderPriority,
                    OrderDescending = this.TreeOrderingProfile.OrderDescending
                },
                GroupByPriority = this.GroupByPriority,
                Inherited = this.Inherited,
                IsNullable = this.IsNullable,
                Position = this.Position,
                ValidationFunctionMarkup = this.ValidationFunctionMarkup != null ? new List<string>(this.ValidationFunctionMarkup) : null,
                NewInstanceDefaultFieldValue = this.NewInstanceDefaultFieldValue,
                DataUrlProfile = this.DataUrlProfile != null ? this.DataUrlProfile.Clone() : null,
                DefaultValue = this.DefaultValue != null ? this.DefaultValue.Clone() : null
            };
        }



        /// <summary>
        /// Serialize this field description XML.
        /// </summary>
        /// <returns>Serialized field descriptor.</returns>
        public XElement ToXml()
        {
            var element = new XElement("DataFieldDescriptor",
                new XAttribute("id", this.Id),
                new XAttribute("name", this.Name),
                new XAttribute("isNullable", this.IsNullable),
                new XAttribute("position", this.Position),
                new XAttribute("groupByPriority", this.GroupByPriority),
                new XAttribute("inherited", this.Inherited),
                new XAttribute("instanceType", TypeManager.SerializeType(this.InstanceType)),
                new XAttribute("storeType", this.StoreType.Serialize()),
                new XAttribute("isReadOnly", this.IsReadOnly));
            
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

            if (this.DataUrlProfile != null)
            {
                element.Add(new XElement("DataUrlProfile",
                    new XAttribute("Order", this.DataUrlProfile.Order),
                    this.DataUrlProfile.Format != null ? new XAttribute("Format", this.DataUrlProfile.Format) : null));
            }

            if (this.TreeOrderingProfile != null && this.TreeOrderingProfile.OrderPriority.HasValue)
            {
                element.Add(new XElement("TreeOrderingProfile", 
                    new XAttribute("orderPriority", this.TreeOrderingProfile.OrderPriority),
                    new XAttribute("orderDescending", this.TreeOrderingProfile.OrderDescending)));
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



        /// <summary>
        /// Deserialize a <see cref="DataFieldDescriptor"/>.
        /// </summary>
        /// <param name="element">Deserialized DataFieldDescriptor</param>
        /// <returns></returns>
        public static DataFieldDescriptor FromXml(XElement element)
        {
            if (element.Name != "DataFieldDescriptor") throw new ArgumentException("The xml is not correctly formatted");

            Guid id = (Guid)element.GetRequiredAttribute("id");
            string name = element.GetRequiredAttributeValue("name");
            bool isNullable = (bool)element.GetRequiredAttribute("isNullable");
            int position = (int)element.GetRequiredAttribute("position");
            bool inherited = (bool)element.GetRequiredAttribute("inherited");
            XAttribute groupByPriorityAttribute = element.Attribute("groupByPriority");
            XAttribute instanceTypeAttribute = element.GetRequiredAttribute("instanceType");
            XAttribute storeTypeAttribute = element.GetRequiredAttribute("storeType");
            XAttribute isReadOnlyAttribute = element.Attribute("isReadOnly");
            XAttribute newInstanceDefaultFieldValueAttribute = element.Attribute("newInstanceDefaultFieldValue");


            bool isReadOnly = isReadOnlyAttribute != null && (bool) isReadOnlyAttribute;
            int groupByPriority = groupByPriorityAttribute != null ? (int)groupByPriorityAttribute : 0;

            XAttribute defaultValueAttribute = element.Attribute("defaultValue");
            XAttribute foreignKeyReferenceTypeNameAttribute = element.Attribute("foreignKeyReferenceTypeName");
            XElement formRenderingProfileElement = element.Element("FormRenderingProfile");
            XElement treeOrderingProfileElement = element.Element("TreeOrderingProfile");
            XElement validationFunctionMarkupsElement = element.Element("ValidationFunctionMarkups");
            XElement dataUrlProfileElement = element.Element("DataUrlProfile");

            
            
            
            Type instanceType = TypeManager.GetType(instanceTypeAttribute.Value);
            StoreFieldType storeType = StoreFieldType.Deserialize(storeTypeAttribute.Value);

            var dataFieldDescriptor = new DataFieldDescriptor(id, name, storeType, instanceType, inherited)
            {
                IsNullable = isNullable,
                Position = position,
                GroupByPriority = groupByPriority,
                IsReadOnly = isReadOnly
            };

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

                var dataFieldFormRenderingProfile = new DataFieldFormRenderingProfile();

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

            if (dataUrlProfileElement != null)
            {
                int order = (int)dataUrlProfileElement.GetRequiredAttribute("Order");
                var formatStr = (string)dataUrlProfileElement.Attribute("Format");
                DataUrlSegmentFormat? format = null;

                if (formatStr != null)
                {
                    format = (DataUrlSegmentFormat) Enum.Parse(typeof(DataUrlSegmentFormat), formatStr);
                }

                dataFieldDescriptor.DataUrlProfile = new DataUrlProfile {Order = order, Format = format};
            }

            if (treeOrderingProfileElement != null)
            {
                int? orderPriority = (int?)treeOrderingProfileElement.Attribute("orderPriority");
                bool orderDescending = (bool)treeOrderingProfileElement.Attribute("orderDescending");

                dataFieldDescriptor.TreeOrderingProfile = new DataFieldTreeOrderingProfile
                {
                    OrderPriority = orderPriority, 
                    OrderDescending = orderDescending
                };
            }

            dataFieldDescriptor.ValidationFunctionMarkup = new List<string>();
            if (validationFunctionMarkupsElement != null)
            {                
                foreach (XElement validationFunctionMarkupElement in validationFunctionMarkupsElement.Elements("ValidationFunctionMarkup"))
                {
                    string markup = validationFunctionMarkupElement.GetRequiredAttributeValue("markup");

                    dataFieldDescriptor.ValidationFunctionMarkup.Add(markup);
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
            return dataFieldDescriptor != null && dataFieldDescriptor.Id == Id;
        }


        /// <exclude />
        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }
    }
}
