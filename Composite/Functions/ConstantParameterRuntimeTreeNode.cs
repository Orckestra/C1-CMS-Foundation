using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Functions.Foundation;

namespace Composite.Functions
{
    internal sealed class ConstantParameterRuntimeTreeNode : BaseParameterRuntimeTreeNode
    {
        private readonly object _constantValue;
        private readonly bool _isEnumerable;
        private readonly XAttribute _attribute;


        public ConstantParameterRuntimeTreeNode(string name, string constantValue)
            : base(name)
        {
            _constantValue = constantValue;
        }

        public ConstantParameterRuntimeTreeNode(string name, XAttribute valueAttribute)
            : base(name)
        {
            _attribute = valueAttribute;
        }


        public ConstantParameterRuntimeTreeNode(string name, IEnumerable<string> constantValue)
            : base(name)
        {
            _constantValue = constantValue;
            _isEnumerable = true;
        }



        public override object GetValue(FunctionContextContainer contextContainer)
        {
            Verify.ArgumentNotNull(contextContainer, "contextContainer");

            return _attribute != null ? _attribute.Value : _constantValue;
        }

        public override object GetValue(FunctionContextContainer contextContainer, Type type)
        {
            Verify.ArgumentNotNull(contextContainer, "contextContainer");
            Verify.ArgumentNotNull(type, "type");

            if (_attribute != null)
            {
                return XmlSerializationHelper.Deserialize(_attribute, type);
            }

            return ValueTypeConverter.Convert(_constantValue, type);
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
            var element = new XElement(FunctionTreeConfigurationNames.ParamTag,
                        new XAttribute(FunctionTreeConfigurationNames.NameAttribute, this.Name));

            if (_isEnumerable)
            {
                var strings = (IEnumerable<string>) _constantValue;
                foreach (string s in strings)
                {
                    element.Add(new XElement(FunctionTreeConfigurationNames.ParamElementTag,
                            new XAttribute(FunctionTreeConfigurationNames.ValueAttribute, s)));
                }

                return element;
            }

            if (_attribute != null)
            {
                element.Add(new XAttribute(FunctionTreeConfigurationNames.ValueAttribute, _attribute.Value));
            }

            if (_constantValue != null)
            {
                element.Add(new XAttribute(FunctionTreeConfigurationNames.ValueAttribute, _constantValue));
            }

            return element;
        }
    }
}
