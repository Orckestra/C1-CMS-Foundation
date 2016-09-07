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
            SetPropertyOnProducer2(element, propertyName, property, compileContext);

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


        private static void SetPropertyOnProducer2(ElementCompileTreeNode element, string propertyName, PropertyCompileTreeNode property, CompileContext compileContext)
        {
            if (property.Value is BaseFunctionRuntimeTreeNode && !(element.Producer is FunctionParameterProducer))
            {
                property.Value = ((BaseFunctionRuntimeTreeNode)property.Value).GetValue();
            }

            if (property.InclosingProducerName != "" &&
                element.XmlSourceNodeInformation.Name != property.InclosingProducerName)
            {
                throw new FormCompileException(string.Format("The inclosing tag does not match the embedded property tag name {0}", propertyName), element, property);
            }

            Type producerType = element.Producer.GetType();

            PropertyInfo propertyInfo = producerType.GetProperty(propertyName);
            if (propertyInfo == null)
            {
                if (property.IsNamespaceDeclaration) return; // Ignore it

                throw new FormCompileException(string.Format("The producer {0} does not have property named {1}", producerType, propertyName), element, property);
            }

            MethodInfo getMethodInfo = propertyInfo.GetGetMethod();
            if (null == getMethodInfo) throw new FormCompileException(string.Format("The producer {0} does not have a public get for the property named {1}", producerType, propertyName), element, property);

            bool isReadOrBindProduced = property.Value is BindProducer || property.Value is ReadProducer;

            if (!isReadOrBindProduced && typeof(IDictionary).IsAssignableFrom(getMethodInfo.ReturnType))
            {
                if (property.Value == null) throw new FormCompileException(string.Format("Can not assign null to {0} dictionary", propertyName), element, property);
                IDictionary dictionary = getMethodInfo.Invoke(element.Producer, null) as IDictionary;

                if (dictionary == null) throw new InvalidOperationException(string.Format("Property '{0}' on '{1}' has not been initialized.", propertyName, producerType));

                MethodInfo dictionaryAddMethodInfo = dictionary.GetType().GetMethod("Add");
                ParameterInfo[] dictionaryAddParmInfo = dictionaryAddMethodInfo.GetParameters();

                Type valueType = property.Value.GetType();

                if (property.Value is IDictionary)
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
                    if (property.Value is DictionaryEntry)
                    {
                        var dictionaryEntry = (DictionaryEntry)property.Value;
                        dictionary.Add(dictionaryEntry.Key, dictionaryEntry.Value);
                    }
                    else
                    {
                        PropertyInfo valueKeyProperty = valueType.GetProperty("Key");
                        PropertyInfo valueValueProperty = valueType.GetProperty("Value");
                        if (valueKeyProperty == null || valueValueProperty == null) throw new FormCompileException(string.Format("The type {0} can not be assigned to the The parameter type {0} for the method 'Add' on the return type of the property {1} does not match the value type {2}", dictionaryAddParmInfo[0].ParameterType.ToString(), propertyName, property.Value.GetType()), element, property);

                        object dictionaryEntryKey = valueKeyProperty.GetGetMethod().Invoke(property.Value, null);
                        object dictionaryEntryValue = valueValueProperty.GetGetMethod().Invoke(property.Value, null);
                        dictionary.Add(dictionaryEntryKey, dictionaryEntryValue);
                    }

                }
                return;
            }
            
            if (!isReadOrBindProduced  && typeof(IList).IsAssignableFrom(getMethodInfo.ReturnType))
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
                                element, property);
                        }


                        list.Add(value);
                    }
                    return;
                }

                if (property.Value != null)
                {
                    if (!listAddParmInfo[0].ParameterType.IsInstanceOfType(property.Value))
                    {
                        throw new FormCompileException(string.Format(
                            "The parameter type {0} for the method 'Add' on the return type of the property {1} does not match the value type {2}",
                            listAddParmInfo[0].ParameterType, propertyName, property.Value.GetType()),
                            element, property);
                    }

                    list.Add(property.Value);
                }

                return;
            }

            // Binding values for function parameters
            if (property.Value is ReadProducer && typeof(IList<BaseRuntimeTreeNode>).IsAssignableFrom(getMethodInfo.ReturnType))
            {
                IList list = getMethodInfo.Invoke(element.Producer, null) as IList;

                object bindingObject;
                

                string source = (property.Value as ReadProducer).source;

                if (source.Contains("."))
                {
                    string[] parts = source.Split('.');

                    ResolvePropertyBinding(element, property, compileContext, parts[0], parts.Skip(1).ToArray(), out bindingObject);
                }
                else
                {
                    Type bindingType;

                    ResolveBindingObject(element, property, compileContext, source, out bindingObject, out bindingType);
                }

                list.Add(new ConstantObjectParameterRuntimeTreeNode("BindedValue", bindingObject));

                return;
            }

            CheckForMultiblePropertyAdds(element, propertyName, property);

            MethodInfo setMethodInfo = propertyInfo.GetSetMethod();
            if (null == setMethodInfo) throw new FormCompileException(string.Format("The producer {0} does not have a public set for the property named {1}", producerType, propertyName), element, property);

            object parm;
            if (null != property.Value)
            {
                if (property.Value is BindProducer)
                {
                    object[] attributes = propertyInfo.GetCustomAttributes(typeof(BindablePropertyAttribute), true);
                    if (attributes.Length == 0) throw new FormCompileException(string.Format("The property {0} on the producer {1}, does not have a bind attribute specified", propertyName, producerType), element, property);

                    BindProducer bind = (BindProducer)property.Value;
                    string source = bind.source;

                    EvaluteBinding(element, source, property, compileContext, getMethodInfo, true);
                }
                else if (property.Value is ReadProducer)
                {
                    ReadProducer bind = (ReadProducer)property.Value;
                    string source = bind.source;

                    EvaluteBinding(element, source, property, compileContext, getMethodInfo, false);
                }
            }


            if (property.Value != null && getMethodInfo.ReturnType.IsInstanceOfType(property.Value))
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

            if (element.Producer is LayoutProducer && propertyName == "UiControl")
            {
                LayoutProducer layoutProducer = (LayoutProducer)element.Producer;

                if (layoutProducer.UiControl != null) throw new FormCompileException(string.Format("Only one ui control is allow at the top level of the layout."), element, property);
            }

            object[] parms = { parm };
            setMethodInfo.Invoke(element.Producer, parms);
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
            if (source.Contains("."))
            {
                string[] parts = source.Split('.');

                EvalutePropertyBinding(element, property, compileContext, sourceGetMethodInfo, parts[0], parts.Skip(1).ToArray(), makeBinding);
            }
            else
            {
                EvaluteObjectBinding(element, property, compileContext, sourceGetMethodInfo, source, makeBinding);
            }

            IUiControl uiControl; 
            if (makeBinding && (uiControl = element.Producer as IUiControl) != null)
            {
                if (uiControl.SourceBindingPaths == null)
                {
                    uiControl.SourceBindingPaths = new List<string>();
                }

                uiControl.SourceBindingPaths.Add(source);
            }
        }



        private static void EvaluteObjectBinding(ElementCompileTreeNode element, PropertyCompileTreeNode property, CompileContext compileContext, MethodInfo sourceGetMethodInfo, string bindSourceName, bool makeBinding)
        {
            if (makeBinding)
            {
                if (compileContext.IsUniqueSourcePropertyBinding(bindSourceName)) throw new FormCompileException(string.Format("{0} binds to {1} which is already property bound. Object bindings to a source object which is property bound is not allowed.", element.XmlSourceNodeInformation.XPath, bindSourceName), element, property);

                if (!compileContext.RegisterUniqueSourceObjectBinding(bindSourceName)) throw new FormCompileException(string.Format("{0} binds to {1} which is already bound. Multiple bindings to the same source object.", element.XmlSourceNodeInformation.XPath, bindSourceName), element, property);
            }

            object bindingObject;
            Type bindType;

            ResolveBindingObject(element, property, compileContext, bindSourceName, out bindingObject, out bindType);

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
            property.ClientValidationRules = compileContext.GetBindingsValidationRules(bindSourceName);
        }


        private static void ResolveBindingObject(ElementCompileTreeNode element, PropertyCompileTreeNode property, CompileContext compileContext, string bindSourceName,
            out object bindingObject, out Type bindType)
        {
            var bindingProducer = (BindingsProducer) compileContext.BindingsProducer;
            if (bindingProducer == null)
            {
                throw new FormCompileException($"Failed to resolve binding object {bindSourceName} - the binding producer is null", element, property);
            }

            string typeName = bindingProducer.GetTypeNameByName(bindSourceName);
            if (typeName == null)
            {
                throw new FormCompileException($"{element.XmlSourceNodeInformation.XPath} binds to an undeclared binding name '{bindSourceName}'. All binding names must be declared in /cms:formdefinition/cms:bindings", element, property);
            }

            bindType = TypeManager.TryGetType(typeName);
            if (bindType == null)
            {
                throw new FormCompileException($"The form binding '{bindSourceName}' is declared as an unknown type '{typeName}'", element, property);
            }

            bool? optional = bindingProducer.GetOptionalValueByName(bindSourceName);
            bindingObject = compileContext.GetBindingObject(bindSourceName);

            if (!optional.Value && !compileContext.BindingObjectExists(bindSourceName))
            {
                throw new FormCompileException($"The binding object named '{bindSourceName}' not found in the input dictionary", element, property);
            }

            if (bindingObject != null)
            {
                Type bindingObjectType = bindingObject.GetType();
                if (!bindType.IsAssignableOrLazyFrom(bindingObjectType))
                {
                    throw new FormCompileException($"The binding object named '{bindSourceName}' from the input dictionary is not of expected type '{bindType.FullName}', but '{bindingObjectType.FullName}'", element, property);
                }
            }
        }

        private static void ResolvePropertyBinding(
            ElementCompileTreeNode element, PropertyCompileTreeNode property, CompileContext compileContext,
            string bindSourceName, string[] propertyPath,
            out object value 
            )
        {
            Type type;
            object propertyOwner;
            string propertyName;
            MethodInfo getMethodInfo, setMethodInfo;

            ResolvePropertyBinding(element, property, compileContext, bindSourceName, propertyPath, out value, 
                out type, out propertyOwner, out propertyName, out getMethodInfo, out setMethodInfo);
        }


        private static void ResolvePropertyBinding(
            ElementCompileTreeNode element, PropertyCompileTreeNode property, CompileContext compileContext, string bindSourceName, string[] propertyPath,
                out object value, out Type type, out object propertyOwner, out string propertyName, out MethodInfo getMethodInfo, out MethodInfo setMethodInfo
            )
        {
            string typeName = ((BindingsProducer)compileContext.BindingsProducer).GetTypeNameByName(bindSourceName);
            if (typeName == null)
            {
                throw new FormCompileException(string.Format("{1} binds to an undeclared binding name '{0}'. All binding names must be declared in /cms:formdefinition/cms:bindings", bindSourceName, element.XmlSourceNodeInformation.XPath), element, property);
            }

            Type bindType = TypeManager.TryGetType(typeName);
            if (bindType == null)
            {
                throw new FormCompileException(string.Format("The form binding '{0}' is declared as an unknown type '{1}'", bindSourceName, typeName), element, property);
            }

            object bindingObject = compileContext.GetBindingObject(bindSourceName);
            if (bindingObject == null)
            {
                throw new FormCompileException(string.Format("The binding object named '{0}' not found in the input dictionary", bindSourceName), element, property);
            }

            Type bindingObjectType = bindingObject.GetType();
            if (!bindType.IsAssignableFrom(bindingObjectType)) throw new FormCompileException(string.Format("The binding object named '{0}' from the input dictionary is not of expected type '{1}', but '{2}'", bindSourceName, bindType.FullName, bindingObjectType.FullName), element, property);


            propertyName = null;
            getMethodInfo = setMethodInfo = null;
            type = bindType;
            propertyOwner = value = bindingObject;

            for (int i = 0; i < propertyPath.Length; ++i)
            {
                string name = propertyName = propertyPath[i];

                PropertyInfo propertyInfo = type.GetPropertiesRecursively(x => x.Name == name).FirstOrDefault();

                if (propertyInfo == null)
                {
                    throw new FormCompileException(string.Format("The type {0} does not have a property named {1}", type, propertyName), element, property);
                }

                getMethodInfo = propertyInfo.GetGetMethod();
                if (getMethodInfo == null)
                {
                    throw new FormCompileException(string.Format("The type {0} does not have a get property named {1}", type, propertyName), element, property);
                }

                setMethodInfo = propertyInfo.GetSetMethod();

                propertyOwner = value;

                type = getMethodInfo.ReturnType;
                value = getMethodInfo.Invoke(propertyOwner, null);
            }
        }


        private static void EvalutePropertyBinding(ElementCompileTreeNode element, PropertyCompileTreeNode property, CompileContext compileContext, MethodInfo sourceGetMethodInfo, string bindSourceName, string[] propertyPath, bool makeBinding)
        {
            if (makeBinding)
            {
                bool? optional = ((BindingsProducer)compileContext.BindingsProducer).GetOptionalValueByName(bindSourceName);
                if (!optional.HasValue) throw new FormCompileException(string.Format("{1} binds to an undeclared binding name '{0}'. All binding names must be declared in /cms:formdefinition/cms:bindings", bindSourceName, element.XmlSourceNodeInformation.XPath), element, property);
                if (optional.Value) throw new FormCompileException(string.Format("Property binding to the optional object named '{0}' is not allowed", bindSourceName), element, property);

                if (compileContext.IsUniqueSourceObjectBinding(bindSourceName)) throw new FormCompileException(string.Format("{0} binds to {1} which is already object bound. Property bindings to a source object which is object bound is not allowed.", element.XmlSourceNodeInformation.XPath, bindSourceName), element, property);

                var uniquePropertyName = new StringBuilder();
                for (int i = 0; i < propertyPath.Length; ++i)
                {
                    uniquePropertyName.Append(propertyPath[i]);
                }
                if (!compileContext.RegisterUniqueSourcePropertyBinding(bindSourceName, uniquePropertyName.ToString())) throw new FormCompileException(string.Format("{0} binds to {1} which is already bound. Multiple bindings to the same source object property is not allowed.", element.XmlSourceNodeInformation.XPath, uniquePropertyName), element, property);
            }


            object value, propertyOwner;
            MethodInfo getMethodInfo, setMethodInfo;
            string propertyName;
            Type type;
            ResolvePropertyBinding(element, property, compileContext, bindSourceName, propertyPath, 
                                   out value, out type, out propertyOwner, out propertyName, out getMethodInfo, out setMethodInfo);

            if (makeBinding)
            {
                if (setMethodInfo == null) throw new FormCompileException(string.Format("The type {0} does not have a set property named {1}", type, propertyName), element, property);

                compileContext.Rebindings.Add(new CompileContext.PropertyRebinding(
                    element.Producer,
                    sourceGetMethodInfo,
                    propertyOwner,
                    setMethodInfo,
                    getMethodInfo.ReturnType,
                    bindSourceName,
                    propertyName));
            }

            property.Value = value;

            IUiControl uiControl = element.Producer as IUiControl;

            if (uiControl != null)
            {
                uiControl.ClientValidationRules = ClientValidationRuleFacade.GetClientValidationRules(propertyOwner, propertyName);
            }
        }


        //private static void SetDefaultPropertyOnProducer(ElementCompileTreeNode element, PropertyCompileTreeNode property, CompileContext compileContext)
        //{
        //    string propertyName = GetDefaultPropertyNameOnProducer(element);

        //    SetPropertyOnProducer(element, propertyName, property, compileContext);
        //}



        private static string GetDefaultPropertyNameOnProducer(ElementCompileTreeNode element)
        {
            Type producerType = element.Producer.GetType();

            ControlValuePropertyAttribute cvpa = Attribute.GetCustomAttribute(producerType, typeof(ControlValuePropertyAttribute)) as ControlValuePropertyAttribute;
            if (null == cvpa) throw new FormCompileException(string.Format("The producer {0} does not have a default property specified", producerType.ToString()), element.XmlSourceNodeInformation);

            return cvpa.PropertyName;
        }
    }
}
