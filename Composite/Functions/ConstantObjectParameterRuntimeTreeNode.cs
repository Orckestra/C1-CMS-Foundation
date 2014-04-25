using System.Collections;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Core.Xml;
using Composite.Functions.Foundation;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class ConstantObjectParameterRuntimeTreeNode : BaseParameterRuntimeTreeNode
    {
        private readonly object _constantValue;



        /// <exclude />
        public ConstantObjectParameterRuntimeTreeNode(string name, object constantValue)
            : base(name)
        {
            _constantValue = constantValue;
        }


        /// <exclude />
        public override object GetValue(FunctionContextContainer contextContainer)
        {
            return _constantValue;
        }


        /// <exclude />
        public override IEnumerable<string> GetAllSubFunctionNames()
        {
            return new string[0];
        }


        /// <exclude />
        public override bool ContainsNestedFunctions
        {
            get
            {
                return false;
            }
        }


        /// <exclude />
        public override XElement Serialize()
        {
            var element = new XElement(FunctionTreeConfigurationNames.ParamTag, 
                new XAttribute(FunctionTreeConfigurationNames.NameAttribute, this.Name));

            if (_constantValue is IEnumerable && !(_constantValue is string))
            {
                foreach (object obj in (IEnumerable)_constantValue)
                {
                    element.Add(new XElement(FunctionTreeConfigurationNames.ParamElementTag,
                            new XAttribute(FunctionTreeConfigurationNames.ValueAttribute, 
                                           XmlSerializationHelper.GetSerializableObject(obj))));
                }

                return element;
            }

            object xValue;
            if (_constantValue is XNode)
            {
                if (_constantValue is XDocument)
                {
                    xValue = ((XDocument) _constantValue).Root;
                }
                else
                {
                    xValue = _constantValue;
                }
            }
            else
            {
                xValue = new XAttribute(FunctionTreeConfigurationNames.ValueAttributeName, 
                        XmlSerializationHelper.GetSerializableObject(_constantValue) ?? string.Empty);
            }

            element.Add(xValue);

            return element;
        }
    }
}
