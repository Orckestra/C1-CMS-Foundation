using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.Security;


namespace Composite.Functions.Foundation.PluginFacades
{
    /// <summary>
    /// This class is used for caching exceptions from plugins and hadling them correcty
    /// </summary>
    internal sealed class WidgetFunctionWrapper : IWidgetFunction
    {
        private IWidgetFunction _widgetFunctionToWrap;


        internal WidgetFunctionWrapper(IWidgetFunction widgetFunctionToWrap)
        {
            _widgetFunctionToWrap = widgetFunctionToWrap;
        }



        public string Name
        {
            get
            {
                return _widgetFunctionToWrap.Name;
            }
        }



        public string Namespace
        {
            get
            {
                return _widgetFunctionToWrap.Namespace;
            }
        }


        public string Description { get { return _widgetFunctionToWrap.Description; } }


        public Type ReturnType
        {
            get
            {
                return _widgetFunctionToWrap.ReturnType;
            }
        }



        public IEnumerable<ParameterProfile> ParameterProfiles
        {
            get
            {
                if (_widgetFunctionToWrap.ParameterProfiles != null)
                {
                    return _widgetFunctionToWrap.ParameterProfiles;
                }
                else
                {
                    return new ParameterProfile[] { };
                }
            }
        }



        public XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            return _widgetFunctionToWrap.GetWidgetMarkup(parameters, label, help, bindingSourceName);
        }



        public EntityToken EntityToken
        {
            get
            {
                return _widgetFunctionToWrap.EntityToken;
            }
        }
    }
}
