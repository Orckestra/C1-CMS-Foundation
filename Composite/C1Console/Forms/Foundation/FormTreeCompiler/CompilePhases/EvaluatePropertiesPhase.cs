using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompileTreeNodes;
using Composite.C1Console.Forms.Foundation.PluginFacades;
using Composite.C1Console.Forms.StandardProducerMediators.BuildinProducers;
using Composite.Core.Types;


namespace Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompilePhases
{
    internal sealed class EvaluatePropertiesPhase
    {
        private readonly CompileContext _compileContext;
        private readonly bool _withDebug = false;



        public EvaluatePropertiesPhase(CompileContext compileContext)
        {
            _compileContext = compileContext;
        }



        public EvaluatePropertiesPhase(CompileContext compileContext, bool withDebug)
            : this(compileContext)
        {
            _withDebug = withDebug;
        }



        public CompileTreeNode Evaluate(CompileTreeNode node)
        {
            return Evaluate(node as ElementCompileTreeNode, null);
        }



        public ElementCompileTreeNode Evaluate(ElementCompileTreeNode node, List<PropertyCompileTreeNode> newProperties, string defaultOverloadPropertyName = null)
        {
            var replacedNodes = new Dictionary<ElementCompileTreeNode, List<PropertyCompileTreeNode>>();

            bool isIfProducer = node.Producer is IfProducer;

            if (!isIfProducer)
            {
                foreach (ElementCompileTreeNode child in node.Children)
                {
                    var newProps = new List<PropertyCompileTreeNode>();


                    string childDefaultOverloadPropertyName = null;
                    if (node.Producer != null)
                    {
                        ReadBindingControlValueOverload attribute = node.Producer.GetType().GetCustomAttributesRecursively<ReadBindingControlValueOverload>().SingleOrDefault();

                        if (attribute != null)
                        {
                            childDefaultOverloadPropertyName = attribute.PropertyName;
                        }
                    }

                    ElementCompileTreeNode resultNode = Evaluate(child, newProps, childDefaultOverloadPropertyName);

                    if ((null == resultNode) || (false == child.Equals(resultNode)))
                    {
                        replacedNodes.Add(child, newProps);

                        foreach (PropertyCompileTreeNode newProperty in newProps)
                        {
                            if (newProperty.Name == CompilerGlobals.DefaultPropertyName)
                            {
                                node.DefaultProperties.Add(newProperty);
                            }
                            else
                            {
                                node.AddNamedProperty(newProperty);
                            }
                        }
                    }
                }
            }


            if (!isIfProducer)
            {
                foreach (ElementCompileTreeNode nodeToRemove in replacedNodes.Keys)
                {
                    node.Children.Remove(nodeToRemove);
                }
            }


            return EvaluateElementCompileTreeNode(node, newProperties, defaultOverloadPropertyName);
        }



        public ElementCompileTreeNode EvaluateElementCompileTreeNode(ElementCompileTreeNode element, List<PropertyCompileTreeNode> newProperties, string defaultOverloadPropertyName)
        {
            if (CompilerGlobals.IsElementEmbeddedProperty(element))
            {
                return HandleEmbeddedProperty(element, newProperties);
            }

            if (element.Producer == null) return element;

            if (element.Producer is IfProducer)
            {
                return HandleIfProducerElement(element, newProperties);
            }

            return HandleProducerElement(element, newProperties, defaultOverloadPropertyName);
        }



        private ElementCompileTreeNode HandleEmbeddedProperty(ElementCompileTreeNode element, List<PropertyCompileTreeNode> newProperties)
        {
            if (element.NamedProperties.Count > 0) throw new FormCompileException("Attrbute not allow on embedded properties", element.XmlSourceNodeInformation);

            string producerName;
            string propertyName;
            CompilerGlobals.GetSplittedPropertyNameFromCompositeName(element, out producerName, out propertyName);

            foreach (PropertyCompileTreeNode property in element.DefaultProperties)
            {
                var replacingProperty = new PropertyCompileTreeNode(propertyName, element.XmlSourceNodeInformation)
                {
                    Value = property.Value,
                    InclosingProducerName = producerName
                };

                newProperties.Add(replacingProperty);
            }

            return null;
        }



