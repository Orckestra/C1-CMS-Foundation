using System;
using System.Collections.Generic;
using Composite.Core.NewIO;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.C1Console.Forms;
using Composite.Functions;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Data.Validation;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Core.Xml;
using Composite.C1Console.Security;
using Composite.Data.Types;
using Composite.Data.DynamicTypes.Foundation;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataTypeDescriptorFormsHelper
    {
        private DataTypeDescriptor _dataTypeDescriptor;
        private List<string> _readOnlyFields = new List<string>();
        private bool _showPublicationStatusSelector;
        private string _bindingNamesPrefix;

        private string _alternateFormDefinition = null;
        private bool _alternateFormDefinitionInitialized = false;
        private string _generatedForm = null;
        private XElement _bindingsXml = null;
        private XElement _panelXml = null;

        private static readonly string _publicationStatusPostFixBindingName = "___PublicationStatus___";
        private static readonly string _publicationStatusOptionsPostFixBindingName = "___PublicationStatusOptions___";

        private static readonly XElement _cmsFormElementTemplate;
        private static readonly XElement _cmsBindingsElementTemplate;
        private static readonly XElement _cmsLayoutElementTemplate;


        static DataTypeDescriptorFormsHelper()
        {
            _cmsFormElementTemplate = XElement.Parse(string.Format(@"<cms:{0} xmlns:cms=""{1}"" xmlns=""{2}"" xmlns:f=""{3}"" />", FormKeyTagNames.FormDefinition, Namespaces.BindingForms10, Namespaces.BindingFormsStdUiControls10, Namespaces.BindingFormsStdFuncLib10));
            _cmsBindingsElementTemplate = new XElement(Namespaces.BindingForms10 + FormKeyTagNames.Bindings);
            _cmsLayoutElementTemplate = new XElement(Namespaces.BindingForms10 + FormKeyTagNames.Layout);
        }

        public DataTypeDescriptorFormsHelper(DataTypeDescriptor dataTypeDescriptor, bool showPublicationStatusSelector, EntityToken entityToken)
            : this(dataTypeDescriptor, null, showPublicationStatusSelector, entityToken)
        {
        }

        public DataTypeDescriptorFormsHelper(DataTypeDescriptor dataTypeDescriptor)
            : this(dataTypeDescriptor, null, false, null)
        {
        }


        public DataTypeDescriptorFormsHelper(DataTypeDescriptor dataTypeDescriptor, string bindingNamesPrefix)
            : this(dataTypeDescriptor, bindingNamesPrefix, false, null)
        {
        }


        public DataTypeDescriptorFormsHelper(DataTypeDescriptor dataTypeDescriptor, string bindingNamesPrefix, bool showPublicationStatusSelector, EntityToken entityToken)
        {
            if (dataTypeDescriptor == null) throw new ArgumentNullException("dataTypeDescriptor");

            _dataTypeDescriptor = dataTypeDescriptor;
            _bindingNamesPrefix = bindingNamesPrefix;
            _showPublicationStatusSelector = showPublicationStatusSelector;
            this.EntityToken = entityToken;
            this.LayoutIconHandle = null;
        }


        public DataTypeDescriptor DataTypeDescriptor
        {
            get
            {
                return _dataTypeDescriptor;
            }
        }



        public string AlternateFormDefinition
        {
            get
            {
                if (_alternateFormDefinitionInitialized == false)
                {
                    string dynamicDataFormFolderPath = "\\" + _dataTypeDescriptor.Namespace.Replace('.', '\\');
                    string dynamicDataFormFileName = string.Format("{0}.xml", _dataTypeDescriptor.Name);
                    _alternateFormDefinition = DynamicTypesAlternateFormFacade.GetAlternateFormMarkup(_dataTypeDescriptor);

                    _alternateFormDefinitionInitialized = true;
                }

                return _alternateFormDefinition;
            }
            set
            {
                _alternateFormDefinition = value;
                _alternateFormDefinitionInitialized = true;
            }
        }


        public void AddReadOnlyField(string fieldName)
        {
            _readOnlyFields.Add(fieldName);
        }



        public void AddReadOnlyFields(IEnumerable<string> fieldNames)
        {
            _readOnlyFields.AddRange(fieldNames);
        }



        public string GetForm()
        {
            if (_generatedForm == null)
            {
                GenerateForm();
            }

            return _generatedForm;
        }



        public XElement BindingXml
        {
            get
            {
                if (_bindingsXml == null)
                {
                    GenerateForm();
                }

                return _bindingsXml;
            }
        }



        public XElement PanelXml
        {
            get
            {
                if (_panelXml == null)
                {
                    GenerateForm();
                }

                return _panelXml;
            }
        }



        public string BindingNamesPrefix
        {
            get
            {
                return _bindingNamesPrefix;
            }
        }



        public void UpdateWithNewBindings(Dictionary<string, object> bindings)
        {
            Dictionary<string, object> newBindigns = GetNewBindings();

            foreach (var kvp in newBindigns)
            {
                if (bindings.ContainsKey(kvp.Key) == false)
                {
                    bindings.Add(kvp.Key, kvp.Value);
                }
                else
                {
                    bindings[kvp.Key] = kvp.Value;
                }
            }
        }



        public Dictionary<string, object> GetNewBindings()
        {
            Dictionary<string, object> newBindings = new Dictionary<string, object>();

            foreach (DataFieldDescriptor fieldDescriptor in _dataTypeDescriptor.Fields.Where(dfd => dfd.Inherited == false))
            {
                Type fieldType = fieldDescriptor.InstanceType;

                object value = null;
                if (fieldDescriptor.IsNullable == true)
                {
                    value = null;
                }
                else if ((fieldType.IsGenericType == true) && (fieldType.GetGenericTypeDefinition() == typeof(Nullable<>)))
                {
                    value = null;
                }
                else
                {
                    if (fieldType == typeof(string) && fieldDescriptor.ForeignKeyReferenceTypeName == null) value = "";
                    if (fieldType == typeof(int)) value = (int)0;
                    if (fieldType == typeof(decimal)) value = (decimal)0.0;
                    if (fieldType == typeof(DateTime)) value = DateTime.Now;
                    if (fieldType == typeof(bool)) value = false;
                    if (fieldType == typeof(Guid)) value = Guid.Empty;
                }

                newBindings.Add(GetBindingName(fieldDescriptor), value);
            }


            //TODO: This code is dublicated. /MRJ
            if ((_showPublicationStatusSelector == true) &&
                (_dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == true))
            {
                newBindings.Add(this.PublicationStatusBindingName, GenericPublishProcessController.Draft);

                IDictionary<string, string> transitionNames = new Dictionary<string, string>();
                transitionNames.Add(GenericPublishProcessController.Draft, StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "DraftTransition"));
                transitionNames.Add(GenericPublishProcessController.AwaitingApproval, StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "AwaitingApprovalTransition"));

                string username = UserValidationFacade.GetUsername();
                IEnumerable<UserPermissionDefinition> userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(username);
                IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinition = PermissionTypeFacade.GetUserGroupPermissionDefinitions(username);
                IEnumerable<PermissionType> currentPermissionTypes = PermissionTypeFacade.GetCurrentPermissionTypes(UserValidationFacade.GetUserToken(), this.EntityToken, userPermissionDefinitions, userGroupPermissionDefinition);
                foreach (PermissionType permissionType in currentPermissionTypes)
                {
                    if (GenericPublishProcessController.AwaitingPublicationActionPermissionType.Contains(permissionType) == true)
                    {
                        transitionNames.Add(GenericPublishProcessController.AwaitingPublication, StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.EditPage.AwaitingPublicationTransition"));
                        break;
                    }
                }

                newBindings.Add(this.PublicationStatusOptionsBindingName, transitionNames);
            }


            return newBindings;
        }



        public void UpdateWithBindings(IData dataObject, Dictionary<string, object> bindings)
        {
            Dictionary<string, object> newBindigns = GetBindings(dataObject);

            foreach (var kvp in newBindigns)
            {
                if (bindings.ContainsKey(kvp.Key) == false)
                {
                    bindings.Add(kvp.Key, kvp.Value);
                }
                else
                {
                    bindings[kvp.Key] = kvp.Value;
                }
            }
        }



        public Dictionary<string, object> GetBindings(IData dataObject)
        {
            return GetBindings(dataObject, false);
        }



        public Dictionary<string, object> GetBindings(IData dataObject, bool allowMandatoryNonDefaultingProperties)
        {
            if (dataObject == null) throw new ArgumentNullException("dataObject");

            Dictionary<string, object> bindings = new Dictionary<string, object>();

            foreach (DataFieldDescriptor fieldDescriptor in _dataTypeDescriptor.Fields.Where(dfd => dfd.Inherited == false))
            {
                PropertyInfo propertyInfo = dataObject.GetType().GetProperty(fieldDescriptor.Name);

                if (propertyInfo.CanRead == true)
                {
                    object value = propertyInfo.GetGetMethod().Invoke(dataObject, null);

                    if (value == null && fieldDescriptor.IsNullable == false)
                    {
                        if (fieldDescriptor.IsNullable == true)
                        {
                            // Ignore, null is allowed
                        }
                        else if ((fieldDescriptor.InstanceType.IsGenericType == true) &&
                                 (fieldDescriptor.InstanceType.GetGenericTypeDefinition() == typeof(Nullable<>)))
                        {
                            // Ignore, null is allowed
                        }
                        else if (allowMandatoryNonDefaultingProperties == true)
                        {
                            if (propertyInfo.PropertyType == typeof(string) && fieldDescriptor.ForeignKeyReferenceTypeName == null) //FK fields stay NULL
                            {
                                value = "";
                            }
                            else if (propertyInfo.PropertyType == typeof(int))
                            {
                                value = 0;
                            }
                            else if (propertyInfo.PropertyType == typeof(bool))
                            {
                                value = false;
                            }
                            else if (propertyInfo.PropertyType == typeof(decimal))
                            {
                                value = 0;
                            }
                            else if (propertyInfo.PropertyType == typeof(DateTime))
                            {
                                value = DateTime.Now;
                            }
                            else if (propertyInfo.PropertyType == typeof(Guid))
                            {
                                value = Guid.Empty;
                            }
                        }
                        else
                        {
                            throw new InvalidOperationException(string.Format("Field '{0}' on type '{1}' is null, does not allow null and does not have a default value", fieldDescriptor.Name, _dataTypeDescriptor.TypeManagerTypeName));
                        }
                    }

                    bindings.Add(GetBindingName(fieldDescriptor), value);
                }
            }

            if ((_showPublicationStatusSelector == true) &&
                (_dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == true))
            {
                bindings.Add(this.PublicationStatusBindingName, ((IPublishControlled)dataObject).PublicationStatus);

                IDictionary<string, string> transitionNames = new Dictionary<string, string>();
                transitionNames.Add(GenericPublishProcessController.Draft, StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "DraftTransition"));
                transitionNames.Add(GenericPublishProcessController.AwaitingApproval, StringResourceSystemFacade.GetString("Composite.Plugins.GeneratedDataTypesElementProvider", "AwaitingApprovalTransition"));

                string username = UserValidationFacade.GetUsername();
                IEnumerable<UserPermissionDefinition> userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(username);
                IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinition = PermissionTypeFacade.GetUserGroupPermissionDefinitions(username);
                IEnumerable<PermissionType> currentPermissionTypes = PermissionTypeFacade.GetCurrentPermissionTypes(UserValidationFacade.GetUserToken(), this.EntityToken, userPermissionDefinitions, userGroupPermissionDefinition);
                foreach (PermissionType permissionType in currentPermissionTypes)
                {
                    if (GenericPublishProcessController.AwaitingPublicationActionPermissionType.Contains(permissionType) == true)
                    {
                        transitionNames.Add(GenericPublishProcessController.AwaitingPublication, StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.EditPage.AwaitingPublicationTransition"));
                        break;
                    }
                }

                bindings.Add(this.PublicationStatusOptionsBindingName, transitionNames);
            }

            return bindings;
        }



        public Dictionary<string, List<ClientValidationRule>> GetBindingsValidationRules(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            Dictionary<string, List<ClientValidationRule>> result = new Dictionary<string, List<ClientValidationRule>>();

            foreach (DataFieldDescriptor fieldDescriptor in _dataTypeDescriptor.Fields.Where(dfd => dfd.Inherited == false))
            {
                List<ClientValidationRule> rules = ClientValidationRuleFacade.GetClientValidationRules(data, fieldDescriptor.Name);

                if (fieldDescriptor.InstanceType == typeof(int))
                {
                }

                result.Add(GetBindingName(fieldDescriptor), rules);
            }

            return result;
        }



        public Dictionary<string, string> BindingsToObject(Dictionary<string, object> bindings, IData dataObject)
        {
            Dictionary<string, string> errorMessages = new Dictionary<string, string>();

            foreach (DataFieldDescriptor fieldDescriptor in _dataTypeDescriptor.Fields.Where(dfd => dfd.Inherited == false))
            {
                if (_readOnlyFields.Contains(fieldDescriptor.Name) == true)
                {
                    continue;
                }

                string bindingName = GetBindingName(fieldDescriptor);

                if (bindings.ContainsKey(bindingName) == true)
                {
                    PropertyInfo propertyInfo = dataObject.GetType().GetProperty(fieldDescriptor.Name);

                    if (propertyInfo.CanWrite == true)
                    {
                        object newValue = bindings[bindingName];

                        try
                        {
                            newValue = ValueTypeConverter.Convert(newValue, propertyInfo.PropertyType);

                            propertyInfo.GetSetMethod().Invoke(dataObject, new object[] { newValue });
                        }
                        catch (Exception ex)
                        {
                            errorMessages.Add(bindingName, ex.Message);
                        }
                    }
                }
                else if (fieldDescriptor.IsNullable == false)
                {
                    throw new NotImplementedException();
                }
            }

            if ((_showPublicationStatusSelector == true) &&
                (_dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == true))
            {
                IPublishControlled publishControlled = dataObject as IPublishControlled;

                publishControlled.PublicationStatus = (string)bindings[this.PublicationStatusBindingName];
            }

            if (errorMessages.Count > 0)
            {
                return errorMessages;
            }
            else
            {
                return null;
            }
        }



        public Dictionary<string, string> ObjectToBindings(IData dataObject, Dictionary<string, object> bindings)
        {
            Dictionary<string, string> errorMessages = new Dictionary<string, string>();

            foreach (DataFieldDescriptor fieldDescriptor in _dataTypeDescriptor.Fields.Where(dfd => dfd.Inherited == false))
            {
                string bindingName = GetBindingName(fieldDescriptor);

                if (bindings.ContainsKey(bindingName) == true)
                {
                    PropertyInfo propertyInfo = dataObject.GetType().GetProperty(fieldDescriptor.Name);

                    if (propertyInfo.CanRead == true)
                    {
                        object newValue = propertyInfo.GetValue(dataObject, null);

                        if ((newValue == null) && (fieldDescriptor.IsNullable == false))
                        {
                            Type fieldType = fieldDescriptor.InstanceType;

                            if (fieldType == typeof(string) && fieldDescriptor.ForeignKeyReferenceTypeName == null) newValue = "";
                            if (fieldType == typeof(int)) newValue = (int)0;
                            if (fieldType == typeof(decimal)) newValue = (decimal)0.0;
                            if (fieldType == typeof(DateTime)) newValue = DateTime.Now;
                            if (fieldType == typeof(bool)) newValue = false;
                            if (fieldType == typeof(Guid)) newValue = Guid.Empty;
                        }

                        try
                        {
                            bindings[bindingName] = newValue;
                        }
                        catch (Exception ex)
                        {
                            errorMessages.Add(bindingName, ex.Message);
                        }
                    }
                }
            }

            if ((_showPublicationStatusSelector == true) &&
                (_dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == true))
            {
                IPublishControlled publishControlled = dataObject as IPublishControlled;

                bindings[this.PublicationStatusBindingName] = publishControlled.PublicationStatus;
            }

            if (errorMessages.Count > 0)
            {
                return errorMessages;
            }
            else
            {
                return null;
            }
        }



        public string LayoutIconHandle
        {
            get;
            set;
        }



        public static XNamespace MainNamespace
        {
            get { return Namespaces.BindingFormsStdUiControls10; }
        }



        public static XNamespace CmsNamespace
        {
            get { return Namespaces.BindingForms10; }
        }


        public static XNamespace FunctionNamespace
        {
            get { return Namespaces.BindingFormsStdFuncLib10; }
        }


        public string FieldGroupLabel
        {
            get;
            set;
        }


        public string LayoutLabel
        {
            get;
            set;
        }


        private Type GetFieldBindingType(DataFieldDescriptor fieldDescriptor)
        {
            Type t = fieldDescriptor.InstanceType;

            // Nullable<T> handling
            if (IsNullable(t) == true)
            {
                t = t.GetGenericArguments()[0];
            }

            return t;
        }


        private EntityToken EntityToken
        {
            get;
            set;
        }


        private bool IsNullable(Type t)
        {
            return (t.IsGenericType && t.GetGenericTypeDefinition() == typeof(Nullable<>));
        }



        private void GenerateForm()
        {
            XNamespace mainNamespace = DataTypeDescriptorFormsHelper.MainNamespace;
            XNamespace cmsNamespace = DataTypeDescriptorFormsHelper.CmsNamespace;
            XNamespace functionNamespace = DataTypeDescriptorFormsHelper.FunctionNamespace;

            Dictionary<string, string> fieldNameToBindingNameMapper = new Dictionary<string, string>();

            _bindingsXml = new XElement(_cmsBindingsElementTemplate);
            XElement layout = new XElement(_cmsLayoutElementTemplate);

            if (string.IsNullOrEmpty(this.LayoutIconHandle) == false)
            {
                layout.Add(new XAttribute("iconhandle", this.LayoutIconHandle));
            }

            // Add a read binding as the layout label
            if (string.IsNullOrEmpty(this.LayoutLabel) == false)
            {
                XAttribute labelAttribute = new XAttribute("label", this.LayoutLabel);
                layout.Add(labelAttribute);
            }
            else if (string.IsNullOrEmpty(_dataTypeDescriptor.LabelFieldName) == false)
            {

                layout.Add((new XElement(cmsNamespace + "layout.label", new XElement(cmsNamespace + "read", new XAttribute("source", _dataTypeDescriptor.LabelFieldName)))));
            }


            _panelXml = new XElement(mainNamespace + "FieldGroup");
            if (string.IsNullOrEmpty(this.FieldGroupLabel) == false)
            {
                _panelXml.Add(new XAttribute("Label", this.FieldGroupLabel));
            }
            layout.Add(_panelXml);

            foreach (DataFieldDescriptor fieldDescriptor in _dataTypeDescriptor.Fields.Where(dfd => dfd.Inherited == false))
            {
                Type bindingType = fieldDescriptor.InstanceType;
                string bindingName = GetBindingName(fieldDescriptor);

                fieldNameToBindingNameMapper.Add(fieldDescriptor.Name, bindingName);

                // Nullable<T> handling
                if (bindingType.IsGenericType && bindingType.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    bindingType = bindingType.GetGenericArguments()[0];
                }

                XElement binding = new XElement(cmsNamespace + FormKeyTagNames.Binding,
                    new XAttribute("name", bindingName),
                    new XAttribute("type", bindingType));

                binding.Add(new XAttribute("optional", "true"));
                // Line above is a (lame?) fix for bug 1173 - old code below. Prb: NULL user input gets stored in bindings. At next from rendering run, NULL user input clash with rules

                //if (fieldDescriptor.IsNullable == true)
                //{
                //    binding.Add(new XAttribute("optional", "true"));
                //}

                _bindingsXml.Add(binding);

                if (_readOnlyFields.Contains(fieldDescriptor.Name) == false)
                {
                    if (string.IsNullOrEmpty(fieldDescriptor.FormRenderingProfile.WidgetFunctionMarkup) == false)
                    {
                        XElement widgetFunctionMarkup = XElement.Parse(fieldDescriptor.FormRenderingProfile.WidgetFunctionMarkup);
                        WidgetFunctionRuntimeTreeNode widgetRuntimeTreeNode = (WidgetFunctionRuntimeTreeNode)FunctionTreeBuilder.Build(widgetFunctionMarkup);
                        widgetRuntimeTreeNode.Label = fieldDescriptor.FormRenderingProfile.Label;
                        widgetRuntimeTreeNode.HelpDefinition = new HelpDefinition(fieldDescriptor.FormRenderingProfile.HelpText);
                        widgetRuntimeTreeNode.BindingSourceName = bindingName;

                        XElement element = (XElement)widgetRuntimeTreeNode.GetValue();

                        _panelXml.Add(element);
                    }
                }
            }


            if ((_showPublicationStatusSelector == true) &&
                (_dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == true))
            {
                XElement publicationStatusBinding = new XElement(cmsNamespace + FormKeyTagNames.Binding,
                    new XAttribute("name", this.PublicationStatusBindingName),
                    new XAttribute("type", typeof(string)));

                XElement publicationStatusOptionsBinding = new XElement(cmsNamespace + FormKeyTagNames.Binding,
                    new XAttribute("name", this.PublicationStatusOptionsBindingName),
                    new XAttribute("type", typeof(object)));

                _bindingsXml.Add(publicationStatusBinding);
                _bindingsXml.Add(publicationStatusOptionsBinding);


                XElement element =
                    new XElement(mainNamespace + "KeySelector",
                        new XAttribute("OptionsKeyField", "Key"),
                        new XAttribute("OptionsLabelField", "Value"),
                        new XAttribute("Label", "${Composite.Plugins.GeneratedDataTypesElementProvider, LabelPublicationState}"),
                        new XElement(mainNamespace + "KeySelector.Selected",
                            new XElement(cmsNamespace + "bind",
                                new XAttribute("source", this.PublicationStatusBindingName)
                            )
                        ),
                        new XElement(mainNamespace + "KeySelector.Options",
                            new XElement(cmsNamespace + "read",
                                new XAttribute("source", this.PublicationStatusOptionsBindingName)
                            )
                        )
                    );


                _panelXml.Add(element);
            }


            XElement formDefinition = new XElement(_cmsFormElementTemplate);
            formDefinition.Add(_bindingsXml);
            formDefinition.Add(layout);


            if (this.AlternateFormDefinition == null)
            {
                _generatedForm = formDefinition.ToString();
            }
            else
            {
                XElement formDefinitionElement = XElement.Parse(this.AlternateFormDefinition);

                var bindingNameAttributes =
                    formDefinitionElement.Descendants(cmsNamespace + "binding").Attributes("name").Concat(
                        formDefinitionElement.Descendants(cmsNamespace + "bind").Attributes("source").Concat(
                            formDefinitionElement.Descendants(cmsNamespace + "read").Attributes("source")));

                foreach (XAttribute bindingNameAttribute in bindingNameAttributes)
                {
                    bindingNameAttribute.Value = fieldNameToBindingNameMapper[bindingNameAttribute.Value];
                }

                if (string.IsNullOrEmpty(this.FieldGroupLabel) == false)
                {
                    foreach (XElement fieldGroupElement in formDefinitionElement.Descendants(mainNamespace + "FieldGroup"))
                    {
                        if (fieldGroupElement.Attribute("Label") == null)
                        {
                            fieldGroupElement.Add(new XAttribute("Label", this.FieldGroupLabel));
                        }
                    }
                }

                _generatedForm = formDefinitionElement.ToString();
                _panelXml = formDefinitionElement.Elements().Last().Elements().LastOrDefault();
            }
        }


        public static string GetBindingName(string prefix, string bindingName)
        {
            return string.Format("{0}{1}", prefix, bindingName).Replace('.', '_');
        }



        private string GetBindingName(DataFieldDescriptor dataFieldDescriptor)
        {
            if (string.IsNullOrEmpty(_bindingNamesPrefix) == true)
            {
                return dataFieldDescriptor.Name;
            }
            else
            {
                return GetBindingName(_bindingNamesPrefix, dataFieldDescriptor.Name);
            }
        }



        private string PublicationStatusBindingName
        {
            get
            {
                return GetBindingName(_bindingNamesPrefix, _publicationStatusPostFixBindingName);
            }
        }


        private string PublicationStatusOptionsBindingName
        {
            get
            {
                return GetBindingName(_bindingNamesPrefix, _publicationStatusOptionsPostFixBindingName);
            }
        }
    }
}
