using System;
using System.Linq;
using System.Xml.Linq;
using System.Collections.Generic;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class WidgetFunctionProvider
	{
        public static WidgetFunctionProvider BuildNoWidgetProvider()
        {
            return new WidgetFunctionProvider();
        }

        private string _widgetFunctionName = null;
        private IWidgetFunction _widgetFunction = null;
        private IEnumerable<BaseParameterRuntimeTreeNode> _setParameters = null;
        private XElement _serializedWidgetFunction = null;
        private object _lock = new object();

        private WidgetFunctionProvider()
        {
        }



        internal WidgetFunctionProvider(string widgetName)
        {
            if (string.IsNullOrEmpty(widgetName) == true) throw new ArgumentNullException("widgetName");

            _widgetFunctionName = widgetName;
        }



        internal WidgetFunctionProvider(string widgetName, IEnumerable<BaseParameterRuntimeTreeNode> parameters)
        {
            if (string.IsNullOrEmpty(widgetName) == true) throw new ArgumentNullException("widgetName");
            if (parameters == null) throw new ArgumentNullException("parameters");

            _widgetFunctionName = widgetName;
            _setParameters = parameters;
        }



        public WidgetFunctionProvider(IWidgetFunction widgetFunction)
        {
            if (widgetFunction == null) throw new ArgumentNullException("widgetFunction");

            _widgetFunction = widgetFunction;
        }



        public WidgetFunctionProvider(XElement serializedWidgetFunction)
        {
            _serializedWidgetFunction = serializedWidgetFunction;
        }



        public string WidgetFunctionCompositeName
        {
            get
            {
                if (string.IsNullOrEmpty(_widgetFunctionName) == false)
                {
                    return _widgetFunctionName;
                }

                EnsureWidgetFunction();

                if (_widgetFunction != null)
                {
                    return _widgetFunction.CompositeName();
                }

                throw new InvalidOperationException("Neither name nor IWidgetFunction found");
            }
        }



        public IWidgetFunction WidgetFunction
        {
            get
            {
                EnsureWidgetFunction();

                if (_widgetFunction == null)
                {
                    if (string.IsNullOrEmpty(_widgetFunctionName) == false)
                    {
                        _widgetFunction = FunctionFacade.GetWidgetFunction(_widgetFunctionName);
                    }
                }

                
                return _widgetFunction;
            }
        }



        public IEnumerable<BaseParameterRuntimeTreeNode> WidgetFunctionParameters
        {
            get
            {
                if (_setParameters == null)
                {
                    yield break;
                }
                else
                {
                    foreach (BaseParameterRuntimeTreeNode param in _setParameters)
                    {
                        yield return param;
                    }
                }
            }
        }


        public XElement SerializedWidgetFunction
        {
            get 
            {
                EnsureWidgetFunction();

                WidgetFunctionRuntimeTreeNode widgetRuntimeTreeNode = new WidgetFunctionRuntimeTreeNode(this.WidgetFunction, this.WidgetFunctionParameters.ToList());

                return widgetRuntimeTreeNode.Serialize();
            }
        }



        private void EnsureWidgetFunction()
        {
            lock (_lock)
            {
                if (_widgetFunction == null && _serializedWidgetFunction != null)
                {
                    WidgetFunctionRuntimeTreeNode functionNode = (WidgetFunctionRuntimeTreeNode)FunctionFacade.BuildTree(_serializedWidgetFunction);
                    _setParameters = functionNode.GetSetParameters().ToList();
                    _widgetFunction = functionNode.GetWidgetFunction();
                }
            }
        }
	}
}
