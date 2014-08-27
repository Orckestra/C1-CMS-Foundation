using System;
using System.Reflection;
using System.Collections.Generic;
using Composite.Core.Types;
using Composite.Data.Validation.ClientValidationRules;


namespace Composite.C1Console.Forms.Foundation.FormTreeCompiler
{
    internal sealed class CompileContext
    {
        private IFormChannelIdentifier _currentChannel;
        private object _bindingsProducer = null;

        private Dictionary<string, object> _bindingObjects = new Dictionary<string, object>();        
        private Dictionary<string, BindingInformation> _bindingObjectsInformations = new Dictionary<string, BindingInformation>();

        private Dictionary<string, List<ClientValidationRule>> _bindingsValidationRules = new Dictionary<string, List<ClientValidationRule>>();

        private List<string> _registeredBindingNames = new List<string>();                
        private List<string> _registeredSourceObjectBindings = new List<string>();
        private Dictionary<string, List<string>> _registeredSourcePropertyBindings = new Dictionary<string,List<string>>();

        private List<IRebinding> _rebindings = new List<IRebinding>();

        private int _controlIdCounter = 0;
        private int _debugControlIdCounter = 0;


        internal bool RegistarBindingName(string bindingName)
        {
            if (_registeredBindingNames.Contains(bindingName)) return false;

            _registeredBindingNames.Add(bindingName);
            
            return true;
        }


        internal bool RegisterUniqueSourceObjectBinding(string bindSourceName)
        {
            if (_registeredSourceObjectBindings.Contains(bindSourceName) == false)
            {
                _registeredSourceObjectBindings.Add(bindSourceName);
                return  true;
            }

            return false;
        }



        internal bool IsUniqueSourceObjectBinding(string bindSourceName)
        {
            return _registeredSourceObjectBindings.Contains(bindSourceName);
        }



        internal bool RegisterUniqueSourcePropertyBinding(string bindSounceName, string bindPropertyName)
        {
            List<string> boundProperties;

            if (_registeredSourcePropertyBindings.ContainsKey(bindSounceName))
            {
                boundProperties = _registeredSourcePropertyBindings[bindSounceName];
                if (boundProperties.Contains(bindPropertyName)) return false;
            }
            else
            {
                boundProperties = new List<string>();
                _registeredSourcePropertyBindings.Add(bindSounceName, boundProperties);
            }

            boundProperties.Add(bindPropertyName);
            return true;
        }



        internal bool IsUniqueSourcePropertyBinding(string bindSounceName)
        {
            return _registeredSourcePropertyBindings.ContainsKey(bindSounceName);
        }


        internal IFormChannelIdentifier CurrentChannel
        {
            get { return _currentChannel; }
            set { _currentChannel = value; }
        }



        internal object BindingsProducer
        {
            get { return _bindingsProducer; }
            set { _bindingsProducer = value; }
        }



        internal object GetBindingObject(string name)
        {
            if (_bindingObjects == null || !_bindingObjects.ContainsKey(name)) return null;

            return _bindingObjects[name];
        }

        internal bool BindingObjectExists(string name)
        {
            return _bindingObjects != null && _bindingObjects.ContainsKey(name);
        }



        internal void SetBindingType(string name, Type type)
        {
            BindingInformation bindingInformation;
            if (!_bindingObjectsInformations.TryGetValue(name, out bindingInformation))
            {
                bindingInformation = new BindingInformation();
                _bindingObjectsInformations.Add(name, bindingInformation);
            }

            bindingInformation.BindingType = type;
        }



        internal List<ClientValidationRule> GetBindingsValidationRules(string bindingName)
        {
            if (_bindingsValidationRules == null) return null;

            List<ClientValidationRule> rules;

            _bindingsValidationRules.TryGetValue(bindingName, out rules);

            return rules;
        }


        public Dictionary<string, object> BindingObjects
        {
            set { _bindingObjects = value; }
        }


        public Dictionary<string, List<ClientValidationRule>> BindingsValidationRules
        {
            set { _bindingsValidationRules = value; }
        }


        internal List<IRebinding> Rebindings
        {
            get { return _rebindings; }
        }



