using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompileTreeNodes;
using Composite.C1Console.Forms.StandardProducerMediators.BuildinProducers;
using Composite.Core.Types;
using Composite.Data.Validation;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Functions;
using Composite.Functions.Forms;


namespace Composite.C1Console.Forms.Foundation.FormTreeCompiler
{
    internal sealed class PropertyAssigner
    {
        public static void AssignPropertiesToProducer(ElementCompileTreeNode element, CompileContext compileContext)
        {
            List<string> requiredPropertyNames;

            if (element.Producer != null)
            {
                Type producerType = element.Producer.GetType();

                requiredPropertyNames =
                    (from prop in producerType.GetProperties()
                     where prop.GetCustomAttributes(typeof(RequiredValueAttribute), true).Length > 0
                     select prop.Name).ToList();
            }
            else
            {
                requiredPropertyNames = new List<string>();
            }

            foreach (PropertyCompileTreeNode namedProperty in element.AllNamedProperties)
            {
                SetPropertyOnProducer(element, namedProperty.Name, namedProperty, compileContext);
                requiredPropertyNames.Remove(namedProperty.Name);
            }

            foreach (PropertyCompileTreeNode property in element.DefaultProperties)
            {
                string propertyName = GetDefaultPropertyNameOnProducer(element);
                SetPropertyOnProducer(element, propertyName, property, compileContext);
                requiredPropertyNames.Remove(propertyName);
            }

            if (requiredPropertyNames.Count > 0)
            {
                throw new FormCompileException(string.Format("The property named {0} on tag {1} requires a value but have not been assigned a value", requiredPropertyNames[0], element.XmlSourceNodeInformation.TagName), element.XmlSourceNodeInformation);
            }
        }



