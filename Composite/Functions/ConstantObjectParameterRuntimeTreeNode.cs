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
        private object _constantValue;



        /// <exclude />
        public ConstantObjectParameterRuntimeTreeNode(string name, object constantValue)
            : base(name)
        {
            _constantValue = constantValue;
        }


        /// <exclude />
        public override object GetValue(FunctionContextContainer contextContainer)
        {
            if (contextContainer == null) throw new ArgumentNullException("contextContainer");

            return _constantValue;
        }


        /// <exclude />
        public override IEnumerable<string> GetAllSubFunctionNames()
        {
            return new string[] { };
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
            if (_constantValue is IEnumerable && (_constantValue is string) == false)
            {
                XElement element =
                    new XElement(XName.Get(FunctionTreeConfigurationNames.ParamTagName, FunctionTreeConfigurationNames.NamespaceName),
                        new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, this.Name)
                    );

                foreach (object obj in (IEnumerable)_constantValue)
                {
                    element.Add(new XElement(
                            XName.Get(FunctionTreeConfigurationNames.ParamElementTagName, FunctionTreeConfigurationNames.NamespaceName),
                            new XAttribute(FunctionTreeConfigurationNames.ValueAttributeName, ValueTypeConverter.Convert<string>( obj ))                            
                        ));
                }

                return element;
            }
            else
            {
                XElement element =
                    new XElement(XName.Get(FunctionTreeConfigurationNames.ParamTagName, FunctionTreeConfigurationNames.NamespaceName),
                        new XAttribute(FunctionTreeConfigurationNames.NameAttributeName, this.Name),
                        new XAttribute(FunctionTreeConfigurationNames.ValueAttributeName, ValueTypeConverter.Convert<string>(_constantValue) ?? string.Empty)
                    );

                return element;
            }
        }
    }
}