        internal string GetNextControlId( string prefix )
        {
            return string.Format("{0}{1}{2}", this.CustomControlIdPrefix, prefix, _controlIdCounter++);
        }



        internal string GetNextDebugControlId
        {
            get { return string.Format("UiDebugControl{0}", _debugControlIdCounter++); }
        }


        internal string CustomControlIdPrefix { get; set; }


        internal interface IRebinding
        {
            void Rebind(Dictionary<string, object> bindingObjects, Dictionary<string, Exception> conversionErrors);

            string BindingObjectName { get; }
            string PropertyName { get; }
            Type DestinationObjectType { get; }
            object SourceProducer { get; }
        }


        internal class ObjectRebinding : IRebinding
        {
            private object _sourceProducer;
            private MethodInfo _sourceProducerGetProperty;
            private string _bindSourceName;

            private Type _destinationObjectType;

            internal ObjectRebinding(object sourceProducer, MethodInfo sourceProducerGetProperty, string bindSourceName, Type destinationObjectType)
            {
                _sourceProducer = sourceProducer;
                _sourceProducerGetProperty = sourceProducerGetProperty;   
                _bindSourceName = bindSourceName;

                _destinationObjectType = destinationObjectType;
            }


            public void Rebind(Dictionary<string, object> bindingObjects, Dictionary<string, Exception> conversionErrors)
            {
                IValidatingUiControl validating = _sourceProducer as IValidatingUiControl;

                if (validating != null && validating.IsValid == false)
                {
                    conversionErrors.Add(_bindSourceName, new InvalidOperationException(validating.ValidationError));
                }
                else
                {
                    object value = _sourceProducerGetProperty.Invoke(_sourceProducer, null);

                    Exception conversionError;
                    bindingObjects[_bindSourceName] = ValueTypeConverter.TryConvert(value, _destinationObjectType, out conversionError);

                    if (conversionError != null)
                    {
                        conversionErrors.Add(_bindSourceName, conversionError);
                    }
                }
            } 


            public string BindingObjectName
            {
                get { return _bindSourceName; }
            }


            public string PropertyName
            {
                get { return null; }
            }


            public Type DestinationObjectType
            {
                get { return _destinationObjectType; }
            }


            public object SourceProducer
            {
                get { return _sourceProducer; }
            }            
        }


        internal class PropertyRebinding : IRebinding
        {
            private object _sourceProducer;
            private MethodInfo _sourceProducerGetProperty;
            private object _destinationObject;
            private MethodInfo _destinationSetProperty;
            private Type _destinationSetPropertyType;

            private string _bindingObjectName;
            private string _propertyName;

            internal PropertyRebinding(object sourceProducer, MethodInfo sourceProducerGetProperty, object destinationObject, MethodInfo destinationSetProperty, Type destinationSetPropertyType, string bindingObjectName, string propertyName)
            {
                _sourceProducer = sourceProducer;
                _sourceProducerGetProperty = sourceProducerGetProperty;
                _destinationObject = destinationObject;
                _destinationSetProperty = destinationSetProperty;
                _destinationSetPropertyType = destinationSetPropertyType;

                _bindingObjectName = bindingObjectName;
                _propertyName = propertyName;
            }



            public void Rebind(Dictionary<string, object> bindingObjects, Dictionary<string, Exception> conversionErrors)
            {
                object value = _sourceProducerGetProperty.Invoke(_sourceProducer, null);

                object parm = ValueTypeConverter.Convert(value, _destinationSetPropertyType);

                object[] parms = { parm };

                try 
                {
                    _destinationSetProperty.Invoke(_destinationObject, parms);
                }
                catch(TargetInvocationException e)
                {
                    throw e.InnerException;
                }
            }



            public string BindingObjectName
            {
                get { return _bindingObjectName; }
            }



            public string PropertyName
            {
                get { return _propertyName; }
            }



            public Type DestinationObjectType
            {
                get { return _destinationObject.GetType(); }
            }                     



            public object SourceProducer
            {
                get { return _sourceProducer; }
            }            
        }



        internal class BindingInformation
        {
            private Type _bindingType;

            public Type BindingType
            {
                get { return _bindingType; }
                set { _bindingType = value; }
            }
        }
    }
}
