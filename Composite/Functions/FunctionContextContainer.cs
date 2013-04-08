using System.Collections.Generic;
using System;
using Composite.Core.Types;
using System.Xml.Linq;


namespace Composite.Functions
{
    /// <summary>    
    /// Used for passing parameters into nested function calls. Applicable in implementation of some of the xml template rendering logic.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class FunctionContextContainer
    {
        private readonly ParameterList _parameterList;
        private readonly Dictionary<string, object> _parameterDictionary;

        #region constructors
        /// <exclude />
        public FunctionContextContainer()
        {
        }



        /// <exclude />
        public FunctionContextContainer(ParameterList parameterList)
        {
            _parameterList = parameterList;
        }



        /// <exclude />
        public FunctionContextContainer(Dictionary<string, object> parameterDictionary)
        {
            _parameterDictionary = parameterDictionary;
        }



        /// <exclude />
        public FunctionContextContainer(FunctionContextContainer inheritFromContainer, Dictionary<string, object> parameterDictionary)
        {
            _parameterDictionary = parameterDictionary;
            this.XEmbedableMapper = inheritFromContainer.XEmbedableMapper;
        }
        #endregion



        /// <exclude />
        public IFunctionResultToXEmbedableMapper XEmbedableMapper { get; set; }



        /// <exclude />
        public object GetParameterValue(string parameterName, Type targetType)
        {
            Verify.ArgumentNotNullOrEmpty(parameterName, "parameterName");

            if (_parameterList != null)
            {
                return _parameterList.GetParameter(parameterName, targetType);
            }

            if (_parameterDictionary != null)
            {
                Verify.That(_parameterDictionary.ContainsKey(parameterName), "Parameter '{0}' hasn't been defined.", parameterName);

                object value = _parameterDictionary[parameterName];

                if (value != null && !targetType.IsInstanceOfType(value))
                {
                    return ValueTypeConverter.Convert(value, targetType);
                }

                return value;
            }

            throw new InvalidOperationException("Unable to get parameter values. This context has been constructed without parameters.");
        }



        /// <exclude />
        public object MakeXEmbedable(object resultObject)
        {
            if (this.XEmbedableMapper != null)
            {
                XNode resultElement;
                if (this.XEmbedableMapper.TryMakeXEmbedable(this, resultObject, out resultElement))
                {
                    return resultElement;
                }
            }

            if (resultObject is XDocument)
            {
                return ((XDocument)resultObject).Root;
            }

            return resultObject;
        }
    }
}
