using System;
using System.Collections;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Functions.Foundation;
using Composite.Core.Types;


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
            XName parameterXName = XName.Get(FunctionTreeConfigurationNames.ParamTagName, FunctionTreeConfigurationNames.NamespaceName);

            if (_constantValue is IEnumerable && !(_constantValue is string))
            {
                XElement element = new XElement(parameterXName, new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, this.Name));

                foreach (object obj in (IEnumerable)_constantValue)
                {
                    element.Add(new XElement(
                            XName.Get(FunctionTreeConfigurationNames.ParamElementTagName, FunctionTreeConfigurationNames.NamespaceName),
                            new XAttribute(FunctionTreeConfigurationNames.ValueAttributeName, ValueTypeConverter.Convert<string>( obj ))));
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
                         ValueTypeConverter.Convert<string>(_constantValue) ?? string.Empty);
            }

            return new XElement(parameterXName, new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, this.Name), 
                                xValue);
        }
    }
}