        private ElementCompileTreeNode HandleIfProducerElement(ElementCompileTreeNode element, List<PropertyCompileTreeNode> newProperties)
        {
            ElementCompileTreeNode conditionElement = null;
            ElementCompileTreeNode whenTrueElement = null;
            ElementCompileTreeNode whenFalseElement = null;

            foreach (ElementCompileTreeNode child in element.Children)
            {
                if (CompilerGlobals.IsElementIfConditionTag(child)) conditionElement = child;
                if (CompilerGlobals.IsElementIfWhenTrueTag(child)) whenTrueElement = child;
                if (CompilerGlobals.IsElementIfWhenFalseTag(child)) whenFalseElement = child;
            }

            if (conditionElement == null) throw new FormCompileException(string.Format("Missing condition tag ({0})", CompilerGlobals.IfCondition_TagName), element.XmlSourceNodeInformation);
            if (whenTrueElement == null) throw new FormCompileException(string.Format("Missing when true tag ({0})", CompilerGlobals.IfWhenTrue_TagName), element.XmlSourceNodeInformation);


            var newConditionProperties = new List<PropertyCompileTreeNode>();
            Evaluate(conditionElement, newConditionProperties);
            var conditionProducer = (IfConditionProducer)newConditionProperties[0].Value;


            object value;
            if (conditionProducer.Condition)
            {
                var newWhenTrueProperties = new List<PropertyCompileTreeNode>();
                Evaluate(whenTrueElement, newWhenTrueProperties);

                var whenTrueProducer = (IfWhenTrueProducer)newWhenTrueProperties[0].Value;

                if (whenTrueProducer.Result.Count == 1)
                {
                    value = whenTrueProducer.Result[0];
                }
                else
                {
                    value = whenTrueProducer.Result;
                }
            }
            else if (whenFalseElement != null)
            {
                var newWhenFalseProperties = new List<PropertyCompileTreeNode>();
                Evaluate(whenFalseElement, newWhenFalseProperties);

                var whenFalseProducer = (IfWhenFalseProducer)newWhenFalseProperties[0].Value;

                if (whenFalseProducer.Result.Count == 1)
                {
                    value = whenFalseProducer.Result[0];
                }
                else
                {
                    value = whenFalseProducer.Result;
                }
            }
            else
            {
                return null;
            }



            var replacingProperty = new PropertyCompileTreeNode(CompilerGlobals.DefaultPropertyName, element.XmlSourceNodeInformation);
            replacingProperty.Value = value;

            newProperties.Add(replacingProperty);

            return null;
        }



        private ElementCompileTreeNode HandleProducerElement(ElementCompileTreeNode element, List<PropertyCompileTreeNode> newProperties, string defaultOverloadPropertyName)
        {
            PropertyAssigner.AssignPropertiesToProducer(element, _compileContext);

            string replacingPropertyName = CompilerGlobals.DefaultPropertyName;
            if (defaultOverloadPropertyName != null)
            {
                replacingPropertyName = defaultOverloadPropertyName;
            }

            var replacingProperty = new PropertyCompileTreeNode(replacingPropertyName, element.XmlSourceNodeInformation);
            object result = ProducerMediatorPluginFacade.EvaluateProducer(element.XmlSourceNodeInformation.NamespaceURI, element.Producer);

            if (result is BindingProducer)
            {
                var bindingProducer = (BindingProducer)result;

                if (string.IsNullOrEmpty(bindingProducer.name)) throw new FormCompileException("A binding declaraions is missing its name attribute", element.XmlSourceNodeInformation);

                if (!_compileContext.RegistarBindingName(bindingProducer.name)) throw new FormCompileException(string.Format("Name binding name {0} is used twice which is not allowed", bindingProducer.name), element.XmlSourceNodeInformation);

                //if (_compileContext.GetBindingObject(bindingProducer.name) == null && !bindingProducer.optional)
                //{
                //    throw new FormCompileException(string.Format("The non optional binding {0} is missing its binding value", bindingProducer.name), element.XmlSourceNodeInformation);
                //}

                Type type = TypeManager.GetType(bindingProducer.type);

                _compileContext.SetBindingType(bindingProducer.name, type);
            }
            else if (_withDebug && result is IUiControl)
            {
                IUiControl uiControl = result as IUiControl;

                string debugControlNamespace;
                string debugControlName;
                UiControlFactoryPluginFacade.GetDebugControlName(_compileContext.CurrentChannel, out debugControlNamespace, out debugControlName);

                DebugUiControl debug = ProducerMediatorPluginFacade.CreateProducer(_compileContext.CurrentChannel, debugControlNamespace, debugControlName) as DebugUiControl;
                debug.UiControlID = _compileContext.GetNextDebugControlId;
                debug.UiControl = uiControl;
                result = debug;

                debug.UiControlID = uiControl.UiControlID;
                debug.TagName = element.XmlSourceNodeInformation.TagName;
                debug.SourceElementXPath = element.XmlSourceNodeInformation.XPath;


                foreach (CompileContext.IRebinding rd in _compileContext.Rebindings)
                {
                    if (ReferenceEquals(uiControl, rd.SourceProducer))
                    {
                        debug.Bindings.Add(new DebugUiControl.BindingInformation(
                            rd.BindingObjectName,
                            rd.DestinationObjectType,
                            rd.PropertyName));
                    }
                }
            }

            replacingProperty.Value = result;

            newProperties.Add(replacingProperty);

            return null;
        }
    }

}
