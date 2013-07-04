using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.C1Console.Forms;
using Composite.C1Console.Security;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Validation;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Functions;
using Composite.Functions.Foundation;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_GeneratedDataTypesElementProvider;

namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataTypeDescriptorFormsHelper
    {
        private readonly DataTypeDescriptor _dataTypeDescriptor;
        private readonly List<string> _readOnlyFields = new List<string>();
        private readonly bool _showPublicationStatusSelector;
        private readonly string _bindingNamesPrefix;

        private string _alternateFormDefinition;
        private bool _alternateFormDefinitionInitialized;
        private string _generatedForm;
        private XElement _bindingsXml;
        private XElement _panelXml;

        private static readonly string _publicationStatusPostFixBindingName = "___PublicationStatus___";
        private static readonly string _publicationStatusOptionsPostFixBindingName = "___PublicationStatusOptions___";

        private static readonly XElement _cmsFormElementTemplate;
        private static readonly XElement _cmsBindingsElementTemplate;
        private static readonly XElement _cmsLayoutElementTemplate;


        /// <exclude />
        static DataTypeDescriptorFormsHelper()
        {
            _cmsFormElementTemplate = XElement.Parse(string.Format(@"<cms:{0} xmlns:cms=""{1}"" xmlns=""{2}"" xmlns:ff=""{3}"" xmlns:f=""{4}"" />", FormKeyTagNames.FormDefinition, Namespaces.BindingForms10, Namespaces.BindingFormsStdUiControls10, Namespaces.BindingFormsStdFuncLib10, FunctionTreeConfigurationNames.NamespaceName));
            _cmsBindingsElementTemplate = new XElement(Namespaces.BindingForms10 + FormKeyTagNames.Bindings);
            _cmsLayoutElementTemplate = new XElement(Namespaces.BindingForms10 + FormKeyTagNames.Layout);
        }


        /// <exclude />
        public DataTypeDescriptorFormsHelper(DataTypeDescriptor dataTypeDescriptor, bool showPublicationStatusSelector, EntityToken entityToken)
            : this(dataTypeDescriptor, null, showPublicationStatusSelector, entityToken)
        {
        }


        /// <exclude />
        public DataTypeDescriptorFormsHelper(DataTypeDescriptor dataTypeDescriptor)
            : this(dataTypeDescriptor, null, false, null)
        {
        }


        /// <exclude />
        public DataTypeDescriptorFormsHelper(DataTypeDescriptor dataTypeDescriptor, string bindingNamesPrefix)
            : this(dataTypeDescriptor, bindingNamesPrefix, false, null)
        {
        }


        /// <exclude />
        public DataTypeDescriptorFormsHelper(DataTypeDescriptor dataTypeDescriptor, string bindingNamesPrefix, bool showPublicationStatusSelector, EntityToken entityToken)
        {
            if (dataTypeDescriptor == null) throw new ArgumentNullException("dataTypeDescriptor");

            _dataTypeDescriptor = dataTypeDescriptor;
            _bindingNamesPrefix = bindingNamesPrefix;
            _showPublicationStatusSelector = showPublicationStatusSelector;
            this.EntityToken = entityToken;
            this.LayoutIconHandle = null;
        }


        /// <exclude />
        public DataTypeDescriptor DataTypeDescriptor
        {
            get
            {
                return _dataTypeDescriptor;
            }
        }


        /// <exclude />
        public string AlternateFormDefinition
        {
            get
            {
                if (_alternateFormDefinitionInitialized == false)
                {
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


        /// <exclude />
        public void AddReadOnlyField(string fieldName)
        {
            _readOnlyFields.Add(fieldName);
        }



        /// <exclude />
        public void AddReadOnlyFields(IEnumerable<string> fieldNames)
        {
            _readOnlyFields.AddRange(fieldNames);
        }



        /// <exclude />
        public string GetForm()
        {
            if (_generatedForm == null)
            {
                GenerateForm();
            }

            return _generatedForm;
        }



        /// <exclude />
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



        /// <exclude />
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



        /// <exclude />
        public string BindingNamesPrefix
        {
            get
            {
                return _bindingNamesPrefix;
            }
        }



        /// <exclude />
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

        private object GetDefaultValue(Type type)
        {
            if (type == typeof(int)) return (int)0;
            if (type == typeof(decimal)) return (decimal)0.0;
            if (type == typeof(DateTime)) return DateTime.Now;
            if (type == typeof(bool)) return false;
            if (type == typeof(Guid)) return Guid.Empty;

            return null;
        }

        /// <exclude />
        public Dictionary<string, object> GetNewBindings()
        {
            Dictionary<string, object> newBindings = new Dictionary<string, object>();

            foreach (DataFieldDescriptor fieldDescriptor in _dataTypeDescriptor.Fields)
            {
                Type fieldType = fieldDescriptor.InstanceType;

                object value;
                if (fieldDescriptor.IsNullable
                    || (fieldType.IsGenericType && fieldType.GetGenericTypeDefinition() == typeof(Nullable<>)))
                {
                    value = null;
                }
                else
                {
                    if (fieldType == typeof (string) && fieldDescriptor.ForeignKeyReferenceTypeName == null)
                    {
                        value = "";
                    }
                    else
                    {
                        value = GetDefaultValue(fieldType);
                    }
                }

                newBindings.Add(GetBindingName(fieldDescriptor), value);
            }


            //TODO: This code is dublicated. /MRJ
            if (_showPublicationStatusSelector &&
                _dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)))
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
                    if (GenericPublishProcessController.AwaitingPublicationActionPermissionType.Contains(permissionType))
                    {
                        transitionNames.Add(GenericPublishProcessController.AwaitingPublication,
                            LocalizationFiles.Composite_Management.Website_Forms_Administrative_EditPage_AwaitingPublicationTransition);
                        break;
                    }
                }

                newBindings.Add(this.PublicationStatusOptionsBindingName, transitionNames);
            }


            return newBindings;
        }



        /// <exclude />
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



        /// <exclude />
        public Dictionary<string, object> GetBindings(IData dataObject)
        {
            return GetBindings(dataObject, false);
        }



        /// <exclude />
        public Dictionary<string, object> GetBindings(IData dataObject, bool allowMandatoryNonDefaultingProperties)
        {
            if (dataObject == null) throw new ArgumentNullException("dataObject");

            Dictionary<string, object> bindings = new Dictionary<string, object>();

            foreach (DataFieldDescriptor fieldDescriptor in _dataTypeDescriptor.Fields)
            {
                PropertyInfo propertyInfo = dataObject.GetType().GetProperty(fieldDescriptor.Name);

                if (propertyInfo.CanRead)
                {
                    object value = propertyInfo.GetGetMethod().Invoke(dataObject, null);

                    if (value == null && fieldDescriptor.IsNullable == false)
                    {
                        if (fieldDescriptor.IsNullable)
                        {
                            // Ignore, null is allowed
                        }
                        else if (fieldDescriptor.InstanceType.IsGenericType 
                                 && fieldDescriptor.InstanceType.GetGenericTypeDefinition() == typeof(Nullable<>))
                        {
                            // Ignore, null is allowed
                        }
                        else if (allowMandatoryNonDefaultingProperties)
                        {
                            if (propertyInfo.PropertyType == typeof(string) && fieldDescriptor.ForeignKeyReferenceTypeName == null) //FK fields stay NULL
                            {
                                value = "";
                            }
                            else 
                            {
                                value = GetDefaultValue(propertyInfo.PropertyType);
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

            if (_showPublicationStatusSelector &&
                _dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)))
            {
                bindings.Add(this.PublicationStatusBindingName, ((IPublishControlled)dataObject).PublicationStatus);

                IDictionary<string, string> transitionNames = new Dictionary<string, string>();
                transitionNames.Add(GenericPublishProcessController.Draft, Texts.DraftTransition);
                transitionNames.Add(GenericPublishProcessController.AwaitingApproval, Texts.AwaitingApprovalTransition);

                string username = UserValidationFacade.GetUsername();
                IEnumerable<UserPermissionDefinition> userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(username);
                IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinition = PermissionTypeFacade.GetUserGroupPermissionDefinitions(username);
                IEnumerable<PermissionType> currentPermissionTypes = PermissionTypeFacade.GetCurrentPermissionTypes(UserValidationFacade.GetUserToken(), this.EntityToken, userPermissionDefinitions, userGroupPermissionDefinition);
                foreach (PermissionType permissionType in currentPermissionTypes)
                {
                    if (GenericPublishProcessController.AwaitingPublicationActionPermissionType.Contains(permissionType))
                    {
                        transitionNames.Add(GenericPublishProcessController.AwaitingPublication, 
                            LocalizationFiles.Composite_Management.Website_Forms_Administrative_EditPage_AwaitingPublicationTransition);
                        break;
                    }
                }

                bindings.Add(this.PublicationStatusOptionsBindingName, transitionNames);
            }

            return bindings;
        }


        /// <exclude />
        public Dictionary<string, List<ClientValidationRule>> GetBindingsValidationRules(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            Dictionary<string, List<ClientValidationRule>> result = new Dictionary<string, List<ClientValidationRule>>();

            foreach (DataFieldDescriptor fieldDescriptor in _dataTypeDescriptor.Fields)
            {
                List<ClientValidationRule> rules = ClientValidationRuleFacade.GetClientValidationRules(data, fieldDescriptor.Name);

                result.Add(GetBindingName(fieldDescriptor), rules);
            }

            return result;
        }



        /// <exclude />
        public Dictionary<string, string> BindingsToObject(Dictionary<string, object> bindings, IData dataObject)
        {
            var errorMessages = new Dictionary<string, string>();

            foreach (DataFieldDescriptor fieldDescriptor in _dataTypeDescriptor.Fields)
            {
                if (_readOnlyFields.Contains(fieldDescriptor.Name))
                {
                    continue;
                }

                string bindingName = GetBindingName(fieldDescriptor);

                if (!bindings.ContainsKey(bindingName))
                {
                    Verify.That(fieldDescriptor.IsNullable, "Missing value for field '{0}'", fieldDescriptor.Name);
                    continue;
                }
                
                PropertyInfo propertyInfo = dataObject.GetType().GetProperty(fieldDescriptor.Name);

                if (propertyInfo.CanWrite)
                {
                    object newValue = bindings[bindingName];

                    if (newValue is string && (newValue as string) == "" && IsNullableStringReference(propertyInfo))
                    {
                        newValue = null;
                    }

                    try
                    {
                        newValue = ValueTypeConverter.Convert(newValue, propertyInfo.PropertyType);

                        propertyInfo.GetSetMethod().Invoke(dataObject, new object[] {newValue});
                    }
                    catch (Exception ex)
                    {
                        errorMessages.Add(bindingName, ex.Message);
                    }
                }
            }

            if (_showPublicationStatusSelector &&
                _dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)))
            {
                IPublishControlled publishControlled = dataObject as IPublishControlled;

                publishControlled.PublicationStatus = (string)bindings[this.PublicationStatusBindingName];
            }

            if (errorMessages.Count > 0)
            {
                return errorMessages;
            }
            
            return null;
        }


        private static bool IsNullableStringReference(PropertyInfo propertyInfo)
        {
            Type dataType = propertyInfo.DeclaringType;
            return DataAttributeFacade.GetDataReferenceProperties(dataType)
                                      .Any(foreignKey => foreignKey.SourcePropertyName == propertyInfo.Name && foreignKey.IsNullableString);
        }


        /// <exclude />
        public Dictionary<string, string> ObjectToBindings(IData dataObject, Dictionary<string, object> bindings)
        {
            Dictionary<string, string> errorMessages = new Dictionary<string, string>();

            foreach (DataFieldDescriptor fieldDescriptor in _dataTypeDescriptor.Fields)
            {
                string bindingName = GetBindingName(fieldDescriptor);

                if (bindings.ContainsKey(bindingName))
                {
                    PropertyInfo propertyInfo = dataObject.GetType().GetProperty(fieldDescriptor.Name);

                    Verify.IsNotNull(propertyInfo, "Missing property type '{0}' does not contain property '{1}'", dataObject.GetType(), fieldDescriptor.Name);

                    if (propertyInfo.CanRead)
                    {
                        object newValue = propertyInfo.GetValue(dataObject, null);

                        if ((newValue == null) && (fieldDescriptor.IsNullable == false))
                        {
                            Type fieldType = fieldDescriptor.InstanceType;

                            if (fieldType == typeof (string) && fieldDescriptor.ForeignKeyReferenceTypeName == null)
                            {
                                newValue = "";
                            }
                            else
                            {
                                newValue = GetDefaultValue(fieldType);
                            }
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

            if (_showPublicationStatusSelector &&
                _dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)))
            {
                IPublishControlled publishControlled = dataObject as IPublishControlled;

                bindings[this.PublicationStatusBindingName] = publishControlled.PublicationStatus;
            }

            return errorMessages.Count > 0 ? errorMessages : null;
        }



        /// <exclude />
        public string LayoutIconHandle
        {
            get;
            set;
        }



        /// <exclude />
        public static XNamespace MainNamespace
        {
            get { return Namespaces.BindingFormsStdUiControls10; }
        }



        /// <exclude />
        public static XNamespace CmsNamespace
        {
            get { return Namespaces.BindingForms10; }
        }



        /// <exclude />
        public static XNamespace FunctionNamespace
        {
            get { return Namespaces.BindingFormsStdFuncLib10; }
        }



        /// <exclude />
        public string FieldGroupLabel
        {
            get;
            set;
        }



        /// <exclude />
        public string LayoutLabel
        {
            get;
            set;
        }


        private Type GetFieldBindingType(DataFieldDescriptor fieldDescriptor)
        {
            Type bindingType = fieldDescriptor.InstanceType;

            // Nullable<T> handling. Allowed types: Nullable<Guid>, Nullable<int>, Nullable<decimal>
            if (bindingType != typeof(Guid?)
                && bindingType != typeof(int?)
                && bindingType != typeof(decimal?)
                && bindingType.IsGenericType && bindingType.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                return bindingType.GetGenericArguments()[0];
            }

            return bindingType;
        }


        private EntityToken EntityToken
        {
            get;
            set;
        }


        private void GenerateForm()
        {
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

                layout.Add((new XElement(CmsNamespace + "layout.label", new XElement(CmsNamespace + "read", new XAttribute("source", _dataTypeDescriptor.LabelFieldName)))));
            }


            _panelXml = new XElement(MainNamespace + "FieldGroup");
            if (string.IsNullOrEmpty(this.FieldGroupLabel) == false)
            {
                _panelXml.Add(new XAttribute("Label", this.FieldGroupLabel));
            }
            layout.Add(_panelXml);

            bool widgetsDefined =_dataTypeDescriptor.Fields
                                .Any(field => (field.FormRenderingProfile != null) && field.FormRenderingProfile.Label != null);

            foreach (DataFieldDescriptor fieldDescriptor in _dataTypeDescriptor.Fields)
            {
                Type bindingType = GetFieldBindingType(fieldDescriptor);
                string bindingName = GetBindingName(fieldDescriptor);

                fieldNameToBindingNameMapper.Add(fieldDescriptor.Name, bindingName);

                XElement binding = new XElement(CmsNamespace + FormKeyTagNames.Binding,
                    new XAttribute("name", bindingName),
                    new XAttribute("type", bindingType));

                binding.Add(new XAttribute("optional", "true"));
                // Line above is a (lame?) fix for bug 1173 - old code below. Prb: NULL user input gets stored in bindings. At next from rendering run, NULL user input clash with rules

                //if (fieldDescriptor.IsNullable)
                //{
                //    binding.Add(new XAttribute("optional", "true"));
                //}

                _bindingsXml.Add(binding);

                if (!_readOnlyFields.Contains(fieldDescriptor.Name))
                {
                    XElement widgetFunctionMarkup;
                    string label;
                    string helptext;

                    if (!string.IsNullOrEmpty(fieldDescriptor.FormRenderingProfile.WidgetFunctionMarkup))
                    {
                        widgetFunctionMarkup = XElement.Parse(fieldDescriptor.FormRenderingProfile.WidgetFunctionMarkup);
                        
                        label = fieldDescriptor.FormRenderingProfile.Label;
                        helptext = fieldDescriptor.FormRenderingProfile.HelpText;
                    }
                    else if (!widgetsDefined)
                    {
                        // Auto generating a widget
                        Type fieldType;

                        if (!fieldDescriptor.ForeignKeyReferenceTypeName.IsNullOrEmpty())
                        {
                            Type foreignKeyType = Type.GetType(fieldDescriptor.ForeignKeyReferenceTypeName, true);

                            var referenceTemplateType = fieldDescriptor.IsNullable ? typeof(NullableDataReference<>) : typeof(DataReference<>);

                            fieldType = referenceTemplateType.MakeGenericType(foreignKeyType);
                        }
                        else
                        {
                            fieldType = fieldDescriptor.InstanceType;
                        }

                        var widgetFunctionProvider = StandardWidgetFunctions.GetDefaultWidgetFunctionProviderByType(fieldType);
                        if (widgetFunctionProvider != null)
                        {
                            widgetFunctionMarkup = widgetFunctionProvider.SerializedWidgetFunction;
                            label = fieldDescriptor.Name;
                            helptext = "";
                        }
                        else
                        {
                            continue;
                        }
                    }
                    else
                    {
                        continue;
                    }

                    var widgetRuntimeTreeNode = (WidgetFunctionRuntimeTreeNode)FunctionTreeBuilder.Build(widgetFunctionMarkup);
                    widgetRuntimeTreeNode.Label = label;
                    widgetRuntimeTreeNode.HelpDefinition = new HelpDefinition(helptext);
                    widgetRuntimeTreeNode.BindingSourceName = bindingName;

                    XElement element = (XElement)widgetRuntimeTreeNode.GetValue();
                    _panelXml.Add(element);
                }
            }


            if (_showPublicationStatusSelector &&
                _dataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)))
            {
                XElement publicationStatusBinding = new XElement(CmsNamespace + FormKeyTagNames.Binding,
                    new XAttribute("name", this.PublicationStatusBindingName),
                    new XAttribute("type", typeof(string)));

                XElement publicationStatusOptionsBinding = new XElement(CmsNamespace + FormKeyTagNames.Binding,
                    new XAttribute("name", this.PublicationStatusOptionsBindingName),
                    new XAttribute("type", typeof(object)));

                _bindingsXml.Add(publicationStatusBinding);
                _bindingsXml.Add(publicationStatusOptionsBinding);


                XElement element =
                    new XElement(MainNamespace + "KeySelector",
                        new XAttribute("OptionsKeyField", "Key"),
                        new XAttribute("OptionsLabelField", "Value"),
                        new XAttribute("Label", "${Composite.Plugins.GeneratedDataTypesElementProvider, LabelPublicationState}"),
                        new XElement(MainNamespace + "KeySelector.Selected",
                            new XElement(CmsNamespace + "bind",
                                new XAttribute("source", this.PublicationStatusBindingName)
                            )
                        ),
                        new XElement(MainNamespace + "KeySelector.Options",
                            new XElement(CmsNamespace + "read",
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
                    formDefinitionElement.Descendants(CmsNamespace + "binding").Attributes("name").Concat(
                        formDefinitionElement.Descendants(CmsNamespace + "bind").Attributes("source").Concat(
                            formDefinitionElement.Descendants(CmsNamespace + "read").Attributes("source")));

                foreach (XAttribute bindingNameAttribute in bindingNameAttributes)
                {
                    var bindingName = bindingNameAttribute.Value;

                    Verify.That(fieldNameToBindingNameMapper.ContainsKey(bindingName), "Incorrect binding '{0}'", bindingName);

                    bindingNameAttribute.Value = fieldNameToBindingNameMapper[bindingName];
                }

                if (string.IsNullOrEmpty(this.FieldGroupLabel) == false)
                {
                    foreach (XElement fieldGroupElement in formDefinitionElement.Descendants(MainNamespace + "FieldGroup"))
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


        /// <exclude />
        public static string GetBindingName(string prefix, string bindingName)
        {
            return string.Format("{0}{1}", prefix, bindingName).Replace('.', '_');
        }


        private string GetBindingName(DataFieldDescriptor dataFieldDescriptor)
        {
            if (string.IsNullOrEmpty(_bindingNamesPrefix))
            {
                return dataFieldDescriptor.Name;
            }
            
            return GetBindingName(_bindingNamesPrefix, dataFieldDescriptor.Name);
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

        internal bool BindingIsOptional(string bindingName)
        {
            XElement bindingsXml;
            string formDefinition = AlternateFormDefinition ?? _generatedForm;

            if (!formDefinition.IsNullOrEmpty())
            {
                bindingsXml = XElement.Parse(formDefinition);
            }
            else
            {
                bindingsXml = BindingXml;
            }

            var binding = bindingsXml
                .Descendants(CmsNamespace + "binding")
                .FirstOrDefault(e => (string) e.Attribute("name") == bindingName);

            return binding != null && string.Equals((string) binding.Attribute("optional"), "true", StringComparison.OrdinalIgnoreCase);
        }
    }
}
