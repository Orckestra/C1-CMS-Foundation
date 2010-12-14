using System;
using System.Collections.Generic;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Xml.Linq;

using Composite.Core.Xml;
using Composite.Core.Extensions;
using Composite.Functions;

namespace Composite.Core.WebClient.Renderings.Page
{
    internal sealed class XEmbeddedControlMapper : IFunctionResultToXEmbedableMapper, IXElementToControlMapper
	{
        private static readonly XName _markerElementName = Namespaces.AspNetControls + "marker";
        private static readonly XName _formElementName = Namespaces.AspNetControls + "form";
        private static readonly XName _placeholderElementName = Namespaces.AspNetControls + "placeholder";
        

        private Dictionary<string, Control> _controlDictionary = new Dictionary<string,Control>();

        // IFunctionResultToXElementMapper
        public bool TryMakeXEmbedable(FunctionContextContainer contextContainer, object resultObject, out XNode resultElement)
        {
            if (!(resultObject is Control))
            {
                resultElement = null;
                return false;
            }

            string controlMarkerKey = string.Format("[Composite.Function.Render.Asp.Net.Control.{0}]", _controlDictionary.Count);
            _controlDictionary.Add(controlMarkerKey, (Control)resultObject);

            resultElement =
                XElement.Parse(@"<c1marker:{0} xmlns:c1marker=""{1}"" key=""{2}"" />"
                .FormatWith(_markerElementName.LocalName,
                            _markerElementName.Namespace,
                            controlMarkerKey));

            return true;
        }


        // IXElementToControlMapper
        public bool TryGetControlFromXElement(XElement element, out Control control)
        {
            if (element.Name.Namespace != Namespaces.AspNetControls)
            {
                control = null;
                return false;
            }
            
            if (element.Name == _markerElementName)
            {
                control = _controlDictionary[element.Attribute("key").Value];
                return true;
            }

            if (element.Name == _formElementName)
            {
                control = new HtmlForm();

                element.CopyAttributes(control as HtmlForm);

                foreach (var child in element.Nodes())
                {
                    control.Controls.Add(child.AsAspNetControl(this));
                }

                return true;
            }

            if (element.Name == _placeholderElementName)
            {
                control = new PlaceHolder();

                XAttribute idAttribute = element.Attribute("id");
                if (idAttribute != null)
                {
                    control.ID = idAttribute.Value;
                }

                foreach (var child in element.Nodes())
                {
                    control.Controls.Add(child.AsAspNetControl(this));
                }

                return true;
            }

            throw new InvalidOperationException(string.Format("Unhandled ASP.NET tag '{0}'.", element.Name));
        }
	}
}
