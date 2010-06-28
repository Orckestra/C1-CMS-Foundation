using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Functions.Foundation;
using Composite.Types;


namespace Composite.Functions
{
    internal sealed class ConstantParameterRuntimeTreeNode : BaseParameterRuntimeTreeNode
    {
        private object _constantValue;
        private bool _isEnumerable = false;


        public ConstantParameterRuntimeTreeNode(string name, string constantValue)
            : base(name)
        {
            _constantValue = constantValue;
        }


        public ConstantParameterRuntimeTreeNode(string name, IEnumerable<string> constantValue)
            : base(name)
        {
            _constantValue = constantValue;
            _isEnumerable = true;
        }



        public override object GetValue(FunctionContextContainer contextContainer)
        {
            if (contextContainer == null) throw new ArgumentNullException("contextContainer");

            return _constantValue;
        }


        public override object GetCachedValue(FunctionContextContainer contextContainer)
        {
            if (contextContainer == null) throw new ArgumentNullException("contextContainer");

            return _constantValue;
        }


        public override IEnumerable<string> GetAllSubFunctionNames()
        {
            yield break;
        }


        public override bool ContainsNestedFunctions
        {
            get
            {
                return false;
            }
        }



        public override XElement Serialize()
        {
            if (_isEnumerable == true)
            {
                XElement element = 
                    new XElement(XName.Get(FunctionTreeConfigurationNames.ParamTagName, FunctionTreeConfigurationNames.NamespaceName),
                        new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, this.Name)
                    );

                IEnumerable<string> strings = (IEnumerable<string>)_constantValue;
                foreach (string s in strings)
                {
                    element.Add(new XElement(
                            XName.Get(FunctionTreeConfigurationNames.ParamElementTagName, FunctionTreeConfigurationNames.NamespaceName),
                            new XAttribute(FunctionTreeConfigurationNames.ValueAttributeName, s)                            
                        ));
                }

                return element;
            }
            else
            {
                if (_constantValue != null)
                {
                    XElement element =
                        new XElement(XName.Get(FunctionTreeConfigurationNames.ParamTagName, FunctionTreeConfigurationNames.NamespaceName),
                            new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, this.Name),
                            new XAttribute(FunctionTreeConfigurationNames.ValueAttributeName, _constantValue)
                        );

                    return element;
                }
                else
                {
                    XElement element =
                        new XElement(XName.Get(FunctionTreeConfigurationNames.ParamTagName, FunctionTreeConfigurationNames.NamespaceName),
                            new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, this.Name)
                        );

                    return element;
                }

            }
        }
    }
}