        private static void SetPropertyOnProducer(ElementCompileTreeNode element, string propertyName, PropertyCompileTreeNode property, CompileContext compileContext)
        {
            if (property.XmlSourceNodeInformation.TagName.Contains(":"))
            {
                
            }

            if ((property.InclosingProducerName != "") && (element.XmlSourceNodeInformation.Name != property.InclosingProducerName)) throw new FormCompileException(string.Format("The inclosing tag does not match the embedded property tag name {0}", propertyName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

            Type producerType = element.Producer.GetType();

            PropertyInfo propertyInfo = producerType.GetProperty(propertyName);
            if (null == propertyInfo) 
            {
                if (property.IsNamespaceDeclaration) return; // Ignore it
                
                throw new FormCompileException(string.Format("The producer {0} does not have property named {1}", producerType.ToString(), propertyName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);
            }

            MethodInfo getMethodInfo = propertyInfo.GetGetMethod();
            if (null == getMethodInfo) throw new FormCompileException(string.Format("The producer {0} does not have a public get for the property named {1}", producerType.ToString(), propertyName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

            bool isReadOrBindProduced = property.Value != null && (typeof(BindProducer) == property.Value.GetType() || typeof(ReadProducer) == property.Value.GetType());

            if (isReadOrBindProduced == false && true == typeof(IDictionary).IsAssignableFrom(getMethodInfo.ReturnType))
            {
                if (property.Value == null) throw new FormCompileException(string.Format("Can not assign null to {0} dictionary", propertyName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);
                IDictionary dictionary = getMethodInfo.Invoke(element.Producer, null) as IDictionary;

                if (dictionary == null) throw new InvalidOperationException(string.Format("Property '{0}' on '{1}' has not been initialized.", propertyName, producerType));

                MethodInfo dictionaryAddMethodInfo = dictionary.GetType().GetMethod("Add");
                ParameterInfo[] dictionaryAddParmInfo = dictionaryAddMethodInfo.GetParameters();

                Type valueType = property.Value.GetType();

                if ((property.Value != null) && (typeof(IDictionary).IsAssignableFrom(valueType)))
                {
                    IDictionary values = (IDictionary)property.Value;
                    IDictionaryEnumerator dictionaryEnumerator = values.GetEnumerator();
                    while (dictionaryEnumerator.MoveNext())
                    {
                        dictionary.Add(dictionaryEnumerator.Key, dictionaryEnumerator.Value);
                    }
                }
                else
                {
                    if (valueType == typeof(DictionaryEntry))
                    {
                        DictionaryEntry dictionaryEntry = (DictionaryEntry)property.Value;
                        dictionary.Add(dictionaryEntry.Key, dictionaryEntry.Value);
                    }
                    else
                    {
                        PropertyInfo valueKeyProperty = valueType.GetProperty("Key");
                        PropertyInfo valueValueProperty = valueType.GetProperty("Value");
                        if (valueKeyProperty == null || valueValueProperty == null) throw new FormCompileException(string.Format("The type {0} can not be assigned to the The parameter type {0} for the method 'Add' on the return type of the property {1} does not match the value type {2}", dictionaryAddParmInfo[0].ParameterType.ToString(), propertyName, property.Value.GetType().ToString()), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

                        object dictionaryEntryKey = valueKeyProperty.GetGetMethod().Invoke(property.Value, null);
                        object dictionaryEntryValue = valueValueProperty.GetGetMethod().Invoke(property.Value, null);
                        dictionary.Add(dictionaryEntryKey, dictionaryEntryValue);
                    }

                }
            }
            else
            {
                if (isReadOrBindProduced == false && true == typeof(IList).IsAssignableFrom(getMethodInfo.ReturnType))
                {
                    IList list = getMethodInfo.Invoke(element.Producer, null) as IList;

                    if (list == null) throw new InvalidOperationException(string.Format("Property '{0}' (an IList) on '{1}' has not been initialized.", propertyName, producerType));

                    MethodInfo listAddMethodInfo = list.GetType().GetMethod("Add");
                    ParameterInfo[] listAddParmInfo = listAddMethodInfo.GetParameters();


                    if (property.Value is IList)
                    {
                        IList values = (IList)property.Value;
                        foreach (object value in values)
                        {
                            if (!listAddParmInfo[0].ParameterType.IsInstanceOfType(value))
                            {
                                throw new FormCompileException(string.Format(
                                    "The parameter type {0} for the method 'Add' on the return type of the property {1} does not match the value type {2}", 
                                    listAddParmInfo[0].ParameterType, propertyName, property.Value.GetType()), 
                                    element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);
                            }


                            list.Add(value);
                        }
                    }
                    else
                    {
                        if (property.Value != null)
                        {
                            if (!listAddParmInfo[0].ParameterType.IsInstanceOfType(property.Value))
                            {
                                throw new FormCompileException(string.Format(
                                    "The parameter type {0} for the method 'Add' on the return type of the property {1} does not match the value type {2}", 
                                    listAddParmInfo[0].ParameterType, propertyName, property.Value.GetType()), 
                                    element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);
                            }

                            list.Add(property.Value);
                        }
                    }
                }
                else
                {
                    CheckForMultiblePropertyAdds(element, propertyName, property);

                    MethodInfo setMethodInfo = propertyInfo.GetSetMethod();
                    if (null == setMethodInfo) throw new FormCompileException(string.Format("The producer {0} does not have a public set for the property named {1}", producerType.ToString(), propertyName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

                    object parm;
                    if (null != property.Value)
                    {
                        if (typeof(BindProducer) == property.Value.GetType())
                        {
                            object[] attributes = propertyInfo.GetCustomAttributes(typeof(BindablePropertyAttribute), true);
                            if (attributes.Length == 0) throw new FormCompileException(string.Format("The property {0} on the producer {1}, does not have a bind attribute specified", propertyName, producerType.ToString()), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

                            BindProducer bind = (BindProducer)property.Value;
                            string source = bind.source;

                            EvaluteBinding(element, source, property, compileContext, getMethodInfo, true);
                        }
                        else if (typeof(ReadProducer) == property.Value.GetType())
                        {
                            ReadProducer bind = (ReadProducer)property.Value;
                            string source = bind.source;

                            EvaluteBinding(element, source, property, compileContext, getMethodInfo, false);
                        }
                    }


                    if ((null != property.Value) && (getMethodInfo.ReturnType.IsInstanceOfType(property.Value)))
                    {
                        if (typeof(IEnumerable).IsAssignableFrom(getMethodInfo.ReturnType) && getMethodInfo.ReturnType != typeof(string) && property.Value is string && ((string)property.Value).Length > 0)
                        {
                            // common err in form: specify a string, where a binding was expected. Problem with IEnumerable: string is converted to char array - hardly the expected result
                            // this is not a critical, but helpful, check
                            throw new InvalidOperationException(string.Format("Unable to cast {0} value '{1}' to type '{2}'", property.Value.GetType().FullName, property.Value, getMethodInfo.ReturnType.FullName));
                        }

                        parm = property.Value;
                    }
                    else if (property.Value is BaseRuntimeTreeNode)
                    {
                        if (!(element.Producer is IFunctionProducer))
                        {
                            // Handles C1 function in forms markup
                            BaseRuntimeTreeNode baseRuntimeTreeNode = property.Value as BaseRuntimeTreeNode;

                            object value = baseRuntimeTreeNode.GetValue();

                            parm = value;
                        }
                        else
                        {
                            parm = property.Value;
                        }
                    }                    
                    else
                    {
                        parm = ValueTypeConverter.Convert(property.Value, getMethodInfo.ReturnType);
                    }

                    if ((element.Producer is LayoutProducer) && (propertyName == "UiControl"))
                    {
                        LayoutProducer layoutProducer = (LayoutProducer)element.Producer;

                        if (layoutProducer.UiControl != null) throw new FormCompileException(string.Format("Only one ui control is allow at the top level of the layout."), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);
                    }

                    object[] parms = { parm };
                    setMethodInfo.Invoke(element.Producer, parms);
                }
            }


            IUiControl uiControl = element.Producer as IUiControl;
            if (uiControl != null && property.ClientValidationRules != null)
            {
                if (uiControl.ClientValidationRules != null && uiControl.ClientValidationRules.Count > 0)
                {
                    uiControl.ClientValidationRules.AddRange(property.ClientValidationRules);
                }
                else
                {
                    uiControl.ClientValidationRules = property.ClientValidationRules;
                }
            }
        }



        private static void CheckForMultiblePropertyAdds(ElementCompileTreeNode element, string propertyName, PropertyCompileTreeNode property)
        {
            if (element.AddedProperties.ContainsKey(element.CompilerId))
            {
                XmlSourceNodeInformation foundNode = null;
                PropertyCompileTreeNode node = element.AddedProperties[element.CompilerId].Find(delegate(PropertyCompileTreeNode pctn)
                {
                    if (pctn.Name == propertyName)
                    {
                        foundNode = pctn.XmlSourceNodeInformation;
                        return true;
                    }
                    return false;
                });

                if (null != node) throw new FormCompileException(string.Format("Duplicate '{0}' attributes is not allowed", propertyName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation, foundNode);
            }
            else
            {
                element.AddedProperties.Add(element.CompilerId, new List<PropertyCompileTreeNode>());
            }
            element.AddedProperties[element.CompilerId].Add(property);
        }



        private static void EvaluteBinding(ElementCompileTreeNode element, string source, PropertyCompileTreeNode property, CompileContext compileContext, MethodInfo sourceGetMethodInfo, bool makeBinding)
        {
            string[] splittedSource = source.Split('.');

            if (splittedSource.Length == 1)
            {
                EvaluteObjectBinding(element, property, compileContext, sourceGetMethodInfo, splittedSource[0], makeBinding);
            }
            else if (splittedSource.Length > 1)
            {
                string[] propertyPath = new string[splittedSource.Length - 1];
                Array.Copy(splittedSource, 1, propertyPath, 0, splittedSource.Length - 1);

                EvalutePropertyBinding(element, property, compileContext, sourceGetMethodInfo, splittedSource[0], propertyPath, makeBinding);
            }

            if (makeBinding && element.Producer is IUiControl)
            {
                if (((IUiControl)element.Producer).SourceBindingPaths == null)
                    ((IUiControl)element.Producer).SourceBindingPaths = new List<string>();
                ((IUiControl)element.Producer).SourceBindingPaths.Add(source);
            }
        }



        private static void EvaluteObjectBinding(ElementCompileTreeNode element, PropertyCompileTreeNode property, CompileContext compileContext, MethodInfo sourceGetMethodInfo, string bindSourceName, bool makeBinding)
        {
            if (makeBinding)
            {
                if (compileContext.IsUniqueSourcePropertyBinding(bindSourceName)) throw new FormCompileException(string.Format("{0} binds to {1} which is already property bound. Object bindings to a source object which is property bound is not allowed.", element.XmlSourceNodeInformation.XPath, bindSourceName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

                if (compileContext.RegisterUniqueSourceObjectBinding(bindSourceName) == false) throw new FormCompileException(string.Format("{0} binds to {1} which is already bound. Multiple bindings to the same source object.", element.XmlSourceNodeInformation.XPath, bindSourceName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);
            }

            string typeName = ((BindingsProducer)compileContext.BindingsProducer).GetTypeNameByName(bindSourceName);
            if (null == typeName) throw new FormCompileException(string.Format("{1} binds to an undeclared binding name '{0}'. All binding names must be declared in /cms:formdefinition/cms:bindings", bindSourceName, element.XmlSourceNodeInformation.XPath), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

            Type bindType = TypeManager.TryGetType(typeName);
            if (null == bindType) throw new FormCompileException(string.Format("The form binding '{0}' is declared as an unknown type '{1}'", bindSourceName, typeName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

            bool? optional = ((BindingsProducer)compileContext.BindingsProducer).GetOptionalValueByName(bindSourceName);
            object bindingObject = compileContext.GetBindingObject(bindSourceName);
            if ((optional.Value == false) && (null == bindingObject)) throw new FormCompileException(string.Format("The binding object named '{0}' not found in the input dictionary", bindSourceName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

            if (bindingObject != null)
            {
                Type bindingObjectType = bindingObject.GetType();
                if (bindType.IsAssignableFrom(bindingObjectType) == false) throw new FormCompileException(string.Format("The binding object named '{0}' from the input dictionary is not of expected type '{1}', but '{2}'", bindSourceName, bindType.FullName, bindingObjectType.FullName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);
            }

            if (makeBinding)
            {
                compileContext.Rebindings.Add(new CompileContext.ObjectRebinding(
                        element.Producer,
                        sourceGetMethodInfo,
                        bindSourceName,
                        bindType)
                    );
            }

            property.Value = bindingObject;


            List<ClientValidationRule> clientValidationRules = compileContext.GetBindingsValidationRules(bindSourceName);
            property.ClientValidationRules = clientValidationRules;
        }



        private static void EvalutePropertyBinding(ElementCompileTreeNode element, PropertyCompileTreeNode property, CompileContext compileContext, MethodInfo sourceGetMethodInfo, string bindSourceName, string[] propertyPath, bool makeBinding)
        {
            if (makeBinding)
            {
                bool? optional = ((BindingsProducer)compileContext.BindingsProducer).GetOptionalValueByName(bindSourceName);
                if (optional.HasValue == false) throw new FormCompileException(string.Format("{1} binds to an undeclared binding name '{0}'. All binding names must be declared in /cms:formdefinition/cms:bindings", bindSourceName, element.XmlSourceNodeInformation.XPath), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);
                else if (optional.Value) throw new FormCompileException(string.Format("Property binding to the optional object named '{0}' is not allowed", bindSourceName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

                if (compileContext.IsUniqueSourceObjectBinding(bindSourceName)) throw new FormCompileException(string.Format("{0} binds to {1} which is already object bound. Property bindings to a source object which is object bound is not allowed.", element.XmlSourceNodeInformation.XPath, bindSourceName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

                StringBuilder uniquePropertyName = new StringBuilder();
                for (int i = 0; i < propertyPath.Length; ++i)
                {
                    uniquePropertyName.Append(propertyPath[i]);
                }
                if (compileContext.RegisterUniqueSourcePropertyBinding(bindSourceName, uniquePropertyName.ToString()) == false) throw new FormCompileException(string.Format("{0} binds to {1} which is already bound. Multiple bindings to the same source object property is not allowed.", element.XmlSourceNodeInformation.XPath, uniquePropertyName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);
            }

            string typeName = ((BindingsProducer)compileContext.BindingsProducer).GetTypeNameByName(bindSourceName);
            if (null == typeName) throw new FormCompileException(string.Format("{1} binds to an undeclared binding name '{0}'. All binding names must be declared in /cms:formdefinition/cms:bindings", bindSourceName, element.XmlSourceNodeInformation.XPath), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

            Type bindType = TypeManager.TryGetType(typeName);
            if (null == bindType) throw new FormCompileException(string.Format("The form binding '{0}' is declared as an unknown type '{1}'", bindSourceName, typeName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

            object bindingObject = compileContext.GetBindingObject(bindSourceName);
            if (null == bindingObject) throw new FormCompileException(string.Format("The binding object named '{0}' not found in the input dictionary", bindSourceName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

            Type bindingObjectType = bindingObject.GetType();
            if (bindType.IsAssignableFrom(bindingObjectType) == false) throw new FormCompileException(string.Format("The binding object named '{0}' from the input dictionary is not of expected type '{1}', but '{2}'", bindSourceName, bindType.FullName, bindingObjectType.FullName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);


            MethodInfo currentGetMethodInfo = null;
            MethodInfo currentSetMethodInfo = null;
            Type currentType = bindType;
            object currentObject = bindingObject;
            object currentObjectPropertyOwner = bindingObject;
            string currentPropertyName = null;
            for (int i = 0; i < propertyPath.Length; ++i)
            {
                currentPropertyName = propertyPath[i];

                PropertyInfo propertyInfo = currentType.GetPropertiesRecursively(x => x.Name == currentPropertyName).FirstOrDefault();
                if (propertyInfo == null) throw new FormCompileException(string.Format("The type {0} does not have a property named {1}", currentType, currentPropertyName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

                currentGetMethodInfo = propertyInfo.GetGetMethod();
                if (currentGetMethodInfo == null) throw new FormCompileException(string.Format("The type {0} does not have a get property named {1}", currentType, currentPropertyName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);

                currentSetMethodInfo = propertyInfo.GetSetMethod();

                currentObjectPropertyOwner = currentObject;

                currentType = currentGetMethodInfo.ReturnType;
                currentObject = currentGetMethodInfo.Invoke(currentObjectPropertyOwner, null);
            }


            if (makeBinding)
            {
                if (currentSetMethodInfo == null) throw new FormCompileException(string.Format("The type {0} does not have a set property named {1}", currentType, currentPropertyName), element.XmlSourceNodeInformation, property.XmlSourceNodeInformation);


                compileContext.Rebindings.Add(new CompileContext.PropertyRebinding(
                    element.Producer,
                    sourceGetMethodInfo,
                    currentObjectPropertyOwner,
                    currentSetMethodInfo,
                    currentGetMethodInfo.ReturnType,
                    bindSourceName,
                    currentPropertyName));
            }

            property.Value = currentObject;

            IUiControl uiControl = element.Producer as IUiControl;

            if (uiControl != null)
            {
                uiControl.ClientValidationRules = ClientValidationRuleFacade.GetClientValidationRules(currentObjectPropertyOwner, currentPropertyName);
            }
        }


        private static void SetDefaultPropertyOnProducer(ElementCompileTreeNode element, PropertyCompileTreeNode property, CompileContext compileContext)
        {
            string propertyName = GetDefaultPropertyNameOnProducer(element);

            SetPropertyOnProducer(element, propertyName, property, compileContext);
        }



        private static string GetDefaultPropertyNameOnProducer(ElementCompileTreeNode element)
        {
            Type producerType = element.Producer.GetType();

            ControlValuePropertyAttribute cvpa = Attribute.GetCustomAttribute(producerType, typeof(ControlValuePropertyAttribute)) as ControlValuePropertyAttribute;
            if (null == cvpa) throw new FormCompileException(string.Format("The producer {0} does not have a default property specified", producerType.ToString()), element.XmlSourceNodeInformation);

            return cvpa.PropertyName;
        }
    }
}
